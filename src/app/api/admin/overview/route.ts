import { NextResponse } from 'next/server'
import { db } from '@/lib/server/db'
import { isAdminSession } from '@/lib/admin-auth'
import { serializeOrder } from '@/lib/server/serialize-order'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  if (!(await isAdminSession())) return NextResponse.json({ message: 'Yonetici oturumu gerekli.' }, { status: 401 })
  const daysInput = Number(new URL(request.url).searchParams.get('days') || 30)
  const days = [7, 30, 90].includes(daysInput) ? daysInput : 30
  const start = new Date(Date.now() - days * 86400000)

  try {
    const [totalOrders, pendingPayments, failedPayments, paidAll, paidPeriod, recent, transactions] = await Promise.all([
      db.order.count(),
      db.order.count({ where: { paymentStatus: 'PENDING' } }),
      db.order.count({ where: { paymentStatus: 'FAILED' } }),
      db.order.aggregate({ where: { paymentStatus: 'PAID' }, _count: { _all: true }, _sum: { total: true } }),
      db.order.aggregate({ where: { paymentStatus: 'PAID', createdAt: { gte: start } }, _count: { _all: true }, _sum: { total: true } }),
      db.order.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { items: true, payments: true } }),
      db.order.findMany({
        where: { paymentStatus: 'PAID', createdAt: { gte: start } },
        take: 3000,
        orderBy: { createdAt: 'desc' },
        select: { total: true, createdAt: true, items: { select: { productId: true, productName: true, cartQuantity: true, lineTotal: true } } },
      }),
    ])
    const totals = new Map<string, { name: string; quantity: number; revenue: number }>()
    const trend = new Map<string, { date: string; total: number; count: number }>()
    for (const order of transactions) {
      const date = order.createdAt.toISOString().slice(0, 10)
      const previous = trend.get(date) || { date, total: 0, count: 0 }
      previous.total += Number(order.total)
      previous.count += 1
      trend.set(date, previous)
      for (const item of order.items) {
        const previousProduct = totals.get(item.productId) || { name: item.productName, quantity: 0, revenue: 0 }
        previousProduct.quantity += item.cartQuantity
        previousProduct.revenue += Number(item.lineTotal)
        totals.set(item.productId, previousProduct)
      }
    }
    return NextResponse.json({
      days,
      totals: {
        allOrders: totalOrders,
        paidOrders: paidAll._count._all,
        paidRevenue: Number(paidAll._sum.total || 0),
        periodRevenue: Number(paidPeriod._sum.total || 0),
        periodPaidOrders: paidPeriod._count._all,
        pendingPayments,
        failedPayments,
      },
      recent: recent.map(serializeOrder),
      daily: [...trend.values()].sort((a, b) => a.date.localeCompare(b.date)),
      topProducts: [...totals.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 8),
      truncated: transactions.length === 3000,
    }, { headers: { 'Cache-Control': 'private, no-store' } })
  } catch {
    return NextResponse.json({ message: 'Rapor verileri alinamadi.' }, { status: 503 })
  }
}
