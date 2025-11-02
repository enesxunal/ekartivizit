# 🖥️ Sizin Sunucunuza Bağlanma Rehberi

Bu rehber, **sizin sunucunuza** (89.252.179.40) nasıl bağlanacağınızı adım adım açıklar.

---

## 🔌 ADIM 1: Sunucuya Bağlanma

### Windows Terminal veya PowerShell'i açın

1. **Windows tuşuna basın**
2. **"Terminal"** veya **"PowerShell"** yazın
3. **Terminal** uygulamasını açın

### Bağlantı komutunu çalıştırın

Terminal'de şu komutu yazın:

```bash
ssh root@89.252.179.40
```

**Enter** basın.

### İlk bağlantıda
İlk kez bağlanıyorsanız şu mesajı göreceksiniz:
```
The authenticity of host '89.252.179.40' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

**"yes"** yazın ve **Enter** basın.

### Şifre girişi
Şimdi şifre isteyecek:
```
root@89.252.179.40's password:
```

Şifrenizi yazın: **`5l1B1nJ0auxY2WEuM3`**
(Not: Şifreyi yazarken ekranda görünmez, bu normaldir!)

**Enter** basın.

✅ **Başarılı olursa:** Sunucuda bir komut satırı göreceksiniz (örnek: `root@sunucu:~#`)

---

## 📂 ADIM 2: Proje Klasörüne Gitme

Bağlandıktan sonra, şu komutu yazın:

```bash
cd /var/www/ekartvizit
```

**Enter** basın.

---

## 🔍 ADIM 3: Durumu Kontrol Etme

Nerede olduğunuzu kontrol edin:

```bash
pwd
```

**Enter** basın.

✅ `/var/www/ekartvizit` yazmalı.

---

## 🔗 ADIM 4: GitHub Bağlantısını Kontrol Etme

GitHub'a bağlı mı kontrol edin:

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

**❌ DURUM B:** Bağlantı yok
Hiçbir şey göstermiyorsa, **ADIM 5'e geçin**.

---

## 🆕 ADIM 5: Projeyi GitHub'dan Klonlama (Sadece İlk Kurulum)

**Eğer proje daha önce klonlanmamışsa:**

Önce klasörde ne var bakalım:
```bash
ls -la
```

Eğer klasör boşsa veya sadece birkaç dosya varsa, projeyi klonlayın:

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

✅ **Başarılı:** Sonunda "Build successful" mesajı göreceksiniz.

---

## 🔄 ADIM 9: Uygulamayı Yeniden Başlatma

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

İşiniz bitince:

```bash
exit
```

**Enter** basın.

---

## 🎯 TEK KOMUTLA HEPİNİ YAPMAK

Tüm güncelleme işlemlerini tek seferde yapmak için:

```bash
cd /var/www/ekartvizit && git pull origin main && npm install --production && npm run build && pm2 restart ekartvizit && pm2 status
```

**Enter** basın ve bekleyin. Tüm işlemler otomatik olacak!

---

## 📝 ÖZET: Her Güncelleme İçin

Her seferinde şu komutları sırayla çalıştırın:

```bash
# 1. Sunucuya bağlan
ssh root@89.252.179.40

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
pm2 restart ekartvizit

# 7. Durumu kontrol et
pm2 status

# 8. Çıkış
exit
```

---

## 💡 HIZLI BAĞLANTI KOMUTU

Bağlantıyı hızlı yapmak için, Windows Terminal'de yeni bir sekme açıp şunu yazın:

```bash
ssh root@89.252.179.40
```

**Şifre:** `5l1B1nJ0auxY2WEuM3`

---

**Önemli Not:** Bu şifreyi kimseyle paylaşmayın ve güvende tutun!

---

**Son Güncelleme:** 2024
