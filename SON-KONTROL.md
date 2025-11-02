# ✅ Cloudflare Ayarları Doğru - Son Kontroller

Cloudflare SSL/TLS ayarları doğru: **"Full"** ✅

Şimdi son kontrolleri yapalım:

---

## ✅ ADIM 1: Nginx Proxy Testi

Sunucuda Nginx'in proxy yapıp yapmadığını test edin:

```bash
curl http://localhost
```

**Enter** basın.

✅ **Başarılı:** HTML içeriği göreceksiniz (Nginx proxy çalışıyor).

---

## ✅ ADIM 2: Nginx Error Loglarını Kontrol Edin

```bash
tail -20 /var/log/nginx/error.log
```

**Enter** basın.

Hata var mı kontrol edin.

---

## ✅ ADIM 3: Nginx Access Loglarını Kontrol Edin

```bash
tail -20 /var/log/nginx/access.log
```

**Enter** basın.

İstekler geliyor mu kontrol edin.

---

## 🔧 CLOUDFLARE ERROR 521 ÇÖZÜMÜ

Cloudflare ayarları doğru ama hala Error 521 alıyorsanız:

### Seçenek 1: Cloudflare'i Yeniden Yükleyin

1. **Cloudflare Dashboard** → **DNS**
2. A Record'u **düzenleyin**
3. **Proxied** durumunu değiştirin (DNS-only yapıp tekrar Proxied yapın)
4. **Save** tıklayın
5. 2-3 dakika bekleyin

### Seçenek 2: Cloudflare Cache'i Temizleyin

1. **Cloudflare Dashboard** → **Caching**
2. **Purge Everything** butonuna tıklayın
3. **Purge** onaylayın

### Seçenek 3: SSL Sertifikası Ekleyin (İsteğe Bağlı)

Eğer **Full (strict)** kullanmak isterseniz, sunucuda SSL sertifikası kurun:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ekartvizit.co -d www.ekartvizit.co
```

**Enter** basın ve talimatları izleyin.

Sonra Cloudflare'de **Full (strict)** kullanın.

---

## 🔍 PORT KONTROLÜ

Port 80 ve 443'ün açık olup olmadığını kontrol edin:

```bash
netstat -tlnp | grep -E '80|443'
```

**Enter** basın.

veya

```bash
ss -tlnp | grep -E '80|443'
```

**Enter** basın.

✅ **Görmelisiniz:** Port 80'de Nginx çalışıyor olmalı.

---

## 📋 ÖZET: Son Kontroller

1. `curl http://localhost` (Nginx proxy test)
2. `tail -20 /var/log/nginx/error.log` (Nginx hataları)
3. `netstat -tlnp | grep 80` (port 80 kontrolü)
4. Cloudflare'de cache temizle

**Her komuttan sonra Enter basın.**

---

## 🆘 HALA ERROR 521 VERİYORSA

### Acil Çözüm: Cloudflare'i Geçici Devre Dışı Bırakın

1. **Cloudflare Dashboard** → **DNS**
2. A Record'u düzenleyin
3. **Proxy status:** **DNS-only** (gri bulut) yapın
4. **Save** tıklayın
5. 2-3 dakika bekleyin
6. Site açılıyor mu test edin

Eğer DNS-only'da açılıyorsa, sorun Cloudflare ayarlarında.

Sonra tekrar **Proxied** yapın ve SSL/TLS ayarlarını kontrol edin.

---

**Önce `curl http://localhost` komutunu çalıştırın ve sonucu paylaşın!**

---

**Son Güncelleme:** 2024
