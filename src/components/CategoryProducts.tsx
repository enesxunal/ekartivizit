import Link from 'next/link'
import { ArrowUpRight, Building2, Gift, Megaphone } from 'lucide-react'
import { CATEGORIES, getProductsByCategory } from '@/data/products'

const iconMap = { Building2, Megaphone, Gift }

export default function CategoryProducts() {
  return (
    <section className="bg-[#171a16] py-14 text-white sm:py-18 lg:py-24">
      <div className="site-container">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#9fe468]">Kategoriler</p>
          <h2 className="text-[clamp(2.3rem,4.7vw,5.1rem)] font-semibold leading-[.92] tracking-[-0.06em]">İhtiyaca göre değil, işe göre düzenlendi.</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            const count = getProductsByCategory(category.id).length
            return (
              <Link href={category.href} key={category.id} className="group rounded-[28px] border border-white/12 bg-white/[.035] p-6 transition hover:bg-white hover:text-[#171a16] sm:p-8">
                <div className="mb-16 flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-[#9fe468] transition group-hover:bg-[#edf7e6] group-hover:text-[#579d32]"><Icon className="size-5" /></span>
                  <ArrowUpRight className="size-5 text-white/45 transition group-hover:text-[#171a16]" />
                </div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-white/40 group-hover:text-[#777d74]">{count} ürün</p>
                <h3 className="text-3xl font-semibold tracking-[-0.04em]">{category.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/50 group-hover:text-[#697067]">{category.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
