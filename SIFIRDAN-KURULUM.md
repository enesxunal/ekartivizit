# 🚀 Sıfırdan Kurulum - Adım Adım

Sunucu sıfırlandı, hiçbir şey yok. İşte sıfırdan kurulum rehberi:

---

## ✅ ADIM 1: Sistem Güncellemesi

```bash
apt update
```
Enter basın, bekleyin.

```bash
apt upgrade -y
```
Enter basın, bekleyin (5-10 dakika).

---

## ✅ ADIM 2: Gerekli Paketleri Kurun

```bash
apt install -y git curl wget unzip nginx
```
Enter basın, bekleyin (2-5 dakika).

---

## ✅ ADIM 3: Node.js Kurun

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
```
Enter basın, bekleyin (1-2 dakika).

```bash
apt-get install -y nodejs
```
Enter basın, bekleyin (2-5 dakika).

---

## ✅ ADIM 4: PM2 Kurun

```bash
npm install -g pm2
```
Enter basın, bekleyin (1-2 dakika).

```bash
pm2 startup
```
Enter basın.

---

## ✅ ADIM 5: Proje Klasörünü Oluşturun

```bash
mkdir -p /var/www/ekartvizit
```
Enter basın.

```bash
mkdir -p /var/log/ekartvizit
```
Enter basın.

---

## ✅ ADIM 6: Klasöre Gidin

```bash
cd /var/www/ekartvizit
```
Enter basın.

---

## ✅ ADIM 7: Projeyi GitHub'dan Klonlayın

```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```

**ÖNEMLİ:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın!

**Örnek:**
```bash
git clone https://github.com/enesekinci/ekartvizit.git .
```

**Enter** basın ve bekleyin (2-5 dakika). Dosyalar indirilecek.

---

## ✅ ADIM 8: Environment Variables Ayarlayın

```bash
nano .env
```
Enter basın.

**Not:** Dosya boş olabilir, bu normal.

### Şunları yazın:

```env
NEXT_PUBLIC_SITE_URL=https://ekartvizit.co
NODE_ENV=production
NEXT_PUBLIC_CANVA_APP_ID=your_canva_app_id_here
CANVA_CLIENT_SECRET=your_canva_client_secret_here
NEXT_PUBLIC_CANVA_REDIRECT_URI=https://ekartvizit.co/api/canva/callback
TOSLA_API_USER=apiUser3016658
TOSLA_API_PASS=YN8L293GPY
TOSLA_CLIENT_ID=1000002147
TOSLA_BASE_URL=https://api.tosla.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=905xxxxxxxxx
```

### Dosyadan çıkmak için:
- **Ctrl + X** basın
- **Y** basın (kaydetmek için)
- **Enter** basın (dosya adını onaylamak için)

---

## ✅ ADIM 9: Paketleri Yükleyin

```bash
npm install --production
```
Enter basın ve bekleyin (5-10 dakika).

---

## ✅ ADIM 10: Projeyi Build Edin

```bash
npm run build
```
Enter basın ve bekleyin (5-10 dakika).

✅ **Başarılı:** "Build successful" mesajı göreceksiniz.

---

## ✅ ADIM 11: PM2 ile Başlatın

```bash
pm2 start ecosystem.config.js
```
Enter basın.

```bash
pm2 save
```
Enter basın.

---

## ✅ ADIM 12: Durumu Kontrol Edin

```bash
pm2 status
```
Enter basın.

✅ **Görmelisiniz:**
- `ekartvizit` satırı
- Status: `online` (yeşil)

---

## 📋 ÖZET: Sırayla Komutlar

1. `apt update`
2. `apt upgrade -y`
3. `apt install -y git curl wget unzip nginx`
4. `curl -fsSL https://deb.nodesource.com/setup_18.x | bash -`
5. `apt-get install -y nodejs`
6. `npm install -g pm2`
7. `pm2 startup`
8. `mkdir -p /var/www/ekartvizit`
9. `mkdir -p /var/log/ekartvizit`
10. `cd /var/www/ekartvizit`
11. `git clone https://github.com/KULLANICI_ADI/ekartvizit.git .`
12. `nano .env` (environment variables ayarlayın)
13. `npm install --production`
14. `npm run build`
15. `pm2 start ecosystem.config.js`
16. `pm2 save`
17. `pm2 status`

**Her komuttan sonra Enter basın ve bitmesini bekleyin!**

---

## 💡 İPUCU

Kurulum biraz zaman alabilir (15-30 dakika), sabırlı olun.

Her komuttan sonra Enter basın ve bitmesini bekleyin!

---

**Son Güncelleme:** 2024
