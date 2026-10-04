import Link from 'next/link'
import type { Product } from '@/data/products'
import { getProductSeo } from '@/data/productSeo'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ProductSeoContent({ product }: { product: Product }) {
  const content = getProductSeo(product.id)
  if (!content) return null
  const priceRows = product.quantityPricing ?? []

  return (
    <section className="border-t border-[#e5e8e2] bg-white">
      <div className="site-container py-10 sm:py-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
          <div>
            <p className="site-kicker mb-3">{product.name} rehberi</p>
            <h2 className="site-heading text-[clamp(1.9rem,3.4vw,3.2rem)]">
              Sipariş vermeden önce bilmeniz gerekenler.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#666d63]">{content.intro}</p>

            <div className="mt-6 space-y-2">
              {content.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center justify-between rounded-[11px] border border-[#e5e8e2] px-3 py-2.5 text-xs font-semibold text-[#4f564d] transition hover:border-[#aeb4aa] hover:text-[#171a16]">
                  {link.label}
                  <ArrowRight className="size-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {content.sections.map((section) => (
              <article key={section.title}>
                <h3 className="text-xl font-semibold tracking-[-.025em] text-[#171a16]">{section.title}</h3>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-[#666d63]">{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}

            {priceRows.length > 0 && (
              <section className="border-t border-[#e5e8e2] pt-7">
                <h3 className="text-xl font-semibold tracking-[-.025em] text-[#171a16]">Güncel {product.name.toLocaleLowerCase('tr-TR')} baskı fiyatları</h3>
                <p className="mt-2 text-sm leading-6 text-[#666d63]">Adet, ölçü ve malzemeye göre mevcut seçenekleri karşılaştırın. Fiyatlar ürün verisinden doğrudan alınır.</p>
                <div className="mt-4 overflow-x-auto rounded-[14px] border border-[#e5e8e2]">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-[#f7f8f5] text-xs uppercase tracking-[.08em] text-[#626960]">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Adet</th>
                        <th className="px-4 py-3 font-semibold">Seçenek</th>
                        <th className="px-4 py-3 font-semibold">Fiyat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edf0ea] bg-white">
                      {priceRows.map((row, index) => (
                        <tr key={`${row.quantity}-${row.material || ''}-${row.size || ''}-${index}`}>
                          <td className="whitespace-nowrap px-4 py-3 font-semibold text-[#252a24]">{row.quantity.toLocaleString('tr-TR')} adet</td>
                          <td className="px-4 py-3 text-[#666d63]">{[row.size, row.material].filter(Boolean).join(' · ') || 'Standart'}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-semibold text-[#252a24]">{row.price.toLocaleString('tr-TR')} TL</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <div className="border-t border-[#e5e8e2] pt-7">
              <h3 className="text-xl font-semibold tracking-[-.025em] text-[#171a16]">Sık sorulan sorular</h3>
              <div className="mt-4 divide-y divide-[#e7e9e5] border-y border-[#e7e9e5]">
                {content.faq.map((item) => (
                  <details key={item.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold text-[#252a24]">
                      <span>{item.question}</span>
                      <CheckCircle2 className="size-4 shrink-0 text-[#326a1f]" />
                    </summary>
                    <p className="max-w-3xl pt-3 text-sm leading-6 text-[#6b7168]">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
