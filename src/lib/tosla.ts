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
  // 503 vb. durumlarda form ile yönlendirme için HTML dönebilir
  redirectHtml?: string
}

// Tosla konfigürasyonu - Güncellenmiş API bilgileri
export const toslaConfig: ToslaConfig = {
  apiUser: process.env.TOSLA_API_USER || 'apiUser3016658',
  apiPass: process.env.TOSLA_API_PASS || 'YN8L293GPY',
  clientId: process.env.TOSLA_CLIENT_ID || '1000002147',
  baseUrl: process.env.TOSLA_BASE_URL || 'https://secure.tosla.com/api',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'test') as 'test' | 'production'
}

// Tosla ödeme işlemi - Form tabanlı yönlendirme (Kart bilgileri Tosla sayfasında girilir)
export async function processToslaPayment(request: ToslaPaymentRequest): Promise<ToslaPaymentResponse> {
  try {
    console.log('Tosla ödeme oturumu oluşturuluyor:', request.orderId)
    
    // Tosla ödeme sayfasına yönlendirme için form oluştur
    // Kart bilgileri Tosla'nın sayfasında girilecek
    const html = createToslaPaymentForm({
      orderId: request.orderId,
      amount: request.amount,
      currency: request.currency,
      customerInfo: request.customerInfo,
      returnUrl: request.returnUrl,
      cancelUrl: request.cancelUrl,
    })

    return {
      success: true,
      redirectHtml: html
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

// Tosla ödeme formu oluşturma yardımcı fonksiyonu - Tosla'nın gerçek ödeme sayfasına yönlendirme
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
  // Tosla'nın gerçek ödeme sayfası URL'i
  const toslaPaymentUrl = 'https://secure.tosla.com/payment'
  
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ödeme İşlemi Yapılıyor...</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
        }
        .loading {
            text-align: center;
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #59af05;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loading">
        <div class="spinner"></div>
        <p>Tosla ödeme sayfasına yönlendiriliyorsunuz...</p>
    </div>
    <form id="toslaPaymentForm" method="POST" action="${toslaPaymentUrl}">
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
    </form>
    <script>
        // Formu otomatik gönder
        setTimeout(function() {
            document.getElementById('toslaPaymentForm').submit();
        }, 500);
    </script>
</body>
</html>
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