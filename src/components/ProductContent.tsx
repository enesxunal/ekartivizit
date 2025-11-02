'use client'

import { useState } from 'react'
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

  // Mevcut seçeneklere göre adet seçeneklerini getir
  const getAvailableQuantities = () => {
    if (!product.quantityPricing) return []
    
    return product.quantityPricing
      .filter(p => {
        const materialMatch = !p.material || p.material === selectedMaterial
        const sizeMatch = !p.size || p.size === selectedSize
        return materialMatch && sizeMatch
      })
      .map(p => p.quantity)
      .filter((value, index, self) => self.indexOf(value) === index) // Unique values
      .sort((a, b) => a - b)
  }

  // İlk malzemeyi ve boyutu varsayılan olarak seç
  if (!selectedMaterial && product.materials && product.materials.length > 0) {
    setSelectedMaterial(product.materials[0])
  }
  if (!selectedSize && product.sizes && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0])
  }
  if (!selectedWindow && product.windowOptions && product.windowOptions.length > 0) {
    setSelectedWindow(product.windowOptions[0])
  }
  
  // İlk adet seçeneğini varsayılan olarak seç
  const availableQuantities = getAvailableQuantities()
  if (availableQuantities.length > 0 && !availableQuantities.includes(quantity)) {
    setQuantity(availableQuantities[0])
  }

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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-[#59af05]">Ana Sayfa</Link>
        <span>/</span>
        <Link href={`/${product.category}`} className="hover:text-[#59af05] capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Sol taraf - Ürün Görselleri */}
        <div className="space-y-4">
          {/* Ana görsel */}
          <div className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          
          {/* Küçük görseller */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sağ taraf - Ürün Bilgileri */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="text-3xl font-bold text-[#59af05] mb-4">
              ₺{calculatePrice()}
            </div>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Özellikler */}
          {product.features && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Özellikler</h3>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Boyut</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border-2 rounded-lg text-left transition-colors ${
                      selectedSize === size
                        ? 'border-[#59af05] bg-[#59af05]/5 text-[#59af05]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {/* Özel Ölçü Girişi */}
              {product.customSizing?.enabled && selectedSize === 'Özel Ölçü' && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Adet</h3>
            <div className="grid grid-cols-2 gap-3">
              {getAvailableQuantities().map((qty) => (
                <button
                  key={qty}
                  onClick={() => setQuantity(qty)}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    quantity === qty
                      ? 'border-[#59af05] bg-[#59af05]/5 text-[#59af05]'
                      : 'border-gray-200 hover:border-gray-300'
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Malzeme</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.materials.map((material) => (
                  <button
                    key={material}
                    onClick={() => setSelectedMaterial(material)}
                    className={`p-3 border-2 rounded-lg text-left transition-colors ${
                      selectedMaterial === material
                        ? 'border-[#59af05] bg-[#59af05]/5 text-[#59af05]'
                        : 'border-gray-200 hover:border-gray-300'
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pencere Seçeneği</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.windowOptions.map((windowOption) => (
                  <button
                    key={windowOption}
                    onClick={() => setSelectedWindow(windowOption)}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      selectedWindow === windowOption
                        ? 'border-[#59af05] bg-[#59af05]/5 text-[#59af05]'
                        : 'border-gray-200 hover:border-gray-300'
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ek Seçenekler</h3>
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
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 text-lg flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp ile Sipariş Ver</span>
            </Button>
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-[#59af05] hover:bg-[#4a9321] text-white py-3 text-lg flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Sepete Ekle</span>
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

      {/* Ürün Detayları ve Yorumlar */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
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
        
        <div className="py-8">
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