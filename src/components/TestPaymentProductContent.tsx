'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { CreditCard, ShieldCheck, ShoppingBag } from 'lucide-react'

export default function TestPaymentProductContent({ product }: { product: Product }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const [adding, setAdding] = useState(false)

  const handleContinue = () => {
    if (adding) return
    setAdding(true)
    addToCart({
      product,
      quantity: 1,
      selectedSize: 'Standart',
      price: 1,
    })
    addToast({
      type: 'success',
      title: 'Deneme urunu sepete eklendi',
      description: 'Sepetten kartla odeme adimina devam edin.',
    })
    router.push('/sepet')
  }

  return (
    <main className="min-h-[65vh] bg-[#f7f8f5] py-12 sm:py-20">
      <div className="site-container mx-auto max-w-2xl">
        <div className="rounded-[24px] border border-[#e2e6df] bg-white px-6 py-9 shadow-sm sm:px-10 sm:py-12">
          <span className="inline-flex rounded-full bg-[#edf5e9] px-3 py-1.5 text-xs font-semibold text-[#356923]">
            Yalnizca odeme kontrolu
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[#171a16] sm:text-4xl">
            PayTR Ödeme Testi
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#616960]">
            E Kartvizit kartla odeme altyapisini gercek bir siparis ve 1 TL tutarli kart islemi ile
            kontrol etmek icin olusturulan deneme urunudur. Fiziksel urun uretilmez veya gonderilmez.
          </p>
          <div className="mt-7 flex items-end justify-between border-y border-[#e9ece6] py-6">
            <div>
              <p className="text-sm font-medium text-[#5d665b]">Tek adet test urunu</p>
              <p className="mt-1 text-xs text-[#7a8277]">KDV ve kargo dahil, toplam odeme</p>
            </div>
            <p className="text-4xl font-bold tracking-tight text-[#171a16]">1,00 TL</p>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            disabled={adding}
            className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#171a16] px-5 text-sm font-semibold text-white transition hover:bg-[#30382b] disabled:opacity-60"
          >
            <ShoppingBag className="size-4" />
            {adding ? 'Sepet aciliyor...' : '1 TL deneme urununu sepete ekle'}
          </button>
          <div className="mt-6 space-y-3 text-xs leading-5 text-[#626b60]">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#39732b]" />
              <span>Odeme gerceklestiginde kesin sonuc PayTR bildirimiyle dogrulanir.</span>
            </div>
            <div className="flex items-start gap-2">
              <CreditCard className="mt-0.5 size-4 shrink-0 text-[#39732b]" />
              <span>Sepet sonrasi standart siparis formu kullanilir. Formdaki adres bilgileri yalnizca islem kontrolu icindir; teslimat yapilmaz.</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
