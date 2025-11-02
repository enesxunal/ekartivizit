# E-Kartvizit VPS Kurulum Rehberi

Bu rehber, E-Kartvizit sitesini VPS sunucuda nasıl kuracağınızı adım adım açıklar.

## 🚀 Hızlı Kurulum

### 1. VPS Satın Alma
- **İşletim Sistemi:** Ubuntu 22.04
- **RAM:** Minimum 512 MB (1 GB önerilir)
- **Disk:** 20 GB SSD
- **CPU:** 1 Core

### 2. Sunucuya Bağlanma
```bash
ssh root@your-server-ip
```

### 3. Otomatik Kurulum
```bash
# Kurulum script'ini çalıştır
chmod +x setup-vps.sh
./setup-vps.sh
```

## 📋 Manuel Kurulum Adımları

### 1. Sistem Güncellemesi
```bash
apt update && apt upgrade -y
```

### 2. Gerekli Paketler
```bash
apt install -y git curl wget unzip nginx certbot python3-certbot-nginx ufw fail2ban htop
```

### 3. Node.js 18.x Kurulumu
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
```

### 4. PM2 Kurulumu
```bash
npm install -g pm2
pm2 startup
```

### 5. Proje Dizini
```bash
mkdir -p /var/www/ekartvizit
mkdir -p /var/log/ekartvizit
chown -R www-data:www-data /var/log/ekartvizit
```

### 6. GitHub'dan Proje Klonlama
```bash
cd /var/www/ekartvizit
git clone https://github.com/your-username/ekartvizit.git .
```

### 7. Environment Variables
```bash
cp env.production.example .env
nano .env
```

### 8. Bağımlılıklar ve Build
```bash
npm install
npm run build
```

### 9. PM2 ile Başlatma
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 10. Nginx Konfigürasyonu
```bash
cp nginx.conf /etc/nginx/sites-available/ekartvizit.co
ln -sf /etc/nginx/sites-available/ekartvizit.co /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
```

### 11. SSL Sertifikası
```bash
certbot --nginx -d ekartvizit.co -d www.ekartvizit.co
```

### 12. Firewall
```bash
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
```

## 🔄 Güncelleme İşlemleri

### Manuel Güncelleme
```bash
cd /var/www/ekartvizit
git pull origin main
npm install
npm run build
pm2 restart ekartvizit
```

### Otomatik Güncelleme
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📊 Monitoring ve Loglar

### PM2 Komutları
```bash
# Durum kontrolü
pm2 status

# Logları görüntüleme
pm2 logs ekartvizit

# Monitor
pm2 monit

# Yeniden başlatma
pm2 restart ekartvizit
```

### Nginx Logları
```bash
# Access log
tail -f /var/log/nginx/access.log

# Error log
tail -f /var/log/nginx/error.log
```

### Sistem Logları
```bash
# Sistem durumu
htop

# Disk kullanımı
df -h

# Memory kullanımı
free -h
```

## 🔧 Troubleshooting

### PM2 Sorunları
```bash
# PM2'yi yeniden başlat
pm2 kill
pm2 start ecosystem.config.js
pm2 save
```

### Nginx Sorunları
```bash
# Nginx test
nginx -t

# Nginx restart
systemctl restart nginx

# Nginx status
systemctl status nginx
```

### SSL Sorunları
```bash
# SSL yenileme
certbot renew

# SSL durumu
certbot certificates
```

## 📁 Dosya Yapısı

```
/var/www/ekartvizit/
├── .env                    # Environment variables
├── ecosystem.config.js     # PM2 konfigürasyonu
├── deploy.sh              # Deployment script'i
├── nginx.conf             # Nginx konfigürasyonu
└── ...                    # Proje dosyaları

/var/log/ekartvizit/
├── err.log               # PM2 error logları
├── out.log              # PM2 output logları
└── combined.log         # PM2 combined logları
```

## 🔒 Güvenlik

### Firewall Kuralları
- SSH: 22 port
- HTTP: 80 port
- HTTPS: 443 port

### Fail2ban
- SSH brute force koruması
- Nginx saldırı koruması

### SSL/TLS
- Let's Encrypt sertifikası
- Otomatik yenileme

## 📞 Destek

### Faydalı Komutlar
```bash
# Sistem durumu
systemctl status nginx
systemctl status pm2-root

# Log dosyaları
tail -f /var/log/ekartvizit/combined.log
tail -f /var/log/nginx/error.log

# Disk kullanımı
du -sh /var/www/ekartvizit
```

### İletişim
- **E-posta:** info@ekartvizit.co
- **Dokümantasyon:** Bu dosya
- **GitHub:** Proje repository

---

**Son Güncelleme:** 2024-01-01
**Versiyon:** 1.0.0
