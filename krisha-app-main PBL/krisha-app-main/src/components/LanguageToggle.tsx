'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'हिं'}
        </span>
      </button>

      {/* Language Options Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${
              language === 'en' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            <span>English</span>
            {language === 'en' && <Check className="w-4 h-4" />}
          </button>
          <button
            onClick={() => handleLanguageChange('hi')}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${
              language === 'hi' ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            <span>हिंदी</span>
            {language === 'hi' && <Check className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
