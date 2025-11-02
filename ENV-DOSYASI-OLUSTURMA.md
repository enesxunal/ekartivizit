# 📝 .env Dosyası Oluşturma

`nano` kurulu değil. Alternatif yöntemler:

---

## ✅ ÇÖZÜM 1: echo ile Dosya Oluşturma (En Kolay)

Tek komutla `.env` dosyası oluşturun:

```bash
cat > .env << 'EOF'
NEXT_PUBLIC_SITE_URL=https://ekartvizit.co
NODE_ENV=production
TOSLA_API_USER=apiUser3016658
TOSLA_API_PASS=YN8L293GPY
TOSLA_CLIENT_ID=1000002147
TOSLA_BASE_URL=https://api.tosla.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=905xxxxxxxxx
EOF
```

**Enter** basın.

✅ **Başarılı:** `.env` dosyası oluşturulacak.

---

## ✅ ÇÖZÜM 2: vi/vim Kullanma

Eğer `vi` veya `vim` kuruluysa:

```bash
vi .env
```

**Enter** basın.

### vi/vim Kullanımı:

1. **"i"** tuşuna basın (insert modu)
2. **Şunları yazın:**

```env
NEXT_PUBLIC_SITE_URL=https://ekartvizit.co
NODE_ENV=production
TOSLA_API_USER=apiUser3016658
TOSLA_API_PASS=YN8L293GPY
TOSLA_CLIENT_ID=1000002147
TOSLA_BASE_URL=https://api.tosla.com
```

3. **Esc** basın (insert modundan çık)
4. **":wq"** yazın ve **Enter** basın (kaydet ve çık)

---

## ✅ ÇÖZÜM 3: nano Kurma

Eğer nano kullanmak isterseniz:

```bash
apt update
apt install -y nano
```

**Enter** basın, bekleyin (1-2 dakika).

Sonra:

```bash
nano .env
```

**Enter** basın.

---

## ✅ ÇÖZÜM 4: echo ile Satır Satır (En Basit)

Tek tek her satırı yazın:

```bash
echo "NEXT_PUBLIC_SITE_URL=https://ekartvizit.co" > .env
echo "NODE_ENV=production" >> .env
echo "TOSLA_API_USER=apiUser3016658" >> .env
echo "TOSLA_API_PASS=YN8L293GPY" >> .env
echo "TOSLA_CLIENT_ID=1000002147" >> .env
echo "TOSLA_BASE_URL=https://api.tosla.com" >> .env
```

**Her komuttan sonra Enter basın.**

---

## 🎯 ÖNERİLEN: ÇÖZÜM 1 (cat komutu)

**En kolay yöntem:**

```bash
cat > .env << 'EOF'
NEXT_PUBLIC_SITE_URL=https://ekartvizit.co
NODE_ENV=production
TOSLA_API_USER=apiUser3016658
TOSLA_API_PASS=YN8L293GPY
TOSLA_CLIENT_ID=1000002147
TOSLA_BASE_URL=https://api.tosla.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=905xxxxxxxxx
EOF
```

**Enter** basın.

✅ **Başarılı:** `.env` dosyası oluşturulacak!

**Kontrol etmek için:**
```bash
cat .env
```

**Enter** basın. Dosyanın içeriğini göreceksiniz.

---

**Son Güncelleme:** 2024
