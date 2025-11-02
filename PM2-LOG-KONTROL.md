# 🔍 PM2 Log Kontrol - Çözüm

PM2 başladı ama hemen durdu. İşte çözüm:

---

## ✅ ADIM ADIM ÇÖZÜM

### ADIM 1: PM2 Loglarını Kontrol Edin

```bash
pm2 logs ekartvizit --lines 50
```

**Enter** basın ve hata mesajını görün.

**Ne arıyoruz?**
- `Error:` ile başlayan satırlar
- `Cannot find module`
- `Build failed`
- `ENOENT`

---

### ADIM 2: Build Kontrolü

```bash
cd /var/www/ekartvizit
npm run build
```

**Build başarılı olmalı!**

**Eğer build hatası varsa:**
- Hata mesajını kaydedin
- Eksik paketleri yükleyin: `npm install`

---

### ADIM 3: .next Klasörü Var mı?

```bash
ls -la .next
```

**Eğer `.next` klasörü yoksa:**

```bash
npm run build
```

---

### ADIM 4: Environment Variables Kontrolü

```bash
cat .env
```

**`.env` dosyası olmalı ve içinde değişkenler olmalı!**

---

### ADIM 5: Node.js Versiyonu

```bash
node --version
```

**18.x veya üzeri olmalı!**

---

### ADIM 6: PM2'yi Tekrar Başlatın

```bash
pm2 delete ekartvizit
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

**Status: `online` (yeşil) olmalı!**

---

### ADIM 7: Logları Tekrar Kontrol Edin

```bash
pm2 logs ekartvizit --lines 20
```

**Hata var mı?** Hata mesajını kaydedin.

---

### ADIM 8: Port Kontrolü

```bash
netstat -tlnp | grep 3000
```

**Görmeli:**
```
tcp6  0  0  :::3000  :::*  LISTEN  XXXX/next-server
```

---

### ADIM 9: Nginx'i Yeniden Başlatın

```bash
systemctl restart nginx
```

---

### ADIM 10: Site Test

Tarayıcıda `https://ekartvizit.co` adresine gidin.

✅ **Site açılmalı!**

---

## 🚀 HIZLI ÇÖZÜM (Tek Seferde)

```bash
cd /var/www/ekartvizit && npm run build && pm2 delete ekartvizit && pm2 start ecosystem.config.js && pm2 save && pm2 status && netstat -tlnp | grep 3000
```

**Enter** basın ve bekleyin.

---

## 🔍 YAYGIN HATALAR VE ÇÖZÜMLERİ

### Hata 1: "Cannot find module '@tailwindcss/postcss'"

**Çözüm:**
```bash
npm install @tailwindcss/postcss --save-dev
npm install tailwindcss postcss --save-dev
npm run build
```

---

### Hata 2: "Build failed"

**Çözüm:**
```bash
rm -rf .next
npm install
npm run build
```

---

### Hata 3: "ENOENT: no such file or directory"

**Çözüm:**
```bash
cd /var/www/ekartvizit
ls -la
```

**Proje dosyaları tam mı?** Eksikse:
```bash
git pull origin main
npm install
npm run build
```

---

### Hata 4: "Port 3000 already in use"

**Çözüm:**
```bash
netstat -tlnp | grep 3000
kill -9 [PID]
pm2 start ecosystem.config.js
```

---

## 📋 TAM KONTROL LİSTESİ

✅ PM2 logs: Hata yok  
✅ Build: Başarılı  
✅ .next klasörü: Var  
✅ .env dosyası: Var ve dolu  
✅ Node.js: 18.x+  
✅ PM2 status: `online`  
✅ Port 3000: `LISTEN`  
✅ Nginx: `active (running)`  
✅ Site açılıyor: `https://ekartvizit.co`

---

**Son Güncelleme:** 2024

