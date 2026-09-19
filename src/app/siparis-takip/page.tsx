'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, ArrowLeft, MessageCircle } from 'lucide-react'

interface OrderStatus {
  orderId: string
  trackingNumber: string
  status: 'pending' | 'confirmed' | 'preparing' | 'printing' | 'shipping' | 'delivered'
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
  total: number
  createdAt: string
  estimatedDelivery: string
  statusHistory: Array<{
    status: string
    message: string
    date: string
  }>
}

export default function OrderTrackingPage() {
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get('orderId')
  const [searchQuery, setSearchQuery] = useState(orderIdParam || '')
  const [orderData, setOrderData] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getOrderFromApi = async (query: string): Promise<OrderStatus | null> => {
    const response = await fetch(`/api/orders/${encodeURIComponent(query.trim())}`, { cache: 'no-store' })
    if (!response.ok) return null
    const payload = await response.json()
    const foundOrder = payload.order
    if (!foundOrder) return null

    const statusHistory = [{ status: 'Sipariş Alındı', message: 'Siparişiniz başarıyla alındı ve işleme konuldu.', date: foundOrder.createdAt }]
    const statusMap: Record<string, { status: string; message: string }> = {
      confirmed: { status: 'Sipariş Onaylandı', message: 'Siparişiniz onaylandı ve hazırlanmaya başlandı.' },
      preparing: { status: 'Hazırlanıyor', message: 'Siparişiniz hazırlanıyor.' },
      printing: { status: 'Basılıyor', message: 'Siparişiniz basım aşamasında.' },
      shipping: { status: 'Kargoya Verildi', message: 'Siparişiniz kargoya verildi ve yola çıktı.' },
      delivered: { status: 'Teslim Edildi', message: 'Siparişiniz teslim edildi.' }
    }
    const sequence = ['pending', 'confirmed', 'preparing', 'printing', 'shipping', 'delivered']
    const currentStatusIndex = sequence.indexOf(foundOrder.status)
    if (currentStatusIndex > 0) {
      for (let i = 1; i <= currentStatusIndex; i += 1) {
        const statusInfo = statusMap[sequence[i]]
        if (statusInfo) statusHistory.push({ ...statusInfo, date: foundOrder.updatedAt || foundOrder.createdAt })
      }
    }
    return {
      orderId: foundOrder.id,
      trackingNumber: foundOrder.trackingNumber || '',
      status: foundOrder.status,
      customerInfo: foundOrder.customerInfo,
      items: foundOrder.items.map((item: { product: { name: string }; quantity: number; price: number; selectedMaterial?: string; selectedSize?: string }) => ({
        name: item.product.name, quantity: item.quantity, price: item.price, material: item.selectedMaterial, size: item.selectedSize
      })),
      total: foundOrder.total,
      createdAt: foundOrder.createdAt,
      estimatedDelivery: foundOrder.estimatedDelivery ? new Date(foundOrder.estimatedDelivery).toLocaleDateString('tr-TR') : 'Hesaplanıyor...',
      statusHistory
    }
  }

  // Otomatik arama fonksiyonu (URL'den gelen orderId için)
  const handleSearchAuto = async (query: string) => {
    setLoading(true)
    setError('')
    setOrderData(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const order = await getOrderFromApi(query)
      
      if (order) {
        setOrderData(order)
      } else {
        setError('Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.')
      }
    } catch {
      setError('Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.')
    } finally {
      setLoading(false)
    }
  }

  // URL'de orderId varsa otomatik arama yap
  useEffect(() => {
    if (orderIdParam) {
      setSearchQuery(orderIdParam)
      handleSearchAuto(orderIdParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderIdParam])

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Lütfen sipariş numarası girin')
      return
    }

    setLoading(true)
    setError('')
    setOrderData(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const order = await getOrderFromApi(searchQuery)
      
      if (order) {
        setOrderData(order)
      } else {
        setError('Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.')
      }
    } catch {
      setError('Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'confirmed':
      case 'preparing':
      case 'printing':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'shipping':
        return <Truck className="w-5 h-5 text-orange-600" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Clock className="w-5 h-5 text-[#687067]" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
      case 'preparing':
      case 'printing':
        return 'bg-blue-100 text-blue-800'
      case 'shipping':
        return 'bg-orange-100 text-orange-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Beklemede'
      case 'confirmed':
        return 'Onaylandı'
      case 'preparing':
        return 'Hazırlanıyor'
      case 'printing':
        return 'Basılıyor'
      case 'shipping':
        return 'Kargoda'
      case 'delivered':
        return 'Teslim Edildi'
      default:
        return 'Bilinmiyor'
    }
  }

  const handleWhatsAppSupport = () => {
    const message = `Merhaba! Sipariş numaramı: ${orderData?.orderId} hakkında bilgi almak istiyorum.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/908508403011?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      
      <main className="site-container max-w-5xl py-8 sm:py-10 lg:py-12">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[.94] tracking-[-0.05em] text-[#171a16] mb-2">Sipariş Takip</h1>
          <p className="text-lg text-[#687067]">
            Sipariş numaranız veya takip numaranız ile siparişinizi takip edin
          </p>
        </div>

        {/* Arama Formu */}
        <Card className="mb-8 rounded-[28px] border-black/8 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Sipariş Sorgula</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="searchQuery">Sipariş Numarası veya Takip Numarası</Label>
                <Input
                  id="searchQuery"
                  type="text"
                  placeholder="Örn: ORD-123456 veya TRK123456"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="mt-1"
                />
              </div>
              
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-2xl">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                onClick={handleSearch}
                disabled={loading}
                className="w-full rounded-full bg-[#171a16] hover:bg-black"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Aranıyor...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Sipariş Ara
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sipariş Detayları */}
        {orderData && (
          <div className="space-y-6">
            {/* Durum Özeti */}
            <Card className="rounded-[28px] border-black/8 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Sipariş Durumu</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
                    {getStatusIcon(orderData.status)}
                    <span className="ml-2">{getStatusText(orderData.status)}</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-[#687067]">Sipariş No:</span>
                    <p className="font-semibold">{orderData.orderId}</p>
                  </div>
                  <div>
                    <span className="text-[#687067]">Takip No:</span>
                    <p className="font-semibold">{orderData.trackingNumber}</p>
                  </div>
                  <div>
                    <span className="text-[#687067]">Tahmini Teslimat:</span>
                    <p className="font-semibold">{orderData.estimatedDelivery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sol Taraf - Sipariş Geçmişi */}
              <Card className="rounded-[28px] border-black/8 shadow-none">
                <CardHeader>
                  <CardTitle>Sipariş Geçmişi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.statusHistory.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-3 h-3 bg-[#59af05] rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{item.status}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(item.date).toLocaleDateString('tr-TR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-[#687067] mt-1">{item.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sağ Taraf - Sipariş Detayları */}
              <div className="space-y-6">
                <Card className="rounded-[28px] border-black/8 shadow-none">
                  <CardHeader>
                    <CardTitle>Sipariş Detayları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderData.items.map((item, index) => (
                        <div key={index} className="bg-[#f4f4ef] p-3 rounded-2xl">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{item.name}</h5>
                              <p className="text-sm text-[#687067]">Adet: {item.quantity.toLocaleString()}</p>
                              {item.material && (
                                <p className="text-sm text-[#687067]">Malzeme: {item.material}</p>
                              )}
                              {item.size && (
                                <p className="text-sm text-[#687067]">Boyut: {item.size}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-[#59af05]">₺{item.price.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Toplam:</span>
                          <span className="text-[#59af05]">₺{orderData.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[28px] border-black/8 shadow-none">
                  <CardHeader>
                    <CardTitle>Müşteri Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-[#687067]">Ad Soyad:</span>
                        <p className="font-medium">{orderData.customerInfo.name}</p>
                      </div>
                      <div>
                        <span className="text-[#687067]">E-posta:</span>
                        <p className="font-medium">{orderData.customerInfo.email}</p>
                      </div>
                      <div>
                        <span className="text-[#687067]">Telefon:</span>
                        <p className="font-medium">{orderData.customerInfo.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[28px] border-black/8 shadow-none">
                  <CardHeader>
                    <CardTitle>Destek</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={handleWhatsAppSupport}
                      className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Destek
                    </Button>
                    
                    <Link href="/hesabim" className="block">
                      <Button variant="outline" className="w-full">
                        <Package className="w-4 h-4 mr-2" />
                        Tüm Siparişlerim
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Geri Dön */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
} 