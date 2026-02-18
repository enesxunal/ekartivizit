# E-Kartvizit - Profesyonel Baskı Çözümleri

Modern ve kullanıcı dostu bir e-ticaret platformu. Kartvizit, broşür, magnet ve diğer kurumsal baskı ürünleri için online tasarım ve sipariş sistemi.

## 🚀 Özellikler

- **Modern UI/UX**: Tailwind CSS ve shadcn/ui ile tasarlanmış
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Canva Entegrasyonu**: Sitenizden ayrılmadan tasarım yapma
- **SEO Optimizasyonu**: Kapsamlı SEO ve performans optimizasyonları
- **PWA Desteği**: Progressive Web App özellikleri
- **Analytics**: Google Analytics entegrasyonu
- **Performance Monitoring**: Core Web Vitals izleme
- **Tosla Ödeme**: Güvenli ödeme sistemi entegrasyonu

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Tip güvenliği
- **Analytics**: Google Analytics 4

## 📦 Kurulum

```bash
# Projeyi klonlayın
git clone [repository-url]
cd ekartvizit

# Bağımlılıkları yükleyin
npm install

# Environment variables'ları ayarlayın
cp .env.example .env.local
# .env.local dosyasını düzenleyin

# Development server'ı başlatın
npm run dev
```

## 🔧 Environment Variables

```env
# Canva Apps SDK Configuration
NEXT_PUBLIC_CANVA_APP_ID=your_canva_app_id_here
CANVA_CLIENT_SECRET=your_canva_client_secret_here
NEXT_PUBLIC_CANVA_REDIRECT_URI=http://localhost:3000/canva/callback

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://ekartvizit.co

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=905xxxxxxxxx

# Tosla Payment Gateway
TOSLA_API_USER=apiUser3016658
TOSLA_API_PASS=YN8L293GPY
TOSLA_CLIENT_ID=1000002147
TOSLA_BASE_URL=https://api.tosla.com
```

## 💳 Tosla Ödeme Entegrasyonu

### API Bilgileri
- **API User**: `apiUser3016658`
- **API Pass**: `YN8L293GPY`
- **Client ID**: `1000002147`
- **Base URL**: `https://api.tosla.com`

### Özellikler
- ✅ Kredi kartı ödemeleri
- ✅ Güvenli ödeme işlemi
- ✅ Webhook desteği
- ✅ Ödeme durumu sorgulama
- ✅ Test modu desteği

### Test Sayfası
Admin panelinde `/admin/tosla-test` adresinde Tosla entegrasyonunu test edebilirsiniz.

### Webhook URL
```
https://ekartvizit.co/api/tosla/webhook
```

## 🎨 Canva Entegrasyonu Kurulumu

### 1. Canva Developer Hesabı Oluşturma
1. [Canva Developers](https://www.canva.com/developers/) adresine gidin
2. Developer hesabınızı oluşturun
3. Yeni bir App oluşturun

### 2. Canva App Konfigürasyonu
```javascript
// App Details
App Name: E-Kartvizit Design Tool
App Description: Online tasarım editörü
Category: Design Tools

// OAuth Settings
Redirect URIs: 
- http://localhost:3000/canva/callback (development)
- https://ekartvizit.co/canva/callback (production)

// Scopes
- design:content:read
- design:content:write
- design:meta:read
```

### 3. Environment Variables
```env
NEXT_PUBLIC_CANVA_APP_ID=your_app_id_from_canva_dashboard
CANVA_CLIENT_SECRET=your_client_secret_from_canva_dashboard
NEXT_PUBLIC_CANVA_REDIRECT_URI=http://localhost:3000/canva/callback
```

### 4. Tasarım Akışı
1. Müşteri ürün sayfasından "Tasarım Oluştur" butonuna tıklar
2. Canva kimlik doğrulama popup'ı açılır
3. Müşteri Canva hesabıyla giriş yapar
4. Tasarım editörü sitenizde embed olarak yüklenir
5. Tasarım tamamlandıktan sonra PDF olarak export edilir
6. PDF admin panelinde görüntülenebilir ve indirilebilir

## 🎯 SEO ve Performans Optimizasyonları

### Meta Etiketleri
- Kapsamlı meta description ve keywords
- Open Graph ve Twitter Card desteği
- Canonical URL'ler
- Viewport optimizasyonu

### Sitemap ve Robots
- Dinamik sitemap.xml oluşturma
- SEO dostu robots.txt
- Tüm sayfalar için otomatik URL'ler

### Structured Data
- JSON-LD ile zengin snippet'ler
- Organization ve Website schema
- Ürün sayfaları için Product schema
- Breadcrumb navigation

### Performance
- Next.js Image optimizasyonu (WebP, AVIF)
- Bundle splitting ve code splitting
- Caching stratejileri
- Core Web Vitals monitoring

### Analytics
- Google Analytics 4 entegrasyonu
- E-commerce tracking
- Custom event tracking
- Performance metrics

## 📱 PWA Özellikleri

- Offline çalışma desteği
- App-like deneyim
- Push notification hazırlığı
- Install prompt

## 🚀 Deployment

### Vercel (Önerilen)
```bash
# Vercel CLI ile deploy
npm i -g vercel
vercel

# Veya GitHub entegrasyonu ile otomatik deploy
```

### Diğer Platformlar
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 📊 Performance Metrikleri

Proje aşağıdaki performans hedeflerini karşılar:
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTFB**: < 600ms

## 🔍 SEO Checklist

- ✅ Meta etiketleri optimizasyonu
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Structured data
- ✅ Image alt texts
- ✅ Semantic HTML
- ✅ Mobile-first design
- ✅ Page speed optimization

## 🖥️ Sunucuya Bağlanma ve Güncelleme

### Sunucu Bağlantı Bilgileri

**Sunucu IP:** `89.252.179.40`  
**Kullanıcı Adı:** `root`  
**Şifre:** `5l1B1nJ0auxY2WEuM3`

### Sunucuya Bağlanma

Windows Terminal veya PowerShell'de:

```bash
ssh root@89.252.179.40
```

**Şifre:** `5l1B1nJ0auxY2WEuM3`

**Not:** Şifreyi yazarken ekranda görünmez, bu normaldir!

### ⚠️ SSH Bağlantı Sorunu (Connection Refused)

Eğer `ssh: connect to host 89.252.179.40 port 22: Connection refused` hatası alıyorsanız:

**Bu durum şunları gösterebilir:**
- SSH servisi kapalı olabilir
- Firewall SSH portunu engelliyor olabilir
- Sunucu tamamen kapalı olabilir
- IP adresi değişmiş olabilir

**Çözüm Adımları:**

1. **VPS/Hosting Panelinden Kontrol:**
   - VPS sağlayıcınızın kontrol panelinden (örn: DigitalOcean, Vultr, Hetzner) sunucu durumunu kontrol edin
   - Sunucunun çalışıyor olduğundan emin olun
   - VNC/KVM konsoluna erişim varsa oradan kontrol edin

2. **Sunucu Sağlayıcısıyla İletişim:**
   - Hosting sağlayıcınızla iletişime geçin
   - SSH servisinin çalışıp çalışmadığını kontrol ettirin
   - Firewall ayarlarını kontrol ettirin

3. **Alternatif Port Deneyin:**
   ```bash
   ssh -p 2222 root@89.252.179.40
   # veya
   ssh -p 22022 root@89.252.179.40
   ```

4. **Sunucu IP'sini Kontrol Edin:**
   - VPS panelinden sunucu IP adresinin değişmediğinden emin olun

5. **VNC/KVM Konsol Erişimi:**
   - VPS sağlayıcınızın panelinden VNC veya KVM konsoluna erişin
   - Konsoldan SSH servisini başlatın:
     ```bash
     systemctl start ssh
     systemctl enable ssh
     ```

**ÖNEMLİ:** SSH erişimi yoksa, sunucuya fiziksel erişim (VNC/KVM konsol) veya hosting sağlayıcısı desteği gerekir!

### 💾 Disk Dolu (HDD %90+ – Site Neden Patlıyor?)

Disk neredeyse doluysa (ör. %92, 3–4 GB boş) uygulama yazamaz, log tutamaz; PM2 ve site sürekli çökebilir.

**Önce ne kadar yer kapladığını görün:**

```bash
# Hangi klasörler çok yer kaplıyor?
du -sh /var/* 2>/dev/null | sort -hr | head -15

# Loglar ne kadar?
du -sh /var/log/* 2>/dev/null | sort -hr | head -10

# Proje ve cache
du -sh /var/www/ekartvizit/* 2>/dev/null
du -sh /var/www/ekartvizit/.next 2>/dev/null
```

**Güvenle temizleyebileceğiniz yerler:**

```bash
# 1. Eski logları temizle (PM2 + Nginx)
pm2 flush
> /var/log/ekartvizit/out.log
> /var/log/ekartvizit/err.log
> /var/log/ekartvizit/combined.log
truncate -s 0 /var/log/nginx/access.log
truncate -s 0 /var/log/nginx/error.log

# 2. Eski apt paket listesi ve cache
apt-get clean
apt-get autoclean

# 3. npm cache (sunucuda)
npm cache clean --force

# 4. Eski journal logları (sadece eskileri siler)
journalctl --vacuum-time=7d
# veya
journalctl --vacuum-size=100M
```

**Proje içi (dikkatli):**

- `.next` silinirse `npm run build` tekrar gerekir.
- `node_modules` silinirse `npm install` tekrar gerekir.

```bash
cd /var/www/ekartvizit

# Sadece Next.js cache (build’i silmez)
rm -rf .next/cache

# Temizlikten sonra yer kontrolü
df -h /
```

**Öneri:** Disk %85’in üzerindeyse önce log + apt + npm cache temizliği yapın; hâlâ doluyorsa `du -sh` ile büyük klasörleri bulup ona göre silin. Disk rahatlayınca site ve SSH daha stabil çalışır.

### Proje Güncelleme (Sırayla)

Sunucuya bağlandıktan sonra:

```bash
# 1. Proje klasörüne git
cd /var/www/ekartvizit

# 2. GitHub'dan güncellemeleri çek
git pull origin main

# 3. Paketleri güncelle
npm install

# 4. Build yap
npm run build

# 5. Uygulamayı yeniden başlat
pm2 restart ekartvizit

# 6. Nginx'i yeniden yükle
systemctl reload nginx

# 7. Durumu kontrol et
pm2 status
```

**Her komuttan sonra Enter basın ve bitmesini bekleyin!**

### Tek Komutla Güncelleme

Tüm güncellemeleri tek seferde yapmak için:

```bash
cd /var/www/ekartvizit && git pull origin main && npm install && npm run build && pm2 restart ekartvizit --update-env && systemctl reload nginx && pm2 status
```

### 🚨 Hızlı Sorun Giderme (Site Kapalıysa)

Site sürekli kapanıyorsa, önce bu adımları deneyin:

```bash
# Sunucuya bağlan
ssh root@89.252.179.40
# Şifre: 5l1B1nJ0auxY2WEuM3

# Proje klasörüne git
cd /var/www/ekartvizit

# Otomatik düzeltme script'ini çalıştır
chmod +x fix-server.sh
./fix-server.sh
```

**VEYA** manuel olarak:

```bash
# 1. PM2'yi durdur ve temizle
pm2 delete ekartvizit
pm2 kill

# 2. Port 3000'i temizle
lsof -ti:3000 | xargs kill -9 2>/dev/null || fuser -k 3000/tcp

# 3. Proje klasörüne git
cd /var/www/ekartvizit

# 4. Build yap
npm run build

# 5. PM2 ile başlat
pm2 start ecosystem.config.js
pm2 save

# 6. Durumu kontrol et
pm2 status
pm2 logs ekartvizit --lines 30
```

### Sunucu Sorun Giderme

Eğer site sürekli "Web server is down" (Error 521) hatası veriyorsa:

**ADIM 1: Temel Kontroller**
```bash
# 1. Port 3000'in dinlenip dinlenmediğini kontrol et
ss -tlnp | grep :3000

# 2. Next.js'i manuel başlatmayı dene (PM2 olmadan)
cd /var/www/ekartvizit
NODE_ENV=production PORT=3000 node_modules/.bin/next start
# Bu komut çalışıyorsa ve "Ready on http://localhost:3000" görüyorsan, sorun PM2'de
# Ctrl+C ile durdur

# 3. Build'in başarılı olup olmadığını kontrol et
ls -la .next/server/app/

# 4. PM2 durumunu kontrol et
pm2 status
pm2 logs ekartvizit --err --lines 50
```

**ADIM 2: Port 3000 Sorunu Çözme (EADDRINUSE)**
```bash
# Port 3000'i kullanan process'i bul ve durdur
lsof -ti:3000 | xargs kill -9
# veya
fuser -k 3000/tcp

# PM2'yi tamamen durdur
pm2 delete ekartvizit
pm2 kill

# PM2 config'i kontrol et ve düzelt
cd /var/www/ekartvizit
cat ecosystem.config.js | grep -A 2 "script:"

# Eğer "npm" görüyorsan, şunu çalıştır:
sed -i "s|script: 'npm',|script: 'node_modules/.bin/next',|" ecosystem.config.js

# PM2'yi yeniden başlat
pm2 start ecosystem.config.js
pm2 save

# 10 saniye bekle ve logları kontrol et
sleep 10
pm2 logs ekartvizit --lines 30
ss -tlnp | grep :3000
```

**ADIM 3: Nginx Kontrolü ve Başlatma**
```bash
# Nginx durumunu kontrol et
ps aux | grep nginx

# Nginx config'i kontrol et
cat /etc/nginx/sites-enabled/ekartvizit.co | grep proxy_pass

# Nginx config'i test et
nginx -t

# Nginx'i başlat (systemctl yoksa)
nginx
# veya
/etc/init.d/nginx start

# Nginx'i yeniden başlat
nginx -s reload
# veya
/etc/init.d/nginx restart

# Port 80'in dinlenip dinlenmediğini kontrol et
ss -tlnp | grep :80
```

**ADIM 4: Cloudflare ve Firewall Kontrolü**
```bash
# 1. Firewall durumunu kontrol et
ufw status
# veya
iptables -L -n | grep -E "(80|443)"

# 2. Port 80 ve 443'ün açık olduğundan emin ol
ufw allow 80/tcp
ufw allow 443/tcp

# 3. Sunucunun IP'sini kontrol et
curl ifconfig.me
hostname -I

# 4. Cloudflare'in origin sunucuya bağlanıp bağlanamadığını test et
# (Sunucu IP'si ile direkt erişim denemesi)
curl -I http://89.252.179.40

# 5. Nginx access loglarını kontrol et (Cloudflare'den gelen istekler var mı?)
tail -20 /var/log/nginx/access.log

# 6. Nginx error loglarını kontrol et
tail -20 /var/log/nginx/error.log

# 7. Cloudflare'de SSL/TLS ayarlarını kontrol et:
# - SSL/TLS encryption mode: "Flexible" veya "Full" olmalı
# - Always Use HTTPS: Kapalı olmalı (HTTP'den HTTPS'e redirect yapmamalı)
# - Origin Server: HTTP (port 80) kullanmalı
```

### Deploy Script Kullanma

Alternatif olarak deploy script'ini kullanabilirsiniz:

```bash
cd /var/www/ekartvizit
./deploy.sh
```

### Sunucu Durum Kontrol Script'leri

**Durum Kontrolü:**
```bash
cd /var/www/ekartvizit
chmod +x check-server.sh
./check-server.sh
```

**Otomatik Düzeltme:**
```bash
cd /var/www/ekartvizit
chmod +x fix-server.sh
./fix-server.sh
```

Bu script'ler:
- PM2 durumunu kontrol eder
- Port 3000'in açık olup olmadığını kontrol eder
- Logları gösterir
- Bellek ve disk kullanımını kontrol eder
- Sorunları otomatik düzeltmeye çalışır

## 📞 İletişim

Proje hakkında sorularınız için:
- Email: info@ekartvizit.co
- WhatsApp: +90 850 840 3011
