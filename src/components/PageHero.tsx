import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface PageHeroProps { eyebrow: string; title: string; description: string; actionHref?: string; actionLabel?: string }

export default function PageHero({ eyebrow, title, description, actionHref, actionLabel }: PageHeroProps) {
  return (
    <section className="border-b border-[#e7eae4] bg-white">
      <div className="site-container py-8 sm:py-10 lg:py-12">
        <div className="max-w-4xl">
          <p className="site-kicker mb-4">{eyebrow}</p>
          <h1 className="text-[clamp(2rem,8vw,4.4rem)] font-semibold leading-[.94] tracking-[-.055em] text-[#171a16]">{title}</h1>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-2xl text-base leading-7 text-[#6c7369]">{description}</p>{actionHref && actionLabel && <Link href={actionHref} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#171a16]">{actionLabel} <ArrowRight className="size-4" /></Link>}</div>
        </div>
      </div>
    </section>
  )
}
