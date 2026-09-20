'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Image as ImageIcon, Sparkles, UserRound, WandSparkles } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const categories = {
  kartvizit: { name: 'Kartvizit', productHref: '/urun/kartvizit', mockup: 'Boş kartvizit mockup' },
  brosur: { name: 'Broşür', productHref: '/urun/brosur', mockup: 'Boş broşür mockup' },
  magnet: { name: 'Magnet', productHref: '/urun/magnet', mockup: 'Boş magnet mockup' },
} as const

type CategoryKey = keyof typeof categories

export default function DesignCategoryPage() {
  const params = useParams()
  const category = categories[params.category as CategoryKey]

  if (!category) {
    return (
      <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
        <Header />
        <main className="site-container py-16 text-center">
          <h1 className="text-3xl font-semibold tracking-[-.04em]">Tasarım alanı bulunamadı.</h1>
          <Link href="/tasarim" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#326a1f]"><ArrowLeft className="size-4" /> Tasarım merkezine dön</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      <main>
        <section className="border-b border-[#e1e4de] bg-white">
          <div className="site-container py-8 sm:py-10 lg:py-12">
            <Link href="/tasarim" className="inline-flex items-center gap-2 text-xs font-semibold text-[#5f665d]"><ArrowLeft className="size-4" /> Tasarım merkezine dön</Link>
            <div className="mt-6 grid gap-7 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="site-kicker mb-3">AI Tasarım · Yakında</p>
                <h1 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.06em]">{category.name} tasarımını bilgilerinize göre AI hazırlayacak.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f665d] sm:text-base">Yeni sistemde boş ürün mockup&apos;ı temel alınacak; müşteri bilgileri ve marka içeriği AI tarafından tasarıma yerleştirilecek.</p>
              </div>
              <Link href={category.productHref} className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#171a16] px-5 text-sm font-semibold text-white">Şimdilik ürüne dön</Link>
            </div>
          </div>
        </section>

        <section className="site-container py-8 sm:py-10 lg:py-12">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [ImageIcon, '1. Boş mockup', `${category.mockup} sisteme ürün şablonu olarak tanımlanacak.`],
              [UserRound, '2. Müşteri bilgileri', 'Logo, firma adı, iletişim bilgileri, renk tercihleri ve istenen içerik alınacak.'],
              [WandSparkles, '3. AI tasarım', 'AI, mockup yapısını bozmadan bilgileri yerleştirip tasarım alternatifleri üretecek.'],
            ].map(([Icon, title, text]) => {
              const StepIcon = Icon as typeof Sparkles
              return (
                <article key={String(title)} className="rounded-[18px] border border-[#e1e4de] bg-white p-5 sm:p-6">
                  <StepIcon className="size-5 text-[#326a1f]" />
                  <h2 className="mt-7 text-lg font-semibold tracking-[-.025em]">{String(title)}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5f665d]">{String(text)}</p>
                </article>
              )
            })}
          </div>

          <div className="mt-6 rounded-[20px] border border-[#dfe3dc] bg-[#171a16] p-6 text-white sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#a9e77b]">Planlanan giriş alanları</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/80">
              {['Logo', 'Firma adı', 'Ad soyad', 'Telefon', 'E-posta', 'Web sitesi', 'Adres', 'Sosyal medya', 'Slogan', 'Marka renkleri', 'Ek not'].map((item) => <span key={item} className="rounded-full border border-white/15 px-3 py-1.5">{item}</span>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
