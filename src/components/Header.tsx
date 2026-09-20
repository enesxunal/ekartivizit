'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, ChevronRight, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { PRODUCTS, type Product } from '@/data/products'

type MenuKey = 'all' | 'kurumsal' | 'reklam' | 'promosyon'

const nav: Array<{ name: string; href: string; menu: MenuKey }> = [
  { name: 'Tüm Ürünler', href: '/tum-urunler', menu: 'all' },
  { name: 'Kurumsal', href: '/kurumsal', menu: 'kurumsal' },
  { name: 'Reklam & Tanıtım', href: '/reklam', menu: 'reklam' },
  { name: 'Promosyon', href: '/promosyon', menu: 'promosyon' },
]

const categoryMeta = {
  kurumsal: { label: 'Kurumsal', href: '/kurumsal' },
  reklam: { label: 'Reklam & Tanıtım', href: '/reklam' },
  promosyon: { label: 'Promosyon', href: '/promosyon' },
} as const

const visibleProducts = PRODUCTS.filter((product) => !product.id.startsWith('test-'))

function getProducts(menu: MenuKey) {
  if (menu === 'all') return visibleProducts
  return visibleProducts.filter((product) => product.category === menu)
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const { getItemCount } = useCart()
  const count = getItemCount()

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#e7eae4] bg-white/96 backdrop-blur-xl"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="site-container flex h-[66px] items-center justify-between gap-5">
        <Link href="/" className="shrink-0" onClick={() => setActiveMenu(null)}>
          <Image src="/logo.png" alt="E-Kartvizit" width={136} height={40} className="h-8 w-auto object-contain" priority />
        </Link>

        <nav className="hidden h-full items-center gap-1 lg:flex">
          {nav.map((item) => (
            <div
              key={item.href}
              className="flex h-full items-center"
              onMouseEnter={() => setActiveMenu(item.menu)}
            >
              <Link
                href={item.href}
                className="flex h-10 items-center gap-1.5 rounded-[9px] px-3 text-[13px] font-semibold text-[#3f453d] transition hover:bg-[#f5f6f3] hover:text-[#326a1f]"
              >
                {item.name}
                <ChevronDown className={`size-3.5 transition-transform ${activeMenu === item.menu ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link href="/siparis-takip" className="hidden px-2 text-[12px] font-semibold text-[#666d63] transition hover:text-[#171a16] xl:block">Sipariş Takip</Link>
          <Link href="/tasarim" className="hidden px-2 text-[12px] font-semibold text-[#326a1f] xl:block">Hızlı Tasarım</Link>
          <Link href="/tum-urunler" aria-label="Ürün ara" className="hidden size-9 items-center justify-center rounded-[9px] border border-[#e1e4de] text-[#50564e] hover:bg-[#f5f6f3] sm:flex"><Search className="size-4" /></Link>
          <Link href="/hesabim" aria-label="Hesabım" className="hidden size-9 items-center justify-center rounded-[9px] border border-[#e1e4de] text-[#50564e] hover:bg-[#f5f6f3] sm:flex"><User className="size-4" /></Link>
          <Link href="/sepet" aria-label={count > 0 ? `Sepet, ${count} ürün` : 'Sepet'} className="flex h-9 items-center gap-2 rounded-[9px] bg-[#171a16] px-3.5 text-[13px] font-semibold text-white">
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Sepet</span>
            {count > 0 && <span className="rounded-full bg-[#91d75f] px-1.5 py-0.5 text-[10px] font-bold text-[#171a16]">{count}</span>}
          </Link>
          <button type="button" onClick={() => setOpen(!open)} aria-label="Menü" className="flex size-9 items-center justify-center rounded-[9px] border border-[#e1e4de] lg:hidden">
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {activeMenu && (
        <DesktopProductMenu
          menu={activeMenu}
          onClose={() => setActiveMenu(null)}
        />
      )}

      {open && (
        <div className="max-h-[calc(100dvh-67px)] overflow-y-auto overscroll-contain border-t border-[#e7eae4] bg-white lg:hidden">
          <nav className="site-container py-2">
            <button
              type="button"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="flex w-full items-center justify-between border-b border-[#eef0ec] py-3 text-left text-sm font-semibold"
            >
              Ürünler
              <ChevronDown className={`size-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileProductsOpen && (
              <div className="border-b border-[#eef0ec] py-2">
                {(Object.keys(categoryMeta) as Array<keyof typeof categoryMeta>).map((category) => (
                  <MobileCategory
                    key={category}
                    category={category}
                    products={getProducts(category)}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
                <Link
                  href="/tum-urunler"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-between rounded-[10px] bg-[#f4f6f1] px-3 py-3 text-xs font-semibold text-[#326a1f]"
                >
                  Tüm ürünleri görüntüle
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            )}

            <Link href="/siparis-takip" onClick={() => setOpen(false)} className="block border-b border-[#eef0ec] py-3 text-sm font-semibold">Sipariş Takip</Link>
            <Link href="/tasarim" onClick={() => setOpen(false)} className="block py-3 text-sm font-semibold text-[#326a1f]">Hızlı Tasarım</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function DesktopProductMenu({ menu, onClose }: { menu: MenuKey; onClose: () => void }) {
  if (menu === 'all') {
    return (
      <div className="absolute inset-x-0 top-full border-t border-[#edf0ea] bg-white shadow-[0_18px_50px_rgba(20,28,19,.1)]">
        <div className="site-container grid gap-7 py-5 xl:grid-cols-3">
          {(Object.keys(categoryMeta) as Array<keyof typeof categoryMeta>).map((category) => {
            const meta = categoryMeta[category]
            const products = getProducts(category)

            return (
              <section key={category}>
                <div className="mb-2 flex items-center justify-between border-b border-[#edf0ea] pb-2">
                  <Link href={meta.href} onClick={onClose} className="text-[11px] font-bold uppercase tracking-[.12em] text-[#326a1f]">
                    {meta.label}
                  </Link>
                  <span className="text-[10px] text-[#626960]">{products.length} ürün</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {products.map((product) => <MenuProduct key={product.id} product={product} onClose={onClose} />)}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    )
  }

  const products = getProducts(menu)
  const meta = categoryMeta[menu]

  return (
    <div className="absolute inset-x-0 top-full border-t border-[#edf0ea] bg-white shadow-[0_18px_50px_rgba(20,28,19,.1)]">
      <div className="site-container py-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#626960]">Ürünler</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-.025em] text-[#171a16]">{meta.label}</h2>
          </div>
          <Link href={meta.href} onClick={onClose} className="flex items-center gap-1 text-xs font-semibold text-[#326a1f]">
            Tümünü gör <ChevronRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => <MenuProduct key={product.id} product={product} onClose={onClose} />)}
        </div>
      </div>
    </div>
  )
}

function MenuProduct({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <Link
      href={product.href}
      onClick={onClose}
      className="group flex min-w-0 items-center gap-2.5 rounded-[10px] px-2 py-2 transition hover:bg-[#f5f7f2]"
    >
      <span className="relative size-10 shrink-0 overflow-hidden rounded-[8px] border border-[#e7eae4] bg-[#f5f6f3]">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="40px"
          className="object-contain p-1.5"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-semibold text-[#31362f] group-hover:text-[#326a1f]">{product.name}</span>
        {product.price && <span className="mt-0.5 block text-[10px] text-[#626960]">{product.price.min.toLocaleString('tr-TR')} TL’den</span>}
      </span>
    </Link>
  )
}

function MobileCategory({
  category,
  products,
  onNavigate,
}: {
  category: keyof typeof categoryMeta
  products: Product[]
  onNavigate: () => void
}) {
  const meta = categoryMeta[category]

  return (
    <section className="py-2">
      <Link href={meta.href} onClick={onNavigate} className="mb-1 block px-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#326a1f]">
        {meta.label}
      </Link>
      <div className="grid grid-cols-2 gap-1">
        {products.map((product) => (
          <Link key={product.id} href={product.href} onClick={onNavigate} className="flex min-w-0 items-center gap-2 rounded-[9px] px-1 py-1.5 hover:bg-[#f5f7f2]">
            <span className="relative size-8 shrink-0 overflow-hidden rounded-[7px] border border-[#e7eae4] bg-[#f5f6f3]">
              <Image src={product.image} alt="" fill sizes="32px" className="object-contain p-1" />
            </span>
            <span className="truncate text-[11px] font-semibold text-[#3d433b]">{product.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
