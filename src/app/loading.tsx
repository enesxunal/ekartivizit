import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#59af05]/10 rounded-full mb-4">
          <Loader2 className="w-8 h-8 text-[#59af05] animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Yükleniyor...
        </h2>
        <p className="text-gray-600">
          Sayfa içeriği hazırlanıyor
        </p>
      </div>
    </div>
  )
} 