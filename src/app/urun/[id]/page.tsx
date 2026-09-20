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

  const title = `${product.name} Baskı Fiyatları ve Online Sipariş`
  const description = `${product.name} baskı seçeneklerini; ölçü, malzeme ve adet bilgileriyle inceleyin. Güncel fiyatı görün, tasarım dosyanızı ekleyin ve online sipariş verin.`
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
