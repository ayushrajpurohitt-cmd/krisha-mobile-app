'use client';

import React from 'react';
import { Bot, ExternalLink } from 'lucide-react';

interface ElevenLabsButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ElevenLabsButton({ 
  variant = 'primary', 
  size = 'md',
  className = ''
}: ElevenLabsButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center space-x-2 rounded-lg font-medium transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-300 hover:bg-purple-50',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-purple-300 hover:text-purple-700'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <a
      href="https://elevenlabs.io/app/talk-to?agent_id=agent_0101k76a2fr2f9n8mjnaad5t02qe"
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      <Bot className="w-5 h-5" />
      <span>Talk to AI Assistant</span>
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}
