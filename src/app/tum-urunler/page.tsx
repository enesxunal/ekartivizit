'use client'

import { useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES, PRODUCTS } from '@/data/products'

export default function TumUrunlerPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const products = useMemo(
    () => PRODUCTS.filter((product) => !product.id.startsWith('test-') && (selectedCategory === 'all' || product.category === selectedCategory)),
    [selectedCategory],
  )

  return (
    <div className="min-h-screen bg-[#f4f4ef]">
      <Header />
      <PageHero
        eyebrow="Ürün kataloğu"
        title="Baskı ürünleri, sade bir katalogda."
        description="Kurumsal evraktan reklam materyaline ve promosyon ürünlerine kadar tüm seçenekleri tek yerde karşılaştırın."
        actionHref="/tasarim"
        actionLabel="Hızlı Tasarım"
      />

      <main className="site-container py-8 sm:py-10 lg:py-12">
        <div className="mb-6 flex flex-col gap-4 border-b border-black/8 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${selectedCategory === 'all' ? 'bg-[#171a16] text-white' : 'border border-black/10 bg-white text-[#4e554c] hover:border-black/25'}`}
            >
              Tümü
            </button>
            {CATEGORIES.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${selectedCategory === category.id ? 'bg-[#171a16] text-white' : 'border border-black/10 bg-white text-[#4e554c] hover:border-black/25'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <p className="text-sm font-medium text-[#757b72]">{products.length} ürün gösteriliyor</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </main>
      <Footer />
    </div>
  )
}
