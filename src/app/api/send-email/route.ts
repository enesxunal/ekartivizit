import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, emailTemplates } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { to, emailType, userData, orderData, statusData, template, cc, bcc } = await request.json()

    if (!to) {
      return NextResponse.json(
        { success: false, error: 'E-posta adresi gerekli' },
        { status: 400 }
      )
    }

    let emailTemplate = template

    // Şablon türüne göre e-posta oluştur
    if (emailType && !template) {
      switch (emailType) {
        case 'userRegistration':
          if (!userData?.name || !userData?.email) {
            return NextResponse.json(
              { success: false, error: 'Kullanıcı kayıt bilgileri eksik' },
              { status: 400 }
            )
          }
          emailTemplate = emailTemplates.userRegistration(userData.name, userData.email)
          break

        case 'orderConfirmation':
          if (!orderData) {
            return NextResponse.json(
              { success: false, error: 'Sipariş bilgileri eksik' },
              { status: 400 }
            )
          }
          emailTemplate = emailTemplates.orderConfirmationCustomer(orderData)
          break

        case 'orderStatusUpdate':
          if (!orderData || !statusData) {
            return NextResponse.json(
              { success: false, error: 'Sipariş durum bilgileri eksik' },
              { status: 400 }
            )
          }
          emailTemplate = emailTemplates.orderStatusUpdate(orderData, statusData.status, statusData.message)
          break

        case 'orderNotificationAdmin':
          if (!orderData) {
            return NextResponse.json(
              { success: false, error: 'Sipariş bilgileri eksik' },
              { status: 400 }
            )
          }
          emailTemplate = emailTemplates.orderNotificationAdmin(orderData)
          break

        default:
          return NextResponse.json(
            { success: false, error: 'Geçersiz e-posta türü' },
            { status: 400 }
          )
      }
    }

    if (!emailTemplate) {
      return NextResponse.json(
        { success: false, error: 'E-posta şablonu bulunamadı' },
        { status: 400 }
      )
    }

    const result = await sendEmail(to, emailTemplate, cc, bcc)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('E-posta API hatası:', error)
    return NextResponse.json(
      { success: false, error: 'E-posta gönderilirken hata oluştu' },
      { status: 500 }
    )
  }
} 