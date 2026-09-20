/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_URL = 'https://ekartvizit.tr'

export function WebsiteStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'E-Kartvizit',
    url: BASE_URL,
    description: 'Kartvizit, broşür, etiket, magnet ve kurumsal baskı ürünlerini online sipariş edebileceğiniz baskı platformu.',
    inLanguage: 'tr-TR',
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function OrganizationStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': `${BASE_URL}/#organization`,
    name: 'E-Kartvizit',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    email: 'info@ekartvizit.tr',
    telephone: '+90 850 840 30 11',
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@ekartvizit.tr',
      telephone: '+90 850 840 30 11',
      availableLanguage: ['tr'],
      areaServed: 'TR',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function ProductStructuredData({ product }: { product: any }) {
  const images = (product.images?.length ? product.images : [product.image]).map((image: string) =>
    image.startsWith('http') ? image : `${BASE_URL}${image}`,
  )
  const minPrice = product.price?.min ?? 0
  const maxPrice = product.price?.max ?? minPrice

  const offer = minPrice === maxPrice
    ? {
        '@type': 'Offer',
        url: `${BASE_URL}${product.href}`,
        price: minPrice,
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@id': `${BASE_URL}/#organization` },
      }
    : {
        '@type': 'AggregateOffer',
        url: `${BASE_URL}${product.href}`,
        lowPrice: minPrice,
        highPrice: maxPrice,
        priceCurrency: 'TRY',
        offerCount: product.quantityPricing?.length || 1,
      }

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE_URL}${product.href}#product`,
    sku: product.id,
    name: product.name,
    description: product.description,
    image: images,
    url: `${BASE_URL}${product.href}`,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'E-Kartvizit',
    },
    material: product.materials?.join(', '),
    offers: offer,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function FaqStructuredData({ items }: { items: Array<{ question: string; answer: string }> }) {
  if (!items.length) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BlogPostingStructuredData({
  title,
  description,
  url,
  image,
  datePublished,
  author = 'E-Kartvizit Editör',
}: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  author?: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
    datePublished,
    dateModified: datePublished,
    inLanguage: 'tr-TR',
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
