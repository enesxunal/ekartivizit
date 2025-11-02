# 🔴 Error 521 Çözümü - Detaylı Kontrol

Nginx çalışıyor ama site hala açılmıyor. Kontrol edelim:

---

## 🔍 ADIM 1: PM2 Durumunu Kontrol Edin

```bash
pm2 status
```

**Enter** basın.

✅ **Görmelisiniz:** `ekartvizit` online olmalı.

---

## 🔍 ADIM 2: Port 3000'i Kontrol Edin

PM2'nin port 3000'de çalışıp çalışmadığını kontrol edin:

```bash
netstat -tlnp | grep 3000
```

**Enter** basın.

veya

```bash
ss -tlnp | grep 3000
```

**Enter** basın.

✅ **Görmelisiniz:** Port 3000'de bir servis çalışıyor olmalı.

---

## 🔍 ADIM 3: PM2 Loglarını Kontrol Edin

Hataları görmek için:

```bash
pm2 logs ekartvizit --lines 50
```

**Enter** basın.

❌ **Hata varsa:** Hata mesajını paylaşın.

---

## 🔍 ADIM 4: Localhost:3000'i Test Edin

Sunucuda curl ile test edin:

```bash
curl http://localhost:3000
```

**Enter** basın.

✅ **Başarılı:** HTML içeriği göreceksiniz.
❌ **Hata:** Bağlantı hatası göreceksiniz.

---

## ✅ ÇÖZÜM 1: PM2'yi Yeniden Başlatın

Eğer port 3000 çalışmıyorsa:

```bash
pm2 restart ekartvizit
```

**Enter** basın.

```bash
pm2 logs ekartvizit --lines 20
```

**Enter** basın.

---

## ✅ ÇÖZÜM 2: Port 3000'i Manuel Test Edin

Sunucuda port 3000'i test edin:

```bash
curl -I http://localhost:3000
```

**Enter** basın.

✅ **Başarılı:** HTTP 200 veya benzeri yanıt göreceksiniz.

---

## ✅ ÇÖZÜM 3: Nginx Loglarını Kontrol Edin

Nginx hata loglarını kontrol edin:

```bash
tail -f /var/log/nginx/error.log
```

**Enter** basın.

Hata mesajlarını göreceksiniz. **Ctrl+C** ile çıkın.

---

## ✅ ÇÖZÜM 4: Nginx Access Loglarını Kontrol Edin

```bash
tail -f /var/log/nginx/access.log
```

**Enter** basın.

İsteklerin gelip gelmediğini göreceksiniz. **Ctrl+C** ile çıkın.

---

## ✅ ÇÖZÜM 5: PM2'nin Port 3000'de Dinlediğini Kontrol Edin

```bash
pm2 logs ekartvizit | grep -i "listening\|port\|3000"
```

**Enter** basın.

---

## 📋 ÖZET: Kontrol Adımları

1. `pm2 status` (PM2 durumunu kontrol)
2. `netstat -tlnp | grep 3000` (port 3000'i kontrol)
3. `curl http://localhost:3000` (localhost test)
4. `pm2 logs ekartvizit --lines 50` (logları kontrol)

**Her komuttan sonra Enter basın.**

---

## 🆘 HALA ÇALIŞMIYORSA

### PM2'yi Sıfırdan Başlatın:

```bash
pm2 delete ekartvizit
cd /var/www/ekartvizit
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

**Her komuttan sonra Enter basın.**

---

**Önce PM2 ve port 3000'i kontrol edin, sonuçları paylaşın!**

---

**Son Güncelleme:** 2024
