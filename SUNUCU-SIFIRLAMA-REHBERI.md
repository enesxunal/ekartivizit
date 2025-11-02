# 🔄 Sunucu Sıfırlama ve Kurulum Rehberi

Sunucuyu sıfırdan kurmak istiyorsunuz. İşte adım adım rehber:

---

## ✅ ADIM 1: VPS Panel'e Giriş Yapın

1. VPS sağlayıcınızın web sitesine giriş yapın
2. Sunucunuzu seçin

---

## ✅ ADIM 2: Sunucuyu Sıfırla - "Tekrar Kurulum Yap" Butonu

VPS Panel'de şu butonu bulun:
- **"Tekrar Kurulum Yap"** butonu (dişli ikonu olan)

**Bu butona tıklayın.**

---

## ✅ ADIM 3: İşletim Sistemi Seçin

Açılan pencerede:

1. **İşletim Sistemi:** Ubuntu 22.04 veya Ubuntu 20.04 seçin
2. **Şifre:** Yeni bir şifre belirleyin (not edin!)
3. **Onay:** "Kurulum Yap" veya "Formatla" butonuna tıklayın

**Not:** Kurulum 5-10 dakika sürebilir. Bekleyin.

---

## ✅ ADIM 4: Kurulum Tamamlandıktan Sonra

Kurulum bittikten sonra **"VPS Yönetim Konsolu"** butonuna tıklayın.

Yeni bir terminal penceresi açılacak.

---

## ✅ ADIM 5: İlk Giriş

Terminal'de giriş yapın:

**Kullanıcı adı:**
```
root
```
veya
```
ubuntu
```

**Şifre:**
Kurulum sırasında belirlediğiniz şifre

**Yazın ve Enter basın.**

✅ **Başarılı olursa:** `root@server:~#` gibi bir komut satırı göreceksiniz.

---

## ✅ ADIM 6: Sistem Güncellemesi

```bash
apt update
```
Enter basın, bekleyin.

```bash
apt upgrade -y
```
Enter basın, bekleyin (5-10 dakika).

---

## ✅ ADIM 7: Gerekli Paketleri Kurun

```bash
apt install -y git curl wget unzip nginx certbot python3-certbot-nginx
```
Enter basın, bekleyin (2-5 dakika).

---

## ✅ ADIM 8: Node.js Kurun

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
```
Enter basın, bekleyin.

```bash
apt-get install -y nodejs
```
Enter basın, bekleyin (2-5 dakika).

---

## ✅ ADIM 9: PM2 Kurun

```bash
npm install -g pm2
```
Enter basın, bekleyin.

```bash
pm2 startup
```
Enter basın.

---

## ✅ ADIM 10: Proje Klasörünü Oluşturun

```bash
mkdir -p /var/www/ekartvizit
```
Enter basın.

```bash
mkdir -p /var/log/ekartvizit
```
Enter basın.

---

## ✅ ADIM 11: Projeyi GitHub'dan Klonlayın

```bash
cd /var/www/ekartvizit
```
Enter basın.

```bash
git clone https://github.com/KULLANICI_ADI/ekartvizit.git .
```
Enter basın.

**ÖNEMLİ:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın!

**Örnek:**
```bash
git clone https://github.com/enesekinci/ekartvizit.git .
```

Enter basın ve bekleyin. Dosyalar indirilecek.

---

## ✅ ADIM 12: Environment Variables Ayarlayın

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

## ✅ ADIM 13: Paketleri Yükleyin

```bash
npm install --production
```
Enter basın ve bekleyin (5-10 dakika).

---

## ✅ ADIM 14: Projeyi Build Edin

```bash
npm run build
```
Enter basın ve bekleyin (5-10 dakika).

✅ **Başarılı:** "Build successful" mesajı göreceksiniz.

---

## ✅ ADIM 15: PM2 ile Başlatın

```bash
pm2 start ecosystem.config.js
```
Enter basın.

```bash
pm2 save
```
Enter basın.

---

## ✅ ADIM 16: PM2 Durumunu Kontrol Edin

```bash
pm2 status
```
Enter basın.

✅ **Görmelisiniz:**
- `ekartvizit` satırı
- Status: `online` (yeşil)

---

## ✅ ADIM 17: Nginx Konfigürasyonu (İsteğe Bağlı)

Eğer `nginx.conf` dosyası varsa:

```bash
cp nginx.conf /etc/nginx/sites-available/ekartvizit.co
```
Enter basın.

```bash
ln -sf /etc/nginx/sites-available/ekartvizit.co /etc/nginx/sites-enabled/
```
Enter basın.

```bash
rm -f /etc/nginx/sites-enabled/default
```
Enter basın.

```bash
nginx -t
```
Enter basın.

```bash
systemctl restart nginx
```
Enter basın.

---

## ✅ ADIM 18: SSL Sertifikası (İsteğe Bağlı)

```bash
certbot --nginx -d ekartvizit.co -d www.ekartvizit.co
```
Enter basın ve talimatları izleyin.

---

## 📋 ÖZET: Sıfırdan Kurulum Komutları (Sırayla)

1. `apt update`
2. `apt upgrade -y`
3. `apt install -y git curl wget unzip nginx certbot python3-certbot-nginx`
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

---

## 💡 İPUCU

**Her komuttan sonra Enter basın ve bitmesini bekleyin!**

Kurulum biraz zaman alabilir (15-30 dakika), sabırlı olun.

---

## 🆘 SORUN GİDERME

### Sorun: Git repository bulunamadı
- GitHub kullanıcı adınızı doğru yazdığınızdan emin olun
- Repository'nin public olduğundan emin olun

### Sorun: npm install hata veriyor
- İnternet bağlantısını kontrol edin
- `npm cache clean --force` deneyin

### Sorun: Build hata veriyor
- `.env` dosyasını kontrol edin
- `npm run build` tekrar deneyin

---

**Son Güncelleme:** 2024
