# 🔧 SSH Permission Denied Sorunu Çözümü

Şu anda Web Console ile bağlısınız. SSH sorununu çözmek için şu adımları izleyin:

---

## ✅ ADIM 1: SSH Servisini Kontrol Edin

Web Console'da şu komutu yazın:

```bash
systemctl status ssh
```

**Enter** basın.

### İki durum olabilir:

**✅ DURUM A:** SSH çalışıyor
- "Active: active (running)" yazacak
- Bu durumda **ADIM 3'e geçin**

**❌ DURUM B:** SSH çalışmıyor
- "Active: inactive" veya "failed" yazacak
- Bu durumda **ADIM 2'ye geçin**

---

## ✅ ADIM 2: SSH Servisini Başlatın

Eğer SSH çalışmıyorsa:

```bash
systemctl start ssh
systemctl enable ssh
```

**Enter** basın.

**Kontrol edin:**
```bash
systemctl status ssh
```

✅ "Active: active (running)" yazmalı.

---

## ✅ ADIM 3: SSH Konfigürasyonunu Kontrol Edin

SSH ayarlarını kontrol edin:

```bash
cat /etc/ssh/sshd_config | grep -E "PasswordAuthentication|PermitRootLogin|Port"
```

**Enter** basın.

### Görmelisiniz:
- `PasswordAuthentication yes` (şifre ile giriş açık olmalı)
- `PermitRootLogin yes` veya `PermitRootLogin prohibit-password`
- `Port 22` veya başka bir port

---

## ✅ ADIM 4: SSH Şifre Girişini Etkinleştirin

Eğer `PasswordAuthentication no` görüyorsanız, değiştirin:

```bash
nano /etc/ssh/sshd_config
```

**Enter** basın.

### Dosyada şunları bulun ve düzenleyin:

1. `#PasswordAuthentication yes` satırını bulun
2. Başındaki `#` işaretini kaldırın (yorum satırından çıkarın)
3. Veya `PasswordAuthentication no` ise `yes` yapın

### Dosyadan çıkmak için:
- **Ctrl + X** basın
- **Y** basın (kaydetmek için)
- **Enter** basın (dosya adını onaylamak için)

---

## ✅ ADIM 5: Root Login İzinlerini Kontrol Edin

Root kullanıcısı ile giriş yapılabilir mi kontrol edin:

```bash
sed -i 's/#PermitRootLogin yes/PermitRootLogin yes/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin no/PermitRootLogin yes/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
```

**Enter** basın.

---

## ✅ ADIM 6: SSH Konfigürasyonunu Test Edin

```bash
ssh-keygen -A
sshd -t
```

**Enter** basın.

✅ **Hata yoksa:** Hiçbir şey yazmayacak (bu iyi!)

❌ **Hata varsa:** Hata mesajını okuyun ve düzeltin.

---

## ✅ ADIM 7: SSH Servisini Yeniden Başlatın

```bash
systemctl restart ssh
```

**Enter** basın.

---

## ✅ ADIM 8: SSH Durumunu Kontrol Edin

```bash
systemctl status ssh
```

**Enter** basın.

✅ **"Active: active (running)"** yazmalı.

---

## ✅ ADIM 9: Ubuntu Kullanıcısı Şifresini Ayarlayın

SSH ile `ubuntu` kullanıcısı ile giriş yapabilmek için:

```bash
passwd ubuntu
```

**Enter** basın.

**Yeni şifre isteyecek:**
```
New password:
```

Şifreyi yazın: `5l1B1nJ0auxY2WEuM3`

**Enter** basın.

**Tekrar isteyecek:**
```
Retype new password:
```

Aynı şifreyi tekrar yazın: `5l1B1nJ0auxY2WEuM3`

**Enter** basın.

✅ **"password updated successfully"** mesajı göreceksiniz.

---

## ✅ ADIM 10: Root Kullanıcısı Şifresini Ayarlayın

```bash
passwd root
```

**Enter** basın.

**Yeni şifre isteyecek:**
```
New password:
```

Şifreyi yazın: `5l1B1nJ0auxY2WEuM3`

**Enter** basın.

**Tekrar isteyecek:**
```
Retype new password:
```

Aynı şifreyi tekrar yazın: `5l1B1nJ0auxY2WEuM3`

**Enter** basın.

✅ **"password updated successfully"** mesajı göreceksiniz.

---

## ✅ ADIM 11: Ubuntu Kullanıcısı Var mı Kontrol Edin

```bash
id ubuntu
```

**Enter** basın.

### İki durum olabilir:

**✅ DURUM A:** Kullanıcı var
- "uid=..." gibi bir çıktı göreceksiniz
- Bu durumda **ADIM 12'ye geçin**

**❌ DURUM B:** Kullanıcı yok
- "no such user" mesajı göreceksiniz
- Bu durumda **ADIM 11.1'e geçin**

---

## ✅ ADIM 11.1: Ubuntu Kullanıcısı Oluşturun

Eğer `ubuntu` kullanıcısı yoksa:

```bash
useradd -m -s /bin/bash ubuntu
usermod -aG sudo ubuntu
passwd ubuntu
```

**Enter** basın.

Şifreyi yazın: `5l1B1nJ0auxY2WEuM3` (iki kez)

---

## ✅ ADIM 12: SSH Bağlantısını Test Edin

Şimdi Windows Terminal'de tekrar deneyin:

```bash
ssh ubuntu@89.252.179.40
```

Şifre: `5l1B1nJ0auxY2WEuM3`

veya

```bash
ssh root@89.252.179.40
```

Şifre: `5l1B1nJ0auxY2WEuM3`

---

## 🎯 TEK KOMUTLA HEPİNİ YAPMAK

Web Console'da şu komutları sırayla çalıştırın:

```bash
# SSH servisini başlat
systemctl start ssh && systemctl enable ssh

# SSH şifre girişini etkinleştir
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Root login iznini ver
sed -i 's/#PermitRootLogin yes/PermitRootLogin yes/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin no/PermitRootLogin yes/' /etc/ssh/sshd_config

# Şifreleri ayarla
echo 'ubuntu:5l1B1nJ0auxY2WEuM3' | chpasswd
echo 'root:5l1B1nJ0auxY2WEuM3' | chpasswd

# SSH servisini yeniden başlat
systemctl restart ssh

# Durumu kontrol et
systemctl status ssh
```

**Enter** basın ve bekleyin.

---

## 📋 ADIM ADIM YAPMAK İSTERSENİZ

### 1. SSH servisini başlatın:
```bash
systemctl start ssh
systemctl enable ssh
```

### 2. Şifre girişini etkinleştirin:
```bash
nano /etc/ssh/sshd_config
```

Dosyada `PasswordAuthentication yes` olduğundan emin olun (başında `#` olmamalı).

### 3. Root login iznini verin:
Dosyada `PermitRootLogin yes` olduğundan emin olun.

### 4. Şifreleri ayarlayın:
```bash
passwd ubuntu
passwd root
```

Her birinde şifreyi yazın: `5l1B1nJ0auxY2WEuM3`

### 5. SSH'ı yeniden başlatın:
```bash
systemctl restart ssh
```

---

## ✅ BAŞARILI!

Şimdi Windows Terminal'de tekrar deneyin:

```bash
ssh ubuntu@89.252.179.40
```

veya

```bash
ssh root@89.252.179.40
```

Şifre: `5l1B1nJ0auxY2WEuM3`

**Bu sefer çalışmalı!** ✅

---

**Not:** Web Console zaten çalışıyor, ama SSH'ı da düzeltmek iyi bir fikir. Bu sayede ileride SSH ile de bağlanabilirsiniz.

---

**Son Güncelleme:** 2024
