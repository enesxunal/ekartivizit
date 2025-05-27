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
    const whatsappUrl = `https://wa.me/905XXXXXXXXX?text=${encodeURIComponent(message)}`
    
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

// Kredi kartı ödeme (Tosla entegrasyonu)
export async function processCreditCardPayment(
  paymentData: PaymentData, 
  cardData: CreditCardData
): Promise<PaymentResult> {
  try {
    console.log('Tosla ödeme işleniyor:', { paymentData, cardData })
    
    // Tosla ödeme entegrasyonu burada olacak
    // const toslaResult = await processToslaPayment(paymentData, cardData)
    
    // Şimdilik simüle edilmiş başarılı ödeme
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      success: true,
      paymentId: `tosla-${Date.now()}-${Math.random().toString(36).substring(7)}`
    }
  } catch {
    return {
      success: false,
      errorMessage: 'Kredi kartı ödemesi başarısız oldu'
    }
  }
}

// Banka havalesi
export async function processBankTransferPayment(paymentData: PaymentData): Promise<PaymentResult> {
  try {
    // Banka bilgileri ve ödeme talimatları
    const bankInfo = {
      bankName: 'Türkiye İş Bankası',
      accountName: 'E-Kartvizit Ltd. Şti.',
      iban: 'TR64 0006 4000 0011 2345 6789 01',
      accountNumber: '1234567890',
      reference: `EK-${paymentData.orderId}`
    }
    
    return {
      success: true,
      paymentId: `bt-${Date.now()}`,
      redirectUrl: `/odeme/banka-havalesi?ref=${bankInfo.reference}`
    }
  } catch {
    return {
      success: false,
      errorMessage: 'Banka havalesi işlemi başlatılamadı'
    }
  }
}

// Kapıda ödeme kaldırıldı - Tosla entegrasyonu kullanılacak

// WhatsApp sipariş mesajı oluştur
function createWhatsAppOrderMessage(paymentData: PaymentData): string {
  const { orderId, amount, customerInfo, items } = paymentData
  
  let message = `🛒 *YENİ SİPARİŞ* 🛒\n\n`
  message += `📋 *Sipariş No:* ${orderId}\n`
  message += `👤 *Müşteri:* ${customerInfo.name}\n`
  message += `📧 *E-posta:* ${customerInfo.email}\n`
  message += `📱 *Telefon:* ${customerInfo.phone}\n\n`
  
  if (customerInfo.address) {
    message += `📍 *Adres:*\n${customerInfo.address.street}\n${customerInfo.address.district}/${customerInfo.address.city} ${customerInfo.address.postalCode}\n\n`
  }
  
  message += `🛍️ *Sipariş Detayları:*\n`
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   Adet: ${item.quantity} | Fiyat: ${item.price}₺\n`
  })
  
  message += `\n💰 *Toplam Tutar:* ${amount}₺\n\n`
  message += `✅ Siparişi onaylıyorum ve ödeme yapmak istiyorum.`
  
  return message
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
    
    if (paymentId.startsWith('tosla-')) {
      return { 
        status: 'paid', 
        amount: 100, // Örnek tutar
        paidAt: new Date().toISOString() 
      }
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
    description: 'Tosla ile güvenli 3D Secure ödeme',
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