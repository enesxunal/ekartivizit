'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}

// Analytics olayları için yardımcı fonksiyonlar
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

interface PurchaseItem {
  item_id: string
  item_name: string
  category: string
  quantity: number
  price: number
}

export const trackPurchase = (transactionId: string, value: number, items: PurchaseItem[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'TRY',
      items: items,
    })
  }
}

export const trackProductView = (productId: string, productName: string, category: string, price: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'TRY',
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          category: category,
          price: price,
        },
      ],
    })
  }
}

export const trackAddToCart = (productId: string, productName: string, category: string, price: number, quantity: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'TRY',
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          category: category,
          quantity: quantity,
          price: price,
        },
      ],
    })
  }
}

// TypeScript için global gtag tanımı
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
    dataLayer: unknown[]
  }
} 