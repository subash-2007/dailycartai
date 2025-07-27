#!/bin/bash

# DailyCartAI Deployment Script
echo "🚀 DailyCartAI Deployment Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Test production build
echo "🧪 Testing production build..."
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Check if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Production build test successful!"
    kill $SERVER_PID
else
    echo "❌ Production build test failed!"
    kill $SERVER_PID
    exit 1
fi

echo ""
echo "🎉 Build and test completed successfully!"
echo ""
echo "Choose your deployment option:"
echo "1. Deploy to Vercel (Recommended)"
echo "2. Deploy to Netlify"
echo "3. Deploy with Docker"
echo "4. Manual deployment"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "Installing Vercel CLI..."
            npm install -g vercel
            vercel --prod
        fi
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        echo "Please visit https://netlify.com and drag the .next folder"
        echo "Or connect your GitHub repository for automatic deployments"
        ;;
    3)
        echo "🐳 Deploying with Docker..."
        if command -v docker &> /dev/null; then
            docker build -t dailycart-ai .
            echo "Docker image built successfully!"
            echo "Run: docker run -p 3000:3000 dailycart-ai"
        else
            echo "❌ Docker is not installed. Please install Docker first."
        fi
        ;;
    4)
        echo "📋 Manual deployment steps:"
        echo "1. Upload your code to your hosting provider"
        echo "2. Set environment variables"
        echo "3. Run: npm install && npm run build && npm start"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "Check the output above for your deployment URL." 