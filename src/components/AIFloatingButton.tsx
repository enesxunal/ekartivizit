'use client'

import { useState, useEffect } from 'react'
import { Bot, X } from 'lucide-react'

export default function AIFloatingButton() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // 15 saniye sonra butonu gizle
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed left-4 bottom-20 z-50 animate-in slide-in-from-left duration-500">
      <div className="relative">
        {/* Kapatma butonu */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors z-10"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Ana buton */}
        <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 cursor-pointer group max-w-xs">
          <Bot className="h-5 w-5 group-hover:animate-pulse flex-shrink-0" />
          <span className="text-sm font-medium bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Bu site tamamen yapay zeka tarafından yapılmıştır
          </span>
        </div>

        {/* Pulse animasyonu */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg animate-ping opacity-20"></div>
      </div>
    </div>
  )
} 