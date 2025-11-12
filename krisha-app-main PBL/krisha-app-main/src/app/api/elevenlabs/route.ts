import { NextRequest, NextResponse } from 'next/server';
import { initializeElevenLabs, startVoiceConversation, sendVoiceMessage } from '@/lib/elevenlabs';

export async function POST(request: NextRequest) {
  try {
    const { action, conversationId, message, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key is required' }, { status: 400 });
    }

    // Initialize ElevenLabs service
    const service = await initializeElevenLabs(apiKey);
    if (!service) {
      return NextResponse.json({ error: 'Failed to initialize ElevenLabs service' }, { status: 500 });
    }

    switch (action) {
      case 'start_conversation':
        const newConversationId = await startVoiceConversation();
        if (newConversationId) {
          return NextResponse.json({ 
            success: true, 
            conversationId: newConversationId 
          });
        } else {
          return NextResponse.json({ error: 'Failed to start conversation' }, { status: 500 });
        }

      case 'send_message':
        if (!conversationId || !message) {
          return NextResponse.json({ error: 'Conversation ID and message are required' }, { status: 400 });
        }

        const response = await sendVoiceMessage(conversationId, message);
        if (response) {
          return NextResponse.json({ 
            success: true, 
            message: response.message,
            audioUrl: response.audioUrl,
            conversationId: response.conversationId
          });
        } else {
          return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
        }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('ElevenLabs API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
