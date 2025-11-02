# E-Kartvizit Cloudflare Kurulum Rehberi

Bu rehber, E-Kartvizit sitesini Cloudflare üzerinden nasıl kuracağınızı adım adım açıklar.

## ☁️ Cloudflare Avantajları

- **Ücretsiz SSL sertifikası**
- **CDN (Content Delivery Network)**
- **DDoS koruması**
- **Kolay DNS yönetimi**
- **Güvenlik özellikleri**
- **Analytics ve monitoring**

## 📋 Kurulum Adımları

### 1. Cloudflare Hesabı Oluşturma

1. [cloudflare.com](https://cloudflare.com) adresine gidin
2. "Sign Up" butonuna tıklayın
3. E-posta adresinizi girin
4. Şifre oluşturun
5. Hesabınızı doğrulayın

### 2. Domain Ekleme

1. Cloudflare Dashboard'a giriş yapın
2. "Add a Site" butonuna tıklayın
3. Domain adını girin: `ekartvizit.co`
4. "Add Site" butonuna tıklayın
5. **Free plan** seçin
6. "Continue" butonuna tıklayın

### 3. Nameserver Değişikliği

Cloudflare size 2 nameserver verecek:

```
Nameserver 1: ns1.cloudflare.com
Nameserver 2: ns2.cloudflare.com
```

Bu nameserver'ları domain sağlayıcınızda ayarlayın:

1. Domain sağlayıcınızın kontrol paneline giriş yapın
2. DNS ayarlarına gidin
3. Nameserver'ları yukarıdaki gibi değiştirin
4. Değişiklikleri kaydedin

### 4. DNS Kayıtları Ekleme

Cloudflare DNS panelinde şu kayıtları ekleyin:

#### A Record (Ana Domain)
- **Type:** A
- **Name:** @ (veya boş)
- **IPv4 address:** 89.252.179.40
- **Proxy status:** Proxied (turuncu bulut)
- **TTL:** Auto

#### CNAME Record (WWW)
- **Type:** CNAME
- **Name:** www
- **Target:** ekartvizit.co
- **Proxy status:** Proxied (turuncu bulut)
- **TTL:** Auto

### 5. SSL/TLS Ayarları

1. **SSL/TLS > Overview** bölümüne gidin
2. **Encryption mode:** "Full" seçin
3. **Always Use HTTPS:** "On" yapın
4. **Minimum TLS Version:** "1.2" seçin

### 6. Güvenlik Ayarları

#### Security > Settings
- **Security Level:** Medium
- **Browser Integrity Check:** On
- **Challenge Passage:** 30 minutes

#### Security > WAF
- **Web Application Firewall:** On
- **Rate Limiting:** On

### 7. Performance Ayarları

#### Speed > Optimization
- **Auto Minify:** CSS, HTML, JS aktif
- **Brotli:** On
- **Early Hints:** On

#### Caching
- **Browser Cache TTL:** 4 hours
- **Always Online:** On

## 🔧 Sunucu Ayarları

### Nginx Konfigürasyonu

Sunucuda nginx.conf dosyasını güncelleyin:

```bash
# Sunucuya bağlanın
ssh root@89.252.179.40

# Nginx konfigürasyonunu güncelleyin
nano /etc/nginx/sites-available/ekartvizit.co
```

### SSL Sertifikası

Cloudflare SSL kullandığımız için sunucuda SSL kurulumuna gerek yok:

```bash
# SSL sertifikası almayın (Cloudflare hallediyor)
# certbot --nginx -d ekartvizit.co -d www.ekartvizit.co
```

## 📊 Monitoring ve Analytics

### Cloudflare Analytics

1. **Analytics > Traffic** bölümüne gidin
2. Ziyaretçi istatistiklerini görüntüleyin
3. **Analytics > Performance** bölümünde hız metriklerini kontrol edin

### Güvenlik Monitoring

1. **Security > Events** bölümünde saldırı loglarını görüntüleyin
2. **Security > Analytics** bölümünde güvenlik istatistiklerini kontrol edin

## 🔍 Test ve Doğrulama

### DNS Testi

```bash
# DNS çözümlemesi test edin
nslookup ekartvizit.co
dig ekartvizit.co

# Cloudflare IP'lerini kontrol edin
dig ekartvizit.co +short
```

### SSL Testi

1. [ssllabs.com](https://ssllabs.com) adresine gidin
2. `ekartvizit.co` domain'ini test edin
3. SSL skorunu kontrol edin (A+ olmalı)

### Hız Testi

1. [gtmetrix.com](https://gtmetrix.com) adresine gidin
2. `https://ekartvizit.co` adresini test edin
3. PageSpeed skorunu kontrol edin

## 🚨 Sorun Giderme

### DNS Yayılma Sorunları

- **Süre:** 24-48 saat
- **Kontrol:** `nslookup ekartvizit.co`
- **Çözüm:** Bekleyin, nameserver'ları kontrol edin

### SSL Sorunları

- **Mixed Content:** HTTPS zorunlu yapın
- **Certificate Errors:** Cloudflare SSL ayarlarını kontrol edin
- **Redirect Loop:** Nginx konfigürasyonunu kontrol edin

### Performance Sorunları

- **Cache:** Cloudflare cache ayarlarını kontrol edin
- **CDN:** Proxy status'u kontrol edin
- **Optimization:** Auto minify ayarlarını kontrol edin

## 📞 Destek

### Faydalı Linkler

- **Cloudflare Status:** [status.cloudflare.com](https://status.cloudflare.com)
- **Cloudflare Community:** [community.cloudflare.com](https://community.cloudflare.com)
- **Cloudflare Docs:** [developers.cloudflare.com](https://developers.cloudflare.com)

### İletişim

- **E-posta:** info@ekartvizit.co
- **Cloudflare Support:** Dashboard > Help Center

---

**Son Güncelleme:** 2024-01-01
**Versiyon:** 1.0.0
