# 🔐 GitHub Authentication Sorunu Çözümü

GitHub artık şifre ile giriş kabul etmiyor. İşte çözümler:

---

## ✅ ÇÖZÜM 1: Personal Access Token Kullanın (Önerilen)

### ADIM 1: GitHub'da Token Oluşturun

1. **GitHub'a giriş yapın**: https://github.com
2. **Sağ üst köşede profil resminize tıklayın**
3. **"Settings"** (Ayarlar) seçeneğine tıklayın
4. **Sol menüden "Developer settings"** seçin
5. **"Personal access tokens"** → **"Tokens (classic)"** seçin
6. **"Generate new token"** → **"Generate new token (classic)"** tıklayın
7. **Token ayarları:**
   - **Note (Not):** "VPS Deployment" yazın
   - **Expiration (Süre):** İstediğiniz süreyi seçin (örn: 90 days)
   - **Scopes (İzinler):** 
     - ✅ `repo` (tüm kutuyu işaretleyin - tüm repository'lere erişim)
   - **"Generate token"** butonuna tıklayın

8. **Token'ı kopyalayın!** 
   - **ÖNEMLİ:** Token'ı hemen kopyalayın, bir daha göremezsiniz!
   - Şuna benzer olacak: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### ADIM 2: Sunucuda Token ile Klonlayın

Sunucu terminal'inde şu komutu yazın:

```bash
git clone https://TOKEN@github.com/enesxunal/ekartvizit.git .
```

**ÖNEMLİ:** `TOKEN` yerine az önce kopyaladığınız token'ı yazın!

**Örnek:**
```bash
git clone https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/enesxunal/ekartvizit.git .
```

Enter basın.

**Şifre isterse:** Token'ı yazın.

✅ **Başarılı olursa:** Dosyalar indirilecek!

---

## ✅ ÇÖZÜM 2: Repository'yi Public Yapın (Daha Kolay)

Eğer repository'nin public olmasında sakınca yoksa:

### ADIM 1: GitHub'da Repository Ayarları

1. **GitHub'a giriş yapın**: https://github.com
2. **Repository'nize gidin**: `enesxunal/ekartvizit`
3. **"Settings"** (Ayarlar) sekmesine tıklayın
4. **En alta inin** → **"Danger Zone"** bölümüne gidin
5. **"Change repository visibility"** → **"Change visibility"** tıklayın
6. **"Make public"** seçin
7. **Repository adını yazıp onaylayın**

### ADIM 2: Sunucuda Klonlayın

Repository public olduktan sonra, sunucuda:

```bash
git clone https://github.com/enesxunal/ekartvizit.git .
```

Enter basın.

**Artık şifre istemeyecek!**

---

## ✅ ÇÖZÜM 3: SSH Key Kullanın (İleri Seviye)

SSH key ile bağlanmak için:

### ADIM 1: SSH Key Oluşturun

Sunucuda:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Enter basın 3 kez (şifre sormadan).

### ADIM 2: Public Key'i Kopyalayın

```bash
cat ~/.ssh/id_ed25519.pub
```

Enter basın. Çıkan metni kopyalayın.

### ADIM 3: GitHub'a SSH Key Ekleyin

1. **GitHub'a giriş yapın**
2. **Settings** → **"SSH and GPG keys"**
3. **"New SSH key"** tıklayın
4. **Title:** "VPS Server" yazın
5. **Key:** Kopyaladığınız public key'i yapıştırın
6. **"Add SSH key"** tıklayın

### ADIM 4: SSH ile Klonlayın

Sunucuda:

```bash
git clone git@github.com:enesxunal/ekartvizit.git .
```

Enter basın.

---

## 🎯 EN KOLAY ÇÖZÜM: Public Yapın

**En kolay çözüm:** Repository'yi public yapmak:

1. GitHub → Repository → Settings → En alta in → "Change visibility" → "Make public"
2. Sunucuda: `git clone https://github.com/enesxunal/ekartvizit.git .`

**Bu şekilde şifre sorun olmaz!**

---

## 📋 ÖZET: Hızlı Çözüm

### Seçenek A: Repository'yi Public Yap
1. GitHub → Repository → Settings → "Make public"
2. Sunucuda: `git clone https://github.com/enesxunal/ekartvizit.git .`

### Seçenek B: Personal Access Token Kullan
1. GitHub → Settings → Developer settings → Personal access tokens → Generate new token
2. Token'ı kopyala
3. Sunucuda: `git clone https://TOKEN@github.com/enesxunal/ekartvizit.git .`

---

**Hangi yöntemi tercih edersiniz?**

1. **Repository'yi public yapmak** (en kolay, şifre gerekmez)
2. **Personal Access Token** (repository private kalır)

---

**Son Güncelleme:** 2024
