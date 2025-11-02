# 🔴 Bağlantı Sorunu Çözümü - "Connection timed out"

"Connection timed out" hatası alıyorsunuz. Bu sorunu çözmek için şu adımları deneyin:

---

## 🔍 SORUN 1: SSH Portu Değişik Olabilir

Bazı sunucularda SSH farklı bir portta çalışır (22 yerine).

### Farklı portları deneyin:

```bash
# Port 2222 deneyin
ssh -p 2222 ubuntu@89.252.179.40

# Port 22022 deneyin
ssh -p 22022 ubuntu@89.252.179.40

# Port 2200 deneyin
ssh -p 2200 ubuntu@89.252.179.40
```

---

## 🔍 SORUN 2: Firewall SSH Portunu Engellemiş Olabilir

Sunucuda firewall SSH portunu engelliyor olabilir.

### Çözüm: VPS Panel'den Web Console Kullanın

**En kolay çözüm:** VPS sağlayıcınızın web panelinden "Web Console" veya "VNC Console" kullanın:

1. VPS sağlayıcınızın web sitesine giriş yapın
2. Sunucunuzu seçin
3. **"Console"**, **"Web SSH"**, **"VNC"** veya **"Terminal"** butonuna tıklayın
4. Bu şekilde direkt sunucuya bağlanırsınız (port sorunu olmadan!)

---

## 🔍 SORUN 3: Sunucu Çalışmıyor Olabilir

Sunucu kapalı veya yeniden başlatılıyor olabilir.

### Kontrol için:

1. VPS Panel'e giriş yapın
2. Sunucunuzu kontrol edin
3. Durum: **"Running"** olmalı
4. Eğer **"Stopped"** ise, **"Start"** butonuna tıklayın

---

## 🔍 SORUN 4: IP Adresi Değişmiş Olabilir

Sunucu yeniden başlatıldığında IP adresi değişmiş olabilir.

### Kontrol için:

1. VPS Panel'e giriş yapın
2. Sunucunuzu seçin
3. IP adresini kontrol edin
4. Eğer farklıysa, yeni IP ile deneyin

---

## 🔍 SORUN 5: SSH Servisi Çalışmıyor Olabilir

Sunucuda SSH servisi durdurulmuş olabilir.

### Çözüm: VPS Panel Web Console ile Bağlanın

1. Web Console ile sunucuya bağlanın (SSH gerekmez)
2. SSH servisini başlatın:
```bash
sudo systemctl start ssh
sudo systemctl enable ssh
```

---

## ✅ EN KOLAY ÇÖZÜM: VPS Web Console

**SSH bağlantısı çalışmıyorsa, mutlaka VPS Panel'den Web Console kullanın:**

### Adımlar:

1. **VPS sağlayıcınızın web sitesine giriş yapın**
   - Hangi VPS sağlayıcısı kullanıyorsunuz? (DigitalOcean, AWS, Contabo, Hostinger, vb.)
   - Giriş yapın

2. **Sunucunuzu seçin**
   - Dashboard'da sunucunuzu bulun
   - Üzerine tıklayın

3. **Console'u açın**
   - **"Console"** butonu
   - veya **"Web SSH"** butonu
   - veya **"VNC Console"** butonu
   - veya **"Terminal"** butonu

4. **Direkt bağlanın**
   - Bu şekilde SSH gerekmeden direkt sunucuya bağlanırsınız
   - Şifre isterse: `5l1B1nJ0auxY2WEuM3`
   - Kullanıcı adı: `ubuntu` veya `root`

---

## 🛠️ MANUEL ÇÖZÜM: Port Değiştirme (İleri Seviye)

Eğer Web Console yoksa ve SSH portunu değiştirmek istiyorsanız:

### Sunucuya başka bir yöntemle bağlanın (VNC, Panel Console vb.)

Sonra SSH portunu kontrol edin:

```bash
# SSH config dosyasını açın
sudo nano /etc/ssh/sshd_config

# Port satırını bulun (genellikle #Port 22 şeklinde)
# Port numarasını değiştirin veya etkinleştirin
```

---

## 📞 DESTEK ALMA

Eğer hiçbir çözüm işe yaramadıysa:

1. **VPS sağlayıcınızdan destek alın**
   - Destek bileti açın
   - "SSH bağlantı sorunu, connection timed out" yazın
   - IP: `89.252.179.40`

2. **Sormalarınız gereken:**
   - SSH hangi portta çalışıyor?
   - SSH servisi çalışıyor mu?
   - Firewall SSH portunu engelliyor mu?
   - Sunucu durumu nedir?

---

## 🎯 ÖNCELİKLİ ÇÖZÜM

**Hemen yapmanız gereken:**

1. **VPS Panel'e giriş yapın** (sunucuyu satın aldığınız yer)
2. **Web Console'u açın** (SSH gerekmez!)
3. **Oradan direkt bağlanın**

Bu yöntem her zaman çalışır!

---

## ❓ Hangi VPS Sağlayıcısını Kullanıyorsunuz?

Aşağıdakilerden hangisini kullanıyorsunuz?
- DigitalOcean
- AWS (Amazon)
- Contabo
- Hostinger
- Hetzner
- Vultr
- Linode
- Diğer (hangi?)

Bu bilgiyi verirseniz, size spesifik adımları gösterebilirim!

---

**Önemli:** SSH bağlantısı çalışmıyorsa, **kesinlikle VPS Panel'den Web Console kullanın**. Bu en güvenilir yöntemdir!
