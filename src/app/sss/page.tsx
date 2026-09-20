'use client'

import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

const faqs = [
  { category: 'siparis', question: 'Nasıl sipariş verebilirim?', answer: 'Ürün sayfasında ölçü, malzeme ve adet seçeneklerini belirleyin, gerekiyorsa ek hizmetleri seçin ve ürünü sepete ekleyin. Sepetten teslimat ve sipariş adımlarına devam edebilirsiniz.' },
  { category: 'siparis', question: 'Minimum sipariş adedi var mı?', answer: 'Evet. Minimum adet ürüne göre değişir. Güncel minimum miktar ve mevcut adet seçenekleri her ürünün konfiguratoründe gösterilir.' },
  { category: 'fiyat', question: 'Sitedeki fiyatlara KDV ve kargo dahil mi?', answer: 'Mevcut katalog fiyatlarında ürün sayfasında gösterilen tutarlara KDV ve standart kargo dahildir. Seçenek değiştirdiğinizde toplam fiyat aynı sayfada güncellenir.' },
  { category: 'fiyat', question: 'Fiyat neden ürün seçimine göre değişiyor?', answer: 'Ölçü, malzeme, adet ve ek uygulamalar üretim maliyetini değiştirir. Bu nedenle konfigurator, seçtiğiniz kombinasyona göre güncel toplamı hesaplar.' },
  { category: 'dosya', question: 'Baskı dosyasını hangi formatta göndermeliyim?', answer: 'Mümkünse baskı ölçüsünde hazırlanmış PDF kullanın. CMYK renk modu, yüksek çözünürlük ve kesim kenarları için yeterli taşma/güvenli alan bırakılması önerilir.' },
  { category: 'dosya', question: 'Tasarım dosyam hazır değilse ne yapabilirim?', answer: 'Desteklenen ürünlerde tasarım akışını kullanabilir veya ürün sayfasında mevcut tasarım hizmetlerini siparişe ekleyebilirsiniz.' },
  { category: 'dosya', question: 'Yüklediğim dosya siparişle birlikte saklanıyor mu?', answer: 'Evet. Dosya yükleme akışında PDF ürün seçiminizle ilişkilendirilir ve sipariş sürecinde kullanılmak üzere güvenli dosya depolama alanına yüklenir.' },
  { category: 'uretim', question: 'Üretim süresi ne kadar?', answer: 'Üretim süresi ürün, adet, uygulama ve yoğunluğa göre değişebilir. Siparişiniz oluşturulduktan sonra üretim ve sevkiyat durumu sipariş takibi üzerinden izlenir.' },
  { category: 'teslimat', question: 'Türkiye geneline gönderim var mı?', answer: 'Evet. Platform Türkiye geneli gönderim için yapılandırılmıştır. Sipariş durumu ve sevkiyat süreci sipariş takibinden kontrol edilebilir.' },
  { category: 'teslimat', question: 'Siparişimin durumunu nasıl takip ederim?', answer: 'Header bölümündeki Sipariş Takip bağlantısını kullanarak sipariş durumunuzu kontrol edebilirsiniz.' },
  { category: 'urun', question: 'Kartvizit ölçüsü nedir?', answer: 'Mevcut kartvizit ürünü 85×52 mm standart ölçüde sunulur. Gramaj ve adet seçenekleri kartvizit ürün sayfasında listelenir.' },
  { category: 'urun', question: 'Magnet için özel ölçü var mı?', answer: 'Hayır. Standart magnet ürünü 46×68 mm ölçüde sunulur. Araç magneti ise ayrı ürün olarak 20×60 cm ve 30×60 cm seçeneklerine sahiptir.' },
]

const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'siparis', name: 'Sipariş' },
  { id: 'fiyat', name: 'Fiyat' },
  { id: 'dosya', name: 'Dosya & Tasarım' },
  { id: 'uretim', name: 'Üretim' },
  { id: 'teslimat', name: 'Teslimat' },
  { id: 'urun', name: 'Ürünler' },
]

export default function FAQPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [open, setOpen] = useState<number | null>(0)

  const needle = query.trim().toLocaleLowerCase('tr-TR')
  const filtered = faqs.filter((item) => {
    const categoryMatch = category === 'all' || item.category === category
    const queryMatch = !needle || `${item.question} ${item.answer}`.toLocaleLowerCase('tr-TR').includes(needle)
    return categoryMatch && queryMatch
  })

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      <PageHero
        eyebrow="Destek"
        title="Sipariş ve baskı sürecinde sık sorulanlar."
        description="Ürün seçimi, fiyat, dosya hazırlığı, üretim ve teslimat akışı hakkında temel cevapları burada bulabilirsiniz."
        actionHref="/tum-urunler"
        actionLabel="Ürünlere git"
      />

      <main className="site-container py-8 sm:py-10 lg:py-12">
        <div className="grid gap-7 lg:grid-cols-[260px_1fr] lg:gap-10">
          <aside className="space-y-4 lg:sticky lg:top-[82px] lg:h-fit">
            <label className="relative block" aria-label="Sorularda ara">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#697067]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Sorularda ara..." className="h-11 w-full rounded-[10px] border border-[#dfe3dc] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#579d32]" />
            </label>
            <div className="flex gap-2 overflow-x-auto lg:grid" aria-label="SSS kategorileri">
              {categories.map((item) => (
                <button key={item.id} type="button" onClick={() => setCategory(item.id)} className={`shrink-0 rounded-[9px] px-3 py-2.5 text-left text-xs font-semibold transition ${category === item.id ? 'bg-[#171a16] text-white' : 'border border-[#dfe3dc] bg-white text-[#51584f]'}`}>{item.name}</button>
              ))}
            </div>
          </aside>

          <section aria-labelledby="faq-heading">
            <div className="mb-5">
              <p className="site-kicker mb-2">{filtered.length} cevap</p>
              <h2 id="faq-heading" className="text-2xl font-semibold tracking-[-.035em]">Sık sorulan sorular</h2>
            </div>
            <div className="divide-y divide-[#e2e5df] border-y border-[#e2e5df] bg-white px-4 sm:px-6">
              {filtered.map((item) => {
                const index = faqs.indexOf(item)
                const isOpen = open === index
                return (
                  <div key={item.question}>
                    <button type="button" onClick={() => setOpen(isOpen ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left" aria-expanded={isOpen}>
                      <span className="text-sm font-semibold text-[#252a24] sm:text-base">{item.question}</span>
                      <ChevronDown className={`size-4 shrink-0 text-[#4f8f31] transition ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && <p className="max-w-3xl pb-5 text-sm leading-7 text-[#5f665d]">{item.answer}</p>}
                  </div>
                )
              })}
            </div>
            {!filtered.length && <p className="rounded-[14px] border border-[#e1e4de] bg-white p-6 text-sm text-[#5f665d]">Aramanıza uygun soru bulunamadı.</p>}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
