import { NextResponse } from 'next/server'
import { OrderStatus, PaymentStatus } from '@prisma/client'
import { db } from '@/lib/server/db'
import { getCurrentUser } from '@/lib/server/session'
import { serializeOrder } from '@/lib/server/serialize-order'
import { isAdminSession } from '@/lib/admin-auth'
import { hasOrderAccess } from '@/lib/server/order-access'

const statuses: Record<string, OrderStatus> = {
  pending: 'PENDING', confirmed: 'CONFIRMED', preparing: 'PREPARING', printing: 'PRINTING', shipping: 'SHIPPING', delivered: 'DELIVERED', cancelled: 'CANCELLED'
}
const paymentStatuses: Record<string, PaymentStatus> = { pending: 'PENDING', paid: 'PAID', failed: 'FAILED', refunded: 'REFUNDED' }

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const currentUser = await getCurrentUser()
  const email = new URL(request.url).searchParams.get('email')?.trim().toLowerCase()
  const order = await db.order.findUnique({ where: { id }, include: { items: true, payments: true } })
  if (!order) return NextResponse.json({ success: false, message: 'Siparis bulunamadi.' }, { status: 404 })
  const allowed = (currentUser && order.userId === currentUser.id) || (email && order.customerEmail.toLowerCase() === email) || await hasOrderAccess(order.id) || await isAdminSession()
  if (!allowed) return NextResponse.json({ success: false, message: 'Siparise erisim reddedildi.' }, { status: 403 })
  return NextResponse.json({ success: true, order: serializeOrder(order) })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminSession())) return NextResponse.json({ success: false, message: 'Admin oturumu gerekli.' }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  const data: { status?: OrderStatus; paymentStatus?: PaymentStatus; trackingNumber?: string | null; notes?: string | null } = {}
  if (body.status) data.status = statuses[String(body.status)]
  if (body.paymentStatus) data.paymentStatus = paymentStatuses[String(body.paymentStatus)]
  if (body.trackingNumber !== undefined) data.trackingNumber = body.trackingNumber ? String(body.trackingNumber) : null
  if (body.notes !== undefined) data.notes = body.notes ? String(body.notes) : null
  if ((body.status && !data.status) || (body.paymentStatus && !data.paymentStatus)) return NextResponse.json({ success: false, message: 'Gecersiz durum.' }, { status: 400 })
  const order = await db.order.update({ where: { id }, data, include: { items: true, payments: true } })
  return NextResponse.json({ success: true, order: serializeOrder(order) })
}
