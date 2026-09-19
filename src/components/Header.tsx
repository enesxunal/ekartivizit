'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, Search, ShoppingBag, User, X, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

const primaryNav = [
  { name: 'Tüm Ürünler', href: '/tum-urunler' },
  { name: 'Kurumsal', href: '/kurumsal' },
  { name: 'Reklam', href: '/reklam' },
  { name: 'Promosyon', href: '/promosyon' },
]

const utilityNav = [
  { name: 'Çok Satanlar', href: '/cok-satanlar' },
  { name: 'Tasarımını Yükle', href: '/tasarim' },
  { name: 'Sipariş Takip', href: '/siparis-takip' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getItemCount } = useCart()
  const cartItemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[#f8f8f4]/95 backdrop-blur-xl">
      <div className="border-b border-black/8 bg-[#171a16] text-white">
        <div className="site-container flex min-h-9 items-center justify-between gap-4 text-[11px] font-medium tracking-[0.04em] text-white/75">
          <span>Online baskı · Türkiye geneli üretim ve gönderim</span>
          <div className="hidden items-center gap-5 sm:flex">
            {utilityNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="site-container">
        <div className="flex h-[76px] items-center justify-between gap-5">
          <Link href="/" className="flex shrink-0 items-center">
            <Image src="/logo.png" alt="E-Kartvizit" width={146} height={44} className="h-10 w-auto object-contain" priority />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#353a34] transition hover:bg-black/5 hover:text-black"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/tum-urunler"
              aria-label="Ürün ara"
              className="hidden size-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white sm:flex"
            >
              <Search className="size-[18px]" />
            </Link>
            <Link
              href="/hesabim"
              aria-label="Hesabım"
              className="hidden size-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white sm:flex"
            >
              <User className="size-[18px]" />
            </Link>
            <Link
              href="/sepet"
              className="relative flex h-10 items-center gap-2 rounded-full bg-[#171a16] px-4 text-sm font-semibold text-white transition hover:bg-[#59af05]"
            >
              <ShoppingBag className="size-[17px]" />
              <span className="hidden sm:inline">Sepet</span>
              {cartItemCount > 0 && (
                <span className="flex min-w-5 items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#171a16]">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full border border-black/10 lg:hidden"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label="Menüyü aç"
            >
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-black/8 bg-[#f8f8f4] lg:hidden">
          <div className="site-container py-4">
            <nav className="grid gap-1">
              {[...primaryNav, ...utilityNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-[#252923] transition hover:bg-black/5"
                >
                  {item.name}
                  <ArrowUpRight className="size-4 text-[#6f756c]" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
