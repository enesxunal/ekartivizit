'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { Truck, Shield, Clock, MessageCircle, ShoppingCart } from 'lucide-react'
import ProductReviews from '@/components/ProductReviews'

interface ProductContentProps {
  product: Product
}

export default function ProductContent({ product }: ProductContentProps) {
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedWindow, setSelectedWindow] = useState('')
  const [quantity, setQuantity] = useState(100)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [activeTab, setActiveTab] = useState('details')

  const availableQuantities = useMemo(() => {
    if (!product.quantityPricing) return []

    return product.quantityPricing
      .filter((pricing) => {
        const materialMatch = !pricing.material || !selectedMaterial || pricing.material === selectedMaterial
        const sizeMatch = !pricing.size || !selectedSize || pricing.size === selectedSize
        return materialMatch && sizeMatch
      })
      .map((pricing) => pricing.quantity)
      .filter((value, index, values) => values.indexOf(value) === index)
      .sort((a, b) => a - b)
  }, [product.quantityPricing, selectedMaterial, selectedSize])

  useEffect(() => {
    if (product.materials?.length) setSelectedMaterial((current) => current || product.materials![0])
    if (product.sizes?.length) setSelectedSize((current) => current || product.sizes![0])
    if (product.windowOptions?.length) setSelectedWindow((current) => current || product.windowOptions![0])
  }, [product.materials, product.sizes, product.windowOptions])

  useEffect(() => {
    if (availableQuantities.length && !availableQuantities.includes(quantity)) {
      setQuantity(availableQuantities[0])
    }
  }, [availableQuantities, quantity])

  const calculatePrice = () => {
    let basePrice = product.price?.min || 0
    
    // Miktar bazlı fiyatlandırma varsa
    if (product.quantityPricing) {
      // Seçilen malzeme ve boyuta göre fiyat bul
      const pricing = product.quantityPricing.find(p => {
        const quantityMatch = p.quantity === quantity
        const materialMatch = !p.material || p.material === selectedMaterial
        const sizeMatch = !p.size || p.size === selectedSize
        return quantityMatch && materialMatch && sizeMatch
      })
      
      if (pricing) {
        basePrice = pricing.price
      }
    }
    
    // Özel ölçü hesaplama (Magnet için)
    if (product.customSizing?.enabled && selectedSize === 'Özel Ölçü' && customWidth && customHeight) {
      const width = parseFloat(customWidth)
      const height = parseFloat(customHeight)
      if (width >= product.customSizing.minSize && height >= product.customSizing.minSize) {
        const area = width * height
        basePrice = area * product.customSizing.pricePerCm2
      }
    }
    
    // Ek seçeneklerin fiyatını ekle
    const extraCost = selectedExtras.reduce((total, extraName) => {
      const extra = product.extraOptions?.find(e => e.name === extraName)
      return total + (extra?.price || 0)
    }, 0)
    
    return (basePrice + extraCost).toFixed(0)
  }

  const toggleExtra = (extraName: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraName) 
        ? prev.filter(name => name !== extraName)
        : [...prev, extraName]
    )
  }

  const handleAddToCart = () => {
    const price = parseFloat(calculatePrice())
    addToCart({
      product,
      quantity,
      selectedMaterial,
      selectedSize,
      selectedWindow,
      selectedExtras,
      customWidth,
      customHeight,
      price
    })
    
    // Başarı mesajı göster
    addToast({
      type: 'success',
      title: 'Sepete Eklendi! 🎉',
      description: `1 paket (${quantity.toLocaleString()} adet) ${product.name} sepetinize eklendi.`,
      duration: 4000
    })
  }

  const handleWhatsApp = () => {
    let sizeInfo = selectedSize
    if (selectedSize === 'Özel Ölçü' && customWidth && customHeight) {
      sizeInfo = `Özel Ölçü: ${customWidth}x${customHeight}cm`
    }
    
    const message = `Merhaba! ${product.name} ürünü hakkında bilgi almak istiyorum.
    
Ürün: ${product.name}
Adet: ${quantity}
Boyut: ${sizeInfo}
Malzeme: ${selectedMaterial}
${selectedWindow ? `Pencere: ${selectedWindow}` : ''}
${selectedExtras.length > 0 ? `Ek Seçenekler: ${selectedExtras.join(', ')}` : ''}
Tahmini Fiyat: ₺${calculatePrice()}

Detaylı bilgi alabilir miyim?`
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/908508403011?text=${encodedMessage}`, '_blank')
  }

  return (
    <main className="site-container py-10 sm:py-10 lg:py-14">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-[#777d74]">
        <Link href="/" className="hover:text-[#59af05]">Ana Sayfa</Link>
        <span>/</span>
        <Link href={`/${product.category}`} className="hover:text-[#59af05] capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,.95fr)] lg:gap-12">
        {/* Sol taraf - Ürün Görselleri */}
        <div className="space-y-4">
          {/* Ana görsel */}
          <div className="aspect-[4/3] overflow-hidden rounded-[32px] border border-black/8 bg-[#e9ece4]">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-contain p-8"
              priority
            />
          </div>
          
          {/* Küçük görseller */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square cursor-pointer overflow-hidden rounded-2xl border border-black/8 bg-white transition hover:border-black/20">
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sağ taraf - Ürün Bilgileri */}
        <div className="space-y-7 rounded-[32px] border border-black/8 bg-white p-6 sm:p-8 lg:sticky lg:top-32 lg:h-fit">
          <div>
            <h1 className="mb-3 text-[clamp(2.2rem,4vw,4.4rem)] font-semibold leading-[.92] tracking-[-0.055em] text-[#171a16]">
              {product.name}
            </h1>
            <div className="mb-5 text-3xl font-semibold tracking-[-0.04em] text-[#579d32]">
              ₺{calculatePrice()}
            </div>
            <p className="text-[#697067] leading-7">
              {product.description}
            </p>
          </div>

          {/* Özellikler */}
          {product.features && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#333832]">Özellikler</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#59af05] rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Boyut Seçimi */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#333832]">Boyut</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedSize === size
                        ? 'border-[#579d32] bg-[#edf7e6] text-[#355f22]'
                        : 'border-black/10 bg-white hover:border-black/25'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {/* Özel Ölçü Girişi */}
              {product.customSizing?.enabled && selectedSize === 'Özel Ölçü' && (
                <div className="mt-4 rounded-2xl border border-black/8 bg-[#f4f4ef] p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Özel Ölçü Bilgileri</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Genişlik (cm)
                      </label>
                      <input
                        type="number"
                        min={product.customSizing.minSize}
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                        className="w-full rounded-xl border border-black/12 bg-white px-3 py-2.5 outline-none focus:border-[#579d32] focus:ring-2 focus:ring-[#59af05]/15"
                        placeholder={`Min ${product.customSizing.minSize}cm`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Yükseklik (cm)
                      </label>
                      <input
                        type="number"
                        min={product.customSizing.minSize}
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                        className="w-full rounded-xl border border-black/12 bg-white px-3 py-2.5 outline-none focus:border-[#579d32] focus:ring-2 focus:ring-[#59af05]/15"
                        placeholder={`Min ${product.customSizing.minSize}cm`}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Fiyat: {product.customSizing.pricePerCm2}₺/cm² • Minimum boyut: {product.customSizing.minSize}cm
                  </p>
                  {(customWidth && parseFloat(customWidth) < product.customSizing.minSize) || 
                   (customHeight && parseFloat(customHeight) < product.customSizing.minSize) ? (
                    <p className="text-sm text-red-600 mt-1">
                      ⚠️ Minimum boyut {product.customSizing.minSize}cm olmalıdır
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          )}

          {/* Adet Seçimi */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#333832]">Adet</h3>
            <div className="grid grid-cols-2 gap-3">
              {availableQuantities.map((qty) => (
                <button
                  key={qty}
                  onClick={() => setQuantity(qty)}
                  className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition ${
                    quantity === qty
                      ? 'border-[#579d32] bg-[#edf7e6] text-[#355f22]'
                      : 'border-black/10 bg-white hover:border-black/25'
                  }`}
                >
                  {qty.toLocaleString()} adet
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Seçilen adet: {quantity.toLocaleString()} adet
            </p>
          </div>

          {/* Malzeme Seçimi */}
          {product.materials && product.materials.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#333832]">Malzeme</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.materials.map((material) => (
                  <button
                    key={material}
                    onClick={() => setSelectedMaterial(material)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedMaterial === material
                        ? 'border-[#579d32] bg-[#edf7e6] text-[#355f22]'
                        : 'border-black/10 bg-white hover:border-black/25'
                    }`}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pencere Seçimi (Zarf için) */}
          {product.windowOptions && product.windowOptions.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#333832]">Pencere Seçeneği</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.windowOptions.map((windowOption) => (
                  <button
                    key={windowOption}
                    onClick={() => setSelectedWindow(windowOption)}
                    className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition ${
                      selectedWindow === windowOption
                        ? 'border-[#579d32] bg-[#edf7e6] text-[#355f22]'
                        : 'border-black/10 bg-white hover:border-black/25'
                    }`}
                  >
                    {windowOption}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ek Seçenekler */}
          {product.extraOptions && product.extraOptions.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#333832]">Ek Seçenekler</h3>
              <div className="space-y-2">
                {product.extraOptions.map((extra) => (
                  <label key={extra.name} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(extra.name)}
                      onChange={() => toggleExtra(extra.name)}
                      className="w-4 h-4 text-[#59af05] border-gray-300 rounded focus:ring-[#59af05]"
                    />
                    <span className="text-sm text-gray-700">{extra.name}</span>
                    <span className="text-sm font-semibold text-[#59af05]">+₺{extra.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Butonlar */}
          <div className="space-y-3">
            <Button 
              onClick={handleWhatsApp}
              className="h-12 w-full rounded-full bg-[#171a16] text-sm font-semibold text-white hover:bg-black flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp ile Sipariş Ver</span>
            </Button>
            <Button 
              onClick={handleAddToCart}
              className="h-12 w-full rounded-full bg-[#9fe468] text-sm font-semibold text-[#171a16] hover:bg-[#8bd653] flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Sepete Ekle</span>
            </Button>
            <Button variant="outline" className="h-12 w-full rounded-full border-black/15 text-sm font-semibold text-[#171a16] hover:bg-[#f4f4ef]">
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

      {/* Ürün Detayları ve Yorumlar */}
      <div className="mt-16 rounded-[32px] border border-black/8 bg-white p-6 sm:p-8 lg:p-10">
        <div className="border-b border-black/8">
          <nav className="-mb-px flex gap-7 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('details')}
              className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'details'
                  ? 'border-[#59af05] text-[#59af05]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Ürün Detayları
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'border-[#59af05] text-[#59af05]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Değerlendirmeler
            </button>
            <button 
              onClick={() => setActiveTab('shipping')}
              className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'shipping'
                  ? 'border-[#59af05] text-[#59af05]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Kargo & İade
            </button>
          </nav>
        </div>
        
        <div className="py-10">
          {/* Ürün Detayları Tab */}
          {activeTab === 'details' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ürün Özellikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Teknik Özellikler</h4>
                  <ul className="space-y-1 text-gray-600">
                    {product.sizes && product.sizes.map((size, index) => (
                      <li key={index}>• Boyut: {size}</li>
                    ))}
                    {product.materials && product.materials.map((material, index) => (
                      <li key={index}>• Malzeme: {material}</li>
                    ))}
                    {product.colors && product.colors.map((color, index) => (
                      <li key={index}>• Renk: {color}</li>
                    ))}
                    <li>• Minimum Sipariş: {product.minQuantity} adet</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ek Özellikler</h4>
                  <ul className="space-y-1 text-gray-600">
                    {product.features && product.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                    <li>• Ücretsiz tasarım desteği</li>
                    <li>• Hızlı teslimat garantisi</li>
                    <li>• Kalite garantisi</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Değerlendirmeler Tab */}
          {activeTab === 'reviews' && (
            <ProductReviews productId={product.id} />
          )}

          {/* Kargo & İade Tab */}
          {activeTab === 'shipping' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kargo & İade Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Kargo Bilgileri</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Siparişiniz 4-5 iş günü içinde hazırlanır</li>
                    <li>• Kargo ücretsizdir (Türkiye geneli)</li>
                    <li>• Teslimat süresi 1-3 iş günüdür</li>
                    <li>• Kargo takip numarası SMS ile gönderilir</li>
                    <li>• Aras Kargo ile güvenli teslimat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">İade Koşulları</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 14 gün içinde iade hakkı</li>
                    <li>• Ürün hasarlı gelirse ücretsiz değişim</li>
                    <li>• Özel tasarım ürünlerde iade kabul edilmez</li>
                    <li>• İade kargo ücreti müşteriye aittir</li>
                    <li>• Para iadesi 3-5 iş günü içinde yapılır</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 