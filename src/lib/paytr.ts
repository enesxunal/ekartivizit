import crypto from 'node:crypto'

const PAYTR_TOKEN_URL = 'https://www.paytr.com/odeme/api/get-token'
const PAYTR_IFRAME_URL = 'https://www.paytr.com/odeme/guvenli'

function required(name: 'PAYTR_MERCHANT_ID' | 'PAYTR_MERCHANT_KEY' | 'PAYTR_MERCHANT_SALT') {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} tanimli degil.`)
  return value
}

export function getPaytrConfig() {
  return {
    merchantId: required('PAYTR_MERCHANT_ID'),
    merchantKey: required('PAYTR_MERCHANT_KEY'),
    merchantSalt: required('PAYTR_MERCHANT_SALT'),
    testMode: process.env.PAYTR_TEST_MODE === '0' ? '0' : '1',
    debugOn: process.env.PAYTR_DEBUG_ON === '0' ? '0' : '1',
  }
}

export type PaytrTokenInput = {
  orderId: string
  email: string
  amount: number
  userIp: string
  userName: string
  userAddress: string
  userPhone: string
  items: Array<{ name: string; price: number; quantity: number }>
  okUrl: string
  failUrl: string
}

export async function createPaytrIframeToken(input: PaytrTokenInput) {
  const config = getPaytrConfig()
  const paymentAmount = String(Math.round(input.amount * 100))
  const basket = Buffer.from(JSON.stringify(
    input.items.map((item) => [item.name, item.price.toFixed(2), item.quantity])
  )).toString('base64')
  const noInstallment = '0'
  const maxInstallment = '0'
  const currency = 'TL'

  const hashStr =
    config.merchantId +
    input.userIp +
    input.orderId +
    input.email +
    paymentAmount +
    basket +
    noInstallment +
    maxInstallment +
    currency +
    config.testMode

  const paytrToken = crypto
    .createHmac('sha256', config.merchantKey)
    .update(hashStr + config.merchantSalt)
    .digest('base64')

  const form = new URLSearchParams({
    merchant_id: config.merchantId,
    user_ip: input.userIp,
    merchant_oid: input.orderId,
    email: input.email,
    payment_amount: paymentAmount,
    paytr_token: paytrToken,
    user_basket: basket,
    debug_on: config.debugOn,
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: input.userName,
    user_address: input.userAddress,
    user_phone: input.userPhone,
    merchant_ok_url: input.okUrl,
    merchant_fail_url: input.failUrl,
    timeout_limit: '30',
    currency,
    test_mode: config.testMode,
    lang: 'tr',
  })

  const response = await fetch(PAYTR_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
    cache: 'no-store',
  })

  const text = await response.text()
  let data: { status?: string; token?: string; reason?: string }
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(`PayTR gecersiz yanit dondurdu: ${text.slice(0, 200)}`)
  }

  if (!response.ok || data.status !== 'success' || !data.token) {
    throw new Error(data.reason || `PayTR token alinamadi (HTTP ${response.status}).`)
  }

  return {
    token: data.token,
    iframeUrl: `${PAYTR_IFRAME_URL}/${encodeURIComponent(data.token)}`,
    testMode: config.testMode === '1',
  }
}

export function verifyPaytrCallback(input: {
  merchantOid: string
  status: string
  totalAmount: string
  hash: string
}) {
  const config = getPaytrConfig()
  const expected = crypto
    .createHmac('sha256', config.merchantKey)
    .update(input.merchantOid + config.merchantSalt + input.status + input.totalAmount)
    .digest('base64')

  const actualBuffer = Buffer.from(input.hash)
  const expectedBuffer = Buffer.from(expected)
  return actualBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(actualBuffer, expectedBuffer)
}
