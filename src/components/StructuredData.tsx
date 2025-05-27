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
export const WebsiteStructuredData = () => (
  <StructuredData
    type="website"
    data={{
      publisher: {
        '@type': 'Organization',
        name: 'E-Kartvizit',
        logo: {
          '@type': 'ImageObject',
          url: 'https://e-kartvizit.com/logo.png',
        },
      },
    }}
  />
)

export const OrganizationStructuredData = () => (
  <StructuredData
    type="organization"
    data={{
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
        addressLocality: 'İstanbul',
      },
      foundingDate: '2024',
      numberOfEmployees: '1-10',
    }}
  />
) 