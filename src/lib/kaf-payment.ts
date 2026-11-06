export const KAF_PAYMENT_PRODUCT_ID = 'test-kaf-grup-katalog-baski-2026-54000'
export const KAF_PAYMENT_WEBSITE_ID = 'test-kaf-grup-web-tasarim-2026-54000'
export const KAF_PAYMENT_PRODUCT_IDS = [KAF_PAYMENT_PRODUCT_ID, KAF_PAYMENT_WEBSITE_ID] as const

export const KAF_PAYMENT_ITEM_AMOUNT = 54000
export const KAF_PAYMENT_AMOUNT = 108000
export const KAF_PAYMENT_EXPIRES_AT = new Date('2026-11-09T20:59:59.000Z')

export function isKafPaymentExpired(now = new Date()) {
  return now.getTime() > KAF_PAYMENT_EXPIRES_AT.getTime()
}
