# 🔍 Localhost Test ve Çözüm

PM2 ve port 3000 çalışıyor. Şimdi bağlantıyı test edelim:

---

## ✅ ADIM 1: Localhost:3000'i Test Edin

Sunucuda curl ile test edin:

```bash
curl http://localhost:3000
```

**Enter** basın.

✅ **Başarılı:** HTML içeriği göreceksiniz (uzun bir çıktı olacak).
❌ **Hata:** "Connection refused" veya başka bir hata göreceksiniz.

---

## ✅ ADIM 2: HTTP Headers Test

Daha basit test:

```bash
curl -I http://localhost:3000
```

**Enter** basın.

✅ **Başarılı:** `HTTP/1.1 200 OK` veya benzeri göreceksiniz.

---

## ✅ ADIM 3: Nginx'in Localhost:3000'e Bağlanıp Bağlanamadığını Test Edin

Nginx'den localhost:3000'e istek atalım:

```bash
curl http://localhost
```

**Enter** basın.

✅ **Başarılı:** HTML içeriği göreceksiniz (Nginx proxy çalışıyor).
❌ **Hata:** Bağlantı hatası göreceksiniz.

---

## ✅ ADIM 4: Nginx Access Loglarını Kontrol Edin

```bash
tail -20 /var/log/nginx/access.log
```

**Enter** basın.

İsteklerin gelip gelmediğini göreceksiniz.

---

## ✅ ADIM 5: Nginx Error Loglarını Kontrol Edin

```bash
tail -20 /var/log/nginx/error.log
```

**Enter** basın.

Hata mesajlarını göreceksiniz.

---

## 🔧 ÇÖZÜM 1: Nginx Konfigürasyonunu Kontrol Edin

Nginx'in localhost:3000'e proxy yapıp yapmadığını kontrol edin:

```bash
cat /etc/nginx/sites-available/ekartvizit.co | grep proxy_pass
```

**Enter** basın.

✅ **Görmelisiniz:** `proxy_pass http://localhost:3000;`

---

## 🔧 ÇÖZÜM 2: Nginx'i Yeniden Yükleyin

Eğer localhost:3000 çalışıyorsa ama Nginx bağlanamıyorsa:

```bash
nginx -t
```

**Enter** basın.

```bash
systemctl reload nginx
```

**Enter** basın.

---

## 🔧 ÇÖZÜM 3: PM2'yi Yeniden Başlatın

Eğer localhost:3000 çalışmıyorsa:

```bash
pm2 restart ekartvizit
```

**Enter** basın.

```bash
sleep 5
curl http://localhost:3000
```

**Enter** basın.

---

## 📋 ÖZET: Test Adımları

1. `curl http://localhost:3000` (localhost test)
2. `curl -I http://localhost:3000` (HTTP headers test)
3. `curl http://localhost` (Nginx proxy test)
4. `tail -20 /var/log/nginx/error.log` (Nginx hataları)

**Her komuttan sonra Enter basın.**

---

## 🆘 CLOUDFLARE ERROR 521 ÇÖZÜMÜ

Eğer localhost:3000 çalışıyorsa ama site hala açılmıyorsa:

### Cloudflare Ayarları:

1. **Cloudflare Dashboard'a giriş yapın**
2. **DNS ayarlarına** gidin
3. **A Record'u kontrol edin:**
   - Name: `@` veya `ekartvizit.co`
   - Content: Sunucu IP adresi (`89.252.179.40`)
   - Proxy: **Proxied (yeşil bulut)** olmalı

4. **SSL/TLS ayarlarına** gidin:
   - Encryption mode: **Full** veya **Full (strict)**

5. **Ağ ayarlarına** gidin:
   - Port 80 açık olmalı
   - Port 443 açık olmalı

---

**Önce localhost:3000'i test edin ve sonucu paylaşın!**

---

**Son Güncelleme:** 2024
