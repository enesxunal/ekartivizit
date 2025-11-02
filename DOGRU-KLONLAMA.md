# ✅ Doğru Repository Adı Bulundu

Repository adı: **`ekartivizit`** (i harfi var!)

İşte doğru klonlama komutu:

---

## ✅ ADIM 1: Sunucuda Doğru Adla Klonlayın

Sunucu terminal'inde şu komutu yazın:

```bash
git clone https://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@github.com/enesxunal/ekartivizit.git .
```

**Enter** basın.

✅ **Başarılı olursa:** Dosyalar indirilecek (2-5 dakika).

**Not:** Repository adı `ekartvizit` değil, `ekartivizit` (i harfi var!)

---

## 📋 SONRAKI ADIMLAR

Klonlama başarılı olduktan sonra:

### 1. Dosyaları kontrol edin
```bash
ls -la
```

### 2. Environment variables ayarlayın
```bash
nano .env
```

Şunları yazın:
```env
NEXT_PUBLIC_SITE_URL=https://ekartvizit.co
NODE_ENV=production
TOSLA_API_USER=apiUser3016658
TOSLA_API_PASS=YN8L293GPY
TOSLA_CLIENT_ID=1000002147
TOSLA_BASE_URL=https://api.tosla.com
```

### 3. Paketleri yükleyin
```bash
npm install --production
```

### 4. Build yapın
```bash
npm run build
```

### 5. PM2 ile başlatın
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 6. Durumu kontrol edin
```bash
pm2 status
```

---

## 🔒 GÜVENLİK UYARISI

**ÖNEMLİ:**
- ❌ Token'ı kimseyle paylaşmayın
- ❌ Token'ı GitHub'a commit etmeyin
- ✅ Sadece sunucuda kullanın

---

**Son Güncelleme:** 2024
