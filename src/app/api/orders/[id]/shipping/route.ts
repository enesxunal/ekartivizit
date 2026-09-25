import { NextResponse } from 'next/server'
import { db } from '@/lib/server/db'
import { getCurrentUser } from '@/lib/server/session'
import { hasOrderAccess } from '@/lib/server/order-access'
import { isAdminSession } from '@/lib/admin-auth'
import { basitKargo, normalizeBasitKargoStatus } from '@/lib/basitkargo'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const currentUser = await getCurrentUser()
  const email = new URL(request.url).searchParams.get('email')?.trim().toLowerCase()
  const order = await db.order.findUnique({ where: { id } })
  if (!order) return NextResponse.json({ success: false, message: 'Siparis bulunamadi.' }, { status: 404 })

  const allowed =
    (currentUser && order.userId === currentUser.id) ||
    (email && order.customerEmail.toLowerCase() === email) ||
    await hasOrderAccess(order.id) ||
    await isAdminSession()

  if (!allowed) return NextResponse.json({ success: false, message: 'Siparise erisim reddedildi.' }, { status: 403 })
  if (!order.trackingNumber) {
    return NextResponse.json({ success: true, shipping: null, message: 'Kargo takip kodu henuz olusmadi.' })
  }

  try {
    const shipment = await basitKargo.lookup(order.trackingNumber)
    const providerStatus = normalizeBasitKargoStatus(shipment.status || shipment.shipmentInfo?.status)
    const currentTracking = basitKargo.trackingCode(shipment) || order.trackingNumber

    const status = providerStatus === 'delivered' ? 'DELIVERED' : providerStatus === 'shipping' ? 'SHIPPING' : order.status
    if (status !== order.status || currentTracking !== order.trackingNumber) {
      await db.order.update({ where: { id: order.id }, data: { status, trackingNumber: currentTracking } })
    }

    return NextResponse.json({
      success: true,
      shipping: {
        provider: 'BasitKargo',
        trackingNumber: currentTracking,
        status: providerStatus,
      },
    })
  } catch {
    return NextResponse.json({
      success: true,
      shipping: {
        provider: 'BasitKargo',
        trackingNumber: order.trackingNumber,
        status: order.status === 'DELIVERED' ? 'delivered' : order.status === 'SHIPPING' ? 'shipping' : 'prepared',
      },
      stale: true,
    })
  }
}
