'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getItemCount } = useCart()
  const cartItemCount = getItemCount()

  const menuItems = [
    { name: 'Tüm Ürünler', href: '/tum-urunler' },
    { name: 'Kurumsal', href: '/kurumsal' },
    { name: 'Reklam', href: '/reklam' },
    { name: 'Promosyon', href: '/promosyon' },
    { name: 'Çok Satanlar', href: '/cok-satanlar' },
    { name: 'Sipariş Takip', href: '/siparis-takip' },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="E-Kartvizit Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menü */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#59af05] px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Sağ taraf - Sepet ve Kullanıcı */}
          <div className="flex items-center space-x-4">
            {/* Sepet */}
            <Link href="/sepet" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Kullanıcı */}
            <Link href="/hesabim">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menü Butonu */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menü */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#59af05] block px-3 py-2 text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 