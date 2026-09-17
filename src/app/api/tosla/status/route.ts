import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/server/db'
import { getCurrentUser } from '@/lib/server/session'
import { hasOrderAccess } from '@/lib/server/order-access'
import { isAdminSession } from '@/lib/admin-auth'

async function respond(orderId: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { payments: { orderBy: { createdAt: 'desc' }, take: 1 } }
  })
  if (!order) return NextResponse.json({ success: false, error: 'Siparis bulunamadi' }, { status: 404 })

  const currentUser = await getCurrentUser()
  const allowed = (currentUser && order.userId === currentUser.id) || await hasOrderAccess(order.id) || await isAdminSession()
  if (!allowed) return NextResponse.json({ success: false, error: 'Erisim reddedildi' }, { status: 403 })

  const payment = order.payments[0]
  return NextResponse.json({
    success: true,
    orderId: order.id,
    status: order.paymentStatus.toLowerCase(),
    amount: Number(order.total),
    paymentId: payment?.providerPaymentId ?? payment?.providerSessionId ?? undefined,
    updatedAt: payment?.updatedAt.toISOString() ?? order.updatedAt.toISOString()
  })
}

export async function GET(request: NextRequest) {
  const orderId = new URL(request.url).searchParams.get('orderId')?.trim()
  if (!orderId) return NextResponse.json({ success: false, error: 'orderId gerekli' }, { status: 400 })
  return respond(orderId)
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const orderId = String(body.orderId ?? '').trim()
  if (!orderId) return NextResponse.json({ success: false, error: 'orderId gerekli' }, { status: 400 })
  return respond(orderId)
}
