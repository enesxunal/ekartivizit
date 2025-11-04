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

// Tosla konfigürasyonu - Resmi API URL'i (sonunda / olmalı)
export const toslaConfig: ToslaConfig = {
  apiUser: process.env.TOSLA_API_USER || 'apiUser3016658',
  apiPass: process.env.TOSLA_API_PASS || 'YN8L293GPY',
  clientId: process.env.TOSLA_CLIENT_ID || '1000002147',
  baseUrl: process.env.TOSLA_BASE_URL || 'https://entegrasyon.tosla.com/api/Payment/',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'test') as 'test' | 'production'
}

// Tosla ödeme işlemi - Form tabanlı yönlendirme (Kart bilgileri Tosla sayfasında girilir)
export async function processToslaPayment(request: ToslaPaymentRequest): Promise<ToslaPaymentResponse> {
  try {
    console.log('Tosla ödeme oturumu oluşturuluyor:', request.orderId)
    
    // Tosla API URL'i (OpenCart formatına uygun - sonunda / olmalı)
    const apiUrl = toslaConfig.baseUrl.endsWith('/') ? toslaConfig.baseUrl : toslaConfig.baseUrl + '/'
    
    // Random ve timestamp oluştur (OpenCart eklentisindeki gibi)
    const rnd = Math.floor(Math.random() * 10000) + 1
    const timeSpan = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14) // YYYYMMDDHHmmss formatı
    
    // Hash oluştur (SHA512 + Base64) - OpenCart formatına uygun
    const crypto = await import('crypto')
    const hashString = toslaConfig.apiPass + toslaConfig.clientId + toslaConfig.apiUser + rnd + timeSpan
    const hashBytes = crypto.createHash('sha512').update(hashString).digest()
    const hash = hashBytes.toString('base64')
    
    // startPaymentThreeDSession API çağrısı (kart bilgileri olmadan)
    const sessionData = {
      clientId: toslaConfig.clientId,
      apiUser: toslaConfig.apiUser,
      Rnd: rnd,
      timeSpan: timeSpan,
      Hash: hash,
      callbackUrl: request.returnUrl,
      orderId: request.orderId,
      amount: Math.round(request.amount * 100), // Kuruş cinsinden (1 TL = 100)
      currency: 949, // TRY
      installmentCount: 0
    }

    // OpenCart formatında: $this->url . $url
    // Önce VerifyClient ile bağlantıyı test et
    const verifyUrl = `${apiUrl}VerifyClient`
    const verifyData = {
      clientId: toslaConfig.clientId,
      apiUser: toslaConfig.apiUser,
      Rnd: rnd,
      timeSpan: timeSpan,
      Hash: hash
    }
    
    console.log('Tosla VerifyClient test:', verifyUrl)
    
    try {
      const verifyResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(verifyData)
      })
      
      const verifyText = await verifyResponse.text()
      console.log('VerifyClient yanıtı:', verifyResponse.status, verifyText)
    } catch (verifyError) {
      console.error('VerifyClient hatası:', verifyError)
    }
    
    const fullUrl = `${apiUrl}startPaymentThreeDSession`
    
    console.log('Tosla API çağrısı:', fullUrl, JSON.stringify(sessionData, null, 2))

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(sessionData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Tosla session oluşturma hatası:', response.status, errorText)
      return {
        success: false,
        errorCode: `HTTP_${response.status}`,
        errorMessage: `Session oluşturulamadı: ${errorText || 'Yanıt alınamadı'}`
      }
    }

    const responseText = await response.text()
    if (!responseText || responseText.trim() === '') {
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

    // ThreeDSessionId kontrolü
    const threeDSessionId = result.ThreeDSessionId || result.threeDSessionId
    
    if (!threeDSessionId) {
      const errorMsg = result.ErrorMessage || result.errorMessage || 'Session ID alınamadı'
      return {
        success: false,
        errorCode: result.ErrorCode || result.errorCode || 'SESSION_FAILED',
        errorMessage: errorMsg
      }
    }

    // Tosla'nın 3D Secure sayfasına yönlendirme URL'i
    const threeDSecureUrl = `${apiUrl}threeDSecure/${threeDSessionId}`
    
    // HTML form oluştur ve otomatik yönlendir
    const html = `
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
    <script>
        // Tosla'nın 3D Secure sayfasına yönlendir
        window.location.href = "${threeDSecureUrl}";
    </script>
</body>
</html>
    `

    return {
      success: true,
      redirectHtml: html,
      paymentId: threeDSessionId
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

// Ödeme durumu sorgulama - OpenCart formatına uygun
export async function checkToslaPaymentStatus(paymentId: string): Promise<{
  status: 'pending' | 'success' | 'failed' | 'cancelled'
  amount?: number
  paidAt?: string
}> {
  try {
    const apiUrl = toslaConfig.baseUrl.endsWith('/') ? toslaConfig.baseUrl : toslaConfig.baseUrl + '/'
    
    // Random ve timestamp oluştur
    const rnd = Math.floor(Math.random() * 10000) + 1
    const timeSpan = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)
    
    // Hash oluştur
    const crypto = await import('crypto')
    const hashString = toslaConfig.apiPass + toslaConfig.clientId + toslaConfig.apiUser + rnd + timeSpan
    const hashBytes = crypto.createHash('sha512').update(hashString).digest()
    const hash = hashBytes.toString('base64')
    
    const queryData = {
      clientId: toslaConfig.clientId,
      apiUser: toslaConfig.apiUser,
      Rnd: rnd,
      timeSpan: timeSpan,
      Hash: hash,
      orderId: paymentId
    }

    const response = await fetch(`${apiUrl}inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(queryData)
    })

    if (!response.ok) {
      return { status: 'failed' }
    }

    const responseText = await response.text()
    if (!responseText) {
      return { status: 'failed' }
    }

    const result = JSON.parse(responseText)

    // OpenCart eklentisindeki gibi BankResponseCode kontrolü
    if (result.BankResponseCode === '00') {
      return {
        status: 'success',
        amount: result.Amount ? result.Amount / 100 : undefined, // Kuruştan TL'ye çevir
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