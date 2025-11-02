# 🔒 SSL ve Domain Çözümü

Site IP'den açılıyor ama:
1. ✅ IP üzerinden çalışıyor: `http://89.252.179.40`
2. ❌ SSL yok: HTTPS çalışmıyor
3. ❌ Domain çalışmıyor: `ekartvizit.co` açılmıyor

---

## ✅ ÇÖZÜM 1: SSL Sertifikası Kurun

Sunucuda Let's Encrypt SSL sertifikası kurun:

### ADIM 1: Certbot Kurun

```bash
apt install -y certbot python3-certbot-nginx
```

**Enter** basın ve bekleyin (1-2 dakika).

---

### ADIM 2: SSL Sertifikası Alın

```bash
certbot --nginx -d ekartvizit.co -d www.ekartvizit.co
```

**Enter** basın ve talimatları izleyin:

1. **Email adresi** isteyecek → Email'inizi yazın
2. **Terms of Service** → `A` yazıp Enter (Agree)
3. **Share email** → `Y` veya `N` yazıp Enter
4. **SSL sertifikası** otomatik kurulacak ve Nginx yapılandırılacak

✅ **Başarılı:** "Congratulations! Your certificate and chain have been saved" mesajı göreceksiniz.

---

### ADIM 3: Otomatik Yenilemeyi Test Edin

```bash
certbot renew --dry-run
```

**Enter** basın.

✅ **Başarılı:** Otomatik yenileme çalışıyor.

---

## ✅ ÇÖZÜM 2: Cloudflare DNS Ayarlarını Kontrol Edin

Domain çalışmıyorsa, Cloudflare DNS ayarlarını kontrol edin:

### ADIM 1: Cloudflare DNS Kayıtları

1. **Cloudflare Dashboard** → **DNS**
2. **A Record kontrol:**
   - Name: `@` veya `ekartvizit.co`
   - Content: `89.252.179.40`
   - Proxy: **Proxied (turuncu bulut)** ✅

3. **CNAME Record kontrol:**
   - Name: `www`
   - Content: `ekartvizit.co`
   - Proxy: **Proxied (turuncu bulut)** ✅

---

### ADIM 2: Cloudflare SSL/TLS Ayarları

SSL sertifikası kurduktan sonra:

1. **Cloudflare Dashboard** → **SSL/TLS**
2. **Overview:**
   - **Encryption mode:** **Full (strict)** seçin ✅
   - (HTTPS'ten HTTPS'ye - SSL sertifikası gerekiyor)

---

## ✅ ÇÖZÜM 3: Nginx'i Yeniden Başlatın

SSL sertifikası kurulduktan sonra:

```bash
systemctl reload nginx
```

**Enter** basın.

veya

```bash
systemctl restart nginx
```

**Enter** basın.

---

## ✅ ÇÖZÜM 4: Nginx Konfigürasyonunu Kontrol Edin

SSL kurulduktan sonra Nginx otomatik yapılandırılacak. Kontrol edin:

```bash
cat /etc/nginx/sites-available/ekartvizit.co
```

**Enter** basın.

✅ **Görmelisiniz:**
- `listen 443 ssl;`
- `ssl_certificate` satırları
- `server_name ekartvizit.co www.ekartvizit.co;`

---

## 📋 ÖZET: SSL Kurulum Adımları

1. `apt install -y certbot python3-certbot-nginx` (Certbot kur)
2. `certbot --nginx -d ekartvizit.co -d www.ekartvizit.co` (SSL sertifikası al)
3. Email ve onayları gir
4. `systemctl reload nginx` (Nginx'i yeniden yükle)
5. `certbot renew --dry-run` (Otomatik yenilemeyi test et)
6. Cloudflare'de **Full (strict)** yap

**Her komuttan sonra Enter basın ve talimatları izleyin!**

---

## 🌐 DOMAIN ÇALIŞMAMASI İÇİN

Eğer SSL kurulduktan sonra da domain çalışmıyorsa:

### Cloudflare DNS Propagation

1. **Cloudflare Dashboard** → **DNS**
2. **A Record:** Tekrar kontrol edin
   - Content: `89.252.179.40` ✅
   - Proxy: **Proxied** ✅

3. **2-5 dakika bekleyin** (DNS propagation)

4. Tarayıcıda **Hard Refresh** yapın:
   - Windows: `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

---

## ✅ BAŞARILI OLDUKTAN SONRA

Site çalışmalı:
- ✅ `http://ekartvizit.co` (HTTP)
- ✅ `https://ekartvizit.co` (HTTPS)
- ✅ `http://www.ekartvizit.co` (HTTP)
- ✅ `https://www.ekartvizit.co` (HTTPS)

---

**Önce SSL sertifikası kurun: `certbot --nginx -d ekartvizit.co -d www.ekartvizit.co`**

---

**Son Güncelleme:** 2024
