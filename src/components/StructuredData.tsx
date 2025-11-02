/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from 'next/script'

interface StructuredDataProps {
  type: 'website' | 'product' | 'organization' | 'breadcrumb'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'E-Kartvizit',
          url: 'https://e-kartvizit.com',
          description: 'Profesyonel baskı çözümleri ve online tasarım hizmetleri',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://e-kartvizit.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
          ...data,
        }

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'E-Kartvizit',
          url: 'https://e-kartvizit.com',
          logo: 'https://e-kartvizit.com/logo.png',
          description: 'Kartvizit, broşür, magnet ve kurumsal baskı ürünleri için online tasarım ve baskı hizmetleri',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+90-XXX-XXX-XXXX',
            contactType: 'customer service',
            availableLanguage: 'Turkish',
          },
          sameAs: [
            'https://facebook.com/ekartvizit',
            'https://instagram.com/ekartvizit',
            'https://twitter.com/ekartvizit',
          ],
          ...data,
        }

      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          description: data.description,
          image: data.image,
          brand: {
            '@type': 'Brand',
            name: 'E-Kartvizit',
          },
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'E-Kartvizit',
            },
          },
          category: data.category,
        }

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }

      default:
        return data
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData()),
      }}
    />
  )
}

// Önceden tanımlanmış structured data'lar
export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "E-Kartvizit",
    "description": "Profesyonel baskı çözümleri - Kartvizit, broşür, magnet ve kurumsal baskı ürünleri",
    "url": "https://ekartvizit.co",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ekartvizit.co/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/ekartvizit",
      "https://www.instagram.com/ekartvizit",
      "https://twitter.com/ekartvizit"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "E-Kartvizit",
    "description": "Profesyonel baskı çözümleri ve online tasarım hizmetleri",
    "url": "https://ekartvizit.co",
    "logo": "https://ekartvizit.co/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-XXX-XXX-XXXX",
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": ["Turkish", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": "İstanbul",
      "addressRegion": "İstanbul"
    },
    "sameAs": [
      "https://www.facebook.com/ekartvizit",
      "https://www.instagram.com/ekartvizit",
      "https://twitter.com/ekartvizit"
    ],
    "foundingDate": "2024",
    "numberOfEmployees": "10-50",
    "serviceArea": {
      "@type": "Country",
      "name": "Turkey"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ProductStructuredData({ product }: { product: any }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "E-Kartvizit"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "TRY",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "E-Kartvizit"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 4.5,
      "reviewCount": product.reviewCount || 10
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "E-Kartvizit",
    "description": "Profesyonel baskı çözümleri ve online tasarım hizmetleri",
    "url": "https://ekartvizit.co",
    "logo": "https://ekartvizit.co/logo.png",
    "image": "https://ekartvizit.co/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": "İstanbul",
      "addressRegion": "İstanbul"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-XXX-XXX-XXXX",
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": ["Turkish", "English"]
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "₺₺",
    "servesCuisine": "Baskı ve Tasarım Hizmetleri",
    "sameAs": [
      "https://www.facebook.com/ekartvizit",
      "https://www.instagram.com/ekartvizit",
      "https://twitter.com/ekartvizit"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 