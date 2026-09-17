import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/server/db'
import { createUserSession } from '@/lib/server/session'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim().toLowerCase()
    const password = String(body.password ?? '')
    const phone = body.phone ? String(body.phone).trim() : null
    if (name.length < 2 || !email.includes('@') || password.length < 8) {
      return NextResponse.json({ success: false, message: 'Ad, e-posta veya sifre gecersiz.' }, { status: 400 })
    }
    if (await db.user.findUnique({ where: { email } })) {
      return NextResponse.json({ success: false, message: 'Bu e-posta adresi zaten kullanimda.' }, { status: 409 })
    }
    const user = await db.user.create({ data: { name, email, phone, passwordHash: await bcrypt.hash(password, 12) } })
    await createUserSession(user.id)
    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, createdAt: user.createdAt.toISOString(), preferences: { newsletter: user.newsletter, smsNotifications: user.smsNotifications } } }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ success: false, message: 'Kayit olusturulamadi.' }, { status: 500 })
  }
}
