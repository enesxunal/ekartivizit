#!/bin/bash

# E-Kartvizit VPS Kurulum Script'i
# Bu script VPS sunucuda ilk kurulum için kullanılır

echo "🚀 E-Kartvizit VPS Kurulumu başlatılıyor..."

# Root kontrolü
if [ "$EUID" -ne 0 ]; then
    echo "❌ Bu script root yetkisi gerektirir!"
    exit 1
fi

# Sistem güncellemesi
echo "📦 Sistem güncellemesi yapılıyor..."
apt update && apt upgrade -y

# Gerekli paketlerin kurulumu
echo "📦 Gerekli paketler kuruluyor..."
apt install -y git curl wget unzip nginx certbot python3-certbot-nginx ufw fail2ban htop

# Node.js 18.x kurulumu
echo "📦 Node.js 18.x kuruluyor..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# PM2 kurulumu
echo "📦 PM2 kuruluyor..."
npm install -g pm2

# Proje dizini oluştur
echo "📁 Proje dizini oluşturuluyor..."
mkdir -p /var/www/ekartvizit
mkdir -p /var/log/ekartvizit

# Log dizini izinleri
chown -R www-data:www-data /var/log/ekartvizit

# Nginx konfigürasyonu
echo "🌐 Nginx konfigürasyonu yapılıyor..."
cp nginx.conf /etc/nginx/sites-available/ekartvizit.co
ln -sf /etc/nginx/sites-available/ekartvizit.co /etc/nginx/sites-enabled/

# Default nginx site'ı kaldır
rm -f /etc/nginx/sites-enabled/default

# Nginx test ve restart
nginx -t && systemctl restart nginx

# Firewall kurulumu
echo "🔥 Firewall kuruluyor..."
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Fail2ban kurulumu
echo "🛡️ Fail2ban kuruluyor..."
systemctl enable fail2ban
systemctl start fail2ban

# PM2 startup script
echo "🔄 PM2 startup script oluşturuluyor..."
pm2 startup

echo "✅ VPS kurulumu tamamlandı!"
echo ""
echo "📋 Sonraki adımlar:"
echo "1. GitHub'dan projeyi klonlayın:"
echo "   cd /var/www/ekartvizit"
echo "   git clone https://github.com/your-username/ekartvizit.git ."
echo ""
echo "2. Environment variables ayarlayın:"
echo "   nano .env"
echo ""
echo "3. PM2 ile başlatın:"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo ""
echo "4. SSL sertifikası alın:"
echo "   certbot --nginx -d ekartvizit.co -d www.ekartvizit.co"
echo ""
echo "🌍 Site: http://ekartvizit.co"
