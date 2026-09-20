import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Promosyon Ürünleri ve Baskı',
  description: 'Kalem, kupa, çakmak, takvim ve tanıtım ürünlerini markanıza özel baskı seçenekleriyle inceleyin.',
  alternates: { canonical: 'https://ekartvizit.tr/promosyon' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
