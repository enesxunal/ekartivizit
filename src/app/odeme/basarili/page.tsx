'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, Package, Truck, MessageCircle, Download, ArrowLeft } from 'lucide-react'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string
    paymentId: string
    amount: number
    status: string
    customerInfo: {
      name: string
      email: string
      phone: string
    }
    items: Array<{
      name: string
      quantity: number
      price: number
      material?: string
      size?: string
    }>
    estimatedDelivery: string
    trackingNumber: string
    createdAt: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  const paymentId = searchParams.get('payment')
  const orderId = searchParams.get('order')

  useEffect(() => {
    // Ödeme durumunu kontrol et
    const checkPaymentStatus = async () => {
      if (!paymentId && !orderId) {
        router.push('/')
        return
      }

      try {
        // localStorage'dan sipariş detaylarını al
        const allOrders = JSON.parse(localStorage.getItem('ekartvizit-orders') || '[]')
        const foundOrder = allOrders.find((order: any) => order.id === orderId)
        
        if (foundOrder) {
          const orderDetails = {
            orderId: foundOrder.id,
            paymentId: foundOrder.paymentId || `PAY-${Date.now()}`,
            amount: foundOrder.total,
            status: foundOrder.status,
            customerInfo: {
              name: foundOrder.customerInfo.name,
              email: foundOrder.customerInfo.email,
              phone: foundOrder.customerInfo.phone
            },
            items: foundOrder.items.map((item: any) => ({
              name: item.product.name,
              quantity: item.quantity,
              price: item.price,
              material: item.selectedMaterial,
              size: item.selectedSize
            })),
            estimatedDelivery: foundOrder.estimatedDelivery || '2-3 İş Günü',
            trackingNumber: foundOrder.trackingNumber || `TRK${Date.now()}`,
            createdAt: foundOrder.createdAt
          }
          setOrderDetails(orderDetails)
        } else {
          // Sipariş bulunamadı, ana sayfaya yönlendir
          router.push('/')
        }
      } catch (error) {
        console.error('Sipariş detayları alınamadı:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    checkPaymentStatus()
  }, [paymentId, orderId, router])

  const handleWhatsAppSupport = () => {
    const message = `Merhaba! Sipariş numaramı: ${orderDetails?.orderId} hakkında bilgi almak istiyorum.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/908508403011?text=${encodedMessage}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59af05] mx-auto"></div>
            <p className="mt-4 text-gray-600">Sipariş bilgileri yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sipariş Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız sipariş bulunamadı.</p>
            <Link href="/">
              <Button className="bg-[#59af05] hover:bg-[#4a9321]">
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Başarı Mesajı */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ödemeniz Başarılı! 🎉</h1>
          <p className="text-lg text-gray-600">
            Siparişiniz alındı ve işleme konuldu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Taraf - Sipariş Detayları */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Sipariş Detayları</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Sipariş No:</span>
                    <p className="font-semibold">{orderDetails.orderId}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Ödeme ID:</span>
                    <p className="font-semibold">{orderDetails.paymentId}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Takip No:</span>
                    <p className="font-semibold">{orderDetails.trackingNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Durum:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Onaylandı
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Sipariş Edilen Ürünler</h4>
                  {orderDetails.items.map((item, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-600">Adet: {item.quantity.toLocaleString()}</p>
                          {item.material && (
                            <p className="text-sm text-gray-600">Malzeme: {item.material}</p>
                          )}
                          {item.size && (
                            <p className="text-sm text-gray-600">Boyut: {item.size}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#59af05]">₺{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam:</span>
                    <span className="text-[#59af05]">₺{orderDetails.amount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Teslimat Bilgileri</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tahmini Teslimat:</span>
                    <span className="font-semibold">{orderDetails.estimatedDelivery}</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      📦 Siparişiniz hazırlanmaya başlandı. Kargo takip numaranız ile durumunu takip edebilirsiniz.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sağ Taraf - Aksiyonlar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sonraki Adımlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    onClick={handleWhatsAppSupport}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp Destek</span>
                  </Button>
                  
                  <Link href="/hesabim" className="block">
                    <Button variant="outline" className="w-full">
                      <Package className="w-4 h-4 mr-2" />
                      Siparişlerimi Görüntüle
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.print()}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Sipariş Faturasını Yazdır
                  </Button>
                  
                  <Link href="/tum-urunler" className="block">
                    <Button variant="outline" className="w-full">
                      Alışverişe Devam Et
                    </Button>
                  </Link>
                  
                  <Link href="/" className="block">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Ana Sayfaya Dön
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 mb-1">Ödeme Onaylandı</h3>
                  <p className="text-sm text-green-700">
                    Ödemeniz başarıyla alındı ve siparişiniz işleme konuldu.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 mb-1">Ücretsiz Kargo</h3>
                  <p className="text-sm text-blue-700">
                    Tüm siparişlerinizde kargo ücretsizdir.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* E-posta Bilgilendirmesi */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">📧 E-posta Onayı Gönderildi</h3>
              <p className="text-gray-600">
                Sipariş detaylarınız <strong>{orderDetails.customerInfo.email}</strong> adresine gönderildi.
                E-postanızı kontrol etmeyi unutmayın.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
} 