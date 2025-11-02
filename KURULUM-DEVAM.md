# ✅ .env Dosyası Oluşturuldu - Kuruluma Devam

`.env` dosyası başarıyla oluşturuldu! Şimdi kurulumu tamamlayalım:

---

## ✅ ADIM 1: Paketleri Yükleyin

```bash
npm install --production
```

**Enter** basın ve bekleyin (5-10 dakika).

✅ **Başarılı:** Paketler yüklenecek.

---

## ✅ ADIM 2: Projeyi Build Edin

```bash
npm run build
```

**Enter** basın ve bekleyin (5-10 dakika).

✅ **Başarılı:** "Build successful" mesajı göreceksiniz.

**Not:** Build sırasında bazı uyarılar görebilirsiniz, bu normaldir.

---

## ✅ ADIM 3: PM2 ile Başlatın

```bash
pm2 start ecosystem.config.js
```

**Enter** basın.

✅ **Başarılı:** "ekartvizit started" mesajı göreceksiniz.

---

## ✅ ADIM 4: PM2'yi Kaydedin

```bash
pm2 save
```

**Enter** basın.

✅ **Başarılı:** PM2 kaydedilecek.

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

1. `npm install --production` (paketleri yükleyin - 5-10 dakika)
2. `npm run build` (build yapın - 5-10 dakika)
3. `pm2 start ecosystem.config.js` (PM2 ile başlatın)
4. `pm2 save` (PM2'yi kaydedin)
5. `pm2 status` (durumu kontrol edin)

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
**Çözüm:** `.env` dosyasını kontrol edin:
```bash
cat .env
```

Sonra tekrar deneyin:
```bash
npm run build
```

### Sorun 4: PM2 başlamıyor
**Çözüm:** Logları kontrol edin:
```bash
pm2 logs ekartvizit
```

---

## ✅ BAŞARILI KURULUM

Tüm adımlar tamamlandıktan sonra:

- ✅ Proje çalışıyor
- ✅ PM2 ile yönetiliyor
- ✅ Otomatik yeniden başlatma aktif
- ✅ Site yayında olmalı: https://ekartvizit.co

---

**Her komuttan sonra Enter basın ve bitmesini bekleyin!**

---

**Son Güncelleme:** 2024
