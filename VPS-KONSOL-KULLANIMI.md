# 🎯 VPS Yönetim Konsolu Kullanımı - Adım Adım

Ekranda **"VPS Yönetim Konsolu"** butonunu görüyorsunuz. İşte tam kullanım rehberi:

---

## ✅ ADIM 1: VPS Yönetim Konsolu Butonuna Tıklayın

Ekranda **"VPS Yönetim Konsolu"** butonunu görüyorsunuz (monitor ikonu, "HTML" yazısı olan).

**Bu butona tıklayın!**

---

## ✅ ADIM 2: Yeni Pencere Açılacak

Butona tıkladığınızda yeni bir tarayıcı penceresi veya sekme açılacak.

Bu pencerede bir **terminal/komut satırı** göreceksiniz.

---

## ✅ ADIM 3: Giriş Yapın

Terminal penceresinde şifre isteyecek:

### Giriş Bilgileri:

**Kullanıcı adı:**
```
ubuntu
```

**Şifre:**
```
5l1B1nJ0auxY2WEuM3
```

**Yazın ve Enter basın.**

✅ **Başarılı olursa:** `ubuntu@sunucu:~$` gibi bir komut satırı göreceksiniz.

---

## ✅ ADIM 4: Proje Klasörüne Gidin

Terminal'de şu komutu yazın:

```bash
cd /var/www/ekartvizit
```

**Enter** basın.

---

## ✅ ADIM 5: GitHub Bağlantısını Kontrol Edin

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

**❌ DURUM B:** Bağlantı yok veya klasör boş
Hiçbir şey göstermiyorsa, **ADIM 6'ya geçin**.

---

## 🆕 ADIM 6: Projeyi GitHub'dan Klonlayın (İlk Kurulum)

Eğer proje daha önce klonlanmamışsa:

### 6.1: Klasörü kontrol edin
```bash
ls -la
```

### 6.2: GitHub'dan klonlayın

```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```

**Not:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın!

**Örnek:**
```bash
git clone https://github.com/enesekinci/ekartvizit.git .
```

**Enter** basın ve bekleyin. Dosyalar indirilecek.

---

## ✅ ADIM 7: GitHub'dan Güncelleme Çekin

**Eğer proje zaten klonlanmışsa:**

```bash
git pull origin main
```

**Enter** basın.

✅ **Başarılı:** "Already up to date" veya "Updated X files" mesajı göreceksiniz.

---

## ✅ ADIM 8: Paketleri Güncelleyin

```bash
npm install --production
```

**Enter** basın ve bekleyin (2-5 dakika).

---

## ✅ ADIM 9: Projeyi Build Edin

```bash
npm run build
```

**Enter** basın ve bekleyin (2-5 dakika).

✅ **Başarılı:** "Build successful" mesajı göreceksiniz.

---

## ✅ ADIM 10: Uygulamayı Yeniden Başlatın

```bash
sudo pm2 restart ekartvizit
```

**Enter** basın.

**Not:** Şifre isterse, aynı şifreyi girin: `5l1B1nJ0auxY2WEuM3`

✅ **Başarılı:** "ekartvizit restarted" mesajı göreceksiniz.

---

## ✅ ADIM 11: Durumu Kontrol Edin

```bash
pm2 status
```

**Enter** basın.

✅ **Görmelisiniz:**
- `ekartvizit` satırı
- Status: `online` (yeşil)

---

## 🎯 TEK KOMUTLA HEPİNİ YAPMAK

Web Console'da bağlandıktan sonra, şu tek komutu çalıştırın:

```bash
cd /var/www/ekartvizit && git pull origin main && npm install --production && npm run build && sudo pm2 restart ekartvizit && pm2 status
```

**Enter** basın ve bekleyin. Tüm işlemler otomatik olacak!

---

## 📋 ÖZET: Her Güncelleme İçin

1. **VPS Panel'e giriş yapın**
2. **"VPS Yönetim Konsolu"** butonuna tıklayın
3. **Giriş yapın:**
   - Kullanıcı: `ubuntu`
   - Şifre: `5l1B1nJ0auxY2WEuM3`
4. **Komutları çalıştırın:**

```bash
cd /var/www/ekartvizit
git pull origin main
npm install --production
npm run build
sudo pm2 restart ekartvizit
pm2 status
```

---

## 💡 İPUÇLARI

- **Web Console her zaman açık kalır** - Kapatmadan çalıştırabilirsiniz
- **Komutları kopyalayıp yapıştırabilirsiniz** - Sağ tık → Paste
- **Terminal penceresi küçükse, tam ekran yapabilirsiniz**
- **Birden fazla komut yazmak isterseniz, Enter'a basın ve yeni satıra geçin**

---

## 🆘 SORUN GİDERME

### Sorun 1: Şifre kabul edilmiyor
- Şifreyi dikkatlice yazın: `5l1B1nJ0auxY2WEuM3`
- Büyük/küçük harfe dikkat edin
- Boşluk olmamalı

### Sorun 2: Komut bulunamadı (command not found)
- `npm` yoksa: `sudo apt install nodejs npm -y`
- `git` yoksa: `sudo apt install git -y`
- `pm2` yoksa: `sudo npm install -g pm2`

### Sorun 3: Permission denied
- Bazı komutlar için `sudo` kullanın
- Örnek: `sudo pm2 restart ekartvizit`

---

## ✅ BAŞARILI!

Artık **"VPS Yönetim Konsolu"** butonunu kullanarak sunucunuza bağlanabilir ve güncellemeleri yapabilirsiniz!

**Bu yöntem SSH'dan çok daha kolay!** 🚀

---

**Son Güncelleme:** 2024
