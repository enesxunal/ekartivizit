'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Scale, CreditCard, Truck, AlertTriangle, Users } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfServicePage() {
  const sections = [
    {
      id: 'genel-hukumler',
      title: 'Genel Hükümler',
      icon: FileText,
      content: `
        Bu kullanım şartları, E-Kartvizit web sitesi ve hizmetlerinin kullanımına ilişkin koşulları belirler:
        
        • Bu şartlar, sitemizi kullanan tüm ziyaretçiler ve müşteriler için geçerlidir
        • Sitemizi kullanarak bu şartları kabul etmiş sayılırsınız
        • Şartlarda yapılacak değişiklikler web sitesinde yayınlanır
        • Değişiklikler yayınlandığı tarihten itibaren geçerlidir
        • Sürekli güncel şartları takip etmek kullanıcının sorumluluğundadır
        
        Bu şartları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.
      `
    },
    {
      id: 'hizmet-tanimi',
      title: 'Hizmet Tanımı',
      icon: Users,
      content: `
        E-Kartvizit olarak sunduğumuz hizmetler:
        
        • Kartvizit, broşür, magnet ve diğer baskı ürünleri tasarımı ve üretimi
        • Online sipariş alma ve işleme hizmetleri
        • Müşteri hizmetleri ve teknik destek
        • Tasarım danışmanlığı ve önerileri
        • Kargo ve teslimat hizmetleri
        • Ödeme işlemleri ve faturalama
        
        Hizmetlerimiz sürekli geliştirilmekte ve yeni özellikler eklenebilmektedir.
      `
    },
    {
      id: 'siparis-kosullari',
      title: 'Sipariş Koşulları',
      icon: CreditCard,
      content: `
        Sipariş verme ve ödeme koşulları:
        
        • Minimum sipariş adetleri ürün sayfalarında belirtilmiştir
        • Fiyatlar KDV dahildir ve Türk Lirası üzerinden gösterilir
        • Ödeme kredi kartı, banka kartı, havale/EFT veya kapıda ödeme ile yapılabilir
        • Sipariş onayı sonrası üretim süreci başlar
        • Üretim başladıktan sonra sipariş iptali mümkün değildir
        • Özel tasarım gerektiren siparişlerde ek süre gerekebilir
        • Stok durumu ve üretim kapasitesine göre teslimat süreleri değişebilir
        
        Sipariş vermek sözleşme akdetmek anlamına gelir.
      `
    },
    {
      id: 'teslimat-iade',
      title: 'Teslimat ve İade',
      icon: Truck,
      content: `
        Teslimat ve iade koşullarımız:
        
        • Türkiye geneline kargo ile teslimat yapılır
        • 500₺ ve üzeri siparişlerde kargo ücretsizdir
        • Teslimat süresi 2-5 iş günüdür (bölgeye göre değişir)
        • Ürünler teslim alındığında kontrol edilmelidir
        • Hasarlı veya hatalı ürünler 7 gün içinde bildirilmelidir
        • Müşteri kaynaklı hatalar (yanlış bilgi verme) iade kapsamında değildir
        • Özel üretim ürünlerde iade kabul edilmez
        • İade kabul edilen durumlarda kargo ücreti tarafımızca karşılanır
        
        Teslim alınan ürünlerin kontrolü müşterinin sorumluluğundadır.
      `
    },
    {
      id: 'fikri-mulkiyet',
      title: 'Fikri Mülkiyet',
      icon: Scale,
      content: `
        Fikri mülkiyet hakları ve sorumluluklar:
        
        • Müşteriler, gönderdiği tasarımların yasal haklarına sahip olduğunu beyan eder
        • Telif hakkı ihlali durumunda sorumluluk müşteriye aittir
        • E-Kartvizit, üçüncü taraf haklarını ihlal eden içerikleri reddetme hakkını saklı tutar
        • Web sitemizdeki tüm içerik E-Kartvizit'in mülkiyetindedir
        • Müşteri tasarımları sadece sipariş kapsamında kullanılır
        • Tasarımlar müşterinin izni olmadan başka amaçlarla kullanılmaz
        • Hazır şablonlar E-Kartvizit tarafından lisanslanmıştır
        
        Fikri mülkiyet ihlallerinden doğan zararlardan müşteri sorumludur.
      `
    },
    {
      id: 'sorumluluk-siniri',
      title: 'Sorumluluk Sınırı',
      icon: AlertTriangle,
      content: `
        Sorumluluk sınırları ve istisnalar:
        
        • E-Kartvizit, hizmet kesintilerinden sorumlu değildir
        • Teknik arızalar ve bakım çalışmaları önceden bildirilir
        • Müşteri bilgilerinin yanlış verilmesinden doğan zararlar müşteriye aittir
        • Doğal afet, savaş gibi mücbir sebeplerden sorumlu değiliz
        • Üçüncü taraf hizmetlerdeki (kargo, banka) sorunlardan sorumlu değiliz
        • Maksimum sorumluluk tutarı sipariş bedelini geçemez
        • Dolaylı zararlardan sorumlu değiliz
        • Müşterinin ticari kayıplarından sorumlu değiliz
        
        Sorumluluk sınırları yasal düzenlemeler çerçevesindedir.
      `
    }
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#59af05] to-[#4a9321] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Scale className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kullanım Şartları
            </h1>
            <p className="text-xl mb-8">
              E-Kartvizit hizmetlerini kullanırken uymanız gereken şartlar ve koşullar. 
              Bu şartları dikkatlice okuyup anladığınızdan emin olun.
            </p>
            <p className="text-sm opacity-90">
              Son güncelleme: 15 Ocak 2024
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:bg-[#59af05] hover:text-white"
              >
                <section.icon className="h-4 w-4 mr-2" />
                {section.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#59af05] flex items-center">
                <FileText className="h-6 w-6 mr-3" />
                Giriş
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Bu Kullanım Şartları (&quot;Şartlar&quot;), E-Kartvizit (&quot;Şirket&quot;, &quot;biz&quot;, &quot;bizim&quot;) tarafından 
                işletilen web sitesi ve sunulan hizmetlerin kullanımını düzenler. Web sitemizi 
                ziyaret ederek veya hizmetlerimizi kullanarak, bu Şartları kabul etmiş sayılırsınız. 
                Bu Şartları kabul etmiyorsanız, lütfen web sitemizi kullanmayın.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Bu Şartlar, Türkiye Cumhuriyeti yasalarına tabidir ve Ankara mahkemeleri yetkilidir.
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          {sections.map((section) => (
            <Card key={section.id} id={section.id}>
              <CardHeader>
                <CardTitle className="text-2xl text-[#59af05] flex items-center">
                  <section.icon className="h-6 w-6 mr-3" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  {section.content.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return <br key={index} />
                    if (paragraph.trim().startsWith('•')) {
                      return (
                        <li key={index} className="text-gray-700 mb-2">
                          {paragraph.trim().substring(1).trim()}
                        </li>
                      )
                    }
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph.trim()}
                      </p>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#59af05]">
                Kullanıcı Sorumlulukları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Web sitemizi ve hizmetlerimizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:
                </p>
                
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-red-800 mb-3">Yasak Faaliyetler:</h4>
                  <ul className="text-red-700 space-y-1">
                    <li>• Telif hakkı ihlali yapan içerik gönderme</li>
                    <li>• Yanıltıcı veya yanlış bilgi verme</li>
                    <li>• Sistemi zarar verici şekilde kullanma</li>
                    <li>• Başkalarının haklarını ihlal etme</li>
                    <li>• Yasadışı içerik paylaşma</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Beklenen Davranışlar:</h4>
                  <ul className="text-green-700 space-y-1">
                    <li>• Doğru ve güncel bilgi sağlama</li>
                    <li>• Diğer kullanıcılara saygılı davranma</li>
                    <li>• Sistem güvenliğini koruma</li>
                    <li>• Yasal düzenlemelere uyma</li>
                    <li>• Hizmet şartlarına uygun kullanım</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#59af05]">
                Uyuşmazlık Çözümü
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hizmetlerimizle ilgili herhangi bir uyuşmazlık durumunda:
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-[#59af05] pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">1. Dostane Çözüm</h4>
                    <p className="text-gray-700 text-sm">
                      Öncelikle müşteri hizmetlerimizle iletişime geçerek sorunu çözmeye çalışırız.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#59af05] pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">2. Arabuluculuk</h4>
                    <p className="text-gray-700 text-sm">
                      Gerekirse bağımsız arabulucu ile çözüm aranabilir.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#59af05] pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">3. Yasal Süreç</h4>
                    <p className="text-gray-700 text-sm">
                      Son çare olarak Ankara mahkemelerinde dava açılabilir.
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mt-6">
                  Tüketici hakları saklıdır. Tüketici sorunları için Tüketici Hakem Heyetleri 
                  ve Tüketici Mahkemelerine başvuru hakkınız bulunmaktadır.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#59af05]">
                İletişim Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p><strong>Şirket:</strong> E-Kartvizit</p>
                      <p><strong>E-posta:</strong> info@ekartvizit.co</p>
                      <p><strong>Telefon:</strong> 0 850 840 30 11</p>
                    </div>
                    <div>
                      <p><strong>Adres:</strong> Mustafa Kemal Mah. 2139 Sk. 15/5 Çankaya/Ankara</p>
                      <p><strong>Çalışma Saatleri:</strong> Pazartesi-Cuma 09:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#59af05]">
                Son Hükümler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Bu Kullanım Şartları, taraflar arasındaki tüm anlaşmayı oluşturur ve 
                  önceki tüm sözlü veya yazılı anlaşmaların yerini alır. Şartların herhangi 
                  bir bölümünün geçersiz sayılması, diğer bölümlerin geçerliliğini etkilemez.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  E-Kartvizit, bu şartları önceden haber vermeksizin değiştirme hakkını saklı tutar. 
                  Değişiklikler web sitesinde yayınlandığı tarihten itibaren yürürlüğe girer.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sorularınız mı Var?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Kullanım şartlarımız hakkında herhangi bir sorunuz varsa, 
            müşteri hizmetlerimizle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#59af05] hover:bg-[#4a9321]">
              İletişime Geç
            </Button>
            <Button size="lg" variant="outline">
              SSS Sayfası
            </Button>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
} 