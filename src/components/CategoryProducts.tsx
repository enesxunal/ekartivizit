import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { CATEGORIES, getProductsByCategory } from '@/data/products'
import { Building2, Megaphone, Gift } from 'lucide-react'

const iconMap = {
  Building2,
  Megaphone,
  Gift
}

export default function CategoryProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ürün Kategorilerimiz
          </h2>
          <p className="text-lg text-gray-600">
            İhtiyacınıza uygun kategoriyi seçin ve ürünlerimizi keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => {
            const products = getProductsByCategory(category.id)
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            
            return (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#59af05]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-[#59af05]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {products.slice(0, 4).map((product) => (
                      <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-700">{product.name}</span>
                        <span className="text-xs text-[#59af05] font-medium">
                          {product.price ? `${product.price.min}₺+` : 'Fiyat Al'}
                        </span>
                      </div>
                    ))}
                    {products.length > 4 && (
                      <div className="text-center text-sm text-gray-500 pt-2">
                        +{products.length - 4} ürün daha
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="px-6 pb-6">
                  <Link href={category.href} className="w-full">
                    <Button className="w-full bg-[#59af05] hover:bg-[#4a9321]">
                      Tüm {category.name} Ürünleri
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 