import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import { getPopularProducts } from '@/data/products'

export default function CokSatanlarPage() {
  const products = getPopularProducts().filter((product) => !product.id.startsWith('test-'))
  return (
    <div className="min-h-screen bg-[#f4f4ef]">
      <Header />
      <PageHero
        eyebrow="Çok satanlar"
        title="En sık tekrar sipariş edilen ürünler."
        description="Günlük kullanımda en çok tercih edilen baskı ürünlerini hızlıca karşılaştırın ve ürün detayından seçeneklerinizi belirleyin."
        actionHref="/tum-urunler"
        actionLabel="Tüm kataloğu görüntüle"
      />
      <main className="site-container py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} eyebrow="Çok satan" />)}
        </div>
      </main>
      <Footer />
    </div>
  )
}
