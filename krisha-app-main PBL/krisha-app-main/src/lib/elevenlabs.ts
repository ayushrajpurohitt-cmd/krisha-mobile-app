// ElevenLabs Talk-to-Agent integration for Krisha Agricultural Assistant
// Agent ID: agent_0101k76a2fr2f9n8mjnaad5t02qe

export interface ElevenLabsConfig {
  apiKey: string;
  agentId: string;
  baseUrl?: string;
}

export interface VoiceMessage {
  id: string;
  text: string;
  audioUrl?: string;
  timestamp: Date;
  isUser: boolean;
}

export interface AgentResponse {
  message: string;
  audioUrl?: string;
  conversationId?: string;
}

class ElevenLabsService {
  private config: ElevenLabsConfig;
  private isInitialized: boolean = false;

  constructor(config: ElevenLabsConfig) {
    this.config = {
      baseUrl: 'https://api.elevenlabs.io/v1',
      ...config
    };
  }

  async initialize(): Promise<boolean> {
    try {
      // Test the connection to ElevenLabs API
      const response = await fetch(`${this.config.baseUrl}/user`, {
        headers: {
          'xi-api-key': this.config.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.isInitialized = true;
        return true;
      }
      return false;
    } catch (error) {
      console.error('ElevenLabs initialization failed:', error);
      return false;
    }
  }

  async startConversation(): Promise<string | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/conversational-ai/conversation`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.config.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent_id: this.config.agentId,
          name: 'Krisha Agricultural Assistant'
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.conversation_id;
      }
      return null;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      return null;
    }
  }

  async sendMessage(conversationId: string, message: string): Promise<AgentResponse | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/conversational-ai/conversation/${conversationId}/message`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.config.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          agent_id: this.config.agentId
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          message: data.message,
          audioUrl: data.audio_url,
          conversationId: conversationId
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to send message:', error);
      return null;
    }
  }

  async getAudioStream(audioUrl: string): Promise<AudioBuffer | null> {
    try {
      const response = await fetch(audioUrl);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        return await audioContext.decodeAudioData(arrayBuffer);
      }
      return null;
    } catch (error) {
      console.error('Failed to get audio stream:', error);
      return null;
    }
  }

  async playAudio(audioBuffer: AudioBuffer): Promise<void> {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

// Create a singleton instance
let elevenLabsService: ElevenLabsService | null = null;

export function getElevenLabsService(): ElevenLabsService | null {
  return elevenLabsService;
}

export async function initializeElevenLabs(apiKey: string): Promise<ElevenLabsService | null> {
  if (elevenLabsService) {
    return elevenLabsService;
  }

  elevenLabsService = new ElevenLabsService({
    apiKey,
    agentId: 'agent_0101k76a2fr2f9n8mjnaad5t02qe'
  });

  const initialized = await elevenLabsService.initialize();
  return initialized ? elevenLabsService : null;
}

// Utility functions for voice interaction
export async function startVoiceConversation(): Promise<string | null> {
  const service = getElevenLabsService();
  if (!service) return null;
  return await service.startConversation();
}

export async function sendVoiceMessage(conversationId: string, message: string): Promise<AgentResponse | null> {
  const service = getElevenLabsService();
  if (!service) return null;
  return await service.sendMessage(conversationId, message);
}

export async function playAgentResponse(audioUrl: string): Promise<void> {
  const service = getElevenLabsService();
  if (!service) return;
  
  const audioBuffer = await service.getAudioStream(audioUrl);
  if (audioBuffer) {
    await service.playAudio(audioBuffer);
  }
}
