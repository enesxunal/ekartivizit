'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProductsByCategory } from '@/data/products'

export default function ReklamPage() {
  const products = getProductsByCategory('reklam')

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
            Reklam Ürünleri
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İşletmenizi tanıtmak için broşür, magnet, etiket ve daha fazlası
          </p>
        </div>

        {/* Ürün Listesi */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
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
                <div className="p-2 sm:p-3 lg:p-6">
                  <h3 className="text-xs sm:text-sm lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 sm:mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  {product.price && (
                    <div className="text-xs sm:text-sm text-[#59af05] font-semibold">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-2 sm:px-3 lg:px-6 pb-2 sm:pb-3 lg:pb-6">
                <Link href={product.href} className="w-full">
                  <Button className="w-full bg-[#59af05] hover:bg-[#4a9321] text-xs sm:text-sm py-1.5 sm:py-2">
                    İncele
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
} 