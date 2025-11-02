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

## 📞 İletişim

Proje hakkında sorularınız için:
- Email: info@ekartvizit.co
- WhatsApp: +90 850 840 3011
