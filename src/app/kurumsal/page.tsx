import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryCatalog from '@/components/CategoryCatalog'
import { getProductsByCategory } from '@/data/products'

export default function KurumsalPage() {
  return (
    <div className="min-h-screen bg-[#f4f4ef]">
      <Header />
      <CategoryCatalog
        eyebrow="Kurumsal baskılar"
        title="Markanızın günlük temas noktaları."
        description="Kartvizitten antetli kağıda, zarftan dosyaya kadar işletmenizin her temasında aynı kurumsal dili taşıyan baskı ürünleri."
        products={getProductsByCategory('kurumsal')}
      />
      <Footer />
    </div>
  )
}
