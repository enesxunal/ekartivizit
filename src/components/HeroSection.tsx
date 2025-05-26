import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol taraf - Metin içeriği */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Profesyonel Baskı{' '}
                <span className="text-[#59af05]">Çözüm Merkezi</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Kartvizit, broşür, magnet ve daha fazlası için online tasarım 
                ve baskı hizmetleri. Ücretsiz tasarım desteği ve hızı teslimat 
                garantisi ile yanınızdayız.
              </p>
            </div>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#59af05] hover:bg-[#4a9321] text-white px-8 py-3">
                Hemen Başla
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Nasıl Çalışır?
              </Button>
            </div>

            {/* Özellikler */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#59af05]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#59af05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ücretsiz Tasarım Desteği</h3>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#59af05]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#59af05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Aynı gün KDV Dahil</h3>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#59af05]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#59af05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">KDV Dahil Fiyatlar</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ taraf - Ürün görselleri */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-[#59af05] to-[#4a9321] rounded-lg flex items-center justify-center mb-3">
                <div className="text-white text-center">
                  <div className="w-16 h-10 bg-white/20 rounded mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">Kartvizit</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900">Profesyonel Kartvizit</h3>
            </Card>

            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-3">
                <div className="text-white text-center">
                  <div className="w-12 h-16 bg-white/20 rounded mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">Broşür</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900">Reklam Broşürü</h3>
            </Card>

            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                <div className="text-white text-center">
                  <div className="w-12 h-12 bg-white/20 rounded mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">Magnet</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900">Buzdolabı Magneti</h3>
            </Card>

            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-3">
                <div className="text-white text-center">
                  <div className="w-10 h-14 bg-white/20 rounded mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">Etiket</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900">Özel Etiket</h3>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 