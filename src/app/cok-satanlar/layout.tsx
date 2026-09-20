import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Çok Satan Baskı Ürünleri',
  description: 'En sık tercih edilen kartvizit, broşür, etiket ve diğer baskı ürünlerini inceleyin.',
  alternates: { canonical: 'https://ekartvizit.tr/cok-satanlar' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
