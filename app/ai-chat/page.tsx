'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle
} from 'lucide-react'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  isVoice?: boolean
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Vanakkam Anna! 🌟 I\'m your DailyCartAI assistant. How can I help you today? You can ask me about inventory, suppliers, weather predictions, or just chat!',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const lowerMessage = userMessage.toLowerCase()
    
    // Simple AI responses based on keywords
    if (lowerMessage.includes('tomato') || lowerMessage.includes('வெள்ளரி')) {
      return 'Tomato price today is around ₹40-45 per kg. Weather looks good, so 3kg should be enough for today! 🌞'
    }
    
    if (lowerMessage.includes('onion') || lowerMessage.includes('வெங்காயம்')) {
      return 'Onion prices are stable at ₹35-40 per kg. I suggest 2kg for today\'s business. Good choice! 🧅'
    }
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('வானிலை')) {
      return 'Today\'s weather is sunny with 28°C. Perfect for street food business! Customers will be out. ☀️'
    }
    
    if (lowerMessage.includes('supplier') || lowerMessage.includes('சப்ளையர்')) {
      return 'I found Raja Wholesale nearby - 500m away with good prices. Want me to show you their rates? 📍'
    }
    
    if (lowerMessage.includes('group buy') || lowerMessage.includes('குழு வாங்குதல்')) {
      return 'Great idea! I found 3 vendors nearby who want to bulk order. You can save ₹50-100 together! 👥'
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('உதவி')) {
      return 'I can help you with:\n• Inventory predictions\n• Finding suppliers\n• Weather updates\n• Group buying\n• Business advice\nJust ask me anything! 💪'
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('வணக்கம்')) {
      return 'Vanakkam Anna! How\'s business today? Need any help with inventory or suppliers? 🌟'
    }
    
    // Default responses
    const defaultResponses = [
      'Interesting question, Anna! Let me think about that... 🤔',
      'I understand your concern. Here\'s what I suggest... 💡',
      'That\'s a great point! Based on today\'s data... 📊',
      'I\'m here to help you succeed, Anna! Let\'s figure this out together. 💪',
      'Thanks for asking! Here\'s my advice for street food vendors... 🍽️'
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const sendMessage = async (content: string, isVoice: boolean = false) => {
    if (!content.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      isVoice
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Generate AI response
    const aiResponse = await generateAIResponse(content)
    
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiMessage])
    setIsTyping(false)

    // Auto-speak AI response
    if (isVoice) {
      speakText(aiResponse)
    }
  }

  const handleSend = () => {
    sendMessage(inputMessage)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const startListening = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      const voiceCommands = [
        'How much tomato should I buy today?',
        'Find me nearby suppliers',
        'What\'s the weather like?',
        'Help me with group buying',
        'Tell me about onion prices'
      ]
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)]
      setIsListening(false)
      sendMessage(randomCommand, true)
    }, 2000)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const speakText = (text: string) => {
    setIsSpeaking(true)
    // Simulate text-to-speech
    setTimeout(() => {
      setIsSpeaking(false)
    }, 3000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          AI Chat Assistant 🤖
        </h1>
        <p className="text-lg text-gray-600">
          Your friendly AI companion for street food business
        </p>
      </div>

      {/* Chat Container */}
      <div className="card h-[600px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <Bot className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                      <span>{formatTime(message.timestamp)}</span>
                      {message.isVoice && (
                        <span className="flex items-center space-x-1">
                          <Mic className="w-3 h-3" />
                          <span>Voice</span>
                        </span>
                      )}
                    </div>
                  </div>
                  {message.type === 'user' && (
                    <User className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-primary-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            {/* Voice Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or use voice..."
                className="input-field pr-12"
                disabled={isListening}
              />
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim() || isListening}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Voice/Speech Toggle */}
            <button
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`p-3 rounded-lg transition-colors ${
                isSpeaking 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Voice Status */}
          {isListening && (
            <div className="mt-2 text-center">
              <div className="inline-flex items-center space-x-2 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm">Listening... Speak now!</span>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              'Weather today?',
              'Tomato price?',
              'Find suppliers',
              'Group buy help',
              'Business advice'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 card">
        <div className="flex items-center space-x-2 mb-3">
          <HelpCircle className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-800">How to use AI Chat</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium mb-1">🎤 Voice Commands:</p>
            <p>Click the microphone button and speak naturally in Tamil or English</p>
          </div>
          <div>
            <p className="font-medium mb-1">💬 Text Chat:</p>
            <p>Type your questions about inventory, suppliers, weather, or business</p>
          </div>
          <div>
            <p className="font-medium mb-1">🔊 Voice Response:</p>
            <p>Toggle the speaker button to hear AI responses spoken aloud</p>
          </div>
          <div>
            <p className="font-medium mb-1">⚡ Quick Actions:</p>
            <p>Use the suggestion buttons for common questions</p>
          </div>
        </div>
      </div>
    </div>
  )
} 