'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

const nav = [
  { name: 'Tüm Ürünler', href: '/tum-urunler' },
  { name: 'Kurumsal', href: '/kurumsal' },
  { name: 'Reklam & Tanıtım', href: '/reklam' },
  { name: 'Promosyon', href: '/promosyon' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { getItemCount } = useCart()
  const count = getItemCount()

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7eae4] bg-white/96 backdrop-blur-xl">
      <div className="site-container flex h-[66px] items-center justify-between gap-5">
        <Link href="/" className="shrink-0">
          <Image src="/logo.png" alt="E-Kartvizit" width={136} height={40} className="h-8 w-auto object-contain" priority />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[13px] font-semibold text-[#3f453d] transition hover:text-[#579d32]">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link href="/siparis-takip" className="hidden px-2 text-[12px] font-semibold text-[#666d63] transition hover:text-[#171a16] xl:block">Sipariş Takip</Link>
          <Link href="/tasarim" className="hidden px-2 text-[12px] font-semibold text-[#579d32] xl:block">Tasarımını Yükle</Link>
          <Link href="/tum-urunler" aria-label="Ürün ara" className="hidden size-9 items-center justify-center rounded-[9px] border border-[#e1e4de] text-[#50564e] hover:bg-[#f5f6f3] sm:flex"><Search className="size-4" /></Link>
          <Link href="/hesabim" aria-label="Hesabım" className="hidden size-9 items-center justify-center rounded-[9px] border border-[#e1e4de] text-[#50564e] hover:bg-[#f5f6f3] sm:flex"><User className="size-4" /></Link>
          <Link href="/sepet" className="flex h-9 items-center gap-2 rounded-[9px] bg-[#171a16] px-3.5 text-[13px] font-semibold text-white">
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Sepet</span>
            {count > 0 && <span className="rounded-full bg-[#91d75f] px-1.5 py-0.5 text-[10px] font-bold text-[#171a16]">{count}</span>}
          </Link>
          <button type="button" onClick={() => setOpen(!open)} aria-label="Menü" className="flex size-9 items-center justify-center rounded-[9px] border border-[#e1e4de] lg:hidden">{open ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#e7eae4] bg-white lg:hidden">
          <nav className="site-container grid py-2">
            {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-[#eef0ec] py-3 text-sm font-semibold last:border-0">{item.name}</Link>)}
            <Link href="/siparis-takip" onClick={() => setOpen(false)} className="py-3 text-sm font-semibold">Sipariş Takip</Link>
            <Link href="/tasarim" onClick={() => setOpen(false)} className="py-3 text-sm font-semibold text-[#579d32]">Tasarımını Yükle</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
