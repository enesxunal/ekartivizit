# E-Kartvizit - Profesyonel Baskı Çözümleri

Modern ve kullanıcı dostu bir e-ticaret platformu. Kartvizit, broşür, magnet ve diğer kurumsal baskı ürünleri için online tasarım ve sipariş sistemi.

## 🚀 Özellikler

- **Modern UI/UX**: Tailwind CSS ve shadcn/ui ile tasarlanmış
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **SEO Optimizasyonu**: Kapsamlı SEO ve performans optimizasyonları
- **PWA Desteği**: Progressive Web App özellikleri
- **Analytics**: Google Analytics entegrasyonu
- **Performance Monitoring**: Core Web Vitals izleme

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
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://e-kartvizit.com

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=905xxxxxxxxx
```

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
- Email: info@e-kartvizit.com
- WhatsApp: +90 XXX XXX XXXX
