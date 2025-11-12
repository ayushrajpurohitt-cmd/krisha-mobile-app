'use client';

import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, MapPin, Wheat, Circle, Coffee, Leaf, Shirt, TreePine, Apple, Cherry } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  change: number;
  location: string;
  date: string;
  icon: string;
}

interface MarketData {
  crops: string[];
  locations: string[];
  prices: MarketPrice[];
}

// Get crop icon component based on crop type
function getCropIconComponent(iconType: string, className: string = "w-6 h-6") {
  switch (iconType) {
    case 'wheat':
      return <Wheat className={className} />;
    case 'rice':
      return <Circle className={className} />;
    case 'corn':
      return <Coffee className={className} />;
    case 'soybean':
      return <Leaf className={className} />;
    case 'cotton':
      return <Shirt className={className} />;
    case 'sugarcane':
      return <TreePine className={className} />;
    case 'potato':
      return <Apple className={className} />;
    case 'tomato':
      return <Cherry className={className} />;
    default:
      return <Circle className={className} />;
  }
}

export default function MarketPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchTerm, setSearchTerm] = useState('');
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'fallback'>('loading');

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      
      try {
        const response = await fetch('/api/market?type=prices');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setMarketData(result.data);
            setApiStatus('connected');
            console.log('Market data loaded with API key:', result.apiKey);
          } else {
            console.error('Market API error:', result.error);
            setApiStatus('fallback');
            // Fallback to mock data
            setMockData();
          }
        } else {
          console.error('Failed to fetch market data');
          setApiStatus('fallback');
          // Fallback to mock data
          setMockData();
        }
      } catch (error) {
        console.error('Market data fetch error:', error);
        setApiStatus('fallback');
        // Fallback to mock data
        setMockData();
      } finally {
        setLoading(false);
      }
    };

    const setMockData = () => {
      const mockData: MarketData = {
        crops: ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Sugarcane', 'Potato', 'Tomato'],
        locations: ['Delhi Mandi', 'Mumbai APMC', 'Kolkata Market', 'Chennai Market', 'Pune Market'],
        prices: [
          { crop: 'Wheat', price: 2450, unit: 'per quintal', change: 2.5, location: 'Delhi Mandi', date: new Date().toISOString().split('T')[0], icon: 'wheat' },
          { crop: 'Rice', price: 3200, unit: 'per quintal', change: -1.2, location: 'Mumbai APMC', date: new Date().toISOString().split('T')[0], icon: 'rice' },
          { crop: 'Corn', price: 1850, unit: 'per quintal', change: 3.8, location: 'Kolkata Market', date: new Date().toISOString().split('T')[0], icon: 'corn' },
          { crop: 'Soybean', price: 4200, unit: 'per quintal', change: -0.5, location: 'Chennai Market', date: new Date().toISOString().split('T')[0], icon: 'soybean' },
          { crop: 'Cotton', price: 6800, unit: 'per quintal', change: 1.8, location: 'Pune Market', date: new Date().toISOString().split('T')[0], icon: 'cotton' },
          { crop: 'Sugarcane', price: 320, unit: 'per quintal', change: 0.8, location: 'Delhi Mandi', date: new Date().toISOString().split('T')[0], icon: 'sugarcane' },
          { crop: 'Potato', price: 1200, unit: 'per quintal', change: -2.1, location: 'Mumbai APMC', date: new Date().toISOString().split('T')[0], icon: 'potato' },
          { crop: 'Tomato', price: 2800, unit: 'per quintal', change: 4.2, location: 'Kolkata Market', date: new Date().toISOString().split('T')[0], icon: 'tomato' }
        ]
      };
      setMarketData(mockData);
    };

    fetchMarketData();
  }, []);

  const filteredPrices = marketData?.prices.filter(price => {
    const matchesCrop = selectedCrop === 'All Crops' || price.crop === selectedCrop;
    const matchesLocation = selectedLocation === 'All Locations' || price.location === selectedLocation;
    const matchesSearch = price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         price.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCrop && matchesLocation && matchesSearch;
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!marketData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to fetch market data</h2>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search crops or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Crop Filter */}
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="All Crops">All Crops</option>
              {marketData.crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="All Locations">All Locations</option>
              {marketData.locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Market Prices Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Current Market Prices</h2>
            <p className="text-gray-600 text-sm">Live prices from major markets across India</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrices.map((price, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-3 text-green-600">
                          {getCropIconComponent(price.icon, "w-6 h-6")}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{price.crop}</div>
                          <div className="text-sm text-gray-500">{price.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{price.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${
                        price.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {price.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(price.change)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {price.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(price.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPrices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No prices found matching your criteria</div>
            </div>
          )}
        </div>

        {/* Market Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Gainers</h3>
            <div className="space-y-3">
              {marketData.prices
                .filter(p => p.change > 0)
                .sort((a, b) => b.change - a.change)
                .slice(0, 3)
                .map((price, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{price.crop}</span>
                    <span className="text-sm text-green-600">+{price.change}%</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Losers</h3>
            <div className="space-y-3">
              {marketData.prices
                .filter(p => p.change < 0)
                .sort((a, b) => a.change - b.change)
                .slice(0, 3)
                .map((price, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{price.crop}</span>
                    <span className="text-sm text-red-600">{price.change}%</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Crops</span>
                <span className="text-sm font-medium">{marketData.crops.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Markets</span>
                <span className="text-sm font-medium">{marketData.locations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Price</span>
                <span className="text-sm font-medium">
                  ₹{Math.round(marketData.prices.reduce((sum, p) => sum + p.price, 0) / marketData.prices.length).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
