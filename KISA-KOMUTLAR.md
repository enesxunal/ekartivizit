# 📝 Kısa Komutlar - Tek Tek Yazılabilir

Web Console'da copy-paste yapamıyorsunuz. İşte kısa, tek tek yazılabilir komutlar:

---

## 🔧 SSH Sorununu Çözmek İçin

### ADIM 1: SSH servisini başlat
```bash
systemctl start ssh
```

### ADIM 2: SSH'ı otomatik başlat
```bash
systemctl enable ssh
```

### ADIM 3: Şifre girişini aç
```bash
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
```

### ADIM 4: Root girişini aç
```bash
sed -i 's/PermitRootLogin no/PermitRootLogin yes/' /etc/ssh/sshd_config
```

### ADIM 5: Ubuntu şifresini ayarla
```bash
passwd ubuntu
```
Sonra şifreyi yaz: `5l1B1nJ0auxY2WEuM3` (iki kez)

### ADIM 6: Root şifresini ayarla
```bash
passwd root
```
Sonra şifreyi yaz: `5l1B1nJ0auxY2WEuM3` (iki kez)

### ADIM 7: SSH'ı yeniden başlat
```bash
systemctl restart ssh
```

---

## 📂 Proje Güncelleme İçin

### ADIM 1: Proje klasörüne git
```bash
cd /var/www/ekartvizit
```

### ADIM 2: GitHub bağlantısını kontrol et
```bash
git remote -v
```

### ADIM 3: GitHub'dan çek (eğer bağlantı varsa)
```bash
git pull origin main
```

### ADIM 4: Paketleri yükle
```bash
npm install --production
```

### ADIM 5: Build yap
```bash
npm run build
```

### ADIM 6: Uygulamayı yeniden başlat
```bash
pm2 restart ekartvizit
```

### ADIM 7: Durumu kontrol et
```bash
pm2 status
```

---

## 🆕 İlk Kurulum İçin

### ADIM 1: Proje klasörüne git
```bash
cd /var/www/ekartvizit
```

### ADIM 2: GitHub'dan klonla
```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```
**Not:** KULLANICI_ADI yerine GitHub kullanıcı adını yaz!

### ADIM 3: Paketleri yükle
```bash
npm install --production
```

### ADIM 4: Build yap
```bash
npm run build
```

### ADIM 5: PM2 ile başlat
```bash
pm2 start ecosystem.config.js
```

### ADIM 6: PM2'yi kaydet
```bash
pm2 save
```

---

## 🆘 Sorun Giderme

### Node.js yoksa
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
```
Sonra:
```bash
apt-get install -y nodejs
```

### Git yoksa
```bash
apt-get update
```
Sonra:
```bash
apt-get install -y git
```

### PM2 yoksa
```bash
npm install -g pm2
```

### Klasör yoksa
```bash
mkdir -p /var/www/ekartvizit
```

---

## 💡 İpucu

Her komutu yazdıktan sonra **Enter** basın ve bitmesini bekleyin!

**Son Güncelleme:** 2024
