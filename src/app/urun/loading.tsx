import { Skeleton } from '@/components/ui/skeleton'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Ürün Görseli */}
          <div className="space-y-4">
            <Skeleton className="w-full h-96 rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              <Skeleton className="h-20 rounded" />
              <Skeleton className="h-20 rounded" />
              <Skeleton className="h-20 rounded" />
              <Skeleton className="h-20 rounded" />
            </div>
          </div>

          {/* Ürün Bilgileri */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-10 rounded" />
                <Skeleton className="h-10 rounded" />
                <Skeleton className="h-10 rounded" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-1/4" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 rounded" />
                <Skeleton className="h-10 rounded" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-12 rounded" />
            </div>

            <Skeleton className="h-12 w-full rounded" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 