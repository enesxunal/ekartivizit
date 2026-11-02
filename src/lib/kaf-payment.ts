export const KAF_PAYMENT_PRODUCT_ID = 'test-kaf-grup-katalog-baski-2026-54000'
export const KAF_PAYMENT_AMOUNT = 54000
export const KAF_PAYMENT_EXPIRES_AT = new Date('2026-11-09T20:59:59.000Z')

export function isKafPaymentExpired(now = new Date()) {
  return now.getTime() > KAF_PAYMENT_EXPIRES_AT.getTime()
}
