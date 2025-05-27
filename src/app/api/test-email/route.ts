import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, emailTemplates } from '@/lib/email'

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
        template = emailTemplates.userRegistration(
          data?.name || 'Test Kullanıcı',
          recipient
        )
        break
        
      case 'order-confirmation':
        template = emailTemplates.orderConfirmationCustomer({
          orderId: data?.orderId || 'TEST123',
          customerInfo: {
            name: data?.name || 'Test Kullanıcı',
            email: recipient,
            phone: data?.phone || '0555 123 45 67',
            address: {
              street: data?.address?.street || 'Test Sokak No:1',
              city: data?.address?.city || 'İstanbul',
              district: data?.address?.district || 'Kadıköy',
              postalCode: data?.address?.postalCode || '34000'
            }
          },
          items: data?.items || [
            {
              product: { name: 'Test Kartvizit' },
              quantity: 1000,
              price: 150,
              selectedMaterial: 'Mat Kuşe',
              selectedSize: '9x5 cm'
            }
          ],
          total: data?.total || 150,
          paymentMethod: data?.paymentMethod || 'whatsapp'
        })
        break
        
      case 'order-status':
        template = emailTemplates.orderStatusUpdate(
          {
            orderId: data?.orderId || 'TEST123',
            customerInfo: {
              name: data?.name || 'Test Kullanıcı'
            },
            createdAt: new Date().toISOString()
          },
          data?.status || 'confirmed',
          data?.statusMessage || 'Sipariş Onaylandı'
        )
        break
        
      case 'admin-notification':
        template = emailTemplates.orderNotificationAdmin({
          orderId: data?.orderId || 'TEST123',
          customerInfo: {
            name: data?.name || 'Test Kullanıcı',
            email: recipient,
            phone: data?.phone || '0555 123 45 67',
            address: {
              street: data?.address?.street || 'Test Sokak No:1',
              city: data?.address?.city || 'İstanbul',
              district: data?.address?.district || 'Kadıköy',
              postalCode: data?.address?.postalCode || '34000'
            }
          },
          items: data?.items || [
            {
              product: { name: 'Test Kartvizit' },
              quantity: 1000,
              price: 150,
              selectedMaterial: 'Mat Kuşe',
              selectedSize: '9x5 cm'
            }
          ],
          total: data?.total || 150,
          paymentMethod: data?.paymentMethod || 'whatsapp'
        })
        break
        
      default:
        return NextResponse.json(
          { success: false, error: 'Geçersiz e-posta türü' },
          { status: 400 }
        )
    }

    const result = await sendEmail(recipient, template)

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