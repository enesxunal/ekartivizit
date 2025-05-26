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
                  <div className="text-[#59af05] font-bold text-lg">₺</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">KDV Dahil Fiyatlar</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ taraf - Ürün görselleri */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group border-0 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <Image
                  src="/images/Kartvizit.png"
                  alt="Kartvizit"
                  width={160}
                  height={120}
                  className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 text-center">Profesyonel Kartvizit</h3>
              <p className="text-xs text-gray-500 text-center mt-1">800₺&apos;den başlayan fiyatlarla</p>
            </Card>

            <Card className="p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group border-0 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <Image
                  src="/images/Brosur-Ekonomik.png"
                  alt="Broşür"
                  width={160}
                  height={120}
                  className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 text-center">Reklam Broşürü</h3>
              <p className="text-xs text-gray-500 text-center mt-1">1200₺&apos;den başlayan fiyatlarla</p>
            </Card>

            <Card className="p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group border-0 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <Image
                  src="/images/Magnet-800x800.png"
                  alt="Magnet"
                  width={160}
                  height={120}
                  className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 text-center">Buzdolabı Magneti</h3>
              <p className="text-xs text-gray-500 text-center mt-1">1200₺&apos;den başlayan fiyatlarla</p>
            </Card>

            <Card className="p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group border-0 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <Image
                  src="/images/Sticker.png"
                  alt="Etiket"
                  width={160}
                  height={120}
                  className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 text-center">Özel Etiket</h3>
              <p className="text-xs text-gray-500 text-center mt-1">600₺&apos;den başlayan fiyatlarla</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 