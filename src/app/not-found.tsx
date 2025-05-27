import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Search, ArrowLeft, FileQuestion } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* 404 İkonu */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#59af05]/10 rounded-full mb-6">
              <FileQuestion className="w-12 h-12 text-[#59af05]" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Sayfa Bulunamadı
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Ana sayfaya dönebilir veya arama yapabilirsiniz.
            </p>
          </div>

          {/* Eylem Butonları */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="bg-[#59af05] hover:bg-[#4a9321] flex items-center gap-2">
                <Home className="w-5 h-5" />
                Ana Sayfaya Dön
              </Button>
            </Link>
            <Link href="/tum-urunler">
              <Button variant="outline" size="lg" className="border-[#59af05] text-[#59af05] hover:bg-[#59af05]/5 flex items-center gap-2">
                <Search className="w-5 h-5" />
                Ürünleri İncele
              </Button>
            </Link>
          </div>

          {/* Popüler Sayfalar */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Popüler Sayfalarımız
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/cok-satanlar" className="text-[#59af05] hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  Çok Satan Ürünler
                </Link>
                <Link href="/kurumsal" className="text-[#59af05] hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  Kurumsal Ürünler
                </Link>
                <Link href="/promosyon" className="text-[#59af05] hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  Promosyon Ürünleri
                </Link>
                <Link href="/iletisim" className="text-[#59af05] hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  İletişim
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
} 