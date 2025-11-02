# 🔐 Host Key Hatası Çözümü

"Host key verification failed" hatası alıyorsunuz. Bu, sunucu sıfırlandığı için host key değişmiş olabilir.

---

## ✅ ÇÖZÜM 1: Known Hosts Dosyasından Eski Kaydı Sil

Windows Terminal'de şu komutu çalıştırın:

```bash
ssh-keygen -R 89.252.179.40
```

**Enter** basın.

✅ **Başarılı:** "Host 89.252.179.40 found: line 6" gibi bir mesaj göreceksiniz.

---

## ✅ ÇÖZÜM 2: Manuel Silme (İlk Çözüm Çalışmazsa)

### ADIM 1: Known Hosts Dosyasını Açın

Windows'ta şu dosyayı açın:
```
C:\Users\Enes\.ssh\known_hosts
```

**Nasıl açılır:**
1. Windows tuşuna basın
2. "Notepad" yazın ve açın
3. Dosya → Aç (Ctrl+O)
4. Dosya yolunu yazın: `C:\Users\Enes\.ssh\known_hosts`
5. Aç

### ADIM 2: 6. Satırı Silin

Dosyada **6. satırı** bulun ve **silin**.

**6. satır şuna benzer:**
```
89.252.179.40 ecdsa-sha2-nistp256 AAAAAB3...
```

**Tüm satırı seçin ve Delete tuşuna basın.**

### ADIM 3: Dosyayı Kaydedin

- **Ctrl + S** basın (kaydetmek için)
- Dosyayı kapatın

---

## ✅ ÇÖZÜM 3: Tek Komutla (En Kolay)

Windows Terminal'de şu komutu çalıştırın:

```bash
ssh-keygen -R 89.252.179.40
```

**Enter** basın.

✅ **Başarılı:** Eski kayıt silinecek.

---

## ✅ ÇÖZÜM 4: Yeniden Bağlanmayı Deneyin

Eski kaydı sildikten sonra, tekrar bağlanmayı deneyin:

```bash
ssh root@89.252.179.40
```

**Enter** basın.

### İlk bağlantıda onay

Şu mesajı göreceksiniz:
```
The authenticity of host '89.252.179.40' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

**"yes"** yazın ve **Enter** basın.

### Şifre girişi

Şifre isteyecek:
```
root@89.252.179.40's password:
```

**Şifreyi yazın:**
- Sunucuyu sıfırladıysanız: Yeni belirlediğiniz şifre
- Sıfırlamadıysanız: `5l1B1nJ0auxY2WEuM3`

**Enter** basın.

✅ **Başarılı olursa:** `root@server:~#` gibi bir komut satırı göreceksiniz.

---

## 📋 ÖZET: Hızlı Çözüm

### ADIM 1: Eski host key'i sil
```bash
ssh-keygen -R 89.252.179.40
```

### ADIM 2: Yeniden bağlan
```bash
ssh root@89.252.179.40
```

### ADIM 3: Onay ver
```
yes
```

### ADIM 4: Şifre gir
- Yeni şifre (sıfırladıysanız)
- veya `5l1B1nJ0auxY2WEuM3`

---

## 💡 NEDEN BU HATA OLUYOR?

- Sunucu sıfırlandığında host key değişir
- Windows bilgisayarınızda eski host key kayıtlı
- SSH yeni key ile eski kaydı eşleştiremediği için hata veriyor
- Çözüm: Eski kaydı silmek ve yeni key'i kabul etmek

---

## 🆘 HALA ÇALIŞMIYORSA

Eğer hala bağlanamıyorsanız, **VPS Panel'den "VPS Yönetim Konsolu"** butonunu kullanarak Web Console ile bağlanabilirsiniz. Bu her zaman çalışır!

---

**Son Güncelleme:** 2024
