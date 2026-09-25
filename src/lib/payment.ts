// Ödeme yöntemleri
export type PaymentMethod = 'whatsapp' | 'credit-card' | 'bank-transfer'

export interface PaymentData {
  orderId: string
  amount: number
  currency: string
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: {
      street: string
      city: string
      district: string
      postalCode: string
    }
  }
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
}

export interface CreditCardData {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvc: string
  cardHolderName: string
}

export interface PaymentResult {
  success: boolean
  paymentId?: string
  errorMessage?: string
  redirectUrl?: string
}

// WhatsApp ödeme
export async function processWhatsAppPayment(paymentData: PaymentData): Promise<PaymentResult> {
  try {
    // WhatsApp mesajı oluştur
    const message = createWhatsAppOrderMessage(paymentData)
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '')
    if (!number) return { success: false, errorMessage: 'WhatsApp siparis hatti yapilandirilmamis' }
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    
    return {
      success: true,
      redirectUrl: whatsappUrl,
      paymentId: `wa-${Date.now()}`
    }
  } catch {
    return {
      success: false,
      errorMessage: 'WhatsApp ödeme işlemi başlatılamadı'
    }
  }
}

// Kredi/banka kartı ödeme (PayTR iFrame API)
export async function processCreditCardPayment(
  paymentData: PaymentData,
  _cardData: CreditCardData
): Promise<PaymentResult> {
  void _cardData
  try {
    const response = await fetch('/api/paytr/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: paymentData.orderId })
    })

    const result = await response.json().catch(() => ({}))
    if (!response.ok || !result.success || !result.token) {
      return {
        success: false,
        errorMessage: result.message || 'PayTR ödeme oturumu başlatılamadı'
      }
    }

    return {
      success: true,
      paymentId: `paytr-${paymentData.orderId}`,
      redirectUrl: `/odeme/paytr?token=${encodeURIComponent(result.token)}&order=${encodeURIComponent(paymentData.orderId)}`
    }
  } catch (error) {
    console.error('PayTR ödeme hatası:', error)
    return {
      success: false,
      errorMessage: 'Kredi kartı ödemesi işlenirken hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')
    }
  }
}

// Banka havalesi
export async function processBankTransferPayment(paymentData: PaymentData): Promise<PaymentResult> {
  try {
    // Banka bilgileri ve ödeme talimatları
    const iban = process.env.NEXT_PUBLIC_BANK_IBAN?.trim()
    if (!iban) return { success: false, errorMessage: 'Banka havalesi bilgileri henuz yapilandirilmamis' }
    return {
      success: true,
      paymentId: `bt-${Date.now()}`,
      redirectUrl: `/siparis-onay/${paymentData.orderId}`
    }
  } catch {
    return {
      success: false,
      errorMessage: 'Banka havalesi işlemi başlatılamadı'
    }
  }
}

// Kapıda ödeme kullanılmıyor; kart ödemeleri PayTR üzerinden alınır

// WhatsApp sipariş mesajı oluştur
function createWhatsAppOrderMessage(paymentData: PaymentData): string {
  const { orderId, amount, customerInfo, items } = paymentData
  
  const itemsList = items.map(item => 
    `• ${item.name} - ${item.quantity} adet - ${item.price}₺`
  ).join('\n')
  
  return `Merhaba! E-Kartvizit siparişim hakkında bilgi almak istiyorum.

Sipariş No: ${orderId}
Toplam Tutar: ${amount}₺

Müşteri Bilgileri:
Ad Soyad: ${customerInfo.name}
E-posta: ${customerInfo.email}
Telefon: ${customerInfo.phone}

Sipariş Detayları:
${itemsList}

Teslimat adresi ve ödeme seçenekleri hakkında bilgi alabilir miyim?`
}

// Ödeme durumu kontrol
export async function checkPaymentStatus(paymentId: string): Promise<{
  status: 'pending' | 'paid' | 'failed' | 'cancelled'
  amount?: number
  paidAt?: string
}> {
  try {
    // Gerçek ödeme sağlayıcısından durum kontrolü
    // Şimdilik simüle edilmiş
    
    if (paymentId.startsWith('wa-')) {
      return { status: 'pending' } // WhatsApp ödemeleri manuel onay gerektirir
    }
    
    if (paymentId.startsWith('paytr-')) {
      return { status: 'pending' }
    }
    
    return { status: 'pending' }
  } catch {
    return { status: 'failed' }
  }
}

// Ödeme yöntemi bilgileri
export const paymentMethods = {
  whatsapp: {
    name: 'WhatsApp ile Sipariş',
    description: 'WhatsApp üzerinden sipariş verin, ödemeyi istediğiniz şekilde yapın',
    icon: '💬',
    fee: 0,
    processingTime: 'Anında'
  },
  'credit-card': {
    name: 'Kredi/Banka Kartı',
    description: 'PayTR ile güvenli kart ödemesi',
    icon: '💳',
    fee: 0,
    processingTime: 'Anında'
  },
  'bank-transfer': {
    name: 'Banka Havalesi/EFT',
    description: 'Banka hesabımıza havale veya EFT ile ödeme',
    icon: '🏦',
    fee: 0,
    processingTime: '1-2 iş günü'
  }
} 