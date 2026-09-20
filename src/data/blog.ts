export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  tags: string[]
  readTime: number
  relatedProducts?: string[]
}

export interface BlogCategory {
  id: string
  name: string
  description: string
  count: number
}

const BASE_CATEGORIES = [
  { id: 'satin-alma-rehberi', name: 'Satın Alma Rehberi', description: 'Ürün, adet ve malzeme seçimi için pratik rehberler' },
  { id: 'baski-teknikleri', name: 'Baskı Teknikleri', description: 'Kağıt, gramaj, renk ve üretim bilgileri' },
  { id: 'tasarim-dosya', name: 'Tasarım & Dosya', description: 'Baskıya uygun dosya hazırlama ve tasarım ipuçları' },
  { id: 'kurumsal-baski', name: 'Kurumsal Baskı', description: 'İşletmeler için basılı kurumsal iletişim ürünleri' },
]

const AUTHOR = 'E-Kartvizit Editör'

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'kartvizit-olcusu-ve-baski-rehberi',
    title: 'Kartvizit Ölçüsü ve Baskı Rehberi: 85×52 mm Kartvizit Nasıl Hazırlanır?',
    excerpt: 'Standart kartvizit ölçüsü, güvenli alan, baskı dosyası ve 250/350/700 gram seçenekleri hakkında sipariş öncesi bilmeniz gerekenler.',
    content: `# Kartvizit Ölçüsü ve Baskı Rehberi

Kartvizit, küçük bir yüzeyde marka, isim, görev ve iletişim bilgilerini taşıdığı için ölçü ve yerleşim kararları baskı kalitesini doğrudan etkiler. E-Kartvizit'te standart kartvizit ölçüsü 85×52 mm'dir.

## Standart kartvizit ölçüsü nedir?

Sipariş sistemimizde kartvizitler 85×52 mm ölçüde hazırlanır. Tasarım dosyanızı bu ölçüye göre oluşturmanız, metin ve logoları kesim hattına çok yaklaştırmamanız gerekir.

## Tasarımda hangi bilgiler yer almalı?

- Ad soyad ve unvan
- Marka veya şirket adı
- Telefon ve e-posta
- Web sitesi veya sosyal medya hesabı
- Gerekiyorsa QR kod

Küçük yüzey nedeniyle her bilgiyi eklemek yerine okunabilirliği korumak daha doğru sonuç verir.

## 250, 350 ve 700 gram kartvizit seçenekleri

250 gram seçenek ekonomik ve yüksek adetli dağıtım için uygundur. 350 gram kartvizit daha tok bir yapı sunar ve çift yön renkli baskı için güçlü bir standarttır. 700 gram sıvama kartvizit ise daha kalın ve premium bir fiziksel his verir.

## Baskı dosyası nasıl hazırlanmalı?

Dosyanızı mümkünse PDF olarak, CMYK renk uzayında ve yüksek çözünürlükte hazırlayın. Arka plan görsellerini kesim hattının dışına taşırın; metin, telefon ve logo gibi önemli öğeleri kenardan güvenli mesafede tutun.

## Kartvizit siparişi verirken neye bakmalısınız?

Sadece toplam fiyata değil; gramaj, baskı yönü, adet ve ek uygulamalara birlikte bakın. E-Kartvizit ürün sayfasında seçim yaptıkça toplam fiyat güncellenir ve KDV ile kargo dahil tutar gösterilir.

Kartvizit seçeneklerini ve güncel fiyatları görmek için ürün sayfasındaki konfiguratorü kullanabilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-20',
    category: 'satin-alma-rehberi',
    image: '/images/Kartvizit.png',
    tags: ['kartvizit ölçüsü', 'kartvizit baskı', '85x52 kartvizit', 'kartvizit fiyatları'],
    readTime: 6,
    relatedProducts: ['kartvizit']
  },
  {
    id: 'kartvizit-250-350-700-gram-farki',
    title: '250 gr, 350 gr ve 700 gr Kartvizit Arasındaki Fark Nedir?',
    excerpt: 'Kartvizit gramajı seçerken kalınlık, kullanım amacı ve marka algısı açısından 250 gr, 350 gr ve 700 gr seçeneklerini karşılaştırın.',
    content: `# 250 gr, 350 gr ve 700 gr Kartvizit Farkı

Kartvizit seçerken en önemli kararlardan biri kağıt gramajıdır. Gramaj yükseldikçe kartvizitin eldeki hissi, dayanıklılığı ve sunum biçimi değişir.

## 250 gram kartvizit

Ekonomik kartvizit arayan, yüksek adet dağıtım yapan veya temel iletişim bilgilerini sade biçimde sunmak isteyen işletmeler için uygundur. Hafif yapı, dağıtımı kolaylaştırır.

## 350 gram kartvizit

Kurumsal kullanımda en dengeli seçeneklerden biridir. 250 grama göre daha tok ve dayanıklıdır. Çift yön renkli tasarımlar, satış ekipleri ve müşteri görüşmeleri için güçlü bir standart oluşturur.

## 700 gram sıvama kartvizit

İki katmanlı, daha kalın ve premium hissiyatlıdır. Danışmanlık, mimarlık, otomotiv, güzellik ve üst segment hizmet markaları gibi kartvizitin fiziksel etkisini önemseyen işletmeler için tercih edilebilir.

## Hangi gramajı seçmeliyim?

Bütçe ve dağıtım adedi önceliğinizse 250 gram; fiyat/performans ve kurumsal görünüm istiyorsanız 350 gram; kalınlık ve premium his önceliğinizse 700 gram sıvama kartvizit daha uygun olur.

Güncel 1.000 ve 2.000 adet fiyatlarını kartvizit ürün sayfasında gramaj seçerek karşılaştırabilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-20',
    category: 'baski-teknikleri',
    image: '/images/Kartvizit (1).png',
    tags: ['250 gr kartvizit', '350 gr kartvizit', '700 gr kartvizit', 'sıvama kartvizit'],
    readTime: 5,
    relatedProducts: ['kartvizit']
  },
  {
    id: '1000-adet-kartvizit-fiyati',
    title: '1000 Adet Kartvizit Fiyatı Nasıl Hesaplanır?',
    excerpt: '1.000 adet kartvizit fiyatını gramaj, baskı yönü ve ek uygulamalar nasıl etkiler? Güncel fiyatı doğru karşılaştırmak için kısa rehber.',
    content: `# 1000 Adet Kartvizit Fiyatı Nasıl Hesaplanır?

"1000 adet kartvizit ne kadar?" sorusunun tek bir cevabı yoktur; çünkü fiyat seçilen malzeme ve uygulamaya göre değişir.

## Fiyatı belirleyen ana unsurlar

- Kartvizit gramajı
- Tek veya çift yön baskı
- Sıvama gibi üretim biçimleri
- Delik veya özel kesim gibi uygulamalar
- Logo tasarımı gibi ek hizmetler

## En ekonomik seçenek nasıl seçilir?

Sadece en düşük fiyatı seçmek yerine kullanım amacını düşünün. Çok sayıda kişiye dağıtılan kartvizitte ekonomik seçenek mantıklı olabilir. Daha az sayıda ama önemli görüşmede kullanılan kartvizitte daha tok bir malzeme marka algısına katkı sağlar.

## 1000 adet mi 2000 adet mi?

Kartvizitleri düzenli kullanıyorsanız 2.000 adet seçeneğini de toplam ve birim fiyat açısından karşılaştırın. Ürün konfiguratoründe her adet seçeneği için toplam fiyat ayrı gösterilir.

E-Kartvizit'te kartvizit fiyatlarına KDV ve kargo dahildir. Güncel tutarı kartvizit ürün sayfasından seçiminize göre görebilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-19',
    category: 'satin-alma-rehberi',
    image: '/images/Kartvizit-Ekonomik.png',
    tags: ['1000 adet kartvizit fiyatı', 'kartvizit fiyatı', 'kartvizit basımı'],
    readTime: 5,
    relatedProducts: ['kartvizit']
  },
  {
    id: 'a4-a5-brosur-farki',
    title: 'A4 ve A5 Broşür Arasındaki Fark: Hangi Ölçüyü Seçmelisiniz?',
    excerpt: 'A4 ve A5 broşür ölçülerini içerik alanı, dağıtım kolaylığı ve kullanım senaryolarına göre karşılaştırın.',
    content: `# A4 ve A5 Broşür Arasındaki Fark

Broşür siparişinde ölçü seçimi hem tasarımı hem de kullanım şeklini etkiler. A4 ve A5, en yaygın iki broşür formatıdır.

## A5 broşür ne zaman tercih edilir?

A5 daha kompakt bir formattır. Elde dağıtım, paket içine ekleme, kampanya duyurusu, tek hizmet veya kısa fiyat listeleri için uygundur. Daha az yer kapladığı için saha dağıtımında pratiktir.

## A4 broşür ne zaman tercih edilir?

A4 daha geniş bir içerik alanı sunar. Çok sayıda ürün, hizmet açıklaması, menü, tablo veya büyük görsel kullanılması gereken işlerde tasarıma daha fazla alan bırakır.

## Fiyat farkı neden oluşur?

A4 daha büyük kağıt alanı kullandığı için aynı gramaj ve adette A5'e göre maliyeti daha yüksektir. Kağıt gramajı ve sipariş adedi de fiyatı etkiler.

## Hangi ölçü daha iyi?

Tek bir "en iyi" ölçü yoktur. Hızlı dağıtım ve sade mesaj için A5; içerik yoğunluğu ve daha geniş sunum için A4 daha uygundur.

E-Kartvizit broşür sayfasında A4/A5 ile 115/130 gram seçeneklerini birlikte karşılaştırabilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-19',
    category: 'satin-alma-rehberi',
    image: '/images/Broşür.png',
    tags: ['A4 broşür', 'A5 broşür', 'broşür ölçüleri', 'broşür baskı'],
    readTime: 5,
    relatedProducts: ['brosur']
  },
  {
    id: 'brosur-kagit-gramaji-115-130',
    title: '115 gr ve 130 gr Broşür Kağıdı Arasındaki Fark',
    excerpt: 'Broşür baskısında 115 gram ve 130 gram kağıt seçeneklerini maliyet, kullanım ve fiziksel his açısından karşılaştırın.',
    content: `# 115 gr ve 130 gr Broşür Kağıdı Farkı

Broşürün kağıt gramajı, eldeki hissini ve toplam maliyetini etkiler. E-Kartvizit'te A4 ve A5 broşür için 115 gram ve 130 gram seçenekleri bulunur.

## 115 gram broşür

Daha hafif ve ekonomik bir seçenektir. Yüksek adetli kampanya dağıtımları, kısa süreli promosyonlar ve saha faaliyetleri için uygundur.

## 130 gram broşür

Biraz daha tok bir his verir. Görsel ağırlıklı içerikler, menü benzeri kullanım veya daha kaliteli fiziksel sunum istenen işler için tercih edilebilir.

## Katlama yapılacaksa gramaj önemli mi?

Katlama planlanan broşürlerde kağıt kalınlığı ve kırım çizgileri birlikte değerlendirilmelidir. Sipariş sırasında kırım hizmeti seçilerek üretim talebi oluşturulabilir.

## Hangi gramajı seçmeliyim?

Adet ve bütçe önceliğiniz yüksekse 115 gram; dokunma hissi ve sunum biraz daha önemliyse 130 gram tercih edilebilir.`,
    author: AUTHOR,
    date: '2026-09-18',
    category: 'baski-teknikleri',
    image: '/images/Broşür.png',
    tags: ['115 gr broşür', '130 gr broşür', 'broşür kağıdı', 'broşür gramajı'],
    readTime: 4,
    relatedProducts: ['brosur']
  },
  {
    id: '1000-adet-brosur-fiyati',
    title: '1000 Adet Broşür Fiyatı: A4, A5 ve Gramaj Seçimi',
    excerpt: '1.000 adet broşür fiyatını A4/A5 ölçü ve 115/130 gram kağıt seçimi nasıl değiştirir?',
    content: `# 1000 Adet Broşür Fiyatı

Broşür fiyatı ölçü ve kağıt gramajına göre değişir. Bu nedenle yalnızca adet bilgisini karşılaştırmak yeterli değildir.

## A5 broşür fiyatı neden daha düşük olabilir?

A5 daha küçük bir baskı alanı kullandığı için aynı gramaj ve adette A4'e göre genellikle daha ekonomik olur.

## Gramaj fiyatı nasıl etkiler?

130 gram kağıt, 115 grama göre daha tok bir malzemedir. Bu fark üretim maliyetine yansır.

## 1000 mi 2000 adet mi?

Sık dağıtım yapıyorsanız 2.000 adet seçeneğini de değerlendirin. Toplam tutar artarken adet başına maliyet daha avantajlı hale gelebilir.

E-Kartvizit broşür konfiguratoründe ölçü, gramaj ve adet seçerek güncel toplam fiyatı KDV ve kargo dahil görebilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-18',
    category: 'satin-alma-rehberi',
    image: '/images/Broşür.png',
    tags: ['1000 adet broşür fiyatı', 'A5 broşür fiyatı', 'A4 broşür fiyatı'],
    readTime: 4,
    relatedProducts: ['brosur']
  },
  {
    id: 'sticker-etiket-baski-rehberi',
    title: 'Sticker ve Etiket Baskı Rehberi: Ölçü, Kesim ve Kullanım Alanları',
    excerpt: '53×83 mm, A5 ve A4 etiket seçenekleri ile standart ve özel kesim sticker arasındaki farkları öğrenin.',
    content: `# Sticker ve Etiket Baskı Rehberi

Sticker ve etiketler ürün ambalajından kargoya, mağaza içi iletişimden kampanyaya kadar çok farklı alanlarda kullanılabilir.

## 53×83 mm etiket

Kompakt ölçü; küçük paketler, promosyon ürünleri ve marka etiketi uygulamaları için uygundur. Standart köşeli veya özel kesim seçilebilir.

## A5 ve A4 etiket

Daha geniş yüzey gerektiren koli, vitrin, cam veya büyük ambalaj uygulamalarında kullanılabilir.

## Özel kesim ne zaman tercih edilir?

Logo veya tasarımın dış hattını öne çıkarmak istiyorsanız özel kesim daha karakteristik bir görünüm sağlar. Standart dikdörtgen form yeterliyse köşeli etiket daha ekonomik bir çözümdür.

## Baskı dosyasında nelere dikkat edilmeli?

Küçük metinleri çok ince kullanmayın. Önemli içeriği kesim hattından içeride tutun ve görselleri yüksek çözünürlükte hazırlayın.

Güncel sticker ve etiket fiyatlarını ürün sayfasında ölçü ve kesim tipine göre görebilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-17',
    category: 'satin-alma-rehberi',
    image: '/images/Etiket.png',
    tags: ['sticker baskı', 'etiket baskı', 'özel kesim sticker', 'sticker fiyatları'],
    readTime: 5,
    relatedProducts: ['etiket']
  },
  {
    id: 'ozel-kesim-sticker-nedir',
    title: 'Özel Kesim Sticker Nedir? Standart Etiketten Farkı',
    excerpt: 'Özel kesim sticker ile standart köşeli etiketi üretim, tasarım ve kullanım açısından karşılaştırın.',
    content: `# Özel Kesim Sticker Nedir?

Özel kesim sticker, tasarımın veya logonun belirlenen dış formuna göre kesilen etiket türüdür. Standart etiket ise dikdörtgen veya sabit bir formda hazırlanır.

## Özel kesimin avantajı nedir?

Marka logosunun veya illüstrasyonun şeklini takip eden kesim, etiketi daha dikkat çekici hale getirebilir. Özellikle paketleme ve promosyon uygulamalarında görsel karakteri güçlendirir.

## Her tasarım özel kesime uygun mu?

Çok ince çıkıntılar, aşırı küçük detaylar veya kesim hattına çok yakın metinler üretim açısından uygun olmayabilir. Tasarım formunun temiz ve uygulanabilir olması önemlidir.

## Standart etiket ne zaman daha mantıklı?

Fiyat, hız ve sade uygulama önceliğiniz varsa standart köşeli etiket yeterlidir. Büyük adetlerde maliyet kontrolü için de avantajlı olabilir.

E-Kartvizit'te 53×83 mm ölçüde standart ve özel kesim seçeneklerini karşılaştırabilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-17',
    category: 'baski-teknikleri',
    image: '/images/Etiket.png',
    tags: ['özel kesim sticker', 'özel kesim etiket', 'sticker kesim'],
    readTime: 4,
    relatedProducts: ['etiket']
  },
  {
    id: 'magnet-baski-olculeri-kullanim-alanlari',
    title: 'Magnet Baskı: 46×68 mm Ölçü ve Kullanım Alanları',
    excerpt: 'Standart 46×68 mm magnet baskının işletmeler için kullanım alanlarını ve tasarımda dikkat edilmesi gerekenleri inceleyin.',
    content: `# Magnet Baskı: Ölçü ve Kullanım Alanları

Magnet, iletişim bilgilerinin metal yüzeylerde uzun süre görünür kalmasını sağlayan pratik bir tanıtım ürünüdür.

## Standart magnet ölçüsü

E-Kartvizit'te magnet 46×68 mm standart ölçüde ve 1.000 adet olarak sunulur. Özel ölçü seçeneği bulunmaz.

## Hangi işletmeler magnet kullanabilir?

- Restoran ve paket servis işletmeleri
- Teknik servis ve tamir hizmetleri
- Emlak ve danışmanlık
- Sağlık ve güzellik işletmeleri
- Eğitim ve kurs merkezleri
- Yerel hizmet sağlayıcıları

## Magnet üzerinde ne olmalı?

Logo, telefon ve ana hizmet bilgisi öncelikli olmalıdır. Küçük ölçüde uzun açıklamalar yerine net iletişim bilgileri daha işlevseldir.

## Tasarım önerisi

Telefon numarasını yüksek kontrastla gösterin. Marka adını ve ana hizmeti ilk bakışta okunur tutun. Kesim kenarına çok yakın bilgi yerleştirmeyin.

Güncel magnet fiyatı ürün sayfasında KDV ve kargo dahil olarak gösterilir.`,
    author: AUTHOR,
    date: '2026-09-16',
    category: 'satin-alma-rehberi',
    image: '/images/Magnet.png',
    tags: ['magnet baskı', 'magnet ölçüsü', '1000 adet magnet'],
    readTime: 4,
    relatedProducts: ['magnet']
  },
  {
    id: 'baski-dosyasi-pdf-cmyk-tasma-payi',
    title: 'Baskı Dosyası Nasıl Hazırlanır? PDF, CMYK ve Taşma Payı Rehberi',
    excerpt: 'Matbaaya gönderilecek dosyada PDF formatı, CMYK renk modu, çözünürlük ve taşma payı için temel kontrol listesi.',
    content: `# Baskı Dosyası Nasıl Hazırlanır?

Doğru hazırlanmış baskı dosyası üretim sürecini hızlandırır ve ekranda gördüğünüz tasarıma daha yakın sonuç almanıza yardımcı olur.

## PDF neden tercih edilir?

PDF, fontların, görsellerin ve sayfa ölçüsünün daha kontrollü taşınmasını sağlar. Baskıya gönderirken son tasarımı PDF olarak dışa aktarmak iyi bir standarttır.

## CMYK renk modu

Ekranlar RGB ışık sistemiyle çalışır; baskıda ise CMYK mürekkep renkleri kullanılır. Tasarımı baskı amacıyla hazırlarken CMYK çalışmak renk sürprizlerini azaltır.

## Çözünürlük

Baskıda kullanılan görseller düşük çözünürlüklüyse pikselleşme görülebilir. Kaynak görselleri mümkün olduğunca yüksek çözünürlükte kullanın.

## Taşma payı nedir?

Arka plan veya görsel sayfa kenarına kadar devam ediyorsa kesim toleransı için tasarımı bitiş ölçüsünün biraz dışına taşırmak gerekir. Bu alana taşma payı veya bleed denir.

## Güvenli alan

Logo, telefon, fiyat veya önemli metinleri kesim çizgisine çok yakın yerleştirmeyin. Kenardan içeride güvenli bir alan bırakın.

Siparişinizde hazır PDF dosyanızı tasarım yükleme adımıyla ürününüze bağlayabilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-16',
    category: 'tasarim-dosya',
    image: '/images/Kartvizit.png',
    tags: ['baskı dosyası', 'PDF baskı', 'CMYK', 'taşma payı'],
    readTime: 6
  },
  {
    id: 'cmyk-rgb-farki-baski',
    title: 'CMYK ve RGB Arasındaki Fark Nedir? Baskıda Neden Önemli?',
    excerpt: 'RGB ekran renkleri ile CMYK baskı renklerinin farkını ve dosya hazırlarken neden CMYK tercih edildiğini öğrenin.',
    content: `# CMYK ve RGB Arasındaki Fark

RGB ve CMYK iki farklı renk üretim sistemidir. Tasarımın nerede kullanılacağı doğru renk modunu belirler.

## RGB nedir?

RGB; kırmızı, yeşil ve mavi ışığın birleşimiyle ekranlarda renk üretir. Telefon, monitör ve televizyon gibi ışık yayan cihazlarda kullanılır.

## CMYK nedir?

CMYK; camgöbeği, macenta, sarı ve siyah mürekkeplerin birleşimiyle baskıda renk üretir.

## Neden ekrandaki renk birebir çıkmayabilir?

Ekran ışık yaydığı için bazı parlak ve doygun renkler baskıda aynı şekilde üretilemez. Bu nedenle RGB hazırlanmış bir dosya CMYK'ya dönüştürüldüğünde ton farkları görülebilir.

## Ne yapmalısınız?

Baskı için hazırlanan çalışmalarda tasarımın başından itibaren CMYK kullanmak daha öngörülebilir sonuç verir. Özellikle marka renklerinde baskı öncesi kontrol önemlidir.`,
    author: AUTHOR,
    date: '2026-09-15',
    category: 'tasarim-dosya',
    image: '/images/Broşür.png',
    tags: ['CMYK', 'RGB', 'baskı renkleri', 'renk modu'],
    readTime: 4
  },
  {
    id: 'tasma-payi-bleed-nedir',
    title: 'Taşma Payı (Bleed) Nedir? Baskı Tasarımında Nasıl Kullanılır?',
    excerpt: 'Kesim sonrası beyaz kenar oluşmasını önlemek için taşma payının ne olduğunu ve dosyada nasıl planlanacağını öğrenin.',
    content: `# Taşma Payı (Bleed) Nedir?

Taşma payı, baskı tasarımında arka plan veya görselin bitmiş ürün ölçüsünün dışına devam ettirilmesidir.

## Neden gereklidir?

Kesim makinelerinde çok küçük toleranslar olabilir. Arka plan tam kesim çizgisinde biterse bu tolerans beyaz bir kenar oluşturabilir. Görselin dışarı taşırılması bu riski azaltır.

## Hangi öğeler taşmalı?

Arka plan rengi, fotoğraf ve kenara kadar gelen desenler taşma alanına devam etmelidir. Metin ve logo gibi önemli öğeler ise tam tersine kesim çizgisinden içeride tutulmalıdır.

## Güvenli alan ile taşma payı aynı şey mi?

Hayır. Taşma payı dışarı doğru eklenen alandır; güvenli alan ise önemli içeriğin kesimden korunması için içeride bırakılan mesafedir.

Kartvizit, broşür, etiket ve benzeri kesimli ürünlerde bu iki kavram birlikte düşünülmelidir.`,
    author: AUTHOR,
    date: '2026-09-15',
    category: 'tasarim-dosya',
    image: '/images/Etiket.png',
    tags: ['taşma payı', 'bleed', 'baskı tasarımı', 'kesim payı'],
    readTime: 4
  },
  {
    id: 'antetli-kagit-baski-rehberi',
    title: 'Antetli Kağıt Baskı Rehberi: Ölçü, Kullanım ve Tasarım',
    excerpt: 'Kurumsal yazışmalar için antetli kağıtta logo, iletişim bilgisi, boşluk ve baskı dosyası hazırlama önerileri.',
    content: `# Antetli Kağıt Baskı Rehberi

Antetli kağıt; teklif, yazışma, resmi belge ve kurumsal sunumlarda markanın kimliğini fiziksel evraka taşır.

## Antetli kağıtta hangi bilgiler bulunur?

Genellikle logo, şirket adı, web sitesi, telefon, e-posta ve gerekliyse adres bilgisi kullanılır. Ana metin alanını daraltmayacak sade bir yerleşim önemlidir.

## Tasarım nasıl olmalı?

Üst veya alt bölümde kurumsal kimliği taşıyan öğeler kullanılabilir. Çok büyük logo ve yoğun arka planlar günlük yazışmalarda okunabilirliği azaltabilir.

## Dosya hazırlığı

Logo vektörel veya yüksek çözünürlüklü olmalı; kurumsal renkler CMYK değerleriyle hazırlanmalıdır. Metin yazılacak ana alanın yeterince boş bırakılması gerekir.

Antetli kağıt ürün sayfasından güncel adet ve fiyat seçeneklerini inceleyebilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-14',
    category: 'kurumsal-baski',
    image: '/images/Antetli.png',
    tags: ['antetli kağıt', 'antetli kağıt baskı', 'kurumsal evrak'],
    readTime: 4,
    relatedProducts: ['antetli-kagit']
  },
  {
    id: 'zarf-baski-rehberi',
    title: 'Baskılı Zarf Rehberi: Diplomat, Torba A5 ve Torba A4',
    excerpt: 'Diplomat ve torba zarf ölçülerini kullanım alanlarına göre karşılaştırın; kurumsal zarf tasarımında nelere dikkat edilmesi gerektiğini öğrenin.',
    content: `# Baskılı Zarf Rehberi

Kurumsal zarflar teklif, sözleşme, fatura, davet ve fiziksel evrak gönderiminde markanın ilk görünen yüzlerinden biridir.

## Diplomat zarf

Uzun ve yatay formuyla standart kurumsal yazışmalarda sık kullanılır. Katlanmış A4 belgelerin gönderimi için uygundur.

## Torba A5 ve Torba A4

Belgeleri daha az katlayarak veya düz biçimde taşımak istediğinizde torba zarf seçenekleri daha kullanışlıdır. A4 torba zarf daha büyük evrak ve dokümanlar için alan sağlar.

## Tasarımda neler olmalı?

Logo ve iletişim bilgilerini sade tutun. Alıcı adresinin yazılacağı alanı boş bırakın. Kurumsal renkleri çok geniş zeminler yerine kontrollü alanlarda kullanmak çoğu iş için daha pratiktir.

Zarf ürün sayfasında ölçü ve adet seçerek güncel fiyatı görebilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-14',
    category: 'kurumsal-baski',
    image: '/images/Zarf.png',
    tags: ['zarf baskı', 'diplomat zarf', 'torba zarf', 'kurumsal zarf'],
    readTime: 5,
    relatedProducts: ['zarf']
  },
  {
    id: 'cepli-dosya-baski-rehberi',
    title: 'Cepli Dosya Baskı Rehberi: Teklif ve Sunum Dosyaları İçin Seçim',
    excerpt: 'Cepli dosya kullanım alanları, kağıt seçenekleri ve kurumsal sunumlarda tasarım kararları için pratik rehber.',
    content: `# Cepli Dosya Baskı Rehberi

Cepli dosya; teklif, katalog, sözleşme ve sunum belgelerini tek bir kurumsal kapak altında toplamak için kullanılır.

## Hangi işletmeler için uygundur?

Satış ekipleri, emlak, otomotiv, eğitim, sağlık, danışmanlık, üretim ve B2B hizmet şirketleri yüz yüze sunumlarda cepli dosyadan yararlanabilir.

## Kağıt ve yüzey seçimi

Daha kalın karton, dosyanın formunu korumasına yardımcı olur. Mat selefon ve kabartma lak gibi uygulamalar belirli seçeneklerde kurumsal görünümü güçlendirebilir.

## Tasarımda hangi alanlara dikkat edilmeli?

Ön kapakta marka ve ana mesajı sade tutun. İç cep, iletişim veya kısa hizmet özeti için kullanılabilir. Katlama ve kesim çizgileri tasarım şablonuna uygun hazırlanmalıdır.

Güncel cepli dosya adet ve fiyat seçeneklerini ürün sayfasından karşılaştırabilirsiniz.`,
    author: AUTHOR,
    date: '2026-09-13',
    category: 'kurumsal-baski',
    image: '/images/Cepli Dosya.png',
    tags: ['cepli dosya', 'sunum dosyası', 'kurumsal dosya baskı'],
    readTime: 5,
    relatedProducts: ['cepli-dosya']
  }
]

export function getBlogPosts(): BlogPost[] {
  return BLOG_POSTS
}

export function getBlogPost(id: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === category)
}

export function getBlogCategories(): BlogCategory[] {
  return BASE_CATEGORIES.map((category) => ({
    ...category,
    count: BLOG_POSTS.filter((post) => post.category === category.id).length,
  }))
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  return BLOG_POSTS.filter((post) =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}
