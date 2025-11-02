# 🖥️ Ubuntu Kullanıcısı ile Sunucu Bağlantısı

Bağlantı için doğru kullanıcı adı: **`ubuntu`**

---

## 🔌 ADIM 1: Sunucuya Bağlanma

PowerShell'de şu komutu yazın:

```bash
ssh ubuntu@89.252.179.40
```

**Enter** basın.

Şifre istediğinde:
```
ubuntu@89.252.179.40's password:
```

Şifreyi yazın: **`5l1B1nJ0auxY2WEuM3`**

(Not: Şifre yazarken görünmez, bu normal!)

**Enter** basın.

✅ **Başarılı olursa:** `ubuntu@sunucu:~$` gibi bir komut satırı göreceksiniz.

---

## 📂 ADIM 2: Proje Klasörüne Gitme

Bağlandıktan sonra:

```bash
cd /var/www/ekartvizit
```

**Enter** basın.

**Not:** Eğer klasör yoksa, önce oluşturmanız gerekebilir:

```bash
sudo mkdir -p /var/www/ekartvizit
sudo chown ubuntu:ubuntu /var/www/ekartvizit
cd /var/www/ekartvizit
```

---

## 🔍 ADIM 3: Durumu Kontrol Etme

```bash
pwd
```

✅ `/var/www/ekartvizit` yazmalı.

---

## 🔗 ADIM 4: GitHub Bağlantısını Kontrol Etme

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

Bu durumda **ADIM 6'ya geçin**.

**❌ DURUM B:** Bağlantı yok veya klasör boş
Hiçbir şey göstermiyorsa, **ADIM 5'e geçin**.

---

## 🆕 ADIM 5: Projeyi GitHub'dan Klonlama (İlk Kurulum)

Eğer klasör boşsa veya proje klonlanmamışsa:

### 5.1: Klasörü kontrol edin
```bash
ls -la
```

### 5.2: GitHub'dan klonlayın

```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```

**Not:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın!

**Örnek:**
```bash
git clone https://github.com/enesekinci/ekartvizit.git .
```

**Enter** basın ve bekleyin.

---

## 🔄 ADIM 6: GitHub'dan Güncelleme Çekme

**Eğer proje zaten klonlanmışsa:**

```bash
git pull origin main
```

**Enter** basın.

✅ **Başarılı:** "Already up to date" veya "Updated X files" mesajı göreceksiniz.

---

## 📦 ADIM 7: Paketleri Güncelleme

```bash
npm install --production
```

**Enter** basın ve bekleyin (2-5 dakika).

---

## 🏗️ ADIM 8: Projeyi Build Etme

```bash
npm run build
```

**Enter** basın ve bekleyin (2-5 dakika).

✅ **Başarılı:** "Build successful" mesajı göreceksiniz.

---

## 🔄 ADIM 9: Uygulamayı Yeniden Başlatma

Ubuntu kullanıcısı ile PM2'yi çalıştırmak için:

```bash
sudo pm2 restart ekartvizit
```

veya

```bash
pm2 restart ekartvizit
```

**Enter** basın.

✅ **Başarılı:** "ekartvizit restarted" mesajı göreceksiniz.

---

## ✅ ADIM 10: Durum Kontrolü

```bash
pm2 status
```

**Enter** basın.

✅ **Görmelisiniz:**
- `ekartvizit` satırı
- Status: `online` (yeşil)

---

## 🚪 ADIM 11: Sunucudan Çıkış

```bash
exit
```

**Enter** basın.

---

## 🎯 TEK KOMUTLA HEPİNİ YAPMAK

Tüm güncelleme işlemlerini tek seferde yapmak için:

```bash
cd /var/www/ekartvizit && git pull origin main && npm install --production && npm run build && sudo pm2 restart ekartvizit && pm2 status
```

**Enter** basın ve bekleyin.

---

## 🔐 SUDO Yetkisi Hakkında

Ubuntu kullanıcısı ile bazı komutlar için `sudo` gerekebilir:

- PM2 restart için: `sudo pm2 restart ekartvizit`
- Sistem ayarları için: `sudo` kullanın

Eğer `sudo` şifre isterse, aynı şifreyi girin: `5l1B1nJ0auxY2WEuM3`

---

## 📝 ÖZET: Her Güncelleme İçin

```bash
# 1. Sunucuya bağlan
ssh ubuntu@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3

# 2. Proje klasörüne git
cd /var/www/ekartvizit

# 3. GitHub'dan çek
git pull origin main

# 4. Paketleri güncelle
npm install --production

# 5. Build et
npm run build

# 6. Yeniden başlat
sudo pm2 restart ekartvizit

# 7. Durumu kontrol et
pm2 status

# 8. Çıkış
exit
```

---

## 💡 HIZLI BAĞLANTI KOMUTU

```bash
ssh ubuntu@89.252.179.40
```

**Şifre:** `5l1B1nJ0auxY2WEuM3`

---

**Önemli:** 
- Kullanıcı adı: `ubuntu` (root değil!)
- Şifre: `5l1B1nJ0auxY2WEuM3`

**Son Güncelleme:** 2024
