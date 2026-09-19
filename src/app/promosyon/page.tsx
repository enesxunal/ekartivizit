import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryCatalog from '@/components/CategoryCatalog'
import { getProductsByCategory } from '@/data/products'

export default function PromosyonPage() {
  return (
    <div className="min-h-screen bg-[#f4f4ef]">
      <Header />
      <CategoryCatalog
        eyebrow="Promosyon"
        title="Markanızı masada, çantada ve elde taşıyan ürünler."
        description="Günlük kullanılan promosyon ürünlerini markanıza uygun baskı seçenekleriyle keşfedin."
        products={getProductsByCategory('promosyon')}
      />
      <Footer />
    </div>
  )
}
