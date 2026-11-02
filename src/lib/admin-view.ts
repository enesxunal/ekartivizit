export type PaymentState = 'pending' | 'paid' | 'failed' | 'refunded'
export type OrderState = 'pending' | 'confirmed' | 'preparing' | 'printing' | 'shipping' | 'delivered' | 'cancelled'
export type AdminOrder = {
  id: string
  createdAt: string
  updatedAt: string
  customerInfo: { name: string; email: string; phone: string; address?: { street: string; city: string; district: string; postalCode?: string } }
  items: { id: string; product: { id: string; name: string }; quantity: number; cartQuantity: number; price: number; selectedSize?: string; selectedMaterial?: string }[]
  status: OrderState
  paymentStatus: PaymentState
  paymentMethod: string
  total: number
  notes?: string
  trackingNumber?: string
  paymentAttempts?: { status: PaymentState; provider: string; amount: number; createdAt: string; lastEvent: string | null }[]
}
export type Overview = {
  days: number
  totals: { allOrders: number; paidOrders: number; paidRevenue: number; periodRevenue: number; periodPaidOrders: number; pendingPayments: number; failedPayments: number }
  daily: { date: string; total: number; count: number }[]
  recent: AdminOrder[]
  topProducts: { name: string; quantity: number; revenue: number }[]
  truncated: boolean
}
export const money = (v: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 }).format(v)
export const dateTime = (v: string) => new Date(v).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' })
export const orderLabels: Record<OrderState, string> = {
  pending: 'Bekliyor', confirmed: 'Onaylandı', preparing: 'Hazırlanıyor', printing: 'Baskıda',
  shipping: 'Kargoda', delivered: 'Teslim edildi', cancelled: 'İptal'
}
export const paymentLabels: Record<PaymentState, string> = {
  pending: 'Ödeme bekliyor', paid: 'Ödendi', failed: 'Başarısız', refunded: 'İade'
}
export const paymentClasses: Record<PaymentState, string> = {
  pending: 'bg-amber-100 text-amber-900', paid: 'bg-emerald-100 text-emerald-900',
  failed: 'bg-red-100 text-red-900', refunded: 'bg-slate-200 text-slate-700'
}
