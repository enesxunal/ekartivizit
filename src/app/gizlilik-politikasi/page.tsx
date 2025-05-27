'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Eye, Lock, UserCheck, FileText, Clock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'veri-toplama',
      title: 'Veri Toplama',
      icon: FileText,
      content: `
        E-Kartvizit olarak, size daha iyi hizmet verebilmek için aşağıdaki kişisel verilerinizi topluyoruz:
        
        • Ad, soyad ve iletişim bilgileri
        • E-posta adresi ve telefon numarası
        • Teslimat adresi bilgileri
        • Ödeme bilgileri (güvenli şekilde şifrelenir)
        • Sipariş geçmişi ve tercihleriniz
        • Web sitesi kullanım verileri (çerezler aracılığıyla)
        
        Bu veriler yalnızca hizmet kalitemizi artırmak ve yasal yükümlülüklerimizi yerine getirmek için kullanılır.
      `
    },
    {
      id: 'veri-kullanimi',
      title: 'Veri Kullanımı',
      icon: UserCheck,
      content: `
        Topladığımız kişisel verilerinizi aşağıdaki amaçlarla kullanıyoruz:
        
        • Siparişlerinizi işleme almak ve teslimat yapmak
        • Müşteri hizmetleri desteği sağlamak
        • Ürün ve hizmet kalitemizi geliştirmek
        • Yasal yükümlülüklerimizi yerine getirmek
        • Pazarlama faaliyetleri (onayınız dahilinde)
        • Güvenlik ve dolandırıcılık önleme
        
        Verilerinizi hiçbir zaman izniniz olmadan üçüncü taraflarla paylaşmayız.
      `
    },
    {
      id: 'veri-guvenlik',
      title: 'Veri Güvenliği',
      icon: Lock,
      content: `
        Kişisel verilerinizin güvenliği bizim için önceliktir:
        
        • SSL şifreleme ile güvenli veri aktarımı
        • Güvenli sunucularda veri depolama
        • Düzenli güvenlik güncellemeleri
        • Sınırlı erişim kontrolü
        • Veri yedekleme sistemleri
        • Güvenlik ihlali durumunda acil müdahale planları
        
        Ödeme bilgileriniz PCI DSS standartlarına uygun şekilde işlenir.
      `
    },
    {
      id: 'cerezler',
      title: 'Çerez Politikası',
      icon: Eye,
      content: `
        Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanıyoruz:
        
        • Zorunlu çerezler: Site işlevselliği için gerekli
        • Analitik çerezler: Site kullanımını analiz etmek için
        • Pazarlama çerezleri: Kişiselleştirilmiş reklamlar için
        • Sosyal medya çerezleri: Sosyal medya entegrasyonu için
        
        Çerez tercihlerinizi istediğiniz zaman değiştirebilirsiniz.
      `
    },
    {
      id: 'haklariniz',
      title: 'Haklarınız',
      icon: Shield,
      content: `
        KVKK kapsamında sahip olduğunuz haklar:
        
        • Kişisel verilerinizin işlenip işlenmediğini öğrenme
        • İşlenen verileriniz hakkında bilgi talep etme
        • Verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
        • Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme
        • Verilerin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme
        • Verilerin silinmesini veya yok edilmesini isteme
        • Düzeltme, silme ve yok etme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme
        • İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme
        • Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde zararın giderilmesini talep etme
      `
    },
    {
      id: 'saklama',
      title: 'Veri Saklama',
      icon: Clock,
      content: `
        Kişisel verilerinizi aşağıdaki süreler boyunca saklıyoruz:
        
        • Müşteri bilgileri: Hesap kapatıldıktan sonra 3 yıl
        • Sipariş bilgileri: Yasal yükümlülükler gereği 10 yıl
        • İletişim kayıtları: 3 yıl
        • Web sitesi kullanım verileri: 2 yıl
        • Pazarlama onayları: Onay geri çekilene kadar
        
        Saklama süreleri sona erdiğinde verileriniz güvenli şekilde silinir.
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
              <Shield className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Gizlilik Politikası
              </h1>
              <p className="text-xl mb-8">
                Kişisel verilerinizin güvenliği ve gizliliği bizim için önceliktir. 
                Bu politika, verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.
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
                  <Shield className="h-6 w-6 mr-3" />
                  Giriş
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  E-Kartvizit (&quot;Şirket&quot;, &quot;biz&quot;, &quot;bizim&quot;) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu 
                  (&quot;KVKK&quot;) ve ilgili mevzuat hükümlerine uygun olarak kişisel verilerinizi işlemekteyiz. 
                  Bu Gizlilik Politikası, kişisel verilerinizin hangi amaçlarla işlendiği, kimlere ve hangi 
                  amaçlarla aktarılabileceği, veri işleme yöntemimiz ve hukuki sebeplerimiz ile verilerinize 
                  ilişkin haklarınızın neler olduğu hususunda sizleri bilgilendirmek amacıyla hazırlanmıştır.
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

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#59af05]">
                  İletişim ve Başvuru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki kanallardan bizimle iletişime geçebilirsiniz:
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">İletişim Bilgileri:</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>E-posta:</strong> kvkk@ekartvizit.co</p>
                      <p><strong>Telefon:</strong> 0 850 840 30 11</p>
                      <p><strong>Adres:</strong> Mustafa Kemal Mah. 2139 Sk. 15/5 Çankaya/Ankara</p>
                      <p><strong>Veri Sorumlusu:</strong> E-Kartvizit</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Başvurularınız en geç 30 gün içerisinde değerlendirilip tarafınıza yanıtlanacaktır. 
                    Başvuru sonucunda bir ücret talep edilmesi halinde, bu ücret Kişisel Verileri Koruma 
                    Kurulu tarafından belirlenen tarife üzerinden alınacaktır.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#59af05]">
                  Politika Güncellemeleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Bu Gizlilik Politikası, yasal düzenlemelerdeki değişiklikler veya şirket 
                    politikalarındaki güncellemeler nedeniyle zaman zaman revize edilebilir. 
                    Önemli değişiklikler olması durumunda, bu değişiklikler web sitemizde 
                    yayınlanacak ve kayıtlı kullanıcılarımıza e-posta yoluyla bildirilecektir.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Web sitemizi kullanmaya devam etmeniz, güncellenmiş politikayı kabul 
                    ettiğiniz anlamına gelir.
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
              Gizlilik politikamız hakkında herhangi bir sorunuz varsa, 
              bizimle iletişime geçmekten çekinmeyin.
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