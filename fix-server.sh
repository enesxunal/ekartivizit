#!/bin/bash

# Sunucu Sorun Giderme ve Düzeltme Script'i
# Bu script sunucudaki sorunları otomatik olarak düzeltmeye çalışır

echo "🔧 Sunucu sorunları düzeltiliyor..."

# 1. Port 3000'i kullanan process'leri durdur
echo ""
echo "🛑 Port 3000'i temizliyorum..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
sleep 2

# 2. PM2'yi tamamen durdur ve temizle
echo ""
echo "🔄 PM2'yi yeniden başlatıyorum..."
pm2 delete ekartvizit 2>/dev/null || true
pm2 kill 2>/dev/null || true
sleep 2

# 3. Proje dizinine git
cd /var/www/ekartvizit || exit 1

# 4. Build'i kontrol et ve gerekirse yeniden build yap
echo ""
echo "🏗️ Build durumunu kontrol ediyorum..."
if [ ! -d ".next" ] || [ ! -f ".next/BUILD_ID" ]; then
    echo "⚠️ Build bulunamadı, yeniden build yapılıyor..."
    npm run build
else
    echo "✅ Build mevcut"
fi

# 5. PM2'yi başlat
echo ""
echo "🚀 PM2 ile uygulamayı başlatıyorum..."
pm2 start ecosystem.config.js
pm2 save

# 6. 10 saniye bekle ve durumu kontrol et
echo ""
echo "⏳ 10 saniye bekleniyor..."
sleep 10

# 7. Durumu kontrol et
echo ""
echo "📊 Durum Kontrolü:"
pm2 status

# 8. Port kontrolü
echo ""
if ss -tlnp | grep -q ":3000"; then
    echo "✅ Port 3000 başarıyla dinleniyor"
else
    echo "❌ Port 3000 hala dinlenmiyor!"
    echo "📋 Son loglar:"
    pm2 logs ekartvizit --lines 30 --nostream
fi

# 9. Nginx'i yeniden yükle
echo ""
echo "🌐 Nginx'i yeniden yüklüyorum..."
systemctl reload nginx 2>/dev/null || nginx -s reload

# 10. Health check yap
echo ""
echo "🏥 Health check yapılıyor..."
sleep 3
curl -s http://localhost:3000/api/health | head -20 || echo "❌ Health check başarısız!"

echo ""
echo "✅ Düzeltme işlemi tamamlandı!"
echo ""
echo "📋 Son durum:"
pm2 status
ss -tlnp | grep ":3000" || echo "⚠️ Port 3000 kontrol edin!"
