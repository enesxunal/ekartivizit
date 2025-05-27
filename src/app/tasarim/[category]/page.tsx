'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SimpleCanvaEditor from '@/components/SimpleCanvaEditor'
import { templateCategories } from '@/lib/canva'
import { ArrowLeft, Edit3, Palette, Plus } from 'lucide-react'
// import Link from 'next/link'

type CategoryType = 'kartvizit' | 'broşür' | 'magnet'

export default function TasarimPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  const category = params.category as CategoryType
  const categoryData = templateCategories[category]

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Kategori Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız kategori bulunamadı.</p>
            <Button onClick={() => router.push('/')} className="bg-[#59af05] hover:bg-[#4a9321]">
              Ana Sayfaya Dön
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // Tasarım editörü gösteriliyorsa
  if (showEditor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                     <SimpleCanvaEditor
             productCategory={category}
             productId={`${category}-custom`}
             templateId={selectedTemplate || undefined}
           />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Başlık ve Geri Dön */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri Dön
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {categoryData.name} Tasarım Şablonları
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Hazır şablonlardan birini seçin veya sıfırdan tasarlayın
            </p>
            
            {/* Boyut Bilgisi */}
            <div className="inline-block bg-blue-50 px-4 py-2 rounded-lg text-sm text-blue-800">
              📐 Standart Boyut: {categoryData.dimensions.width} x {categoryData.dimensions.height} piksel
            </div>
          </div>
        </div>

        {/* Yeni Tasarım Oluştur Butonu */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-[#59af05] to-[#4a9321] text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sıfırdan Tasarla</h3>
                  <p className="text-green-100">
                    Boş bir sayfa ile kendi tasarımınızı oluşturun
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setSelectedTemplate(null)
                    setShowEditor(true)
                  }}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[#59af05] hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Yeni Tasarım
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Şablon Seçenekleri */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Palette className="w-6 h-6 text-[#59af05]" />
            Hazır Şablonlar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryData.templates.map((template) => (
              <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Şablon Önizleme */}
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-10 bg-gradient-to-br from-[#59af05] to-[#4a9321] rounded-lg mb-3 mx-auto opacity-80"></div>
                      <div className="text-sm text-gray-600">{template.name}</div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => {
                          setSelectedTemplate(template.id)
                          setShowEditor(true)
                        }}
                        className="bg-[#59af05] hover:bg-[#4a9321]"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Düzenle
                      </Button>
                    </div>
                  </div>
                  
                  {/* Şablon Bilgileri */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Profesyonel {categoryData.name.toLowerCase()} şablonu
                    </p>
                    <Button
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setShowEditor(true)
                      }}
                      className="w-full bg-[#59af05] hover:bg-[#4a9321]"
                      size="sm"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Bu Şablonu Kullan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bilgi Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎨 Kolay Düzenleme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Canva'nın sürükle-bırak editörü ile kolayca tasarım yapın
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📄 Baskıya Hazır</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Tüm tasarımlar 300 DPI çözünürlükte PDF olarak hazırlanır
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🚀 Hızlı Teslimat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Tasarımınızı onayladıktan sonra 4-5 iş günü içinde kargoya
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
} 