'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { CreditCard, FileText, ShieldCheck, ShoppingBag } from 'lucide-react'

export default function KafPaymentContent({ product }: { product: Product }) {
  const router = useRouter()
  const { items, addToCart } = useCart()
  const { addToast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const hasCartItems = items.length > 0

  const handleContinue = () => {
    if (submitting || hasCartItems) return
    setSubmitting(true)
    addToCart({ product, quantity: 1, price: 54000 })
    addToast({
      type: 'success',
      title: 'Tahsilat kalemi sepete eklendi',
      description: 'Kartla odemek icin sepetten devam edin.',
    })
    router.push('/sepet')
  }

  return (
    <main className="min-h-[65vh] bg-[#f7f8f5] py-10 sm:py-16">
      <div className="site-container mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-[22px] border border-[#e2e6df] bg-white shadow-sm">
          <div className="border-b border-[#e9ebe7] bg-[#fafbf9] px-6 py-6 sm:px-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3c762c]">E Kartvizit · Güvenli Tahsilat</span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#171a16] sm:text-3xl">KAF Grup – Katalog Baskı Ödemesi</h1>
            <p className="mt-2 text-sm leading-6 text-[#60685f]">
              Onaylanan kurumsal katalog baskı teklifine ait özel ödeme sayfası.
            </p>
          </div>

          <div className="px-6 py-7 sm:px-10">
            <div className="flex items-start gap-3">
              <FileText className="mt-1 size-5 shrink-0 text-[#3c762c]" />
              <div>
                <p className="font-semibold text-[#171a16]">1.000 adet kurumsal katalog baskısı</p>
                <p className="mt-1 text-sm leading-6 text-[#626a61]">
                  A4 dikey · 24 iç + 4 kapak (28 sayfa) · 170 gr parlak kuşe iç · 350 gr parlak kuşe kapak ·
                  Dış kapak mat selefon + kabartma lak · CMYK çift taraflı · Tel dikiş · Nakliye dahil
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-3 border-y border-[#e9ece6] py-6 text-sm">
              <div className="flex justify-between gap-4 text-[#60685f]"><span>Baskı hizmet bedeli</span><span>45.000,00 TL</span></div>
              <div className="flex justify-between gap-4 text-[#60685f]"><span>KDV (%20)</span><span>9.000,00 TL</span></div>
              <div className="flex items-end justify-between gap-4 border-t border-[#ecefe9] pt-4 font-bold text-[#171a16]">
                <span>Ödenecek toplam</span><span className="text-2xl tracking-tight sm:text-3xl">54.000,00 TL</span>
              </div>
            </div>

            {hasCartItems ? (
              <div className="mt-6 rounded-xl border border-[#f0d7a5] bg-[#fffaf0] p-4 text-sm leading-6 text-[#7c5918]">
                Sepetinizde başka ürünler bulunuyor. Bu özel tahsilatı tek başına yapabilmek için önce sepetinizi boşaltın.
                <Link href="/sepet" className="ml-1 font-semibold underline">Sepete git</Link>
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleContinue}
              disabled={hasCartItems || submitting}
              className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#171a16] px-6 text-sm font-semibold text-white transition hover:bg-[#30382b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag className="size-4" />
              {submitting ? 'Sepet açılıyor...' : '54.000 TL için ödeme işlemine devam et'}
            </button>

            <div className="mt-6 grid gap-3 text-xs leading-5 text-[#616a60] sm:grid-cols-2">
              <div className="flex gap-2"><CreditCard className="mt-0.5 size-4 shrink-0 text-[#39732b]" /><span>Kredi/banka kartı ödemesi PayTR güvenli ödeme sayfasında yapılır.</span></div>
              <div className="flex gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#39732b]" /><span>Ödeme PayTR tarafından onaylandıktan sonra sipariş durumu güncellenir.</span></div>
            </div>
            <p className="mt-6 text-xs text-[#7a8277]">Bağlantı geçerliliği: 9 Kasım 2026, 23.59 (Türkiye saati). Ödeme bir kez tamamlandığında bağlantı kapanır.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
