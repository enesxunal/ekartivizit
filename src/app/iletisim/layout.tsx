import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'E-Kartvizit ürün, baskı dosyası ve sipariş süreçleri hakkında iletişim bilgileri ve destek kanalları.',
  alternates: { canonical: 'https://ekartvizit.tr/iletisim' },
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
