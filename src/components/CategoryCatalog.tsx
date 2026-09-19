'use client'

import ProductCard from '@/components/ProductCard'
import PageHero from '@/components/PageHero'
import type { Product } from '@/data/products'

interface CategoryCatalogProps {
  eyebrow: string
  title: string
  description: string
  products: Product[]
}

export default function CategoryCatalog({ eyebrow, title, description, products }: CategoryCatalogProps) {
  const visibleProducts = products.filter((product) => !product.id.startsWith('test-'))

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <main className="site-container py-10 sm:py-14 lg:py-16">
        <div className="mb-8 flex items-center justify-between border-b border-black/8 pb-4">
          <p className="text-sm font-medium text-[#676e64]">{visibleProducts.length} ürün</p>
          <p className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-[#8a9087] sm:block">
            Ürünü seç · özellikleri belirle · siparişi tamamla
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </main>
    </>
  )
}
