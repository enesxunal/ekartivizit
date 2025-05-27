'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import { useOrders } from '@/contexts/OrderContext'

export default function ReportsPage() {
  const { orders } = useOrders()
  const [timeRange, setTimeRange] = useState('30') // Son 30 gün

  // Tarih filtreleme
  const filteredOrders = useMemo(() => {
    const days = parseInt(timeRange)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    return orders.filter(order => new Date(order.createdAt) >= cutoffDate)
  }, [orders, timeRange])

  // Temel istatistikler
  const stats = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = filteredOrders.length
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    
    // Önceki döneme göre karşılaştırma (aynı süre öncesi)
    const prevPeriodStart = new Date()
    const days = parseInt(timeRange)
    prevPeriodStart.setDate(prevPeriodStart.getDate() - (days * 2))
    const prevPeriodEnd = new Date()
    prevPeriodEnd.setDate(prevPeriodEnd.getDate() - days)
    
    const prevOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt)
      return orderDate >= prevPeriodStart && orderDate < prevPeriodEnd
    })
    
    const prevRevenue = prevOrders.reduce((sum, order) => sum + order.total, 0)
    const prevOrderCount = prevOrders.length
    
    const revenueGrowth = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0
    const orderGrowth = prevOrderCount > 0 ? ((totalOrders - prevOrderCount) / prevOrderCount) * 100 : 0

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      revenueGrowth,
      orderGrowth,
      prevRevenue,
      prevOrderCount
    }
  }, [filteredOrders, orders, timeRange])

  // Durum bazında analiz
  const statusAnalysis = useMemo(() => {
    const statusCounts = filteredOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return [
      { status: 'pending', label: 'Bekliyor', count: statusCounts.pending || 0, color: 'bg-orange-500' },
      { status: 'confirmed', label: 'Onaylandı', count: statusCounts.confirmed || 0, color: 'bg-blue-500' },
      { status: 'preparing', label: 'Hazırlanıyor', count: statusCounts.preparing || 0, color: 'bg-purple-500' },
      { status: 'printing', label: 'Basılıyor', count: statusCounts.printing || 0, color: 'bg-indigo-500' },
      { status: 'shipping', label: 'Kargoda', count: statusCounts.shipping || 0, color: 'bg-yellow-500' },
      { status: 'delivered', label: 'Teslim Edildi', count: statusCounts.delivered || 0, color: 'bg-green-500' },
      { status: 'cancelled', label: 'İptal Edildi', count: statusCounts.cancelled || 0, color: 'bg-red-500' }
    ]
  }, [filteredOrders])

  // En çok satılan ürünler
  const topProducts = useMemo(() => {
    const productCounts = new Map<string, { name: string; count: number; revenue: number }>()
    
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        const productName = item.product.name
        const existing = productCounts.get(productName)
        
        if (existing) {
          existing.count += item.quantity * item.cartQuantity
          existing.revenue += item.price * item.cartQuantity
        } else {
          productCounts.set(productName, {
            name: productName,
            count: item.quantity * item.cartQuantity,
            revenue: item.price * item.cartQuantity
          })
        }
      })
    })
    
    return Array.from(productCounts.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }, [filteredOrders])

  // Günlük gelir analizi
  const dailyRevenue = useMemo(() => {
    const dailyData = new Map<string, number>()
    
    filteredOrders.forEach(order => {
      const date = new Date(order.createdAt).toISOString().split('T')[0]
      dailyData.set(date, (dailyData.get(date) || 0) + order.total)
    })
    
    return Array.from(dailyData.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7) // Son 7 gün
  }, [filteredOrders])

  // Müşteri segmentasyonu
  const customerSegments = useMemo(() => {
    const customerData = new Map<string, { orders: number; total: number }>()
    
    filteredOrders.forEach(order => {
      const email = order.customerInfo.email
      const existing = customerData.get(email)
      
      if (existing) {
        existing.orders += 1
        existing.total += order.total
      } else {
        customerData.set(email, { orders: 1, total: order.total })
      }
    })
    
    const customers = Array.from(customerData.values())
    const totalCustomers = customers.length
    
    const newCustomers = customers.filter(c => c.orders === 1).length
    const returningCustomers = customers.filter(c => c.orders > 1).length
    const vipCustomers = customers.filter(c => c.total > 1000).length
    
    return {
      total: totalCustomers,
      new: newCustomers,
      returning: returningCustomers,
      vip: vipCustomers
    }
  }, [filteredOrders])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
              <p className="text-gray-600">Satış analizi ve performans metrikleri</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Rapor İndir
              </Button>
              <Link href="/admin">
                <Button variant="outline">Panele Dön</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Zaman Aralığı Seçici */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Rapor Dönemi</h3>
              <div className="flex gap-2">
                {[
                  { value: '7', label: 'Son 7 Gün' },
                  { value: '30', label: 'Son 30 Gün' },
                  { value: '90', label: 'Son 3 Ay' },
                  { value: '365', label: 'Son 1 Yıl' }
                ].map((period) => (
                  <Button
                    key={period.value}
                    variant={timeRange === period.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(period.value)}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ana Metrikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Toplam Gelir</p>
                  <p className="text-2xl font-bold text-gray-900">₺{stats.totalRevenue.toFixed(0)}</p>
                  <p className={`text-xs flex items-center gap-1 mt-1 ${
                    stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stats.revenueGrowth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(stats.revenueGrowth).toFixed(1)}% önceki döneme göre
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sipariş Sayısı</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  <p className={`text-xs flex items-center gap-1 mt-1 ${
                    stats.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stats.orderGrowth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(stats.orderGrowth).toFixed(1)}% önceki döneme göre
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ortalama Sipariş</p>
                  <p className="text-2xl font-bold text-gray-900">₺{stats.avgOrderValue.toFixed(0)}</p>
                  <p className="text-xs text-gray-500 mt-1">Sipariş başına</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Müşteri Sayısı</p>
                  <p className="text-2xl font-bold text-gray-900">{customerSegments.total}</p>
                  <p className="text-xs text-gray-500 mt-1">{customerSegments.new} yeni müşteri</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sipariş Durumları */}
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Durumları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusAnalysis.map((item) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{
                            width: `${stats.totalOrders > 0 ? (item.count / stats.totalOrders) * 100 : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Müşteri Segmentasyonu */}
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Segmentasyonu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Toplam Müşteri</span>
                  <span className="text-blue-600 font-semibold">{customerSegments.total}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Yeni Müşteri</span>
                  <span className="text-green-600 font-semibold">{customerSegments.new}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Tekrarlayan Müşteri</span>
                  <span className="text-purple-600 font-semibold">{customerSegments.returning}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">VIP Müşteri (₺1000+)</span>
                  <span className="text-yellow-600 font-semibold">{customerSegments.vip}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* En Çok Satılan Ürünler */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>En Çok Satılan Ürünler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Henüz satış verisi yok</p>
              ) : (
                topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.count} adet satıldı</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₺{product.revenue.toFixed(0)}</div>
                      <div className="text-sm text-gray-600">toplam gelir</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Günlük Gelir Trendi */}
        <Card>
          <CardHeader>
            <CardTitle>Son 7 Günün Gelir Trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyRevenue.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Günlük gelir verisi yok</p>
              ) : (
                dailyRevenue.map((day) => (
                  <div key={day.date} className="flex items-center justify-between p-3 border-b last:border-b-0">
                    <div className="font-medium">
                      {new Date(day.date).toLocaleDateString('tr-TR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </div>
                    <div className="font-semibold text-green-600">₺{day.revenue.toFixed(0)}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 