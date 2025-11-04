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

// Kredi kartı ödeme (Tosla entegrasyonu) - Güncellenmiş
export async function processCreditCardPayment(
  paymentData: PaymentData, 
  cardData: CreditCardData
): Promise<PaymentResult> {
  try {
    console.log('Tosla ödeme işleniyor:', { paymentData, cardData })

    // İstek verisini hazırla (sunucu tarafındaki API route'a gönderilecek)
    const toslaRequest = {
      amount: paymentData.amount,
      currency: paymentData.currency,
      orderId: paymentData.orderId,
      customerInfo: {
        name: paymentData.customerInfo.name,
        email: paymentData.customerInfo.email,
        phone: paymentData.customerInfo.phone
      },
      cardInfo: {
        cardNumber: cardData.cardNumber.replace(/\s/g, ''),
        expiryMonth: cardData.expiryMonth,
        expiryYear: cardData.expiryYear,
        cvc: cardData.cvc,
        cardHolderName: cardData.cardHolderName
      },
      returnUrl: `${window.location.origin}/odeme/basarili?order=${paymentData.orderId}`,
      cancelUrl: `${window.location.origin}/odeme/iptal?order=${paymentData.orderId}`
    }

    // Sunucuya isteği gönder (CORS ve gizli anahtarlar için güvenli yol)
    const response = await fetch('/api/tosla/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toslaRequest)
    })

    const toslaResult = await response.json()

    if (response.ok && toslaResult.success) {
      return {
        success: true,
        paymentId: toslaResult.paymentId,
        redirectUrl: toslaResult.redirectUrl
      }
    } else {
      return {
        success: false,
        errorMessage: toslaResult.error || toslaResult.errorMessage || 'Kredi kartı ödemesi başarısız oldu'
      }
    }
  } catch (error) {
    console.error('Tosla ödeme hatası:', error)
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