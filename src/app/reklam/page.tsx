import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryCatalog from '@/components/CategoryCatalog'
import { getProductsByCategory } from '@/data/products'

export default function ReklamPage() {
  return (
    <div className="min-h-screen bg-[#f4f4ef]">
      <Header />
      <CategoryCatalog
        eyebrow="Reklam ve tanıtım"
        title="Daha görünür olmak için üretilen baskılar."
        description="Broşür, magnet, etiket ve saha iletişiminde kullanılan baskı ürünlerini ölçü, malzeme ve adet seçenekleriyle karşılaştırın."
        products={getProductsByCategory('reklam')}
      />
      <Footer />
    </div>
  )
}
