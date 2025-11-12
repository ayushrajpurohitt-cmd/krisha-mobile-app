'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Bot, User, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  audioUrl?: string;
}

interface ElevenLabsVoiceAssistantProps {
  onClose: () => void;
}

export default function ElevenLabsVoiceAssistant({ onClose }: ElevenLabsVoiceAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Krisha agricultural assistant powered by ElevenLabs. I can help you with crop analysis, weather information, market prices, and farming advice. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeElevenLabs = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your ElevenLabs API key');
      return;
    }

    try {
      const response = await fetch('/api/elevenlabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'start_conversation',
          apiKey: apiKey.trim()
        })
      });

      if (response.ok) {
        const data = await response.json();
        setConversationId(data.conversationId);
        setIsInitialized(true);
      } else {
        const error = await response.json();
        alert(`Failed to initialize: ${error.error}`);
      }
    } catch (error) {
      console.error('Initialization error:', error);
      alert('Failed to initialize ElevenLabs service');
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputText.trim();
    if (!text || !conversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/elevenlabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_message',
          conversationId,
          message: text,
          apiKey: apiKey.trim()
        })
      });

      if (response.ok) {
        const data = await response.json();
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.message,
          isUser: false,
          timestamp: new Date(),
          audioUrl: data.audioUrl
        };

        setMessages(prev => [...prev, agentMessage]);
        
        // Play audio response if available
        if (data.audioUrl) {
          playAudioResponse(data.audioUrl);
        }
      } else {
        const error = await response.json();
        console.error('Failed to send message:', error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudioResponse = async (audioUrl: string) => {
    try {
      setIsPlaying(true);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        console.error('Failed to play audio');
      };

      await audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Bot className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">ElevenLabs Voice Assistant</h3>
            <p className="text-gray-600">Enter your ElevenLabs API key to start</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ElevenLabs API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={initializeElevenLabs}
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Initialize
              </button>
              <button
                onClick={onClose}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Bot className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">ElevenLabs Voice Assistant</h3>
              <p className="text-sm text-gray-600">Powered by ElevenLabs AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${
                  message.isUser ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser ? 'bg-green-600 ml-2' : 'bg-purple-600 mr-2'
                  }`}>
                    {message.isUser ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl ${
                    message.isUser
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-900 shadow-sm border'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex justify-start">
                <div className="flex max-w-xs lg:max-w-md">
                  <div className="w-8 h-8 rounded-full bg-purple-600 mr-2 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white text-gray-900 shadow-sm border px-4 py-2 rounded-2xl">
                    <div className="flex items-center space-x-1">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Processing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message or use voice..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isProcessing}
              />
              
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-3 rounded-full ${
                  isListening 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                disabled={isProcessing}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {isPlaying && (
                <button
                  onClick={stopAudio}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  <VolumeX className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isProcessing}
                className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">
              Powered by ElevenLabs AI • Try asking: &quot;What&apos;s the weather today?&quot;, &quot;Show me crop prices&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
