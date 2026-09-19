import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { PRODUCTS } from '@/data/products'

export default function HeroSection() {
  const showcase = PRODUCTS.filter((product) => !product.id.startsWith('test-')).slice(0, 4)

  return (
    <section className="overflow-hidden border-b border-black/8 bg-[#f4f4ef]">
      <div className="site-container py-8 sm:py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[32px] bg-[#171a16] p-7 text-white sm:p-10 lg:min-h-[620px] lg:p-12">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-white/75">
                <Sparkles className="size-4 text-[#9fe468]" />
                Baskı siparişini dijitalleştiren yeni nesil deneyim
              </div>
              <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,7.3rem)] font-semibold leading-[.84] tracking-[-0.075em]">
                Baskı işi artık daha net.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/62 sm:text-lg">
                Ürünü seçin, baskı seçeneklerini belirleyin, tasarımınızı yükleyin ve siparişinizi tek akışta tamamlayın.
              </p>
            </div>

            <div className="mt-12">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/tum-urunler" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#9fe468] px-6 text-sm font-semibold text-[#171a16] transition hover:bg-white">
                  Ürünleri keşfet <ArrowRight className="size-4" />
                </Link>
                <Link href="/tasarim" className="inline-flex h-12 items-center justify-center rounded-full border border-white/18 px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-[#171a16]">
                  Tasarımını yükle
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/55">
                {['KDV dahil fiyat', 'Dosya kontrolü', 'Sipariş takibi'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2"><Check className="size-3.5 text-[#9fe468]" />{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {showcase.map((product, index) => (
              <Link key={product.id} href={product.href} className={`group relative overflow-hidden rounded-[28px] border border-black/8 bg-white ${index === 0 || index === 3 ? 'sm:translate-y-5' : ''}`}>
                <div className="absolute left-4 top-4 z-10 rounded-full bg-[#f7f8f3]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4e554c]">{product.category}</div>
                <div className="relative aspect-[.92] bg-[#e9ece4]">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-5 transition duration-500 group-hover:scale-105" sizes="(max-width:1024px) 50vw, 25vw" />
                </div>
                <div className="p-4 sm:p-5">
                  <h2 className="text-sm font-semibold tracking-[-0.02em] text-[#171a16] sm:text-base">{product.name}</h2>
                  <p className="mt-1 text-xs text-[#777d74]">{product.price ? `${product.price.min.toLocaleString('tr-TR')} ₺'den` : 'Teklif al'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
