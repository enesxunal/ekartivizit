import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductContent from '@/components/ProductContent'
import ProductSeoContent from '@/components/ProductSeoContent'
import { BreadcrumbStructuredData, FaqStructuredData, ProductStructuredData } from '@/components/StructuredData'
import { getProductById } from '@/data/products'
import { getProductSeo } from '@/data/productSeo'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product || product.id.startsWith('test-')) {
    return { title: 'Ürün Bulunamadı', robots: { index: false, follow: false } }
  }

  const seoMeta: Record<string, { title: string; description: string }> = {
    kartvizit: {
      title: 'Kartvizit Fiyatları 2026 | 1000 Adet Kartvizit Baskı',
      description: 'Kartvizit baskı fiyatlarını gramaj ve adede göre karşılaştırın. 1000 ve 2000 adet kartvizit seçeneklerinde güncel fiyatı görün, dosyanızı yükleyip online sipariş verin.',
    },
    brosur: {
      title: 'Broşür Baskı Fiyatları 2026 | A4 ve A5 Broşür Basımı',
      description: 'A4 ve A5 broşür baskı fiyatlarını 115 gr ve 130 gr kağıt seçenekleriyle karşılaştırın. 1000 ve 2000 adet broşür için güncel fiyatı görün ve online sipariş verin.',
    },
    magnet: {
      title: 'Magnet Baskı Fiyatları 2026 | 1000 Adet Magnet Basım',
      description: '1000 adet magnet baskı fiyatını ve 46×68 mm magnet özelliklerini inceleyin. KDV ve kargo dahil güncel fiyatı görün, tasarım dosyanızı ekleyip sipariş verin.',
    },
    'antetli-kagit': {
      title: 'Antetli Kağıt Baskı Fiyatları | A4 ve A5 Antetli Kağıt',
      description: 'A4 ve A5 antetli kağıt baskı seçeneklerini, adetleri ve güncel fiyatları karşılaştırın. Kurumsal antetli kağıdınızı online sipariş edin.',
    },
    etiket: {
      title: 'Sticker ve Etiket Baskı Fiyatları | Özel Kesim Etiket',
      description: 'Sticker ve etiket baskı fiyatlarını ölçü, kesim ve adet seçeneklerine göre karşılaştırın. Standart ve özel kesim etiketlerin güncel fiyatını görün.',
    },
    zarf: {
      title: 'Zarf Baskı Fiyatları | Diplomat ve Torba Zarf Baskısı',
      description: 'Diplomat, torba A5 ve torba A4 zarf baskı seçeneklerini ve güncel fiyatları karşılaştırın. Kurumsal baskılı zarf siparişinizi online oluşturun.',
    },
    makbuz: {
      title: 'Makbuz Baskı Fiyatları | NCR Karbonlu Otocopy Makbuz',
      description: 'NCR karbonlu, numaralı makbuz baskı seçeneklerini ölçü ve adet bazında karşılaştırın. Güncel makbuz baskı fiyatlarını inceleyip online sipariş verin.',
    },
    'cepli-dosya': {
      title: 'Cepli Dosya Baskı Fiyatları | A4 Kurumsal Sunum Dosyası',
      description: 'A4 cepli dosya baskı seçeneklerini, Bristol kağıt ve adet alternatifleriyle karşılaştırın. Kurumsal sunum dosyanız için güncel fiyatı görün.',
    },
    'arac-magnet': {
      title: 'Araç Magnet Baskı Fiyatları | Mıknatıslı Araç Reklamı',
      description: '20×60 ve 30×60 cm araç magnet baskı seçeneklerini ve güncel fiyatları karşılaştırın. Sökülebilir mıknatıslı araç reklamınızı online sipariş edin.',
    },
    'yelken-bayrak': {
      title: 'Yelken Bayrak Baskı Fiyatları | 75×300 cm Reklam Bayrağı',
      description: '75×300 cm yelken bayrak baskı fiyatını, polyester kumaş ve dijital baskı özellikleriyle inceleyin. Açık hava reklam bayrağınızı online sipariş edin.',
    },
    'plastik-kalem': {
      title: 'Logolu Kalem Baskı Fiyatları | Promosyon Plastik Kalem',
      description: '100 adet logolu plastik kalem baskı fiyatını inceleyin. Kurumsal promosyon kalemlerinizi 4 renk baskı seçeneğiyle online sipariş edin.',
    },
    cakmak: {
      title: 'Logolu Çakmak Baskı Fiyatları | Promosyon Çakmak',
      description: '100 adet logolu promosyon çakmak baskı fiyatını inceleyin. 4 renk baskılı kurumsal çakmak siparişinizi online oluşturun.',
    },
    'seramik-kupa': {
      title: 'Kupa Baskı Fiyatları | Logolu Seramik Kupa Baskısı',
      description: 'Logolu seramik kupa baskı fiyatını ve 10 adet sipariş seçeneğini inceleyin. Kurumsal veya promosyon kupa baskınızı online sipariş edin.',
    },
    takvim: {
      title: 'Takvim Baskı Fiyatları | Masaüstü Piramit Takvim Baskısı',
      description: '100, 250, 500 ve 1000 adet masaüstü piramit takvim baskı fiyatlarını karşılaştırın. 12 yapraklı kurumsal takviminizi online sipariş edin.',
    },
  }

  const meta = seoMeta[product.id]
  const title = meta?.title ?? `${product.name} Baskı Fiyatları ve Online Sipariş`
  const description = meta?.description ?? `${product.name} baskı seçeneklerini; ölçü, malzeme ve adet bilgileriyle inceleyin. Güncel fiyatı görün, tasarım dosyanızı ekleyin ve online sipariş verin.`
  const url = `https://ekartvizit.tr${product.href}`
  const image = product.image.startsWith('http') ? product.image : `https://ekartvizit.tr${product.image}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url,
      title,
      description,
      images: [{ url: image, alt: `${product.name} baskı` }],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)
  const seoContent = getProductSeo(id)

  if (!product || product.id.startsWith('test-')) {
    return (
      <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
        <Header />
        <main className="site-container py-8 sm:py-10 lg:py-12">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-semibold tracking-[-0.035em] text-[#171a16]">Ürün Bulunamadı</h1>
            <Link href="/tum-urunler" className="text-[#579d32] hover:underline">Tüm ürünlere dön</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <ProductStructuredData product={product} />
      {seoContent?.faq?.length ? <FaqStructuredData items={seoContent.faq} /> : null}
      <BreadcrumbStructuredData
        items={[
          { name: 'Ana Sayfa', url: 'https://ekartvizit.tr' },
          { name: product.category === 'kurumsal' ? 'Kurumsal' : product.category === 'reklam' ? 'Reklam & Tanıtım' : 'Promosyon', url: `https://ekartvizit.tr/${product.category}` },
          { name: product.name, url: `https://ekartvizit.tr${product.href}` },
        ]}
      />
      <Header />
      <ProductContent product={product} />
      <ProductSeoContent product={product} />
      <Footer />
    </div>
  )
}
