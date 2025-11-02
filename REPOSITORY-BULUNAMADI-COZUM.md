# ❌ Repository Bulunamadı - Çözüm

"Repository not found" hatası alıyorsunuz. İşte çözümler:

---

## 🔍 SORUN 1: Repository Adı Yanlış Olabilir

Repository adı `ekartvizit` değil, başka bir şey olabilir.

### Çözüm: GitHub'dan Kontrol Edin

1. **GitHub'a giriş yapın**: https://github.com/enesxunal
2. **Repository'lerinizi** kontrol edin
3. **Doğru repository adını** bulun

**Örnek repository adları:**
- `ekartvizit`
- `e-kartvizit`
- `ekartvizit-web`
- `ekartvizit-nextjs`
- vb.

---

## 🔍 SORUN 2: Repository Private Olabilir

Repository private ise, token'ın yeterli yetkileri olmayabilir.

### Çözüm: Token Yetkilerini Kontrol Edin

1. **GitHub** → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Token'ınızı** bulun (`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`)
3. **Yetkileri** kontrol edin:
   - ✅ `repo` yetkisi seçili olmalı
   - ✅ **Tüm repo yetkileri** seçili olmalı (repo:status, repo_deployment, public_repo, repo:invite, vb.)

### Token Yetkilerini Güncellemek:

1. **Eski token'ı silin** (ihtiyaç duymazsanız)
2. **Yeni token oluşturun**
3. **Scopes'da:**
   - ✅ `repo` (tüm kutuyu işaretleyin - alt yetkiler otomatik seçilir)
   - ✅ `repo:status`
   - ✅ `repo_deployment`
   - ✅ `public_repo`
   - ✅ `repo:invite`
   - ✅ `security_events`

4. **"Generate token"** tıklayın
5. **Yeni token'ı kopyalayın**

---

## 🔍 SORUN 3: Repository Yok Olabilir

Repository silinmiş veya adı değiştirilmiş olabilir.

### Çözüm: Repository'yi Kontrol Edin

1. **GitHub'a giriş yapın**
2. **Repository'lerinizi** kontrol edin
3. **Repository var mı** kontrol edin

---

## ✅ ÇÖZÜM: Doğru Repository Adını Kullanın

GitHub'dan **doğru repository adını** öğrendikten sonra:

### ADIM 1: Repository adını kontrol edin

GitHub → enesxunal → Repository'ler → **Doğru adı** bulun

### ADIM 2: Sunucuda doğru adla klonlayın

Sunucuda şu komutu yazın:

```bash
git clone https://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@github.com/enesxunal/DOGRU_REPOSITORY_ADI.git .
```

**ÖNEMLİ:** `DOGRU_REPOSITORY_ADI` yerine GitHub'dan bulduğunuz gerçek repository adını yazın!

**Örnek:**
```bash
git clone https://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@github.com/enesxunal/e-kartvizit.git .
```

---

## 📋 ÖZET: Ne Yapmalı?

1. **GitHub'a giriş yapın**
2. **Repository adını** kontrol edin
3. **Doğru adı** bulun
4. **Sunucuda doğru adla klonlayın**

---

## 🆘 HALA ÇALIŞMIYORSA

### Seçenek 1: Yeni Token Oluşturun

1. **GitHub** → **Settings** → **Developer settings** → **Personal access tokens**
2. **Yeni token oluşturun** (tüm repo yetkileri ile)
3. **Yeni token'ı kullanın**

### Seçenek 2: Repository'yi Public Yapın

1. **GitHub** → **Repository** → **Settings** → **Danger Zone** → **Change visibility** → **Make public**
2. **Public yaptıktan sonra** token olmadan klonlayın:

```bash
git clone https://github.com/enesxunal/DOGRU_REPOSITORY_ADI.git .
```

---

**ÖNEMLİ:** GitHub'dan **doğru repository adını** kontrol edin ve ona göre klonlayın!

---

**Son Güncelleme:** 2024
