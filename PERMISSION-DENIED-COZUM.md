# 🔒 Permission Denied Sorunu - Tam Çözüm Rehberi

"Permission denied" hatası alıyorsunuz ve bir engel var gibi görünüyor. İşte tüm çözüm yöntemleri:

---

## 🎯 ÇÖZÜM 1: VPS Web Console (EN KOLAY - %100 ÇALIŞIR)

**SSH sorunu olursa, her zaman VPS Panel'den Web Console kullanın!**

### Adımlar:

1. **VPS sağlayıcınızın web sitesine giriş yapın**
   - Sunucuyu aldığınız site (Hostinger, Contabo, DigitalOcean, vb.)

2. **Sunucunuzu seçin**
   - Dashboard'da sunucunuzu bulun

3. **Console butonunu bulun**
   - **"Console"** butonu
   - veya **"Web SSH"** butonu
   - veya **"VNC"** butonu
   - veya **"Terminal"** butonu
   - veya **"NoVNC Console"** butonu

4. **Tıklayın ve bağlanın**
   - Açılan pencerede direkt sunucuya bağlanırsınız
   - SSH gerekmez!

5. **Giriş yapın**
   - Kullanıcı adı: `ubuntu` veya `root`
   - Şifre: `5l1B1nJ0auxY2WEuM3`

✅ **Bu yöntem her zaman çalışır! SSH sorunu olmasa bile kullanabilirsiniz.**

---

## 🔍 ÇÖZÜM 2: Şifreyi Doğru Girin

### Şifre Girişinde Dikkat Edilecekler:

1. **Şifreyi dikkatlice yazın**
   - Şifre: `5l1B1nJ0auxY2WEuM3`
   - Büyük/küçük harf duyarlı
   - Boşluk olmamalı

2. **Şifreyi Notepad'e yazıp kontrol edin**
   - Windows'ta Notepad açın
   - Şifreyi yazın: `5l1B1nJ0auxY2WEuM3`
   - Kopyalayın ve SSH'a yapıştırın

3. **Windows'ta PowerShell'de şifreyi yapıştırma:**
   - Şifre kutusunda **sağ tıklayın**
   - Veya **Shift + Insert** basın
   - Yapıştırılan şifreyi kontrol edin

---

## 🔍 ÇÖZÜM 3: Farklı Kullanıcı Adları Deneyin

Her sunucuda farklı kullanıcı adı olabilir:

```bash
# Deneyin 1: ubuntu
ssh ubuntu@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3

# Deneyin 2: root
ssh root@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3

# Deneyin 3: admin
ssh admin@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3

# Deneyin 4: user
ssh user@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3
```

---

## 🔍 ÇÖZÜM 4: SSH Key Varsa Kullanın

Eğer daha önce SSH key oluşturduysanız:

### Windows'ta SSH key genellikle şurada:
```
C:\Users\KullaniciAdi\.ssh\id_rsa
```

SSH key ile bağlanmak için:

```bash
ssh -i C:\Users\Enes\.ssh\id_rsa ubuntu@89.252.179.40
```

(Windows kullanıcı adınızı yazın)

---

## 🔍 ÇÖZÜM 5: VPS Panel'den Şifre Sıfırlama

### Eğer şifre yanlışsa, VPS Panel'den sıfırlayın:

1. **VPS Panel'e giriş yapın**

2. **Sunucunuzu seçin**

3. **"Reset Password"** veya **"Change Password"** butonunu bulun

4. **Yeni şifre belirleyin**
   - Yeni bir şifre oluşturun
   - Not edin

5. **Yeni şifreyle bağlanmayı deneyin**

---

## 🔍 ÇÖZÜM 6: PuTTY Kullanın (Windows'ta)

SSH bağlantısı için PuTTY programını kullanabilirsiniz:

### Adımlar:

1. **PuTTY'yi indirin:**
   - https://www.putty.org/ adresinden indirin
   - Kurun

2. **PuTTY'yi açın**

3. **Bağlantı bilgilerini girin:**
   - Host Name: `89.252.179.40`
   - Port: `22`
   - Connection type: `SSH`
   - **"Open"** butonuna tıklayın

4. **Giriş bilgileri:**
   - Login as: `ubuntu`
   - Password: `5l1B1nJ0auxY2WEuM3`

---

## 🔍 ÇÖZÜM 7: Windows Terminal Yerine CMD Kullanın

Bazen Windows Terminal yerine CMD daha iyi çalışır:

1. **Windows tuşu + R** basın
2. **"cmd"** yazın ve Enter
3. Şu komutu çalıştırın:

```bash
ssh ubuntu@89.252.179.40
```

---

## ✅ ÖNCELİKLİ ÇÖZÜM: Web Console Kullanın

**En kolay ve kesin çözüm:**

### Adım Adım:

1. **VPS Panel'e giriş yapın**
   - Hangi VPS sağlayıcısı? (Hostinger, Contabo, vb.)

2. **Sunucunuzu seçin**

3. **"Console" veya "Web SSH" butonunu bulun**

4. **Tıklayın - direkt bağlanın!**

5. **Giriş yapın:**
   - Kullanıcı: `ubuntu`
   - Şifre: `5l1B1nJ0auxY2WEuM3`

---

## 🎯 Bağlandıktan Sonra Yapılacaklar

Web Console ile bağlandıktan sonra, şu komutları sırayla çalıştırın:

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
sudo pm2 restart ekartvizit

# 6. Durumu kontrol et
pm2 status
```

---

## 📞 Eğer Hiçbiri İşe Yaramazsa

### VPS Sağlayıcınızdan Destek Alın:

1. **Destek bileti açın**
2. **Şunu yazın:**
   - "SSH bağlantı sorunu - Permission denied"
   - IP: `89.252.179.40`
   - Kullanıcı denediğim: `ubuntu`, `root`
   - Web Console çalışıyor mu?

3. **İstekleriniz:**
   - Doğru kullanıcı adını öğrenin
   - Şifre sıfırlama isteyin
   - SSH portunu öğrenin
   - Web Console linkini isteyin

---

## 💡 İPUÇLARI

- **Web Console her zaman çalışır** - SSH sorunu olursa bunu kullanın
- **Şifreyi Notepad'de yazıp kopyalayın** - Hatasız olur
- **Büyük/küçük harfe dikkat edin** - Şifre hassas
- **Boşluk olmamalı** - Şifre sonunda/başında boşluk olmamalı

---

## ❓ Hangi VPS Sağlayıcısını Kullanıyorsunuz?

Aşağıdakilerden hangisi?
- **Hostinger**
- **Contabo**
- **DigitalOcean**
- **AWS**
- **Hetzner**
- **Vultr**
- **Linode**
- **Diğer** (hangi?)

Bu bilgiyi verirseniz, size **spesifik adımları** gösterebilirim!

---

**ÖNEMLİ:** Web Console kullanmak en kolay ve kesin çözümdür. Mutlaka deneyin!
