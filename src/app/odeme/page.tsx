'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useOrders } from '@/contexts/OrderContext'
import { createToast, useToast } from '@/components/ui/toast'
import { paymentMethods, processCreditCardPayment, processWhatsAppPayment, processBankTransferPayment } from '@/lib/payment'
// E-posta şablonları artık API üzerinden kullanılacak
import { CreditCard, Smartphone, Building2, Truck, ShoppingCart, User, MapPin } from 'lucide-react'

export default function OdemePage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart, getDiscountedTotal, appliedDiscount } = useCart()
  const { user } = useAuth()
  const { createOrder } = useOrders()
  const { addToast } = useToast()
  const toast = createToast(addToast)

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'whatsapp' | 'credit-card' | 'bank-transfer'>('whatsapp')
  const [isProcessing, setIsProcessing] = useState(false)

  // Müşteri bilgileri
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: {
      street: '',
      city: '',
      district: '',
      postalCode: ''
    },
    notes: ''
  })

  // Kredi kartı bilgileri
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    cardHolderName: ''
  })

  const totalPrice = getDiscountedTotal()

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center p-8">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-6">Ödeme yapabilmek için sepetinize ürün eklemeniz gerekiyor.</p>
            <Button onClick={() => router.push('/')} className="bg-[#59af05] hover:bg-[#4a9321]">
              Alışverişe Devam Et
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1]
      setCustomerInfo(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleCardInputChange = (field: string, value: string) => {
    setCardInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Eksik Bilgi', 'Lütfen tüm zorunlu alanları doldurun')
      return false
    }

    if (selectedPaymentMethod === 'credit-card') {
      if (!cardInfo.cardNumber || !cardInfo.expiryMonth || !cardInfo.expiryYear || !cardInfo.cvc || !cardInfo.cardHolderName) {
        toast.error('Eksik Kart Bilgisi', 'Lütfen tüm kart bilgilerini doldurun')
        return false
      }
    }

    return true
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      // Sipariş oluştur
      const orderData = {
        items: items || [],
        customerInfo,
        status: 'pending' as const,
        paymentStatus: 'pending' as const,
        paymentMethod: selectedPaymentMethod,
        subtotal: getTotalPrice(),
        discount: appliedDiscount ? getTotalPrice() - totalPrice : 0,
        shippingCost: 0,
        total: totalPrice,
        notes: customerInfo.notes
      }

      const orderResult = await createOrder(orderData)

      if (!orderResult.success || !orderResult.orderId) {
        toast.error('Hata', orderResult.message || 'Sipariş oluşturulamadı')
        return
      }

      // Ödeme işlemi
      const paymentData = {
        orderId: orderResult.orderId,
        amount: totalPrice,
        currency: 'TRY',
        customerInfo,
        items: (items || []).map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.price,
          quantity: item.quantity
        }))
      }

      let paymentResult

      switch (selectedPaymentMethod) {
        case 'whatsapp':
          paymentResult = await processWhatsAppPayment(paymentData)
          break
        case 'credit-card':
          paymentResult = await processCreditCardPayment(paymentData, cardInfo)
          break
        case 'bank-transfer':
          paymentResult = await processBankTransferPayment(paymentData)
          break
        default:
          throw new Error('Geçersiz ödeme yöntemi')
      }

      if (paymentResult.success) {
        // E-posta gönder - Müşteri
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: customerInfo.email,
              emailType: 'orderConfirmation',
              orderData: {
                ...orderData,
                orderId: orderResult.orderId
              }
            })
          })
          
          // E-posta gönder - Admin
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: 'info@ekartvizit.co',
              emailType: 'orderNotificationAdmin',
              orderData: {
                ...orderData,
                orderId: orderResult.orderId
              }
            })
          })
        } catch (emailError) {
          console.error('E-posta gönderme hatası:', emailError)
          // E-posta hatası sipariş işlemini durdurmasın
        }

        // Sepeti temizle
        clearCart()
        
        if (paymentResult.redirectUrl) {
          if (selectedPaymentMethod === 'whatsapp') {
            // WhatsApp için yeni sekmede aç
            window.open(paymentResult.redirectUrl, '_blank')
            router.push(`/siparis-onay/${orderResult.orderId}`)
          } else {
            // Diğer ödeme yöntemleri için redirect
            router.push(paymentResult.redirectUrl)
          }
        } else {
          router.push(`/siparis-onay/${orderResult.orderId}`)
        }

        toast.success('Ödeme Başarılı!', 'Siparişiniz alındı ve işleme konuldu')
      } else {
        toast.error('Ödeme Hatası', paymentResult.errorMessage || 'Ödeme işlemi başarısız oldu')
      }
    } catch (error) {
      console.error('Ödeme hatası:', error)
      toast.error('Hata', 'Ödeme işlemi sırasında bir hata oluştu')
    } finally {
      setIsProcessing(false)
    }
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'whatsapp': return <Smartphone className="w-5 h-5" />
      case 'credit-card': return <CreditCard className="w-5 h-5" />
      case 'bank-transfer': return <Building2 className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ödeme</h1>
          <p className="text-gray-600">Sipariş bilgilerinizi kontrol edin ve ödeme yöntemini seçin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol taraf - Müşteri Bilgileri ve Ödeme */}
          <div className="lg:col-span-2 space-y-6">
            {/* Müşteri Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Müşteri Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0555 123 45 67"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Teslimat Adresi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Teslimat Adresi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street">Adres</Label>
                  <Textarea
                    id="street"
                    value={customerInfo.address.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                    placeholder="Mahalle, sokak, bina no, daire no"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">İl</Label>
                    <Input
                      id="city"
                      value={customerInfo.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      placeholder="İstanbul"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">İlçe</Label>
                    <Input
                      id="district"
                      value={customerInfo.address.district}
                      onChange={(e) => handleInputChange('address.district', e.target.value)}
                      placeholder="Kadıköy"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Posta Kodu</Label>
                    <Input
                      id="postalCode"
                      value={customerInfo.address.postalCode}
                      onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                      placeholder="34000"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Sipariş Notları (Opsiyonel)</Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Özel talepleriniz varsa buraya yazabilirsiniz"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ödeme Yöntemleri */}
            <Card>
              <CardHeader>
                <CardTitle>Ödeme Yöntemi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(paymentMethods).map(([key, method]) => (
                  <div
                    key={key}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedPaymentMethod === key
                        ? 'border-[#59af05] bg-[#59af05]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod(key as 'whatsapp' | 'credit-card' | 'bank-transfer')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getPaymentIcon(key)}
                        <div>
                          <h3 className="font-medium text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{method.processingTime}</div>
                        {method.fee > 0 && (
                          <div className="text-sm text-orange-600">+{method.fee}₺</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Kredi Kartı Bilgileri */}
                {selectedPaymentMethod === 'credit-card' && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
                    <h4 className="font-medium text-gray-900">Kart Bilgileri</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardHolderName">Kart Üzerindeki İsim</Label>
                        <Input
                          id="cardHolderName"
                          value={cardInfo.cardHolderName}
                          onChange={(e) => handleCardInputChange('cardHolderName', e.target.value)}
                          placeholder="AHMET YILMAZ"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Kart Numarası</Label>
                        <Input
                          id="cardNumber"
                          value={cardInfo.cardNumber}
                          onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryMonth">Ay</Label>
                        <Input
                          id="expiryMonth"
                          value={cardInfo.expiryMonth}
                          onChange={(e) => handleCardInputChange('expiryMonth', e.target.value)}
                          placeholder="12"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryYear">Yıl</Label>
                        <Input
                          id="expiryYear"
                          value={cardInfo.expiryYear}
                          onChange={(e) => handleCardInputChange('expiryYear', e.target.value)}
                          placeholder="25"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          value={cardInfo.cvc}
                          onChange={(e) => handleCardInputChange('cvc', e.target.value)}
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sağ taraf - Sipariş Özeti */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items?.map((item) => (
                  <div key={item.id} className="flex gap-3">
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
                      <div className="text-sm text-gray-600">
                        <div>Adet: {item.quantity.toLocaleString()}</div>
                        {item.selectedMaterial && <div>Malzeme: {item.selectedMaterial}</div>}
                        {item.selectedSize && <div>Boyut: {item.selectedSize}</div>}
                        {item.selectedWindow && <div>Pencere: {item.selectedWindow}</div>}
                        {item.selectedExtras && item.selectedExtras.length > 0 && (
                          <div>Ekstra: {item.selectedExtras.join(', ')}</div>
                        )}
                      </div>
                      <div className="font-medium text-[#59af05]">₺{item.price.toFixed(0)}</div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ara Toplam:</span>
                    <span>₺{getTotalPrice().toFixed(0)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>İndirim ({appliedDiscount.code}):</span>
                      <span>-₺{(getTotalPrice() - totalPrice).toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Kargo:</span>
                    <span className="text-green-600">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Toplam:</span>
                    <span className="text-[#59af05]">₺{totalPrice.toFixed(0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ödeme Butonu */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-[#59af05] hover:bg-[#4a9321] text-white py-3 text-lg"
            >
              {isProcessing ? 'İşleniyor...' : `₺${totalPrice.toFixed(0)} Öde`}
            </Button>

            {/* Güvenlik Bilgisi */}
            <div className="text-center text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Truck className="w-4 h-4" />
                <span>Güvenli Ödeme</span>
              </div>
              <p>Tüm ödemeleriniz SSL ile şifrelenir ve güvenli bir şekilde işlenir.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 