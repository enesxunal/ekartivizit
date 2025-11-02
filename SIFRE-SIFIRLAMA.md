# 🔐 SSH Şifre Sorunu Çözüm Rehberi

## ❌ Sorun: "Permission denied" Hatası

SSH bağlantısında şifre hatası alıyorsanız, şu adımları izleyin:

---

## 🔧 ÇÖZÜM 1: VPS Kontrol Panelinden Şifre Sıfırlama

### Hostinger VPS:
1. **Hostinger kontrol paneline giriş yapın**
2. **VPS** sekmesine gidin
3. **89.252.179.40** sunucusunu bulun
4. **"Manage"** veya **"Yönet"** butonuna tıklayın
5. **"Reset Password"** veya **"Şifre Sıfırla"** seçeneğini bulun
6. **Yeni şifre oluşturun** (en az 8 karakter, büyük/küçük harf, rakam, özel karakter)
7. **Şifreyi kaydedin** ve **5 dakika bekleyin**

### Diğer VPS Sağlayıcıları:
- **DigitalOcean:** Settings → Reset Root Password
- **Vultr:** Settings → Reset Password
- **Linode:** Settings → Reset Root Password
- **AWS/Azure:** Console'dan şifre sıfırlama

---

## 🔧 ÇÖZÜM 2: Konsol/Web Terminal Kullanma

Çoğu VPS sağlayıcısı web tabanlı konsol sunar:

### Hostinger:
1. VPS kontrol panelinde **"Console"** veya **"Web Terminal"** seçeneğini bulun
2. Tarayıcıdan direkt sunucuya bağlanın
3. Şifre değiştirme komutunu çalıştırın:
```bash
passwd root
```

### Yeni şifre belirleyin ve kaydedin

---

## 🔧 ÇÖZÜM 3: SSH Anahtarı Kullanma (Önerilen)

Şifre yerine SSH anahtarı kullanmak daha güvenlidir:

### 1. Windows'ta SSH anahtarı oluşturun:
```powershell
ssh-keygen -t rsa -b 4096
```

### 2. Oluşturulan anahtarı kopyalayın:
```powershell
cat C:\Users\Enes\.ssh\id_rsa.pub
```

### 3. Çıkan metni kopyalayın (ssh-rsa ile başlar)

### 4. VPS kontrol panelinden:
- **"SSH Keys"** veya **"Public Keys"** bölümüne gidin
- **"Add Key"** butonuna tıklayın
- Anahtarı yapıştırın ve kaydedin

---

## 🔧 ÇÖZÜM 4: Kontrol Paneli Aracılığıyla Bağlanma

### Hostinger VPS File Manager:
1. VPS kontrol panelinde **"File Manager"** açın
2. Sunucu dosyalarına erişin
3. Konsol ile komut çalıştırın

---

## ✅ ŞİFRE SIFIRLADIKTAN SONRA

### 1. Yeni şifreyle bağlanın:
```bash
ssh root@89.252.179.40
```

### 2. Bağlantı başarılı olursa:
```bash
cd /var/www/ekartvizit
pwd
```

---

## 📝 ÖNEMLİ NOTLAR

1. **Şifre karakterleri:** Büyük/küçük harf duyarlıdır
2. **Şifre yazarken:** Ekranda görünmez, bu normaldir
3. **IP engeli:** VPS kontrol panelinden IP engelini kontrol edin
4. **SSH portu:** 22 portunun açık olduğundan emin olun

---

## 🆘 HALA BAĞLANAMAZSANIZ

1. **VPS sağlayıcınızın destek ekibiyle iletişime geçin**
2. **Web konsolu çalışıyor mu kontrol edin**
3. **Sunucu çalışıyor mu kontrol edin** (VPS kontrol panelinden)
4. **Firewall ayarlarını kontrol edin**

---

**Son Güncelleme:** 2024



