# 🔐 Sunucu Bağlantı Sorunu Çözümü

"Permission denied" hatası alıyorsunuz. Bu sorunu çözmek için şu adımları deneyin:

---

## 🔍 SORUN 1: Şifre Yanlış Olabilir

### Çözüm Adımları:

1. **Şifreyi dikkatlice kontrol edin**
   - Büyük/küçük harf duyarlıdır
   - Rakamlar: `5l1B1nJ0auxY2WEuM3`
   - Boşluk olmamalı

2. **Şifreyi kopyalarken dikkat:**
   - Sonunda boşluk olabilir
   - Başında/tırında gizli karakterler olabilir
   - Şifreyi manuel olarak yazmayı deneyin

3. **Yeniden deneyin:**
```bash
ssh root@89.252.179.40
```

Şifreyi yazarken:
- Yazdığınızda ekranda görünmez (bu normal!)
- Dikkatli yazın ve Enter basın

---

## 🔍 SORUN 2: Root Kullanıcısı Kapalı Olabilir

Bazı sunucularda root login kapalıdır. Bu durumda farklı kullanıcı adları deneyin:

### Denenecek Kullanıcı Adları:

```bash
# Ubuntu/Debian sunucular için
ssh ubuntu@89.252.179.40

# veya
ssh admin@89.252.179.40

# veya
ssh user@89.252.179.40

# veya
ssh administrator@89.252.179.40
```

**Her birini deneyin ve aynı şifreyi girin:** `5l1B1nJ0auxY2WEuM3`

---

## 🔍 SORUN 3: SSH Key Gerekiyor Olabilir

Bazı sunucular sadece SSH anahtarı (key) ile bağlanmaya izin verir.

### Eğer SSH key varsa:

Windows'ta SSH key genellikle şurada olur:
- `C:\Users\KullaniciAdi\.ssh\id_rsa`
- veya `C:\Users\KullaniciAdi\.ssh\id_ed25519`

SSH key ile bağlanmak için:

```bash
ssh -i C:\Users\KullaniciAdi\.ssh\id_rsa root@89.252.179.40
```

(Windows'ta dosya yolu: `C:\Users\Enes\.ssh\id_rsa` gibi olabilir)

---

## 🔍 SORUN 4: VPS Panel Üzerinden Bağlanma

Eğer sunucu bir VPS sağlayıcısından alındıysa (DigitalOcean, AWS, Contabo, vb.):

### Seçenek A: VPS Panel'den Web Console Kullanın

1. VPS sağlayıcınızın web sitesine giriş yapın
2. Sunucunuzu seçin
3. "Console" veya "Web Terminal" butonuna tıklayın
4. Oradan direkt sunucuya bağlanırsınız (şifre gerekmez)

### Seçenek B: VPS Panel'den Şifre Sıfırlayın

1. VPS Panel'e giriş yapın
2. Sunucunuzu seçin
3. "Reset Password" veya "Password Reset" seçeneğini bulun
4. Yeni şifre belirleyin
5. Yeni şifreyle bağlanmayı deneyin

---

## 🔍 SORUN 5: Sunucu Yöneticisiyle İletişim

Eğer yukarıdakiler işe yaramadıysa:

1. **Sunucuyu satın aldığınız yerle iletişime geçin:**
   - Destek bileti açın
   - "SSH bağlantı sorunu" yazın
   - Doğru kullanıcı adı ve şifreyi isteyin

2. **Sunucu yöneticisiyle konuşun:**
   - Doğru kullanıcı adını sorun
   - Doğru şifreyi sorun
   - SSH key gerekip gerekmediğini sorun

---

## ✅ DOĞRU ŞİFREYİ BULMAK İÇİN

### Adım 1: Farklı kullanıcı adları deneyin

PowerShell'de şunları tek tek deneyin:

```bash
# 1. Ubuntu kullanıcısı ile
ssh ubuntu@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3

# 2. Admin kullanıcısı ile
ssh admin@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3

# 3. Root kullanıcısı ile (tekrar)
ssh root@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3
```

### Adım 2: Her denemede şifreyi dikkatlice yazın

- Büyük küçük harf duyarlı
- Karakterleri doğru yazın
- Enter'a basmadan önce kontrol edin

---

## 🆘 ACİL ÇÖZÜM: VPS Panel Kullanın

**En kolay yol:** VPS sağlayıcınızın web panelini kullanın:

1. VPS sağlayıcınızın sitesine giriş yapın
2. Sunucunuzu seçin
3. **"Console"** veya **"Web SSH"** veya **"Terminal"** butonuna tıklayın
4. Bu şekilde şifre girmeden direkt bağlanırsınız!

---

## 📞 DESTEK ALMA

Eğer hiçbir çözüm işe yaramadıysa:

1. VPS sağlayıcınızdan destek alın
2. Şu bilgileri verin:
   - IP adresi: `89.252.179.40`
   - Kullanıcı adı denediğiniz: `root`
   - Aldığınız hata: `Permission denied (publickey,password)`

---

## 💡 İPUÇLARI

- **Şifreyi Notepad'e yazıp kopyalayın** (görünür olur)
- **Her karakteri dikkatlice yazın**
- **Caps Lock kapalı olduğundan emin olun**
- **Sayısal tuş takımı kullanmayın** (yazı tuşlarındaki rakamları kullanın)

---

**Hangi VPS sağlayıcısını kullanıyorsunuz?** (DigitalOcean, AWS, Contabo, vb.)
Bu bilgiyi verirseniz daha spesifik yardım edebilirim!
