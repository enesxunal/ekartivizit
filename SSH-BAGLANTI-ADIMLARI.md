# 🔌 SSH Bağlantı Adımları

SSH ile sunucuya bağlanmak için:

---

## ✅ ADIM 1: SSH Komutunu Çalıştırın

Windows Terminal'de şu komutu yazın:

```bash
ssh root@89.252.179.40
```

**Enter** basın.

---

## ✅ ADIM 2: İlk Bağlantıda Onay

İlk kez bağlanıyorsanız şu mesajı göreceksiniz:

```
The authenticity of host '89.252.179.40' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

**"yes"** yazın ve **Enter** basın.

---

## ✅ ADIM 3: Şifre Girişi

Şimdi şifre isteyecek:

```
root@89.252.179.40's password:
```

**Şifreyi yazın:**
- Eğer sunucuyu sıfırladıysanız: Yeni belirlediğiniz şifre
- Eğer sıfırlamadıysanız: `5l1B1nJ0auxY2WEuM3`

**Not:** Şifreyi yazarken ekranda görünmez (bu normaldir!)

**Enter** basın.

---

## ✅ ADIM 4: Bağlantı Başarılı

✅ **Başarılı olursa:** `root@server:~#` gibi bir komut satırı göreceksiniz.

Artık sunucuda komut çalıştırabilirsiniz!

---

## ❌ HATA ALIRSANIZ

### Hata 1: "Permission denied"
**Çözüm:** Şifre yanlış olabilir. Tekrar deneyin veya Web Console kullanın.

### Hata 2: "Connection timed out"
**Çözüm:** SSH servisi kapalı olabilir. VPS Panel'den Web Console kullanın.

### Hata 3: "Connection refused"
**Çözüm:** SSH portu değişik olabilir. Web Console kullanın.

---

## 🎯 BAĞLANDIKTAN SONRA YAPILACAKLAR

SSH ile bağlandıktan sonra şu komutları çalıştırın:

### 1. Proje klasörüne git
```bash
cd /var/www/ekartvizit
```

### 2. GitHub'dan güncellemeleri çek
```bash
git pull origin main
```

### 3. Paketleri güncelle
```bash
npm install --production
```

### 4. Build yap
```bash
npm run build
```

### 5. Uygulamayı yeniden başlat
```bash
pm2 restart ekartvizit
```

### 6. Durumu kontrol et
```bash
pm2 status
```

---

## 💡 İPUCU

Eğer SSH çalışmıyorsa, **VPS Panel'den "VPS Yönetim Konsolu"** butonunu kullanarak Web Console ile bağlanabilirsiniz. Bu her zaman çalışır!

---

**Son Güncelleme:** 2024
