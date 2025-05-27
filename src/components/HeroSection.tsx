import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Sol taraf - Metin içeriği */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Profesyonel Baskı{' '}
                <span className="text-[#59af05]">Çözüm Merkezi</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Kartvizit, broşür, magnet ve daha fazlası için online tasarım 
                ve baskı hizmetleri. Ücretsiz tasarım desteği ve hızlı teslimat 
                garantisi ile yanınızdayız.
              </p>
            </div>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-[#59af05] hover:bg-[#4a9321] text-white px-6 py-2.5">
                Hemen Başla
              </Button>
              <Button variant="outline" size="lg" className="px-6 py-2.5">
                Nasıl Çalışır?
              </Button>
            </div>

            {/* Özellikler */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
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
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
            <Link href="/urun/kartvizit" className="block">
              <Card className="p-3 sm:p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group border-0 rounded-xl cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
                  <Image
                    src="/images/Kartvizit.png"
                    alt="Kartvizit"
                    width={120}
                    height={90}
                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 text-center leading-tight">Profesyonel Kartvizit</h3>
                <p className="text-xs text-gray-500 text-center mt-1">800₺&apos;den başlayan fiyatlarla</p>
              </Card>
            </Link>

            <Link href="/urun/brosur" className="block">
              <Card className="p-3 sm:p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group border-0 rounded-xl cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
                  <Image
                    src="/images/Brosur-Ekonomik.png"
                    alt="Broşür"
                    width={120}
                    height={90}
                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 text-center leading-tight">Reklam Broşürü</h3>
                <p className="text-xs text-gray-500 text-center mt-1">1200₺&apos;den başlayan fiyatlarla</p>
              </Card>
            </Link>

            <Link href="/urun/magnet" className="block">
              <Card className="p-3 sm:p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group border-0 rounded-xl cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
                  <Image
                    src="/images/Magnet-800x800.png"
                    alt="Magnet"
                    width={120}
                    height={90}
                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 text-center leading-tight">Buzdolabı Magneti</h3>
                <p className="text-xs text-gray-500 text-center mt-1">1200₺&apos;den başlayan fiyatlarla</p>
              </Card>
            </Link>

            <Link href="/urun/etiket" className="block">
              <Card className="p-3 sm:p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group border-0 rounded-xl cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
                  <Image
                    src="/images/Sticker.png"
                    alt="Etiket"
                    width={120}
                    height={90}
                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 text-center leading-tight">Özel Etiket</h3>
                <p className="text-xs text-gray-500 text-center mt-1">600₺&apos;den başlayan fiyatlarla</p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 