import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/server/db'
import { createUserSession } from '@/lib/server/session'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email ?? '').trim().toLowerCase()
    const password = String(body.password ?? '')
    const user = await db.user.findUnique({ where: { email }, include: { addresses: true } })
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ success: false, message: 'E-posta veya sifre hatali.' }, { status: 401 })
    }
    await createUserSession(user.id)
    const address = user.addresses.find((item) => item.isDefault) ?? user.addresses[0]
    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, address: address ? { street: address.street, city: address.city, district: address.district, postalCode: address.postalCode ?? '' } : undefined, preferences: { newsletter: user.newsletter, smsNotifications: user.smsNotifications }, createdAt: user.createdAt.toISOString() } })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ success: false, message: 'Giris yapilamadi.' }, { status: 500 })
  }
}
