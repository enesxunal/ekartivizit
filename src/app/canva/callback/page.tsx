'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function CanvaCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    if (error) {
      // Hata durumunda parent window'a bildir ve kapat
      if (window.opener) {
        window.opener.postMessage({
          type: 'canva-auth-error',
          error: error,
          description: searchParams.get('error_description')
        }, window.location.origin)
        window.close()
      } else {
        router.push('/')
      }
      return
    }

    if (code) {
      // Başarılı durumda parent window'a kodu gönder
      if (window.opener) {
        window.opener.postMessage({
          type: 'canva-auth-success',
          code: code,
          state: state
        }, window.location.origin)
        window.close()
      } else {
        // Popup değilse ana sayfaya yönlendir
        router.push('/')
      }
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#59af05]" />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Canva'ya Bağlanıyor...
        </h2>
        <p className="text-gray-600">
          Lütfen bekleyiniz, yönlendiriliyorsunuz.
        </p>
      </div>
    </div>
  )
} 