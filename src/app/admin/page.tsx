'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Package, 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  FileText, 
  Palette,
  Settings,
  BarChart3,
  Eye,
  Download
} from 'lucide-react'
import Link from 'next/link'
import { useOrders } from '@/contexts/OrderContext'

export default function AdminDashboard() {
  const { orders } = useOrders()

  // İstatistikler
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const completedOrders = orders.filter(o => o.status === 'delivered').length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  
  // Tasarım sayıları
  const customDesigns = orders.reduce((sum, order) => {
    return sum + order.items.filter(item => item.customDesign).length
  }, 0)

  // Son siparişler (5 tane)
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
              <p className="text-gray-600">E-Kartvizit yönetim sistemi</p>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Siteyi Görüntüle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Toplam Sipariş</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Bekleyen Siparişler</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Özel Tasarımlar</p>
                  <p className="text-2xl font-bold text-purple-600">{customDesigns}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Toplam Gelir</p>
                  <p className="text-2xl font-bold text-green-600">₺{totalRevenue.toFixed(0)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hızlı Erişim Menüsü */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı Erişim</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/siparisler">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                    <Package className="w-6 h-6" />
                    <span>Siparişler</span>
                  </Button>
                </Link>

                <Link href="/admin/tasarimlar">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                    <Palette className="w-6 h-6" />
                    <span>Tasarımlar</span>
                  </Button>
                </Link>

                <Link href="/admin/musteriler">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span>Müşteriler</span>
                  </Button>
                </Link>

                <Link href="/admin/raporlar">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    <span>Raporlar</span>
                  </Button>
                </Link>

                <Link href="/admin/urunler">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                    <FileText className="w-6 h-6" />
                    <span>Ürünler</span>
                  </Button>
                </Link>

                <Link href="/admin/ayarlar">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center gap-2">
                    <Settings className="w-6 h-6" />
                    <span>Ayarlar</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Son Siparişler */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Son Siparişler</CardTitle>
                <Link href="/admin/siparisler">
                  <Button variant="outline" size="sm">Tümünü Gör</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Henüz sipariş yok</p>
                ) : (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">#{order.id}</div>
                        <div className="text-sm text-gray-600">{order.customerInfo.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₺{order.total.toFixed(0)}</div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                          order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status === 'pending' ? 'Bekliyor' :
                           order.status === 'confirmed' ? 'Onaylandı' :
                           order.status === 'delivered' ? 'Teslim Edildi' : order.status}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Günlük Özet */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Günlük Özet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalOrders}</div>
                <div className="text-sm text-gray-600">Bugünkü Siparişler</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₺{totalRevenue.toFixed(0)}</div>
                <div className="text-sm text-gray-600">Bugünkü Gelir</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{customDesigns}</div>
                <div className="text-sm text-gray-600">Özel Tasarımlar</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 