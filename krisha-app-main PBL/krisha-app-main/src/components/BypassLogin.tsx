'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { isBypassModeEnabled } from '@/lib/auth-bypass';

export default function BypassLogin() {
  const { login } = useAuth();

  if (!isBypassModeEnabled()) {
    return null;
  }

  const handleBypassLogin = async () => {
    await login('demo@krisha.com', 'demo123');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleBypassLogin}
        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors text-sm font-medium animate-pulse"
        title="Click for instant demo access"
      >
        🚀 Demo Login
      </button>
    </div>
  );
}
