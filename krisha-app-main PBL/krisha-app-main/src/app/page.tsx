'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthForm from '@/components/AuthForm';
import BypassLogin from '@/components/BypassLogin';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Krisha Logo/Name */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
            <span className="text-white text-2xl font-bold">K</span>
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Krisha</h1>
          <p className="text-green-600 text-lg">{t('app.subtitle')}</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {authMode === 'login' ? t('auth.welcome_back') : t('auth.join_krisha')}
            </h2>
            <p className="text-gray-600">
              {authMode === 'login' 
                ? t('auth.sign_in_continue')
                : t('auth.create_account')
              }
            </p>
          </div>

          <AuthForm mode={authMode} onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} />
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-green-700 text-sm">
            {t('app.features')}
          </p>
        </div>
      </div>

      {/* Bypass Login Button */}
      <BypassLogin />
    </div>
  );
}