import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { to, template, cc, bcc } = await request.json()

    if (!to || !template) {
      return NextResponse.json(
        { success: false, error: 'Eksik parametreler' },
        { status: 400 }
      )
    }

    const result = await sendEmail(to, template, cc, bcc)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('E-posta API hatası:', error)
    return NextResponse.json(
      { success: false, error: 'E-posta gönderilirken hata oluştu' },
      { status: 500 }
    )
  }
} 