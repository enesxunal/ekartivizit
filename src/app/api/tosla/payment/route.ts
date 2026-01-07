import { NextRequest, NextResponse } from 'next/server'
import { processToslaPayment, ToslaPaymentRequest } from '@/lib/tosla'

export async function POST(request: NextRequest) {
  try {
    console.log('Tosla payment API çağrıldı')
    console.log('TOSLA_BASE_URL:', process.env.TOSLA_BASE_URL)
    
    let body
    try {
      body = await request.json()
      console.log('Request body:', JSON.stringify(body, null, 2))
    } catch {
      console.error('JSON parse hatası')
      return NextResponse.json(
        { success: false, error: 'Geçersiz JSON formatı' },
        { status: 400 }
      )
    }
    
    // Gerekli alanları kontrol et (kart bilgileri Tosla'da girilecek, burada gerekmez)
    const requiredFields = ['amount', 'currency', 'orderId', 'customerInfo', 'returnUrl', 'cancelUrl']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} alanı gerekli` },
          { status: 400 }
        )
      }
    }

    // Müşteri bilgilerini kontrol et
    const { name, email, phone } = body.customerInfo
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Müşteri bilgileri eksik' },
        { status: 400 }
      )
    }

    // Tosla ödeme isteği oluştur (kart bilgileri Tosla'da girilecek)
    const paymentRequest: ToslaPaymentRequest = {
      amount: parseFloat(body.amount),
      currency: body.currency || 'TRY',
      orderId: body.orderId,
      customerInfo: {
        name,
        email,
        phone
      },
      cardInfo: {
        // Kart bilgileri Tosla'nın sayfasında girilecek
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
        cardHolderName: ''
      },
      returnUrl: body.returnUrl,
      cancelUrl: body.cancelUrl
    }

    // Ödeme işlemini başlat
    console.log('processToslaPayment çağrılıyor...')
    const result = await processToslaPayment(paymentRequest)
    console.log('processToslaPayment sonucu:', JSON.stringify(result, null, 2))

    if (result.success) {
      // Eğer HTML form döndüyse, client'a ilet
      if (result.redirectHtml) {
        return NextResponse.json({ success: true, html: result.redirectHtml })
      }
      return NextResponse.json({
        success: true,
        paymentId: result.paymentId,
        redirectUrl: result.redirectUrl
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.errorMessage,
          errorCode: result.errorCode
        },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Tosla ödeme API hatası:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Sunucu hatası',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
} 