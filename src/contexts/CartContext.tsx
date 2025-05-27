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
  customDesign?: {
    designId: string
    designTitle: string
    pdfUrl: string
    createdAt: string
  }
}

interface CartContextType {
  items: CartItem[]
  cart: CartItem[] // Alias for items
  addToCart: (item: Omit<CartItem, 'id' | 'cartQuantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateProductQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  getItemCount: () => number
  isInCart: (productId: string) => boolean
  getCartItemByProduct: (productId: string) => CartItem | undefined
  applyDiscount: (discountCode: string) => { success: boolean; message: string; discount: number }
  getDiscountedTotal: () => number
  discount: number
  appliedDiscount: { code: string; discount: number } | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [discount, setDiscount] = useState<number>(0)
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; discount: number } | null>(null)

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

  const updateProductQuantity = (id: string, quantity: number) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const isInCart = (productId: string) => {
    return items.some(item => item.product.id === productId)
  }

  const getCartItemByProduct = (productId: string) => {
    return items.find(item => item.product.id === productId)
  }

  const applyDiscount = (discountCode: string) => {
    const discountCodes: Record<string, number> = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'FIRST50': 50,
      'STUDENT15': 15
    }

    if (discountCodes[discountCode]) {
      setDiscount(discountCodes[discountCode])
      setAppliedDiscount({ code: discountCode, discount: discountCodes[discountCode] })
      return {
        success: true,
        message: `%${discountCodes[discountCode]} indirim uygulandı!`,
        discount: discountCodes[discountCode]
      }
    }

    return {
      success: false,
      message: 'Geçersiz indirim kodu',
      discount: 0
    }
  }

  const getDiscountedTotal = () => {
    const total = getTotalPrice()
    return total - (total * discount / 100)
  }

  return (
    <CartContext.Provider value={{
      items,
      cart: items, // Alias for items
      addToCart,
      removeFromCart,
      updateQuantity,
      updateProductQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      getItemCount,
      isInCart,
      getCartItemByProduct,
      applyDiscount,
      getDiscountedTotal,
      discount,
      appliedDiscount
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