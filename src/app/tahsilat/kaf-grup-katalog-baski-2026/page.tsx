import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import KafPaymentContent from '@/components/KafPaymentContent'
import { PRODUCTS } from '@/data/products'
import { db } from '@/lib/server/db'
import { KAF_PAYMENT_PRODUCT_ID, isKafPaymentExpired } from '@/lib/kaf-payment'

export const metadata: Metadata = {
  title: 'KAF Grup Katalog Baskı Ödemesi | E Kartvizit',
  description: 'KAF Grup katalog baskısı için özel tahsilat sayfası.',
  robots: { index: false, follow: false, noarchive: true },
}

export const dynamic = 'force-dynamic'

export default async function KafPaymentPage() {
  const product = PRODUCTS.find((entry) => entry.id === KAF_PAYMENT_PRODUCT_ID)
  const expired = isKafPaymentExpired()
  const alreadyPaid = expired ? false : Boolean(await db.order.findFirst({
    where: { paymentStatus: 'PAID', items: { some: { productId: KAF_PAYMENT_PRODUCT_ID } } },
    select: { id: true },
  }))

  if (!product || expired || alreadyPaid) {
    return (
      <div className="min-h-screen bg-[#f7f8f5]">
        <Header />
        <main className="site-container mx-auto max-w-2xl py-20 text-center">
          <h1 className="text-2xl font-semibold text-[#171a16]">
            {alreadyPaid ? 'Bu ödeme tamamlandı' : 'Ödeme bağlantısının süresi doldu'}
          </h1>
          <p className="mt-3 text-sm text-[#60685f]">
            {alreadyPaid
              ? 'Bu bağlantı üzerinden yeni tahsilat yapılamaz.'
              : 'Yeni ödeme bağlantısı için E Kartvizit ile iletişime geçebilirsiniz.'}
          </p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <Header />
      <KafPaymentContent product={product} />
      <Footer />
    </div>
  )
}
