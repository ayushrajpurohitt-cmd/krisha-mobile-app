'use client';

import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Zap, Eye } from 'lucide-react';

interface WeatherStatusProps {
  description: string;
  icon: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
}

export default function WeatherStatus({ description, icon, temp, humidity, windSpeed, visibility }: WeatherStatusProps) {
  const getWeatherIcon = (icon: string) => {
    if (icon.includes('clear-day') || icon.includes('clear-night')) return <Sun className="w-8 h-8 text-yellow-500" />;
    if (icon.includes('partly-cloudy') || icon.includes('cloudy')) return <Cloud className="w-8 h-8 text-gray-500" />;
    if (icon.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (icon.includes('snow')) return <CloudSnow className="w-8 h-8 text-blue-300" />;
    if (icon.includes('thunderstorm')) return <Zap className="w-8 h-8 text-purple-500" />;
    return <Cloud className="w-8 h-8 text-gray-500" />;
  };

  const getWeatherColor = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('sunny') || desc.includes('clear')) return 'text-yellow-600';
    if (desc.includes('cloudy') || desc.includes('overcast')) return 'text-gray-600';
    if (desc.includes('rain') || desc.includes('drizzle')) return 'text-blue-600';
    if (desc.includes('snow')) return 'text-blue-300';
    if (desc.includes('storm') || desc.includes('thunder')) return 'text-purple-600';
    return 'text-gray-600';
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {getWeatherIcon(icon)}
        <div>
          <div className={`text-lg font-semibold ${getWeatherColor(description)}`}>
            {description}
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {temp}°C
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>{visibility} km</span>
        </div>
        <div className="flex items-center space-x-1">
          <Cloud className="w-4 h-4" />
          <span>{humidity}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <Zap className="w-4 h-4" />
          <span>{windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}
