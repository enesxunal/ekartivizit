# ✅ Sunucuya Bağlandınız - Şimdi Ne Yapmalı?

Sunucuya bağlandınız! İşte yapmanız gerekenler adım adım:

---

## 📂 ADIM 1: Proje Klasörüne Gidin

Terminal'de şu komutu yazın:

```bash
cd /var/www/ekartvizit
```

**Enter** basın.

✅ **Başarılı olursa:** `root@server:/var/www/ekartvizit#` gibi bir komut satırı göreceksiniz.

---

## 🔍 ADIM 2: Durumu Kontrol Edin

Nerede olduğunuzu kontrol edin:

```bash
pwd
```

**Enter** basın.

✅ `/var/www/ekartvizit` yazmalı.

---

## 📁 ADIM 3: Klasörde Ne Var Kontrol Edin

```bash
ls -la
```

**Enter** basın.

### İki durum olabilir:

**✅ DURUM A:** Klasör dolu (dosyalar var)
- `.git`, `package.json`, `src` gibi dosyalar görüyorsanız
- Bu durumda **ADIM 5'e geçin**

**❌ DURUM B:** Klasör boş veya yok
- Hiçbir şey yoksa veya klasör yoksa
- Bu durumda **ADIM 4'e geçin**

---

## 🆕 ADIM 4: Projeyi GitHub'dan Klonlayın (İlk Kurulum)

Eğer klasör boşsa veya proje klonlanmamışsa:

```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```

**ÖNEMLİ:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın!

**Örnek:**
```bash
git clone https://github.com/enesekinci/ekartvizit.git .
```

**Enter** basın ve bekleyin. Dosyalar indirilecek (2-5 dakika).

---

## 🔗 ADIM 5: GitHub Bağlantısını Kontrol Edin

Eğer klasörde dosyalar varsa:

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

Bu durumda **ADIM 7'ye geçin**.

**❌ DURUM B:** Bağlantı yok
Hiçbir şey göstermiyorsa, **ADIM 6'ya geçin**.

---

## 🔗 ADIM 6: GitHub Bağlantısını Ekle

Eğer `git remote -v` hiçbir şey göstermiyorsa:

```bash
git remote add origin https://github.com/KULLANICI_ADI/ekartvizit.git
```

**ÖNEMLİ:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın!

**Enter** basın.

---

## ✅ ADIM 7: GitHub'dan Güncelleme Çekin

**Eğer proje zaten klonlanmışsa ve bağlantı varsa:**

```bash
git pull origin main
```

**Enter** basın.

✅ **Başarılı:** "Already up to date" veya "Updated X files" mesajı göreceksiniz.

---

## 📦 ADIM 8: Paketleri Güncelleyin

```bash
npm install --production
```

**Enter** basın ve bekleyin (2-5 dakika).

---

## 🏗️ ADIM 9: Projeyi Build Edin

```bash
npm run build
```

**Enter** basın ve bekleyin (2-5 dakika).

✅ **Başarılı:** "Build successful" mesajı göreceksiniz.

**Not:** Build sırasında bazı uyarılar görebilirsiniz, bu normaldir.

---

## 🔄 ADIM 10: Uygulamayı Yeniden Başlatın

```bash
pm2 restart ekartvizit
```

**Enter** basın.

✅ **Başarılı:** "ekartvizit restarted" mesajı göreceksiniz.

**Not:** Eğer PM2 çalışmıyorsa veya uygulama yoksa:

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## ✅ ADIM 11: Durumu Kontrol Edin

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

Tüm güncelleme işlemlerini tek seferde yapmak için:

```bash
cd /var/www/ekartvizit && git pull origin main && npm install --production && npm run build && pm2 restart ekartvizit && pm2 status
```

**Enter** basın ve bekleyin. Tüm işlemler otomatik olacak!

---

## 📋 ÖZET: Her Güncelleme İçin

Her seferinde şu komutları sırayla çalıştırın:

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

### Sorun 1: "cd: /var/www/ekartvizit: No such file or directory"
**Çözüm:** Klasörü oluşturun:
```bash
mkdir -p /var/www/ekartvizit
cd /var/www/ekartvizit
```

### Sorun 2: "fatal: not a git repository"
**Çözüm:** Projeyi klonlayın (ADIM 4)

### Sorun 3: "npm: command not found"
**Çözüm:** Node.js kurun:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
```

### Sorun 4: "pm2: command not found"
**Çözüm:** PM2 kurun:
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
```

---

**Son Güncelleme:** 2024
