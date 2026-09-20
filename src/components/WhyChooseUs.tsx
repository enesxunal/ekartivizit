import { FileCheck2, PackageCheck, SlidersHorizontal, Truck } from 'lucide-react'

const steps = [
  [SlidersHorizontal, '01', 'Ürünü seç', 'Ölçü, malzeme ve adet seçeneklerini belirleyin.'],
  [FileCheck2, '02', 'Dosyanı yükle', 'Hazır baskı dosyanızı siparişinizle eşleştirin.'],
  [PackageCheck, '03', 'Siparişi oluştur', 'Teslimat ve ödeme bilgilerinizi tamamlayın.'],
  [Truck, '04', 'Takip et', 'Üretim ve gönderim durumunu sipariş ekranından izleyin.'],
]

export default function WhyChooseUs() {
  return (
    <section className="border-y border-[#e7eae4] bg-white py-12 sm:py-10">
      <div className="site-container">
        <div className="mb-8 max-w-2xl"><p className="site-kicker mb-3">Nasıl çalışır?</p><h2 className="text-[clamp(1.9rem,3.4vw,3.2rem)] font-semibold leading-[.94] tracking-[-.055em]">Dört adımda baskı siparişi.</h2></div>
        <div className="grid gap-px overflow-hidden rounded-[18px] border border-[#e2e5df] bg-[#e2e5df] sm:grid-cols-2 lg:grid-cols-4">{steps.map(([Icon, no, title, text]) => { const StepIcon = Icon as typeof Truck; return <div key={String(no)} className="bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><StepIcon className="size-5 text-[#326a1f]" /><span className="text-[11px] font-semibold tracking-[.14em] text-[#626960]">{String(no)}</span></div><h3 className="mt-10 text-lg font-semibold tracking-[-.025em]">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-[#5f665d]">{String(text)}</p></div> })}</div>
      </div>
    </section>
  )
}
