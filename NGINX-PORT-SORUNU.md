# 🔴 Nginx Port 80 Sorunu Çözümü

Nginx port 80'e bağlanamıyor. Port 80 zaten kullanılıyor olabilir.

---

## 🔍 ADIM 1: Port 80'i Kim Kullanıyor Kontrol Edin

```bash
netstat -tlnp | grep 80
```

**Enter** basın.

veya

```bash
ss -tlnp | grep 80
```

**Enter** basın.

✅ **Sonuç:** Port 80'i kullanan servisi göreceksiniz.

---

## ✅ ÇÖZÜM 1: Çakışan Servisi Durdurun

Eğer başka bir servis port 80'i kullanıyorsa:

### Apache Çalışıyorsa:

```bash
systemctl stop apache2
systemctl disable apache2
systemctl start nginx
systemctl enable nginx
```

**Enter** basın (her komuttan sonra).

---

## ✅ ÇÖZÜM 2: Nginx'i Farklı Portta Başlatın (Geçici)

Eğer port 80'i kullanan servisi durduramıyorsanız:

### nginx.conf dosyasını düzenleyin:

```bash
sed -i 's/listen 80;/listen 8080;/' /etc/nginx/sites-available/ekartvizit.co
```

**Enter** basın.

Sonra:

```bash
nginx -t
systemctl restart nginx
```

**Not:** Bu geçici bir çözüm. Cloudflare'de port 8080'e yönlendirme yapmanız gerekir.

---

## ✅ ÇÖZÜM 3: Çakışan Nginx Process'ini Durdurun

Eğer eski bir Nginx process'i çalışıyorsa:

```bash
pkill -f nginx
```

**Enter** basın.

Sonra:

```bash
systemctl start nginx
```

**Enter** basın.

---

## ✅ ÇÖZÜM 4: Tüm HTTP Servislerini Kontrol Edin

```bash
systemctl list-units --type=service | grep -E 'apache|nginx|http'
```

**Enter** basın.

Çalışan servisleri göreceksiniz.

---

## 📋 ÖZET: Hızlı Çözüm

### ADIM 1: Port 80'i kontrol et
```bash
netstat -tlnp | grep 80
```

### ADIM 2: Apache varsa durdur
```bash
systemctl stop apache2
systemctl disable apache2
```

### ADIM 3: Nginx'i başlat
```bash
systemctl start nginx
systemctl status nginx
```

---

## 🆘 HALA ÇALIŞMIYORSA

### Port 80'i tamamen temizle:

```bash
fuser -k 80/tcp
```

**Enter** basın.

Sonra:

```bash
systemctl start nginx
systemctl status nginx
```

**Enter** basın.

---

## 💡 NOT

Container (VPS) ortamında olabilirsiniz. Bazı container'larda port 80 doğrudan erişilemeyebilir. Bu durumda Cloudflare üzerinden erişim sağlanır.

**Önce port 80'i kontrol edin ve sonucu paylaşın.**

---

**Son Güncelleme:** 2024
