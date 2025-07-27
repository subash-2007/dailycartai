import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DailyCartAI - Smart Assistant for Street Food Vendors',
  description: 'Your friendly AI assistant for managing inventory, finding suppliers, and connecting with other vendors for group buying.',
  keywords: 'street food, vendor, inventory, AI assistant, Tamil, India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 