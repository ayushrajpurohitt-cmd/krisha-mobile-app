'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Thermometer, Droplets, Wind, Eye, Sun, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    description: string;
    icon: string;
    feelsLike: number;
  };
  forecast: Array<{
    date: string;
    temp: { min: number; max: number };
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  }>;
  location: {
    name: string;
    country: string;
  };
}

// Get weather icon component based on icon type
function getWeatherIconComponent(iconType: string, className: string = "w-6 h-6") {
  switch (iconType) {
    case 'clear-day':
      return <Sun className={className} />;
    case 'clear-night':
      return <Sun className={className} />;
    case 'partly-cloudy':
      return <Cloud className={className} />;
    case 'cloudy':
      return <Cloud className={className} />;
    case 'rain':
      return <CloudRain className={className} />;
    case 'thunderstorm':
      return <Zap className={className} />;
    case 'snow':
      return <CloudSnow className={className} />;
    case 'fog':
      return <Cloud className={className} />;
    default:
      return <Cloud className={className} />;
  }
}

export default function WeatherPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      
      try {
        // Try to get user's location first
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              
              // Fetch real weather data
              const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&type=forecast`);
              
              if (response.ok) {
                const data = await response.json();
                setWeather(data);
                setLocation(`${data.location.name}, ${data.location.country}`);
              } else {
                // Fallback to mock data if API fails
                setMockWeather();
              }
              setLoading(false);
            },
            async (error) => {
              console.log('Geolocation error:', error);
              // Try with default location (Delhi, India)
              const response = await fetch('/api/weather?city=Delhi&type=forecast');
              
              if (response.ok) {
                const data = await response.json();
                setWeather(data);
                setLocation(`${data.location.name}, ${data.location.country}`);
              } else {
                // Fallback to mock data
                setMockWeather();
              }
              setLoading(false);
            }
          );
        } else {
          // Fallback to default location
          const response = await fetch('/api/weather?city=Delhi&type=forecast');
          
          if (response.ok) {
            const data = await response.json();
            setWeather(data);
            setLocation(`${data.location.name}, ${data.location.country}`);
          } else {
            setMockWeather();
          }
          setLoading(false);
        }
      } catch (error) {
        console.log('Weather fetch error:', error);
        setMockWeather();
        setLoading(false);
      }
    };

    const setMockWeather = () => {
      const mockWeather: WeatherData = {
        current: {
          temp: 28,
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          description: 'Partly Cloudy',
          icon: 'partly-cloudy',
          feelsLike: 30
        },
        forecast: [
          { date: 'Today', temp: { min: 24, max: 32 }, description: 'Partly Cloudy', icon: 'partly-cloudy', humidity: 65, windSpeed: 12 },
          { date: 'Tomorrow', temp: { min: 22, max: 30 }, description: 'Light Rain', icon: 'rain', humidity: 75, windSpeed: 8 },
          { date: 'Day 3', temp: { min: 20, max: 28 }, description: 'Heavy Rain', icon: 'rain', humidity: 85, windSpeed: 15 },
          { date: 'Day 4', temp: { min: 18, max: 26 }, description: 'Cloudy', icon: 'cloudy', humidity: 70, windSpeed: 10 },
          { date: 'Day 5', temp: { min: 21, max: 29 }, description: 'Sunny', icon: 'clear-day', humidity: 55, windSpeed: 6 },
          { date: 'Day 6', temp: { min: 23, max: 31 }, description: 'Sunny', icon: 'clear-day', humidity: 50, windSpeed: 8 },
          { date: 'Day 7', temp: { min: 25, max: 33 }, description: 'Hot', icon: 'clear-day', humidity: 45, windSpeed: 5 }
        ],
        location: {
          name: 'Your Farm Location',
          country: 'India'
        }
      };
      
      setWeather(mockWeather);
      setLocation('Your Farm Location');
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to fetch weather data</h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Weather */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600">{weather.location ? `${weather.location.name}, ${weather.location.country}` : location}</span>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-2">
                {getWeatherIconComponent(weather.current.icon, "w-8 h-8 text-blue-500 mr-2")}
                <div className="text-4xl font-bold text-gray-900">{weather.current.temp}°C</div>
              </div>
              <div className="text-gray-600">{weather.current.description}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Droplets className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="font-semibold">{weather.current.humidity}%</div>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Wind className="w-5 h-5 text-green-500 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Wind Speed</div>
                <div className="font-semibold">{weather.current.windSpeed} km/h</div>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Eye className="w-5 h-5 text-purple-500 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Visibility</div>
                <div className="font-semibold">{weather.current.visibility} km</div>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Thermometer className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Feels Like</div>
                <div className="font-semibold">{weather.current.feelsLike}°C</div>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7-Day Forecast</h2>
          
          <div className="space-y-4">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4">
                    {getWeatherIconComponent(day.icon, "w-6 h-6 text-blue-500")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{day.date}</div>
                    <div className="text-sm text-gray-600">{day.description}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Humidity</div>
                    <div className="font-semibold">{day.humidity}%</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Wind</div>
                    <div className="font-semibold">{day.windSpeed} km/h</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Temperature</div>
                    <div className="font-semibold">
                      {day.temp.max}°/{day.temp.min}°
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
