# Krisha - Agricultural Assistant

A comprehensive agricultural assistant app built with Next.js, TypeScript, and Tailwind CSS. Krisha helps farmers with crop analysis, weather forecasting, market prices, and provides intelligent recommendations.

## 🌾 Features

### 🔐 Authentication
- Email-based registration and login
- Secure JWT token authentication
- User session management

### 📱 Core Features
- **Camera/Scanner**: Take photos or upload images of crops, soil, or plants
- **Image Analysis**: AI-powered crop detection, health scoring, and disease identification
- **Weather Forecast**: 7-day weather forecast with detailed metrics
- **Market Prices**: Live crop prices from major markets across India
- **Voice Chatbot**: Interactive voice assistant for farming queries
- **Soil Analysis**: Comprehensive soil health reports and recommendations
- **Smart Recommendations**: Personalized farming advice based on conditions

### 🌍 Multilingual Support
- English and Hindi language support
- Dynamic language switching
- Localized content and UI

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Touch-friendly interface
- Works well in low connectivity areas

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd krisha-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   JWT_SECRET=your-secret-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── dashboard/         # Main dashboard page
│   ├── weather/           # Weather forecast page
│   ├── market/            # Market prices page
│   ├── chatbot/           # Voice assistant page
│   ├── soil-report/       # Soil analysis page
│   ├── recommendations/   # Farming recommendations page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── AuthForm.tsx      # Authentication form
│   ├── CameraComponent.tsx # Camera functionality
│   ├── FeatureGrid.tsx   # Feature grid layout
│   └── LanguageSwitcher.tsx # Language selection
├── contexts/              # React contexts
│   ├── AuthContext.tsx   # Authentication state
│   └── LanguageContext.tsx # Language management
└── lib/                   # Utility functions
    └── auth.ts           # Authentication utilities
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT with bcryptjs
- **Icons**: Lucide React
- **Camera**: React Webcam
- **File Upload**: React Dropzone

## 📱 Key Pages

### 1. Initial Screen
- Krisha logo and branding
- Login/Register options
- Feature preview

### 2. Dashboard (Home)
- Camera/Scanner interface
- Feature grid with 6 main functions
- User profile and logout

### 3. Weather Forecast
- Current weather conditions
- 7-day forecast
- Detailed weather metrics

### 4. Market Prices
- Live crop prices
- Filter by crop and location
- Market insights and trends

### 5. Voice Chatbot
- Interactive voice assistant
- Image upload for analysis
- Contextual responses

### 6. Soil Analysis
- Image-based soil analysis
- Health scoring
- Detailed recommendations

### 7. Recommendations
- Personalized farming advice
- Priority-based suggestions
- Quick action buttons

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## 🌐 Internationalization

The app supports multiple languages with a comprehensive translation system:

- **English**: Full feature set
- **Hindi**: Complete Hindi translation
- **Dynamic switching**: Change language without page reload
- **Persistent selection**: Language preference saved in localStorage

## 📱 Mobile Optimization

- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized for low connectivity
- **Offline Capable**: Core features work offline

## 🎨 Design Features

- **Modern UI**: Clean, intuitive interface
- **Accessibility**: Screen reader friendly
- **Color Coding**: Visual indicators for different features
- **Icons**: Consistent iconography throughout
- **Typography**: Clear, readable fonts

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **AWS**: EC2 or Lambda deployment

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Configured for production

## 📊 Performance

- **Fast Loading**: Optimized bundle size
- **Image Optimization**: Next.js image optimization
- **Code Splitting**: Automatic code splitting
- **Caching**: Efficient caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real-time Data**: Live weather and market data
- **ML Integration**: Advanced crop analysis
- **Push Notifications**: Weather and price alerts
- **Offline Mode**: Full offline functionality
- **Social Features**: Farmer community features
- **Advanced Analytics**: Detailed farming insights

---

**Krisha** - Empowering farmers with smart agricultural technology 🌾