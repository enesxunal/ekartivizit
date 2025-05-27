'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getItemCount, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return

    const orderDetails = items.map(item => {
      let sizeInfo = item.selectedSize || ''
      if (item.selectedSize === 'Özel Ölçü' && item.customWidth && item.customHeight) {
        sizeInfo = `Özel Ölçü: ${item.customWidth}x${item.customHeight}cm`
      }

      return `• ${item.product.name}
  - Ürün Adedi: ${item.quantity.toLocaleString()} adet
  - Sepet Adedi: ${item.cartQuantity} tane
  - Toplam Adet: ${(item.quantity * item.cartQuantity).toLocaleString()} adet
  - Boyut: ${sizeInfo}
  - Malzeme: ${item.selectedMaterial || ''}
  ${item.selectedWindow ? `- Pencere: ${item.selectedWindow}` : ''}
  ${item.selectedExtras && item.selectedExtras.length > 0 ? `- Ek Seçenekler: ${item.selectedExtras.join(', ')}` : ''}
  - Fiyat: ₺${(item.price * item.cartQuantity).toLocaleString()}`
    }).join('\n\n')

    const message = `Merhaba! Sepetimde bulunan ürünler için sipariş vermek istiyorum:

${orderDetails}

TOPLAM: ₺${getTotalPrice().toLocaleString()}

Sipariş detayları hakkında bilgi alabilir miyim?`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/908508403011?text=${encodedMessage}`, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-8">Henüz sepetinize ürün eklemediniz. Hemen alışverişe başlayın!</p>
            <Link href="/tum-urunler">
              <Button className="bg-[#59af05] hover:bg-[#4a9321] text-white px-8 py-3">
                Alışverişe Başla
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Başlık */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/tum-urunler" className="text-[#59af05] hover:text-[#4a9321]">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Sepetim ({getItemCount()} ürün)</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Sepeti Temizle
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol taraf - Sepet ürünleri */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Ürün görseli */}
                    <div className="w-24 h-24 bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Ürün bilgileri */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.product.name}
                      </h3>
                      
                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p><strong>Ürün Adedi:</strong> {item.quantity.toLocaleString()} adet</p>
                        {item.selectedMaterial && (
                          <p>Malzeme: {item.selectedMaterial}</p>
                        )}
                        {item.selectedSize && (
                          <p>
                            Boyut: {item.selectedSize === 'Özel Ölçü' && item.customWidth && item.customHeight 
                              ? `Özel Ölçü: ${item.customWidth}x${item.customHeight}cm`
                              : item.selectedSize
                            }
                          </p>
                        )}
                        {item.selectedWindow && (
                          <p>Pencere: {item.selectedWindow}</p>
                        )}
                        {item.selectedExtras && item.selectedExtras.length > 0 && (
                          <p>Ek Seçenekler: {item.selectedExtras.join(', ')}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Sepet adedi kontrolü */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Sepet Adedi:</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.cartQuantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Fiyat ve silme */}
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#59af05]">
                              ₺{(item.price * item.cartQuantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₺{item.price.toLocaleString()} / {item.quantity.toLocaleString()} adet
                            </p>
                            <p className="text-xs text-gray-400">
                              Toplam: {(item.quantity * item.cartQuantity).toLocaleString()} adet
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sağ taraf - Sipariş özeti */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Ara Toplam:</span>
                  <span>₺{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo:</span>
                  <span className="text-[#59af05] font-medium">Ücretsiz</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam:</span>
                    <span className="text-[#59af05]">₺{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promosyon kodu */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Promosyon Kodu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promosyon kodunu girin"
                    value={promoCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                  />
                  <Button variant="outline">Uygula</Button>
                </div>
              </CardContent>
            </Card>

            {/* Sipariş butonları */}
            <div className="space-y-3">
              <Button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 text-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp ile Sipariş Ver</span>
              </Button>
              
              <Link href="/odeme" className="block">
                <Button className="w-full bg-[#59af05] hover:bg-[#4a9321] text-white py-3 text-lg">
                  Ödemeye Geç
                </Button>
              </Link>
              
              <Link href="/tum-urunler" className="block">
                <Button variant="outline" className="w-full py-3 text-lg">
                  Alışverişe Devam Et
                </Button>
              </Link>
            </div>

            {/* Güvenlik bilgisi */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Güvenli Ödeme</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Tüm ödemeleriniz SSL ile korunmaktadır.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 