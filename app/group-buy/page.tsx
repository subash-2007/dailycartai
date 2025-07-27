'use client'

import React, { useState, useEffect } from 'react'
import { 
  Users, 
  DollarSign, 
  MapPin, 
  MessageCircle, 
  Phone,
  Plus,
  Minus,
  Heart,
  Star,
  Clock,
  Truck
} from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

interface GroupBuyPartner {
  id: string
  name: string
  location: string
  distance: string
  items: { name: string; quantity: number; unit: string }[]
  totalValue: number
  rating: number
  phone: string
  isOnline: boolean
  lastActive: string
}

interface GroupBuyOpportunity {
  id: string
  supplier: string
  supplierLocation: string
  items: { name: string; quantity: number; unit: string; price: number }[]
  totalCost: number
  potentialSavings: number
  participants: GroupBuyPartner[]
  maxParticipants: number
  deadline: string
  status: 'open' | 'full' | 'closed'
}

export default function GroupBuyPage() {
  const [userLocation, setUserLocation] = useState('')
  const [opportunities, setOpportunities] = useState<GroupBuyOpportunity[]>([])
  const [myItems, setMyItems] = useState([
    { name: 'Tomato', quantity: 3, unit: 'kg', price: 40 },
    { name: 'Onion', quantity: 2, unit: 'kg', price: 35 },
    { name: 'Potato', quantity: 1.5, unit: 'kg', price: 25 }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const mockPartners: GroupBuyPartner[] = [
    {
      id: '1',
      name: 'Raja Anna',
      location: 'Gandhipuram',
      distance: '500m',
      items: [
        { name: 'Tomato', quantity: 2, unit: 'kg' },
        { name: 'Onion', quantity: 1.5, unit: 'kg' }
      ],
      totalValue: 120,
      rating: 4.5,
      phone: '+91 98765 43210',
      isOnline: true,
      lastActive: '2 min ago'
    },
    {
      id: '2',
      name: 'Kumar Brother',
      location: 'RS Puram',
      distance: '800m',
      items: [
        { name: 'Potato', quantity: 2, unit: 'kg' },
        { name: 'Carrot', quantity: 1, unit: 'kg' }
      ],
      totalValue: 90,
      rating: 4.2,
      phone: '+91 98765 43211',
      isOnline: true,
      lastActive: '5 min ago'
    },
    {
      id: '3',
      name: 'Murugan Uncle',
      location: 'Peelamedu',
      distance: '1.2km',
      items: [
        { name: 'Tomato', quantity: 1.5, unit: 'kg' },
        { name: 'Onion', quantity: 2, unit: 'kg' },
        { name: 'Cabbage', quantity: 1, unit: 'kg' }
      ],
      totalValue: 140,
      rating: 4.7,
      phone: '+91 98765 43212',
      isOnline: false,
      lastActive: '15 min ago'
    }
  ]

  const findGroupBuyOpportunities = async () => {
    if (!userLocation) {
      alert('Please enter your location first!')
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock opportunities
    const mockOpportunities: GroupBuyOpportunity[] = [
      {
        id: '1',
        supplier: 'Raja Wholesale',
        supplierLocation: 'Gandhipuram, Coimbatore',
        items: [
          { name: 'Tomato', quantity: 8, unit: 'kg', price: 35 },
          { name: 'Onion', quantity: 6, unit: 'kg', price: 32 },
          { name: 'Potato', quantity: 4, unit: 'kg', price: 22 }
        ],
        totalCost: 580,
        potentialSavings: 120,
        participants: mockPartners.slice(0, 2),
        maxParticipants: 5,
        deadline: '2024-01-15T18:00:00',
        status: 'open'
      },
      {
        id: '2',
        supplier: 'Fresh Farm Direct',
        supplierLocation: 'Peelamedu, Coimbatore',
        items: [
          { name: 'Carrot', quantity: 5, unit: 'kg', price: 40 },
          { name: 'Beans', quantity: 3, unit: 'kg', price: 45 }
        ],
        totalCost: 335,
        potentialSavings: 85,
        participants: [mockPartners[2]],
        maxParticipants: 3,
        deadline: '2024-01-15T16:00:00',
        status: 'open'
      }
    ]
    
    setOpportunities(mockOpportunities)
    setIsLoading(false)
  }

  const updateMyItemQuantity = (index: number, change: number) => {
    const newItems = [...myItems]
    newItems[index].quantity = Math.max(0, newItems[index].quantity + change)
    setMyItems(newItems)
  }

  const getMyTotalValue = () => {
    return myItems.reduce((total, item) => total + (item.quantity * item.price), 0)
  }

  const getTotalPotentialSavings = () => {
    return opportunities.reduce((total, opp) => total + opp.potentialSavings, 0)
  }

  const joinOpportunity = (opportunityId: string) => {
    // In real app, this would make an API call
    alert('Request sent to join group buy! You will be notified when approved.')
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          Group Buying 👥
        </h1>
        <p className="text-lg text-gray-600">
          Connect with nearby vendors and save money together
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
            onClick={findGroupBuyOpportunities}
            disabled={isLoading || !userLocation}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Find Opportunities'}
          </button>
        </div>
      </div>

      {/* My Items */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">My Shopping List</h3>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-xl font-bold text-primary-600">{formatCurrency(getMyTotalValue())}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {myItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-600">{formatCurrency(item.price)} per {item.unit}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateMyItemQuantity(index, -0.5)}
                  className="p-1 bg-red-100 hover:bg-red-200 rounded"
                >
                  <Minus className="w-4 h-4 text-red-600" />
                </button>
                
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{item.quantity} {item.unit}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(item.quantity * item.price)}</div>
                </div>
                
                <button
                  onClick={() => updateMyItemQuantity(index, 0.5)}
                  className="p-1 bg-green-100 hover:bg-green-200 rounded"
                >
                  <Plus className="w-4 h-4 text-green-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Buy Opportunities */}
      {opportunities.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Available Opportunities</h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Potential Savings</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(getTotalPotentialSavings())}</p>
            </div>
          </div>

          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{opportunity.supplier}</h3>
                  <p className="text-gray-600">{opportunity.supplierLocation}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      opportunity.status === 'open' ? 'bg-green-100 text-green-800' :
                      opportunity.status === 'full' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {opportunity.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {opportunity.participants.length}/{opportunity.maxParticipants} participants
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Items to Order:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {opportunity.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-secondary-600">{item.quantity} {item.unit}</div>
                        <div className="text-xs text-gray-600">{formatCurrency(item.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost and Savings */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Cost</p>
                    <p className="text-lg font-semibold text-gray-800">{formatCurrency(opportunity.totalCost)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Potential Savings</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(opportunity.potentialSavings)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="text-sm font-medium text-red-600">
                    {new Date(opportunity.deadline).toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              {/* Participants */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Current Participants:</h4>
                <div className="space-y-2">
                  {opportunity.participants.map((partner) => (
                    <div key={partner.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${partner.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div>
                          <p className="font-medium text-gray-800">{partner.name}</p>
                          <p className="text-sm text-gray-600">{partner.location} • {partner.distance}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm">{partner.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{formatCurrency(partner.totalValue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button 
                  onClick={() => joinOpportunity(opportunity.id)}
                  disabled={opportunity.status !== 'open'}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Join Group Buy
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Group</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {opportunities.length === 0 && !isLoading && (
        <div className="card text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Find Group Buying Opportunities
          </h3>
          <p className="text-gray-600 mb-4">
            Enter your location to find nearby vendors who want to pool orders and save money together.
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for group buying opportunities...</p>
        </div>
      )}
    </div>
  )
} 