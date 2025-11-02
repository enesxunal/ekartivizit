# ✅ Klonlama Başarılı - Kurulumu Tamamlayın

Dosyalar başarıyla indirildi! Şimdi kurulumu tamamlayalım:

---

## ✅ ADIM 1: Environment Variables Ayarlayın

```bash
nano .env
```

**Enter** basın.

**Dosya açılacak.** Şunları yazın:

```env
NEXT_PUBLIC_SITE_URL=https://ekartvizit.co
NODE_ENV=production
TOSLA_API_USER=apiUser3016658
TOSLA_API_PASS=YN8L293GPY
TOSLA_CLIENT_ID=1000002147
TOSLA_BASE_URL=https://api.tosla.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=905xxxxxxxxx
```

**Dosyadan çıkmak için:**
- **Ctrl + X** basın
- **Y** basın (kaydetmek için)
- **Enter** basın (dosya adını onaylamak için)

---

## ✅ ADIM 2: Paketleri Yükleyin

```bash
npm install --production
```

**Enter** basın ve bekleyin (5-10 dakika).

---

## ✅ ADIM 3: Projeyi Build Edin

```bash
npm run build
```

**Enter** basın ve bekleyin (5-10 dakika).

✅ **Başarılı:** "Build successful" mesajı göreceksiniz.

---

## ✅ ADIM 4: PM2 ile Başlatın

```bash
pm2 start ecosystem.config.js
```

**Enter** basın.

```bash
pm2 save
```

**Enter** basın.

---

## ✅ ADIM 5: Durumu Kontrol Edin

```bash
pm2 status
```

**Enter** basın.

✅ **Görmelisiniz:**
- `ekartvizit` satırı
- Status: `online` (yeşil)
- Uptime: çalışma süresi

---

## 📋 ÖZET: Sırayla Komutlar

1. `nano .env` (environment variables ayarlayın)
2. `npm install --production` (paketleri yükleyin)
3. `npm run build` (build yapın)
4. `pm2 start ecosystem.config.js` (PM2 ile başlatın)
5. `pm2 save` (PM2'yi kaydedin)
6. `pm2 status` (durumu kontrol edin)

**Her komuttan sonra Enter basın ve bitmesini bekleyin!**

---

## 🆘 SORUN GİDERME

### Sorun 1: "npm: command not found"
**Çözüm:** Node.js kurun:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
```

### Sorun 2: "pm2: command not found"
**Çözüm:** PM2 kurun:
```bash
npm install -g pm2
pm2 startup
```

### Sorun 3: Build hata veriyor
**Çözüm:** `.env` dosyasını kontrol edin ve tekrar deneyin:
```bash
nano .env
npm run build
```

---

**Son Güncelleme:** 2024
