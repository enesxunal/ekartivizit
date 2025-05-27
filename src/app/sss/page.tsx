'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface FAQ {
  id: number
  category: string
  question: string
  answer: string
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openItems, setOpenItems] = useState<number[]>([])

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'siparis', name: 'Sipariş Süreci' },
    { id: 'uretim', name: 'Üretim & Kalite' },
    { id: 'teslimat', name: 'Teslimat & Kargo' },
    { id: 'odeme', name: 'Ödeme & Fatura' },
    { id: 'tasarim', name: 'Tasarım & Dosya' },
    { id: 'genel', name: 'Genel Sorular' }
  ]

  const faqs: FAQ[] = [
    {
      id: 1,
      category: 'siparis',
      question: 'Nasıl sipariş verebilirim?',
      answer: 'Sitemizden istediğiniz ürünü seçin, özelliklerini belirleyin ve sepete ekleyin. Sepet sayfasından WhatsApp ile sipariş verebilir veya online ödeme yapabilirsiniz.'
    },
    {
      id: 2,
      category: 'siparis',
      question: 'Minimum sipariş adedi var mı?',
      answer: 'Evet, ürünlerimizin minimum sipariş adetleri vardır. Kartvizit için 1000 adet, broşür için 1000 adet minimum sipariş alıyoruz.'
    },
    {
      id: 3,
      category: 'uretim',
      question: 'Üretim süresi ne kadar?',
      answer: 'Standart ürünler için 2-3 iş günü, özel tasarım gerektiren ürünler için 3-5 iş günü üretim süresi bulunmaktadır.'
    },
    {
      id: 4,
      category: 'uretim',
      question: 'Hangi kağıt türlerini kullanıyorsunuz?',
      answer: 'Kartvizit için 350-700 gram kuşe kağıt, broşür için 115-130 gram kuşe kağıt kullanıyoruz. Tüm kağıtlarımız birinci kalite ve FSC sertifikalıdır.'
    },
    {
      id: 5,
      category: 'teslimat',
      question: 'Kargo ücreti ne kadar?',
      answer: '500₺ ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişler için kargo ücreti 25₺\'dir.'
    },
    {
      id: 6,
      category: 'teslimat',
      question: 'Hangi şehirlere kargo yapıyorsunuz?',
      answer: 'Türkiye\'nin tüm illerine kargo yapıyoruz. Aras Kargo ve Yurtiçi Kargo ile güvenli teslimat sağlıyoruz.'
    },
    {
      id: 7,
      category: 'odeme',
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Online ödemeler için güvenli SSL sertifikası kullanıyoruz.'
    },
    {
      id: 8,
      category: 'odeme',
      question: 'Fatura kesiliyor mu?',
      answer: 'Evet, tüm siparişler için e-fatura veya kağıt fatura kesiyoruz. Kurumsal müşterilerimiz için özel fatura düzenlemeleri yapabiliyoruz.'
    },
    {
      id: 9,
      category: 'tasarim',
      question: 'Tasarım hizmeti veriyor musunuz?',
      answer: 'Evet, profesyonel tasarım ekibimiz ile ücretsiz tasarım hizmeti sunuyoruz. Ayrıca hazır şablonlarımızı da kullanabilirsiniz.'
    },
    {
      id: 10,
      category: 'tasarim',
      question: 'Hangi dosya formatlarını kabul ediyorsunuz?',
      answer: 'PDF, AI, PSD, JPG, PNG formatlarını kabul ediyoruz. En iyi sonuç için PDF formatını tercih ediyoruz. Dosya çözünürlüğü minimum 300 DPI olmalıdır.'
    },
    {
      id: 11,
      category: 'genel',
      question: 'Numune gönderebilir misiniz?',
      answer: 'Evet, ürün kalitemizi görmek için numune gönderebiliriz. Numune ücreti sonraki siparişinizden düşülür.'
    },
    {
      id: 12,
      category: 'genel',
      question: 'Müşteri hizmetlerine nasıl ulaşabilirim?',
      answer: 'WhatsApp, telefon, e-posta veya canlı destek ile 7/24 müşteri hizmetlerimize ulaşabilirsiniz. Hızlı yanıt için WhatsApp\'ı tercih edebilirsiniz.'
    },
    {
      id: 13,
      category: 'siparis',
      question: 'Siparişimi iptal edebilir miyim?',
      answer: 'Üretim başlamadan önce siparişinizi iptal edebilirsiniz. Üretim başladıktan sonra iptal işlemi mümkün değildir.'
    },
    {
      id: 14,
      category: 'uretim',
      question: 'Renk uyumu garanti ediliyor mu?',
      answer: 'Evet, Pantone renk kodları ile %95 renk uyumu garantisi veriyoruz. Dijital baskıda CMYK renk sistemi kullanıyoruz.'
    },
    {
      id: 15,
      category: 'teslimat',
      question: 'Acil siparişler için hızlı teslimat var mı?',
      answer: 'Evet, acil siparişler için aynı gün veya ertesi gün teslimat seçeneklerimiz bulunmaktadır. Ek ücret karşılığında hızlı üretim yapabiliyoruz.'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#59af05] to-[#4a9321] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sık Sorulan Sorular
            </h1>
            <p className="text-xl mb-8">
              Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz. 
              Aradığınızı bulamazsanız bizimle iletişime geçin.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Sorularda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-[#59af05]">
                  Kategoriler
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        selectedCategory === category.id 
                          ? 'bg-[#59af05] hover:bg-[#4a9321]' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-[#59af05]">
                  Hala Sorunuz Var mı?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Aradığınız cevabı bulamadıysanız bizimle iletişime geçin.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Telefon
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    E-posta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600">
                  &quot;{searchQuery}&quot; için {filteredFAQs.length} sonuç bulundu
                </p>
              </div>
            )}

            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {openItems.includes(faq.id) ? (
                          <ChevronUp className="h-5 w-5 text-[#59af05] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    
                    {openItems.includes(faq.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery 
                    ? 'Aradığınız kriterlere uygun soru bulunamadı.'
                    : 'Bu kategoride henüz soru bulunmuyor.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hızlı İletişim
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sorularınız için en hızlı yanıtı almak için aşağıdaki kanalları kullanabilirsiniz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#59af05] text-white rounded-full mb-4">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  WhatsApp
                </h3>
                <p className="text-gray-600 mb-4">
                  En hızlı yanıt için WhatsApp&apos;tan yazın
                </p>
                <Button className="bg-[#59af05] hover:bg-[#4a9321]">
                  Mesaj Gönder
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#59af05] text-white rounded-full mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Telefon
                </h3>
                <p className="text-gray-600 mb-4">
                  0 850 840 30 11
                </p>
                <Button variant="outline">
                  Hemen Ara
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#59af05] text-white rounded-full mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  E-posta
                </h3>
                <p className="text-gray-600 mb-4">
                  info@ekartvizit.co
                </p>
                <Button variant="outline">
                  E-posta Gönder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
} 