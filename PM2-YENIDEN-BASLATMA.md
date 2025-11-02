# 🔄 PM2 Yeniden Başlatma - Çözüm

PM2'de uygulama durmuş. İşte çözüm:

---

## ✅ ADIM ADIM ÇÖZÜM

### ADIM 1: PM2'deki Uygulamayı Silin

```bash
pm2 delete ekartvizit
```

**Enter** basın.

---

### ADIM 2: PM2'yi Temizleyin

```bash
pm2 kill
```

**Enter** basın.

---

### ADIM 3: PM2'yi Yeniden Başlatın

```bash
pm2 resurrect
```

**Enter** basın.

**Eğer `pm2 resurrect` çalışmazsa:**

```bash
pm2 start ecosystem.config.js
```

**Enter** basın.

---

### ADIM 4: PM2'yi Kaydedin

```bash
pm2 save
```

**Enter** basın.

---

### ADIM 5: Durumu Kontrol Edin

```bash
pm2 status
```

**Görmeli:**
```
│ 0  │ ekartvizit  │ online   │ 0%  │ 58.0mb │
```

**Status: `online` (yeşil) olmalı!**

---

### ADIM 6: Port Kontrolü

```bash
netstat -tlnp | grep 3000
```

**Görmeli:**
```
tcp6  0  0  :::3000  :::*  LISTEN  4172/next-server
```

---

### ADIM 7: Localhost Test

```bash
curl http://localhost:3000
```

**Görmeli:** HTML içeriği (sayfa kaynağı)

---

### ADIM 8: Nginx'i Yeniden Başlatın

```bash
systemctl restart nginx
```

**Enter** basın.

---

### ADIM 9: Site Test

Tarayıcıda `https://ekartvizit.co` adresine gidin.

✅ **Site açılmalı!**

---

## 🚀 HIZLI ÇÖZÜM (Tek Seferde)

```bash
cd /var/www/ekartvizit && pm2 delete ekartvizit && pm2 start ecosystem.config.js && pm2 save && pm2 status && netstat -tlnp | grep 3000 && systemctl restart nginx
```

**Enter** basın ve bekleyin.

---

## 🔍 EĞER HALA ÇALIŞMIYORSA

### Seçenek 1: PM2 Loglarını Kontrol Edin

```bash
pm2 logs ekartvizit --lines 50
```

**Hata var mı?** Hata mesajını paylaşın.

---

### Seçenek 2: Build Hataları Var mı?

```bash
cd /var/www/ekartvizit
npm run build
```

**Build başarılı olmalı!**

---

### Seçenek 3: Dosya İzinleri Sorunu mu?

```bash
cd /var/www/ekartvizit
ls -la .next
```

**Eğer `.next` klasörü yoksa:**

```bash
npm run build
```

---

### Seçenek 4: Environment Variables Doğru mu?

```bash
cd /var/www/ekartvizit
cat .env
```

**`.env` dosyası olmalı ve içinde değişkenler olmalı!**

---

## 📋 TAM KONTROL LİSTESİ

✅ PM2 status: `online`  
✅ Port 3000: `LISTEN`  
✅ Nginx: `active (running)`  
✅ Localhost test: HTML döndü  
✅ Site açılıyor: `https://ekartvizit.co`

---

**Son Güncelleme:** 2024

