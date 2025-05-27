'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  Eye, 
  Search,
  Download,
  Truck,
  Check,
  X,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import Link from 'next/link'
import { useOrders } from '@/contexts/OrderContext'
// Email artık API üzerinden gönderilecek

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useOrders()
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filtreleme
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    const matchesSearch = 
      order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-purple-100 text-purple-800'
      case 'printing': return 'bg-indigo-100 text-indigo-800'
      case 'shipping': return 'bg-yellow-100 text-yellow-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Bekliyor'
      case 'confirmed': return 'Onaylandı'
      case 'preparing': return 'Hazırlanıyor'
      case 'printing': return 'Basılıyor'
      case 'shipping': return 'Kargoda'
      case 'delivered': return 'Teslim Edildi'
      case 'cancelled': return 'İptal Edildi'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Siparişler</h1>
              <p className="text-gray-600">Tüm siparişleri yönet</p>
            </div>
            <div className="flex gap-4">
              <Link href="/admin">
                <Button variant="outline">Panele Dön</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtreler */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Arama */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Sipariş ara (isim, email, sipariş no)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Durum Filtresi */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'all', label: 'Tümü' },
                  { value: 'pending', label: 'Bekliyor' },
                  { value: 'confirmed', label: 'Onaylandı' },
                  { value: 'preparing', label: 'Hazırlanıyor' },
                  { value: 'printing', label: 'Basılıyor' },
                  { value: 'shipping', label: 'Kargoda' },
                  { value: 'delivered', label: 'Teslim Edildi' }
                ].map((status) => (
                  <Button
                    key={status.value}
                    variant={selectedStatus === status.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedStatus(status.value)}
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Siparişler Listesi */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sipariş bulunamadı</h3>
                <p className="text-gray-600">Filtrelere uygun sipariş yok.</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Sol Taraf - Sipariş Bilgileri */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Sipariş #{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <Badge className={getStatusBadgeColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>

                      {/* Müşteri Bilgileri */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Müşteri Bilgileri</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{order.customerInfo.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              <span>{order.customerInfo.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              <span>{order.customerInfo.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Teslimat Adresi</h4>
                          <div className="text-sm text-gray-600">
                            {order.customerInfo.address ? (
                              <div className="flex items-start gap-2">
                                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div>{order.customerInfo.address.street}</div>
                                  <div>{order.customerInfo.address.city} / {order.customerInfo.address.district}</div>
                                  <div>{order.customerInfo.address.postalCode}</div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-gray-400">Adres bilgisi yok</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sipariş Detayları */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Sipariş Detayları</h4>
                        <div className="space-y-2">
                                                     {order.items.map((item, index) => (
                             <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                               <div>
                                 <div className="font-medium">{item.product.name}</div>
                                 <div className="text-sm text-gray-600">
                                   Adet: {item.quantity} × ₺{item.price}
                                   {item.customDesign && <span className="ml-2 text-purple-600">(Özel Tasarım)</span>}
                                 </div>
                               </div>
                               <div className="font-medium">₺{item.quantity * item.price}</div>
                             </div>
                           ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center font-semibold text-lg">
                            <span>Toplam:</span>
                            <span>₺{order.total.toFixed(0)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sağ Taraf - Aksiyonlar */}
                    <div className="lg:w-48 flex lg:flex-col gap-2">
                      {/* Durum Değiştirme */}
                      <div className="space-y-2 w-full">
                        {order.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Onayla
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="w-full"
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            >
                              <X className="w-4 h-4 mr-2" />
                              İptal Et
                            </Button>
                          </>
                        )}

                        {order.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                          >
                            <Package className="w-4 h-4 mr-2" />
                            Hazırlamaya Al
                          </Button>
                        )}

                        {order.status === 'preparing' && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => updateOrderStatus(order.id, 'printing')}
                          >
                            <Package className="w-4 h-4 mr-2" />
                            Baskıya Al
                          </Button>
                        )}

                        {order.status === 'printing' && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => updateOrderStatus(order.id, 'shipping')}
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Kargoya Ver
                          </Button>
                        )}

                        {order.status === 'shipping' && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Teslim Edildi
                          </Button>
                        )}

                        {/* Detay Görüntüle */}
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Detaylar
                        </Button>

                        {/* PDF İndir */}
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          PDF İndir
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 