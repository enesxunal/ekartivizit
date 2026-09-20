import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tüm Baskı Ürünleri ve Güncel Fiyatlar',
  description: 'Kartvizit, broşür, sticker, magnet, zarf, antetli kağıt, promosyon ve diğer baskı ürünlerini tek katalogda inceleyin.',
  alternates: { canonical: 'https://ekartvizit.tr/tum-urunler' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
