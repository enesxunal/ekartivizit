import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { ADMIN_COOKIE_NAME, createAdminSessionToken, validateAdminCredentials } from '@/lib/admin-auth'
import { db } from '@/lib/server/db'
import { createUserSession } from '@/lib/server/session'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  try {
    const user = username.includes('@')
      ? await db.user.findUnique({ where: { email: username.toLowerCase() } })
      : null

    if (user?.role === 'ADMIN' && await bcrypt.compare(password, user.passwordHash)) {
      await createUserSession(user.id)
      return NextResponse.json({ ok: true, mode: 'database' })
    }
  } catch (error) {
    console.error('Admin DB auth unavailable, checking bootstrap auth:', error instanceof Error ? error.message : error)
  }

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ ok: false, error: 'Kullanici adi veya sifre hatali.' }, { status: 401 })
  }

  const token = createAdminSessionToken()
  if (!token) return NextResponse.json({ ok: false, error: 'Admin auth environment variables are missing.' }, { status: 503 })

  const response = NextResponse.json({ ok: true, mode: 'bootstrap' })
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return response
}
