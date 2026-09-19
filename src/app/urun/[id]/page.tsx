import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductContent from '@/components/ProductContent'
import { getProductById } from '@/data/products'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)
  
  if (!product) {
    return (
      <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
        <Header />
        <main className="site-container py-10 sm:py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-[-0.035em] text-[#171a16] mb-4">Ürün Bulunamadı</h1>
            <Link href="/" className="text-[#59af05] hover:underline">
              Ana Sayfaya Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      <ProductContent product={product} />
      <Footer />
    </div>
  )
} 