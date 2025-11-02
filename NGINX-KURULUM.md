# 🌐 Nginx Kurulum ve Yapılandırma

Error 521: Cloudflare sunucuya ulaşamıyor. Nginx kurulup yapılandırılmalı.

---

## ✅ ADIM 1: Nginx'i Kurun

```bash
apt update
```

**Enter** basın, bekleyin.

```bash
apt install -y nginx
```

**Enter** basın ve bekleyin (1-2 dakika).

---

## ✅ ADIM 2: Nginx Konfigürasyonunu Kopyalayın

```bash
cp /var/www/ekartvizit/nginx.conf /etc/nginx/sites-available/ekartvizit.co
```

**Enter** basın.

---

## ✅ ADIM 3: Nginx Konfigürasyonunu Aktifleştirin

```bash
ln -sf /etc/nginx/sites-available/ekartvizit.co /etc/nginx/sites-enabled/
```

**Enter** basın.

---

## ✅ ADIM 4: Default Site'ı Kaldırın

```bash
rm -f /etc/nginx/sites-enabled/default
```

**Enter** basın.

---

## ✅ ADIM 5: Nginx Konfigürasyonunu Test Edin

```bash
nginx -t
```

**Enter** basın.

✅ **Başarılı:** "syntax is ok" ve "test is successful" mesajları göreceksiniz.

---

## ✅ ADIM 6: Nginx'i Başlatın

```bash
systemctl start nginx
```

**Enter** basın.

---

## ✅ ADIM 7: Nginx'i Otomatik Başlatma İçin Ayarlayın

```bash
systemctl enable nginx
```

**Enter** basın.

---

## ✅ ADIM 8: Nginx Durumunu Kontrol Edin

```bash
systemctl status nginx
```

**Enter** basın.

✅ **Görmelisiniz:** "Active: active (running)" yazmalı.

---

## ✅ ADIM 9: Nginx'i Yeniden Başlatın

```bash
systemctl restart nginx
```

**Enter** basın.

---

## ✅ ADIM 10: Port 3000'i Kontrol Edin

PM2'nin port 3000'de çalıştığını kontrol edin:

```bash
netstat -tlnp | grep 3000
```

**Enter** basın.

✅ **Görmelisiniz:** Port 3000'de bir servis çalışıyor olmalı.

---

## 📋 ÖZET: Tek Tek Komutlar

1. `apt update`
2. `apt install -y nginx`
3. `cp /var/www/ekartvizit/nginx.conf /etc/nginx/sites-available/ekartvizit.co`
4. `ln -sf /etc/nginx/sites-available/ekartvizit.co /etc/nginx/sites-enabled/`
5. `rm -f /etc/nginx/sites-enabled/default`
6. `nginx -t`
7. `systemctl start nginx`
8. `systemctl enable nginx`
9. `systemctl restart nginx`
10. `systemctl status nginx`

**Her komuttan sonra Enter basın ve bitmesini bekleyin!**

---

## 🔍 PM2 Loglarını Kontrol Edin

Eğer hala çalışmıyorsa:

```bash
pm2 logs ekartvizit
```

**Enter** basın. Hata mesajlarını göreceksiniz.

---

## 🔒 SSL Sertifikası (İsteğe Bağlı)

SSL sertifikası için:

```bash
apt install -y certbot python3-certbot-nginx
```

**Enter** basın, bekleyin.

```bash
certbot --nginx -d ekartvizit.co -d www.ekartvizit.co
```

**Enter** basın ve talimatları izleyin.

---

## 🆘 SORUN GİDERME

### Sorun 1: "nginx: command not found"
**Çözüm:** Nginx kurulu değil, ADIM 1'i tekrar yapın.

### Sorun 2: "nginx: [emerg] bind to 0.0.0.0:80 failed"
**Çözüm:** Port 80 zaten kullanılıyor. Başka bir servis var mı kontrol edin:
```bash
netstat -tlnp | grep 80
```

### Sorun 3: Site hala açılmıyor
**Çözüm:**
1. PM2 durumunu kontrol edin: `pm2 status`
2. Port 3000'i kontrol edin: `netstat -tlnp | grep 3000`
3. Nginx loglarını kontrol edin: `tail -f /var/log/nginx/error.log`

---

**Son Güncelleme:** 2024
