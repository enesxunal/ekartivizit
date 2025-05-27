// Tosla Ödeme Entegrasyonu
// Tosla Sanal POS API Entegrasyonu

export interface ToslaConfig {
  apiUser: string
  apiPass: string
  clientId: string
  baseUrl: string
  environment: 'test' | 'production'
}

export interface ToslaPaymentRequest {
  amount: number
  currency: string
  orderId: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  cardInfo: {
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvc: string
    cardHolderName: string
  }
  returnUrl: string
  cancelUrl: string
}

export interface ToslaPaymentResponse {
  success: boolean
  paymentId?: string
  redirectUrl?: string
  errorCode?: string
  errorMessage?: string
}

// Tosla konfigürasyonu
export const toslaConfig: ToslaConfig = {
  apiUser: process.env.TOSLA_API_USER || 'apiUser3016658',
  apiPass: process.env.TOSLA_API_PASS || 'YN8L293GPY',
  clientId: process.env.TOSLA_CLIENT_ID || '1000002147',
  baseUrl: process.env.TOSLA_BASE_URL || 'https://api.tosla.com',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'test') as 'test' | 'production'
}

// Tosla ödeme işlemi
export async function processToslaPayment(request: ToslaPaymentRequest): Promise<ToslaPaymentResponse> {
  try {
    console.log('Tosla ödeme başlatılıyor:', request.orderId)
    
    // Tosla API'ye ödeme isteği gönder
    const paymentData = {
      ApiUser: toslaConfig.apiUser,
      ApiPass: toslaConfig.apiPass,
      ClientId: toslaConfig.clientId,
      Amount: request.amount,
      Currency: request.currency,
      OrderId: request.orderId,
      CardNumber: request.cardInfo.cardNumber,
      ExpiryMonth: request.cardInfo.expiryMonth,
      ExpiryYear: request.cardInfo.expiryYear,
      CVC: request.cardInfo.cvc,
      CardHolderName: request.cardInfo.cardHolderName,
      CustomerName: request.customerInfo.name,
      CustomerEmail: request.customerInfo.email,
      CustomerPhone: request.customerInfo.phone,
      ReturnUrl: request.returnUrl,
      CancelUrl: request.cancelUrl
    }

    const response = await fetch(`${toslaConfig.baseUrl}/payment/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(paymentData)
    })

    const result = await response.json()

    if (result.Success) {
      return {
        success: true,
        paymentId: result.PaymentId,
        redirectUrl: result.RedirectUrl || `/odeme/basarili?payment=${request.orderId}`
      }
    } else {
      return {
        success: false,
        errorCode: result.ErrorCode || 'PAYMENT_FAILED',
        errorMessage: result.ErrorMessage || 'Ödeme işlemi başarısız oldu'
      }
    }
  } catch (error) {
    console.error('Tosla ödeme hatası:', error)
    return {
      success: false,
      errorCode: 'NETWORK_ERROR',
      errorMessage: 'Ağ bağlantı hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')
    }
  }
}

// Ödeme durumu sorgulama
export async function checkToslaPaymentStatus(paymentId: string): Promise<{
  status: 'pending' | 'success' | 'failed' | 'cancelled'
  amount?: number
  paidAt?: string
}> {
  try {
    const queryData = {
      ApiUser: toslaConfig.apiUser,
      ApiPass: toslaConfig.apiPass,
      ClientId: toslaConfig.clientId,
      PaymentId: paymentId
    }

    const response = await fetch(`${toslaConfig.baseUrl}/payment/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(queryData)
    })

    const result = await response.json()

    if (result.Success) {
      const statusMapping: Record<string, 'pending' | 'success' | 'failed' | 'cancelled'> = {
        'PENDING': 'pending',
        'SUCCESS': 'success',
        'COMPLETED': 'success',
        'FAILED': 'failed',
        'ERROR': 'failed',
        'CANCELLED': 'cancelled',
        'CANCELED': 'cancelled'
      }

      return {
        status: statusMapping[result.Status] || 'failed',
        amount: result.Amount,
        paidAt: result.PaidAt
      }
    } else {
      return { status: 'failed' }
    }
  } catch {
    return { status: 'failed' }
  }
}

// Webhook doğrulama
export async function verifyToslaWebhook(payload: string, signature: string): Promise<boolean> {
  try {
    // Tosla webhook imza doğrulaması
    // Tosla'nın webhook imza algoritması kullanılacak
    const crypto = await import('crypto')
    
    // Tosla'nın webhook secret key'i ile HMAC-SHA256 hash oluştur
    const expectedSignature = crypto
      .createHmac('sha256', toslaConfig.apiPass)
      .update(payload)
      .digest('hex')
    
    // İmzaları karşılaştır
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  } catch {
    return false
  }
}

// Tosla ödeme formu oluşturma yardımcı fonksiyonu
export function createToslaPaymentForm(orderData: {
  orderId: string
  amount: number
  currency: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  returnUrl: string
  cancelUrl: string
}): string {
  return `
    <form id="toslaPaymentForm" method="POST" action="${toslaConfig.baseUrl}/payment/form">
      <input type="hidden" name="ApiUser" value="${toslaConfig.apiUser}" />
      <input type="hidden" name="ClientId" value="${toslaConfig.clientId}" />
      <input type="hidden" name="Amount" value="${orderData.amount}" />
      <input type="hidden" name="Currency" value="${orderData.currency}" />
      <input type="hidden" name="OrderId" value="${orderData.orderId}" />
      <input type="hidden" name="CustomerName" value="${orderData.customerInfo.name}" />
      <input type="hidden" name="CustomerEmail" value="${orderData.customerInfo.email}" />
      <input type="hidden" name="CustomerPhone" value="${orderData.customerInfo.phone}" />
      <input type="hidden" name="ReturnUrl" value="${orderData.returnUrl}" />
      <input type="hidden" name="CancelUrl" value="${orderData.cancelUrl}" />
      <button type="submit">Ödeme Yap</button>
    </form>
    <script>
      document.getElementById('toslaPaymentForm').submit();
    </script>
  `
} 