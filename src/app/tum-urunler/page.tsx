'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PRODUCTS, CATEGORIES } from '@/data/products'

export default function TumUrunlerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === selectedCategory)

  const formatPrice = (price: { min: number; max: number }) => {
    if (price.min === price.max) {
      return `${price.min}₺`
    }
    return `${price.min}₺ - ${price.max}₺`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tüm Ürünlerimiz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İhtiyacınız olan tüm baskı ürünlerini keşfedin
          </p>
        </div>

        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#59af05] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tümü
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#59af05] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Ürün Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={150}
                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  {product.price && (
                    <div className="text-sm text-[#59af05] font-semibold">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-4 pb-4">
                <Link href={product.href} className="w-full">
                  <Button className="w-full bg-[#59af05] hover:bg-[#4a9321] text-sm">
                    İncele
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Bu kategoride ürün bulunamadı.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 