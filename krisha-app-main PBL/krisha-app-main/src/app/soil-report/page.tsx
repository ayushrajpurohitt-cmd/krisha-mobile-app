'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, Camera, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SoilAnalysis {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  moisture: number;
  texture: string;
  healthScore: number;
  recommendations: string[];
  issues: string[];
}

export default function SoilReportPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SoilAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (imageData: string) => {
    setSelectedImage(imageData);
    setIsAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      const mockAnalysis: SoilAnalysis = {
        ph: 6.8,
        nitrogen: 45,
        phosphorus: 25,
        potassium: 180,
        organicMatter: 3.2,
        moisture: 65,
        texture: 'Loamy Clay',
        healthScore: 7.5,
        recommendations: [
          'Add 2-3 kg of compost per square meter',
          'Apply nitrogen fertilizer in 2-3 split doses',
          'Consider cover cropping to improve organic matter',
          'Test soil pH annually'
        ],
        issues: [
          'Slightly low phosphorus levels',
          'Organic matter could be improved'
        ]
      };
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getHealthColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBg = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedImage ? (
          /* Image Upload Section */
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Soil Sample</h2>
            <p className="text-gray-600 mb-8">
              Take a photo or upload an image of your soil sample for detailed analysis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleImageUpload(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </button>
              
              <button
                onClick={() => {
                  // Simulate camera capture
                  const mockImageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
                  handleImageUpload(mockImageData);
                }}
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </button>
            </div>

            <div className="text-sm text-gray-500">
              <p className="mb-2">Tips for better analysis:</p>
              <ul className="text-left max-w-md mx-auto space-y-1">
                <li>• Take photo in good lighting</li>
                <li>• Include soil from different depths</li>
                <li>• Show soil texture and color clearly</li>
                <li>• Avoid shadows and reflections</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Soil Sample</h3>
              <img
                src={selectedImage}
                alt="Soil sample"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {isAnalyzing ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Soil Sample</h3>
                <p className="text-gray-600">Please wait while we analyze your soil composition...</p>
              </div>
            ) : analysis ? (
              <>
                {/* Health Score */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Overall Health Score</h3>
                    <div className={`px-4 py-2 rounded-full ${getHealthBg(analysis.healthScore)}`}>
                      <span className={`font-bold text-lg ${getHealthColor(analysis.healthScore)}`}>
                        {analysis.healthScore}/10
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        analysis.healthScore >= 8 ? 'bg-green-500' :
                        analysis.healthScore >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${analysis.healthScore * 10}%` }}
                    ></div>
                  </div>
                </div>

                {/* Soil Properties */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Soil Properties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">pH Level</span>
                        <span className="font-semibold">{analysis.ph}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Nitrogen (ppm)</span>
                        <span className="font-semibold">{analysis.nitrogen}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Phosphorus (ppm)</span>
                        <span className="font-semibold">{analysis.phosphorus}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Potassium (ppm)</span>
                        <span className="font-semibold">{analysis.potassium}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Organic Matter (%)</span>
                        <span className="font-semibold">{analysis.organicMatter}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Moisture (%)</span>
                        <span className="font-semibold">{analysis.moisture}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Soil Texture</span>
                      <span className="font-semibold">{analysis.texture}</span>
                    </div>
                  </div>
                </div>

                {/* Issues */}
                {analysis.issues.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                      Issues Detected
                    </h3>
                    <ul className="space-y-2">
                      {analysis.issues.map((issue, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-500 mr-2">!</span>
                          <span className="text-gray-700">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysis(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Analyze Another Sample
                  </button>
                  <button
                    onClick={() => router.push('/recommendations')}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Get Detailed Recommendations
                  </button>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
