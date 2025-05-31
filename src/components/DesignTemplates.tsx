import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function DesignTemplates() {
  const templates = [
    {
      id: 1,
      name: 'Modern Kartvizit',
      description: 'Minimalist ve modern tasarım',
      category: 'Kartvizit',
      href: '/tasarim/kartvizit',
      gradient: 'from-[#59af05] to-[#4a9321]'
    },
    {
      id: 2,
      name: 'Kurumsal Broşür',
      description: 'Profesyonel kurumsal tasarım',
      category: 'Broşür',
      href: '/tasarim/brosur',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 3,
      name: 'Yaratıcı Magnet',
      description: 'Özel tasarım magnet çözümleri',
      category: 'Magnet',
      href: '/tasarim/magnet',
      gradient: 'from-purple-400 to-purple-600'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Hazır Tasarım Şablonları
          </h2>
          <p className="text-lg text-gray-600">
            Canva ile özgürleştirdiğimiz profesyonel şablonlarımızı keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className={`h-32 sm:h-48 lg:h-64 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative`}>
                  <div className="text-white text-center">
                    <div className="w-12 h-10 sm:w-20 sm:h-16 lg:w-24 lg:h-20 bg-white/20 rounded-lg mb-2 sm:mb-3 lg:mb-4 mx-auto"></div>
                    <div className="text-xs sm:text-base lg:text-lg font-semibold">{template.category}</div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight">
                    {template.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  <Link href={template.href}>
                    <Button className="w-full bg-[#59af05] hover:bg-[#4a9321] text-xs sm:text-sm py-2 sm:py-2.5">
                      Şablonları Gör
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/tasarim">
            <Button variant="outline" size="lg" className="px-8 py-3">
              Tüm Şablonları Görüntüle
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 