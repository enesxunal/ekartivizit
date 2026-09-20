import { PRODUCTS, type Product } from '@/data/products'

const BASE_URL = 'https://ekartvizit.tr'

function escapeXml(value: string | number) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getDefaultOffer(product: Product) {
  const material = product.materials?.[0]
  const size = product.sizes?.[0]
  const candidates = (product.quantityPricing || []).filter((pricing) => {
    const materialMatch = !pricing.material || !material || pricing.material === material
    const sizeMatch = !pricing.size || !size || pricing.size === size
    return materialMatch && sizeMatch
  })

  const sorted = [...candidates].sort((a, b) => a.quantity - b.quantity)
  const exactMin = sorted.find((pricing) => pricing.quantity === product.minQuantity)
  const selected = exactMin || sorted[0]

  return {
    quantity: selected?.quantity || product.minQuantity || 1,
    price: selected?.price || product.price?.min || 0,
    material: selected?.material || material,
    size: selected?.size || size,
  }
}

function buildTitle(product: Product, offer: ReturnType<typeof getDefaultOffer>) {
  const parts = [`${product.name} Baskı`]
  if (offer.quantity) parts.push(`${offer.quantity.toLocaleString('tr-TR')} Adet`)
  if (offer.size && offer.size !== 'Standart Boy' && offer.size !== 'Standart Kupa') parts.push(offer.size)
  if (offer.material) parts.push(offer.material)
  return parts.join(' - ').slice(0, 150)
}

function buildDescription(product: Product, offer: ReturnType<typeof getDefaultOffer>) {
  const details = [
    product.description,
    offer.quantity ? `${offer.quantity.toLocaleString('tr-TR')} adet` : '',
    offer.size || '',
    offer.material || '',
    'KDV ve kargo dahil.',
  ].filter(Boolean)

  return details.join(' ').slice(0, 5000)
}

function productType(product: Product) {
  const category =
    product.category === 'kurumsal'
      ? 'Kurumsal Baskı'
      : product.category === 'reklam'
        ? 'Reklam ve Tanıtım'
        : 'Promosyon'

  return `Baskı Ürünleri > ${category} > ${product.name}`
}

function itemXml(product: Product) {
  const offer = getDefaultOffer(product)
  const link = new URL(product.href, BASE_URL).toString()
  const imageLink = new URL(product.image, BASE_URL).toString()

  return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(buildTitle(product, offer))}</g:title>
      <g:description>${escapeXml(buildDescription(product, offer))}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(imageLink)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${escapeXml(offer.price.toFixed(2))} TRY</g:price>
      <g:brand>E-Kartvizit</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${escapeXml(productType(product))}</g:product_type>
      <g:custom_label_0>${escapeXml(product.category)}</g:custom_label_0>
      <g:shipping>
        <g:country>TR</g:country>
        <g:service>Standart Kargo</g:service>
        <g:price>0.00 TRY</g:price>
      </g:shipping>
    </item>`
}

export async function GET() {
  const products = PRODUCTS.filter((product) => !product.id.startsWith('test-'))
  const updated = new Date().toUTCString()
  const items = products.map(itemXml).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>E-Kartvizit Ürün Feed'i</title>
    <link>${BASE_URL}</link>
    <description>E-Kartvizit online baskı ürünleri</description>
    <pubDate>${updated}</pubDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
