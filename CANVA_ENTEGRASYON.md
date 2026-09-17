# Canva Entegrasyonu - E-Kartvizit

Bu dokümantasyon, E-Kartvizit projesinde Canva entegrasyonunun nasıl kurulacağını ve kullanılacağını açıklar.

## 🎯 Genel Bakış

Canva entegrasyonu, müşterilerin sitemizden ayrılmadan tasarım yapabilmelerini sağlar. Müşteri Canva hesabıyla giriş yapar ve tasarım editörü sitenizde embed olarak yüklenir.

## 🔧 Kurulum Adımları

### 1. Canva Developer Hesabı Oluşturma

1. [Canva Developers](https://www.canva.com/developers/) adresine gidin
2. Developer hesabınızı oluşturun
3. Yeni bir App oluşturun

### 2. App Konfigürasyonu

**App Details:**
- **App Name:** E-Kartvizit Design Tool
- **App Description:** Online tasarım editörü
- **Category:** Design Tools

**OAuth Settings:**
- **Redirect URIs:** 
  - `https://ekartvizit.tr/api/canva/callback` (production)
  - `http://localhost:3000/canva/callback` (development)

**Scopes:**
- `design:read`
- `design:write`

### 3. Environment Variables

`.env.local` dosyasına aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_CANVA_APP_ID=your_app_id_from_canva_dashboard
CANVA_CLIENT_SECRET=your_client_secret_from_canva_dashboard
NEXT_PUBLIC_CANVA_REDIRECT_URI=http://localhost:3000/canva/callback
```

### 4. Test Etme

1. https://ekartvizit.tr/canva-test sayfasına gidin
2. "Gerçek OAuth Test" butonuna tıklayın
3. Canva'ya yönlendirileceksiniz
4. Giriş yaptıktan sonra callback URL'inize geri döneceksiniz

## 🚀 Kullanım

### Müşteri Akışı

1. Müşteri ürün sayfasından "Tasarım Oluştur" butonuna tıklar
2. Canva kimlik doğrulama popup'ı açılır
3. Müşteri Canva hesabıyla giriş yapar
4. Tasarım editörü sitenizde embed olarak yüklenir
5. Tasarım tamamlandıktan sonra PDF olarak export edilir
6. PDF admin panelinde görüntülenebilir ve indirilebilir

### API Endpoints

**Callback Endpoint:**
```
POST /api/canva/callback
```

**Test Endpoint:**
```
GET /canva-test
```

## 🔍 Test Adımları

### 1. OAuth Flow Test

```bash
# Test URL'ini ziyaret edin
curl "https://ekartvizit.tr/api/canva/callback?code=test_code&state=test_state"
```

### 2. Gerçek OAuth Test

1. https://ekartvizit.tr/canva-test sayfasına gidin
2. "Gerçek OAuth Başlat" butonuna tıklayın
3. Canva'ya yönlendirileceksiniz
4. Giriş yaptıktan sonra callback URL'inize geri döneceksiniz

### 3. Callback URL Test

```bash
# Test callback URL'ini ziyaret edin
curl "https://ekartvizit.tr/api/canva/callback?code=test_code&state=test_state"
```

## 📋 Gereksinimler

### Canva Developer Panel

**App Settings:**
- **App Name:** E-Kartvizit Design Tool
- **App Description:** Online tasarım editörü
- **Category:** Design Tools

**OAuth Settings:**
- **Redirect URIs:** 
  - `https://ekartvizit.tr/api/canva/callback` (production)
  - `http://localhost:3000/canva/callback` (development)

**Scopes:**
- `design:read`
- `design:write`

### Environment Variables

```env
NEXT_PUBLIC_CANVA_APP_ID=your_app_id_from_canva_dashboard
CANVA_CLIENT_SECRET=your_client_secret_from_canva_dashboard
NEXT_PUBLIC_CANVA_REDIRECT_URI=http://localhost:3000/canva/callback
```

## 🛠️ Teknik Detaylar

### OAuth Flow

1. **Authorization Request:**
   ```
   GET https://www.canva.com/api/oauth/authorize?
     response_type=code&
     client_id=YOUR_CLIENT_ID&
     redirect_uri=https://ekartvizit.tr/api/canva/callback&
     scope=design:read design:write&
     state=random_state_string
   ```

2. **Token Exchange:**
   ```
   POST https://api.canva.com/rest/v1/oauth/token
   Content-Type: application/x-www-form-urlencoded
   
   grant_type=authorization_code&
   code=AUTHORIZATION_CODE&
   client_id=YOUR_CLIENT_ID&
   client_secret=YOUR_CLIENT_SECRET&
   redirect_uri=https://ekartvizit.tr/api/canva/callback
   ```

3. **Design API Calls:**
   ```
   GET https://api.canva.com/rest/v1/designs
   Authorization: Bearer ACCESS_TOKEN
   ```

### Error Handling

**Common Errors:**
- `invalid_client`: Client ID veya Client Secret hatalı
- `invalid_redirect_uri`: Redirect URI Canva'da tanımlı değil
- `invalid_scope`: İstenen scope'lar mevcut değil
- `access_denied`: Kullanıcı izin vermedi

**Error Response Format:**
```json
{
  "error": "error_code",
  "error_description": "Error description",
  "state": "original_state"
}
```

## 🔒 Güvenlik

### Best Practices

1. **State Parameter:** Her OAuth isteğinde benzersiz state parametresi kullanın
2. **HTTPS:** Production'da mutlaka HTTPS kullanın
3. **Token Storage:** Access token'ları güvenli bir şekilde saklayın
4. **Scope Validation:** Sadece gerekli scope'ları isteyin

### Security Headers

```typescript
// API response headers
{
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin'
}
```

## 📊 Monitoring

### Logs

**OAuth Events:**
- Authorization request
- Token exchange
- Design API calls
- Error responses

**Log Format:**
```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "event": "oauth_authorization",
  "client_id": "YOUR_CLIENT_ID",
  "user_id": "USER_ID",
  "status": "success|error",
  "error_code": "ERROR_CODE",
  "error_description": "ERROR_DESCRIPTION"
}
```

### Metrics

**Key Metrics:**
- OAuth success rate
- Token exchange success rate
- Design API response time
- Error rate by error type

## 🚀 Deployment

### Production Checklist

- [ ] Canva Developer Panel'de production URL'leri tanımlı
- [ ] Environment variables production'da ayarlı
- [ ] HTTPS sertifikası aktif
- [ ] Error handling test edildi
- [ ] Monitoring aktif

### Environment Variables (Production)

```env
NEXT_PUBLIC_CANVA_APP_ID=your_production_app_id
CANVA_CLIENT_SECRET=your_production_client_secret
NEXT_PUBLIC_CANVA_REDIRECT_URI=https://ekartvizit.tr/canva/callback
```

## 📞 Destek

### Test Sayfası

**URL:** https://ekartvizit.tr/canva-test

**Özellikler:**
- OAuth flow test
- Callback URL test
- Error simulation
- Configuration display

### Debugging

**Common Issues:**
1. **Redirect URI Mismatch:** Canva'da tanımlı URL ile kod arasında uyumsuzluk
2. **Invalid Client:** Client ID veya Client Secret hatalı
3. **Scope Issues:** İstenen scope'lar mevcut değil
4. **Network Issues:** API çağrıları başarısız

**Debug Steps:**
1. Browser console'da hataları kontrol edin
2. Network tab'da API çağrılarını inceleyin
3. Canva Developer Panel'de app ayarlarını kontrol edin
4. Environment variables'ları doğrulayın

## 📚 Kaynaklar

- [Canva Developers Documentation](https://www.canva.com/developers/)
- [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749)
- [Canva API Reference](https://www.canva.com/developers/api-reference/)

---

**Son Güncelleme:** 2024-01-01
**Versiyon:** 1.0.0 