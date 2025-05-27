import { NextRequest, NextResponse } from 'next/server'
import { verifyToslaWebhook } from '@/lib/tosla'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-tosla-signature') || ''

    // Webhook imzasını doğrula
    if (!(await verifyToslaWebhook(body, signature))) {
      console.error('Tosla webhook imza doğrulaması başarısız')
      return NextResponse.json(
        { success: false, error: 'Geçersiz imza' },
        { status: 401 }
      )
    }

    // Webhook verisini parse et
    const webhookData = JSON.parse(body)
    
    console.log('Tosla webhook alındı:', webhookData)

    // Webhook tipine göre işlem yap
    switch (webhookData.EventType) {
      case 'PAYMENT_SUCCESS':
        await handlePaymentSuccess(webhookData)
        break
      case 'PAYMENT_FAILED':
        await handlePaymentFailed(webhookData)
        break
      case 'PAYMENT_CANCELLED':
        await handlePaymentCancelled(webhookData)
        break
      default:
        console.log('Bilinmeyen webhook tipi:', webhookData.EventType)
    }

    return NextResponse.json({ success: true, message: 'Webhook işlendi' })

  } catch (error) {
    console.error('Tosla webhook hatası:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Webhook işleme hatası',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}

interface ToslaWebhookData {
  EventType: string
  OrderId: string
  PaymentId: string
  Amount: number
  Status: string
  [key: string]: unknown
}

async function handlePaymentSuccess(data: ToslaWebhookData) {
  console.log('Ödeme başarılı:', data)
  
  // Burada sipariş durumunu güncelle
  // Veritabanında ödeme durumunu 'paid' olarak işaretle
  // Müşteriye onay maili gönder
  // Stok güncelle vb.
  
  // Örnek:
  // await updateOrderStatus(data.OrderId, 'paid')
  // await sendOrderConfirmationEmail(data.OrderId)
}

async function handlePaymentFailed(data: ToslaWebhookData) {
  console.log('Ödeme başarısız:', data)
  
  // Burada sipariş durumunu güncelle
  // Veritabanında ödeme durumunu 'failed' olarak işaretle
  // Müşteriye bilgilendirme maili gönder
  
  // Örnek:
  // await updateOrderStatus(data.OrderId, 'failed')
  // await sendPaymentFailedEmail(data.OrderId)
}

async function handlePaymentCancelled(data: ToslaWebhookData) {
  console.log('Ödeme iptal edildi:', data)
  
  // Burada sipariş durumunu güncelle
  // Veritabanında ödeme durumunu 'cancelled' olarak işaretle
  
  // Örnek:
  // await updateOrderStatus(data.OrderId, 'cancelled')
} 