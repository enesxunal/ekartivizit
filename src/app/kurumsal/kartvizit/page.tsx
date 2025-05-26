'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProductById } from '@/data/products'
import { ArrowLeft, Star, Truck, Shield, Clock } from 'lucide-react'

export default function KartvizitPage() {
  const [selectedPaperType, setSelectedPaperType] = useState('Mat Kuşe')
  const [quantity, setQuantity] = useState(100)
  
  const product = getProductById('kartvizit')
  
  if (!product) {
    return <div>Ürün bulunamadı</div>
  }

  const paperTypes = [
    { name: 'Mat Kuşe', selected: selectedPaperType === 'Mat Kuşe' },
    { name: 'Parlak Kuşe', selected: selectedPaperType === 'Parlak Kuşe' }
  ]

  const productImages = [
    '/images/Kartvizit (1).png',
    '/images/Kartvizit (2).png', 
    '/images/Kartvizit.png',
    '/images/Kartvizit-Ekonomik.png'
  ]

  const calculatePrice = () => {
    const basePrice = 149.99
    if (quantity >= 500) return (basePrice * 0.8).toFixed(2)
    if (quantity >= 250) return (basePrice * 0.9).toFixed(2)
    return basePrice.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#59af05]">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/kurumsal" className="hover:text-[#59af05]">Kurumsal</Link>
          <span>/</span>
          <span className="text-gray-900">Kartvizit</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sol taraf - Ürün Görselleri */}
          <div className="space-y-4">
            {/* Ana görsel */}
            <div className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/Kartvizit.png"
                alt="Özel Tasarım Kartvizit"
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            {/* Küçük görseller */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <Image
                    src={image}
                    alt={`Kartvizit ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sağ taraf - Ürün Bilgileri */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Özel Tasarım Kartvizit
              </h1>
              <div className="text-3xl font-bold text-[#59af05] mb-4">
                ₺{calculatePrice()}
              </div>
              <p className="text-gray-600 leading-relaxed">
                Profesyonel görünüm için özel tasarım kartvizitler. 350gr mat kuşe kağıt 
                üzerine çift taraflı baskı. Minimum sipariş adedi: 100 adet.
              </p>
            </div>

            {/* Özellikler */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Özellikler</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#59af05] rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Adet Seçimi */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Adet</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(100, quantity - 50))}
                  disabled={quantity <= 100}
                >
                  -
                </Button>
                <span className="text-xl font-semibold min-w-[80px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 50)}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Minimum sipariş: 100 adet</p>
            </div>

            {/* Kağıt Türü */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Kağıt Türü</h3>
              <div className="grid grid-cols-2 gap-3">
                {paperTypes.map((type) => (
                  <button
                    key={type.name}
                    onClick={() => setSelectedPaperType(type.name)}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      type.selected
                        ? 'border-[#59af05] bg-[#59af05]/5 text-[#59af05]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Butonlar */}
            <div className="space-y-3">
              <Button className="w-full bg-[#59af05] hover:bg-[#4a9321] text-white py-3 text-lg">
                Sepete Ekle
              </Button>
              <Button variant="outline" className="w-full py-3 text-lg border-[#59af05] text-[#59af05] hover:bg-[#59af05]/5">
                Tasarıma Başla
              </Button>
            </div>

            {/* Teslimat Bilgisi */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Teslimat Bilgisi</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-[#59af05]" />
                    <span>Siparişiniz 4-5 iş günü içinde hazırlanıp kargoya verilir.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-[#59af05]" />
                    <span>Kargo ücretsizdir ve teslimat süresi 1-3 iş günüdür.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-[#59af05]" />
                    <span>Kalite garantisi ve ücretsiz tasarım desteği.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ürün Detayları */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-[#59af05] py-2 px-1 text-sm font-medium text-[#59af05]">
                Ürün Detayları
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Değerlendirmeler
              </button>
              <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Kargo & İade
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ürün Özellikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Teknik Özellikler</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Boyut: 85x55mm (Standart)</li>
                    <li>• Kağıt: 350gr Mat/Parlak Kuşe</li>
                    <li>• Baskı: CMYK 4 Renk</li>
                    <li>• Laminasyon: Mat/Parlak seçenekli</li>
                    <li>• Minimum Sipariş: 100 adet</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ek Özellikler</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• UV Spot laminasyon seçeneği</li>
                    <li>• Özel kesim imkanı</li>
                    <li>• Pantone özel renk baskı</li>
                    <li>• Ücretsiz tasarım desteği</li>
                    <li>• Hızlı teslimat garantisi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 