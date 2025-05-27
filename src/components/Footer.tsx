import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Instagram, Package, User, CreditCard, Truck, FileText } from 'lucide-react'
import { CATEGORIES } from '@/data/products'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="E-Kartvizit Logo"
                width={120}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Profesyonel baskı çözümleri ile işinizi bir adım öne taşıyın. 
              Kartvizit, broşür, magnet ve daha fazlası için güvenilir adresiniz.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#59af05] flex-shrink-0" />
                <span className="text-gray-300">0 850 840 30 11</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#59af05] flex-shrink-0" />
                <span className="text-gray-300">info@ekartvizit.co</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#59af05] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Mustafa Kemal Mah. 2139 Sk. 15/5 Çankaya/Ankara</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-4 w-4 text-[#59af05] flex-shrink-0" />
                <a href="https://instagram.com/e.kartvizit" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#59af05] transition-colors">
                  @e.kartvizit
                </a>
              </div>
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Package className="h-5 w-5 text-[#59af05] mr-2" />
              Kategoriler
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link href={category.href} className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tum-urunler" className="text-[#59af05] hover:text-white transition-colors text-sm font-medium">
                  Tümünü Gör →
                </Link>
              </li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 text-[#59af05] mr-2" />
              Müşteri Hizmetleri
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/siparis-takip" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Sipariş Takip
                </Link>
              </li>
              <li>
                <Link href="/hesabim" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Hesabım
                </Link>
              </li>
              <li>
                <Link href="/sss" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/iade-degisim" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  İade & Değişim
                </Link>
              </li>
              <li>
                <Link href="/kargo-bilgileri" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  Kargo Bilgileri
                </Link>
              </li>
              <li>
                <Link href="/odeme-secenekleri" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Ödeme Seçenekleri
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 text-[#59af05] mr-2" />
              Kurumsal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kariyer" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link href="/basinda-biz" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  Basında Biz
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kullanim-sartlari" className="text-gray-300 hover:text-[#59af05] transition-colors text-sm">
                  Kullanım Şartları
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 E-Kartvizit. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AX</span>
                </div>
              </div>
              <span className="text-gray-400 text-sm">Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 