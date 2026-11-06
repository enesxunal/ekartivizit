import crypto from 'node:crypto'
import { NextResponse } from 'next/server'
import { PaymentMethod } from '@prisma/client'
import { db } from '@/lib/server/db'
import { getCurrentUser } from '@/lib/server/session'
import { priceCheckoutItems, type CheckoutItemInput } from '@/lib/server/order-pricing'
import { serializeOrder } from '@/lib/server/serialize-order'
import { isAdminSession } from '@/lib/admin-auth'
import { setOrderAccess } from '@/lib/server/order-access'
import { KAF_PAYMENT_PRODUCT_IDS, KAF_PAYMENT_AMOUNT, isKafPaymentExpired } from '@/lib/kaf-payment'

const discountCodes: Record<string, number> = { WELCOME10: 10, SAVE20: 20, FIRST50: 50, STUDENT15: 15 }
const paymentMethods: Record<string, PaymentMethod> = {
  whatsapp: 'WHATSAPP',
  'credit-card': 'CREDIT_CARD',
  'bank-transfer': 'BANK_TRANSFER',
  'cash-on-delivery': 'CASH_ON_DELIVERY'
}
const createOrderId = () => `EK${Date.now().toString().slice(-7)}${crypto.randomBytes(3).toString('hex').toUpperCase()}`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const customer = body.customerInfo ?? {}
    const address = customer.address ?? {}
    if (!customer.name || !customer.email || !customer.phone || !address.street || !address.city || !address.district) {
      return NextResponse.json({ success: false, message: 'Musteri veya adres bilgileri eksik.' }, { status: 400 })
    }

    const normalizedItems: CheckoutItemInput[] = (body.items ?? []).map((item: Record<string, unknown>) => {
      const product = item.product as { id?: string } | undefined
      return {
        productId: String(item.productId ?? product?.id ?? ''),
        quantity: Number(item.quantity),
        cartQuantity: Number(item.cartQuantity ?? 1),
        selectedMaterial: item.selectedMaterial ? String(item.selectedMaterial) : undefined,
        selectedSize: item.selectedSize ? String(item.selectedSize) : undefined,
        selectedWindow: item.selectedWindow ? String(item.selectedWindow) : undefined,
        selectedExtras: Array.isArray(item.selectedExtras) ? item.selectedExtras.map(String) : undefined,
        customWidth: item.customWidth ? String(item.customWidth) : undefined,
        customHeight: item.customHeight ? String(item.customHeight) : undefined,
        customDesign: item.customDesign as CheckoutItemInput['customDesign']
      }
    })

    const kafProductIds = new Set<string>(KAF_PAYMENT_PRODUCT_IDS)
    const kafRequest = normalizedItems.some((item) => kafProductIds.has(item.productId))
    if (kafRequest && isKafPaymentExpired()) return NextResponse.json({ success: false, message: 'Baglantinin suresi doldu.' }, { status: 410 })
    if (kafRequest && (
      normalizedItems.length !== 2 ||
      new Set(normalizedItems.map(item => item.productId)).size !== 2 ||
      normalizedItems.some(item => !kafProductIds.has(item.productId) || item.quantity !== 1 || item.cartQuantity !== 1 ||
        item.selectedMaterial || item.selectedSize || item.selectedExtras?.length || item.customDesign) ||
      body.discountCode || body.paymentMethod !== 'credit-card'
    )) return NextResponse.json({ success: false, message: 'KAF Grup katalog ve web sitesi kalemleri tek seferde kartla odenmelidir.' }, { status: 400 })

    if (kafRequest && await db.order.findFirst({ where: { paymentStatus: 'PAID', items: { some: { productId: { in: [...KAF_PAYMENT_PRODUCT_IDS] } } } }, select: { id: true } })) {
      return NextResponse.json({ success: false, message: 'Bu baglanti icin odeme tamamlandi.' }, { status: 409 })
    }

    const priced = priceCheckoutItems(normalizedItems)
    if (kafRequest && priced.subtotal !== KAF_PAYMENT_AMOUNT) {
      return NextResponse.json({ success: false, message: 'Ozel tahsilat tutari gecersiz.' }, { status: 400 })
    }
    const code = body.discountCode ? String(body.discountCode).toUpperCase() : ''
    const percent = code ? (discountCodes[code] ?? 0) : 0
    if (code && !percent) return NextResponse.json({ success: false, message: 'Gecersiz indirim kodu.' }, { status: 400 })
    const discount = Math.round(priced.subtotal * percent) / 100
    const shippingCost = 0
    const total = priced.subtotal - discount + shippingCost
    const paymentMethod = paymentMethods[String(body.paymentMethod)]
    if (!paymentMethod) return NextResponse.json({ success: false, message: 'Gecersiz odeme yontemi.' }, { status: 400 })
    const currentUser = await getCurrentUser()

    const order = await db.order.create({
      data: {
        id: createOrderId(),
        userId: currentUser?.id,
        customerName: String(customer.name),
        customerEmail: String(customer.email).toLowerCase(),
        customerPhone: String(customer.phone),
        shippingStreet: String(address.street),
        shippingCity: String(address.city),
        shippingDistrict: String(address.district),
        shippingPostalCode: address.postalCode ? String(address.postalCode) : null,
        notes: body.notes ? String(body.notes) : null,
        paymentMethod,
        subtotal: priced.subtotal,
        discount,
        shippingCost,
        total,
        items: { create: priced.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          cartQuantity: item.cartQuantity ?? 1,
          unitPrice: item.unitPrice,
          lineTotal: item.lineTotal,
          selectedMaterial: item.selectedMaterial,
          selectedSize: item.selectedSize,
          selectedWindow: item.selectedWindow,
          selectedExtras: item.selectedExtras ?? undefined,
          customWidth: item.customWidth,
          customHeight: item.customHeight,
          designId: item.customDesign?.designId,
          designTitle: item.customDesign?.designTitle,
          designUrl: item.customDesign?.pdfUrl
        })) }
      },
      include: { items: true, payments: true }
    })

    await setOrderAccess(order.id)
    return NextResponse.json({ success: true, orderId: order.id, order: serializeOrder(order), message: 'Siparis basariyla olusturuldu.' }, { status: 201 })
  } catch (error) {
    console.error('Order create error:', error)
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Siparis olusturulamadi.' }, { status: 400 })
  }
}

export async function GET() {
  const currentUser = await getCurrentUser()
  const admin = await isAdminSession()
  if (!currentUser && !admin) return NextResponse.json({ orders: [] })
  const orders = await db.order.findMany({ where: admin ? undefined : { userId: currentUser!.id }, include: { items: true, payments: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ orders: orders.map(serializeOrder) })
}
