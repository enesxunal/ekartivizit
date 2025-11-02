# 🔨 Build Adımı - Önemli!

`git pull` yaptınız ama **`npm run build` yapmadınız!** Bu yüzden eski build hala çalışıyor.

---

## ✅ ADIM ADIM ÇÖZÜM

### ADIM 1: Build Yapın (Çok Önemli!)

```bash
cd /var/www/ekartvizit
npm run build
```

**Enter** basın ve bitmesini bekleyin.

✅ **Build başarılı olmalı!**

---

### ADIM 2: PM2'yi Yeniden Başlatın

```bash
pm2 delete ekartvizit
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

**Status: `online` (yeşil) olmalı!**

---

### ADIM 3: Port Kontrolü

```bash
netstat -tlnp | grep 3000
```

**Görmeli:**
```
tcp6  0  0  :::3000  :::*  LISTEN  XXXX/next-server
```

**Eğer boşsa**, PM2 loglarını kontrol edin:

```bash
pm2 logs ekartvizit --lines 50
```

---

### ADIM 4: Nginx'i Yeniden Başlatın

```bash
systemctl restart nginx
```

**Enter** basın.

---

### ADIM 5: Site Test

Tarayıcıda `https://ekartvizit.co` adresine gidin.

✅ **Site açılmalı!**

---

## 🚀 HIZLI ÇÖZÜM (Tek Seferde)

```bash
cd /var/www/ekartvizit && npm run build && pm2 delete ekartvizit && pm2 start ecosystem.config.js && pm2 save && pm2 status && netstat -tlnp | grep 3000 && systemctl restart nginx
```

**Enter** basın ve bekleyin.

---

## 🔍 EĞER BUILD HATASI VARSA

### Hata 1: "Cannot find module '@tailwindcss/postcss'"

**Çözüm:**
```bash
npm install @tailwindcss/postcss --save-dev
npm install tailwindcss postcss --save-dev
npm run build
```

---

### Hata 2: "TypeScript errors"

**Çözüm:**
Build hatalarını kontrol edin ve hata mesajlarını paylaşın.

---

### Hata 3: "Port 3000 already in use"

**Çözüm:**
```bash
netstat -tlnp | grep 3000
kill -9 [PID]
pm2 start ecosystem.config.js
```

---

## 📋 TAM KONTROL LİSTESİ

✅ `git pull origin main`: Tamamlandı  
✅ `npm run build`: **YAPILMALI!**  
✅ PM2 status: `online`  
✅ Port 3000: `LISTEN`  
✅ Nginx: `active (running)`  
✅ Site açılıyor: `https://ekartvizit.co`

---

**Son Güncelleme:** 2024
