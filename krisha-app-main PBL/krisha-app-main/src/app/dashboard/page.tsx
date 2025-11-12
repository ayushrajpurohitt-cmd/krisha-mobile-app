'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { Camera, Upload, CloudRain, DollarSign, Bot, Scan, FileText, Lightbulb } from 'lucide-react';
import CameraComponent from '@/components/CameraComponent';
import FeatureGrid from '@/components/FeatureGrid';
import FontTest from '@/components/FontTest';
import ElevenLabsButton from '@/components/ElevenLabsButton';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!user) {
    router.push('/');
    return null;
  }

  const handleImageCapture = (imageData: string) => {
    setSelectedImage(imageData);
    setShowCamera(false);
  };

  const handleImageUpload = (imageData: string) => {
    setSelectedImage(imageData);
  };

  const features = [
    {
      icon: <CloudRain className="w-8 h-8" />,
      label: t('dashboard.weather_forecast'),
      href: '/weather',
      color: 'bg-blue-500'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      label: t('dashboard.market_prices'),
      href: '/market',
      color: 'bg-green-500'
    },
    {
      icon: <Bot className="w-8 h-8" />,
      label: t('dashboard.ai_assistant'),
      href: '/chatbot',
      color: 'bg-purple-500'
    },
    {
      icon: <Scan className="w-8 h-8" />,
      label: t('dashboard.scan_crop'),
      onClick: () => setShowCamera(true),
      color: 'bg-orange-500'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      label: t('dashboard.soil_report'),
      href: '/soil-report',
      color: 'bg-yellow-500'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      label: t('dashboard.recommendations'),
      href: '/recommendations',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Camera/Scanner Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
            <Camera className="w-6 h-6 mr-2" />
            {t('dashboard.camera_scanner')}
          </h2>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              {t('dashboard.take_photo_upload')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowCamera(true)}
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Camera className="w-5 h-5 mr-2" />
                {t('dashboard.take_photo')}
              </button>
              
              <label className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                {t('dashboard.upload_image')}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleImageUpload(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {selectedImage && (
              <div className="mt-6">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-full h-64 object-cover rounded-lg mx-auto"
                />
                <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Upload / Analyze Photo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <FeatureGrid features={features} />

        {/* Font Test Component - Remove this after testing */}
        <FontTest />

        {/* ElevenLabs AI Assistant Quick Access */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{t('dashboard.ai_assistant')}</h3>
              <p className="text-purple-100 mb-4">
                {t('dashboard.ai_description')}
              </p>
            </div>
            <ElevenLabsButton variant="secondary" size="lg" />
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <CameraComponent
          onCapture={handleImageCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
