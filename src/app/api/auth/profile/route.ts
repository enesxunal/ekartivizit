import { NextResponse } from 'next/server'
import { db } from '@/lib/server/db'
import { getCurrentUser } from '@/lib/server/session'

export async function PATCH(request: Request) {
  const current = await getCurrentUser()
  if (!current) return NextResponse.json({ success: false, message: 'Oturum gerekli.' }, { status: 401 })
  try {
    const body = await request.json()
    const user = await db.user.update({
      where: { id: current.id },
      data: {
        name: body.name ? String(body.name).trim() : undefined,
        phone: body.phone !== undefined ? String(body.phone).trim() || null : undefined,
        newsletter: body.preferences?.newsletter,
        smsNotifications: body.preferences?.smsNotifications
      },
      include: { addresses: true }
    })
    if (body.address?.street && body.address?.city && body.address?.district) {
      const existing = user.addresses.find((item) => item.isDefault) ?? user.addresses[0]
      const data = { street: String(body.address.street), city: String(body.address.city), district: String(body.address.district), postalCode: body.address.postalCode ? String(body.address.postalCode) : null, isDefault: true }
      if (existing) await db.address.update({ where: { id: existing.id }, data })
      else await db.address.create({ data: { ...data, userId: user.id } })
    }
    return NextResponse.json({ success: true, message: 'Profil basariyla guncellendi.' })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ success: false, message: 'Profil guncellenemedi.' }, { status: 500 })
  }
}
