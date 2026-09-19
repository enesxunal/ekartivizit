import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'

const columns = [
  {
    title: 'Ürünler',
    links: [
      ['Tüm Ürünler', '/tum-urunler'],
      ['Kurumsal', '/kurumsal'],
      ['Reklam', '/reklam'],
      ['Promosyon', '/promosyon'],
      ['Çok Satanlar', '/cok-satanlar'],
    ],
  },
  {
    title: 'Sipariş',
    links: [
      ['Tasarımını Yükle', '/tasarim'],
      ['Sepet', '/sepet'],
      ['Sipariş Takip', '/siparis-takip'],
      ['Hesabım', '/hesabim'],
      ['Sık Sorulanlar', '/sss'],
    ],
  },
  {
    title: 'E-Kartvizit',
    links: [
      ['Hakkımızda', '/hakkimizda'],
      ['İletişim', '/iletisim'],
      ['Blog', '/blog'],
      ['Gizlilik', '/gizlilik-politikasi'],
      ['Kullanım Şartları', '/kullanim-sartlari'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#171a16] text-white">
      <div className="site-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 border-b border-white/12 pb-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:pb-16">
          <div>
            <Image src="/logo.png" alt="E-Kartvizit" width={150} height={46} className="mb-8 h-11 w-auto brightness-0 invert" />
            <p className="max-w-xl text-[clamp(2rem,4.2vw,4.4rem)] font-semibold leading-[.94] tracking-[-0.055em] text-white">
              Baskıyı daha kolay sipariş edilen bir ürüne dönüştürüyoruz.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="text-sm font-medium text-white/72 transition hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-col gap-3 text-sm text-white/64 sm:flex-row sm:gap-6">
            <a href="tel:+908508403011" className="inline-flex items-center gap-2 transition hover:text-white">
              <Phone className="size-4" /> 0 850 840 30 11
            </a>
            <a href="mailto:info@ekartvizit.tr" className="inline-flex items-center gap-2 transition hover:text-white">
              <Mail className="size-4" /> info@ekartvizit.tr
            </a>
          </div>
          <Link href="/iletisim" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9fe468]">
            Bize ulaşın <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/12 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} E-Kartvizit. Tüm hakları saklıdır.</span>
          <span>Online baskı sipariş platformu</span>
        </div>
      </div>
    </footer>
  )
}
