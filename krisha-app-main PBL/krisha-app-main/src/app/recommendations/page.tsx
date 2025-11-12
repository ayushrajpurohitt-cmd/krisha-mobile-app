'use client';

import React, { useState } from 'react';
import { ArrowLeft, Calendar, Droplets, Sun, Wind, Thermometer, AlertCircle, CheckCircle, Sprout, Bug, CloudRain, Wheat, Lightbulb, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'fertilizer' | 'pest' | 'weather' | 'harvest' | 'general';
  icon: string;
  action: string;
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Apply Nitrogen Fertilizer',
      description: 'Your soil analysis shows low nitrogen levels. Apply 50kg of urea per acre in 2-3 split doses.',
      priority: 'high',
      category: 'fertilizer',
      icon: 'sprout',
      action: 'Apply within 7 days'
    },
    {
      id: '2',
      title: 'Monitor for Aphids',
      description: 'Current weather conditions favor aphid development. Check your crops daily and apply neem oil if needed.',
      priority: 'medium',
      category: 'pest',
      icon: 'bug',
      action: 'Check daily'
    },
    {
      id: '3',
      title: 'Prepare for Rain',
      description: 'Heavy rain expected in 3 days. Ensure proper drainage and cover exposed soil.',
      priority: 'high',
      category: 'weather',
      icon: 'rain',
      action: 'Prepare within 2 days'
    },
    {
      id: '4',
      title: 'Harvest Wheat Crop',
      description: 'Your wheat crop is 85% mature and ready for harvest. Optimal harvest window is 3-5 days.',
      priority: 'high',
      category: 'harvest',
      icon: 'wheat',
      action: 'Harvest within 5 days'
    },
    {
      id: '5',
      title: 'Improve Soil Organic Matter',
      description: 'Add compost or green manure to improve soil structure and nutrient retention.',
      priority: 'low',
      category: 'fertilizer',
      icon: 'sprout',
      action: 'Plan for next season'
    },
    {
      id: '6',
      title: 'Irrigation Schedule',
      description: 'Water your crops early morning or evening to reduce evaporation loss.',
      priority: 'medium',
      category: 'general',
      icon: 'droplets',
      action: 'Follow daily'
    }
  ];

  const filteredRecommendations = recommendations.filter(rec => {
    const categoryMatch = selectedCategory === 'all' || rec.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || rec.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fertilizer': return <Sprout className="w-4 h-4" />;
      case 'pest': return <Bug className="w-4 h-4" />;
      case 'weather': return <CloudRain className="w-4 h-4" />;
      case 'harvest': return <Wheat className="w-4 h-4" />;
      case 'general': return <Lightbulb className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getRecommendationIcon = (iconType: string) => {
    switch (iconType) {
      case 'sprout': return <Sprout className="w-6 h-6 text-green-600" />;
      case 'bug': return <Bug className="w-6 h-6 text-red-600" />;
      case 'rain': return <CloudRain className="w-6 h-6 text-blue-600" />;
      case 'wheat': return <Wheat className="w-6 h-6 text-yellow-600" />;
      case 'droplets': return <Droplets className="w-6 h-6 text-blue-500" />;
      default: return <FileText className="w-6 h-6 text-gray-600" />;
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories', icon: <FileText className="w-4 h-4" /> },
    { value: 'fertilizer', label: 'Fertilizer', icon: <Sprout className="w-4 h-4" /> },
    { value: 'pest', label: 'Pest Control', icon: <Bug className="w-4 h-4" /> },
    { value: 'weather', label: 'Weather', icon: <CloudRain className="w-4 h-4" /> },
    { value: 'harvest', label: 'Harvest', icon: <Wheat className="w-4 h-4" /> },
    { value: 'general', label: 'General', icon: <Lightbulb className="w-4 h-4" /> }
  ];

  const priorities = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {filteredRecommendations.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-gray-500 text-lg">No recommendations found matching your filters</div>
            </div>
          ) : (
            filteredRecommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start">
                    <div className="mr-4">
                      {getRecommendationIcon(rec.icon)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {rec.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.toUpperCase()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{rec.action}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      Mark as Done
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/weather')}
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Sun className="w-6 h-6 text-blue-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Check Weather</div>
                <div className="text-sm text-gray-600">View forecast</div>
              </div>
            </button>

            <button
              onClick={() => router.push('/market')}
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Droplets className="w-6 h-6 text-green-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Market Prices</div>
                <div className="text-sm text-gray-600">Check crop prices</div>
              </div>
            </button>

            <button
              onClick={() => router.push('/chatbot')}
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Wind className="w-6 h-6 text-purple-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Ask Assistant</div>
                <div className="text-sm text-gray-600">Get instant help</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
