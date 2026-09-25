import { NextResponse } from 'next/server'
import { db } from '@/lib/server/db'
import { isAdminSession } from '@/lib/admin-auth'
import { basitKargo, normalizeBasitKargoStatus, type BasitKargoPackage } from '@/lib/basitkargo'

const asPackage = (value: unknown): BasitKargoPackage => {
  const input = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  return {
    height: Math.max(1, Number(input.height || 10)),
    width: Math.max(1, Number(input.width || 20)),
    depth: Math.max(1, Number(input.depth || 30)),
    weight: Math.max(0.1, Number(input.weight || 1)),
  }
}

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ success: false, message: 'Admin oturumu gerekli.' }, { status: 401 })
  }

  try {
    const health = await basitKargo.healthCheck()
    return NextResponse.json({
      success: true,
      configured: true,
      summary: {
        balance: health.balance,
        handlers: health.handlers,
        brands: health.brands,
        addresses: health.addresses,
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      configured: basitKargo.configured(),
      message: error instanceof Error ? error.message : 'BasitKargo baglantisi kontrol edilemedi.',
    }, { status: 400 })
  }
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ success: false, message: 'Admin oturumu gerekli.' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const action = String(body.action || '')
  const orderId = String(body.orderId || '').trim()
  if (!orderId) {
    return NextResponse.json({ success: false, message: 'Siparis numarasi gerekli.' }, { status: 400 })
  }

  const order = await db.order.findUnique({ where: { id: orderId }, include: { items: true } })
  if (!order) {
    return NextResponse.json({ success: false, message: 'Siparis bulunamadi.' }, { status: 404 })
  }

  try {
    if (action === 'create') {
      if (order.paymentStatus !== 'PAID') {
        return NextResponse.json({ success: false, message: 'Odeme tamamlanmadan BasitKargo kaydi olusturulamaz.' }, { status: 409 })
      }
      if (order.trackingNumber) {
        return NextResponse.json({ success: false, message: 'Bu siparis icin zaten bir takip kodu var.' }, { status: 409 })
      }

      const shipment = await basitKargo.createShipment({
        orderNo: order.id,
        handlerCode: String(body.handlerCode || 'ECONOMIC'),
        items: order.items.map((item) => ({
          name: item.productName,
          code: item.productId,
          quantity: Math.max(1, item.quantity * item.cartQuantity),
        })),
        packages: [asPackage(body.package)],
        recipient: {
          name: order.customerName,
          phone: order.customerPhone,
          email: order.customerEmail,
          city: order.shippingCity,
          town: order.shippingDistrict,
          address: [order.shippingStreet, order.shippingPostalCode].filter(Boolean).join(' '),
        },
      })

      const trackingNumber = basitKargo.trackingCode(shipment)
      if (!trackingNumber) {
        return NextResponse.json({ success: false, message: 'BasitKargo takip kodu dondurmedi.', shipment }, { status: 502 })
      }

      const updated = await db.order.update({
        where: { id: order.id },
        data: { trackingNumber, status: 'SHIPPING' },
        include: { items: true, payments: true },
      })

      return NextResponse.json({
        success: true,
        message: 'BasitKargo gonderisi olusturuldu.',
        trackingNumber,
        providerStatus: normalizeBasitKargoStatus(shipment.status || shipment.shipmentInfo?.status),
        order: updated,
      })
    }

    if (action === 'refresh') {
      if (!order.trackingNumber) {
        return NextResponse.json({ success: false, message: 'Sipariste takip kodu yok.' }, { status: 409 })
      }

      const shipment = await basitKargo.lookup(order.trackingNumber)
      const providerStatus = normalizeBasitKargoStatus(shipment.status || shipment.shipmentInfo?.status)
      const status = providerStatus === 'delivered' ? 'DELIVERED' : providerStatus === 'shipping' ? 'SHIPPING' : order.status

      await db.order.update({ where: { id: order.id }, data: { status } })

      return NextResponse.json({
        success: true,
        message: 'Kargo durumu yenilendi.',
        trackingNumber: basitKargo.trackingCode(shipment) || order.trackingNumber,
        providerStatus,
      })
    }

    return NextResponse.json({ success: false, message: 'Gecersiz islem.' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'BasitKargo islemi basarisiz.',
    }, { status: 400 })
  }
}
