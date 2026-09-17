import type { Order, OrderItem, Payment } from '@prisma/client'
import { PRODUCTS } from '@/data/products'

type FullOrder = Order & { items: OrderItem[]; payments?: Payment[] }
const mapStatus = (value: string) => value.toLowerCase().replaceAll('_', '-')

export function serializeOrder(order: FullOrder) {
  return {
    id: order.id,
    userId: order.userId ?? undefined,
    items: order.items.map((item) => ({
      id: item.id,
      product: PRODUCTS.find((product) => product.id === item.productId) ?? { id: item.productId, name: item.productName, description: '', category: 'kurumsal' as const, image: '', href: `/urun/${item.productId}`, gradient: '' },
      quantity: item.quantity,
      cartQuantity: item.cartQuantity,
      selectedMaterial: item.selectedMaterial ?? undefined,
      selectedSize: item.selectedSize ?? undefined,
      selectedWindow: item.selectedWindow ?? undefined,
      selectedExtras: Array.isArray(item.selectedExtras) ? item.selectedExtras : undefined,
      customWidth: item.customWidth ?? undefined,
      customHeight: item.customHeight ?? undefined,
      price: Number(item.unitPrice),
      customDesign: item.designId ? { designId: item.designId, designTitle: item.designTitle ?? 'Tasarim', pdfUrl: item.designUrl ?? '', createdAt: item.createdAt.toISOString() } : undefined
    })),
    customerInfo: { name: order.customerName, email: order.customerEmail, phone: order.customerPhone, address: { street: order.shippingStreet, city: order.shippingCity, district: order.shippingDistrict, postalCode: order.shippingPostalCode ?? '' } },
    status: mapStatus(order.status), paymentStatus: mapStatus(order.paymentStatus), paymentMethod: mapStatus(order.paymentMethod),
    subtotal: Number(order.subtotal), discount: Number(order.discount), shippingCost: Number(order.shippingCost), total: Number(order.total),
    notes: order.notes ?? undefined, trackingNumber: order.trackingNumber ?? undefined, estimatedDelivery: order.estimatedDelivery?.toISOString(),
    createdAt: order.createdAt.toISOString(), updatedAt: order.updatedAt.toISOString()
  }
}
