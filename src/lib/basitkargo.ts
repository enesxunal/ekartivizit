const DEFAULT_BASE_URL = 'https://basitkargo.com/api'

export type BasitKargoPackage = {
  height: number
  width: number
  depth: number
  weight: number
}

export type BasitKargoShipmentResponse = {
  id?: string
  barcode?: string | null
  status?: string
  handlerShipmentCode?: string | null
  shipmentInfo?: { handlerShipmentCode?: string | null; status?: string }
  [key: string]: unknown
}

function config() {
  return {
    baseUrl: (process.env.BASITKARGO_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, ''),
    token: process.env.BASITKARGO_API_TOKEN || '',
    addressId: process.env.BASITKARGO_ADDRESS_ID || '',
    brandId: process.env.BASITKARGO_BRAND_ID || '',
    handlerCode: process.env.BASITKARGO_HANDLER_CODE || 'ECONOMIC',
  }
}

export function isBasitKargoConfigured() {
  return Boolean(config().token)
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const current = config()
  if (!current.token) throw new Error('BasitKargo API tokeni tanimli degil.')

  const response = await fetch(current.baseUrl + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${current.token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  })

  const body = await response.text()
  let payload: unknown = body
  try {
    payload = body ? JSON.parse(body) : null
  } catch {
    // Non-JSON errors are kept for diagnostics.
  }

  if (!response.ok) {
    const retryAfter = response.headers.get('retry-after')
    const suffix = retryAfter ? ` Retry-After: ${retryAfter}s.` : ''
    throw new Error(`BasitKargo API ${response.status}: ${typeof payload === 'string' ? payload : JSON.stringify(payload)}.${suffix}`)
  }

  return payload as T
}

export function normalizeBasitKargoStatus(value?: string | null) {
  const status = String(value || '').toUpperCase()
  if (['DELIVERED'].includes(status)) return 'delivered'
  if (['SHIPPED', 'OUT_FOR_DELIVERY'].includes(status)) return 'shipping'
  if (['RETURNING', 'RETURNED'].includes(status)) return 'returned'
  if (['LOST', 'NEEDS_SUPPORT', 'DELAYED'].includes(status)) return 'problem'
  if (['READY_TO_SHIP', 'CREATED', 'PREPARING'].includes(status)) return 'prepared'
  return status ? status.toLowerCase() : 'pending'
}

export const basitKargo = {
  configured: isBasitKargoConfigured,

  async healthCheck() {
    const [handlers, balance, brands, addresses] = await Promise.all([
      this.listHandlers(),
      this.balance(),
      this.brands(),
      this.addresses(),
    ])
    return { handlers, balance, brands, addresses }
  },

  async listHandlers() {
    return request<Array<{ name: string; code: string; logo?: string }>>('/handlers')
  },

  async balance() {
    return request<number>('/firm/balance')
  },

  async brands() {
    return request<Array<{ id: string; name: string; status?: string }>>('/firm/brand')
  },

  async addresses() {
    return request<Array<{ id: string; name: string; city?: string; town?: string }>>('/firm/address')
  },

  async quotePackages(packages: BasitKargoPackage[]) {
    return request<Array<{ desiKg: number; handlerCode: string; price: number }>>('/handlers/fee/packages', {
      method: 'POST',
      body: JSON.stringify(packages),
    })
  },

  async createShipment(input: {
    orderNo: string
    items: Array<{ name: string; code?: string | null; quantity: number }>
    packages: BasitKargoPackage[]
    recipient: { name: string; phone: string; email?: string | null; city: string; town: string; address: string }
    handlerCode?: string
  }) {
    const current = config()
    const payload = {
      handlerCode: input.handlerCode || current.handlerCode,
      type: 'OUTGOING',
      content: {
        name: `E-Kartvizit ${input.orderNo}`,
        code: input.orderNo,
        items: input.items.map((item) => ({
          name: item.name,
          code: item.code || undefined,
          quantity: String(item.quantity),
        })),
        packages: input.packages,
      },
      client: {
        name: input.recipient.name,
        phone: input.recipient.phone,
        email: input.recipient.email || undefined,
        city: input.recipient.city,
        town: input.recipient.town,
        address: input.recipient.address,
      },
      addressId: current.addressId || undefined,
      brandId: current.brandId || undefined,
    }

    return request<BasitKargoShipmentResponse>('/v2/order/barcode', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async getByTrackingCode(code: string) {
    return request<BasitKargoShipmentResponse>(`/v2/order/handler-shipment-code/${encodeURIComponent(code)}`)
  },

  async getByBarcode(barcode: string) {
    return request<BasitKargoShipmentResponse>(`/v2/order/barcode/${encodeURIComponent(barcode)}`)
  },

  async lookup(code: string) {
    try {
      return await this.getByTrackingCode(code)
    } catch {
      return this.getByBarcode(code)
    }
  },

  trackingCode(response: BasitKargoShipmentResponse) {
    return String(
      response.handlerShipmentCode ||
      response.shipmentInfo?.handlerShipmentCode ||
      response.barcode ||
      ''
    ).trim()
  },
}
