'use client'

import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function WhatsAppButton() {
  const pathname = usePathname()
  const hideOnProductMobile = pathname.startsWith('/urun/')

  const handleWhatsApp = () => {
    const message = 'Merhaba! E-Kartvizit hizmetleriniz hakkında bilgi almak istiyorum.'
    window.open(`https://wa.me/908508403011?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <button
      onClick={handleWhatsApp}
      className={`${hideOnProductMobile ? 'hidden sm:inline-flex' : 'inline-flex'} fixed bottom-5 right-5 z-50 h-11 items-center gap-2 rounded-full border border-white/10 bg-[#171a16] px-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(16,24,16,.18)] transition hover:-translate-y-0.5 hover:bg-[#579d32] sm:bottom-6 sm:right-6 sm:h-12 sm:px-4`}
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="size-4" />
      <span className="hidden sm:inline">WhatsApp</span>
    </button>
  )
}
