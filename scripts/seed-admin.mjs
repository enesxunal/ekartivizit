import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD
const name = process.env.ADMIN_NAME?.trim() || 'E-Kartvizit Admin'

if (!email || !email.includes('@') || !password || password.length < 12) {
  console.error('ADMIN_EMAIL ve en az 12 karakter ADMIN_PASSWORD gerekli.')
  process.exit(1)
}

try {
  const passwordHash = await bcrypt.hash(password, 12)
  const user = await db.user.upsert({
    where: { email },
    update: { name, passwordHash, role: 'ADMIN' },
    create: { name, email, passwordHash, role: 'ADMIN' }
  })
  console.log(`Admin hazir: ${user.email}`)
} finally {
  await db.$disconnect()
}
