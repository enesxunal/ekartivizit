import { PRODUCTS } from '@/data/products'

export interface CheckoutItemInput {
  productId: string
  quantity: number
  cartQuantity?: number
  selectedMaterial?: string
  selectedSize?: string
  selectedWindow?: string
  selectedExtras?: string[]
  customWidth?: string
  customHeight?: string
  customDesign?: {
    designId: string
    designTitle: string
    pdfUrl: string
    createdAt?: string
  }
}

export interface PricedCheckoutItem extends CheckoutItemInput {
  productName: string
  unitPrice: number
  lineTotal: number
}

function resolveBasePrice(item: CheckoutItemInput) {
  const product = PRODUCTS.find((entry) => entry.id === item.productId)
  if (!product) throw new Error(`Urun bulunamadi: ${item.productId}`)
  if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) throw new Error('Gecersiz urun adedi')
  if (item.selectedMaterial && !product.materials?.includes(item.selectedMaterial)) throw new Error('Gecersiz malzeme')
  if (item.selectedSize && !product.sizes?.includes(item.selectedSize)) throw new Error('Gecersiz boyut')

  const candidates = product.quantityPricing?.filter((entry) => entry.quantity === item.quantity) ?? []
  const exact = candidates.find((entry) =>
    (!entry.material || entry.material === item.selectedMaterial) &&
    (!entry.size || entry.size === item.selectedSize)
  )

  if (exact) return { product, price: exact.price }

  if (product.customSizing?.enabled && item.customWidth && item.customHeight) {
    const width = Number(item.customWidth)
    const height = Number(item.customHeight)
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < product.customSizing.minSize || height < product.customSizing.minSize || width > 200 || height > 200) {
      throw new Error('Gecersiz ozel olcu')
    }
    return { product, price: width * height * product.customSizing.pricePerCm2 * item.quantity }
  }

  throw new Error(`${product.name} icin secilen varyant/adet fiyatlandirilamadi`)
}

export function priceCheckoutItems(items: CheckoutItemInput[]) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 30) throw new Error('Gecersiz sepet')

  const priced: PricedCheckoutItem[] = items.map((item) => {
    const { product, price: basePrice } = resolveBasePrice(item)
    const extras = item.selectedExtras ?? []
    if (!Array.isArray(extras) || extras.length > 20 || new Set(extras).size !== extras.length) throw new Error('Gecersiz ek secenekler')
    if (!Number.isSafeInteger(item.cartQuantity ?? 1) || (item.cartQuantity ?? 1) < 1 || (item.cartQuantity ?? 1) > 100) throw new Error('Gecersiz sepet adedi')
    const extrasTotal = extras.reduce((sum, extraName) => {
      const extra = product.extraOptions?.find((entry) => entry.name === extraName)
      if (!extra) throw new Error(`Gecersiz ek secenek: ${extraName}`)
      return sum + extra.price
    }, 0)
    const unitPrice = basePrice + extrasTotal
    const cartQuantity = Math.max(1, Math.trunc(item.cartQuantity ?? 1))
    return {
      ...item,
      cartQuantity,
      productName: product.name,
      unitPrice,
      lineTotal: unitPrice * cartQuantity
    }
  })

  const subtotal = priced.reduce((sum, item) => sum + item.lineTotal, 0)
  return { items: priced, subtotal }
}
