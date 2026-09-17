'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { CartItem } from './CartContext'

export interface Order {
  id: string
  userId?: string
  items: CartItem[]
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: { street: string; city: string; district: string; postalCode: string }
  }
  status: 'pending' | 'confirmed' | 'preparing' | 'printing' | 'shipping' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'whatsapp' | 'credit-card' | 'bank-transfer' | 'cash-on-delivery'
  subtotal: number
  discount: number
  discountCode?: string
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
  getOrderById: (orderId: string) => Order | undefined
  getUserOrders: (userId: string) => Order[]
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void
  cancelOrder: (orderId: string, reason?: string) => Promise<{ success: boolean; message: string }>
  getOrdersByStatus: (status: Order['status']) => Order[]
  searchOrders: (query: string) => Order[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  const refreshOrders = async () => {
    try {
      const response = await fetch('/api/orders', { cache: 'no-store' })
      const data = await response.json()
      if (response.ok && Array.isArray(data.orders)) setOrders(data.orders)
    } catch (error) {
      console.error('Siparisler yuklenemedi:', error)
    }
  }

  useEffect(() => { void refreshOrders() }, [])

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderData.items,
          customerInfo: orderData.customerInfo,
          paymentMethod: orderData.paymentMethod,
          discountCode: orderData.discountCode,
          notes: orderData.notes
        })
      })
      const data = await response.json()
      if (!response.ok || !data.order) return { success: false, message: data.message ?? 'Siparis olusturulamadi.' }
      setOrders((current) => [data.order, ...current.filter((order) => order.id !== data.order.id)])
      return { success: true, orderId: data.orderId, message: data.message ?? 'Siparis basariyla olusturuldu.' }
    } catch {
      return { success: false, message: 'Siparis olusturulurken bir hata olustu.' }
    }
  }

  const getOrder = (orderId: string) => orders.find((order) => order.id === orderId)
  const getUserOrders = (userId: string) => orders.filter((order) => order.userId === userId)

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    if (!response.ok) return
    const data = await response.json()
    if (data.order) setOrders((current) => current.map((order) => order.id === orderId ? data.order : order))
  }

  const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
    setOrders((current) => current.map((order) => order.id === orderId ? { ...order, paymentStatus } : order))
  }

  const cancelOrder = async (orderId: string, reason?: string) => {
    const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'cancelled', notes: reason ? `Iptal nedeni: ${reason}` : 'Siparis iptal edildi' }) })
    const data = await response.json().catch(() => ({}))
    if (response.ok && data.order) setOrders((current) => current.map((order) => order.id === orderId ? data.order : order))
    return { success: response.ok, message: data.message ?? (response.ok ? 'Siparis iptal edildi.' : 'Siparis iptal edilemedi.') }
  }

  const getOrdersByStatus = (status: Order['status']) => orders.filter((order) => order.status === status)
  const searchOrders = (query: string) => {
    const normalized = query.toLowerCase()
    return orders.filter((order) => order.id.toLowerCase().includes(normalized) || order.customerInfo.name.toLowerCase().includes(normalized) || order.customerInfo.email.toLowerCase().includes(normalized))
  }

  return <OrderContext.Provider value={{ orders, createOrder, getOrder, getOrderById: getOrder, getUserOrders, updateOrderStatus, updatePaymentStatus, cancelOrder, getOrdersByStatus, searchOrders }}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrders must be used within an OrderProvider')
  return context
}
