import { NextRequest, NextResponse } from 'next/server'
import { sendMail, mailTemplates } from '@/lib/mail'

export async function POST(request: NextRequest) {
  try {
    const { type, recipient, data } = await request.json()

    if (!recipient) {
      return NextResponse.json(
        { success: false, error: 'E-posta adresi gerekli' },
        { status: 400 }
      )
    }

    let template
    
    switch (type) {
      case 'welcome':
        template = mailTemplates.welcome(data?.name || 'Test Kullanıcı')
        break
        
      case 'order-confirmation':
        template = mailTemplates.orderConfirmation({
          orderId: data?.orderId || 'TEST123',
          customerName: data?.name || 'Test Kullanıcı',
          items: data?.items || [
            {
              name: 'Test Kartvizit',
              quantity: 1000,
              price: 150
            }
          ],
          total: data?.total || 150,
          trackingNumber: data?.trackingNumber
        })
        break
        
      case 'order-status':
        template = mailTemplates.orderStatusUpdate({
          orderId: data?.orderId || 'TEST123',
          customerName: data?.name || 'Test Kullanıcı',
          status: data?.status || 'confirmed',
          trackingNumber: data?.trackingNumber
        })
        break
        
      case 'admin-notification':
        // Admin notification için welcome template kullanıyoruz (geçici)
        template = mailTemplates.welcome(data?.name || 'Test Kullanıcı')
        break
        
      default:
        return NextResponse.json(
          { success: false, error: 'Geçersiz e-posta türü' },
          { status: 400 }
        )
    }

    const result = await sendMail({
      to: recipient,
      subject: template.subject,
      html: template.html
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'E-posta başarıyla gönderildi',
        messageId: result.messageId
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Test e-posta gönderme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 