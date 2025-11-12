'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Feature {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  color: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  const router = useRouter();

  const handleFeatureClick = (feature: Feature) => {
    if (feature.onClick) {
      feature.onClick();
    } else if (feature.href) {
      router.push(feature.href);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <button
          key={index}
          onClick={() => handleFeatureClick(feature)}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-full mb-4 text-white`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.label}
            </h3>
            <p className="text-sm text-gray-600">
              {feature.label === 'Weather Forecast' && 'Check current and 7-day weather'}
              {feature.label === 'Market Prices' && 'View live crop prices'}
              {feature.label === 'Voice Chatbot' && 'Ask questions with voice'}
              {feature.label === 'Scan Crop' && 'Take photo for analysis'}
              {feature.label === 'Soil Report' && 'Analyze soil quality'}
              {feature.label === 'Recommendations' && 'Get farming tips'}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
