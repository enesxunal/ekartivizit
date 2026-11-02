'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order')
  const [retrying, setRetrying] = useState(false)
  const [error, setError] = useState('')

  const retryPayment = async () => {
    if (!orderId || retrying) return
    setRetrying(true); setError('')
    try {
      const response = await fetch('/api/paytr/token', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      })
      const result = await response.json()
      if (!response.ok || !result.success || !result.token) throw new Error(result.message || 'Ödeme yeniden başlatılamadı.')
      if (result.testMode) throw new Error('Ödeme sağlayıcısı test modunda. Gerçek tahsilat için destekle iletişime geçin.')
      router.push('/odeme/paytr?token=' + encodeURIComponent(result.token) + '&order=' + encodeURIComponent(orderId))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Bağlantı hatası.')
    } finally { setRetrying(false) }
  }

  return <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
    <Header />
    <main className="site-container max-w-3xl py-14 text-center">
      <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.05em]">Ödeme tamamlanamadı</h1>
      <p className="mx-auto mt-4 max-w-xl text-[#687067]">
        Kart işlemi onaylanmadı veya ödeme sayfası kapatıldı. Yeni sipariş oluşturmadan aynı sipariş için tekrar deneyebilirsiniz.
        Bankanızdan tahsilat yapıldığını görüyorsanız tekrar ödeme yapmadan önce destekten doğrulama isteyin.
      </p>
      {orderId && <p className="mt-3 break-all text-xs text-[#647163]">Sipariş: {orderId}</p>}
      {error && <p role="alert" className="mx-auto mt-5 max-w-xl rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {orderId && <Button onClick={() => void retryPayment()} disabled={retrying} className="rounded-full bg-[#171a16] hover:bg-black">{retrying ? 'Ödeme başlatılıyor…' : 'Aynı Sipariş İçin Tekrar Dene'}</Button>}
        <Link href={orderId ? '/siparis/' + encodeURIComponent(orderId) : '/sepet'}><Button variant="outline" className="rounded-full">Siparişi Görüntüle</Button></Link>
        <Link href="/iletisim"><Button variant="outline" className="rounded-full">Destek</Button></Link>
      </div>
    </main>
    <Footer />
  </div>
}
