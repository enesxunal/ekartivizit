# ✅ Sunucuya Bağlandınız - Şimdi Ne Yapmalı?

Web Console'a bağlandınız ve `root@server:/#` görüyorsunuz. İşte yapmanız gerekenler:

---

## 📂 ADIM 1: Proje Klasörüne Gidin

Terminal'de şu komutu yazın:

```bash
cd /var/www/ekartvizit
```

**Enter** basın.

✅ **Başarılı olursa:** `root@server:/var/www/ekartvizit#` göreceksiniz.

---

## 🔍 ADIM 2: Durumu Kontrol Edin

Nerede olduğunuzu kontrol edin:

```bash
pwd
```

**Enter** basın.

✅ `/var/www/ekartvizit` yazmalı.

**Eğer klasör yoksa:**
```bash
mkdir -p /var/www/ekartvizit
cd /var/www/ekartvizit
```

---

## 🔗 ADIM 3: GitHub Bağlantısını Kontrol Edin

```bash
git remote -v
```

**Enter** basın.

### İki durum olabilir:

**✅ DURUM A:** Bağlantı var
```
origin  https://github.com/kullaniciadi/ekartvizit.git (fetch)
origin  https://github.com/kullaniciadi/ekartvizit.git (push)
```

Bu durumda **ADIM 5'e geçin**.

**❌ DURUM B:** Bağlantı yok veya klasör boş
Hiçbir şey göstermiyorsa, **ADIM 4'e geçin**.

---

## 🆕 ADIM 4: Projeyi GitHub'dan Klonlayın (İlk Kurulum)

Eğer proje daha önce klonlanmamışsa:

### 4.1: Klasörü kontrol edin
```bash
ls -la
```

### 4.2: GitHub'dan klonlayın

```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```

**ÖNEMLİ:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın!

**Örnek:**
```bash
git clone https://github.com/enesekinci/ekartvizit.git .
```

**Enter** basın ve bekleyin. Dosyalar indirilecek.

---

## ✅ ADIM 5: GitHub'dan Güncelleme Çekin

**Eğer proje zaten klonlanmışsa:**

```bash
git pull origin main
```

**Enter** basın.

✅ **Başarılı:** "Already up to date" veya "Updated X files" mesajı göreceksiniz.

---

## 📦 ADIM 6: Paketleri Güncelleyin

```bash
npm install --production
```

**Enter** basın ve bekleyin (2-5 dakika).

**Not:** Root kullanıcısı ile çalışıyorsunuz, `sudo` gerekmez.

---

## 🏗️ ADIM 7: Projeyi Build Edin

```bash
npm run build
```

**Enter** basın ve bekleyin (2-5 dakika).

✅ **Başarılı:** "Build successful" mesajı göreceksiniz.

**Not:** Build sırasında bazı uyarılar görebilirsiniz, bu normaldir. En önemlisi sonunda "Build successful" yazması.

---

## 🔄 ADIM 8: Uygulamayı Yeniden Başlatın

```bash
pm2 restart ekartvizit
```

**Enter** basın.

✅ **Başarılı:** "ekartvizit restarted" mesajı göreceksiniz.

**Eğer PM2 çalışmıyorsa veya uygulama yoksa:**

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## ✅ ADIM 9: Durumu Kontrol Edin

```bash
pm2 status
```

**Enter** basın.

✅ **Görmelisiniz:**
- `ekartvizit` satırı
- Status: `online` (yeşil)
- Uptime: çalışma süresi

---

## 🎯 TEK KOMUTLA HEPİNİ YAPMAK

Tüm işlemleri tek seferde yapmak için:

```bash
cd /var/www/ekartvizit && git pull origin main && npm install --production && npm run build && pm2 restart ekartvizit && pm2 status
```

**Enter** basın ve bekleyin. Tüm işlemler otomatik olacak!

---

## 📋 KOMUTLARI SIRAYLA ÇALIŞTIRMAK

Eğer tek tek yapmak isterseniz, sırayla şunları yazın:

```bash
# 1. Proje klasörüne git
cd /var/www/ekartvizit

# 2. GitHub'dan güncellemeleri çek
git pull origin main

# 3. Paketleri güncelle
npm install --production

# 4. Build et
npm run build

# 5. Yeniden başlat
pm2 restart ekartvizit

# 6. Durumu kontrol et
pm2 status
```

**Her komuttan sonra Enter basın ve bitmesini bekleyin.**

---

## 🆘 SORUN GİDERME

### Sorun 1: "npm: command not found"
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
```

### Sorun 2: "git: command not found"
```bash
apt-get update
apt-get install -y git
```

### Sorun 3: "pm2: command not found"
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
```

### Sorun 4: Klasör yok
```bash
mkdir -p /var/www/ekartvizit
cd /var/www/ekartvizit
```

---

## ✅ BAŞARILI!

Şu an sunucuda `root@server:/#` görüyorsunuz. Yukarıdaki adımları sırayla yapın!

**İpucu:** Komutları kopyalayıp terminal'e yapıştırabilirsiniz (Ctrl+Shift+V veya sağ tık → Paste).

---

**Son Güncelleme:** 2024
