'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { canvaAPI, CanvaDesign, templateCategories } from '@/lib/canva'
import { Loader2, Download, Save, ArrowLeft, Edit3 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/components/ui/toast'

interface CanvaDesignEditorProps {
  productCategory: 'kartvizit' | 'broşür' | 'magnet'
  productId: string
  templateId?: string
  onDesignComplete?: (design: CanvaDesign, pdfUrl: string) => void
}

export default function CanvaDesignEditor({ 
  productCategory, 
  productId, 
  templateId,
  onDesignComplete 
}: CanvaDesignEditorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentDesign, setCurrentDesign] = useState<CanvaDesign | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [canvaEmbedUrl, setCanvaEmbedUrl] = useState<string | null>(null)
  const [step, setStep] = useState<'auth' | 'design' | 'preview'>('auth')
  
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const categoryData = templateCategories[productCategory]

  // Canva kimlik doğrulama
  const handleCanvaAuth = async () => {
    try {
      setIsLoading(true)
      
      // State parametresi olarak ürün bilgilerini gönder
      const state = JSON.stringify({
        productCategory,
        productId,
        templateId,
      })
      
      const authUrl = canvaAPI.getAuthUrl(state)
      
      // Popup pencere aç
      const popup = window.open(
        authUrl,
        'canva-auth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      )

      // Popup'tan gelen mesajları dinle
      const messageHandler = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return

        if (event.data.type === 'canva-auth-success') {
          const { code } = event.data
          popup?.close()
          
          try {
            // Access token al
            const token = await canvaAPI.getAccessToken(code)
            setAccessToken(token)
            localStorage.setItem('canva_token', token)

            // Tasarım oluştur
            await createDesign(token)
            
            window.removeEventListener('message', messageHandler)
                     } catch (error) {
             console.error('Token alma hatası:', error)
             addToast({
               type: 'error',
               title: 'Hata',
               description: 'Canva bağlantısı kurulamadı'
             })
           }
        }
      }

      window.addEventListener('message', messageHandler)

      // Popup kapatıldığında temizlik
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
          setIsLoading(false)
        }
      }, 1000)

         } catch (error) {
       console.error('Canva auth hatası:', error)
       addToast({
         type: 'error',
         title: 'Hata',
         description: 'Canva bağlantısı başlatılamadı'
       })
       setIsLoading(false)
     }
  }

  // Tasarım oluştur
  const createDesign = async (token: string) => {
    try {
      setIsLoading(true)
      
      let design: CanvaDesign

      if (templateId) {
        // Şablondan tasarım oluştur
        design = await canvaAPI.createDesignFromTemplate(
          token,
          templateId,
          `${categoryData.name} Tasarımı`
        )
      } else {
        // Boş tasarım oluştur
        design = await canvaAPI.createBlankDesign(
          token,
          `${categoryData.name} Tasarımı`,
          productCategory,
          categoryData.dimensions
        )
      }

      setCurrentDesign(design)
      
      // Canva editörünü embed et
      setCanvaEmbedUrl(design.urls.editUrl)
      setStep('design')
      
             addToast({
         type: 'success',
         title: 'Başarılı',
         description: 'Tasarım editörü yüklendi'
       })

     } catch (error) {
       console.error('Tasarım oluşturma hatası:', error)
       addToast({
         type: 'error',
         title: 'Hata',
         description: 'Tasarım oluşturulamadı'
       })
    } finally {
      setIsLoading(false)
    }
  }

  // Tasarımı kaydet ve export et
  const handleSaveAndExport = async () => {
    if (!currentDesign || !accessToken) return

    try {
      setIsExporting(true)
      
      // Tasarımı PDF olarak export et
      const exportResult = await canvaAPI.exportDesign(
        accessToken,
        currentDesign.id,
        'pdf'
      )

      // Export durumunu kontrol et
      let exportStatus = exportResult
      while (exportStatus.status === 'pending') {
        await new Promise(resolve => setTimeout(resolve, 2000))
        exportStatus = await canvaAPI.checkExportStatus(
          accessToken,
          exportResult.exportId
        )
      }

      if (exportStatus.status === 'completed' && exportStatus.downloadUrl) {
        // PDF URL'sini kaydet
        const updatedDesign = {
          ...currentDesign,
          exportUrls: { pdf: exportStatus.downloadUrl },
          status: 'exported' as const
        }
        
        setCurrentDesign(updatedDesign)
        setStep('preview')

                 addToast({
           type: 'success',
           title: 'Başarılı',
           description: 'Tasarımınız hazırlandı'
         })

         // Parent komponente bildir
         onDesignComplete?.(updatedDesign, exportStatus.downloadUrl)

       } else {
         throw new Error('Export başarısız')
       }

     } catch (error) {
       console.error('Export hatası:', error)
       addToast({
         type: 'error',
         title: 'Hata',
         description: 'Tasarım kaydedilemedi'
       })
    } finally {
      setIsExporting(false)
    }
  }

  // Sepete ekle
  const handleAddToCart = () => {
    if (!currentDesign) return

    // Ürün bilgilerini sepete ekle (tasarım bilgileriyle birlikte)
    addToCart({
      product: {
        id: productId,
        name: `${categoryData.name} - Özel Tasarım`,
        description: 'Canva ile özel tasarladığınız ürün',
        category: 'kurumsal', // Varsayılan kategori
        image: '/placeholder-design.jpg',
        href: `/${productCategory}-ozel-tasarim`,
        gradient: 'from-[#59af05] to-[#4a9321]',
        price: { min: 0, max: 0 }
      },
      quantity: 1000, // Varsayılan adet
      selectedMaterial: undefined,
      selectedSize: undefined,
      selectedWindow: undefined,
      selectedExtras: undefined,
      price: 0,
      customDesign: {
        designId: currentDesign.id,
        designTitle: currentDesign.title,
        pdfUrl: currentDesign.exportUrls?.pdf || '',
        createdAt: currentDesign.createdAt
      }
    })

    addToast({
      type: 'success',
      title: 'Sepete Eklendi',
      description: 'Özel tasarımınız sepete eklendi'
    })

    router.push('/sepet')
  }

  // Mevcut token kontrolü
  useEffect(() => {
    const savedToken = localStorage.getItem('canva_token')
    if (savedToken) {
      setAccessToken(savedToken)
      // Token geçerli mi kontrol et (isteğe bağlı)
    }
  }, [])

  // Auth adımı
  if (step === 'auth') {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="w-6 h-6 text-[#59af05]" />
              {templateId ? 'Şablonu Düzenle' : 'Yeni Tasarım Oluştur'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {categoryData.name} Tasarımı
              </h3>
              <p className="text-gray-600">
                Canva ile profesyonel tasarımınızı oluşturun
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">✨ Tasarım özellikleri:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Boyut: {categoryData.dimensions.width} x {categoryData.dimensions.height} piksel</li>
                <li>• Yüksek çözünürlük (300 DPI)</li>
                <li>• PDF formatında hazır</li>
                <li>• Profesyonel baskı kalitesi</li>
              </ul>
            </div>

            <Button
              onClick={handleCanvaAuth}
              disabled={isLoading}
              size="lg"
              className="bg-[#59af05] hover:bg-[#4a9321]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Yükleniyor...
                </>
              ) : (
                <>
                  <Edit3 className="w-5 h-5 mr-2" />
                  Tasarımı Başlat
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.back()}
              className="ml-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tasarım adımı
  if (step === 'design') {
    return (
      <div className="max-w-full mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Tasarım Editörü</CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveAndExport}
                  disabled={isExporting}
                  className="bg-[#59af05] hover:bg-[#4a9321]"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet ve Devam Et
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep('auth')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Geri
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {canvaEmbedUrl && (
              <div className="w-full" style={{ height: '80vh' }}>
                <iframe
                  ref={iframeRef}
                  src={canvaEmbedUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Canva Design Editor"
                  className="rounded-lg border"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Önizleme adımı
  if (step === 'preview' && currentDesign) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-6 h-6 text-green-500" />
              Tasarım Tamamlandı
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                ✅ Tasarımınız başarıyla hazırlandı!
              </h3>
              <p className="text-green-700 text-sm">
                Tasarımınız PDF formatında kaydedildi ve sipariş için hazır.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tasarım Detayları:</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasarım Adı:</span>
                  <span className="font-medium">{currentDesign.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kategori:</span>
                  <span className="font-medium">{categoryData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Boyut:</span>
                  <span className="font-medium">
                    {categoryData.dimensions.width} x {categoryData.dimensions.height} px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">PDF (Baskıya Hazır)</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="bg-[#59af05] hover:bg-[#4a9321] flex-1"
              >
                Sepete Ekle ve Sipariş Ver
              </Button>
              
              {currentDesign.exportUrls?.pdf && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(currentDesign.exportUrls!.pdf!, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF İndir
                </Button>
              )}
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep('design')}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Düzenle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
} 