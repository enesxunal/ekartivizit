import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/server/session'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ user: null })
  const address = user.addresses.find((item) => item.isDefault) ?? user.addresses[0]
  return NextResponse.json({ user: {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: address ? { street: address.street, city: address.city, district: address.district, postalCode: address.postalCode ?? '' } : undefined,
    preferences: { newsletter: user.newsletter, smsNotifications: user.smsNotifications },
    createdAt: user.createdAt.toISOString()
  } })
}
