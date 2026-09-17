import crypto from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_PREFIX = 'ekartvizit_order_'

function secret() {
  const value = process.env.ORDER_ACCESS_SECRET
  if (!value || value.length < 32) throw new Error('ORDER_ACCESS_SECRET en az 32 karakter olmali')
  return value
}

function signature(orderId: string) {
  return crypto.createHmac('sha256', secret()).update(orderId).digest('base64url')
}

function cookieName(orderId: string) {
  if (!/^[A-Za-z0-9_-]{6,80}$/.test(orderId)) throw new Error('Gecersiz siparis numarasi')
  return `${COOKIE_PREFIX}${orderId}`
}

export async function setOrderAccess(orderId: string) {
  const store = await cookies()
  store.set(cookieName(orderId), signature(orderId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  })
}

export async function hasOrderAccess(orderId: string) {
  const store = await cookies()
  let token: string | undefined
  try { token = store.get(cookieName(orderId))?.value } catch { return false }
  if (!token) return false
  const expected = signature(orderId)
  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
