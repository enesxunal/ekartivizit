# ✅ Paketler Yüklendi - Build Yapın

Paketler başarıyla yüklendi! Şimdi build yapın:

---

## ✅ ADIM 1: Build Yapın

```bash
npm run build
```

**Enter** basın ve bekleyin (5-10 dakika).

✅ **Başarılı olursa:** "Build successful" veya benzeri mesaj göreceksiniz.

❌ **Hata alırsanız:** Hata mesajını paylaşın, çözüm bulalım.

---

## ✅ ADIM 2: PM2 ile Başlatın

Build başarılı olduktan sonra:

```bash
pm2 start ecosystem.config.js
```

**Enter** basın.

✅ **Başarılı:** "ekartvizit started" mesajı göreceksiniz.

---

## ✅ ADIM 3: PM2'yi Kaydedin

```bash
pm2 save
```

**Enter** basın.

✅ **Başarılı:** PM2 kaydedilecek.

---

## ✅ ADIM 4: Durumu Kontrol Edin

```bash
pm2 status
```

**Enter** basın.

✅ **Görmelisiniz:**
- `ekartvizit` satırı
- Status: `online` (yeşil)
- Uptime: çalışma süresi

---

## 📋 ÖZET: Kalan Adımlar

1. `npm run build` (build yapın - 5-10 dakika)
2. `pm2 start ecosystem.config.js` (PM2 ile başlatın)
3. `pm2 save` (PM2'yi kaydedin)
4. `pm2 status` (durumu kontrol edin)

**Her komuttan sonra Enter basın ve bitmesini bekleyin!**

---

## 🆘 SORUN GİDERME

### Build hata veriyorsa:

1. **Hata mesajını paylaşın** - Çözüm bulalım
2. **node_modules'i temizleyip yeniden yükleyin:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### PM2 başlamıyorsa:

1. **Logları kontrol edin:**
   ```bash
   pm2 logs ekartvizit
   ```
2. **Ecosystem config'i kontrol edin:**
   ```bash
   cat ecosystem.config.js
   ```

---

**Son Güncelleme:** 2024
