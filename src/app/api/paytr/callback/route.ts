import { db } from '@/lib/server/db'
import { verifyPaytrCallback } from '@/lib/paytr'

export async function POST(request: Request) {
  const text = await request.text()
  const form = new URLSearchParams(text)

  const merchantOid = form.get('merchant_oid') || ''
  const status = form.get('status') || ''
  const totalAmount = form.get('total_amount') || ''
  const hash = form.get('hash') || ''

  if (!merchantOid || !status || !totalAmount || !hash) {
    return new Response('PAYTR notification failed: missing fields', { status: 400 })
  }

  let validSignature = false
  try {
    validSignature = verifyPaytrCallback({ merchantOid, status, totalAmount, hash })
  } catch {
    return new Response('PAYTR notification temporarily unavailable', { status: 503 })
  }
  if (!validSignature) return new Response('PAYTR notification failed: bad hash', { status: 400 })

  const order = await db.order.findUnique({ where: { id: merchantOid } })
  if (!order) return new Response('OK', { status: 200 })

  if (status !== 'success' && status !== 'failed') return new Response('Invalid status', {status:400})
  const isSuccess = status === 'success'
  // PayTR'nin toplam tutari kurus cinsindendir; taksit masrafi nedeniyle buyuk olabilir.
  // Basarili odeme sipariste kayitli tutardan daha az ise kabul etmeyiz.
  const callbackCents = Number(totalAmount)
  const orderCents = Math.round(Number(order.total) * 100)
  if (isSuccess && (!Number.isSafeInteger(callbackCents) || callbackCents < orderCents)) {
    return new Response('PAYTR notification failed: amount mismatch', { status: 400 })
  }

  await db.$transaction(async (tx) => {
    const current = await tx.order.findUnique({where:{id:order.id}})
    if (!current || current.paymentStatus === 'PAID') return
    const latest = await tx.payment.findFirst({
      where: { orderId: order.id, provider: 'paytr' },
      orderBy: { createdAt: 'desc' },
    })

    if (latest && latest.status === 'PAID') return
    if (latest && latest.status === (isSuccess ? 'PAID' : 'FAILED')) return

    if (latest) {
      await tx.payment.update({
        where: { id: latest.id },
        data: {
          status: isSuccess ? 'PAID' : 'FAILED',
          rawStatus: status,
          callbackEventKey: hash,
          rawPayload: Object.fromEntries(form.entries()),
        },
      })
    } else {
      await tx.payment.create({
        data: {
          orderId: order.id,
          provider: 'paytr',
          status: isSuccess ? 'PAID' : 'FAILED',
          amount: order.total,
          currency: form.get('currency') || 'TRY',
          callbackEventKey: hash,
          rawStatus: status,
          rawPayload: Object.fromEntries(form.entries()),
        },
      })
    }

    await tx.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: isSuccess ? 'PAID' : 'FAILED',
        status: isSuccess && order.status === 'PENDING' ? 'CONFIRMED' : order.status,
      },
    })
  })

  return new Response('OK', {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
