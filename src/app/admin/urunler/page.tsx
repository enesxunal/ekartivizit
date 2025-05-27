'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  Search,
  Plus,
  Edit,
  Eye,
  Settings,
  Star,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import { PRODUCTS as products } from '@/data/products'
import { useOrders } from '@/contexts/OrderContext'

export default function ProductsPage() {
  const { orders } = useOrders()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Ürün satış istatistikleri
  const getProductStats = (productId: string) => {
    const productOrders = orders.filter(order => 
      order.items.some(item => item.product.id === productId)
    )
    
    const totalSold = productOrders.reduce((sum, order) => {
      return sum + order.items
        .filter(item => item.product.id === productId)
        .reduce((itemSum, item) => itemSum + (item.quantity * item.cartQuantity), 0)
    }, 0)

    const totalRevenue = productOrders.reduce((sum, order) => {
      return sum + order.items
        .filter(item => item.product.id === productId)
        .reduce((itemSum, item) => itemSum + (item.price * item.cartQuantity), 0)
    }, 0)

    return { totalSold, totalRevenue, orderCount: productOrders.length }
  }

  // Filtreleme
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    
    // Status filtresi (burada stok durumu varsayımı)
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && product.price && product.price.min > 0) ||
                         (statusFilter === 'inactive' && (!product.price || product.price.min <= 0))
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Kategorileri belirle
  const categories = Array.from(new Set(products.map(p => p.category)))

  // İstatistikler
  const totalProducts = products.length
  const activeProducts = products.filter(p => p.price && p.price.min > 0).length
  const totalCategories = categories.length

  // En çok satan ürünler
  const topSellingProducts = products
    .map(product => ({
      ...product,
      stats: getProductStats(product.id)
    }))
    .sort((a, b) => b.stats.totalSold - a.stats.totalSold)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ürünler</h1>
              <p className="text-gray-600">Ürün kataloğu ve stok yönetimi</p>
            </div>
            <div className="flex gap-4">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Ürün
              </Button>
              <Link href="/admin">
                <Button variant="outline">Panele Dön</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Toplam Ürün</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
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
                  <p className="text-sm text-gray-600">Aktif Ürün</p>
                  <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Kategori</p>
                  <p className="text-2xl font-bold text-purple-600">{totalCategories}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtreler */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Arama */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Ürün ara (isim, açıklama)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Kategori Filtresi */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={categoryFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('all')}
                >
                  Tüm Kategoriler
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Durum Filtresi */}
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'Tümü' },
                  { value: 'active', label: 'Aktif' },
                  { value: 'inactive', label: 'Pasif' }
                ].map((status) => (
                  <Button
                    key={status.value}
                    variant={statusFilter === status.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status.value)}
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ürünler Listesi */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredProducts.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün bulunamadı</h3>
                    <p className="text-gray-600">Filtrelere uygun ürün yok.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredProducts.map((product) => {
                  const stats = getProductStats(product.id)
                  return (
                    <Card key={product.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Ürün Görseli */}
                          <div className="md:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                            {product.image ? (
                              <Image 
                                src={product.image} 
                                alt={product.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="w-12 h-12 text-gray-400" />
                            )}
                          </div>

                          {/* Ürün Bilgileri */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-600 text-sm">{product.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline">{product.category}</Badge>
                                  <Badge className={product.price && product.price.min > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                    {product.price && product.price.min > 0 ? 'Aktif' : 'Pasif'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">₺{product.price?.min || 0}</div>
                                <div className="text-sm text-gray-600">başlangıç fiyat</div>
                              </div>
                            </div>

                            {/* İstatistikler */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-900">{stats.totalSold}</div>
                                <div className="text-xs text-gray-600">Satılan</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-900">{stats.orderCount}</div>
                                <div className="text-xs text-gray-600">Sipariş</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-900">₺{stats.totalRevenue.toFixed(0)}</div>
                                <div className="text-xs text-gray-600">Gelir</div>
                              </div>
                            </div>

                            {/* Aksiyonlar */}
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Görüntüle
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Düzenle
                              </Button>
                              <Button size="sm" variant="outline">
                                <Settings className="w-4 h-4 mr-2" />
                                Ayarlar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </div>

          {/* En Çok Satan Ürünler */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  En Çok Satan Ürünler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellingProducts.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Henüz satış verisi yok</p>
                  ) : (
                    topSellingProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{product.name}</div>
                          <div className="text-xs text-gray-600">
                            {product.stats.totalSold} adet • ₺{product.stats.totalRevenue.toFixed(0)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Hızlı Aksiyonlar */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Hızlı Aksiyonlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Ürün Ekle
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Toplu Düzenle
                  </Button>
                  <Button className="w-full" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Fiyat Güncelle
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Package className="w-4 h-4 mr-2" />
                    Stok Kontrolü
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 