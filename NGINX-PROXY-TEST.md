# ✅ Localhost:3000 Çalışıyor - Nginx Proxy Testi

Next.js uygulaması port 3000'de çalışıyor! Şimdi Nginx'in proxy yapıp yapmadığını kontrol edelim:

---

## ✅ ADIM 1: Nginx Proxy Testi

Sunucuda curl ile Nginx üzerinden test edin:

```bash
curl http://localhost
```

**Enter** basın.

✅ **Başarılı:** HTML içeriği göreceksiniz (Nginx proxy çalışıyor).

---

## ✅ ADIM 2: Nginx Access Loglarını Kontrol Edin

```bash
tail -20 /var/log/nginx/access.log
```

**Enter** basın.

İsteklerin gelip gelmediğini göreceksiniz.

---

## ✅ ADIM 3: Nginx Error Loglarını Kontrol Edin

```bash
tail -20 /var/log/nginx/error.log
```

**Enter** basın.

Hata mesajlarını göreceksiniz.

---

## 🔍 CLOUDFLARE ERROR 521 ÇÖZÜMÜ

Eğer localhost:3000 çalışıyorsa ama Cloudflare hala Error 521 veriyorsa:

### Sorun 1: Cloudflare Ayarları

1. **Cloudflare Dashboard'a giriş yapın**
2. **DNS ayarlarına** gidin
3. **A Record'u kontrol edin:**
   - Name: `@` veya `ekartvizit.co`
   - Content: `89.252.179.40` (sunucu IP)
   - Proxy: **Proxied (yeşil bulut)** olmalı ✅

4. **SSL/TLS ayarlarına** gidin:
   - Encryption mode: **Full** veya **Full (strict)**

### Sorun 2: Firewall Ayarları

Sunucuda port 80'in açık olduğunu kontrol edin:

```bash
ufw status
```

**Enter** basın.

Port 80 açık olmalı. Değilse:

```bash
ufw allow 80/tcp
ufw allow 443/tcp
```

**Enter** basın.

---

## 🔍 ADIM 4: Harici IP'den Test Edin

Sunucunun kendi IP'sinden test edin (Cloudflare olmadan):

Başka bir terminal'den (kendi bilgisayarınızdan):

```bash
curl http://89.252.179.40
```

**Enter** basın.

✅ **Başarılı:** HTML içeriği göreceksiniz.

---

## 📋 ÖZET: Kontrol Adımları

1. `curl http://localhost` (Nginx proxy test)
2. `tail -20 /var/log/nginx/error.log` (Nginx hataları)
3. Cloudflare DNS ve SSL/TLS ayarlarını kontrol edin

**Her komuttan sonra Enter basın.**

---

## 🆘 HALA ERROR 521 VERİYORSA

### Cloudflare SSL/TLS Ayarları:

1. **Cloudflare Dashboard** → **SSL/TLS**
2. **Encryption mode:** 
   - **Full** seçin (HTTPS'ten HTTP'ye)
   - veya **Full (strict)** (HTTPS'ten HTTPS'ye - SSL sertifikası gerektirir)

3. **Origin Server:**
   - **Authenticated Origin Pulls:** Kapalı olabilir
   - **Minimum TLS Version:** 1.2 veya üstü

---

**Önce `curl http://localhost` komutunu çalıştırın ve sonucu paylaşın!**

---

**Son Güncelleme:** 2024
