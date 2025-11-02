# 🔄 Otomatik Deployment Çözümleri

Şu anda manuel yapılmalı. İşte otomatikleştirme seçenekleri:

---

## ✅ ÇÖZÜM 1: Deploy Script Kullanın (Kolay)

Projede `deploy.sh` script'i var. Bunu kullanabilirsiniz:

### ADIM 1: Script'e Çalıştırma İzni Verin

```bash
chmod +x /var/www/ekartvizit/deploy.sh
```

**Enter** basın.

---

### ADIM 2: Script'i Çalıştırın

```bash
/var/www/ekartvizit/deploy.sh
```

**Enter** basın.

✅ **Bu script tüm işlemleri yapar:**
- Git pull
- npm install
- npm run build
- PM2 restart
- Nginx reload

---

## ✅ ÇÖZÜM 2: Cron Job ile Otomatik Kontrol (Kolay)

Belirli aralıklarla otomatik kontrol edip güncelleme yapar:

### ADIM 1: Deploy Script'ini Hazırlayın

```bash
chmod +x /var/www/ekartvizit/deploy.sh
```

**Enter** basın.

---

### ADIM 2: Cron Job Ekleyin

```bash
crontab -e
```

**Enter** basın.

Açılan editörde, **en alta** şunu ekleyin:

```
# Her saat başı GitHub'dan kontrol et ve güncelle
0 * * * * /var/www/ekartvizit/deploy.sh >> /var/log/ekartvizit/deploy.log 2>&1
```

**Kaydedip çıkın:**
- **nano** kullanıyorsanız: `Ctrl + X`, sonra `Y`, sonra **Enter**
- **vi** kullanıyorsanız: `Esc`, sonra `:wq`, sonra **Enter**

---

### CRON ZAMAN AYARLARI

Farklı zamanlar için:

```bash
# Her 15 dakikada bir
*/15 * * * * /var/www/ekartvizit/deploy.sh >> /var/log/ekartvizit/deploy.log 2>&1

# Her gün saat 02:00'de
0 2 * * * /var/www/ekartvizit/deploy.sh >> /var/log/ekartvizit/deploy.log 2>&1

# Her saat başı (önerilen)
0 * * * * /var/www/ekartvizit/deploy.sh >> /var/log/ekartvizit/deploy.log 2>&1
```

---

## ✅ ÇÖZÜM 3: GitHub Actions (İleri Seviye)

GitHub'da otomatik deployment için GitHub Actions kullanın:

### ADIM 1: GitHub Actions Dosyası Oluşturun

Projenizde `.github/workflows/deploy.yml` dosyası oluşturun:

```yaml
name: Deploy to Server

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/ekartvizit
            ./deploy.sh
```

### ADIM 2: GitHub Secrets Ayarlayın

1. **GitHub** → **Repository** → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** tıklayın
3. Şu secret'ları ekleyin:
   - `SERVER_HOST`: `89.252.179.40`
   - `SERVER_USER`: `root`
   - `SERVER_SSH_KEY`: SSH private key'iniz

---

## ✅ ÇÖZÜM 4: GitHub Webhook (Orta Seviye)

GitHub'a push yapıldığında sunucuya bildirim gönderir:

### Sunucuda Webhook Endpoint'i Oluşturun

Next.js API route oluşturun: `src/app/api/deploy/route.ts`

---

## 📋 ÖZET: En Kolay Çözümler

### Seçenek 1: Manuel Script Kullan
```bash
/var/www/ekartvizit/deploy.sh
```

### Seçenek 2: Cron Job (Önerilen - Otomatik)
```bash
crontab -e
# Her saat başı kontrol et
0 * * * * /var/www/ekartvizit/deploy.sh >> /var/log/ekartvizit/deploy.log 2>&1
```

### Seçenek 3: Manuel Komut
```bash
cd /var/www/ekartvizit && git pull origin main && npm install && npm run build && pm2 restart ekartvizit && systemctl reload nginx
```

---

## 💡 ÖNERİLEN: Cron Job

**En kolay ve otomatik çözüm:** Cron job ile her saat başı kontrol edin.

**Avantajları:**
- ✅ Otomatik çalışır
- ✅ Kurulumu kolay
- ✅ Manuel müdahale gerektirmez

**Dezavantajları:**
- ⚠️ Her saat kontrol eder (gereksiz kontrol olabilir)

---

## 🎯 HIZLI KURULUM: Cron Job

### ADIM 1: Script'i hazırla
```bash
chmod +x /var/www/ekartvizit/deploy.sh
```

### ADIM 2: Cron ekle
```bash
crontab -e
```

En alta ekle:
```
0 * * * * /var/www/ekartvizit/deploy.sh >> /var/log/ekartvizit/deploy.log 2>&1
```

Kaydet ve çık.

---

**Hangi yöntemi tercih edersiniz?**

1. **Manuel script** (`/var/www/ekartvizit/deploy.sh`) - Her seferinde manuel çalıştır
2. **Cron job** - Otomatik, her saat kontrol eder (önerilen)
3. **GitHub Actions** - Push yapınca otomatik deploy (ileri seviye)

---

**Son Güncelleme:** 2024
