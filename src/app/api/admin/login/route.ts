import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, createAdminSessionToken, validateAdminCredentials } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ ok: false, error: 'Kullanıcı adı veya şifre hatalı.' }, { status: 401 })
  }

  const token = createAdminSessionToken()
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Admin auth environment variables are missing.' }, { status: 503 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return response
}
