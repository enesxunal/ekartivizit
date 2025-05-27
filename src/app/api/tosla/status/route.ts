import { NextRequest, NextResponse } from 'next/server'
import { checkToslaPaymentStatus } from '@/lib/tosla'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.paymentId) {
      return NextResponse.json(
        { success: false, error: 'paymentId gerekli' },
        { status: 400 }
      )
    }

    const result = await checkToslaPaymentStatus(body.paymentId)

    return NextResponse.json({
      success: true,
      status: result.status,
      amount: result.amount,
      paidAt: result.paidAt
    })

  } catch (error) {
    console.error('Tosla durum sorgulama hatası:', error)
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get('paymentId')
    
    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'paymentId gerekli' },
        { status: 400 }
      )
    }

    const result = await checkToslaPaymentStatus(paymentId)

    return NextResponse.json({
      success: true,
      status: result.status,
      amount: result.amount,
      paidAt: result.paidAt
    })

  } catch (error) {
    console.error('Tosla durum sorgulama hatası:', error)
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