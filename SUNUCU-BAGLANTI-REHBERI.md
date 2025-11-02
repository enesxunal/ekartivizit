# 🖥️ Sunucuya Bağlanma ve Güncelleme Rehberi

Bu rehber, sunucuya nasıl bağlanacağınızı ve GitHub'dan dosyaları nasıl çekeceğinizi adım adım açıklar.

## 📋 İhtiyacınız Olan Bilgiler

Önce şu bilgilere ihtiyacınız var:
- **Sunucu IP Adresi** (örn: 185.123.45.67)
- **Kullanıcı Adı** (genellikle `root` veya başka bir kullanıcı)
- **Şifre** veya **SSH Anahtarı**

---

## 🌐 ADIM 1: Windows'ta Terminal Açma

### Seçenek 1: Windows Terminal (Windows 10/11)
1. **Windows tuşuna basın**
2. **"Terminal"** veya **"PowerShell"** yazın
3. **Terminal** uygulamasını açın

### Seçenek 2: PuTTY (Eski Windows)
1. [PuTTY'yi indirin](https://www.putty.org/)
2. PuTTY'yi açın

---

## 🔌 ADIM 2: Sunucuya Bağlanma

Windows Terminal veya PowerShell'de şu komutu yazın:

```bash
ssh root@SUNUCU_IP_ADRESI
```

**Örnek:**
```bash
ssh root@185.123.45.67
```

**Ne olacak?**
- İlk kez bağlanıyorsanız: "Are you sure you want to continue connecting?" diye soracak
- **"yes"** yazın ve **Enter** basın
- Sonra şifrenizi isteyecek
- Şifrenizi yazın ve **Enter** basın (yazarken görünmez, normal!)

✅ **Başarılı olursa:** Sunucuda bir komut satırı göreceksiniz (örnek: `root@sunucu:~#`)

---

## 📂 ADIM 3: Proje Klasörüne Gitme

Bağlandıktan sonra, şu komutu yazın:

```bash
cd /var/www/ekartvizit
```

**Enter** basın.

Bu komut sizi proje klasörüne götürür.

---

## 🔍 ADIM 4: Durumu Kontrol Etme

Şimdi durumu kontrol edelim. Şu komutu yazın:

```bash
pwd
```

**Enter** basın.

✅ `/var/www/ekartvizit` yazmalı. Eğer başka bir şey yazıyorsa, ADIM 3'ü tekrar deneyin.

---

## 📦 ADIM 5: Git Durumunu Kontrol Etme

Git'in kurulu olup olmadığını kontrol edelim:

```bash
git --version
```

**Enter** basın.

✅ Bir versiyon numarası görmelisiniz (örn: `git version 2.34.1`)

---

## 🔗 ADIM 6: GitHub Bağlantısını Kontrol Etme

Projenin GitHub'a bağlı olup olmadığını kontrol edelim:

```bash
git remote -v
```

**Enter** basın.

**İki durum olabilir:**

### ✅ DURUM A: Zaten Bağlı
Şöyle bir şey göreceksiniz:
```
origin  https://github.com/kullaniciadi/ekartvizit.git (fetch)
origin  https://github.com/kullaniciadi/ekartvizit.git (push)
```

Bu durumda **ADIM 8'e geçin**.

### ❌ DURUM B: Bağlı Değil
Hiçbir şey göstermiyorsa veya hata veriyorsa, **ADIM 7'ye geçin**.

---

## 🆕 ADIM 7: GitHub'dan Projeyi Klonlama (Sadece İlk Kurulum)

**Eğer proje daha önce klonlanmamışsa**, şu adımları izleyin:

### 7.1: Mevcut Dosyaları Kontrol
```bash
ls -la
```

**Enter** basın.

### 7.2: Klasör Boşsa - Klonla
Klasör boşsa veya sadece birkaç dosya varsa:

```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```

**Not:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın.

**Örnek:**
```bash
git clone https://github.com/enesekinci/ekartvizit.git .
```

**Enter** basın ve bekleyin. Dosyalar indirilecek.

---

## 🔄 ADIM 8: GitHub'dan Güncelleme Çekme

**Eğer proje zaten klonlanmışsa** (ADIM 6'da bağlantı gördüyseniz):

```bash
git pull origin main
```

**Enter** basın.

✅ **Başarılı olursa:** "Already up to date" veya "Updated X files" mesajı göreceksiniz.

---

## 🔨 ADIM 9: Yeni Paketleri Yükleme

GitHub'dan yeni dosyalar geldiyse, paketleri güncellemek gerekir:

```bash
npm install --production
```

**Enter** basın ve bekleyin. Bu biraz zaman alabilir (2-5 dakika).

---

## 🏗️ ADIM 10: Projeyi Build Etme

Şimdi projeyi production için hazırlayalım:

```bash
npm run build
```

**Enter** basın ve bekleyin. Bu da 2-5 dakika sürebilir.

✅ **Başarılı olursa:** Sonunda "Build successful" veya benzeri bir mesaj göreceksiniz.

---

## 🔄 ADIM 11: Uygulamayı Yeniden Başlatma

Build tamamlandıktan sonra, uygulamayı yeniden başlatmak gerekir:

```bash
pm2 restart ekartvizit
```

**Enter** basın.

✅ **Başarılı olursa:** "ekartvizit restarted" mesajı göreceksiniz.

---

## ✅ ADIM 12: Durum Kontrolü

Son olarak her şeyin çalıştığından emin olalım:

```bash
pm2 status
```

**Enter** basın.

✅ **Şunu görmelisiniz:**
- `ekartvizit` satırı
- Status: `online` (yeşil)
- Uptime: çalışma süresi

---

## 🚪 ADIM 13: Sunucudan Çıkış

İşiniz bittikten sonra sunucudan çıkmak için:

```bash
exit
```

**Enter** basın.

---

## 🎯 KISA YOL: Otomatik Güncelleme Script'i

Tüm bu adımları tek seferde yapmak için:

```bash
cd /var/www/ekartvizit
./deploy.sh
```

**Enter** basın.

Bu script tüm adımları otomatik yapar! (ADIM 8-11'i birleştirir)

---

## ❓ Sık Karşılaşılan Sorunlar

### 🔴 Sorun 1: "Permission denied"
**Çözüm:**
```bash
sudo git pull origin main
```

### 🔴 Sorun 2: "Not a git repository"
**Çözüm:** ADIM 7'yi yapın (klonlama)

### 🔴 Sorun 3: "pm2: command not found"
**Çözüm:**
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
```

### 🔴 Sorun 4: "npm: command not found"
**Çözüm:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
```

### 🔴 Sorun 5: "fatal: Authentication failed"
**Çözüm:** GitHub şifresi yerine Personal Access Token kullanmanız gerekebilir.

---

## 📝 Özet Komutlar (Sırayla)

Her güncelleme için şu komutları sırayla çalıştırın:

```bash
# 1. Sunucuya bağlan
ssh root@SUNUCU_IP

# 2. Proje klasörüne git
cd /var/www/ekartvizit

# 3. GitHub'dan çek
git pull origin main

# 4. Paketleri güncelle
npm install --production

# 5. Build et
npm run build

# 6. Yeniden başlat
pm2 restart ekartvizit

# 7. Durumu kontrol et
pm2 status

# 8. Çıkış
exit
```

---

## 💡 İpucu

Eğer tüm adımları tek seferde yapmak isterseniz:

```bash
cd /var/www/ekartvizit && git pull origin main && npm install --production && npm run build && pm2 restart ekartvizit && pm2 status
```

Bu tek satırlık komut tüm işlemi yapar!

---

**Son Güncelleme:** 2024
**Sürüm:** 1.0.0
