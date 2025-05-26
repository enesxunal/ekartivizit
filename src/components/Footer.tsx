import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">Kartvizit</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Profesyonel baskı çözümleri ile işinizi bir adım öne taşıyın. 
              Kartvizit, broşür, magnet ve daha fazlası için güvenilir adresiniz.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">+90 (212) 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">info@ekartvizit.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Ürünler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ürünler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/kartvizit" className="text-gray-300 hover:text-green-400 transition-colors">
                  Kartvizit
                </Link>
              </li>
              <li>
                <Link href="/brosur" className="text-gray-300 hover:text-green-400 transition-colors">
                  Broşür
                </Link>
              </li>
              <li>
                <Link href="/magnet" className="text-gray-300 hover:text-green-400 transition-colors">
                  Magnet
                </Link>
              </li>
              <li>
                <Link href="/etiket" className="text-gray-300 hover:text-green-400 transition-colors">
                  Etiket
                </Link>
              </li>
              <li>
                <Link href="/promosyon" className="text-gray-300 hover:text-green-400 transition-colors">
                  Promosyon
                </Link>
              </li>
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-green-400 transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-green-400 transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/sss" className="text-gray-300 hover:text-green-400 transition-colors">
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/gizlilik" className="text-gray-300 hover:text-green-400 transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kullanim-kosullari" className="text-gray-300 hover:text-green-400 transition-colors">
                  Kullanım Koşulları
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 E-Kartvizit. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
} 