'use client'

import React, { useState, useEffect } from 'react'
import { 
  Package, 
  TrendingUp, 
  Calendar, 
  Sun, 
  Cloud, 
  CloudRain,
  Plus,
  Minus,
  Save,
  RefreshCw
} from 'lucide-react'
import { predictInventoryNeeds, predictWeather, getFriendlyGreeting, formatCurrency, SalesData, WeatherData } from '../../lib/utils'

interface InventoryItem {
  name: string
  currentStock: number
  unit: string
  pricePerUnit: number
  supplier: string
  lastOrderDate: string
}

export default function InventoryPage() {
  const [userLocation, setUserLocation] = useState('')
  const [weather, setWeather] = useState<WeatherData>({ condition: 'sunny', temperature: 28, humidity: 60 })
  const [predictions, setPredictions] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

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

  const generatePredictions = async () => {
    if (!userLocation) {
      alert('Please set your location first!')
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Get weather prediction
    const weatherData = predictWeather(userLocation, currentTime)
    setWeather(weatherData)
    
    // Generate inventory predictions
    const mockHistoricalData: SalesData[] = [] // In real app, this would be actual sales data
    const predictions = predictInventoryNeeds(mockHistoricalData, weatherData, currentTime.getDay())
    
    setPredictions(predictions)
    setIsLoading(false)
  }

  const updateQuantity = (index: number, change: number) => {
    const newPredictions = [...predictions]
    newPredictions[index].currentStock = Math.max(0, newPredictions[index].currentStock + change)
    setPredictions(newPredictions)
  }

  const getTotalCost = () => {
    return predictions.reduce((total, item) => total + (item.currentStock * item.pricePerUnit), 0)
  }

  const getReasoning = (item: InventoryItem) => {
    const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6
    const isRaining = weather.condition === 'rainy'
    const isHot = weather.temperature > 30

    let reasons: string[] = []
    
    if (isWeekend) reasons.push('Weekend rush expected!')
    if (isRaining && item.name === 'Potato') reasons.push('Rainy day - more comfort food needed!')
    if (isHot && item.name === 'Tomato') reasons.push('Hot day - more salads expected')
    if (item.currentStock > 3) reasons.push('High demand item')
    
    return reasons.length > 0 ? reasons.join(', ') : 'Standard daily requirement'
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          Smart Inventory Prediction 🧠
        </h1>
        <p className="text-lg text-gray-600">
          {getFriendlyGreeting(currentTime, weather)}
        </p>
      </div>

      {/* Weather and Location Card */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)} Day
              </h3>
              <p className="text-gray-600">
                {weather.temperature}°C, {weather.humidity}% humidity
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Location Input */}
      <div className="card mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Package className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-800">Set Your Location</h3>
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
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4" />
                <span>Generate Predictions</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Predictions */}
      {predictions.length > 0 && (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="card">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Today's Smart Predictions</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Estimated Cost</p>
                <p className="text-2xl font-bold text-primary-600">{formatCurrency(getTotalCost())}</p>
              </div>
            </div>
          </div>

          {/* Individual Items */}
          {predictions.map((item, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">{getReasoning(item)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Price per {item.unit}</p>
                  <p className="text-lg font-semibold text-secondary-600">{formatCurrency(item.pricePerUnit)}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(index, -0.5)}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4 text-red-600" />
                  </button>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      {item.currentStock} {item.unit}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(item.currentStock * item.pricePerUnit)}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => updateQuantity(index, 0.5)}
                    className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 text-green-600" />
                  </button>
                </div>
                
                <button className="btn-secondary flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="card">
            <div className="flex space-x-4">
              <button className="btn-primary flex-1">
                Place All Orders
              </button>
              <button className="btn-secondary flex-1">
                Find Group Buy Partners
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {predictions.length === 0 && !isLoading && (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ready to Get Smart Predictions?
          </h3>
          <p className="text-gray-600 mb-4">
            Set your location and let AI analyze weather, day of week, and historical data to suggest the perfect inventory for today.
          </p>
        </div>
      )}
    </div>
  )
} 