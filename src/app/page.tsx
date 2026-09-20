import type { Metadata } from 'next'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import CategoryProducts from '@/components/CategoryProducts'
import WhyChooseUs from '@/components/WhyChooseUs'
import PopularProducts from '@/components/PopularProducts'
import Footer from '@/components/Footer'
import { WebsiteStructuredData, OrganizationStructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  alternates: { canonical: 'https://ekartvizit.tr' },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f4ef]">
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      <Header />
      <main>
        <HeroSection />
        <CategoryProducts />
        <WhyChooseUs />
        <PopularProducts />
      </main>
      <Footer />
    </div>
  )
}
