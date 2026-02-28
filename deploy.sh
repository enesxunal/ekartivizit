#!/bin/bash

# E-Kartvizit Deployment Script
# Bu script VPS sunucuda otomatik deployment için kullanılır

echo "🚀 E-Kartvizit Deployment başlatılıyor..."

# Proje dizinine git
cd /var/www/ekartvizit

# Git durumunu kontrol et
echo "📋 Git durumu kontrol ediliyor..."
git status

# Son commit bilgisini al
echo "📝 Son commit:"
git log --oneline -1

# Git'ten güncellemeleri çek
echo "⬇️ Git'ten güncellemeler çekiliyor..."
git pull origin main

# Node modules'ı kontrol et ve güncelle
echo "📦 Bağımlılıklar kontrol ediliyor..."
if [ -f "package-lock.json" ]; then
    echo "📦 package-lock.json bulundu, npm ci kullanılıyor..."
    npm ci --production
else
    echo "📦 npm install çalıştırılıyor..."
    npm install --production
fi

# Production build
echo "🔨 Production build oluşturuluyor..."
npm run build

# PM2 process'i yeniden başlat
echo "🔄 PM2 process yeniden başlatılıyor..."
pm2 restart ekartvizit

# PM2 durumunu kontrol et
echo "📊 PM2 durumu:"
pm2 status

# Nginx'i yeniden yükle
echo "🌐 Nginx yeniden yükleniyor..."
sudo systemctl reload nginx

# Logrotate (config varsa bir kez kurulduysa sorun çıkmaz)
if [ -f "config/logrotate-ekartvizit" ]; then
  sudo cp -f config/logrotate-ekartvizit /etc/logrotate.d/ekartvizit 2>/dev/null || true
fi

# SSL sertifikasını yenile (eğer gerekirse)
echo "🔒 SSL sertifikası kontrol ediliyor..."
sudo certbot renew --quiet

echo "✅ Deployment tamamlandı!"
echo "🌍 Site: https://ekartvizit.co"
echo "📊 PM2 Logs: pm2 logs ekartvizit"
echo "📊 PM2 Monitor: pm2 monit"
