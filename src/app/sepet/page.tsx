'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getItemCount, clearCart } = useCart()
  const total = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white text-[#171a16]">
        <Header />
        <main className="site-container py-10 sm:py-14">
          <div className="mx-auto max-w-xl text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#f2f4ef]"><ShoppingBag className="size-5" /></span>
            <h1 className="mt-7 text-[clamp(2.3rem,4.5vw,4.2rem)] font-semibold leading-[.92] tracking-[-.06em]">Sepetiniz boş.</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#71776e]">Baskı ürününü seçin, özelliklerini belirleyin ve sipariş akışına ekleyin.</p>
            <Link href="/tum-urunler" className="mt-8 inline-flex h-12 items-center gap-2 rounded-[12px] bg-[#171a16] px-6 text-sm font-semibold text-white">Ürünleri incele <ArrowLeft className="size-4 rotate-180" /></Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#171a16]">
      <Header />
      <main className="site-container py-8 sm:py-12 lg:py-14">
        <div className="mb-8 flex flex-col gap-5 border-b border-[#dfe3dc] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/tum-urunler" className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#687067] hover:text-[#171a16]"><ArrowLeft className="size-4" /> Alışverişe devam et</Link>
            <h1 className="text-[clamp(2.35rem,4.5vw,4.2rem)] font-semibold leading-[.9] tracking-[-.065em]">Sepet</h1>
            <p className="mt-3 text-sm text-[#777d74]">{getItemCount()} paket · sipariş detaylarını son kez kontrol edin.</p>
          </div>
          <button type="button" onClick={clearCart} className="inline-flex items-center gap-2 self-start text-xs font-semibold text-[#9a3b35] hover:underline"><Trash2 className="size-4" /> Sepeti temizle</button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <section className="space-y-3">
            {items.map((item, index) => {
              const totalQty = item.quantity * item.cartQuantity
              return (
                <article key={item.id} className="grid gap-5 rounded-[20px] border border-[#e0e3dd] bg-white p-4 sm:grid-cols-[120px_1fr_auto] sm:p-5">
                  <div className="relative aspect-square overflow-hidden rounded-[14px] bg-[#f2f3f0]">
                    <Image src={item.product.image} alt={item.product.name} fill sizes="120px" className="object-contain p-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="mb-4 flex items-start gap-3">
                      <span className="mt-1 text-[10px] font-bold tracking-[.12em] text-[#a0a59e]">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h2 className="text-lg font-semibold tracking-[-.025em] text-[#171a16]">{item.product.name}</h2>
                        <p className="mt-1 text-xs text-[#878d84]">{item.product.category}</p>
                      </div>
                    </div>

                    <dl className="grid gap-x-6 gap-y-2 text-xs text-[#60675e] sm:grid-cols-2">
                      <div className="flex gap-2"><dt className="text-[#9a9f98]">Adet</dt><dd className="font-medium text-[#31362f]">{item.quantity.toLocaleString('tr-TR')}</dd></div>
                      {item.selectedMaterial && <div className="flex gap-2"><dt className="text-[#9a9f98]">Malzeme</dt><dd className="font-medium text-[#31362f]">{item.selectedMaterial}</dd></div>}
                      {item.selectedSize && <div className="flex gap-2"><dt className="text-[#9a9f98]">Ölçü</dt><dd className="font-medium text-[#31362f]">{item.selectedSize === 'Özel Ölçü' && item.customWidth && item.customHeight ? `${item.customWidth} × ${item.customHeight} cm` : item.selectedSize}</dd></div>}
                      {item.selectedExtras?.length ? <div className="flex gap-2"><dt className="text-[#9a9f98]">Ekler</dt><dd className="font-medium text-[#31362f]">{item.selectedExtras.join(', ')}</dd></div> : null}
                    </dl>

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <div className="inline-flex h-9 items-center rounded-[10px] border border-[#dde1da] bg-[#fafbf8]">
                        <button type="button" onClick={() => updateQuantity(item.id, item.cartQuantity - 1)} className="flex size-9 items-center justify-center text-[#666d63] hover:text-black"><Minus className="size-3.5" /></button>
                        <span className="min-w-8 text-center text-xs font-semibold">{item.cartQuantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.cartQuantity + 1)} className="flex size-9 items-center justify-center text-[#666d63] hover:text-black"><Plus className="size-3.5" /></button>
                      </div>
                      <span className="text-xs text-[#858b82]">Toplam {totalQty.toLocaleString('tr-TR')} adet</span>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="ml-auto text-xs font-semibold text-[#9a3b35] hover:underline">Sil</button>
                    </div>
                  </div>

                  <div className="border-t border-[#eceee9] pt-4 text-left sm:min-w-28 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 sm:text-right">
                    <p className="text-xs text-[#92978f]">Paket fiyatı</p>
                    <p className="mt-1 text-xl font-semibold tracking-[-.03em]">{item.price.toLocaleString('tr-TR')} TL</p>
                    {item.cartQuantity > 1 && <p className="mt-2 text-xs font-semibold text-[#579d32]">{(item.price * item.cartQuantity).toLocaleString('tr-TR')} TL toplam</p>}
                  </div>
                </article>
              )
            })}
          </section>

          <aside className="lg:sticky lg:top-[82px] lg:h-fit">
            <div className="rounded-[20px] border border-[#dfe3dc] bg-white p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#8a9087]">Sipariş özeti</p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-[#737970]">Ürünler</span><span className="font-medium">{total.toLocaleString('tr-TR')} TL</span></div>
                <div className="flex items-center justify-between"><span className="text-[#737970]">Kargo</span><span className="font-medium text-[#579d32]">Ücretsiz</span></div>
              </div>
              <div className="my-5 border-t border-[#e8eae6]" />
              <div className="flex items-end justify-between"><span className="text-sm font-semibold">Toplam</span><span className="text-[30px] font-semibold tracking-[-.045em]">{total.toLocaleString('tr-TR')} TL</span></div>
              <p className="mt-2 text-right text-[11px] text-[#949a91]">KDV dahil</p>

              <Link href="/odeme" className="mt-6 flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[#171a16] text-sm font-semibold text-white transition hover:bg-[#2b3029]">Siparişe devam et <ArrowLeft className="size-4 rotate-180" /></Link>

              <div className="mt-6 space-y-3 border-t border-[#eceee9] pt-5">
                {[
                  [Check, 'Sipariş detaylarını sonraki adımda tekrar kontrol edebilirsiniz.'],
                  [Truck, 'Gönderim bilgileri ödeme öncesinde girilir.'],
                  [ShieldCheck, 'Dosyanız siparişinizle birlikte eşleştirilir.'],
                ].map(([Icon, text]) => {
                  const InfoIcon = Icon as typeof Check
                  return <div key={String(text)} className="flex gap-3 text-xs leading-5 text-[#6f756c]"><InfoIcon className="mt-0.5 size-4 shrink-0 text-[#579d32]" /><span>{String(text)}</span></div>
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
