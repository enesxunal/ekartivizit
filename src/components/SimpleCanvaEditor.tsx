'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { simpleCanva } from '@/lib/canva-simple'
import { ExternalLink, ArrowLeft, Upload, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'

interface SimpleCanvaEditorProps {
  productCategory: 'kartvizit' | 'brosur' | 'magnet'
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
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToast } = useToast()

  // Component mount olduğunda hata kontrolü yap
  useEffect(() => {
    try {
      // Toast context'ini test et
      if (!addToast) {
        throw new Error('Toast context bulunamadı')
      }
      
      // Cart context'ini test et
      if (!addToCart) {
        throw new Error('Cart context bulunamadı')
      }
      
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen hata'
      setError(errorMessage)
      console.error('SimpleCanvaEditor initialization error:', err)
    }
  }, [addToast, addToCart])

  // Canva'da tasarım yap
  const openCanvaDesigner = () => {
    try {
      const canvaUrl = simpleCanva.createDesignUrl(productCategory, templateId)
      
      // Yeni sekmede Canva'yı aç
      window.open(canvaUrl, '_blank', 'width=1200,height=800')
      
      setStep('designing')
      
      addToast({
        type: 'info',
        title: 'Canva Açıldı',
        description: 'Tasarımınızı tamamladıktan sonra PDF olarak indirin ve yükleyin'
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Canva açılırken hata oluştu'
      setError(errorMessage)
      console.error('Canva open error:', err)
      
      addToast({
        type: 'error',
        title: 'Hata',
        description: errorMessage
      })
    }
  }

  // Dosya yükleme
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Dosya yüklenirken hata oluştu'
      setError(errorMessage)
      console.error('File upload error:', err)
      
      addToast({
        type: 'error',
        title: 'Hata',
        description: errorMessage
      })
    }
  }

  // Sepete ekle
  const handleAddToCart = () => {
    try {
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
        try {
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
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Sepete eklenirken hata oluştu'
          setError(errorMessage)
          console.error('Add to cart error:', err)
          
          addToast({
            type: 'error',
            title: 'Hata',
            description: errorMessage
          })
        }
      }
      
      reader.onerror = () => {
        const errorMessage = 'Dosya okunamadı'
        setError(errorMessage)
        addToast({
          type: 'error',
          title: 'Hata',
          description: errorMessage
        })
      }
      
      reader.readAsDataURL(designFile)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sepete eklenirken hata oluştu'
      setError(errorMessage)
      console.error('Add to cart error:', err)
      
      addToast({
        type: 'error',
        title: 'Hata',
        description: errorMessage
      })
    }
  }

  // Hata durumunda gösterilecek UI
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-6 h-6" />
              Hata Oluştu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={() => {
                  setError(null)
                  setStep('start')
                }}
                variant="outline"
                className="w-full"
              >
                Tekrar Dene
              </Button>
              
              <Button
                onClick={() => router.back()}
                variant="outline"
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