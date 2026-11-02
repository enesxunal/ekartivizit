import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { isAdminSession } from '@/lib/admin-auth'
import { db } from '@/lib/server/db'
import { serializeOrder } from '@/lib/server/serialize-order'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  if (!(await isAdminSession())) return NextResponse.json({ message: 'Yonetici oturumu gerekli.' }, { status: 401 })
  const params = new URL(request.url).searchParams
  const page = Math.min(10000, Math.max(1, Number.parseInt(params.get('page') || '1', 10) || 1))
  const limit = Math.min(50, Math.max(1, Number.parseInt(params.get('limit') || '20', 10) || 20))
  const query = (params.get('q') || '').trim().slice(0, 100)
  const status = params.get('status')?.toUpperCase() || ''
  const payment = params.get('payment')?.toUpperCase() || ''
  const orderStatuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'PRINTING', 'SHIPPING', 'DELIVERED', 'CANCELLED']
  const paymentStatuses = ['PENDING', 'PAID', 'FAILED', 'REFUNDED']
  if (status && !orderStatuses.includes(status)) return NextResponse.json({ message: 'Gecersiz siparis durumu.' }, { status: 400 })
  if (payment && !paymentStatuses.includes(payment)) return NextResponse.json({ message: 'Gecersiz odeme durumu.' }, { status: 400 })
  const where: Prisma.OrderWhereInput = {
    ...(status ? { status: status as Prisma.EnumOrderStatusFilter['equals'] } : {}),
    ...(payment ? { paymentStatus: payment as Prisma.EnumPaymentStatusFilter['equals'] } : {}),
    ...(query ? { OR: [
      { id: { contains: query, mode: 'insensitive' } },
      { customerName: { contains: query, mode: 'insensitive' } },
      { customerEmail: { contains: query, mode: 'insensitive' } },
      { customerPhone: { contains: query, mode: 'insensitive' } },
    ] } : {}),
  }
  try {
    const [count, orders] = await Promise.all([
      db.order.count({ where }),
      db.order.findMany({ where, include: { items: true, payments: true }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
    ])
    return NextResponse.json({
      count, page, totalPages: Math.ceil(count / limit),
      orders: orders.map(order => ({
        ...serializeOrder(order),
        paymentAttempts: order.payments.map(p => ({
          status: p.status.toLowerCase(), amount: Number(p.amount), provider: p.provider,
          createdAt: p.createdAt.toISOString(), lastEvent: p.rawStatus || null,
        })).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      })),
    }, { headers: { 'Cache-Control': 'private, no-store' } })
  } catch {
    return NextResponse.json({ message: 'Siparis kayitlari alinamadi.' }, { status: 503 })
  }
}
