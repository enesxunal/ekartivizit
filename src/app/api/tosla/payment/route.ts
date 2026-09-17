import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { processToslaPayment, type ToslaPaymentRequest } from '@/lib/tosla'
import { db } from '@/lib/server/db'
import { getCurrentUser } from '@/lib/server/session'
import { hasOrderAccess } from '@/lib/server/order-access'
import { isAdminSession } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  let paymentRecordId: string | null = null
  try {
    const body = await request.json()
    const orderId = String(body.orderId ?? '').trim()
    if (!orderId) return NextResponse.json({ success: false, error: 'orderId gerekli' }, { status: 400 })

    const { order, payment } = await db.$transaction(async (tx) => {
      const order = await tx.order.findUnique({ where: { id: orderId }, include: { payments: true } })
      if (!order) throw new Error('Siparis bulunamadi')
      const currentUser = await getCurrentUser()
      const allowed = (currentUser && order.userId === currentUser.id) || await hasOrderAccess(order.id) || await isAdminSession()
      if (!allowed) throw new Error('Siparise erisim reddedildi')
      if (order.paymentMethod !== 'CREDIT_CARD') throw new Error('Siparis kredi karti odemesi icin uygun degil')
      if (order.paymentStatus === 'PAID') throw new Error('Siparis zaten odendi')
      const active = order.payments.find((item) => item.status === 'PENDING')
      if (active) throw new Error('Bu siparis icin aktif bir odeme oturumu zaten var')
      const payment = await tx.payment.create({
        data: { orderId: order.id, amount: order.total, currency: 'TRY', status: 'PENDING' }
      })
      return { order, payment }
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable })

    paymentRecordId = payment.id
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ekartvizit.tr').replace(/\/$/, '')
    const paymentRequest: ToslaPaymentRequest = {
      amount: Number(order.total),
      currency: 'TRY',
      orderId: order.id,
      customerInfo: { name: order.customerName, email: order.customerEmail, phone: order.customerPhone },
      cardInfo: { cardNumber: '', expiryMonth: '', expiryYear: '', cvc: '', cardHolderName: '' },
      returnUrl: `${siteUrl}/odeme/basarili?order=${encodeURIComponent(order.id)}`,
      cancelUrl: `${siteUrl}/odeme/iptal?order=${encodeURIComponent(order.id)}`
    }

    const result = await processToslaPayment(paymentRequest)
    if (!result.success) {
      await db.payment.update({ where: { id: payment.id }, data: { status: 'FAILED', rawStatus: result.errorCode ?? 'SESSION_FAILED' } })
      return NextResponse.json({ success: false, error: result.errorMessage || 'Odeme oturumu baslatilamadi', errorCode: result.errorCode }, { status: 400 })
    }

    await db.payment.update({
      where: { id: payment.id },
      data: { providerSessionId: result.paymentId || undefined, rawStatus: 'SESSION_CREATED' }
    })

    if (result.redirectHtml) return NextResponse.json({ success: true, html: result.redirectHtml })
    return NextResponse.json({ success: true, paymentId: result.paymentId, redirectUrl: result.redirectUrl })
  } catch (error) {
    if (paymentRecordId) {
      await db.payment.updateMany({ where: { id: paymentRecordId, status: 'PENDING' }, data: { status: 'FAILED', rawStatus: 'INTERNAL_ERROR' } }).catch(() => undefined)
    }
    const message = error instanceof Error ? error.message : 'Sunucu hatasi'
    const status = message.includes('zaten') || message.includes('aktif bir odeme') ? 409 : message.includes('erisim reddedildi') ? 403 : message.includes('bulunamadi') || message.includes('uygun degil') ? 400 : 500
    console.error('Tosla payment API error:', message)
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
