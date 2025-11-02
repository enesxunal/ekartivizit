# 🔐 GitHub Token Yetkileri - Ne Seçilmeli?

Personal Access Token oluştururken hangi yetkileri seçmelisiniz?

---

## ✅ DOĞRU SEÇİM: Sadece `repo` Yetkisi

**Token oluştururken sadece `repo` yetkisini seçin:**

### Neden Sadece `repo`?

✅ **`repo` yetkisi yeterli çünkü:**
- Repository'leri klonlama için yeterli
- Kod çekme (pull) için yeterli
- Kod gönderme (push) için yeterli
- GitHub'dan dosya çekmek için yeterli

❌ **Tüm yetkileri seçmenize gerek yok çünkü:**
- Güvenlik riski oluşturur
- Gereksiz yetkiler verir
- Sadece deployment için `repo` yeterli

---

## 📋 ADIM ADIM: Token Oluştururken

### GitHub'da Token Oluşturma:

1. **GitHub** → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**

2. **"Generate new token"** → **"Generate new token (classic)"**

3. **Token ayarları:**

   **Note (Not):**
   ```
   VPS Deployment
   ```

   **Expiration (Süre):**
   - İstediğiniz süreyi seçin (örn: 90 days veya 1 year)

   **Scopes (İzinler):**
   
   ✅ **Sadece `repo` kutusunu işaretleyin!**
   
   **`repo` yetkisi şunları içerir:**
   - ✅ repo:status
   - ✅ repo_deployment
   - ✅ public_repo
   - ✅ repo:invite
   - ✅ security_events

   ❌ **Diğer kutuları işaretlemeyin:**
   - admin:repo_hook (gerekmez)
   - write:packages (gerekmez)
   - delete_repo (gerekmez)
   - vb.

4. **"Generate token"** butonuna tıklayın

5. **Token'ı kopyalayın!**
   - `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` gibi bir şey olacak
   - **ÖNEMLİ:** Hemen kopyalayın, bir daha göremezsiniz!

---

## ✅ DOĞRU KULLANIM: Token ile Klonlama

Sunucuda token ile klonlamak için:

```bash
git clone https://TOKEN@github.com/enesxunal/ekartvizit.git .
```

**`TOKEN` yerine kopyaladığınız token'ı yazın!**

**Örnek:**
```bash
git clone https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/enesxunal/ekartvizit.git .
```

Enter basın.

---

## 🔒 GÜVENLİK İPUÇLARI

✅ **Sadece `repo` yetkisi seçin** - Deployment için yeterli
✅ **Token'ı güvende tutun** - Kimseyle paylaşmayın
✅ **Token'ı süreli yapın** - Örn: 90 days veya 1 year
✅ **Kullanılmıyorsa silin** - Eski token'ları silebilirsiniz

❌ **Tüm yetkileri seçmeyin** - Güvenlik riski
❌ **Token'ı GitHub'a commit etmeyin** - Kod içine yazmayın
❌ **Token'ı herkesle paylaşmayın** - Güvenli tutun

---

## 📋 ÖZET

### Token Oluştururken:

**Seçin:**
- ✅ `repo` yetkisi (kutuyu işaretleyin)

**Seçmeyin:**
- ❌ Diğer yetkiler (gerekmez)

### Sonuç:

Sadece `repo` yetkisi yeterli! Deployment için ihtiyacınız olan tek şey bu.

---

**ÖNEMLİ:** Token'ı kopyaladıktan sonra sunucuda kullanın ve güvende tutun!

---

**Son Güncelleme:** 2024
