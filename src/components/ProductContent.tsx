'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import ProductReviews from '@/components/ProductReviews'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  FileUp,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react'

interface ProductContentProps {
  product: Product
}

export default function ProductContent({ product }: ProductContentProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedWindow, setSelectedWindow] = useState('')
  const [quantity, setQuantity] = useState(product.minQuantity || 1)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  const [activeImage, setActiveImage] = useState(product.image)
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details')
  const [designChoice, setDesignChoice] = useState<'ready' | 'support'>('ready')

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
    if (product.quantityPricing) {
      const pricing = product.quantityPricing.find((item) => {
        const quantityMatch = item.quantity === quantity
        const materialMatch = !item.material || item.material === selectedMaterial
        const sizeMatch = !item.size || item.size === selectedSize
        return quantityMatch && materialMatch && sizeMatch
      })
      if (pricing) basePrice = pricing.price
    }

    if (product.customSizing?.enabled && selectedSize === 'Özel Ölçü' && customWidth && customHeight) {
      const width = parseFloat(customWidth)
      const height = parseFloat(customHeight)
      if (width >= product.customSizing.minSize && height >= product.customSizing.minSize) {
        basePrice = width * height * product.customSizing.pricePerCm2
      }
    }

    const extraCost = selectedExtras.reduce((total, extraName) => {
      const extra = product.extraOptions?.find((item) => item.name === extraName)
      return total + (extra?.price || 0)
    }, 0)

    return Math.round(basePrice + extraCost)
  }

  const price = calculatePrice()
  const unitPrice = quantity > 0 ? price / quantity : 0
  const gallery = product.images?.length ? product.images : [product.image]

  const toggleExtra = (extraName: string) => {
    setSelectedExtras((current) =>
      current.includes(extraName) ? current.filter((name) => name !== extraName) : [...current, extraName],
    )
  }

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      selectedMaterial,
      selectedSize,
      selectedWindow,
      selectedExtras,
      customWidth,
      customHeight,
      price,
    })
    addToast({
      type: 'success',
      title: 'Sepete eklendi',
      description: `${quantity.toLocaleString('tr-TR')} adet ${product.name} sepete eklendi.`,
      duration: 3000,
    })
  }

  const handleAddAndContinue = () => {
    handleAddToCart()
    router.push('/sepet')
  }

  const handleWhatsApp = () => {
    const message = `Merhaba! ${product.name} hakkında bilgi almak istiyorum.\nAdet: ${quantity}\nÖlçü: ${selectedSize}\nMalzeme: ${selectedMaterial}\nTahmini fiyat: ${price.toLocaleString('tr-TR')} TL`
    window.open(`https://wa.me/908508403011?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <main className="bg-white">
      <div className="border-b border-[#e9ebe7] bg-[#fafaf8]">
        <div className="site-container flex min-h-10 items-center gap-2 overflow-x-auto whitespace-nowrap text-xs text-[#72786f]">
          <Link href="/" className="hover:text-[#171a16]">Ana Sayfa</Link>
          <ChevronRight className="size-3.5" />
          <Link href={`/${product.category}`} className="capitalize hover:text-[#171a16]">{product.category}</Link>
          <ChevronRight className="size-3.5" />
          <span className="font-medium text-[#171a16]">{product.name}</span>
        </div>
      </div>

      <section className="site-container py-5 sm:py-6 lg:py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(420px,.96fr)] lg:gap-9">
          <div className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#f3f4f1] sm:rounded-[20px] lg:aspect-auto lg:h-[calc(100vh-225px)] lg:min-h-[430px] lg:max-h-[610px]">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 56vw"
                className="object-contain p-6 sm:p-8 lg:p-10"
              />
              <span className="absolute left-3 top-3 rounded-full border border-black/8 bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-[#656b62]">
                Baskı ürünü
              </span>
            </div>

            {gallery.length > 1 && (
              <div className="mt-2 grid grid-cols-4 gap-2 sm:max-w-lg">
                {gallery.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setActiveImage(image)}
                    className={`relative aspect-square overflow-hidden rounded-[12px] lg:h-[74px] lg:aspect-auto border bg-[#f6f6f3] transition ${activeImage === image ? 'border-[#171a16]' : 'border-black/8 hover:border-black/20'}`}
                  >
                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-contain p-2" sizes="140px" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 hidden lg:block">
              <div className="grid grid-cols-3 border-y border-[#e9ebe7]">
                {[
                  [Truck, 'Türkiye geneli gönderim', 'Sipariş durumu takip edilir'],
                  [ShieldCheck, 'Dosya kontrolü', 'Baskı öncesi dosya eşleşmesi'],
                  [PackageCheck, 'Üretim takibi', 'Hazırlık ve sevkiyat görünür'],
                ].map(([Icon, title, text]) => {
                  const FeatureIcon = Icon as typeof Truck
                  return (
                    <div key={String(title)} className="border-r border-[#e9ebe7] px-4 py-4 last:border-r-0 first:pl-0">
                      <FeatureIcon className="mb-3 size-4 text-[#579d32]" />
                      <p className="text-sm font-semibold text-[#171a16]">{String(title)}</p>
                      <p className="mt-1 text-xs leading-5 text-[#737970]">{String(text)}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-[82px] lg:flex lg:max-h-[calc(100vh-98px)] lg:flex-col lg:overflow-hidden">
            <div className="mb-4 lg:shrink-0">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#579d32]">
                <span>{product.category}</span><span className="text-[#b7bbb4]">/</span><span>Online baskı</span>
              </div>
              <h1 className="text-[clamp(2.2rem,3.2vw,3.4rem)] font-semibold leading-[.93] tracking-[-.06em] text-[#171a16]">{product.name}</h1>
              <p className="mt-2 max-w-xl line-clamp-2 text-[13px] leading-5 text-[#687067]">{product.description}</p>
            </div>

            <div className="space-y-4 border-t border-[#e7e9e5] pt-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
              {product.sizes?.length ? (
                <OptionSection number="01" title="Ölçü">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {product.sizes.map((size) => (
                      <OptionButton key={size} selected={selectedSize === size} onClick={() => setSelectedSize(size)} label={size} />
                    ))}
                  </div>
                  {product.customSizing?.enabled && selectedSize === 'Özel Ölçü' && (
                    <div className="mt-3 grid grid-cols-2 gap-3 rounded-[12px] bg-[#f6f7f4] p-3">
                      <label className="text-xs font-medium text-[#636960]">Genişlik (cm)<input value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} type="number" className="mt-1.5 h-9 w-full rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#579d32]" /></label>
                      <label className="text-xs font-medium text-[#636960]">Yükseklik (cm)<input value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} type="number" className="mt-1.5 h-9 w-full rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#579d32]" /></label>
                    </div>
                  )}
                </OptionSection>
              ) : null}

              {product.materials?.length ? (
                <OptionSection number="02" title="Kağıt / malzeme">
                  <div className="grid gap-2">
                    {product.materials.map((material) => (
                      <button
                        type="button"
                        key={material}
                        onClick={() => setSelectedMaterial(material)}
                        className={`flex items-center justify-between gap-4 rounded-[11px] border px-3 py-2.5 text-left transition ${selectedMaterial === material ? 'border-[#171a16] bg-[#f7f8f5]' : 'border-[#e5e8e2] hover:border-[#b9beb5]'}`}
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#171a16]">{material}</p>
                          
                        </div>
                        <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${selectedMaterial === material ? 'border-[#171a16] bg-[#171a16] text-white' : 'border-[#c9cdc6]'}`}>
                          {selectedMaterial === material && <Check className="size-3" />}
                        </span>
                      </button>
                    ))}
                  </div>
                </OptionSection>
              ) : null}

              {availableQuantities.length ? (
                <OptionSection number="03" title="Adet">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {availableQuantities.map((qty) => {
                      const pricing = product.quantityPricing?.find((item) => item.quantity === qty && (!item.material || item.material === selectedMaterial) && (!item.size || item.size === selectedSize))
                      return (
                        <button type="button" key={qty} onClick={() => setQuantity(qty)} className={`rounded-[11px] border p-2.5 text-left transition ${quantity === qty ? 'border-[#171a16] bg-[#171a16] text-white' : 'border-[#e5e8e2] bg-white hover:border-[#b9beb5]'}`}>
                          <span className="block text-sm font-semibold">{qty.toLocaleString('tr-TR')} adet</span>
                          {pricing && <span className={`mt-1 block text-xs ${quantity === qty ? 'text-white/65' : 'text-[#8a9087]'}`}>{pricing.price.toLocaleString('tr-TR')} TL</span>}
                        </button>
                      )
                    })}
                  </div>
                </OptionSection>
              ) : null}

              {product.windowOptions?.length ? (
                <OptionSection number="04" title="Uygulama">
                  <div className="grid grid-cols-2 gap-2">{product.windowOptions.map((item) => <OptionButton key={item} selected={selectedWindow === item} onClick={() => setSelectedWindow(item)} label={item} />)}</div>
                </OptionSection>
              ) : null}

              {product.extraOptions?.length ? (
                <OptionSection number="05" title="Ek seçenekler">
                  <div className="space-y-2">
                    {product.extraOptions.map((extra) => (
                      <label key={extra.name} className="flex cursor-pointer items-center justify-between rounded-[11px] border border-[#e5e8e2] px-3 py-2.5 hover:border-[#b9beb5]">
                        <span className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedExtras.includes(extra.name)} onChange={() => toggleExtra(extra.name)} className="size-4 accent-[#171a16]" />
                          <span className="text-sm font-medium text-[#31362f]">{extra.name}</span>
                        </span>
                        <span className="text-xs font-semibold text-[#6b7168]">+{extra.price.toLocaleString('tr-TR')} TL</span>
                      </label>
                    ))}
                  </div>
                </OptionSection>
              ) : null}

              <OptionSection number={product.extraOptions?.length ? '06' : '04'} title="Tasarım dosyası">
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setDesignChoice('ready')} className={`rounded-[12px] border p-3 text-left transition ${designChoice === 'ready' ? 'border-[#579d32] bg-[#f0f8eb]' : 'border-[#e5e8e2] hover:border-[#b9beb5]'}`}>
                    <FileUp className="mb-2 size-4 text-[#579d32]" /><p className="text-sm font-semibold text-[#171a16]">Dosyam hazır</p><p className="mt-1 text-xs leading-5 text-[#747a71]">Siparişten sonra PDF dosyanızı yükleyin.</p>
                  </button>
                  <button type="button" onClick={() => setDesignChoice('support')} className={`rounded-[12px] border p-3 text-left transition ${designChoice === 'support' ? 'border-[#579d32] bg-[#f0f8eb]' : 'border-[#e5e8e2] hover:border-[#b9beb5]'}`}>
                    <Sparkles className="mb-2 size-4 text-[#579d32]" /><p className="text-sm font-semibold text-[#171a16]">Tasarım desteği</p><p className="mt-1 text-xs leading-5 text-[#747a71]">Dosya hazırlama için destek talep edin.</p>
                  </button>
                </div>
                {designChoice === 'ready' && <Link href={`/tasarim/${product.category}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#579d32] hover:underline">Dosya yükleme merkezini aç <ArrowRight className="size-3" /></Link>}
              </OptionSection>
            </div>

            <div className="mt-4 border-t border-[#e7e9e5] pt-4 lg:shrink-0">
              <div className="mb-3 flex items-end justify-between gap-4">
                <div><p className="text-xs font-medium text-[#858b82]">Seçimlerinize göre toplam</p><p className="mt-1 text-[26px] font-semibold tracking-[-.045em] text-[#171a16]">{price.toLocaleString('tr-TR')} TL</p></div>
                <div className="text-right"><p className="text-xs text-[#858b82]">{quantity.toLocaleString('tr-TR')} adet</p><p className="mt-1 text-xs font-semibold text-[#596057]">≈ {unitPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL / adet</p></div>
              </div>
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <button type="button" onClick={handleAddAndContinue} className="flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[#171a16] px-6 text-sm font-semibold text-white transition hover:bg-[#2b3029]">
                  <ShoppingBag className="size-4" /> Sepete ekle · {price.toLocaleString('tr-TR')} TL
                </button>
                <button type="button" onClick={handleAddToCart} className="h-11 rounded-[10px] border border-[#dfe2dc] px-5 text-sm font-semibold text-[#31362f] hover:bg-[#f6f7f4]">Sepette tut</button>
              </div>
              <button type="button" onClick={handleWhatsApp} className="mt-1.5 flex w-full items-center justify-center gap-2 py-2 text-xs font-semibold text-[#676e64] hover:text-[#171a16]"><MessageCircle className="size-4" /> Ürünle ilgili soru sor</button>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#e9ebe7] bg-[#fafaf8]">
        <div className="site-container py-9 sm:py-11">
          <div className="mb-8 flex gap-6 overflow-x-auto border-b border-[#e1e4de]">
            {[
              ['details', 'Ürün bilgileri'],
              ['reviews', 'Değerlendirmeler'],
              ['shipping', 'Üretim & teslimat'],
            ].map(([key, label]) => (
              <button key={key} type="button" onClick={() => setActiveTab(key as typeof activeTab)} className={`whitespace-nowrap border-b-2 pb-4 text-sm font-semibold transition ${activeTab === key ? 'border-[#171a16] text-[#171a16]' : 'border-transparent text-[#82887f]'}`}>{label}</button>
            ))}
          </div>

          {activeTab === 'details' && (
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
              <div><p className="site-kicker mb-4">Teknik özet</p><h2 className="site-heading text-[clamp(1.8rem,3.2vw,3rem)]">Baskıya karar vermek için gereken bilgiler.</h2></div>
              <div className="grid gap-px overflow-hidden rounded-[18px] border border-[#e1e4de] bg-[#e1e4de] sm:grid-cols-2">
                {[
                  ['Minimum sipariş', `${product.minQuantity?.toLocaleString('tr-TR') || '-'} adet`],
                  ['Ölçüler', product.sizes?.join(' · ') || 'Ürüne göre'],
                  ['Malzeme', product.materials?.join(' · ') || 'Ürüne göre'],
                  ['Baskı / özellik', product.features?.join(' · ') || 'Standart üretim'],
                ].map(([label, value]) => <div key={label} className="bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[.12em] text-[#8a9087]">{label}</p><p className="mt-3 text-sm leading-6 text-[#31362f]">{value}</p></div>)}
              </div>
            </div>
          )}
          {activeTab === 'reviews' && <ProductReviews productId={product.id} />}
          {activeTab === 'shipping' && (
            <div className="grid gap-4 md:grid-cols-3">
              {[
                [Clock3, 'Üretim', 'Ürün seçiminize göre hazırlık süresi sipariş akışında netleştirilir.'],
                [Truck, 'Gönderim', 'Hazırlanan sipariş kargoya verildiğinde takip bilgisi paylaşılır.'],
                [ShieldCheck, 'Kontrol', 'Baskı dosyası ve sipariş bilgileri üretim öncesinde eşleştirilir.'],
              ].map(([Icon, title, text]) => {
                const InfoIcon = Icon as typeof Truck
                return <div key={String(title)} className="rounded-[18px] border border-[#e1e4de] bg-white p-6"><InfoIcon className="mb-8 size-5 text-[#579d32]" /><h3 className="text-base font-semibold text-[#171a16]">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-[#737970]">{String(text)}</p></div>
              })}
            </div>
          )}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/96 p-3 backdrop-blur lg:hidden">
        <div className="site-container flex items-center gap-3 px-0">
          <div className="min-w-0 flex-1"><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#8a9087]">Toplam</p><p className="text-lg font-semibold text-[#171a16]">{price.toLocaleString('tr-TR')} TL</p></div>
          <button type="button" onClick={handleAddAndContinue} className="flex h-12 items-center gap-2 rounded-[12px] bg-[#171a16] px-5 text-sm font-semibold text-white"><ShoppingBag className="size-4" /> Sepete ekle</button>
        </div>
      </div>
    </main>
  )
}

function OptionSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-2 flex items-center gap-2"><span className="flex size-5 items-center justify-center rounded-full bg-[#f0f1ed] text-[10px] font-bold text-[#646a61]">{number}</span><h2 className="text-sm font-semibold text-[#171a16]">{title}</h2></div>
      {children}
    </section>
  )
}

function OptionButton({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) {
  return <button type="button" onClick={onClick} className={`rounded-[11px] border px-3 py-2.5 text-left text-sm font-semibold transition ${selected ? 'border-[#171a16] bg-[#171a16] text-white' : 'border-[#e5e8e2] bg-white text-[#31362f] hover:border-[#b9beb5]'}`}>{label}</button>
}
