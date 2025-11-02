# 🔥 Firewall ve Cloudflare Ayarları

`ufw` kurulu değil. Sorun değil. İşte çözümler:

---

## ✅ ADIM 1: Nginx Proxy Testi

Sunucuda Nginx'in proxy yapıp yapmadığını test edin:

```bash
curl http://localhost
```

**Enter** basın.

✅ **Başarılı:** HTML içeriği göreceksiniz (Nginx proxy çalışıyor).

---

## ✅ ADIM 2: Harici IP'den Test (Cloudflare Olmadan)

Sunucunun kendi IP'sinden test edin:

**Başka bir terminal'den (kendi bilgisayarınızdan):**

Windows PowerShell veya Terminal'de:

```bash
curl http://89.252.179.40
```

**Enter** basın.

✅ **Başarılı:** HTML içeriği göreceksiniz (sunucu çalışıyor).

❌ **Hata:** Bağlantı hatası (firewall veya port kapalı olabilir).

---

## 🔧 FIREWALL ÇÖZÜMÜ: iptables Kullanın

Eğer `ufw` yoksa, muhtemelen `iptables` kullanılıyor:

### Port 80'i kontrol edin:

```bash
iptables -L -n | grep 80
```

**Enter** basın.

### Port 80 ve 443'ü açın:

```bash
iptables -I INPUT -p tcp --dport 80 -j ACCEPT
iptables -I INPUT -p tcp --dport 443 -j ACCEPT
```

**Enter** basın (her komuttan sonra).

### iptables kurallarını kaydedin:

```bash
apt install -y iptables-persistent
netfilter-persistent save
```

**Enter** basın (her komuttan sonra).

---

## 🔧 CLOUDFLARE SSL/TLS AYARLARI

Cloudflare'de SSL/TLS ayarlarını kontrol edin:

1. **Cloudflare Dashboard** → **SSL/TLS**
2. **Overview** bölümünde:
   - **Encryption mode:** **Full** seçin
   - (HTTPS'ten HTTP'ye çalışır - sunucuda SSL sertifikası gerekmez)

3. **Edge Certificates:**
   - **Always Use HTTPS:** Açık olabilir
   - **Automatic HTTPS Rewrites:** Açık olabilir

---

## 🔧 CLOUDFLARE ORIGIN SERVER AYARLARI

1. **SSL/TLS** → **Origin Server**
2. **Authenticated Origin Pulls:** Kapalı olmalı (şimdilik)
3. **Minimum TLS Version:** 1.2 veya üstü

---

## 📋 ÖZET: Yapılacaklar

### Sunucuda:

1. `curl http://localhost` (Nginx proxy test)
2. `iptables -L -n | grep 80` (port kontrolü)
3. `iptables -I INPUT -p tcp --dport 80 -j ACCEPT` (port aç)
4. `iptables -I INPUT -p tcp --dport 443 -j ACCEPT` (port aç)

### Cloudflare'de:

1. **SSL/TLS** → **Encryption mode:** **Full** seçin
2. **DNS** → A Record kontrol: `89.252.179.40` ve **Proxied** ✅

---

## 🆘 HALA ERROR 521 VERİYORSA

### Seçenek 1: Cloudflare'i Geçici Devre Dışı Bırakın

Cloudflare'de DNS kaydında **DNS-only (gri bulut)** yapın:

1. **DNS** → A Record'u düzenleyin
2. **Proxy status:** **DNS-only** yapın (gri bulut)
3. Birkaç dakika bekleyin
4. Site açılıyor mu test edin

Eğer açılıyorsa, sorun Cloudflare ayarlarında.

### Seçenek 2: SSL Sertifikası Ekleyin

Sunucuda SSL sertifikası kurun:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ekartvizit.co -d www.ekartvizit.co
```

Sonra Cloudflare'de **Full (strict)** kullanın.

---

**Önce `curl http://localhost` komutunu çalıştırın!**

---

**Son Güncelleme:** 2024
