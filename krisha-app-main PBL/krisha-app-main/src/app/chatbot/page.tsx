'use client';

import React, { useState } from 'react';
import { Bot, Mic, Volume2, Zap, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import ElevenLabsEmbed from '@/components/ElevenLabsEmbed';

export default function ChatbotPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showElevenLabsAssistant, setShowElevenLabsAssistant] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI Voice Assistant
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get instant help with your farming questions using advanced AI voice technology
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Interaction</h3>
              <p className="text-gray-600 text-sm">
                Speak naturally and get instant responses from our AI assistant
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Audio Responses</h3>
              <p className="text-gray-600 text-sm">
                Listen to detailed explanations and recommendations
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart AI</h3>
              <p className="text-gray-600 text-sm">
                Powered by ElevenLabs advanced conversational AI
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => setShowElevenLabsAssistant(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-3">
                <Mic className="w-6 h-6" />
                <span className="text-lg font-semibold">Start AI Conversation</span>
              </div>
            </button>

            <a
              href="https://elevenlabs.io/app/talk-to?agent_id=agent_0101k76a2fr2f9n8mjnaad5t02qe"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-purple-200 text-purple-700 py-4 px-8 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              <ExternalLink className="w-6 h-6" />
              <span className="text-lg font-semibold">Open in ElevenLabs</span>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/weather')}
                className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <span>Check Weather</span>
              </button>
              <button
                onClick={() => router.push('/market')}
                className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <span>View Market Prices</span>
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">How it works</h3>
            <div className="text-blue-800 text-sm space-y-1">
              <p>1. Click &quot;Start AI Conversation&quot; to open the ElevenLabs assistant</p>
              <p>2. The AI agent is pre-configured for agricultural assistance</p>
              <p>3. Speak naturally or type your farming questions</p>
              <p>4. Get instant AI responses with voice interaction</p>
              <p>5. Or click &quot;Open in ElevenLabs&quot; to use the full interface</p>
            </div>
          </div>
        </div>
      </div>

      {/* ElevenLabs Embedded Assistant */}
      {showElevenLabsAssistant && (
        <ElevenLabsEmbed onClose={() => setShowElevenLabsAssistant(false)} />
      )}
    </div>
  );
}