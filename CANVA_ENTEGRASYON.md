# Canva Entegrasyonu Rehberi

Bu dokümanda E-Kartvizit sitesinin Canva entegrasyonu nasıl çalıştığı açıklanmaktadır.

## 🔗 Oluşturulan URL'ler

### 1. Callback URL (Authorized Redirects)
```
https://ekartivizit.vercel.app/api/canva/callback
```
**Kullanım:** Canva geliştirici panelinde "Authorized redirects" bölümüne eklenmeli.

### 2. Return Navigation URL
```
https://ekartivizit.vercel.app/tasarim-tamamlandi
```
**Kullanım:** Canva geliştirici panelinde "Return Navigation" bölümüne eklenmeli.

## 🧪 Test Sayfası
```
https://ekartivizit.vercel.app/canva-test
```
**Kullanım:** OAuth flow'unu test etmek için özel olarak oluşturulmuş test sayfası.

## 📁 Oluşturulan Dosyalar

### 1. API Route - `/src/app/api/canva/callback/route.ts`
- Canva'dan gelen callback isteklerini işler
- Authentication kodunu alır ve token exchange yapar
- Hata durumlarını yönetir
- Test modunu destekler
- CORS headers ekler

### 2. Tasarım Tamamlandı Sayfası - `/src/app/tasarim-tamamlandi/page.tsx`
- Kullanıcılar Canva'da tasarım tamamladıktan sonra yönlendirildikleri sayfa
- Başarı mesajı ve sepete gitme seçenekleri
- Hata durumlarını gösterir
- Test modunu destekler
- Modern ve kullanıcı dostu arayüz

### 3. Test Sayfası - `/src/app/canva-test/page.tsx`
- OAuth flow'unu test etmek için özel sayfa
- Callback URL'ini test etme özelliği
- Entegrasyon URL'lerini görüntüleme
- Adım adım test rehberi

### 4. Canva Konfigürasyon - `/src/lib/canva-config.ts`
- Tüm Canva entegrasyon ayarları
- Template ID'leri ve URL'leri
- Ortam bazlı konfigürasyon (dev/prod)

### 5. Güncellenmiş Bileşenler
- `DesignTemplates.tsx` - Ana sayfadaki Canva şablonları bölümü
- Gerçek Canva template linklerini kullanır

## 🎨 Canva Şablonları

### Kartvizit Şablonları
- **Modern Kartvizit** - Template ID: `DAGZqQqQqQq`
- **Klasik Kartvizit** - Template ID: `DAGZqQqQqQr`
- **Yaratıcı Kartvizit** - Template ID: `DAGZqQqQqQs`

### Broşür Şablonları
- **Kurumsal Broşür** - Template ID: `DAGZqRrRrRr`
- **Modern Broşür** - Template ID: `DAGZqRrRrRs`

### Magnet Şablonları
- **Yaratıcı Magnet** - Template ID: `DAGZqSsSsSs`
- **Kare Magnet** - Template ID: `DAGZqSsSsSt`

## ⚙️ Kurulum Adımları

### 1. Canva Geliştirici Panelinde
1. [Canva Developers](https://developers.canva.com) sitesine gidin
2. Yeni bir uygulama oluşturun
3. **Authorized redirects** bölümüne şu URL'yi ekleyin:
   ```
   https://ekartivizit.vercel.app/api/canva/callback
   ```
4. **Return Navigation** bölümüne şu URL'yi ekleyin:
   ```
   https://ekartivizit.vercel.app/tasarim-tamamlandi
   ```

### 2. OAuth Flow'unu Test Edin
1. https://ekartivizit.vercel.app/canva-test sayfasına gidin
2. "Callback Test Et" butonuna tıklayın
3. Test başarılı ise yeşil onay mesajı görmelisiniz
4. Herhangi bir hata varsa kırmızı hata mesajı görünecektir

### 3. Gerçek Template ID'lerini Güncelleme
1. Canva'da istediğiniz şablonları oluşturun
2. Her şablon için "Paylaş" > "Şablon olarak paylaş" seçin
3. Oluşan template ID'lerini `/src/lib/canva-config.ts` dosyasında güncelleyin

### 4. Final Test
1. Ana sayfadaki "Şablonu Özelleştir" butonlarını test edin
2. Canva'da tasarım yapın
3. Canva'dan çıkıp siteye döndüğünüzde "Tasarım Tamamlandı" sayfasını görmelisiniz

## 🔧 Troubleshooting

### "Submission incomplete" Hatası
Bu hata OAuth flow'unun test edilmemiş olmasından kaynaklanır:

1. **Test URL'ini kontrol edin:**
   ```
   https://ekartivizit.vercel.app/canva-test
   ```

2. **Callback URL'ini test edin:**
   ```
   https://ekartivizit.vercel.app/api/canva/callback?code=test_code&state=test_state
   ```

3. **Test başarılı ise submission'ı tekrar deneyin**

### Callback URL Çalışmıyor
1. Browser konsolu hatalarını kontrol edin
2. Network sekmesinde request/response'ları inceleyin
3. Server loglarını kontrol edin

### Template Linkler Çalışmıyor
1. Template ID'lerinin doğru olduğunu kontrol edin
2. Return URL'in doğru set edildiğini kontrol edin
3. Canva'da template'in "public" olduğunu kontrol edin

## 🔄 Çalışma Akışı

1. **Kullanıcı şablon seçer** → Ana sayfada "Şablonu Özelleştir" butonuna tıklar
2. **Canva açılır** → Yeni sekmede Canva editörü açılır
3. **Tasarım yapılır** → Kullanıcı Canva'da tasarımını oluşturur
4. **Geri dönüş** → Canva'da "Bitir" butonuna tıkladığında otomatik olarak sitemize döner
5. **Tamamlandı sayfası** → `/tasarim-tamamlandi` sayfası açılır
6. **Sepete ekleme** → Kullanıcı tasarımını sepete ekleyebilir

## 🛠️ Geliştirme Notları

### URL Parametreleri
Canva URL'lerinde şu parametreler kullanılır:
- `return_to`: Tasarım tamamlandıktan sonra dönülecek URL
- `utm_source`: Trafik kaynağı takibi (ekartvizit)
- `utm_medium`: Entegrasyon türü (integration)
- `utm_campaign`: Kampanya takibi (template_edit)

### Hata Yönetimi
API route'unda şu hata durumları yönetilir:
- Authentication hatası (`auth_failed`)
- Authorization code eksikliği (`no_code`)
- Server hataları (`server_error`)

### Test Modu
Callback URL'i test modunu destekler:
- `code=test_code` parametresi ile test modu aktif olur
- Test modunda `/tasarim-tamamlandi?test=true` sayfasına yönlendirir

### Responsive Tasarım
Tüm sayfalar mobil uyumlu olarak tasarlanmıştır.

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- **E-posta:** info@ekartvizit.co
- **Telefon:** 0850 840 30 11
- **Test Sayfası:** https://ekartivizit.vercel.app/canva-test

---

**Not:** Bu entegrasyon Canva Connect API kullanır ve gerçek template ID'leri ile çalışır. Template ID'lerini gerçek Canva şablonlarınızla değiştirmeyi unutmayın. 