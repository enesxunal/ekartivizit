import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function DesignTemplates() {
  const templates = [
    {
      id: 1,
      name: 'Modern Kartvizit',
      description: 'Minimalist ve modern tasarım',
      category: 'Kartvizit',
      gradient: 'from-[#59af05] to-[#4a9321]'
    },
    {
      id: 2,
      name: 'Kurumsal Broşür',
      description: 'Profesyonel kurumsal tasarım',
      category: 'Broşür',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 3,
      name: 'Yaratıcı Magnet',
      description: 'Özel tasarım magnet çözümleri',
      category: 'Magnet',
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className={`h-64 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative`}>
                  <div className="text-white text-center">
                    <div className="w-24 h-20 bg-white/20 rounded-lg mb-4 mx-auto"></div>
                    <div className="text-lg font-semibold">{template.category}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <Button className="w-full bg-[#59af05] hover:bg-[#4a9321]">
                    Şablonu Özelleştir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 py-3">
            Tüm Şablonları Görüntüle
          </Button>
        </div>
      </div>
    </section>
  )
} 