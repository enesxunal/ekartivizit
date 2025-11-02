import { NextRequest, NextResponse } from 'next/server'
import { verifyToslaWebhook, checkToslaPaymentStatus } from '@/lib/tosla'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-tosla-signature') || request.headers.get('tosla-signature')
    
    console.log('Tosla webhook alındı:', {
      body: body.substring(0, 200) + '...',
      signature: signature?.substring(0, 20) + '...',
      headers: Object.fromEntries(request.headers.entries())
    })

    // Webhook imzasını doğrula
    if (signature) {
      const isValid = await verifyToslaWebhook(body, signature)
      if (!isValid) {
        console.error('Tosla webhook imza doğrulaması başarısız')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    // Webhook verilerini parse et
    let webhookData
    try {
      webhookData = JSON.parse(body)
    } catch (parseError) {
      console.error('Webhook JSON parse hatası:', parseError)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    // Webhook tipini kontrol et
    const { PaymentId, OrderId, Status, Amount, Currency } = webhookData

    if (!PaymentId || !OrderId || !Status) {
      console.error('Webhook eksik veri:', webhookData)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Tosla webhook işleniyor:', {
      PaymentId,
      OrderId,
      Status,
      Amount,
      Currency
    })

    // Ödeme durumunu güncelle
    const paymentStatus = await checkToslaPaymentStatus(PaymentId)
    
    // LocalStorage'dan siparişi bul ve güncelle
    try {
      const allOrders = JSON.parse(localStorage.getItem('ekartvizit-orders') || '[]')
      const orderIndex = allOrders.findIndex((order: { id: string }) => order.id === OrderId)
      
      if (orderIndex !== -1) {
        const order = allOrders[orderIndex]
        
        // Ödeme durumunu güncelle
        if (paymentStatus.status === 'success') {
          order.paymentStatus = 'paid'
          order.status = 'confirmed'
          order.paidAt = new Date().toISOString()
        } else if (paymentStatus.status === 'failed' || paymentStatus.status === 'cancelled') {
          order.paymentStatus = 'failed'
          order.status = 'cancelled'
        }
        
        order.updatedAt = new Date().toISOString()
        allOrders[orderIndex] = order
        
        // Güncellenmiş siparişleri kaydet
        localStorage.setItem('ekartvizit-orders', JSON.stringify(allOrders))
        
        console.log('Sipariş güncellendi:', {
          orderId: OrderId,
          paymentStatus: paymentStatus.status,
          orderStatus: order.status
        })
      } else {
        console.warn('Sipariş bulunamadı:', OrderId)
      }
    } catch (storageError) {
      console.error('LocalStorage güncelleme hatası:', storageError)
    }

    // Başarılı yanıt döndür
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook işlendi',
      orderId: OrderId,
      paymentId: PaymentId,
      status: paymentStatus.status
    })

  } catch (error) {
    console.error('Tosla webhook işleme hatası:', error)
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Webhook test endpoint'i
export async function GET() {
  const testData = {
    PaymentId: 'test-payment-123',
    OrderId: 'test-order-456',
    Status: 'SUCCESS',
    Amount: 100.00,
    Currency: 'TRY',
    Timestamp: new Date().toISOString()
  }

  return NextResponse.json({
    message: 'Tosla webhook test endpoint',
    testData,
    instructions: 'POST isteği ile webhook test edebilirsiniz'
  })
} 