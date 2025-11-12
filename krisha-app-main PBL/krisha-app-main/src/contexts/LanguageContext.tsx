'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Common
    'welcome': 'Welcome',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'back': 'Back',
    'save': 'Save',
    'cancel': 'Cancel',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    
    // App
    'app.title': 'Krisha - Agricultural Assistant',
    'app.subtitle': 'Smart agricultural assistant for farmers',
    'app.features': 'Crop Analysis • Weather Forecast • Market Prices • Voice Assistant',
    
    // Auth
    'auth.welcome_back': 'Welcome Back',
    'auth.join_krisha': 'Join Krisha',
    'auth.sign_in_continue': 'Sign in to continue to your agricultural assistant',
    'auth.create_account': 'Create your account to get started',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.enter_email': 'Enter your email',
    'auth.enter_password': 'Enter your password',
    'auth.enter_name': 'Enter your full name',
    'auth.dont_have_account': "Don't have an account? Register",
    'auth.already_have_account': "Already have an account? Login",
    'auth.invalid_credentials': 'Invalid credentials',
    'auth.registration_failed': 'Registration failed',
    'auth.user_already_exists': 'User already exists',
    
    // Dashboard
    'dashboard.camera_scanner': 'Camera / Scanner',
    'dashboard.take_photo_upload': 'Take a photo or upload an image of your crop, soil, or plant for analysis',
    'dashboard.take_photo': 'Take Photo',
    'dashboard.upload_image': 'Upload Image',
    'dashboard.upload_analyze': 'Upload / Analyze Photo',
    'dashboard.welcome_user': 'Welcome, {name}',
    'dashboard.weather_forecast': 'Weather Forecast',
    'dashboard.market_prices': 'Market Prices',
    'dashboard.ai_assistant': 'AI Assistant',
    'dashboard.scan_crop': 'Scan Crop',
    'dashboard.soil_report': 'Soil Report',
    'dashboard.recommendations': 'Recommendations',
    'dashboard.ai_description': 'Get instant help with your farming questions using advanced AI',
    
    // Features
    'features.weather_forecast': 'Weather Forecast',
    'features.market_prices': 'Market Prices',
    'features.voice_chatbot': 'Voice Chatbot',
    'features.scan_crop': 'Scan Crop',
    'features.soil_report': 'Soil Report',
    'features.recommendations': 'Recommendations',
    
    // Weather
    'weather.title': 'Weather Forecast',
    'weather.current_weather': 'Current Weather',
    'weather.forecast_7day': '7-Day Forecast',
    'weather.humidity': 'Humidity',
    'weather.wind_speed': 'Wind Speed',
    'weather.visibility': 'Visibility',
    'weather.feels_like': 'Feels Like',
    'weather.temperature': 'Temperature',
    
    // Market
    'market.title': 'Market Prices',
    'market.current_prices': 'Current Market Prices',
    'market.search_crops': 'Search crops or locations...',
    'market.all_crops': 'All Crops',
    'market.all_locations': 'All Locations',
    'market.top_gainers': 'Top Gainers',
    'market.top_losers': 'Top Losers',
    'market.market_summary': 'Market Summary',
    'market.total_crops': 'Total Crops',
    'market.markets': 'Markets',
    'market.avg_price': 'Avg Price',
    
    // Chatbot
    'chatbot.title': 'Voice Assistant',
    'chatbot.subtitle': 'Ask me anything about farming',
    'chatbot.type_message': 'Type your message or use voice...',
    'chatbot.try_asking': 'Try asking: "What\'s the weather today?", "Show me crop prices", "Analyze my plant photo"',
    
    // Soil Report
    'soil.title': 'Soil Analysis Report',
    'soil.upload_sample': 'Upload Soil Sample',
    'soil.take_photo_upload': 'Take a photo or upload an image of your soil sample for detailed analysis',
    'soil.analyzing': 'Analyzing Soil Sample',
    'soil.analyzing_wait': 'Please wait while we analyze your soil composition...',
    'soil.health_score': 'Overall Health Score',
    'soil.properties': 'Soil Properties',
    'soil.ph_level': 'pH Level',
    'soil.nitrogen': 'Nitrogen (ppm)',
    'soil.phosphorus': 'Phosphorus (ppm)',
    'soil.potassium': 'Potassium (ppm)',
    'soil.organic_matter': 'Organic Matter (%)',
    'soil.moisture': 'Moisture (%)',
    'soil.texture': 'Soil Texture',
    'soil.issues_detected': 'Issues Detected',
    'soil.recommendations': 'Recommendations',
    'soil.analyze_another': 'Analyze Another Sample',
    'soil.get_recommendations': 'Get Detailed Recommendations',
    
    // Recommendations
    'recommendations.title': 'Farming Recommendations',
    'recommendations.category': 'Category',
    'recommendations.priority': 'Priority',
    'recommendations.all_categories': 'All Categories',
    'recommendations.all_priorities': 'All Priorities',
    'recommendations.high_priority': 'High Priority',
    'recommendations.medium_priority': 'Medium Priority',
    'recommendations.low_priority': 'Low Priority',
    'recommendations.quick_actions': 'Quick Actions',
    'recommendations.check_weather': 'Check Weather',
    'recommendations.view_forecast': 'View forecast',
    'recommendations.check_prices': 'Check crop prices',
    'recommendations.ask_assistant': 'Ask Assistant',
    'recommendations.get_help': 'Get instant help'
  },
  
  hi: {
    // Common
    'welcome': 'स्वागत',
    'login': 'लॉगिन',
    'register': 'रजिस्टर',
    'logout': 'लॉगआउट',
    'back': 'वापस',
    'save': 'सहेजें',
    'cancel': 'रद्द करें',
    'loading': 'लोड हो रहा है...',
    'error': 'त्रुटि',
    'success': 'सफल',
    
    // App
    'app.title': 'कृषा - कृषि सहायक',
    'app.subtitle': 'किसानों के लिए स्मार्ट कृषि सहायक',
    'app.features': 'फसल विश्लेषण • मौसम पूर्वानुमान • बाजार मूल्य • आवाज सहायक',
    
    // Auth
    'auth.welcome_back': 'वापस स्वागत है',
    'auth.join_krisha': 'कृषा में शामिल हों',
    'auth.sign_in_continue': 'अपने कृषि सहायक में जारी रखने के लिए साइन इन करें',
    'auth.create_account': 'शुरू करने के लिए अपना खाता बनाएं',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूरा नाम',
    'auth.enter_email': 'अपना ईमेल दर्ज करें',
    'auth.enter_password': 'अपना पासवर्ड दर्ज करें',
    'auth.enter_name': 'अपना पूरा नाम दर्ज करें',
    'auth.dont_have_account': 'खाता नहीं है? रजिस्टर करें',
    'auth.already_have_account': 'पहले से खाता है? लॉगिन करें',
    'auth.invalid_credentials': 'अमान्य क्रेडेंशियल',
    'auth.registration_failed': 'रजिस्ट्रेशन असफल',
    'auth.user_already_exists': 'उपयोगकर्ता पहले से मौजूद है',
    
    // Dashboard
    'dashboard.camera_scanner': 'कैमरा / स्कैनर',
    'dashboard.take_photo_upload': 'विश्लेषण के लिए अपनी फसल, मिट्टी या पौधे की तस्वीर लें या अपलोड करें',
    'dashboard.take_photo': 'तस्वीर लें',
    'dashboard.upload_image': 'छवि अपलोड करें',
    'dashboard.upload_analyze': 'अपलोड / विश्लेषण करें',
    'dashboard.welcome_user': 'स्वागत, {name}',
    'dashboard.weather_forecast': 'मौसम पूर्वानुमान',
    'dashboard.market_prices': 'बाजार मूल्य',
    'dashboard.ai_assistant': 'AI सहायक',
    'dashboard.scan_crop': 'फसल स्कैन करें',
    'dashboard.soil_report': 'मिट्टी रिपोर्ट',
    'dashboard.recommendations': 'सुझाव',
    'dashboard.ai_description': 'उन्नत AI का उपयोग करके अपने कृषि प्रश्नों के लिए तत्काल सहायता प्राप्त करें',
    
    // Features
    'features.weather_forecast': 'मौसम पूर्वानुमान',
    'features.market_prices': 'बाजार मूल्य',
    'features.voice_chatbot': 'आवाज सहायक',
    'features.scan_crop': 'फसल स्कैन करें',
    'features.soil_report': 'मिट्टी रिपोर्ट',
    'features.recommendations': 'सुझाव',
    
    // Weather
    'weather.title': 'मौसम पूर्वानुमान',
    'weather.current_weather': 'वर्तमान मौसम',
    'weather.forecast_7day': '7-दिन का पूर्वानुमान',
    'weather.humidity': 'आर्द्रता',
    'weather.wind_speed': 'हवा की गति',
    'weather.visibility': 'दृश्यता',
    'weather.feels_like': 'महसूस होता है',
    'weather.temperature': 'तापमान',
    
    // Market
    'market.title': 'बाजार मूल्य',
    'market.current_prices': 'वर्तमान बाजार मूल्य',
    'market.search_crops': 'फसलों या स्थानों की खोज करें...',
    'market.all_crops': 'सभी फसलें',
    'market.all_locations': 'सभी स्थान',
    'market.top_gainers': 'शीर्ष लाभकारी',
    'market.top_losers': 'शीर्ष हानिकारक',
    'market.market_summary': 'बाजार सारांश',
    'market.total_crops': 'कुल फसलें',
    'market.markets': 'बाजार',
    'market.avg_price': 'औसत मूल्य',
    
    // Chatbot
    'chatbot.title': 'आवाज सहायक',
    'chatbot.subtitle': 'कृषि के बारे में कुछ भी पूछें',
    'chatbot.type_message': 'अपना संदेश टाइप करें या आवाज का उपयोग करें...',
    'chatbot.try_asking': 'कोशिश करें: "आज मौसम कैसा है?", "फसल मूल्य दिखाएं", "मेरे पौधे की तस्वीर का विश्लेषण करें"',
    
    // Soil Report
    'soil.title': 'मिट्टी विश्लेषण रिपोर्ट',
    'soil.upload_sample': 'मिट्टी का नमूना अपलोड करें',
    'soil.take_photo_upload': 'विस्तृत विश्लेषण के लिए अपने मिट्टी के नमूने की तस्वीर लें या अपलोड करें',
    'soil.analyzing': 'मिट्टी का नमूना विश्लेषण',
    'soil.analyzing_wait': 'कृपया प्रतीक्षा करें जब हम आपकी मिट्टी की संरचना का विश्लेषण करते हैं...',
    'soil.health_score': 'समग्र स्वास्थ्य स्कोर',
    'soil.properties': 'मिट्टी के गुण',
    'soil.ph_level': 'pH स्तर',
    'soil.nitrogen': 'नाइट्रोजन (ppm)',
    'soil.phosphorus': 'फॉस्फोरस (ppm)',
    'soil.potassium': 'पोटेशियम (ppm)',
    'soil.organic_matter': 'कार्बनिक पदार्थ (%)',
    'soil.moisture': 'नमी (%)',
    'soil.texture': 'मिट्टी की बनावट',
    'soil.issues_detected': 'समस्याएं पाई गईं',
    'soil.recommendations': 'सुझाव',
    'soil.analyze_another': 'दूसरा नमूना विश्लेषण करें',
    'soil.get_recommendations': 'विस्तृत सुझाव प्राप्त करें',
    
    // Recommendations
    'recommendations.title': 'कृषि सुझाव',
    'recommendations.category': 'श्रेणी',
    'recommendations.priority': 'प्राथमिकता',
    'recommendations.all_categories': 'सभी श्रेणियां',
    'recommendations.all_priorities': 'सभी प्राथमिकताएं',
    'recommendations.high_priority': 'उच्च प्राथमिकता',
    'recommendations.medium_priority': 'मध्यम प्राथमिकता',
    'recommendations.low_priority': 'कम प्राथमिकता',
    'recommendations.quick_actions': 'त्वरित कार्य',
    'recommendations.check_weather': 'मौसम जांचें',
    'recommendations.view_forecast': 'पूर्वानुमान देखें',
    'recommendations.check_prices': 'फसल मूल्य जांचें',
    'recommendations.ask_assistant': 'सहायक से पूछें',
    'recommendations.get_help': 'तुरंत सहायता प्राप्त करें'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('krisha_language') as 'en' | 'hi';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    localStorage.setItem('krisha_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
