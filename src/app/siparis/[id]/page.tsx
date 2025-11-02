'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft, Package, Truck, Clock, MapPin, User, Phone, Mail, CreditCard } from 'lucide-react'

interface OrderDetails {
  id: string
  status: string
  paymentStatus: string
  paymentMethod: string
  total: number
  subtotal: number
  discount: number
  shippingCost: number
  createdAt: string
  customerInfo: {
    name: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      district: string
      postalCode: string
    }
  }
  invoiceInfo?: {
    type: string
    name: string
    email: string
    phone: string
    taxNumber?: string
    taxOffice?: string
    address: {
      street: string
      city: string
      district: string
      postalCode: string
    }
  }
  items: Array<{
    id: string
    product: {
      id: string
      name: string
      image: string
    }
    quantity: number
    price: number
    selectedMaterial?: string
    selectedSize?: string
    selectedWindow?: string
    selectedExtras?: string[]
  }>
  notes?: string
  trackingNumber?: string
  estimatedDelivery?: string
}

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // localStorage'dan sipariş detaylarını al
    const allOrders = JSON.parse(localStorage.getItem('ekartvizit-orders') || '[]')
    const foundOrder = allOrders.find((o: { id: string }) => o.id === orderId)
    
    if (foundOrder) {
      setOrder(foundOrder)
    }
    setLoading(false)
  }, [orderId])

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'Beklemede',
      'confirmed': 'Onaylandı',
      'preparing': 'Hazırlanıyor',
      'printing': 'Basılıyor',
      'shipping': 'Kargoda',
      'delivered': 'Teslim Edildi',
      'cancelled': 'İptal Edildi'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'preparing': 'bg-orange-100 text-orange-800',
      'printing': 'bg-purple-100 text-purple-800',
      'shipping': 'bg-indigo-100 text-indigo-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    }
    return colorMap[status] || 'bg-gray-100 text-gray-800'
  }

  const getPaymentMethodName = (method: string) => {
    const methods: Record<string, string> = {
      'whatsapp': 'WhatsApp ile Ödeme',
      'credit-card': 'Kredi Kartı',
      'bank-transfer': 'Banka Havalesi'
    }
    return methods[method] || method
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center p-8">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sipariş Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız sipariş bulunamadı veya erişim yetkiniz yok.</p>
            <Link href="/hesabim">
              <Button className="bg-[#59af05] hover:bg-[#4a9321]">
                Hesabıma Dön
              </Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Başlık */}
        <div className="mb-8">
          <Link href="/hesabim" className="inline-flex items-center text-[#59af05] hover:text-[#4a9321] mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Hesabıma Dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Sipariş Detayları</h1>
          <p className="text-gray-600">Sipariş No: #{order.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol taraf - Sipariş Bilgileri */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sipariş Durumu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Sipariş Durumu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                {order.status === 'shipping' && order.trackingNumber && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Kargo Takip Numarası</span>
                    </div>
                    <p className="text-blue-800 font-mono">{order.trackingNumber}</p>
                  </div>
                )}

                {order.estimatedDelivery && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Tahmini Teslimat: {new Date(order.estimatedDelivery).toLocaleDateString('tr-TR')}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sipariş İçeriği */}
            <Card>
              <CardHeader>
                <CardTitle>Sipariş İçeriği</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          {(() => {
                            const cartQuantity = (item as any).cartQuantity || 1
                            const itemTotal = item.price * cartQuantity
                            return (
                              <>
                                <div>Paket: {cartQuantity} paket (Paket İçeriği: {item.quantity.toLocaleString()} adet)</div>
                                <div>Toplam Adet: {(item.quantity * cartQuantity).toLocaleString()} adet</div>
                                {item.selectedMaterial && <div>Malzeme: {item.selectedMaterial}</div>}
                                {item.selectedSize && <div>Boyut: {item.selectedSize}</div>}
                                {item.selectedWindow && <div>Pencere: {item.selectedWindow}</div>}
                                {item.selectedExtras && item.selectedExtras.length > 0 && (
                                  <div>Ekstra: {item.selectedExtras.join(', ')}</div>
                                )}
                                <div className="text-xs text-gray-500 mt-1">
                                  Birim Fiyat: ₺{item.price.toLocaleString()} × {cartQuantity} = ₺{itemTotal.toLocaleString()}
                                </div>
                              </>
                            )
                          })()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-[#59af05]">
                          {(() => {
                            const cartQuantity = (item as any).cartQuantity || 1
                            return `₺${(item.price * cartQuantity).toFixed(0)}`
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Sipariş Notları</h4>
                    <p className="text-gray-600">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Müşteri Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Müşteri Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">İletişim Bilgileri</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{order.customerInfo.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{order.customerInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{order.customerInfo.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Teslimat Adresi</h4>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="text-gray-600">
                        <div>{order.customerInfo.address.street}</div>
                        <div>{order.customerInfo.address.district}, {order.customerInfo.address.city}</div>
                        <div>{order.customerInfo.address.postalCode}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fatura Bilgileri */}
                {order.invoiceInfo && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Fatura Bilgileri</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-2">
                          <div><strong>Fatura Türü:</strong> {order.invoiceInfo.type === 'corporate' ? 'Kurumsal' : 'Bireysel'}</div>
                          <div><strong>Ad/Firma:</strong> {order.invoiceInfo.name}</div>
                          {order.invoiceInfo.taxNumber && (
                            <div><strong>Vergi No:</strong> {order.invoiceInfo.taxNumber}</div>
                          )}
                          {order.invoiceInfo.taxOffice && (
                            <div><strong>Vergi Dairesi:</strong> {order.invoiceInfo.taxOffice}</div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">
                          <div>{order.invoiceInfo.address.street}</div>
                          <div>{order.invoiceInfo.address.district}, {order.invoiceInfo.address.city}</div>
                          <div>{order.invoiceInfo.address.postalCode}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sağ taraf - Ödeme Bilgileri */}
          <div className="space-y-6">
            {/* Ödeme Özeti */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Ödeme Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Ara Toplam:</span>
                    <span>₺{order.subtotal.toFixed(0)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>İndirim:</span>
                      <span>-₺{order.discount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Kargo:</span>
                    <span className="text-green-600">
                      {order.shippingCost > 0 ? `₺${order.shippingCost.toFixed(0)}` : 'Ücretsiz'}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Toplam:</span>
                      <span className="text-[#59af05]">₺{order.total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 mb-2">Ödeme Yöntemi</div>
                    <div className="text-gray-600">{getPaymentMethodName(order.paymentMethod)}</div>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : order.paymentStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus === 'completed' ? 'Ödeme Tamamlandı' : 
                         order.paymentStatus === 'pending' ? 'Ödeme Beklemede' : 'Ödeme Başarısız'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aksiyonlar */}
            <Card>
              <CardHeader>
                <CardTitle>İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/siparis-takip?orderId=${order.id}`} className="block">
                  <Button variant="outline" className="w-full">
                    <Truck className="w-4 h-4 mr-2" />
                    Sipariş Takip
                  </Button>
                </Link>
                <Link href="/iletisim" className="block">
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Destek
                  </Button>
                </Link>
                {order.status === 'delivered' && (
                  <Button variant="outline" className="w-full">
                    <Package className="w-4 h-4 mr-2" />
                    Tekrar Sipariş Ver
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 