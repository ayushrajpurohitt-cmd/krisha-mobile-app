'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
}
