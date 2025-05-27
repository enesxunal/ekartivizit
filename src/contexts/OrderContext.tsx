'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem } from './CartContext'

export interface Order {
  id: string
  userId?: string
  items: CartItem[]
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: {
      street: string
      city: string
      district: string
      postalCode: string
    }
  }
  status: 'pending' | 'confirmed' | 'preparing' | 'printing' | 'shipping' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'whatsapp' | 'credit-card' | 'bank-transfer' | 'cash-on-delivery'
  subtotal: number
  discount: number
  shippingCost: number
  total: number
  notes?: string
  trackingNumber?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
}

interface OrderContextType {
  orders: Order[]
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; orderId?: string; message: string }>
  getOrder: (orderId: string) => Order | undefined
  getOrderById: (orderId: string) => Order | undefined // Alias for getOrder
  getUserOrders: (userId: string) => Order[]
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void
  cancelOrder: (orderId: string, reason?: string) => Promise<{ success: boolean; message: string }>
  getOrdersByStatus: (status: Order['status']) => Order[]
  searchOrders: (query: string) => Order[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // LocalStorage'dan siparişleri yükle
  useEffect(() => {
    const savedOrders = localStorage.getItem('ekartvizit-orders')
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error('Sipariş verisi yüklenirken hata:', error)
      }
    }
  }, [])

  // Siparişler değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('ekartvizit-orders', JSON.stringify(orders))
  }, [orders])

  const generateOrderId = () => {
    const timestamp = Date.now().toString()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `EK${timestamp.slice(-6)}${random}`
  }

  const generateTrackingNumber = () => {
    return `TK${Date.now().toString().slice(-8)}${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  }

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newOrder: Order = {
        ...orderData,
        id: generateOrderId(),
        trackingNumber: generateTrackingNumber(),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 gün sonra
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setOrders(prev => [newOrder, ...prev])

      return {
        success: true,
        orderId: newOrder.id,
        message: 'Sipariş başarıyla oluşturuldu!'
      }
    } catch {
      return {
        success: false,
        message: 'Sipariş oluşturulurken bir hata oluştu.'
      }
    }
  }

  const getOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId)
  }

  const getUserOrders = (userId: string) => {
    return orders.filter(order => order.userId === userId)
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ))
  }

  const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, paymentStatus, updatedAt: new Date().toISOString() }
        : order
    ))
  }

  const cancelOrder = async (orderId: string, reason?: string) => {
    try {
      const order = getOrder(orderId)
      if (!order) {
        return { success: false, message: 'Sipariş bulunamadı.' }
      }

      if (['delivered', 'cancelled'].includes(order.status)) {
        return { success: false, message: 'Bu sipariş iptal edilemez.' }
      }

      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500))

      setOrders(prev => prev.map(o => 
        o.id === orderId 
          ? { 
              ...o, 
              status: 'cancelled' as const,
              notes: reason ? `İptal nedeni: ${reason}` : 'Sipariş iptal edildi',
              updatedAt: new Date().toISOString() 
            }
          : o
      ))

      return { success: true, message: 'Sipariş başarıyla iptal edildi.' }
    } catch {
      return { success: false, message: 'Sipariş iptal edilirken bir hata oluştu.' }
    }
  }

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status)
  }

  const searchOrders = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return orders.filter(order => 
      order.id.toLowerCase().includes(lowercaseQuery) ||
      order.customerInfo.name.toLowerCase().includes(lowercaseQuery) ||
      order.customerInfo.email.toLowerCase().includes(lowercaseQuery) ||
      order.trackingNumber?.toLowerCase().includes(lowercaseQuery)
    )
  }

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrder,
      getOrderById: getOrder, // Alias for getOrder
      getUserOrders,
      updateOrderStatus,
      updatePaymentStatus,
      cancelOrder,
      getOrdersByStatus,
      searchOrders
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
} 