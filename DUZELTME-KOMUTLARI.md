# 🔧 Düzeltme Komutları

Ekranda birkaç hata görüyorum. İşte düzeltilmiş komutlar:

---

## ❌ HATALAR GÖRDÜM

1. `/var/www/ekartizit` klasörü yok (doğrusu: `ekartvizit`)
2. `ststemctl` yazım hatası (doğrusu: `systemctl`)
3. `sed` komutunda syntax hatası (path'te `/` problemi)
4. Git repository yok

---

## ✅ DÜZELTME: Klasör Oluştur

### ADIM 1: Doğru klasörü oluştur
```bash
mkdir -p /var/www/ekartvizit
```

### ADIM 2: Klasöre git
```bash
cd /var/www/ekartvizit
```

---

## ✅ DÜZELTME: SSH Ayarları

### ADIM 1: SSH'ı etkinleştir (doğru yazılım)
```bash
systemctl enable ssh
```

### ADIM 2: Root login iznini düzelt (doğru komut)
```bash
sed -i 's/PermitRootLogin no/PermitRootLogin yes/' /etc/ssh/sshd_config
```

**Not:** Path'teki `/` karakterini düzeltmek için bu komutu kullanın.

### ADIM 3: Şifre girişini aç
```bash
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
```

### ADIM 4: Şifreleri ayarla
```bash
passwd ubuntu
```
Şifre: `5l1B1nJ0auxY2WEuM3` (iki kez)

```bash
passwd root
```
Şifre: `5l1B1nJ0auxY2WEuM3` (iki kez)

### ADIM 5: SSH'ı yeniden başlat
```bash
systemctl restart ssh
```

---

## 📂 PROJE İÇİN (Eğer GitHub'dan klonlamak isterseniz)

### ADIM 1: Klasöre git
```bash
cd /var/www/ekartvizit
```

### ADIM 2: GitHub'dan klonla
```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```

**Not:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın!

---

## 🎯 ÖNCE ŞUNLARI YAPIN

Sırayla şunları yazın:

### 1. Klasörü oluştur
```bash
mkdir -p /var/www/ekartvizit
```

### 2. Klasöre git
```bash
cd /var/www/ekartvizit
```

### 3. SSH'ı etkinleştir (doğru yazılım)
```bash
systemctl enable ssh
```

### 4. Root login düzelt (doğru komut)
```bash
sed -i 's/PermitRootLogin no/PermitRootLogin yes/' /etc/ssh/sshd_config
```

### 5. Şifre girişini aç
```bash
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
```

### 6. SSH'ı yeniden başlat
```bash
systemctl restart ssh
```

---

**Her komuttan sonra Enter basın ve bitmesini bekleyin!**

---

**Son Güncelleme:** 2024
