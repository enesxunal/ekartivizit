import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { checkToslaPaymentStatus, verifyToslaWebhook } from '@/lib/tosla'
import { db } from '@/lib/server/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-tosla-signature') || request.headers.get('tosla-signature')
    if (signature && !(await verifyToslaWebhook(body, signature))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    let data: Record<string, unknown>
    try { data = JSON.parse(body) } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
    const paymentId = String(data.PaymentId ?? data.paymentId ?? '').trim()
    const orderId = String(data.OrderId ?? data.orderId ?? '').trim()
    if (!paymentId || !orderId) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const order = await db.order.findUnique({ where: { id: orderId }, include: { payments: true } })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    const inquiry = await checkToslaPaymentStatus(paymentId)
    const eventKey = crypto.createHash('sha256').update(body).digest('hex')
    const expectedAmount = Number(order.total)
    if (inquiry.status === 'success' && inquiry.amount !== undefined && Math.abs(inquiry.amount - expectedAmount) > 0.009) {
      return NextResponse.json({ error: 'Amount mismatch' }, { status: 409 })
    }

    let payment = order.payments.find((item) => item.providerSessionId === paymentId || item.providerPaymentId === paymentId)
    if (!payment && inquiry.status === 'success') {
      payment = order.payments.find((item) => item.status === 'PENDING')
    }
    if (!payment) return NextResponse.json({ error: 'Payment attempt not found' }, { status: 404 })
    if (payment.callbackEventKey === eventKey) return NextResponse.json({ success: true, duplicate: true })

    const status = inquiry.status === 'success' ? 'PAID' : inquiry.status === 'pending' ? 'PENDING' : 'FAILED'
    await db.$transaction([
      db.payment.update({
        where: { id: payment.id },
        data: { status, providerPaymentId: payment.providerPaymentId ?? paymentId, callbackEventKey: eventKey, rawStatus: inquiry.status, rawPayload: data as object }
      }),
      db.order.update({ where: { id: order.id }, data: { paymentStatus: status } })
    ])

    return NextResponse.json({ success: true, orderId, paymentId, status: inquiry.status })
  } catch (error) {
    console.error('Tosla webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
