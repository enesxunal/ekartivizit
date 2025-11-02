# 🔄 Sunucu Güncelleme - TypeScript Hataları Düzeltildi

Sunucuda eski kod var. Yeni değişiklikler GitHub'a push edildi. Şimdi sunucuda güncelleme yapın:

---

## ✅ ADIM ADIM GÜNCELLEME

### ADIM 1: Sunucuya Bağlanın

```bash
ssh root@89.252.179.40
```

**Şifre:** `5l1B1nJ0auxY2WEuM3`

---

### ADIM 2: Proje Dizinine Gidin

```bash
cd /var/www/ekartvizit
```

---

### ADIM 3: GitHub'dan Güncellemeleri Çekin

```bash
git pull origin main
```

**Enter** basın ve bekleyin.

---

### ADIM 4: Paketleri Güncelleyin

```bash
npm install
```

**Enter** basın ve bekleyin.

---

### ADIM 5: Build Yapın

```bash
npm run build
```

**Enter** basın ve bitmesini bekleyin.

✅ **Build başarılı olmalı!**

---

### ADIM 6: PM2'yi Yeniden Başlatın

```bash
pm2 delete ekartvizit
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

**Status: `online` (yeşil) olmalı!**

---

### ADIM 7: Port Kontrolü

```bash
netstat -tlnp | grep 3000
```

**Port 3000'de dinleme olmalı!**

---

### ADIM 8: Nginx'i Yeniden Başlatın

```bash
systemctl restart nginx
```

---

## 🚀 HIZLI ÇÖZÜM (Tek Seferde)

```bash
cd /var/www/ekartvizit && git pull origin main && npm install && npm run build && pm2 delete ekartvizit && pm2 start ecosystem.config.js && pm2 save && pm2 status && systemctl restart nginx
```

**Enter** basın ve bekleyin.

---

## 📋 BAŞARILI OLDUĞUNDA

✅ PM2 status: `online`  
✅ Port 3000: `LISTEN`  
✅ Nginx: `active (running)`  
✅ Build: Başarılı  
✅ Site açılıyor: `https://ekartvizit.co`

---

**Son Güncelleme:** 2024

