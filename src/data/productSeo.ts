export interface ProductSeoSection {
  title: string
  body: string[]
}

export interface ProductFaq {
  question: string
  answer: string
}

export interface ProductSeoContent {
  intro: string
  sections: ProductSeoSection[]
  faq: ProductFaq[]
  relatedLinks: Array<{ label: string; href: string }>
}

export const PRODUCT_SEO: Record<string, ProductSeoContent> = {
  kartvizit: {
    intro: 'Kartvizit baskısı, işletmenizin veya kişisel markanızın fiziksel temas noktalarından biridir. E-Kartvizit’te 85×52 mm standart ölçüde; 250 gram tek yön, 350 gram çift yön ve 700 gram sıvama seçenekleriyle 1.000 veya 2.000 adet kartvizit siparişi oluşturabilirsiniz. Seçiminize göre fiyat anlık hesaplanır; gösterilen tutarlara KDV ve kargo dahildir.',
    sections: [
      {
        title: 'Hangi kartvizit seçeneği size uygun?',
        body: [
          '250 gram kartvizit, ekonomik ve temel kullanım için uygundur. Yeni kurulan işletmeler, saha ekipleri veya yüksek adetli dağıtım ihtiyacı olan kullanıcılar için dengeli bir seçenektir.',
          '350 gram kartvizit daha tok bir his verir ve çift yön renkli baskı için tercih edilir. Kurumsal görüşmelerde, satış ekiplerinde ve marka algısının önemli olduğu kullanım alanlarında daha güçlü bir sunum sağlar.',
          '700 gram sıvama kartvizit iki katmanlı, daha kalın ve premium bir yapıya sahiptir. Özellikle üst segment hizmet, mimarlık, danışmanlık, güzellik, otomotiv ve benzeri sektörlerde daha prestijli bir fiziksel his isteyen markalar için uygundur.'
        ]
      },
      {
        title: 'Kartvizit baskı fiyatını ne belirler?',
        body: [
          'Fiyatı temel olarak gramaj, baskı yönü, adet ve seçilen ek uygulamalar belirler. 1.000 ve 2.000 adet seçeneklerinde toplam fiyat ürün konfiguratoründe doğrudan gösterilir.',
          'Delik, özel kesim veya logo tasarımı gibi ek hizmetler seçildiğinde toplam tutar otomatik güncellenir. Böylece sipariş vermeden önce nihai maliyeti görebilirsiniz.'
        ]
      },
      {
        title: 'Kartvizit dosyası nasıl hazırlanmalı?',
        body: [
          'Baskı dosyanızı mümkünse PDF formatında, CMYK renk uzayında ve yüksek çözünürlüklü hazırlayın. Kesim çizgisine çok yakın metin veya logo yerleştirmemek baskı sonrası daha güvenli sonuç verir.',
          'Hazır dosyanız varsa sipariş akışında yükleyebilirsiniz. Tasarım desteğine ihtiyacınız varsa ürün sayfasındaki tasarım seçeneğini kullanabilirsiniz.'
        ]
      }
    ],
    faq: [
      { question: 'Standart kartvizit ölçüsü nedir?', answer: 'E-Kartvizit’te kartvizit üretimi 85×52 mm standart ölçü üzerinden sunulur.' },
      { question: '1.000 adet kartvizit fiyatı ne kadar?', answer: 'Fiyat seçilen gramaja göre değişir. Güncel başlangıç fiyatı ürün konfiguratoründe gösterilir; KDV ve kargo dahildir.' },
      { question: '350 gram ile 700 gram kartvizit arasındaki fark nedir?', answer: '350 gram kartvizit tek katmanlı ve tok bir yapıya sahiptir. 700 gram sıvama kartvizit daha kalın, iki katmanlı ve premium hissiyatlıdır.' },
      { question: 'Kartvizit çift yön basılabilir mi?', answer: 'Evet. Uygun malzeme seçeneğinde çift yön renkli baskı yapılabilir.' },
      { question: 'Kartvizit tasarımım hazır değilse ne yapabilirim?', answer: 'Ürün sayfasında tasarım desteği seçeneğini kullanabilir veya logo tasarımı ek hizmetini siparişinize ekleyebilirsiniz.' },
      { question: 'Kartvizit fiyatına kargo dahil mi?', answer: 'Evet. Ürün sayfasında gösterilen güncel fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [
      { label: 'Tüm kurumsal baskılar', href: '/kurumsal' },
      { label: 'Kartvizit tasarımı rehberi', href: '/blog/kartvizit-olcusu-ve-baski-rehberi' },
      { label: 'Baskı dosyası hazırlama', href: '/blog/baski-dosyasi-pdf-cmyk-tasma-payi' }
    ]
  },
  brosur: {
    intro: 'Broşür baskısı; kampanya, menü, hizmet tanıtımı, etkinlik, mağaza içi dağıtım ve saha pazarlaması için kullanılan temel basılı iletişim ürünlerinden biridir. E-Kartvizit’te A5 ve A4 ölçülerde, 115 gram ve 130 gram kağıt seçenekleriyle 1.000 veya 2.000 adet broşür siparişi oluşturabilirsiniz.',
    sections: [
      {
        title: 'A5 mi A4 broşür mü?',
        body: [
          'A5 broşür daha kompakt, elde dağıtımı kolay ve maliyet açısından verimli bir formattır. Kısa kampanya metinleri, fiyat listeleri ve tek konuya odaklanan tanıtımlar için uygundur.',
          'A4 broşür daha geniş içerik alanı sunar. Çok sayıda ürün, hizmet paketi, görsel veya ayrıntılı açıklama kullanmanız gerekiyorsa A4 ölçü daha rahat bir yerleşim sağlar.'
        ]
      },
      {
        title: '115 gram ve 130 gram kağıt farkı',
        body: [
          '115 gram kağıt daha hafif ve ekonomik bir seçimdir; yüksek adetli dağıtım işlerinde avantaj sağlar.',
          '130 gram kağıt biraz daha tok bir his verir. Görsel ağırlıklı tasarımlar, menüler veya elde daha kaliteli his bırakması istenen broşürler için tercih edilebilir.'
        ]
      },
      {
        title: 'Broşür tasarım ve baskı hazırlığı',
        body: [
          'Broşür dosyanızı baskı ölçüsünde, CMYK renk modunda ve yeterli çözünürlükte hazırlayın. Kesilecek kenarlara taşan arka planlar için taşma payı bırakılması önerilir.',
          'Katlama yapılacak işlerde kırım çizgilerinin tasarım aşamasında doğru planlanması önemlidir. Kırım hizmetini sipariş sırasında adet bazlı ek seçenek olarak seçebilirsiniz.'
        ]
      }
    ],
    faq: [
      { question: '1.000 adet A5 broşür fiyatı ne kadar?', answer: 'Fiyat kağıt gramajına göre değişir. 115 gram ve 130 gram seçeneklerin güncel fiyatları ürün sayfasındaki konfigurator üzerinden gösterilir.' },
      { question: 'A4 ve A5 broşür arasında nasıl seçim yapmalıyım?', answer: 'Kısa ve hızlı dağıtılan içerikler için A5, daha fazla görsel ve metin alanı gereken işler için A4 tercih edilebilir.' },
      { question: 'Broşürde 115 gram mı 130 gram mı daha iyi?', answer: '115 gram daha ekonomik ve hafif; 130 gram ise daha tok ve premium hissiyatlıdır. Kullanım amacına göre seçim yapılmalıdır.' },
      { question: 'Broşür katlama yapılabiliyor mu?', answer: 'Evet. Siparişte kırım ek hizmeti seçilerek katlamaya uygun üretim talep edilebilir.' },
      { question: 'Broşür baskı fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Ürün sayfasında gösterilen tutarlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [
      { label: 'Reklam ve tanıtım ürünleri', href: '/reklam' },
      { label: 'A4 ve A5 broşür karşılaştırması', href: '/blog/a4-a5-brosur-farki' },
      { label: '115 gr ve 130 gr broşür farkı', href: '/blog/brosur-kagit-gramaji-115-130' }
    ]
  },
  etiket: {
    intro: 'Sticker ve etiket baskısı; paketleme, ürün işaretleme, kampanya, kargo, mağaza içi iletişim ve marka görünürlüğü için kullanılabilir. E-Kartvizit’te 53×83 mm, A5 ve A4 ölçülerde standart köşeli seçenekler; 53×83 mm ölçüde ise özel kesim seçeneği sunulur.',
    sections: [
      {
        title: 'Hangi etiket ölçüsü ne için kullanılır?',
        body: [
          '53×83 mm etiket, küçük paketler, promosyon uygulamaları ve ürün üzerine yapılan marka uygulamaları için kompakt bir ölçüdür.',
          'A5 ve A4 etiketler daha geniş yüzeylerde, koli, cam, vitrin veya büyük ambalaj uygulamalarında kullanılabilir.'
        ]
      },
      {
        title: 'Standart köşeli ve özel kesim etiket',
        body: [
          'Standart köşeli etiket, dikdörtgen formda ekonomik ve hızlı uygulama isteyen işler için uygundur.',
          'Özel kesim etiket, logonun veya tasarımın dış formuna göre daha karakteristik bir görünüm elde etmek isteyen markalar tarafından tercih edilir.'
        ]
      },
      {
        title: 'Etiket tasarımında dikkat edilmesi gerekenler',
        body: [
          'Küçük ebatlarda kullanılan etiketlerde yazı puntosunu çok küçültmemek ve yüksek kontrastlı bir tasarım kullanmak okunabilirliği artırır.',
          'Kesim hattına yakın önemli logo veya metin kullanmamak, özel kesim işlerde üretim toleransı açısından daha güvenli sonuç verir.'
        ]
      }
    ],
    faq: [
      { question: '1.000 adet sticker fiyatı ne kadar?', answer: '53×83 mm standart köşeli ve özel kesim seçeneklerinin güncel fiyatı ürün sayfasında gösterilir. A5 ve A4 ölçüler için de ayrı fiyatlandırma bulunur.' },
      { question: 'Özel kesim sticker nedir?', answer: 'Özel kesim sticker, standart dikdörtgen yerine tasarımın belirlenen dış formuna göre kesilen etiket türüdür.' },
      { question: 'A5 ve A4 sticker basılıyor mu?', answer: 'Evet. A5 ve A4 ölçülerde 1.000 adet standart köşeli etiket seçeneği bulunur.' },
      { question: 'Etiket fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Konfigurator üzerinde gösterilen güncel fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [
      { label: 'Tüm reklam ürünleri', href: '/reklam' },
      { label: 'Sticker baskı rehberi', href: '/blog/sticker-etiket-baski-rehberi' },
      { label: 'Baskı dosyası hazırlama', href: '/blog/baski-dosyasi-pdf-cmyk-tasma-payi' }
    ]
  },
  magnet: {
    intro: 'Magnet baskı; işletme iletişim bilgilerini, servis numaralarını, kampanyaları veya marka mesajını buzdolabı ve metal yüzeylerde görünür tutmak için kullanılan pratik bir tanıtım ürünüdür. E-Kartvizit’te standart magnet 46×68 mm ölçüde ve 1.000 adet olarak sunulur.',
    sections: [
      {
        title: '46×68 mm magnet nerelerde kullanılır?',
        body: [
          'Standart magnet ölçüsü; restoran, servis, teknik hizmet, emlak, sağlık, güzellik, eğitim ve yerel işletmelerin telefon ve iletişim bilgilerini sürekli görünür tutması için uygundur.',
          'Kompakt ölçü sayesinde marka, telefon, web adresi ve kısa bir mesaj tek yüzeyde sunulabilir.'
        ]
      },
      {
        title: 'Magnet tasarımında ne olmalı?',
        body: [
          'Logo, telefon numarası ve ana hizmet bilgisini önceliklendirin. Küçük ölçüde gereğinden fazla metin kullanmak okunabilirliği düşürür.',
          'Telefon numarası ve marka adı yüksek kontrastta olmalı; önemli bilgiler kesim kenarlarından güvenli mesafede tutulmalıdır.'
        ]
      }
    ],
    faq: [
      { question: 'Magnet ölçüsü nedir?', answer: 'Standart magnet ölçüsü 46×68 mm’dir.' },
      { question: 'Magnet minimum sipariş adedi nedir?', answer: 'Standart magnet için minimum sipariş 1.000 adettir.' },
      { question: 'Özel ölçü magnet var mı?', answer: 'Hayır. Bu ürün sayfasında yalnızca 46×68 mm standart magnet sunulur.' },
      { question: 'Magnet fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Gösterilen ürün fiyatına KDV ve kargo dahildir.' }
    ],
    relatedLinks: [
      { label: 'Reklam ve tanıtım ürünleri', href: '/reklam' },
      { label: 'Magnet baskı rehberi', href: '/blog/magnet-baski-olculeri-kullanim-alanlari' }
    ]
  },
  'antetli-kagit': {
    intro: 'Antetli kağıt; teklif, yazışma ve kurumsal evraklarda marka kimliğini taşıyan temel baskı ürünlerinden biridir. E-Kartvizit’te A5 ve A4 ölçülerde, 80 gram 1. hamur kağıt ve tek yön baskı seçenekleriyle sipariş oluşturabilirsiniz.',
    sections: [
      { title: 'A4 ve A5 antetli kağıt ne zaman kullanılır?', body: ['A4 antetli kağıt resmi yazışmalar, teklifler ve standart evraklar için uygundur. A5 ölçü ise daha kısa not, bilgilendirme veya kompakt kurumsal evrak ihtiyacında tercih edilebilir.', 'Tasarımda logo ve iletişim bilgilerini metin alanını daraltmayacak şekilde üst veya alt bölgede konumlandırmak okunabilirliği korur.'] },
      { title: 'Baskı dosyası nasıl hazırlanmalı?', body: ['Dosyanızı seçtiğiniz ölçüde, CMYK renk modunda ve yüksek çözünürlükte hazırlayın. Logo ve ince çizgiler için vektörel kaynak kullanmak baskı netliğini destekler.', 'Kurumsal yazışma alanını boş bırakın; arka plan veya dekoratif öğeleri metin okunabilirliğini azaltmayacak yoğunlukta kullanın.'] }
    ],
    faq: [
      { question: 'Antetli kağıt hangi kağıda basılır?', answer: 'Bu ürün için 80 gram 1. hamur kağıt seçeneği sunulur.' },
      { question: 'Antetli kağıtta hangi ölçüler var?', answer: 'A4 ve A5 ölçü seçenekleri bulunur.' },
      { question: 'Antetli kağıt fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Ürün sayfasında gösterilen güncel tutarlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Kurumsal baskı ürünleri', href: '/kurumsal' }, { label: 'Antetli kağıt baskı rehberi', href: '/blog/antetli-kagit-baski-rehberi' }]
  },
  zarf: {
    intro: 'Baskılı zarf; teklif, sözleşme, fatura ve fiziksel evrak gönderimlerinde kurumsal kimliği tamamlar. E-Kartvizit’te diplomat, torba A5 ve torba A4 ölçülerinde 110 gram kağıt ve tek renk baskı seçenekleri sunulur.',
    sections: [
      { title: 'Diplomat ve torba zarf farkı', body: ['Diplomat zarf 104×240 mm ölçüsüyle katlanmış A4 evrakların gönderimi için kullanışlıdır. Torba A5 ve A4 zarflar daha büyük belgeleri daha az katlayarak taşımak için tercih edilir.', 'Alıcı adresinin yazılacağı alanı boş bırakmak ve logo/iletişim bilgisini sade tutmak günlük kurumsal kullanımı kolaylaştırır.'] },
      { title: 'Zarf tasarımında dikkat edilmesi gerekenler', body: ['Logo ve iletişim bilgilerini kenarlara çok yaklaştırmayın. Tek renk baskı için kontrastı yüksek, sade grafikler daha okunaklı sonuç verir.', 'Sipariş verirken zarf ölçüsü ve adet seçimi toplam fiyatı belirler.'] }
    ],
    faq: [
      { question: 'Diplomat zarf ölçüsü nedir?', answer: 'Diplomat zarf seçeneği 104×240 mm ölçüdedir.' },
      { question: 'Torba A4 ve A5 zarf basılıyor mu?', answer: 'Evet. Torba A4 ve torba A5 seçenekleri ürün konfiguratoründe bulunur.' },
      { question: 'Zarf fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Gösterilen güncel fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Kurumsal baskı ürünleri', href: '/kurumsal' }, { label: 'Baskılı zarf rehberi', href: '/blog/zarf-baski-rehberi' }]
  },
  makbuz: {
    intro: 'Makbuz baskısı; tahsilat, teslim, servis ve işletme içi kayıt süreçlerinde kopyalı evrak ihtiyacı için kullanılır. E-Kartvizit’te 14×20 cm ve 20×29 cm ölçülerde NCR karbonlu, numaralı makbuz seçenekleri bulunur.',
    sections: [
      { title: 'NCR karbonlu makbuz ne sağlar?', body: ['NCR karbonlu yapı, yazılan bilginin alt nüshalara aktarılmasını sağlar. Bu nedenle tek işlem için birden fazla kayıt nüshası gereken işletmelerde pratiktir.', 'Sipariş seçeneklerinde ölçü ve cilt/adet tercihi toplam fiyatı belirler.'] },
      { title: 'Makbuz tasarımında hangi bilgiler olmalı?', body: ['Firma adı, logo, iletişim bilgileri ve işlem alanları tasarımın temel parçalarıdır. Numaralandırma kullanılacaksa numara alanının okunaklı ve sabit konumda olması önemlidir.', 'Form alanlarını el yazısı için yeterli boşluk bırakacak şekilde planlayın.'] }
    ],
    faq: [
      { question: 'Makbuz hangi ölçülerde basılıyor?', answer: '14×20 cm ve 20×29 cm seçenekleri bulunur.' },
      { question: 'Makbuz karbonlu mu?', answer: 'Evet. Ürün NCR karbonlu kağıt seçeneğiyle sunulur.' },
      { question: 'Makbuz fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Ürün sayfasındaki fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Kurumsal baskı ürünleri', href: '/kurumsal' }, { label: 'Baskı dosyası hazırlama', href: '/blog/baski-dosyasi-pdf-cmyk-tasma-payi' }]
  },
  'cepli-dosya': {
    intro: 'Cepli dosya; teklif, sözleşme, katalog ve sunum belgelerini tek bir kurumsal kapakta toplamak için kullanılır. E-Kartvizit’te A4 boyutta 250 gram Bristol ve 350 gram mat selefon + kabartma lak seçenekleri bulunur.',
    sections: [
      { title: '250 gr ve 350 gr cepli dosya farkı', body: ['250 gram Bristol ekonomik ve işlevsel kurumsal sunumlar için uygundur. 350 gram seçenek daha tok bir yapı sunar; mat selefon ve kabartma lak uygulaması görsel ve dokunsal etkiyi artırır.', 'Seçilecek malzeme kullanım sıklığı, sunum kalitesi ve bütçe beklentisine göre belirlenebilir.'] },
      { title: 'Cepli dosya tasarımında dikkat edilmesi gerekenler', body: ['Ön kapakta logo ve ana mesajı sade tutun. Katlama, cep ve kesim çizgilerine yakın önemli metin kullanmayın.', 'CMYK renk modu ve yüksek çözünürlüklü grafikler üretim dosyası için temel gereksinimlerdir.'] }
    ],
    faq: [
      { question: 'Cepli dosya ölçüsü nedir?', answer: 'Bu ürün A4 boyutunda sunulur.' },
      { question: 'Cepli dosyada hangi kağıt seçenekleri var?', answer: '250 gram Bristol ve 350 gram Bristol mat selefon + kabartma lak seçenekleri bulunur.' },
      { question: 'Cepli dosya fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Güncel ürün fiyatlarına KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Kurumsal baskı ürünleri', href: '/kurumsal' }, { label: 'Cepli dosya baskı rehberi', href: '/blog/cepli-dosya-baski-rehberi' }]
  },
  'arac-magnet': {
    intro: 'Araç magneti, araç yüzeyinde geçici ve sökülebilir reklam alanı oluşturmak için kullanılan magnet bazlı tanıtım ürünüdür. E-Kartvizit’te 20×60 cm ve 30×60 cm ölçülerde, ikili set olarak sunulur.',
    sections: [
      { title: '20×60 mı 30×60 cm mi?', body: ['20×60 cm ölçü daha kompakt araç yüzeyleri ve sade logo/iletişim düzenleri için uygundur. 30×60 cm daha geniş mesaj ve daha güçlü uzaktan görünürlük sağlar.', 'Uygulamadan önce araç yüzeyinin temiz, kuru ve magnet tutmaya uygun metal yüzey olması gerekir.'] },
      { title: 'Araç magnet tasarımında ne olmalı?', body: ['Logo, kısa hizmet tanımı ve telefon numarasını önceliklendirin. Araç hareket halindeyken okunabilirlik için uzun metinlerden kaçının.', 'Yüksek kontrastlı renkler ve büyük tipografi uzaktan algılanmayı kolaylaştırır.'] }
    ],
    faq: [
      { question: 'Araç magneti hangi ölçülerde var?', answer: '20×60 cm ve 30×60 cm seçenekleri bulunur.' },
      { question: 'Minimum araç magnet siparişi kaç adet?', answer: 'Ürün ikili set olarak sunulur; minimum adet 2’dir.' },
      { question: 'Araç magnet fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Gösterilen fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Reklam ve tanıtım ürünleri', href: '/reklam' }, { label: 'Baskı dosyası hazırlama', href: '/blog/baski-dosyasi-pdf-cmyk-tasma-payi' }]
  },
  'yelken-bayrak': {
    intro: 'Yelken bayrak; mağaza önü, etkinlik, fuar ve açık alanlarda markayı dikey formatta görünür kılmak için kullanılan tanıtım ürünüdür. E-Kartvizit’te 75×300 cm polyester kumaş üzerine dijital baskı seçeneği sunulur.',
    sections: [
      { title: 'Yelken bayrak nerelerde kullanılır?', body: ['Mağaza girişleri, etkinlik alanları, fuarlar ve açık hava tanıtımlarında yönlendirme veya marka görünürlüğü amacıyla kullanılabilir.', 'Dikey ve dar format nedeniyle logo, kısa mesaj ve yüksek kontrastlı grafik düzeni daha etkili olur.'] },
      { title: 'Tasarım dosyası nasıl hazırlanmalı?', body: ['Tasarımı 75×300 cm oranına göre hazırlayın. Önemli metin ve logoları kenarlardan güvenli mesafede tutun.', 'Uzaktan okunabilirlik için küçük puntolu uzun metinlerden kaçının.'] }
    ],
    faq: [
      { question: 'Yelken bayrak ölçüsü nedir?', answer: 'Ürün 75×300 cm ölçüde sunulur.' },
      { question: 'Yelken bayrak hangi malzemeden üretilir?', answer: 'Ürün polyester kumaş üzerine dijital baskı seçeneğiyle sunulur.' },
      { question: 'Yelken bayrak fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Gösterilen fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Reklam ve tanıtım ürünleri', href: '/reklam' }, { label: 'Baskı dosyası hazırlama', href: '/blog/baski-dosyasi-pdf-cmyk-tasma-payi' }]
  },
  'plastik-kalem': {
    intro: 'Baskılı plastik kalem, günlük kullanım ile marka görünürlüğünü birleştiren temel promosyon ürünlerinden biridir. E-Kartvizit’te beyaz plastik kalem üzerine 4 renk baskı ve 100 adet minimum sipariş seçeneği bulunur.',
    sections: [
      { title: 'Promosyon kalem tasarımında ne kullanılmalı?', body: ['Baskı alanı sınırlı olduğu için logo, marka adı veya kısa web adresi gibi tek bakışta okunabilen öğeler tercih edilmelidir.', 'İnce detaylar ve çok uzun metinler küçük baskı alanında okunabilirliği azaltabilir.'] },
      { title: 'Hangi kullanım alanlarına uygundur?', body: ['Ofis, etkinlik, müşteri ziyareti, eğitim ve promosyon setlerinde dağıtılabilir. Tek tip kurumsal görsel kullanmak marka tutarlılığını destekler.'] }
    ],
    faq: [
      { question: 'Plastik kalem minimum sipariş adedi nedir?', answer: 'Minimum sipariş 100 adettir.' },
      { question: 'Kaleme renkli baskı yapılabiliyor mu?', answer: 'Evet. Ürün 4 renk baskı seçeneğiyle sunulur.' },
      { question: 'Kalem fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Ürün sayfasındaki fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Promosyon ürünleri', href: '/promosyon' }, { label: 'Baskı dosyası hazırlama', href: '/blog/baski-dosyasi-pdf-cmyk-tasma-payi' }]
  },
  cakmak: {
    intro: 'Baskılı çakmak, işletme adı veya logonun günlük kullanılan bir promosyon ürünü üzerinde taşınmasını sağlar. E-Kartvizit’te beyaz plastik çakmak üzerine 4 renk baskı ve 100 adet minimum sipariş seçeneği bulunur.',
    sections: [
      { title: 'Çakmak baskısında tasarım nasıl olmalı?', body: ['Baskı alanı küçük olduğu için logo veya kısa marka adı gibi sade öğeler daha okunaklı sonuç verir.', 'Çok ince çizgiler ve uzun iletişim metinleri yerine yüksek kontrastlı ve kompakt bir tasarım tercih edin.'] },
      { title: 'Promosyon setlerinde kullanım', body: ['Markalı çakmak, etkinlik, işletme içi dağıtım ve promosyon setlerinde diğer kurumsal ürünlerle birlikte kullanılabilir.'] }
    ],
    faq: [
      { question: 'Çakmak minimum sipariş adedi nedir?', answer: 'Minimum sipariş 100 adettir.' },
      { question: 'Çakmağa 4 renk baskı yapılabiliyor mu?', answer: 'Evet. Ürün 4 renk baskı seçeneğiyle sunulur.' },
      { question: 'Çakmak fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Gösterilen fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Promosyon ürünleri', href: '/promosyon' }]
  },
  'seramik-kupa': {
    intro: 'Baskılı seramik kupa; ofis, hediye ve promosyon setlerinde logo veya tasarımı geniş bir yüzeye taşıyan ürünlerden biridir. E-Kartvizit’te beyaz seramik kupa üzerine 4 renk baskı ve 10 adet minimum sipariş sunulur.',
    sections: [
      { title: 'Kupa tasarımında nelere dikkat edilmeli?', body: ['Logo, illüstrasyon veya kısa mesajı kupanın görünür yüzeyine göre konumlandırın. Çok küçük metinler yerine orta-büyük ölçekte okunabilir grafikler tercih edin.', 'Baskı dosyasını yüksek çözünürlükte ve doğru renk modunda hazırlamak görsel netliğini destekler.'] },
      { title: 'Kurumsal kullanım alanları', body: ['Ofis içi kullanım, etkinlik hediyesi, müşteri setleri ve çalışan kitleri için değerlendirilebilir. Aynı tasarımın diğer promosyon ürünleriyle birlikte kullanılması tutarlı bir set oluşturur.'] }
    ],
    faq: [
      { question: 'Seramik kupa minimum sipariş adedi nedir?', answer: 'Minimum sipariş 10 adettir.' },
      { question: 'Kupaya renkli baskı yapılabiliyor mu?', answer: 'Evet. Beyaz seramik kupa üzerine 4 renk baskı seçeneği sunulur.' },
      { question: 'Kupa fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Ürün sayfasındaki fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Promosyon ürünleri', href: '/promosyon' }, { label: 'Baskı dosyası hazırlama', href: '/blog/baski-dosyasi-pdf-cmyk-tasma-payi' }]
  },
  takvim: {
    intro: 'Piramit masa takvimi, markanın masa üzerinde yıl boyunca görünür kalmasını sağlayan kurumsal baskı ürünlerinden biridir. E-Kartvizit’te 10×18 cm yatay ölçüde, 12 yaprak ve 130 gram parlak kuşe seçenekleri bulunur.',
    sections: [
      { title: 'Masa takviminde hangi içerikler kullanılabilir?', body: ['Her yaprakta marka görselleri, ürünler, hizmet mesajları veya dönemsel iletişim öğeleri kullanılabilir. Takvim bilgisinin okunabilirliği tasarımın önceliği olmalıdır.', 'Logo ve iletişim bilgilerini her sayfada aynı konumda tutmak görsel tutarlılık sağlar.'] },
      { title: 'Takvim dosyası nasıl hazırlanmalı?', body: ['Tasarımı 10×18 cm yatay ölçüye göre hazırlayın. 12 yaprağın sayfa sırası ve takvim tarihleri baskı öncesi dikkatle kontrol edilmelidir.', 'Görselleri yüksek çözünürlükte ve CMYK renk modunda kullanın.'] }
    ],
    faq: [
      { question: 'Piramit takvim ölçüsü nedir?', answer: 'Ürün 10×18 cm yatay ölçüde sunulur.' },
      { question: 'Takvim kaç yapraktır?', answer: 'Ürün 12 yapraklıdır.' },
      { question: 'Takvim minimum sipariş adedi nedir?', answer: 'Minimum sipariş 100 adettir; 250, 500 ve 1.000 adet seçenekleri de bulunur.' },
      { question: 'Takvim fiyatına KDV ve kargo dahil mi?', answer: 'Evet. Gösterilen fiyatlara KDV ve kargo dahildir.' }
    ],
    relatedLinks: [{ label: 'Kurumsal baskı ürünleri', href: '/kurumsal' }, { label: 'Baskı dosyası hazırlama', href: '/blog/baski-dosyasi-pdf-cmyk-tasma-payi' }]
  }
}

export function getProductSeo(productId: string) {
  return PRODUCT_SEO[productId]
}
