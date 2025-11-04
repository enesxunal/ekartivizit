// Tosla Ödeme Entegrasyonu
// Tosla Sanal POS API Entegrasyonu
// https://tosla.com/isim-icin/gelistirici-merkezi

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

// Tosla konfigürasyonu - Güncellenmiş API bilgileri
export const toslaConfig: ToslaConfig = {
  apiUser: process.env.TOSLA_API_USER || 'apiUser3016658',
  apiPass: process.env.TOSLA_API_PASS || 'YN8L293GPY',
  clientId: process.env.TOSLA_CLIENT_ID || '1000002147',
  baseUrl: process.env.TOSLA_BASE_URL || 'https://secure.tosla.com/api',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'test') as 'test' | 'production'
}

// Tosla ödeme işlemi - Güncellenmiş API entegrasyonu
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
      CancelUrl: request.cancelUrl,
      Language: 'tr',
      Installment: 0, // Tek çekim
      Description: `E-Kartvizit Siparişi - ${request.orderId}`
    }

    const response = await fetch(`${toslaConfig.baseUrl}/Payment/Process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'E-Kartvizit/1.0'
      },
      body: JSON.stringify(paymentData)
    })

    // Önce yanıtın durumunu kontrol et
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Tosla API hata yanıtı:', response.status, errorText)
      return {
        success: false,
        errorCode: `HTTP_${response.status}`,
        errorMessage: `Sunucu hatası: ${response.status}. ${errorText || 'Yanıt alınamadı'}`
      }
    }

    // Yanıt içeriğini güvenli bir şekilde oku
    const responseText = await response.text()
    
    if (!responseText || responseText.trim() === '') {
      console.error('Tosla API boş yanıt döndü')
      return {
        success: false,
        errorCode: 'EMPTY_RESPONSE',
        errorMessage: 'Sunucudan boş yanıt alındı'
      }
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Tosla API JSON parse hatası:', parseError, 'Yanıt:', responseText)
      return {
        success: false,
        errorCode: 'INVALID_JSON',
        errorMessage: `Geçersiz yanıt formatı: ${responseText.substring(0, 100)}`
      }
    }

    if (result.Success || result.success) {
      return {
        success: true,
        paymentId: result.PaymentId || result.paymentId,
        redirectUrl: result.RedirectUrl || result.redirectUrl || `/odeme/basarili?payment=${request.orderId}`
      }
    } else {
      return {
        success: false,
        errorCode: result.ErrorCode || result.errorCode || 'PAYMENT_FAILED',
        errorMessage: result.ErrorMessage || result.errorMessage || 'Ödeme işlemi başarısız oldu'
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

// Ödeme durumu sorgulama - Güncellenmiş
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
        'Accept': 'application/json',
        'User-Agent': 'E-Kartvizit/1.0'
      },
      body: JSON.stringify(queryData)
    })

    const result = await response.json()

    if (result.Success || result.success) {
      const statusMapping: Record<string, 'pending' | 'success' | 'failed' | 'cancelled'> = {
        'PENDING': 'pending',
        'SUCCESS': 'success',
        'COMPLETED': 'success',
        'APPROVED': 'success',
        'FAILED': 'failed',
        'ERROR': 'failed',
        'DECLINED': 'failed',
        'CANCELLED': 'cancelled',
        'CANCELED': 'cancelled'
      }

      return {
        status: statusMapping[result.Status || result.status] || 'failed',
        amount: result.Amount || result.amount,
        paidAt: result.PaidAt || result.paidAt
      }
    } else {
      return { status: 'failed' }
    }
  } catch {
    return { status: 'failed' }
  }
}

// Webhook doğrulama - Güncellenmiş
export async function verifyToslaWebhook(payload: string, signature: string): Promise<boolean> {
  try {
    // Tosla webhook imza doğrulaması
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

// Tosla ödeme formu oluşturma yardımcı fonksiyonu - Güncellenmiş
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
      <input type="hidden" name="ApiPass" value="${toslaConfig.apiPass}" />
      <input type="hidden" name="ClientId" value="${toslaConfig.clientId}" />
      <input type="hidden" name="Amount" value="${orderData.amount}" />
      <input type="hidden" name="Currency" value="${orderData.currency}" />
      <input type="hidden" name="OrderId" value="${orderData.orderId}" />
      <input type="hidden" name="CustomerName" value="${orderData.customerInfo.name}" />
      <input type="hidden" name="CustomerEmail" value="${orderData.customerInfo.email}" />
      <input type="hidden" name="CustomerPhone" value="${orderData.customerInfo.phone}" />
      <input type="hidden" name="ReturnUrl" value="${orderData.returnUrl}" />
      <input type="hidden" name="CancelUrl" value="${orderData.cancelUrl}" />
      <input type="hidden" name="Language" value="tr" />
      <input type="hidden" name="Installment" value="0" />
      <input type="hidden" name="Description" value="E-Kartvizit Siparişi - ${orderData.orderId}" />
      <button type="submit">Ödeme Yap</button>
    </form>
    <script>
      document.getElementById('toslaPaymentForm').submit();
    </script>
  `
}

// Tosla test ödeme fonksiyonu
export async function testToslaConnection(): Promise<{
  success: boolean
  message: string
  details?: unknown
}> {
  try {
    const testData = {
      ApiUser: toslaConfig.apiUser,
      ApiPass: toslaConfig.apiPass,
      ClientId: toslaConfig.clientId,
      Test: true
    }

    const response = await fetch(`${toslaConfig.baseUrl}/test/connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testData)
    })

    const result = await response.json()

    if (result.Success || result.success) {
      return {
        success: true,
        message: 'Tosla bağlantısı başarılı',
        details: result
      }
    } else {
      return {
        success: false,
        message: result.ErrorMessage || result.errorMessage || 'Bağlantı testi başarısız',
        details: result
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Bağlantı hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'),
      details: error
    }
  }
} 