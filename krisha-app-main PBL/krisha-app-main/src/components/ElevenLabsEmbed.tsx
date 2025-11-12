'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';

interface ElevenLabsEmbedProps {
  onClose: () => void;
}

export default function ElevenLabsEmbed({ onClose }: ElevenLabsEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate loading time for the ElevenLabs iframe
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg font-bold">K</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Krisha AI Assistant</h3>
              <p className="text-sm text-gray-600">Powered by ElevenLabs</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="https://elevenlabs.io/app/talk-to?agent_id=agent_0101k76a2fr2f9n8mjnaad5t02qe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in ElevenLabs</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading ElevenLabs AI Assistant...</p>
              </div>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">⚠</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Unable to load ElevenLabs Assistant
                </h3>
                <p className="text-gray-600 mb-4">
                  Please try opening the assistant in a new tab
                </p>
                <a
                  href="https://elevenlabs.io/app/talk-to?agent_id=agent_0101k76a2fr2f9n8mjnaad5t02qe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in ElevenLabs</span>
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src="https://elevenlabs.io/app/talk-to?agent_id=agent_0101k76a2fr2f9n8mjnaad5t02qe"
              className="w-full h-full border-0"
              title="ElevenLabs AI Assistant"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>🌾 Agricultural AI Assistant</span>
              <span>•</span>
              <span>🎤 Voice Interaction</span>
              <span>•</span>
              <span>🤖 Powered by ElevenLabs</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Agent ID: agent_0101k76a2fr2f9n8mjnaad5t02qe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
