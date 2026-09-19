'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPopularProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function PopularProducts() {
  const products = getPopularProducts().filter((product) => !product.id.startsWith('test-'))

  return (
    <section className="border-t border-black/8 bg-[#fbfbf8] py-14 sm:py-18 lg:py-24">
      <div className="site-container">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#579d32]">Öne çıkanlar</p>
            <h2 className="text-[clamp(2.3rem,4.5vw,4.8rem)] font-semibold leading-[.94] tracking-[-0.06em] text-[#171a16]">Sık seçilen baskılar.</h2>
          </div>
          <Link href="/tum-urunler" className="inline-flex items-center gap-2 text-sm font-semibold text-[#171a16]">Tüm ürünler <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} eyebrow={index < 2 ? 'Popüler' : undefined} />)}
        </div>
      </div>
    </section>
  )
}
