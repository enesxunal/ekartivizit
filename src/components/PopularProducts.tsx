'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPopularProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function PopularProducts() {
  const products = getPopularProducts().filter((product) => !product.id.startsWith('test-')).slice(0, 6)
  return (
    <section className="bg-white py-12 sm:py-10 lg:py-20">
      <div className="site-container">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="site-kicker mb-3">Çok satanlar</p><h2 className="text-[clamp(1.9rem,3.4vw,3.2rem)] font-semibold leading-[.94] tracking-[-.055em]">Sık sipariş edilenler.</h2></div><Link href="/tum-urunler" className="inline-flex items-center gap-2 text-sm font-semibold">Tüm ürünler <ArrowRight className="size-4" /></Link></div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </div>
    </section>
  )
}
