import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { getPopularProducts } from '@/data/products'

export default function PopularProducts() {
  const products = getPopularProducts()

  const formatPrice = (price: { min: number; max: number }) => {
    if (price.min === price.max) {
      return `${price.min}₺`
    }
    return `${price.min}₺ - ${price.max}₺`
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popüler Ürünlerimiz
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
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
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  {product.price && (
                    <div className="text-sm text-[#59af05] font-semibold">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Link href={product.href} className="w-full">
                  <Button className="w-full bg-[#59af05] hover:bg-[#4a9321]">
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