#!/bin/bash

# Sunucu Durum Kontrol ve Düzeltme Script'i
# Bu script sunucuya SSH ile bağlanıp durumu kontrol eder ve sorunları düzeltir

echo "🔍 Sunucu durumu kontrol ediliyor..."

# 1. PM2 durumunu kontrol et
echo ""
echo "📊 PM2 Durumu:"
pm2 status

# 2. Port 3000'in dinlenip dinlenmediğini kontrol et
echo ""
echo "🔌 Port 3000 Kontrolü:"
if ss -tlnp | grep -q ":3000"; then
    echo "✅ Port 3000 dinleniyor"
    ss -tlnp | grep ":3000"
else
    echo "❌ Port 3000 dinlenmiyor!"
fi

# 3. Son logları kontrol et
echo ""
echo "📋 Son Hatalar (PM2 Logs):"
pm2 logs ekartvizit --err --lines 20 --nostream

# 4. Bellek kullanımını kontrol et
echo ""
echo "💾 Bellek Kullanımı:"
free -h

# 5. Disk kullanımını kontrol et
echo ""
echo "💿 Disk Kullanımı:"
df -h /var/www/ekartvizit

# 6. Next.js build durumunu kontrol et
echo ""
echo "🏗️ Build Durumu:"
if [ -d "/var/www/ekartvizit/.next" ]; then
    echo "✅ .next klasörü mevcut"
    ls -lh /var/www/ekartvizit/.next/server/app/ 2>/dev/null | head -5
else
    echo "❌ .next klasörü bulunamadı!"
fi

# 7. Nginx durumunu kontrol et
echo ""
echo "🌐 Nginx Durumu:"
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx çalışıyor"
else
    echo "❌ Nginx çalışmıyor!"
fi

# 8. Nginx error loglarını kontrol et
echo ""
echo "📋 Nginx Son Hatalar:"
tail -10 /var/log/nginx/error.log 2>/dev/null || echo "Log dosyası bulunamadı"

echo ""
echo "✅ Kontrol tamamlandı!"
