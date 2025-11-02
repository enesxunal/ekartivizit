# 🔴 Cloudflare 502 Bad Gateway Hatası - Çözüm

Site `ekartvizit.co` çalışmıyor. Cloudflare 502 (Bad Gateway) hatası gösteriyor.

---

## 🔍 SORUN

502 Bad Gateway = Sunucu yanıt vermiyor
- Cloudflare çalışıyor ✅
- Tarayıcı çalışıyor ✅  
- Sunucu çalışmıyor ❌

---

## ✅ ÇÖZÜM: Sunucuda Kontrol Edin

Sunucuya bağlanın ve sırayla şunları kontrol edin:

### ADIM 1: PM2 Durumunu Kontrol Edin

```bash
pm2 status
```

**Görmeli:** `ekartvizit` → `online` (yeşil)

**Eğer `stopped` veya `errored` görüyorsanız:**

```bash
pm2 restart ekartvizit
```

**Eğer PM2'de uygulama yoksa:**

```bash
cd /var/www/ekartvizit
pm2 start ecosystem.config.js
pm2 save
```

---

### ADIM 2: Nginx Durumunu Kontrol Edin

```bash
systemctl status nginx
```

**Görmeli:** `active (running)` (yeşil)

**Eğer çalışmıyorsa:**

```bash
systemctl start nginx
systemctl enable nginx
```

---

### ADIM 3: Port 3000'i Kontrol Edin

```bash
netstat -tlnp | grep 3000
```

**Görmeli:** `:::3000` → `LISTEN`

**Eğer port 3000'de bir şey yoksa, PM2'yi yeniden başlatın.**

---

### ADIM 4: PM2 Loglarını Kontrol Edin

```bash
pm2 logs ekartvizit --lines 50
```

**Hata var mı kontrol edin.** Hata görürseniz logları paylaşın.

---

### ADIM 5: Build Hataları Var mı?

```bash
cd /var/www/ekartvizit
npm run build
```

**Eğer build hatası varsa, hata mesajını paylaşın.**

---

## 🚀 HIZLI ÇÖZÜM: Her Şeyi Yeniden Başlat

Eğer yukarıdaki kontroller sorun göstermiyorsa, her şeyi yeniden başlatın:

```bash
cd /var/www/ekartvizit
pm2 restart ekartvizit
systemctl restart nginx
pm2 status
```

---

## 📋 TAM ÇÖZÜM KOMUTLARI (Sırayla)

```bash
# 1. Klasöre git
cd /var/www/ekartvizit

# 2. PM2 durumunu kontrol et
pm2 status

# 3. PM2'yi yeniden başlat
pm2 restart ekartvizit

# 4. Nginx durumunu kontrol et
systemctl status nginx

# 5. Nginx'i yeniden başlat
systemctl restart nginx

# 6. Port kontrolü
netstat -tlnp | grep 3000

# 7. Son durum
pm2 status
systemctl status nginx
```

---

## 🔍 DİĞER OLASI SORUNLAR

### Sorun 1: Build Hatası
```bash
cd /var/www/ekartvizit
npm install
npm run build
```

### Sorun 2: Port Kullanımda
```bash
lsof -i :3000
# veya
netstat -tlnp | grep 3000
```

### Sorun 3: Nginx Config Hatası
```bash
nginx -t
```

Hata varsa düzeltin:
```bash
sudo nano /etc/nginx/sites-enabled/ekartvizit.co
```

### Sorun 4: Disk Dolmuş
```bash
df -h
```

---

## ✅ BAŞARILI OLDUĞUNDA GÖRECEKLERİNİZ

**PM2:**
```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ ekartvizit         │ cluster  │ 0    │ online    │ 0%       │ 58.0mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

**Nginx:**
```
● nginx.service - A high performance web server
   Loaded: loaded
   Active: active (running)
```

**Port:**
```
tcp6  0  0  :::3000  :::*  LISTEN  4172/next-server
```

---

## 🆘 HALA ÇALIŞMIYORSA

1. **PM2 logları:**
   ```bash
   pm2 logs ekartvizit --lines 100
   ```

2. **Nginx logları:**
   ```bash
   tail -f /var/log/nginx/error.log
   ```

3. **Sunucu kaynakları:**
   ```bash
   free -h
   df -h
   top
   ```

**Loglardaki hata mesajlarını paylaşın, birlikte çözelim!**

---

**Son Güncelleme:** 2024

