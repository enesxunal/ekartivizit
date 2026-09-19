import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  actionHref?: string
  actionLabel?: string
}

export default function PageHero({ eyebrow, title, description, actionHref, actionLabel }: PageHeroProps) {
  return (
    <section className="border-b border-black/8 bg-[#f4f4ef]">
      <div className="site-container py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#579d32]">{eyebrow}</p>
            <h1 className="max-w-4xl text-[clamp(2.6rem,6vw,6.6rem)] font-semibold leading-[.9] tracking-[-0.065em] text-[#171a16]">
              {title}
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="text-base leading-7 text-[#666d63] sm:text-lg">{description}</p>
            {actionHref && actionLabel && (
              <Link
                href={actionHref}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#171a16] underline decoration-[#59af05] decoration-2 underline-offset-4"
              >
                {actionLabel}
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
