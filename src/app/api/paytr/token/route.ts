import { NextResponse } from 'next/server'
import { db } from '@/lib/server/db'
import { createPaytrIframeToken } from '@/lib/paytr'
import { getCurrentUser } from '@/lib/server/session'
import { hasOrderAccess } from '@/lib/server/order-access'
import { KAF_PAYMENT_PRODUCT_IDS, KAF_PAYMENT_AMOUNT, isKafPaymentExpired } from '@/lib/kaf-payment'

function getIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip') || '127.0.0.1'
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const orderId = String(body.orderId || '').trim()
    if (!orderId) return NextResponse.json({ success: false, message: 'Siparis numarasi gerekli.' }, { status: 400 })

    const order = await db.order.findUnique({ where: { id: orderId }, include: { items: true } })
    if (!order) return NextResponse.json({ success: false, message: 'Siparis bulunamadi.' }, { status: 404 })

    const currentUser = await getCurrentUser()
    const allowed = (currentUser && order.userId === currentUser.id) || await hasOrderAccess(order.id)
    if (!allowed) return NextResponse.json({ success: false, message: 'Siparise erisim reddedildi.' }, { status: 403 })

    if (order.paymentMethod !== 'CREDIT_CARD' || order.status === 'CANCELLED') return NextResponse.json({success:false,message:'Kartla odemeye uygun siparis degil.'},{status:409})
    if (order.paymentStatus === 'PAID') {
      return NextResponse.json({ success: false, message: 'Bu siparis zaten odendi.' }, { status: 409 })
    }

    const kafProductIds = new Set<string>(KAF_PAYMENT_PRODUCT_IDS)
    if (order.items.some((item) => kafProductIds.has(item.productId))) {
      if (isKafPaymentExpired()) return NextResponse.json({ success: false, message: 'Baglanti suresi doldu.' }, { status: 410 })
      if (order.items.length !== 2 ||
          new Set(order.items.map(item => item.productId)).size !== 2 ||
          order.items.some(item => !kafProductIds.has(item.productId) || item.quantity !== 1 || item.cartQuantity !== 1) ||
          Number(order.total) !== KAF_PAYMENT_AMOUNT || Number(order.discount) !== 0) {
        return NextResponse.json({ success: false, message: 'Bu siparis guncel KAF Grup 108.000 TL tahsilat paketine ait degil.' }, { status: 409 })
      }
      const paid = await db.order.findFirst({
        where: { id: { not: order.id }, paymentStatus: 'PAID', items: { some: { productId: { in: [...KAF_PAYMENT_PRODUCT_IDS] } } } },
        select: { id: true },
      })
      if (paid) return NextResponse.json({ success: false, message: 'Bu tahsilat tamamlandi.' }, { status: 409 })
    }

    const origin = new URL(request.url).origin
    const result = await createPaytrIframeToken({
      orderId: order.id,
      email: order.customerEmail,
      amount: Number(order.total),
      userIp: getIp(request),
      userName: order.customerName,
      userAddress: [order.shippingStreet, order.shippingDistrict, order.shippingCity, order.shippingPostalCode].filter(Boolean).join(', '),
      userPhone: order.customerPhone,
      items: order.items.map((item) => ({
        name: item.productName,
        price: Number(item.unitPrice),
        quantity: Math.max(1, item.cartQuantity),
      })),
      okUrl: `${origin}/odeme/basarili?order=${encodeURIComponent(order.id)}`,
      failUrl: `${origin}/odeme/basarisiz?order=${encodeURIComponent(order.id)}`,
    })

    await db.payment.create({
      data: {
        orderId: order.id,
        provider: 'paytr',
        status: 'PENDING',
        amount: order.total,
        currency: 'TRY',
        providerSessionId: result.token,
        rawStatus: result.testMode ? 'test_mode' : 'live_mode',
      },
    }).catch(() => null)

    return NextResponse.json({
      success: true,
      token: result.token,
      iframeUrl: result.iframeUrl,
      testMode: result.testMode,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'PayTR odemesi baslatilamadi.',
    }, { status: 400 })
  }
}
