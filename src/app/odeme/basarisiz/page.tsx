'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      <main className="site-container max-w-3xl py-14 text-center">
        <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.05em]">Ödeme tamamlanamadı</h1>
        <p className="mx-auto mt-4 max-w-xl text-[#687067]">Kart işlemi onaylanmadı veya ödeme süreci tamamlanmadan kapatıldı. Siparişiniz için tekrar ödeme deneyebilirsiniz.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={orderId ? `/siparis/${encodeURIComponent(orderId)}` : '/sepet'}>
            <Button className="rounded-full bg-[#171a16] hover:bg-black">Siparişe Dön</Button>
          </Link>
          <Link href="/iletisim">
            <Button variant="outline" className="rounded-full">Destek</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
