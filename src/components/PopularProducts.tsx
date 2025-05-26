import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'

export default function PopularProducts() {
  const products = [
    {
      id: 1,
      name: 'Kartvizit',
      description: 'Profesyonel kartvizit tasarımları',
      image: '/api/placeholder/300/200',
      href: '/kartvizit',
      gradient: 'from-green-400 to-green-600'
    },
    {
      id: 2,
      name: 'Broşür',
      description: 'Reklam broşürü tasarım ve baskı',
      image: '/api/placeholder/300/200',
      href: '/brosur',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 3,
      name: 'Magnet',
      description: 'Özel tasarım magnet çözümleri',
      image: '/api/placeholder/300/200',
      href: '/magnet',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      id: 4,
      name: 'Etiket',
      description: 'Özel tasarım etiket çözümleri',
      image: '/api/placeholder/300/200',
      href: '/etiket',
      gradient: 'from-orange-400 to-orange-600'
    },
    {
      id: 5,
      name: 'El İlanı',
      description: 'Etkili el ilanı tasarımları',
      image: '/api/placeholder/300/200',
      href: '/el-ilani',
      gradient: 'from-red-400 to-red-600'
    },
    {
      id: 6,
      name: 'Promosyon Kalemi',
      description: 'Kurumsal promosyon kalemleri',
      image: '/api/placeholder/300/200',
      href: '/promosyon',
      gradient: 'from-indigo-400 to-indigo-600'
    }
  ]

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
                <div className={`h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-white text-center">
                    <div className="w-20 h-16 bg-white/20 rounded-lg mb-3 mx-auto"></div>
                    <div className="text-lg font-semibold">{product.name}</div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Link href={product.href} className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Sepete Ekle
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 py-3">
            Tüm Ürünleri Görüntüle
          </Button>
        </div>
      </div>
    </section>
  )
} 