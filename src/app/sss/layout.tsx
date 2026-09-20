import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sık Sorulan Sorular',
  description: 'E-Kartvizit sipariş, baskı dosyası, üretim, kargo, fiyatlandırma ve kurumsal baskı süreçleri hakkında sık sorulan sorular.',
  alternates: { canonical: 'https://ekartvizit.tr/sss' },
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
