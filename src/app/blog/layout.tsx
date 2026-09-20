import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baskı Rehberi ve Matbaa Blogu',
  description: 'Kartvizit, broşür, sticker, magnet ve kurumsal baskı ürünleri için fiyat, ölçü, kağıt, tasarım ve baskı dosyası rehberleri.',
  alternates: { canonical: 'https://ekartvizit.tr/blog' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://ekartvizit.tr/blog',
    title: 'Baskı Rehberi ve Matbaa Blogu | E-Kartvizit',
    description: 'Online baskı siparişi öncesi ölçü, kağıt, fiyat ve dosya hazırlama rehberleri.',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
