import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { emailTemplates } from '@/lib/email-templates'
import { db } from '@/lib/server/db'
import { getCurrentUser } from '@/lib/server/session'
import { hasOrderAccess } from '@/lib/server/order-access'
import { isAdminSession } from '@/lib/admin-auth'
import { serializeOrder } from '@/lib/server/serialize-order'

function asTemplateOrder(order: ReturnType<typeof serializeOrder>) {
  return { ...order, orderId: order.id }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const emailType = String(body.emailType ?? '')
    const currentUser = await getCurrentUser()
    const admin = await isAdminSession()

    if (emailType === 'userRegistration') {
      if (!currentUser) return NextResponse.json({ success: false, error: 'Oturum gerekli' }, { status: 401 })
      const template = emailTemplates.userRegistration(currentUser.name, currentUser.email)
      const result = await sendEmail(currentUser.email, template)
      return NextResponse.json({ success: true, messageId: result.messageId })
    }

    const orderId = String(body.orderId ?? '').trim()
    if (!orderId) return NextResponse.json({ success: false, error: 'Siparis numarasi gerekli' }, { status: 400 })

    const order = await db.order.findUnique({ where: { id: orderId }, include: { items: true, payments: true } })
    if (!order) return NextResponse.json({ success: false, error: 'Siparis bulunamadi' }, { status: 404 })

    const allowed = admin || (currentUser && order.userId === currentUser.id) || await hasOrderAccess(order.id)
    if (!allowed) return NextResponse.json({ success: false, error: 'Erisim reddedildi' }, { status: 403 })

    const orderData = asTemplateOrder(serializeOrder(order))
    let recipient: string
    let template

    switch (emailType) {
      case 'orderConfirmation':
        recipient = order.customerEmail
        template = emailTemplates.orderConfirmationCustomer(orderData)
        break
      case 'orderNotificationAdmin': {
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER
        if (!adminEmail) return NextResponse.json({ success: false, error: 'Admin e-posta adresi yapilandirilmamis' }, { status: 503 })
        recipient = adminEmail
        template = emailTemplates.orderNotificationAdmin(orderData)
        break
      }
      case 'orderStatusUpdate':
        if (!admin) return NextResponse.json({ success: false, error: 'Admin oturumu gerekli' }, { status: 401 })
        recipient = order.customerEmail
        template = emailTemplates.orderStatusUpdate(orderData, body.statusData ?? { status: order.status.toLowerCase() })
        break
      default:
        return NextResponse.json({ success: false, error: 'Gecersiz e-posta turu' }, { status: 400 })
    }

    const result = await sendEmail(recipient, template)
    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error('E-posta gonderme API hatasi:', error)
    return NextResponse.json({ success: false, error: 'E-posta gonderilirken hata olustu' }, { status: 500 })
  }
}
