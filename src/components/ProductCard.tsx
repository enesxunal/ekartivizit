'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/data/products'

interface ProductCardProps { product: Product; eyebrow?: string; index?: number }

export default function ProductCard({ product, eyebrow }: ProductCardProps) {
  const price = product.price ? (product.price.min === product.price.max ? `${product.price.min.toLocaleString('tr-TR')} TL` : `${product.price.min.toLocaleString('tr-TR')} TL'den`) : 'Teklif al'
  return (
    <Link href={product.href} className="group overflow-hidden rounded-[16px] border border-[#e1e4de] bg-white transition hover:border-[#b8beb5] hover:shadow-[0_12px_32px_rgba(20,28,19,.06)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f4f1]">
        {eyebrow && <span className="absolute left-3 top-3 z-10 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.1em] text-[#5d645a]">{eyebrow}</span>}
        <Image src={product.image} alt={product.name} fill sizes="(max-width:768px) 50vw, 33vw" className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]" />
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#8d938a]">{product.category}</p>
        <h3 className="mt-2 text-base font-semibold tracking-[-.02em] text-[#171a16] sm:text-lg">{product.name}</h3>
        <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-[#777d74]">{product.description}</p>
        <div className="mt-5 flex items-end justify-between border-t border-[#eceee9] pt-4"><div><p className="text-[10px] text-[#969b94]">Başlangıç</p><p className="mt-1 text-sm font-semibold text-[#171a16]">{price}</p></div><span className="flex size-8 items-center justify-center rounded-[9px] border border-[#e1e4de] text-[#6e756b] transition group-hover:border-[#171a16] group-hover:bg-[#171a16] group-hover:text-white"><ArrowRight className="size-3.5" /></span></div>
      </div>
    </Link>
  )
}
