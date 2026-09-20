import Link from 'next/link'
import { Mail, MessageCircle, Phone, ShoppingBag } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

const contacts = [
  { icon: Phone, title: 'Telefon', value: '0 850 840 30 11', href: 'tel:+908508403011', action: 'Ara' },
  { icon: Mail, title: 'E-posta', value: 'info@ekartvizit.tr', href: 'mailto:info@ekartvizit.tr', action: 'E-posta gönder' },
  { icon: MessageCircle, title: 'WhatsApp', value: 'Sipariş ve ürün desteği', href: 'https://wa.me/908508403011', action: 'WhatsApp aç' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      <PageHero
        eyebrow="İletişim"
        title="Ürün, dosya veya sipariş konusunda bize ulaşın."
        description="Baskı ürünü seçimi, dosya hazırlığı ve mevcut siparişleriniz için aşağıdaki doğrudan iletişim kanallarını kullanabilirsiniz."
        actionHref="/siparis-takip"
        actionLabel="Sipariş takip"
      />
      <main className="site-container py-8 sm:py-10 lg:py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {contacts.map(({ icon: Icon, title, value, href, action }) => (
            <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="group rounded-[18px] border border-[#e1e4de] bg-white p-5 transition hover:border-[#aeb4aa] sm:p-6">
              <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#eef5e9] text-[#4f8f31]"><Icon className="size-5" /></span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[.12em] text-[#697067]">{title}</p>
              <h2 className="mt-2 text-lg font-semibold tracking-[-.025em]">{value}</h2>
              <span className="mt-5 inline-block text-xs font-semibold text-[#4f8f31] group-hover:underline">{action}</span>
            </a>
          ))}
        </div>

        <section className="mt-6 grid gap-4 rounded-[20px] border border-[#e1e4de] bg-white p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="site-kicker mb-2">Sipariş öncesi</p>
            <h2 className="text-2xl font-semibold tracking-[-.035em]">Ürün özelliklerini doğrudan sayfadan karşılaştırabilirsiniz.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5f665d]">Ölçü, kağıt veya malzeme, adet ve güncel fiyat seçenekleri ürün sayfalarında gösterilir. Hazır dosyanız varsa sipariş akışında yükleyebilirsiniz.</p>
          </div>
          <Link href="/tum-urunler" className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#171a16] px-5 text-sm font-semibold text-white"><ShoppingBag className="size-4" /> Ürünleri incele</Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
