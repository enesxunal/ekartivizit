import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kurumsal Baskı Ürünleri',
  description: 'Kartvizit, antetli kağıt, zarf, makbuz ve cepli dosya gibi kurumsal baskı ürünlerini güncel fiyatlarla online sipariş edin.',
  alternates: { canonical: 'https://ekartvizit.tr/kurumsal' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
