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

  const candidates = product.quantityPricing?.filter((entry) => entry.quantity === item.quantity) ?? []
  const exact = candidates.find((entry) =>
    (!entry.material || entry.material === item.selectedMaterial) &&
    (!entry.size || entry.size === item.selectedSize)
  )

  if (exact) return { product, price: exact.price }

  if (product.customSizing?.enabled && item.customWidth && item.customHeight) {
    const width = Number(item.customWidth)
    const height = Number(item.customHeight)
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      throw new Error('Gecersiz ozel olcu')
    }
    return { product, price: width * height * product.customSizing.pricePerCm2 * item.quantity }
  }

  throw new Error(`${product.name} icin secilen varyant/adet fiyatlandirilamadi`)
}

export function priceCheckoutItems(items: CheckoutItemInput[]) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('Sepet bos')

  const priced: PricedCheckoutItem[] = items.map((item) => {
    const { product, price: basePrice } = resolveBasePrice(item)
    const extras = item.selectedExtras ?? []
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
