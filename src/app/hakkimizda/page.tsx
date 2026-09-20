import Link from 'next/link'
import { ArrowRight, FileCheck2, PackageCheck, ShoppingBag, Truck } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

const steps = [
  { icon: ShoppingBag, title: 'Ürünü seçin', text: 'Ölçü, malzeme ve adet seçeneklerini ürün sayfasında belirleyin.' },
  { icon: FileCheck2, title: 'Dosyanızı ekleyin', text: 'Hazır baskı dosyanızı siparişe bağlayın veya desteklenen tasarım akışını kullanın.' },
  { icon: PackageCheck, title: 'Siparişi takip edin', text: 'Siparişinizin durumunu hesabınızdan veya sipariş takip ekranından kontrol edin.' },
  { icon: Truck, title: 'Gönderim', text: 'Tamamlanan baskılar Türkiye geneli gönderim akışına alınır.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      <PageHero
        eyebrow="E-Kartvizit"
        title="Baskı siparişini daha anlaşılır bir online akışa taşıyoruz."
        description="Kartvizit, broşür, etiket, magnet, kurumsal evrak ve promosyon ürünlerini ölçü, malzeme ve adet seçenekleriyle tek platformdan sipariş edebilmeniz için çalışıyoruz."
        actionHref="/tum-urunler"
        actionLabel="Ürünleri incele"
      />

      <main>
        <section className="site-container py-8 sm:py-10 lg:py-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[18px] border border-[#e1e4de] bg-white p-5 sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#eef5e9] text-[#4f8f31]"><Icon className="size-5" /></span>
                <h2 className="mt-5 text-lg font-semibold tracking-[-.025em]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#5f665d]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#e1e4de] bg-white">
          <div className="site-container grid gap-8 py-10 sm:py-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:gap-14">
            <div>
              <p className="site-kicker mb-3">Nasıl çalışıyoruz?</p>
              <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[.96] tracking-[-.055em]">Ürün bilgisi, fiyat ve sipariş seçimini aynı yerde tutuyoruz.</h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[#5f665d]">
              <p>Ürün sayfalarında mevcut ölçü, malzeme, adet ve ek hizmet seçeneklerini açık biçimde gösteriyoruz. Seçim değiştikçe toplam fiyat da aynı sipariş akışında güncelleniyor.</p>
              <p>Baskı dosyasını üründen ayırmak yerine siparişe bağlı tutuyoruz. Böylece hangi dosyanın hangi ürün, ölçü ve adet için gönderildiği daha net kalıyor.</p>
              <p>Teknik ürün bilgilerini ve baskı dosyası hazırlama rehberlerini yalnız satış için değil, doğru ürün seçimine yardımcı olmak amacıyla da yayınlıyoruz.</p>
              <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-[#4f8f31]">Baskı rehberlerini incele <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
