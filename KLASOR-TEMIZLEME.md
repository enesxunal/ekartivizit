# 📂 Klasör Temizleme ve Klonlama

Klasör zaten var ve boş değil. İşte çözüm:

---

## ✅ ÇÖZÜM 1: Proje Klasörüne Git (Önerilen)

Önce doğru klasöre gidin:

```bash
cd /var/www/ekartvizit
```

**Enter** basın.

Şimdi klasörü kontrol edin:

```bash
ls -la
```

**Enter** basın.

### İki durum olabilir:

**✅ DURUM A:** Klasör boş veya sadece `.` ve `..` var
- Bu durumda direkt klonlayabilirsiniz

**❌ DURUM B:** Klasörde dosyalar var
- Bu durumda **ÇÖZÜM 2'ye geçin**

---

## ✅ ÇÖZÜM 2: Klasörü Temizle

Eğer `/var/www/ekartvizit` klasöründe dosyalar varsa:

```bash
cd /var/www/ekartvizit
```

**Enter** basın.

```bash
rm -rf *
```

**Enter** basın.

**Not:** Bu komut klasördeki tüm dosyaları siler!

Şimdi gizli dosyaları da temizleyin:

```bash
rm -rf .*
```

**Enter** basın.

Şimdi tekrar deneyin:

```bash
git clone https://YOUR_TOKEN_HERE@github.com/enesxunal/ekartvizit.git .
```

**Enter** basın.

---

## ✅ ÇÖZÜM 3: Klasörü Sil ve Yeniden Oluştur

Eğer yukarıdaki çözüm çalışmazsa:

```bash
cd /var/www
```

**Enter** basın.

```bash
rm -rf ekartvizit
```

**Enter** basın.

```bash
mkdir -p ekartvizit
```

**Enter** basın.

```bash
cd ekartvizit
```

**Enter** basın.

Şimdi klonlayın:

```bash
git clone https://YOUR_TOKEN_HERE@github.com/enesxunal/ekartvizit.git .
```

**Enter** basın.

---

## 🎯 ÖNERİLEN YÖNTEM

**En kolay ve güvenli yöntem:**

### ADIM 1: Klasöre git
```bash
cd /var/www/ekartvizit
```

### ADIM 2: İçeriği kontrol et
```bash
ls -la
```

### ADIM 3: Eğer dosyalar varsa temizle
```bash
rm -rf * .*
```

### ADIM 4: Klonla
```bash
git clone https://YOUR_TOKEN_HERE@github.com/enesxunal/ekartvizit.git .
```

---

## ✅ BAŞARILI KLONLAMADAN SONRA

Klonlama başarılı olduktan sonra:

### 1. Dosyaları kontrol edin
```bash
ls -la
```

### 2. Environment variables ayarlayın
```bash
nano .env
```

### 3. Paketleri yükleyin
```bash
npm install --production
```

### 4. Build yapın
```bash
npm run build
```

### 5. PM2 ile başlatın
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 6. Durumu kontrol edin
```bash
pm2 status
```

---

**Son Güncelleme:** 2024
