import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baskı Dosyası Yükleme ve Tasarım',
  description: 'Kartvizit, broşür ve desteklenen baskı ürünleri için PDF dosyanızı yükleyin veya tasarım akışını başlatın.',
  alternates: { canonical: 'https://ekartvizit.tr/tasarim' },
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
