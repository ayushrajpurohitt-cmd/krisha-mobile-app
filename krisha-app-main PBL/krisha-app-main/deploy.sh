#!/bin/bash

# Krisha Agricultural Assistant - Production Deployment Script
# This script helps deploy the app to various platforms with bypass authentication

echo "🚀 Krisha Agricultural Assistant - Production Deployment"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the krisha-app directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Display deployment options
echo ""
echo "🌐 Deployment Options:"
echo "1. Vercel (Recommended)"
echo "2. Netlify"
echo "3. Railway"
echo "4. Manual deployment"
echo ""

read -p "Choose deployment option (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "❌ Vercel CLI not found. Installing..."
            npm i -g vercel
            vercel --prod
        fi
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        echo "📋 Manual steps for Netlify:"
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop the 'out' folder"
        echo "3. Set environment variables in Netlify dashboard"
        ;;
    3)
        echo "🚀 Deploying to Railway..."
        echo "📋 Manual steps for Railway:"
        echo "1. Go to https://railway.app"
        echo "2. Connect your GitHub repository"
        echo "3. Set environment variables in Railway dashboard"
        ;;
    4)
        echo "📁 Manual deployment files ready in 'out' directory"
        echo "📋 Upload the contents to your hosting provider"
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🔐 Environment Variables to Set:"
echo "JWT_SECRET=your-secure-production-secret"
echo "ENABLE_AUTH_BYPASS=true"
echo "NEXT_PUBLIC_BYPASS_AUTH=true"
echo ""

echo "🎉 Deployment complete!"
echo "📱 Access your app and use the red 'Demo Login' button for instant access"
echo "🔑 Or use credentials: demo@krisha.com / demo123"
