'use client'

import React, { useState, useEffect } from 'react'
import { 
  MapPin, 
  Phone, 
  Star, 
  Truck, 
  Clock, 
  DollarSign,
  Search,
  Filter,
  Heart,
  MessageCircle
} from 'lucide-react'
import { findNearbySuppliers, formatCurrency } from '../../lib/utils'

interface Supplier {
  name: string
  location: string
  distance: string
  items: string[]
  prices: Record<string, number>
  rating: number
  phone: string
}

export default function SuppliersPage() {
  const [userLocation, setUserLocation] = useState('')
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState('all')
  const [sortBy, setSortBy] = useState('distance')
  const [isLoading, setIsLoading] = useState(false)

  const allItems = ['Tomato', 'Onion', 'Potato', 'Carrot', 'Cabbage', 'Beans']

  const findSuppliers = async () => {
    if (!userLocation) {
      alert('Please enter your location first!')
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const nearbySuppliers = findNearbySuppliers(userLocation)
    setSuppliers(nearbySuppliers)
    setFilteredSuppliers(nearbySuppliers)
    setIsLoading(false)
  }

  useEffect(() => {
    let filtered = [...suppliers]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by item
    if (selectedItem !== 'all') {
      filtered = filtered.filter(supplier => 
        supplier.items.includes(selectedItem)
      )
    }

    // Sort suppliers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance)
        case 'rating':
          return b.rating - a.rating
        case 'price':
          const aAvgPrice = Object.values(a.prices).reduce((sum, price) => sum + price, 0) / Object.values(a.prices).length
          const bAvgPrice = Object.values(b.prices).reduce((sum, price) => sum + price, 0) / Object.values(b.prices).length
          return aAvgPrice - bAvgPrice
        default:
          return 0
      }
    })

    setFilteredSuppliers(filtered)
  }, [suppliers, searchTerm, selectedItem, sortBy])

  const getBestPrice = (supplier: Supplier, item: string) => {
    return supplier.prices[item] || 'N/A'
  }

  const getAveragePrice = (supplier: Supplier) => {
    const prices = Object.values(supplier.prices)
    return prices.length > 0 ? prices.reduce((sum, price) => sum + price, 0) / prices.length : 0
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          Find Nearby Suppliers 📍
        </h1>
        <p className="text-lg text-gray-600">
          Discover the best prices and suppliers in your area
        </p>
      </div>

      {/* Location Input */}
      <div className="card mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-800">Your Location</h3>
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
            onClick={findSuppliers}
            disabled={isLoading || !userLocation}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Find Suppliers'}
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      {suppliers.length > 0 && (
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Item Filter */}
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="input-field"
            >
              <option value="all">All Items</option>
              {allItems.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center text-gray-600">
              {filteredSuppliers.length} suppliers found
            </div>
          </div>
        </div>
      )}

      {/* Suppliers List */}
      {filteredSuppliers.length > 0 && (
        <div className="space-y-4">
          {filteredSuppliers.map((supplier, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between">
                {/* Supplier Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{supplier.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="w-4 h-4" />
                      <span>{supplier.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Open Now</span>
                    </div>
                  </div>

                  {/* Available Items */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Available Items:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {supplier.items.map(item => (
                        <div key={item} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{item}</span>
                          <span className="text-sm font-semibold text-secondary-600">
                            {formatCurrency(supplier.prices[item])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Average Price */}
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">Average price:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(getAveragePrice(supplier))}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 ml-4">
                  <button className="btn-primary flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                  <button className="btn-secondary flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {suppliers.length === 0 && !isLoading && (
        <div className="card text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Find Suppliers Near You
          </h3>
          <p className="text-gray-600 mb-4">
            Enter your location to discover nearby suppliers with the best prices and quality.
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for suppliers in your area...</p>
        </div>
      )}
    </div>
  )
} 