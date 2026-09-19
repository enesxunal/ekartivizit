'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  eyebrow?: string
  index?: number
}

export default function ProductCard({ product, eyebrow, index }: ProductCardProps) {
  const price = product.price
    ? product.price.min === product.price.max
      ? `${product.price.min.toLocaleString('tr-TR')} ₺`
      : `${product.price.min.toLocaleString('tr-TR')} ₺'den`
    : 'Teklif al'

  return (
    <Link
      href={product.href}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white transition duration-300 hover:-translate-y-1 hover:border-black/16 hover:shadow-[0_24px_80px_rgba(16,24,16,.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eceee7]">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          {typeof index === 'number' && (
            <span className="rounded-full bg-[#171a16] px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          {eyebrow && (
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-[#171a16] backdrop-blur">
              {eyebrow}
            </span>
          )}
        </div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain p-6 transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f756c]">
              {product.category}
            </p>
            <h3 className="text-lg font-semibold leading-tight tracking-[-0.025em] text-[#171a16] sm:text-xl">
              {product.name}
            </h3>
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 transition group-hover:bg-[#171a16] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <p className="mb-6 line-clamp-2 text-sm leading-6 text-[#6f756c]">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-black/8 pt-4">
          <span className="text-xs font-medium text-[#777d74]">
            {product.minQuantity ? `Min. ${product.minQuantity.toLocaleString('tr-TR')} adet` : 'Üretim seçeneği'}
          </span>
          <span className="text-base font-semibold tracking-[-0.02em] text-[#171a16]">{price}</span>
        </div>
      </div>
    </Link>
  )
}
