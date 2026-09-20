import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'E-Kartvizit; kartvizit, broşür, etiket, magnet, kurumsal baskı ve promosyon ürünlerini online sipariş akışıyla sunan baskı platformudur.',
  alternates: { canonical: 'https://ekartvizit.tr/hakkimizda' },
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
