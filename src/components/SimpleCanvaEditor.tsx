'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { simpleCanva } from '@/lib/canva-simple'
import { ExternalLink, ArrowLeft, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/components/ui/toast'

interface SimpleCanvaEditorProps {
  productCategory: 'kartvizit' | 'broşür' | 'magnet'
  productId: string
  templateId?: string
}

export default function SimpleCanvaEditor({ 
  productCategory, 
  productId, 
  templateId 
}: SimpleCanvaEditorProps) {
  const [step, setStep] = useState<'start' | 'designing' | 'upload'>('start')
  const [designFile, setDesignFile] = useState<File | null>(null)
  
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToast } = useToast()

  // Canva'da tasarım yap
  const openCanvaDesigner = () => {
    const canvaUrl = simpleCanva.createDesignUrl(productCategory, templateId)
    
    // Yeni sekmede Canva'yı aç
    window.open(canvaUrl, '_blank', 'width=1200,height=800')
    
    setStep('designing')
    
    addToast({
      type: 'info',
      title: 'Canva Açıldı',
      description: 'Tasarımınızı tamamladıktan sonra PDF olarak indirin ve yükleyin'
    })
  }

  // Dosya yükleme
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    
    if (file) {
      // PDF kontrolü
      if (file.type !== 'application/pdf') {
        addToast({
          type: 'error',
          title: 'Hatalı Dosya Tipi',
          description: 'Lütfen PDF formatında dosya yükleyin'
        })
        return
      }

      // Dosya boyutu kontrolü (10MB)
      if (file.size > 10 * 1024 * 1024) {
        addToast({
          type: 'error',
          title: 'Dosya Çok Büyük',
          description: 'Dosya boyutu 10MB\'dan küçük olmalıdır'
        })
        return
      }

      setDesignFile(file)
      addToast({
        type: 'success',
        title: 'Dosya Yüklendi',
        description: 'Tasarım dosyanız başarıyla yüklendi'
      })
    }
  }

  // Sepete ekle
  const handleAddToCart = () => {
    if (!designFile) {
      addToast({
        type: 'error',
        title: 'Dosya Gerekli',
        description: 'Lütfen önce tasarım dosyanızı yükleyin'
      })
      return
    }

    // Dosyayı base64'e çevir (gerçek uygulamada dosya upload servisi kullanılmalı)
    const reader = new FileReader()
    reader.onload = () => {
      const base64Data = reader.result as string

      addToCart({
        product: {
          id: productId,
          name: `${productCategory.charAt(0).toUpperCase() + productCategory.slice(1)} - Özel Tasarım`,
          description: 'Canva ile özel tasarladığınız ürün',
          category: 'kurumsal',
          image: '/placeholder-design.jpg',
          href: `/${productCategory}-ozel-tasarim`,
          gradient: 'from-[#59af05] to-[#4a9321]',
          price: { min: 0, max: 0 }
        },
        quantity: 1000,
        selectedMaterial: undefined,
        selectedSize: undefined,
        selectedWindow: undefined,
        selectedExtras: undefined,
        price: 0,
        customDesign: {
          designId: `custom-${Date.now()}`,
          designTitle: designFile.name,
          pdfUrl: base64Data, // Gerçek uygulamada upload edilmiş dosya URL'i
          createdAt: new Date().toISOString()
        }
      })

      addToast({
        type: 'success',
        title: 'Sepete Eklendi',
        description: 'Özel tasarımınız sepete eklendi'
      })

      router.push('/sepet')
    }
    
    reader.readAsDataURL(designFile)
  }

  // Başlangıç adımı
  if (step === 'start') {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-6 h-6 text-[#59af05]" />
              {templateId ? 'Şablonu Düzenle' : 'Yeni Tasarım Oluştur'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {productCategory.charAt(0).toUpperCase() + productCategory.slice(1)} Tasarımı
              </h3>
              <p className="text-gray-600">
                Canva&apos;da tasarımınızı oluşturun ve PDF olarak indirip yükleyin
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-medium mb-4">📋 Nasıl Çalışır?</h4>
              <div className="text-left space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#59af05] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-medium">Canva&apos;da Tasarla</div>
                    <div className="text-sm text-gray-600">Canva editöründe tasarımınızı oluşturun</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#59af05] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div className="font-medium">PDF İndir</div>
                    <div className="text-sm text-gray-600">Tasarımınızı PDF formatında indirin</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#59af05] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-medium">Sitemize Yükle</div>
                    <div className="text-sm text-gray-600">PDF dosyasını sitemize yükleyin</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={openCanvaDesigner}
                size="lg"
                className="bg-[#59af05] hover:bg-[#4a9321] w-full"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Canva&apos;da Tasarımı Başlat
              </Button>

              <Button
                variant="outline"
                onClick={() => router.back()}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri Dön
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tasarım adımı
  if (step === 'designing') {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Tasarım Yükleme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                ✅ Canva tasarım editörü açıldı
              </h3>
              <p className="text-green-700 text-sm">
                Tasarımınızı tamamladıktan sonra PDF olarak indirin ve aşağıya yükleyin.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">PDF Dosyasını Yükleyin</h4>
              <p className="text-gray-600 mb-4">
                Canva&apos;dan indirdiğiniz PDF dosyasını buraya sürükleyin veya seçin
              </p>
              
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="design-upload"
              />
              
              <label htmlFor="design-upload">
                <Button asChild className="bg-[#59af05] hover:bg-[#4a9321]">
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Dosya Seç
                  </span>
                </Button>
              </label>
            </div>

            {designFile && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">📄 Yüklenen Dosya:</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{designFile.name}</div>
                    <div className="text-sm text-gray-600">
                      {(designFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    className="bg-[#59af05] hover:bg-[#4a9321]"
                  >
                    Sepete Ekle
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep('start')}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri Dön
              </Button>
              
              <Button
                variant="outline"
                onClick={openCanvaDesigner}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Canva&apos;yı Tekrar Aç
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
} 