import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { PRODUCTS } from '@/data/products'

export default function HeroSection() {
  const products = PRODUCTS.filter((product) => !product.id.startsWith('test-')).slice(0, 4)

  return (
    <section className="border-b border-[#e7eae4] bg-white">
      <div className="site-container grid gap-10 py-8 sm:py-10 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:py-12">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-[#edf7e7] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.12em] text-[#4e7538]">Online baskı sipariş platformu</span>
          <h1 className="mt-6 text-[clamp(2.7rem,4.4vw,4.2rem)] font-semibold leading-[.86] tracking-[-.075em] text-[#171a16]">Baskı ihtiyacın ne?</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#666d63] sm:text-lg">Kartvizitten broşüre, etiketten promosyon ürünlerine kadar baskı ürünlerini seçin, özelliklerini belirleyin ve online sipariş edin.</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link href="/tum-urunler" className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[#171a16] px-6 text-sm font-semibold text-white">Ürünleri incele <ArrowRight className="size-4" /></Link>
            <Link href="/tasarim" className="inline-flex h-12 items-center justify-center rounded-[12px] border border-[#dfe3dc] bg-white px-6 text-sm font-semibold text-[#343a32]">Tasarımını yükle</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#6f756c]">{['KDV dahil fiyatlar','Dosya yükleme','Sipariş takibi'].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-3.5 text-[#579d32]" />{item}</span>)}</div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-[24px] bg-[#f3f4f1] p-3 sm:gap-4 sm:p-4">
          {products.map((product, index) => (
            <Link key={product.id} href={product.href} className={`group relative overflow-hidden rounded-[16px] border border-[#e3e6e0] bg-white ${index === 0 ? 'sm:row-span-2' : ''}`}>
              <div className={`relative ${index === 0 ? 'h-full min-h-[270px]' : 'aspect-[4/3]'}`}><Image src={product.image} alt={product.name} fill sizes="(max-width:1024px) 50vw, 28vw" className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]" /></div>
              <div className="absolute inset-x-3 bottom-3 rounded-[12px] border border-black/5 bg-white/95 px-3 py-2.5 backdrop-blur"><p className="text-sm font-semibold text-[#171a16]">{product.name}</p><p className="mt-0.5 text-[11px] text-[#7a8077]">{product.price ? `${product.price.min.toLocaleString('tr-TR')} TL'den` : 'İncele'}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
