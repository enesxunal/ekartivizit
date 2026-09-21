import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { PRODUCTS } from '@/data/products'

export default function HeroSection() {
  const products = PRODUCTS.filter((product) => !product.id.startsWith('test-')).slice(0, 4)

  return (
    <section className="border-b border-[#e7eae4] bg-white">
      <div className="site-container grid gap-8 py-8 sm:py-10 lg:grid-cols-[.92fr_1.08fr] lg:items-start lg:gap-12 lg:py-10">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-[#edf7e7] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.12em] text-[#4e7538]">Online baskı sipariş platformu</span>
          <h1 className="mt-5 text-[clamp(2.35rem,10vw,4.2rem)] font-semibold leading-[.9] tracking-[-.065em] text-[#171a16]">Baskı ihtiyacın ne?</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#666d63] sm:text-lg">Kartvizitten broşüre, etiketten promosyon ürünlerine kadar baskı ürünlerini seçin, özelliklerini belirleyin ve online sipariş edin.</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link href="/tum-urunler" className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[#171a16] px-6 text-sm font-semibold text-white">Ürünleri incele <ArrowRight className="size-4" /></Link>
            <Link href="/tasarim" className="inline-flex h-12 items-center justify-center rounded-[12px] border border-[#dfe3dc] bg-white px-6 text-sm font-semibold text-[#343a32]">Hızlı Tasarım</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#6f756c]">{['KDV dahil fiyatlar','Hızlı tasarım','Sipariş takibi'].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-3.5 text-[#579d32]" />{item}</span>)}</div>

          <div className="mt-8 hidden grid-cols-3 gap-2 lg:grid">
            {[
              ['14', 'baskı ürünü'],
              ['Türkiye', 'geneli gönderim'],
              ['Online', 'sipariş takibi'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[12px] border border-[#e4e7e1] bg-[#fafbf9] px-3 py-3">
                <p className="text-sm font-semibold text-[#171a16]">{value}</p>
                <p className="mt-0.5 text-[10px] text-[#697067]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-[20px] bg-[#f3f4f1] p-3 sm:gap-4 sm:rounded-[24px] sm:p-4">
          {products.map((product) => (
            <Link key={product.id} href={product.href} className="group overflow-hidden rounded-[14px] border border-[#e3e6e0] bg-white sm:rounded-[16px]">
              <div className="relative h-[116px] sm:h-[190px] lg:h-[220px]"><Image src={product.image} alt={product.name} fill sizes="(max-width:1024px) 50vw, 28vw" className="object-contain p-3 transition duration-300 group-hover:scale-[1.03] sm:p-5 lg:p-6" /></div>
              <div className="border-t border-[#eceee9] bg-white px-3 py-2.5 sm:px-4 sm:py-3"><p className="truncate text-[13px] font-semibold text-[#171a16] sm:text-sm">{product.name}</p><p className="mt-0.5 text-[11px] text-[#5f665d]">{product.price ? `${product.price.min.toLocaleString('tr-TR')} TL'den` : 'İncele'}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
