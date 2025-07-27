'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Package, 
  MapPin, 
  Users, 
  MessageCircle,
  Brain,
  TrendingUp,
  Sun,
  Cloud,
  CloudRain,
  Calendar,
  ArrowRight
} from 'lucide-react'
import { getFriendlyGreeting } from '../lib/utils'

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState({ condition: 'sunny' as const, temperature: 28, humidity: 60 })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />
      default: return <Sun className="w-6 h-6 text-yellow-500" />
    }
  }

  const features = [
    {
      title: 'Smart Inventory Prediction',
      description: 'AI-powered suggestions based on weather, day of week, and sales patterns',
      icon: Package,
      href: '/inventory',
      color: 'primary'
    },
    {
      title: 'Find Nearby Suppliers',
      description: 'Discover the best prices and suppliers in your area with real-time data',
      icon: MapPin,
      href: '/suppliers',
      color: 'secondary'
    },
    {
      title: 'Group Buying',
      description: 'Connect with other vendors to pool orders and save money together',
      icon: Users,
      href: '/group-buy',
      color: 'green'
    },
    {
      title: 'AI Chat Assistant',
      description: 'Get help anytime with voice and text chat in Tamil and English',
      icon: MessageCircle,
      href: '/ai-chat',
      color: 'purple'
    },
    {
      title: 'AI Business Predictions',
      description: 'Advanced analytics and 7-day forecasts for your business',
      icon: Brain,
      href: '/ai-prediction',
      color: 'orange'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary-100 text-primary-600 hover:bg-primary-200'
      case 'secondary': return 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
      case 'green': return 'bg-green-100 text-green-600 hover:bg-green-200'
      case 'purple': return 'bg-purple-100 text-purple-600 hover:bg-purple-200'
      case 'orange': return 'bg-orange-100 text-orange-600 hover:bg-orange-200'
      default: return 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary-600 mb-4">
            DailyCartAI 🛒
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your Smart Street Food Assistant
          </p>
        </div>

        {/* Greeting Card */}
        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {getFriendlyGreeting(currentTime, weather)}
              </h2>
              <p className="text-gray-600">
                Ready to make today profitable, Anna? Let's get started! 💪
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getWeatherIcon(weather.condition)}
                <span className="text-lg font-medium">{weather.temperature}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">
                  {currentTime.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link key={index} href={feature.href}>
                <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(feature.color)} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium text-sm">
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Expected Sales</p>
              <p className="text-xl font-bold text-blue-600">₹1,200</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Items to Order</p>
              <p className="text-xl font-bold text-green-600">3</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Nearby Suppliers</p>
              <p className="text-xl font-bold text-orange-600">5</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Group Buy Partners</p>
              <p className="text-xl font-bold text-purple-600">3</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card text-center py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of street food vendors who are already using DailyCartAI to increase profits, 
            reduce waste, and grow their business with smart technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory">
              <button className="btn-primary">
                Start with Inventory Prediction
              </button>
            </Link>
            <Link href="/ai-chat">
              <button className="btn-secondary">
                Chat with AI Assistant
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>Made with ❤️ for Indian Street Food Vendors</p>
          <p className="mt-1">DailyCartAI - Your Daily Support Partner</p>
        </div>
      </div>
    </div>
  )
} 