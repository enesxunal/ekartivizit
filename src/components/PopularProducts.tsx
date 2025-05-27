'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { getPopularProducts } from '@/data/products'
import { useReviews } from '@/contexts/ReviewContext'
import { Star } from 'lucide-react'

export default function PopularProducts() {
  const products = getPopularProducts()
  const { getProductReviewStats } = useReviews()

  const formatPrice = (price: { min: number; max: number }) => {
    if (price.min === price.max) {
      return `${price.min}₺`
    }
    return `${price.min}₺ - ${price.max}₺`
  }

  const renderStars = (rating: number, reviewCount: number) => {
    if (reviewCount === 0) return null
    
    return (
      <div className="flex items-center gap-1 mb-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-600 ml-1">
          ({reviewCount})
        </span>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popüler Ürünlerimiz
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-32 sm:h-40 lg:h-48 bg-white flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={150}
                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>
                <div className="p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  {(() => {
                    const stats = getProductReviewStats(product.id)
                    return renderStars(stats.averageRating, stats.totalReviews)
                  })()}
                  {product.price && (
                    <div className="text-xs sm:text-sm text-[#59af05] font-semibold">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
                <Link href={product.href} className="w-full">
                  <Button className="w-full bg-[#59af05] hover:bg-[#4a9321] text-xs sm:text-sm py-2 sm:py-2.5">
                    İncele
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/tum-urunler">
            <Button variant="outline" size="lg" className="px-8 py-3 border-[#59af05] text-[#59af05] hover:bg-[#59af05]/5">
              Tüm Ürünleri Görüntüle
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 