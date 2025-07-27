# DailyCartAI 🛒

**Your Smart Assistant for Indian Street Food Vendors**

DailyCartAI is a friendly, intelligent assistant designed specifically for Indian street food vendors. It helps you manage inventory, find the best suppliers, connect with other vendors for group buying, and make your daily business more profitable.

## 🌟 Features

### 🤖 Smart Inventory Prediction
- Predicts raw material needs based on:
  - Historical sales data
  - Day of the week (weekend vs weekday)
  - Weather conditions
  - Seasonal trends

### 📍 Location-Based Supplier Finder
- Find nearby suppliers with best prices
- Real-time distance and pricing information
- Supplier ratings and contact details
- Bulk order discounts

### 👥 Group Buying Coordination
- Connect with nearby vendors
- Pool orders for better prices
- Share delivery costs
- Build vendor communities

### 🌤️ Weather-Aware Planning
- Adjust inventory based on weather
- Rainy day = more comfort food
- Hot day = more refreshing items
- Seasonal recommendations

### 💰 Cost Optimization
- Compare supplier prices
- Calculate potential savings
- Track expenses
- Budget-friendly suggestions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dailycart-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### 1. Set Your Location
- Enter your area (e.g., "Gandhipuram, Coimbatore")
- This helps find nearby suppliers and other vendors

### 2. Get Smart Predictions
- Click "Predict Inventory" to get AI-powered suggestions
- Adjust quantities based on weather and day of week
- See reasoning for each prediction

### 3. Find Suppliers
- Click "Find Suppliers" to see nearby options
- Compare prices and distances
- Check ratings and contact details

### 4. Group Buying
- Click "Group Buy" to connect with other vendors
- Pool orders for better prices
- Share delivery costs

## 🗣️ Language Support

DailyCartAI speaks in a friendly Tamil-English mixed tone:
- **Tamil**: காலை வணக்கம்! (Good morning!)
- **English**: Ready to make today profitable, Anna?
- **Mixed**: Vanakkam Anna! Today looks like tomato 3kg and onion 2kg will be enough.

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📱 Mobile-Friendly

The application is fully responsive and works great on:
- Mobile phones
- Tablets
- Desktop computers

## 🔧 Customization

### Adding New Items
Edit `lib/utils.ts` to add new inventory items:
```typescript
{
  name: 'New Item',
  currentStock: 0,
  unit: 'kg',
  pricePerUnit: 30,
  supplier: 'Local Market',
  lastOrderDate: new Date().toISOString()
}
```

### Adding New Suppliers
Add suppliers to the `findNearbySuppliers` function:
```typescript
{
  name: 'New Supplier',
  location: 'Your Area, City',
  distance: '1km',
  items: ['Tomato', 'Onion'],
  prices: { 'Tomato': 35, 'Onion': 40 },
  rating: 4.5,
  phone: '+91 98765 43210'
}
```

## 🌐 API Integration (Future)

The application is designed to easily integrate with:
- Weather APIs (OpenWeatherMap, AccuWeather)
- Geolocation APIs (Google Maps, Mapbox)
- Payment gateways (Razorpay, Paytm)
- SMS/WhatsApp APIs for notifications

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own street food business!

## 🆘 Support

Need help? Contact us:
- Email: support@dailycartai.com
- WhatsApp: +91 98765 43210
- Website: www.dailycartai.com

## 🙏 Acknowledgments

- Indian street food vendors for inspiration
- Tamil Nadu street food community
- Open source contributors

---

**Made with ❤️ for Indian Street Food Vendors**

*DailyCartAI - Your Daily Support Partner* 