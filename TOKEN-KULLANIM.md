# 🔐 GitHub Token Kullanımı

Token'ınız hazır. İşte sunucuda nasıl kullanacağınız:

---

## ✅ ADIM 1: Sunucuda Klonlama

Sunucu terminal'inde şu komutu yazın:

```bash
git clone https://YOUR_TOKEN_HERE@github.com/enesxunal/ekartvizit.git .
```

**Enter** basın.

✅ **Başarılı olursa:** Dosyalar indirilecek (2-5 dakika).

---

## 🔒 GÜVENLİK UYARISI

**ÖNEMLİ:**
- ❌ Token'ı kimseyle paylaşmayın
- ❌ Token'ı GitHub'a commit etmeyin
- ❌ Token'ı kod içine yazmayın
- ✅ Sadece sunucuda kullanın
- ✅ Token'ı güvende tutun

Eğer token başka birine geçerse, GitHub'dan hemen iptal edin:
- GitHub → Settings → Developer settings → Personal access tokens
- Token'ı bulun ve "Revoke" (İptal) tıklayın

---

## 📋 SONRAKI ADIMLAR

Klonlama başarılı olduktan sonra:

### 1. Environment variables ayarlayın
```bash
nano .env
```

### 2. Paketleri yükleyin
```bash
npm install --production
```

### 3. Build yapın
```bash
npm run build
```

### 4. PM2 ile başlatın
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 5. Durumu kontrol edin
```bash
pm2 status
```

---

**Son Güncelleme:** 2024
