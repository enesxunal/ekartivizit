'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useOrders } from '@/contexts/OrderContext'
import { CheckCircle, Package, Truck, Clock, ArrowRight } from 'lucide-react'

export default function SiparisOnayPage() {
  const params = useParams()
  const router = useRouter()
  const { getOrderById } = useOrders()
  
  const orderId = params.id as string
  const order = getOrderById(orderId)

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sipariş Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız sipariş bulunamadı.</p>
            <Button onClick={() => router.push('/')} className="bg-[#59af05] hover:bg-[#4a9321]">
              Ana Sayfaya Dön
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-6 h-6 text-orange-500" />
      case 'confirmed': return <CheckCircle className="w-6 h-6 text-blue-500" />
      case 'processing': return <Package className="w-6 h-6 text-purple-500" />
      case 'shipped': return <Truck className="w-6 h-6 text-indigo-500" />
      case 'delivered': return <CheckCircle className="w-6 h-6 text-green-500" />
      default: return <Clock className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Onay Bekliyor'
      case 'confirmed': return 'Onaylandı'
      case 'processing': return 'Hazırlanıyor'
      case 'shipped': return 'Kargoya Verildi'
      case 'delivered': return 'Teslim Edildi'
      default: return 'Bilinmiyor'
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ödeme Bekliyor'
      case 'paid': return 'Ödendi'
      case 'failed': return 'Ödeme Başarısız'
      case 'refunded': return 'İade Edildi'
      default: return 'Bilinmiyor'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Başarı Mesajı */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Siparişiniz Alındı!
          </h1>
          <p className="text-lg text-gray-600">
            Sipariş numaranız: <span className="font-semibold text-[#59af05]">#{order.id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol taraf - Sipariş Detayları */}
          <div className="space-y-6">
            {/* Sipariş Durumu */}
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  {getStatusIcon(order.status)}
                  <div>
                    <div className="font-medium text-gray-900">{getStatusText(order.status)}</div>
                    <div className="text-sm text-gray-600">
                      Sipariş Tarihi: {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Ödeme Durumu:</span>
                    <span className={`text-sm font-medium ${
                      order.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {getPaymentStatusText(order.paymentStatus)}
                    </span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Takip Numarası:</span>
                      <span className="text-sm font-medium text-[#59af05]">{order.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Müşteri Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle>Teslimat Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">{order.customerInfo.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.customerInfo.email}
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.customerInfo.phone}
                  </div>
                  {order.customerInfo.address && (
                    <div className="text-sm text-gray-600 mt-3">
                      <div className="font-medium mb-1">Adres:</div>
                      <div>{order.customerInfo.address.street}</div>
                      <div>
                        {order.customerInfo.address.district}/{order.customerInfo.address.city} {order.customerInfo.address.postalCode}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sağ taraf - Sipariş Özeti */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                        <div className="text-sm text-gray-600">
                          <div>Adet: {item.quantity.toLocaleString()}</div>
                          {item.selectedMaterial && <div>Malzeme: {item.selectedMaterial}</div>}
                          {item.selectedSize && <div>Boyut: {item.selectedSize}</div>}
                          {item.selectedWindow && <div>Pencere: {item.selectedWindow}</div>}
                          {item.selectedExtras && item.selectedExtras.length > 0 && (
                            <div>Ekstra: {item.selectedExtras.join(', ')}</div>
                          )}
                        </div>
                      </div>
                      <div className="font-medium text-[#59af05]">
                        ₺{item.price.toFixed(0)}
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
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
                      <span className="text-green-600">Ücretsiz</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Toplam:</span>
                      <span className="text-[#59af05]">₺{order.total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sonraki Adımlar */}
            <Card>
              <CardHeader>
                <CardTitle>Sonraki Adımlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#59af05] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-medium">Sipariş Onayı</div>
                      <div className="text-sm text-gray-600">
                        Siparişinizi 1 iş günü içinde onaylayacağız
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-medium">Üretim</div>
                      <div className="text-sm text-gray-600">
                        Ürünleriniz 4-5 iş günü içinde hazırlanacak
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-medium">Kargo</div>
                      <div className="text-sm text-gray-600">
                        Ürünleriniz kargoya verilecek ve takip numarası gönderilecek
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aksiyon Butonları */}
            <div className="space-y-3">
              <Link href="/siparislerim" className="block">
                <Button className="w-full bg-[#59af05] hover:bg-[#4a9321]">
                  Siparişlerimi Görüntüle
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full">
                  Alışverişe Devam Et
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 