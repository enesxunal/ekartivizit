import { FileCheck2, PackageCheck, SlidersHorizontal, Truck } from 'lucide-react'

const features = [
  { icon: SlidersHorizontal, title: 'Seçenekler net', text: 'Ölçü, kağıt, adet ve uygulama seçeneklerini aynı ekranda görün.' },
  { icon: FileCheck2, title: 'Dosyan kontrol altında', text: 'Baskıya gidecek dosyanı sipariş akışında yükleyin ve eşleştirin.' },
  { icon: PackageCheck, title: 'Sipariş tek yerde', text: 'Sepet, ödeme ve sipariş takibini aynı hesap üzerinden yönetin.' },
  { icon: Truck, title: 'Üretimden teslimata', text: 'Sipariş durumunu üretimden gönderime kadar takip edin.' },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f4f4ef] py-14 sm:py-18 lg:py-24">
      <div className="site-container">
        <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#579d32]">Nasıl çalışır</p>
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.7vw,5.2rem)] font-semibold leading-[.92] tracking-[-0.06em] text-[#171a16]">Matbaa jargonunu değil, siparişi gösteriyoruz.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#666d63] lg:justify-self-end">Karmaşık ürün detaylarını adım adım seçimlere dönüştüren, masaüstünde ve mobilde aynı netliği koruyan bir baskı alışveriş deneyimi.</p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[28px] border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="bg-white p-6 sm:p-7">
                <div className="mb-12 flex size-11 items-center justify-center rounded-full bg-[#edf7e6] text-[#579d32]"><Icon className="size-5" /></div>
                <h3 className="text-lg font-semibold tracking-[-0.025em] text-[#171a16]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#747a71]">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
