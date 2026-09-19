import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Target, 
  Award, 
  Clock, 
  Shield, 
  Truck, 
  CheckCircle,
  Star,
  Heart,
  Lightbulb,
  Handshake
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Mutlu Müşteri', icon: Users },
    { number: '50,000+', label: 'Tamamlanan Proje', icon: CheckCircle },
    { number: '5+', label: 'Yıllık Deneyim', icon: Award },
    { number: '24/7', label: 'Müşteri Desteği', icon: Clock }
  ]

  const values = [
    {
      icon: Star,
      title: 'Kalite',
      description: 'En yüksek kalite standartlarında üretim yapıyoruz.'
    },
    {
      icon: Clock,
      title: 'Hızlı Teslimat',
      description: 'Siparişlerinizi zamanında ve güvenli şekilde teslim ediyoruz.'
    },
    {
      icon: Heart,
      title: 'Müşteri Memnuniyeti',
      description: 'Müşteri memnuniyeti bizim için en önemli önceliktir.'
    },
    {
      icon: Lightbulb,
      title: 'İnovasyon',
      description: 'Sürekli gelişim ve yenilikçi çözümler sunuyoruz.'
    },
    {
      icon: Shield,
      title: 'Güvenilirlik',
      description: 'Güvenilir hizmet ve şeffaf iletişim anlayışımız var.'
    },
    {
      icon: Handshake,
      title: 'Profesyonellik',
      description: 'Her projede profesyonel yaklaşım sergiliyoruz.'
    }
  ]

  const team = [
    {
      name: 'Ahmet Yılmaz',
      position: 'Genel Müdür',
      experience: '10+ yıl deneyim',
      description: 'Baskı sektöründe uzun yıllardır faaliyet gösteren deneyimli liderimiz.'
    },
    {
      name: 'Ayşe Kaya',
      position: 'Tasarım Müdürü',
      experience: '8+ yıl deneyim',
      description: 'Yaratıcı tasarım çözümleri ile projelerinizi hayata geçiriyor.'
    },
    {
      name: 'Mehmet Demir',
      position: 'Üretim Müdürü',
      experience: '12+ yıl deneyim',
      description: 'Kaliteli üretim süreçlerinin sorumlusu ve uzmanı.'
    },
    {
      name: 'Fatma Özkan',
      position: 'Müşteri Hizmetleri',
      experience: '6+ yıl deneyim',
      description: 'Müşteri memnuniyeti için 7/24 hizmetinizdeyiz.'
    }
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      {/* Hero Section */}
      <section className="bg-[#171a16] text-white py-10 sm:py-12 lg:py-14">
        <div className="site-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-[clamp(2.25rem,4vw,4rem)] font-semibold leading-[.9] tracking-[-0.06em] mb-6">
              Hakkımızda
            </h1>
            <p className="text-base sm:text-lg leading-7 text-white/65 mb-8">
              2019 yılından bu yana baskı sektöründe kaliteli hizmet veren E-Kartvizit, 
              müşteri memnuniyetini ön planda tutarak sektörde öncü konumda yer almaktadır.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full bg-[#9fe468] text-[#171a16] hover:bg-white">
              İletişime Geç
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 sm:py-18 bg-[#fbfbf8]">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#171a16] text-white rounded-full mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[.94] tracking-[-0.05em] text-[#171a16] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#687067]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-10">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[.94] tracking-[-0.05em] text-[#171a16] mb-6">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  E-Kartvizit olarak 2019 yılında başladığımız yolculukta, baskı sektöründe 
                  kalite ve güvenilirlik standartlarını yükseltmeyi hedefledik. Küçük bir 
                  ekiple başladığımız bu serüvende, bugün binlerce müşteriye hizmet veren 
                  güçlü bir marka haline geldik.
                </p>
                <p>
                  Teknolojik gelişmeleri yakından takip ederek, geleneksel baskı yöntemlerini 
                  modern tekniklerle harmanlıyoruz. Müşterilerimizin ihtiyaçlarını anlayarak, 
                  onlara en uygun çözümleri sunmaya odaklanıyoruz.
                </p>
                <p>
                  Sürdürülebilir üretim anlayışımız ve çevre dostu yaklaşımımızla, 
                  gelecek nesillere daha yaşanabilir bir dünya bırakma sorumluluğunu 
                  taşıyoruz.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#59af05] to-[#4a9321] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Misyonumuz</h3>
              <p className="mb-6 leading-relaxed">
                Müşterilerimizin marka kimliklerini güçlendiren, kaliteli ve uygun fiyatlı 
                baskı çözümleri sunarak, onların başarısına katkıda bulunmak.
              </p>
              
              <h3 className="text-2xl font-bold mb-6">Vizyonumuz</h3>
              <p className="leading-relaxed">
                Türkiye&apos;nin en güvenilir ve tercih edilen dijital baskı platformu olmak, 
                sektörde yenilikçi çözümlerle öncülük etmek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-14 sm:py-18 bg-[#fbfbf8]">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[.94] tracking-[-0.05em] text-[#171a16] mb-4">
              Değerlerimiz
            </h2>
            <p className="text-[#687067] max-w-2xl mx-auto">
              İş yapış şeklimizi belirleyen temel değerlerimiz, her projede rehberimiz oluyor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#171a16] text-white rounded-full mb-4">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#687067]">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[.94] tracking-[-0.05em] text-[#171a16] mb-4">
              Ekibimiz
            </h2>
            <p className="text-[#687067] max-w-2xl mx-auto">
              Deneyimli ve uzman kadromuzla, projelerinizi en iyi şekilde hayata geçiriyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#59af05] to-[#4a9321] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <Badge className="bg-[#171a16] text-white mb-2">
                    {member.position}
                  </Badge>
                  <p className="text-sm text-gray-500 mb-3">
                    {member.experience}
                  </p>
                  <p className="text-[#687067] text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 sm:py-18 bg-[#fbfbf8]">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[.94] tracking-[-0.05em] text-[#171a16] mb-4">
              Neden E-Kartvizit?
            </h2>
            <p className="text-[#687067] max-w-2xl mx-auto">
              Sektördeki deneyimimiz ve kalite anlayışımızla fark yaratıyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-[#59af05]">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-[#579d32] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Güvenilir Hizmet
                </h3>
                <p className="text-[#687067]">
                  5+ yıllık deneyimimiz ve binlerce mutlu müşterimizle güvenilir hizmet sunuyoruz.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-[#59af05]">
              <CardContent className="p-6">
                <Truck className="h-12 w-12 text-[#579d32] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Hızlı Teslimat
                </h3>
                <p className="text-[#687067]">
                  Türkiye geneline hızlı ve güvenli kargo ile siparişlerinizi ulaştırıyoruz.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-[#59af05]">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-[#579d32] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Özel Çözümler
                </h3>
                <p className="text-[#687067]">
                  Her müşterinin ihtiyacına özel tasarım ve baskı çözümleri geliştiriyoruz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 bg-[#171a16] text-white">
        <div className="site-container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Projelerinizi Hayata Geçirelim
          </h2>
          <p className="text-base sm:text-lg leading-7 text-white/65 mb-8 max-w-2xl mx-auto">
            Kaliteli baskı çözümleri için bizimle iletişime geçin. 
            Uzman ekibimiz size en uygun çözümü sunmaya hazır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-full bg-[#9fe468] text-[#171a16] hover:bg-white">
              Teklif Al
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#579d32]">
              İletişim
            </Button>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
} 