import { createHmac, timingSafeEqual } from 'crypto'

export const ADMIN_COOKIE_NAME = 'ekartvizit_admin_session'

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)
  if (aBuffer.length !== bBuffer.length) return false
  return timingSafeEqual(aBuffer, bBuffer)
}

function getAdminConfig() {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.ADMIN_SESSION_SECRET

  if (!username || !password || !sessionSecret) {
    return null
  }

  return { username, password, sessionSecret }
}

export function validateAdminCredentials(username: string, password: string) {
  const config = getAdminConfig()
  if (!config) return false
  return safeEqual(username, config.username) && safeEqual(password, config.password)
}

export function createAdminSessionToken() {
  const config = getAdminConfig()
  if (!config) return null
  return createHmac('sha256', config.sessionSecret).update(config.username).digest('hex')
}

export function validateAdminSessionToken(token?: string) {
  if (!token) return false
  const expected = createAdminSessionToken()
  return expected ? safeEqual(token, expected) : false
}
