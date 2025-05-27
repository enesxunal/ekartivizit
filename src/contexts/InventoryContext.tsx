'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface StockItem {
  productId: string
  materialId?: string
  sizeId?: string
  quantity: number
  reserved: number // Sepetlerde rezerve edilen miktar
  minStock: number
  maxStock: number
  lastUpdated: string
}

interface InventoryContextType {
  stockItems: StockItem[]
  getStock: (productId: string, materialId?: string, sizeId?: string) => number
  getAvailableStock: (productId: string, materialId?: string, sizeId?: string) => number
  reserveStock: (productId: string, quantity: number, materialId?: string, sizeId?: string) => boolean
  releaseStock: (productId: string, quantity: number, materialId?: string, sizeId?: string) => void
  updateStock: (productId: string, quantity: number, materialId?: string, sizeId?: string) => void
  isInStock: (productId: string, quantity: number, materialId?: string, sizeId?: string) => boolean
  getLowStockItems: () => StockItem[]
  getOutOfStockItems: () => StockItem[]
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [stockItems, setStockItems] = useState<StockItem[]>([])

  // Başlangıç stok verilerini yükle
  useEffect(() => {
    const savedStock = localStorage.getItem('ekartvizit-inventory')
    if (savedStock) {
      try {
        setStockItems(JSON.parse(savedStock))
      } catch (error) {
        console.error('Stok verisi yüklenirken hata:', error)
        initializeDefaultStock()
      }
    } else {
      initializeDefaultStock()
    }
  }, [])

  // Stok değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('ekartvizit-inventory', JSON.stringify(stockItems))
  }, [stockItems])

  const initializeDefaultStock = () => {
    // Varsayılan stok verileri
    const defaultStock: StockItem[] = [
      {
        productId: 'kartvizit',
        quantity: 10000,
        reserved: 0,
        minStock: 1000,
        maxStock: 50000,
        lastUpdated: new Date().toISOString()
      },
      {
        productId: 'brosur',
        quantity: 5000,
        reserved: 0,
        minStock: 500,
        maxStock: 25000,
        lastUpdated: new Date().toISOString()
      },
      {
        productId: 'magnet',
        quantity: 2000,
        reserved: 0,
        minStock: 200,
        maxStock: 10000,
        lastUpdated: new Date().toISOString()
      }
    ]
    setStockItems(defaultStock)
  }

  const findStockItem = (productId: string, materialId?: string, sizeId?: string) => {
    return stockItems.find(item => 
      item.productId === productId &&
      item.materialId === materialId &&
      item.sizeId === sizeId
    )
  }

  const getStock = (productId: string, materialId?: string, sizeId?: string) => {
    const item = findStockItem(productId, materialId, sizeId)
    return item?.quantity || 0
  }

  const getAvailableStock = (productId: string, materialId?: string, sizeId?: string) => {
    const item = findStockItem(productId, materialId, sizeId)
    if (!item) return 0
    return Math.max(0, item.quantity - item.reserved)
  }

  const reserveStock = (productId: string, quantity: number, materialId?: string, sizeId?: string) => {
    const availableStock = getAvailableStock(productId, materialId, sizeId)
    if (availableStock < quantity) return false

    setStockItems(prev => prev.map(item => {
      if (item.productId === productId && 
          item.materialId === materialId && 
          item.sizeId === sizeId) {
        return {
          ...item,
          reserved: item.reserved + quantity,
          lastUpdated: new Date().toISOString()
        }
      }
      return item
    }))

    return true
  }

  const releaseStock = (productId: string, quantity: number, materialId?: string, sizeId?: string) => {
    setStockItems(prev => prev.map(item => {
      if (item.productId === productId && 
          item.materialId === materialId && 
          item.sizeId === sizeId) {
        return {
          ...item,
          reserved: Math.max(0, item.reserved - quantity),
          lastUpdated: new Date().toISOString()
        }
      }
      return item
    }))
  }

  const updateStock = (productId: string, quantity: number, materialId?: string, sizeId?: string) => {
    setStockItems(prev => {
      const existingIndex = prev.findIndex(item => 
        item.productId === productId &&
        item.materialId === materialId &&
        item.sizeId === sizeId
      )

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity,
          lastUpdated: new Date().toISOString()
        }
        return updated
      } else {
        return [...prev, {
          productId,
          materialId,
          sizeId,
          quantity,
          reserved: 0,
          minStock: Math.floor(quantity * 0.1),
          maxStock: quantity * 5,
          lastUpdated: new Date().toISOString()
        }]
      }
    })
  }

  const isInStock = (productId: string, quantity: number, materialId?: string, sizeId?: string) => {
    return getAvailableStock(productId, materialId, sizeId) >= quantity
  }

  const getLowStockItems = () => {
    return stockItems.filter(item => item.quantity <= item.minStock)
  }

  const getOutOfStockItems = () => {
    return stockItems.filter(item => item.quantity <= 0)
  }

  return (
    <InventoryContext.Provider value={{
      stockItems,
      getStock,
      getAvailableStock,
      reserveStock,
      releaseStock,
      updateStock,
      isInStock,
      getLowStockItems,
      getOutOfStockItems
    }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider')
  }
  return context
} 