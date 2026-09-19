'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { ArrowUpRight, CreditCard, FileText, Magnet, Upload, Check } from 'lucide-react'

const designCategories = [
  { id: 'kartvizit', name: 'Kartvizit', description: 'Kartvizit dosyanızı yükleyin veya tasarım akışını başlatın.', icon: CreditCard, dimensions: '86,75 × 54 mm' },
  { id: 'brosur', name: 'Broşür', description: 'Broşür baskısı için dosyanızı ürüne bağlayın.', icon: FileText, dimensions: 'A4 · A5 · özel ölçü' },
  { id: 'magnet', name: 'Magnet', description: 'Magnet tasarımınızı baskı siparişine hazırlayın.', icon: Magnet, dimensions: 'Standart · özel ölçü' },
]

export default function TasarimPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f4f4ef]">
      <Header />
      <PageHero
        eyebrow="Tasarım ve dosya"
        title="Baskı dosyanız siparişten kopmasın."
        description="Hazır PDF dosyanızı yükleyin ya da desteklenen ürünlerde tasarım akışını başlatın. Dosyanız seçtiğiniz ürünle birlikte siparişe taşınır."
        actionHref="/tum-urunler"
        actionLabel="Önce ürün seç"
      />

      <main className="site-container py-10 sm:py-14 lg:py-16">
        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {[
            ['01', 'Ürünü seç', 'Baskı türünü ve ölçüyü belirleyin.'],
            ['02', 'Dosyanı bağla', 'PDF dosyanızı güvenli şekilde yükleyin.'],
            ['03', 'Siparişe devam et', 'Dosya, ürün ve seçimler aynı sepette kalsın.'],
          ].map(([number, title, text]) => (
            <div key={number} className="rounded-[24px] border border-black/8 bg-white p-6">
              <span className="text-xs font-semibold tracking-[0.14em] text-[#579d32]">{number}</span>
              <h2 className="mt-8 text-xl font-semibold tracking-[-0.03em] text-[#171a16]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#70766d]">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {designCategories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => router.push(`/tasarim/${category.id}`)}
                className="group flex min-h-[360px] flex-col rounded-[28px] border border-black/8 bg-[#171a16] p-7 text-left text-white transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(16,24,16,.14)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-[#9fe468]"><Icon className="size-5" /></span>
                  <ArrowUpRight className="size-5 text-white/40 transition group-hover:text-white" />
                </div>
                <div className="mt-auto">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-white/40">{category.dimensions}</p>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em]">{category.name}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">{category.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#9fe468] px-4 py-2.5 text-sm font-semibold text-[#171a16]">
                    <Upload className="size-4" /> Tasarım akışını aç
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid gap-5 rounded-[28px] border border-black/8 bg-white p-7 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="site-kicker mb-3">Dosya standardı</p>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#171a16]">Baskıya uygun PDF ile en hızlı akış.</h2>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[#646b62]">
            {['PDF', 'Maks. 10 MB', 'Baskıya uygun ölçü'].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-4 text-[#579d32]" />{item}</span>)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
