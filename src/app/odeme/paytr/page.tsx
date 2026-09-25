'use client'

import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PaytrPaymentPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
        <Header />
        <main className="site-container py-12 text-center">
          <h1 className="text-2xl font-semibold">Ödeme oturumu bulunamadı.</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      <main className="site-container max-w-5xl py-8 sm:py-10">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold tracking-[-0.035em]">Güvenli Ödeme</h1>
          <p className="mt-2 text-sm text-[#687067]">Kart bilgileriniz PayTR güvenli ödeme ekranında işlenir.</p>
        </div>
        <div className="overflow-hidden rounded-[20px] border border-black/8 bg-white">
          <iframe
            src={`https://www.paytr.com/odeme/guvenli/${encodeURIComponent(token)}`}
            title="PayTR Güvenli Ödeme"
            className="min-h-[760px] w-full border-0"
            allow="payment"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
