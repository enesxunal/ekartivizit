import { NextRequest, NextResponse } from 'next/server'
import { processToslaPayment, ToslaPaymentRequest } from '@/lib/tosla'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Gerekli alanları kontrol et
    const requiredFields = ['amount', 'currency', 'orderId', 'customerInfo', 'cardInfo', 'returnUrl', 'cancelUrl']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} alanı gerekli` },
          { status: 400 }
        )
      }
    }

    // Kart bilgilerini kontrol et
    const { cardNumber, expiryMonth, expiryYear, cvc, cardHolderName } = body.cardInfo
    if (!cardNumber || !expiryMonth || !expiryYear || !cvc || !cardHolderName) {
      return NextResponse.json(
        { success: false, error: 'Kart bilgileri eksik' },
        { status: 400 }
      )
    }

    // Müşteri bilgilerini kontrol et
    const { name, email, phone } = body.customerInfo
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Müşteri bilgileri eksik' },
        { status: 400 }
      )
    }

    // Tosla ödeme isteği oluştur
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
        cardNumber: cardNumber.replace(/\s/g, ''), // Boşlukları kaldır
        expiryMonth,
        expiryYear,
        cvc,
        cardHolderName
      },
      returnUrl: body.returnUrl,
      cancelUrl: body.cancelUrl
    }

    // Ödeme işlemini başlat
    const result = await processToslaPayment(paymentRequest)

    if (result.success) {
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