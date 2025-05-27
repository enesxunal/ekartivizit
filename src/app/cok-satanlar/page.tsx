'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPopularProducts } from '@/data/products'
import { Star, TrendingUp } from 'lucide-react'

export default function CokSatanlarPage() {
  const popularProducts = getPopularProducts()

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
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-[#59af05] mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Çok Satan Ürünler
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Müşterilerimizin en çok tercih ettiği popüler ürünlerimizi keşfedin
          </p>
        </div>

        {/* Popüler Ürünler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularProducts.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative">
              {/* Popülerlik Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-[#59af05] text-white flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>#{index + 1} Popüler</span>
                </Badge>
              </div>
              
              <CardContent className="p-0">
                <div className="h-56 bg-white flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={250}
                    height={200}
                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  
                  {/* Özellikler */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {product.price && (
                    <div className="text-lg text-[#59af05] font-bold">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Link href={product.href} className="w-full">
                  <Button className="w-full bg-[#59af05] hover:bg-[#4a9321]">
                    Hemen İncele
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Bölümü */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Aradığınız Ürünü Bulamadınız mı?
          </h2>
          <p className="text-gray-600 mb-6">
            Tüm ürün kataloğumuzu inceleyebilir veya özel ihtiyaçlarınız için bizimle iletişime geçebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tum-urunler">
              <Button variant="outline" size="lg" className="border-[#59af05] text-[#59af05] hover:bg-[#59af05]/5">
                Tüm Ürünleri Görüntüle
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button size="lg" className="bg-[#59af05] hover:bg-[#4a9321]">
                İletişime Geç
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 