import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface PageHeroProps { eyebrow: string; title: string; description: string; actionHref?: string; actionLabel?: string }

export default function PageHero({ eyebrow, title, description, actionHref, actionLabel }: PageHeroProps) {
  return (
    <section className="border-b border-[#e7eae4] bg-white">
      <div className="site-container py-10 sm:py-14 lg:py-16">
        <div className="max-w-4xl">
          <p className="site-kicker mb-4">{eyebrow}</p>
          <h1 className="text-[clamp(2.8rem,6vw,5.7rem)] font-semibold leading-[.9] tracking-[-.065em] text-[#171a16]">{title}</h1>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-2xl text-base leading-7 text-[#6c7369]">{description}</p>{actionHref && actionLabel && <Link href={actionHref} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#171a16]">{actionLabel} <ArrowRight className="size-4" /></Link>}</div>
        </div>
      </div>
    </section>
  )
}
