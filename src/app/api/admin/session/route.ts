import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, validateAdminSessionToken } from '@/lib/admin-auth'
import { getCurrentUser } from '@/lib/server/session'

export async function GET() {
  const user = await getCurrentUser().catch(() => null)
  if (user?.role === 'ADMIN') return NextResponse.json({ authenticated: true, mode: 'database' })

  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  return NextResponse.json({ authenticated: validateAdminSessionToken(token), mode: 'bootstrap' })
}
