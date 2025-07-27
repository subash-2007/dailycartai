// Utility functions for DailyCartAI

export interface WeatherData {
  condition: 'sunny' | 'cloudy' | 'rainy'
  temperature: number
  humidity: number
}

export interface SalesData {
  date: string
  items: {
    name: string
    quantity: number
    revenue: number
  }[]
  totalRevenue: number
  customerCount: number
}

export interface InventoryItem {
  name: string
  currentStock: number
  unit: string
  pricePerUnit: number
  supplier: string
  lastOrderDate: string
}

export interface Supplier {
  name: string
  location: string
  distance: string
  items: string[]
  prices: Record<string, number>
  rating: number
  phone: string
}

// Weather prediction based on location and date
export function predictWeather(location: string, date: Date): WeatherData {
  // Mock weather prediction - in real app, this would call a weather API
  const month = date.getMonth()
  const isMonsoon = month >= 5 && month <= 9
  const isSummer = month >= 3 && month <= 5
  
  if (isMonsoon) {
    return {
      condition: 'rainy',
      temperature: 25 + Math.random() * 5,
      humidity: 80 + Math.random() * 15
    }
  } else if (isSummer) {
    return {
      condition: 'sunny',
      temperature: 30 + Math.random() * 8,
      humidity: 40 + Math.random() * 20
    }
  } else {
    return {
      condition: 'cloudy',
      temperature: 20 + Math.random() * 10,
      humidity: 60 + Math.random() * 20
    }
  }
}

// Predict inventory needs based on historical data, weather, and day of week
export function predictInventoryNeeds(
  historicalSales: SalesData[],
  weather: WeatherData,
  dayOfWeek: number
): InventoryItem[] {
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
  const isRaining = weather.condition === 'rainy'
  const isHot = weather.temperature > 30
  
  // Base predictions
  const predictions: InventoryItem[] = [
    {
      name: 'Tomato',
      currentStock: 0,
      unit: 'kg',
      pricePerUnit: 40,
      supplier: 'Local Market',
      lastOrderDate: new Date().toISOString()
    },
    {
      name: 'Onion',
      currentStock: 0,
      unit: 'kg',
      pricePerUnit: 35,
      supplier: 'Local Market',
      lastOrderDate: new Date().toISOString()
    },
    {
      name: 'Potato',
      currentStock: 0,
      unit: 'kg',
      pricePerUnit: 25,
      supplier: 'Local Market',
      lastOrderDate: new Date().toISOString()
    }
  ]
  
  // Adjust based on conditions
  predictions.forEach(item => {
    let multiplier = 1
    
    if (isWeekend) multiplier *= 1.3
    if (isRaining) {
      if (item.name === 'Potato') multiplier *= 1.5 // More comfort food
      else multiplier *= 0.8 // Less outdoor eating
    }
    if (isHot) {
      if (item.name === 'Tomato') multiplier *= 1.2 // More salads
      else multiplier *= 0.9
    }
    
    // Calculate based on historical average
    const avgDailySales = historicalSales.length > 0 
      ? historicalSales.reduce((sum, sale) => {
          const itemSale = sale.items.find(i => i.name === item.name)
          return sum + (itemSale?.quantity || 0)
        }, 0) / historicalSales.length
      : 2 // Default if no history
    
    item.currentStock = Math.round(avgDailySales * multiplier * 10) / 10
  })
  
  return predictions
}

// Find nearby suppliers based on location
export function findNearbySuppliers(location: string): Supplier[] {
  // Mock supplier data - in real app, this would use geolocation APIs
  const mockSuppliers: Supplier[] = [
    {
      name: 'Raja Wholesale',
      location: 'Gandhipuram, Coimbatore',
      distance: '500m',
      items: ['Tomato', 'Onion', 'Potato', 'Carrot'],
      prices: {
        'Tomato': 38,
        'Onion': 42,
        'Potato': 28,
        'Carrot': 45
      },
      rating: 4.5,
      phone: '+91 98765 43210'
    },
    {
      name: 'A1 Veg Mart',
      location: 'RS Puram, Coimbatore',
      distance: '800m',
      items: ['Tomato', 'Onion', 'Potato', 'Cabbage'],
      prices: {
        'Tomato': 40,
        'Onion': 45,
        'Potato': 30,
        'Cabbage': 35
      },
      rating: 4.2,
      phone: '+91 98765 43211'
    },
    {
      name: 'Fresh Farm Direct',
      location: 'Peelamedu, Coimbatore',
      distance: '1.2km',
      items: ['Tomato', 'Onion', 'Potato', 'Beans'],
      prices: {
        'Tomato': 35,
        'Onion': 40,
        'Potato': 25,
        'Beans': 50
      },
      rating: 4.7,
      phone: '+91 98765 43212'
    }
  ]
  
  return mockSuppliers
}

// Calculate potential savings from group buying
export function calculateGroupBuySavings(
  suppliers: Supplier[],
  items: InventoryItem[]
): { supplier: Supplier; savings: number; totalCost: number }[] {
  return suppliers.map(supplier => {
    let totalCost = 0
    let savings = 0
    
    items.forEach(item => {
      const supplierPrice = supplier.prices[item.name] || item.pricePerUnit
      const regularCost = item.pricePerUnit * item.currentStock
      const supplierCost = supplierPrice * item.currentStock
      
      totalCost += supplierCost
      savings += regularCost - supplierCost
    })
    
    // Additional bulk discount
    if (totalCost > 500) {
      const bulkDiscount = totalCost * 0.1 // 10% bulk discount
      savings += bulkDiscount
      totalCost -= bulkDiscount
    }
    
    return { supplier, savings: Math.round(savings), totalCost: Math.round(totalCost) }
  }).sort((a, b) => b.savings - a.savings)
}

// Get friendly greeting based on time and weather
export function getFriendlyGreeting(time: Date, weather: WeatherData): string {
  const hour = time.getHours()
  const isRaining = weather.condition === 'rainy'
  const isHot = weather.temperature > 30
  
  let greeting = ''
  
  if (hour < 12) {
    greeting = 'காலை வணக்கம்! Good Morning! 🌅'
  } else if (hour < 17) {
    greeting = 'மதிய வணக்கம்! Good Afternoon! 🌞'
  } else {
    greeting = 'மாலை வணக்கம்! Good Evening! 🌆'
  }
  
  if (isRaining) {
    greeting += ' Rainy day - perfect for hot food! ☔'
  } else if (isHot) {
    greeting += ' Hot day - stay hydrated, Anna! 💧'
  }
  
  return greeting
}

// Format currency in Indian Rupees
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Get day name in Tamil
export function getDayNameTamil(dayOfWeek: number): string {
  const days = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி']
  return days[dayOfWeek]
} 