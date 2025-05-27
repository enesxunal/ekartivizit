'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/data/products'

export interface CartItem {
  id: string
  product: Product
  quantity: number // Ürünün kendi adedi (1000 adet, 2000 adet gibi)
  cartQuantity: number // Sepetteki bu ürün sayısı (1 tane, 2 tane gibi)
  selectedMaterial?: string
  selectedSize?: string
  selectedWindow?: string
  selectedExtras?: string[]
  customWidth?: string
  customHeight?: string
  price: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'id' | 'cartQuantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // LocalStorage'dan sepeti yükle
  useEffect(() => {
    const savedCart = localStorage.getItem('ekartvizit-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Sepet verisi yüklenirken hata:', error)
      }
    }
  }, [])

  // Sepet değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('ekartvizit-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (newItem: Omit<CartItem, 'id' | 'cartQuantity'>) => {
    const id = `${newItem.product.id}-${newItem.selectedMaterial}-${newItem.selectedSize}-${newItem.quantity}-${Date.now()}`
    const cartItem: CartItem = {
      ...newItem,
      cartQuantity: 1, // Başlangıçta 1 tane ekleniyor
      id
    }
    setItems(prev => [...prev, cartItem])
  }

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, cartQuantity: number) => {
    if (cartQuantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, cartQuantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.cartQuantity), 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + (item.quantity * item.cartQuantity), 0)
  }

  const getItemCount = () => {
    return items.length
  }

      return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 