import crypto from 'node:crypto'
import { cookies } from 'next/headers'
import { db } from './db'

const SESSION_COOKIE = 'ekartvizit_session'
const SESSION_DAYS = 30

const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex')

export async function createUserSession(userId: string) {
  const token = crypto.randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)

  await db.userSession.create({
    data: { userId, tokenHash: hashToken(token), expiresAt }
  })

  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt
  })
}

export async function destroyUserSession() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (token) {
    await db.userSession.deleteMany({ where: { tokenHash: hashToken(token) } })
  }
  store.set(SESSION_COOKIE, '', { httpOnly: true, expires: new Date(0), path: '/' })
}

export async function getCurrentUser() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null

  const session = await db.userSession.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: { include: { addresses: true } } }
  })

  if (!session || session.expiresAt <= new Date()) {
    if (session) await db.userSession.delete({ where: { id: session.id } })
    return null
  }

  return session.user
}
