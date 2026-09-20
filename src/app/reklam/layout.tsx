import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reklam ve Tanıtım Baskı Ürünleri',
  description: 'Broşür, magnet, sticker ve etiket gibi reklam ve tanıtım baskı ürünlerini ölçü, malzeme ve adet seçenekleriyle online sipariş edin.',
  alternates: { canonical: 'https://ekartvizit.tr/reklam' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
