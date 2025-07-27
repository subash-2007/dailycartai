'use client'

import React, { useState, useEffect } from 'react'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Calendar,
  Sun,
  Cloud,
  CloudRain,
  DollarSign,
  Users,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'
import { predictWeather, formatCurrency, getDayNameTamil } from '../../lib/utils'

interface PredictionData {
  date: string
  weather: string
  temperature: number
  expectedSales: number
  recommendedItems: {
    name: string
    quantity: number
    reason: string
    confidence: number
  }[]
  marketTrends: {
    trend: 'up' | 'down' | 'stable'
    item: string
    percentage: number
    reason: string
  }[]
  businessInsights: {
    type: 'success' | 'warning' | 'info'
    title: string
    description: string
    action?: string
  }[]
}

export default function AIPredictionPage() {
  const [userLocation, setUserLocation] = useState('')
  const [predictions, setPredictions] = useState<PredictionData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const generatePredictions = async () => {
    if (!userLocation) {
      alert('Please enter your location first!')
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate predictions for next 7 days
    const next7Days: PredictionData[] = []
    
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      
      const weatherData = predictWeather(userLocation, date)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isRaining = weatherData.condition === 'rainy'
      const isHot = weatherData.temperature > 30
      
      // Calculate expected sales based on weather and day
      let baseSales = 1000
      if (isWeekend) baseSales *= 1.3
      if (isRaining) baseSales *= 0.7
      if (isHot) baseSales *= 1.1
      
      const prediction: PredictionData = {
        date: date.toISOString().split('T')[0],
        weather: weatherData.condition,
        temperature: weatherData.temperature,
        expectedSales: Math.round(baseSales),
        recommendedItems: [
          {
            name: 'Tomato',
            quantity: isWeekend ? 4 : 3,
            reason: isWeekend ? 'Weekend rush expected' : 'Normal demand',
            confidence: 85
          },
          {
            name: 'Onion',
            quantity: isWeekend ? 3 : 2,
            reason: isWeekend ? 'More customers' : 'Regular usage',
            confidence: 90
          },
          {
            name: 'Potato',
            quantity: isRaining ? 2.5 : 1.5,
            reason: isRaining ? 'Comfort food demand' : 'Standard amount',
            confidence: 75
          }
        ],
        marketTrends: [
          {
            trend: isWeekend ? 'up' : 'stable',
            item: 'Overall Sales',
            percentage: isWeekend ? 30 : 0,
            reason: isWeekend ? 'Weekend effect' : 'Normal day'
          },
          {
            trend: isRaining ? 'down' : 'up',
            item: 'Outdoor Items',
            percentage: isRaining ? -20 : 15,
            reason: isRaining ? 'Rain reduces outdoor eating' : 'Good weather'
          }
        ],
        businessInsights: [
          {
            type: isWeekend ? 'success' : 'info',
            title: isWeekend ? 'High Sales Expected' : 'Normal Business Day',
            description: isWeekend 
              ? 'Weekend customers typically spend 30% more. Stock up on popular items!'
              : 'Regular weekday business. Focus on quality and consistency.'
          },
          {
            type: isRaining ? 'warning' : 'success',
            title: isRaining ? 'Weather Alert' : 'Good Weather',
            description: isRaining
              ? 'Rain expected. Consider indoor setup or delivery options.'
              : 'Perfect weather for street food business!'
          }
        ]
      }
      
      next7Days.push(prediction)
    }
    
    setPredictions(next7Days)
    setIsLoading(false)
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />
      default: return <Sun className="w-6 h-6 text-yellow-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default: return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          AI Business Predictions 🧠
        </h1>
        <p className="text-lg text-gray-600">
          Advanced analytics and insights for your street food business
        </p>
      </div>

      {/* Location Input */}
      <div className="card mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-800">Set Location for Predictions</h3>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter your area (e.g., Gandhipuram, Coimbatore)"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
            className="input-field flex-1"
          />
          <button 
            onClick={generatePredictions}
            disabled={isLoading || !userLocation}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                <span>Generate Predictions</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Predictions Grid */}
      {predictions.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">7-Day Business Forecast</h2>
            <div className="text-sm text-gray-600">
              Generated on {currentTime.toLocaleDateString('en-IN')}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => (
              <div key={index} className="card">
                {/* Date Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {new Date(prediction.date).toLocaleDateString('en-IN', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {getDayNameTamil(new Date(prediction.date).getDay())}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getWeatherIcon(prediction.weather)}
                    <span className="text-lg font-medium">{prediction.temperature}°C</span>
                  </div>
                </div>

                {/* Expected Sales */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Expected Sales</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(prediction.expectedSales)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                {/* Recommended Items */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Recommended Items</h4>
                  <div className="space-y-2">
                    {prediction.recommendedItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary-600">{item.quantity} kg</p>
                          <p className={`text-xs ${getConfidenceColor(item.confidence)}`}>
                            {item.confidence}% confidence
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Trends */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Market Trends</h4>
                  <div className="space-y-2">
                    {prediction.marketTrends.map((trend, trendIndex) => (
                      <div key={trendIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(trend.trend)}
                          <span className="font-medium text-gray-800">{trend.item}</span>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            trend.trend === 'up' ? 'text-green-600' :
                            trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {trend.trend === 'up' ? '+' : ''}{trend.percentage}%
                          </p>
                          <p className="text-xs text-gray-600">{trend.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Insights */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">AI Insights</h4>
                  <div className="space-y-2">
                    {prediction.businessInsights.map((insight, insightIndex) => (
                      <div key={insightIndex} className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                        {getInsightIcon(insight.type)}
                        <div>
                          <p className="font-medium text-gray-800">{insight.title}</p>
                          <p className="text-sm text-gray-600">{insight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Best Day</p>
                <p className="text-lg font-bold text-green-600">
                  {predictions.reduce((best, current) => 
                    current.expectedSales > best.expectedSales ? current : best
                  ).date}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Expected</p>
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(predictions.reduce((sum, p) => sum + p.expectedSales, 0))}
                </p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Peak Hours</p>
                <p className="text-lg font-bold text-yellow-600">12-2 PM</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {predictions.length === 0 && !isLoading && (
        <div className="card text-center py-12">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Get AI-Powered Business Predictions
          </h3>
          <p className="text-gray-600 mb-4">
            Enter your location to get advanced analytics, sales forecasts, and business insights for the next 7 days.
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing market data and generating predictions...</p>
        </div>
      )}
    </div>
  )
} 