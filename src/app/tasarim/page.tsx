'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, Palette, FileText, Magnet, CreditCard } from 'lucide-react'

const designCategories = [
  {
    id: 'kartvizit',
    name: 'Kartvizit',
    description: 'Profesyonel kartvizit tasarımları',
    icon: CreditCard,
    color: 'from-blue-500 to-blue-600',
    dimensions: '90 x 50 mm',
    features: ['Çift taraflı tasarım', 'Premium kağıt seçenekleri', 'Hızlı teslimat']
  },
  {
    id: 'brosur',
    name: 'Broşür',
    description: 'Etkileyici broşür ve katalog tasarımları',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    dimensions: 'A4, A5, Özel boyutlar',
    features: ['Katlamalı tasarımlar', 'Yüksek kalite baskı', 'Özel boyut seçenekleri']
  },
  {
    id: 'magnet',
    name: 'Magnet',
    description: 'Buzdolabı magnetleri ve promosyon ürünleri',
    icon: Magnet,
    color: 'from-purple-500 to-purple-600',
    dimensions: '85 x 55 mm',
    features: ['Güçlü mıknatıs', 'Dayanıklı malzeme', 'Renkli baskı']
  }
]

export default function TasarimPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[#59af05] rounded-full">
              <Palette className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tasarım Merkezi
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Profesyonel tasarım araçlarımızla kartvizit, broşür ve magnet tasarımlarınızı kolayca oluşturun. 
            Hazır şablonlardan seçin veya sıfırdan tasarlayın.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-[#59af05] rounded-full"></div>
              Canva Entegrasyonu
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-[#59af05] rounded-full"></div>
              Baskıya Hazır PDF
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-[#59af05] rounded-full"></div>
              Hızlı Teslimat
            </div>
          </div>
        </div>

        {/* Kategori Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {designCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="w-8 h-8" />
                      <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                  
                  {/* İçerik */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Standart Boyut</div>
                      <div className="font-semibold text-gray-900">{category.dimensions}</div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-2">Özellikler</div>
                      <ul className="space-y-1">
                        {category.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#59af05] rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button
                      onClick={() => router.push(`/tasarim/${category.id}`)}
                      className="w-full bg-[#59af05] hover:bg-[#4a9321] group-hover:bg-[#4a9321]"
                    >
                      Tasarlamaya Başla
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bilgi Bölümü */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Neden Bizim Tasarım Araçlarımızı Seçmelisiniz?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profesyonel tasarım deneyimi için ihtiyacınız olan her şey burada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kolay Kullanım</h3>
              <p className="text-sm text-gray-600">
                Sürükle-bırak editörü ile herkes kolayca tasarım yapabilir
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hazır Şablonlar</h3>
              <p className="text-sm text-gray-600">
                Yüzlerce profesyonel şablon arasından seçim yapın
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Yüksek Kalite</h3>
              <p className="text-sm text-gray-600">
                300 DPI çözünürlükte baskıya hazır dosyalar
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Magnet className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hızlı Teslimat</h3>
              <p className="text-sm text-gray-600">
                Tasarımınızı tamamlayın, hemen sipariş verin
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 