'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogOut, User, Settings } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

export default function Navbar({ showBackButton = false, title, subtitle }: NavbarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Don't show navbar on home page when user is not logged in
  if (!user && !showBackButton) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full mr-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {title || t('app.title')}
                </h1>
                {subtitle && (
                  <p className="text-sm text-gray-600">{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle />

            {/* User Menu */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title={t('logout')}
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
