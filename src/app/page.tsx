import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import PopularProducts from '@/components/PopularProducts'
import DesignTemplates from '@/components/DesignTemplates'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <PopularProducts />
        <DesignTemplates />
      </main>
      <Footer />
    </div>
  )
}
