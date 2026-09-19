import Link from 'next/link'
import { ArrowRight, Building2, Gift, Megaphone } from 'lucide-react'
import { CATEGORIES, getProductsByCategory } from '@/data/products'

const icons = { Building2, Megaphone, Gift }

export default function CategoryProducts() {
  return (
    <section className="bg-[#f7f8f5] py-12 sm:py-10">
      <div className="site-container">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="site-kicker mb-3">Kategoriler</p><h2 className="text-[clamp(1.9rem,3.5vw,3.3rem)] font-semibold leading-[.94] tracking-[-.055em]">İşine uygun baskıyı seç.</h2></div><Link href="/tum-urunler" className="hidden items-center gap-2 text-sm font-semibold sm:flex">Tüm ürünler <ArrowRight className="size-4" /></Link></div>
        <div className="grid gap-3 md:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = icons[category.icon as keyof typeof icons]
            const count = getProductsByCategory(category.id).filter((p) => !p.id.startsWith('test-')).length
            return <Link href={category.href} key={category.id} className="group rounded-[18px] border border-[#e0e3dd] bg-white p-5 transition hover:border-[#aeb4aa] sm:p-6"><div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center rounded-[12px] bg-[#eef6e9] text-[#579d32]"><Icon className="size-5" /></span><ArrowRight className="size-4 text-[#a1a69f] transition group-hover:translate-x-1 group-hover:text-[#171a16]" /></div><h3 className="mt-10 text-2xl font-semibold tracking-[-.035em]">{category.name}</h3><p className="mt-2 text-sm leading-6 text-[#737970]">{category.description}</p><p className="mt-5 text-xs font-semibold text-[#579d32]">{count} ürün</p></Link>
          })}
        </div>
      </div>
    </section>
  )
}
