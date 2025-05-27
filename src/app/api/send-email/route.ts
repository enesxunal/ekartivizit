import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { emailTemplates } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const { to, emailType, orderData, statusData } = await request.json()

    if (!to || !emailType) {
      return NextResponse.json(
        { success: false, error: 'E-posta adresi ve e-posta türü gerekli' },
        { status: 400 }
      )
    }

    let template
    
    switch (emailType) {
      case 'userRegistration':
        if (!orderData?.customerInfo?.name) {
          return NextResponse.json(
            { success: false, error: 'Kullanıcı adı gerekli' },
            { status: 400 }
          )
        }
        template = emailTemplates.userRegistration(orderData.customerInfo.name, to)
        break
        
      case 'orderConfirmation':
        if (!orderData) {
          return NextResponse.json(
            { success: false, error: 'Sipariş verisi gerekli' },
            { status: 400 }
          )
        }
        template = emailTemplates.orderConfirmationCustomer(orderData)
        break
        
      case 'orderNotificationAdmin':
        if (!orderData) {
          return NextResponse.json(
            { success: false, error: 'Sipariş verisi gerekli' },
            { status: 400 }
          )
        }
        template = emailTemplates.orderNotificationAdmin(orderData)
        break
        
      case 'orderStatusUpdate':
        if (!orderData || !statusData) {
          return NextResponse.json(
            { success: false, error: 'Sipariş ve durum verisi gerekli' },
            { status: 400 }
          )
        }
        template = emailTemplates.orderStatusUpdate(orderData, statusData)
        break
        
      default:
        return NextResponse.json(
          { success: false, error: 'Geçersiz e-posta türü' },
          { status: 400 }
        )
    }

    const result = await sendEmail(to, template)
    
    return NextResponse.json({
      success: true,
      messageId: result.messageId
    })

  } catch (error) {
    console.error('E-posta gönderme API hatası:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'E-posta gönderilirken hata oluştu' 
      },
      { status: 500 }
    )
  }
} 