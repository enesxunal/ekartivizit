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
  errorEndpoint?: string
  errorDetails?: unknown // Tosla'dan gelen detaylı hata bilgisi
  // 503 vb. durumlarda form ile yönlendirme için HTML dönebilir
  redirectHtml?: string
  // Debug bilgileri (tarayıcıda görünsün)
  debugInfo?: {
    hashString?: string
    requestData?: unknown
    apiUrl?: string
  }
}

// Tosla konfigürasyonu - Resmi API URL'i
// KRİTİK: Tosla SMS'ine göre artık sadece https://entegrasyon.tosla.com kullanılmalı
const TOSLA_BASE_URL = 'https://entegrasyon.tosla.com/api/Payment/'

// Tosla config'i dinamik olarak oku (her çağrıda güncel değerleri alsın)
export const getToslaConfig = (): ToslaConfig => {
  // Environment variable'ları kontrol et
  const envBaseUrl = process.env.TOSLA_BASE_URL
  const envApiUser = process.env.TOSLA_API_USER
  const envApiPass = process.env.TOSLA_API_PASS
  const envClientId = process.env.TOSLA_CLIENT_ID
  
  console.log('=== Tosla Config Debug ===')
  console.log('TOSLA_BASE_URL (env):', envBaseUrl || 'UNDEFINED')
  console.log('TOSLA_API_USER (env):', envApiUser || 'UNDEFINED')
  console.log('TOSLA_CLIENT_ID (env):', envClientId || 'UNDEFINED')
  
  // KRİTİK: Tosla SMS'ine göre sadece entegrasyon.tosla.com kullanılmalı
  // Her durumda hardcoded URL kullan
  const baseUrl = TOSLA_BASE_URL
  
  console.log('Final baseUrl (hardcoded):', baseUrl)
  console.log('=== Config OK ===')
  
  return {
    apiUser: envApiUser || 'apiUser3016658',
    apiPass: envApiPass || 'YN8L293GPY',
    clientId: envClientId || '1000002147',
    baseUrl: baseUrl,
    environment: (process.env.NODE_ENV === 'production' ? 'production' : 'test') as 'test' | 'production'
  }
}

// Backward compatibility için
export const toslaConfig: ToslaConfig = getToslaConfig()

// Tosla ödeme işlemi - Form tabanlı yönlendirme (Kart bilgileri Tosla sayfasında girilir)
export async function processToslaPayment(request: ToslaPaymentRequest): Promise<ToslaPaymentResponse> {
  try {
    const config = getToslaConfig() // Her çağrıda güncel config'i al
    console.log('=== Tosla Payment Başlatılıyor ===')
    console.log('OrderId:', request.orderId)
    console.log('Amount:', request.amount)
    console.log('Config baseUrl:', config.baseUrl)
    
    // URL kontrolü - kesinlikle api.tosla.com içermemeli
    if (config.baseUrl.toLowerCase().includes('api.tosla.com')) {
      console.error('KRİTİK HATA: baseUrl hala api.tosla.com içeriyor!')
      return {
        success: false,
        errorCode: 'INVALID_URL',
        errorMessage: 'Tosla API URL yapılandırması hatalı. Lütfen sistem yöneticisine başvurun.'
      }
    }
    
    // Tosla API URL'i (OpenCart formatına uygun - sonunda / olmalı)
    // KRİTİK: Kesinlikle entegrasyon.tosla.com kullan
    let apiUrl = config.baseUrl.endsWith('/') ? config.baseUrl : config.baseUrl + '/'
    
    // SON KONTROL - Eğer hala api.tosla.com içeriyorsa, direkt değiştir
    if (apiUrl.toLowerCase().includes('api.tosla.com')) {
      console.error('KRİTİK: apiUrl hala api.tosla.com içeriyor! Direkt değiştiriliyor.')
      apiUrl = 'https://entegrasyon.tosla.com/api/Payment/'
    }
    
    console.log('Final API URL:', apiUrl)
    
    // Random ve timestamp oluştur (OpenCart eklentisindeki gibi)
    // KRİTİK: Hash hesaplanırken kullanılan değerler, request'te gönderilen değerlerle TAM OLARAK AYNI olmalı
    const rnd = Math.floor(Math.random() * 10000) + 1
    const timeSpan = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14) // YYYYMMDDHHmmss formatı
    
    // Hash oluştur (SHA512 + Base64) - OpenCart formatına uygun
    // PHP'de: $apiPass . $clientId . $apiUser . $rnd . $timeSpan
    // Tüm değerler string concatenation ile birleştiriliyor
    const crypto = await import('crypto')
    // Hash hesaplamasında kullanılan değerler (string olarak birleştirilecek)
    const hashApiPass = String(config.apiPass)
    const hashClientId = String(config.clientId)
    const hashApiUser = String(config.apiUser)
    const hashRnd = String(rnd) // Hash için string, request için number
    const hashTimeSpan = String(timeSpan) // Hash için string, request için string
    const hashString = hashApiPass + hashClientId + hashApiUser + hashRnd + hashTimeSpan
    const hashBytes = crypto.createHash('sha512').update(hashString).digest()
    const hash = hashBytes.toString('base64')
    
    console.log('=== Hash Debug ===')
    console.log('Hash için kullanılan değerler:')
    console.log('  apiPass:', hashApiPass, '(length:', hashApiPass.length, ')')
    console.log('  clientId:', hashClientId, '(length:', hashClientId.length, ')')
    console.log('  apiUser:', hashApiUser, '(length:', hashApiUser.length, ')')
    console.log('  rnd:', hashRnd, '(type: string, length:', hashRnd.length, ')')
    console.log('  timeSpan:', hashTimeSpan, '(type: string, length:', hashTimeSpan.length, ')')
    console.log('  hashString:', hashString, '(total length:', hashString.length, ')')
    console.log('  hash (base64):', hash)
    
    // startPaymentThreeDSession API çağrısı (kart bilgileri olmadan)
    // OpenCart formatına göre field isimleri - TAM OLARAK AYNI FORMAT
    // PHP'de json_encode() yapıldığında:
    // - Rnd: number olarak gönderilmeli (PHP'de rand() integer döndürüyor)
    // - timeSpan: string olarak gönderilmeli (PHP'de date() string döndürüyor)
    // - amount, currency, installmentCount: number olarak gönderilmeli
    // - clientId, apiUser, Hash: string olarak gönderilmeli
    
    // KRİTİK KONTROLLER:
    // 1. orderId boş olamaz - Tosla API boş orderId kabul etmiyor
    if (!request.orderId || request.orderId.trim() === '') {
      return {
        success: false,
        errorCode: 'INVALID_ORDER_ID',
        errorMessage: 'OrderId boş olamaz'
      }
    }
    
    // 2. callbackUrl geçerli bir URL olmalı
    const callbackUrl = String(request.returnUrl).trim()
    if (!callbackUrl || !callbackUrl.startsWith('http')) {
      return {
        success: false,
        errorCode: 'INVALID_CALLBACK_URL',
        errorMessage: 'CallbackUrl geçerli bir URL olmalı (http veya https ile başlamalı)'
      }
    }
    
    // 3. amount 0'dan büyük olmalı
    const amountInKurus = Math.round(request.amount * 100)
    if (amountInKurus <= 0) {
      return {
        success: false,
        errorCode: 'INVALID_AMOUNT',
        errorMessage: 'Amount 0\'dan büyük olmalı'
      }
    }
    
    const sessionData = {
      clientId: hashClientId, // Hash'te kullanılan aynı değer
      apiUser: hashApiUser, // Hash'te kullanılan aynı değer
      Rnd: rnd, // NUMBER - Hash'te String(rnd) kullanıldı ama request'te number gönderiliyor
      timeSpan: hashTimeSpan, // STRING - Hash'te kullanılan aynı değer
      Hash: hash, // Hesaplanan hash
      callbackUrl: callbackUrl, // Geçerli URL
      orderId: String(request.orderId).trim(), // Boş olamaz
      amount: amountInKurus, // Kuruş cinsinden (1 TL = 100) - Number, 0'dan büyük olmalı
      currency: 949, // TRY - Number
      installmentCount: 0 // Number
    }
    
    console.log('=== Request Data ===')
    console.log(JSON.stringify(sessionData, null, 2))
    
    console.log('Tosla request data:', JSON.stringify(sessionData, null, 2))

    // OpenCart formatında: $this->url . $url
    // Önce VerifyClient ile bağlantıyı test et
    const verifyUrl = `${apiUrl}VerifyClient`
    const verifyData = {
      clientId: config.clientId,
      apiUser: config.apiUser,
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
    
    // OpenCart eklentisinde threeDPayment kullanılıyor
    // startPaymentThreeDSession yerine threeDPayment endpoint'ini kullanıyoruz
    const fullUrl = `${apiUrl}threeDPayment`
    
    // Son kontrol - URL kesinlikle doğru olmalı
    if (fullUrl.toLowerCase().includes('api.tosla.com')) {
      console.error('KRİTİK HATA: fullUrl hala api.tosla.com içeriyor!', fullUrl)
      return {
        success: false,
        errorCode: 'INVALID_URL',
        errorMessage: 'Tosla API URL yapılandırması hatalı. Lütfen sistem yöneticisine başvurun.'
      }
    }
    
    console.log('Tosla API çağrısı yapılıyor (threeDPayment endpoint):', fullUrl)
    console.log('Session Data:', JSON.stringify(sessionData, null, 2))

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(sessionData)
    })

    if (!response.ok) {
      const errorEndpoint = fullUrl
      const errorText = await response.text()
      console.error('Tosla session oluşturma hatası:', response.status, errorText)
      return {
        success: false,
        errorCode: `HTTP_${response.status}`,
        errorEndpoint,
        errorMessage: `Session oluşturulamadı (${errorEndpoint}): ${errorText || 'Yanıt alınamadı'}`
      }
    }

    const responseText = await response.text()
    console.log('Tosla API yanıtı (raw):', responseText)
    
    if (!responseText || responseText.trim() === '') {
      return {
        success: false,
        errorCode: 'EMPTY_RESPONSE',
        errorEndpoint: fullUrl,
        errorMessage: `Sunucudan boş yanıt alındı (${fullUrl})`
      }
    }

    let result
    try {
      result = JSON.parse(responseText)
      console.log('Tosla API yanıtı (parsed):', JSON.stringify(result, null, 2))
    } catch (parseError) {
      console.error('Tosla API JSON parse hatası:', parseError, 'Yanıt:', responseText)
      return {
        success: false,
        errorCode: 'INVALID_JSON',
        errorEndpoint: fullUrl,
        errorMessage: `Geçersiz yanıt formatı (${fullUrl}): ${responseText.substring(0, 100)}`
      }
    }

    // ThreeDSessionId kontrolü - farklı case'leri dene
    const threeDSessionId = result.ThreeDSessionId || result.threeDSessionId || result.threeDSessionID || result.ThreeDSessionID
    console.log('ThreeDSessionId bulundu mu?', !!threeDSessionId)
    console.log('Tüm result keys:', Object.keys(result))
    
    if (!threeDSessionId) {
      const errorMsg = result.ErrorMessage || result.errorMessage || result.message || result.Message || result.error || 'Session ID alınamadı'
      const errorCode = result.ErrorCode || result.errorCode || result.code || result.Code || 'SESSION_FAILED'
      console.error('Session ID alınamadı. Hata:', errorMsg, 'Kod:', errorCode)
      console.error('Tüm yanıt:', JSON.stringify(result, null, 2))
      
      // Tüm yanıtı error message'a ekle ki görebilelim
      // Debug bilgilerini de ekle (tarayıcıda görünsün)
      return {
        success: false,
        errorCode: errorCode,
        errorEndpoint: fullUrl,
        errorMessage: `${errorMsg} (${fullUrl})`,
        errorDetails: result, // Tüm yanıtı ekle
        debugInfo: {
          hashString: hashString,
          hashStringLength: hashString.length,
          requestData: sessionData,
          apiUrl: fullUrl,
          hashComponents: {
            apiPass: hashApiPass,
            clientId: hashClientId,
            apiUser: hashApiUser,
            rnd: hashRnd,
            timeSpan: hashTimeSpan
          }
        }
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
    const config = getToslaConfig()
    const apiUrl = config.baseUrl.endsWith('/') ? config.baseUrl : config.baseUrl + '/'
    
    // Random ve timestamp oluştur
    const rnd = Math.floor(Math.random() * 10000) + 1
    const timeSpan = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)
    
    // Hash oluştur
    const crypto = await import('crypto')
    const hashString = config.apiPass + config.clientId + config.apiUser + rnd + timeSpan
    const hashBytes = crypto.createHash('sha512').update(hashString).digest()
    const hash = hashBytes.toString('base64')
    
    const queryData = {
      clientId: config.clientId,
      apiUser: config.apiUser,
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
    const config = getToslaConfig()
    // Tosla webhook imza doğrulaması
    const crypto = await import('crypto')
    
    // Tosla'nın webhook secret key'i ile HMAC-SHA256 hash oluştur
    const expectedSignature = crypto
      .createHmac('sha256', config.apiPass)
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
  const config = getToslaConfig()
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
        <input type="hidden" name="ApiUser" value="${config.apiUser}" />
        <input type="hidden" name="ApiPass" value="${config.apiPass}" />
        <input type="hidden" name="ClientId" value="${config.clientId}" />
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
    const config = getToslaConfig()
    const testData = {
      ApiUser: config.apiUser,
      ApiPass: config.apiPass,
      ClientId: config.clientId,
      Test: true
    }

    const response = await fetch(`${config.baseUrl}/test/connection`, {
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