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
}

export interface BlogCategory {
  id: string
  name: string
  description: string
  count: number
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'tasarim-ipuclari',
    name: 'Tasarım İpuçları',
    description: 'Profesyonel tasarım için ipuçları ve öneriler',
    count: 8
  },
  {
    id: 'baski-teknikleri',
    name: 'Baskı Teknikleri',
    description: 'Farklı baskı yöntemleri ve kalite standartları',
    count: 6
  },
  {
    id: 'pazarlama',
    name: 'Pazarlama',
    description: 'İşletmenizi tanıtmak için stratejiler',
    count: 5
  },
  {
    id: 'sektor-haberleri',
    name: 'Sektör Haberleri',
    description: 'Baskı sektöründen güncel haberler',
    count: 4
  }
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'etkili-kartvizit-tasarimi',
    title: 'Etkili Kartvizit Tasarımı İçin 10 Altın Kural',
    excerpt: 'Profesyonel bir kartvizit tasarlarken dikkat etmeniz gereken temel kurallar ve ipuçları.',
    content: `
# Etkili Kartvizit Tasarımı İçin 10 Altın Kural

Kartvizit, işletmenizin ilk izlenimini oluşturan en önemli pazarlama araçlarından biridir. Doğru tasarlanmış bir kartvizit, potansiyel müşterilerinizde kalıcı bir etki bırakabilir.

## 1. Sadelik Öncelik

Kartvizitinizde çok fazla bilgi kullanmaktan kaçının. Sadece gerekli bilgileri ekleyin:
- İsim ve unvan
- Şirket adı
- Telefon numarası
- E-posta adresi
- Web sitesi

## 2. Okunabilir Fontlar Seçin

Kartvizitinizde kullandığınız fontların okunabilir olmasına dikkat edin. Çok süslü veya küçük fontlar tercih etmeyin.

## 3. Kaliteli Kağıt Kullanın

350 gram veya daha kalın kağıt seçenekleri profesyonel bir görünüm sağlar.

## 4. Renk Uyumu

Şirket kimliğinizle uyumlu renkler kullanın. Çok fazla renk karmaşaya neden olabilir.

## 5. Logo Yerleşimi

Logonuzu kartvizitinizde öne çıkaracak şekilde yerleştirin.

## 6. İletişim Bilgileri

Güncel ve doğru iletişim bilgilerini kullandığınızdan emin olun.

## 7. Boşluk Kullanımı

Tasarımınızda yeterli boşluk bırakın. Kalabalık tasarımlar profesyonel görünmez.

## 8. Çift Taraflı Tasarım

Kartvizitinizin arka yüzünü de değerlendirin. Ek bilgiler veya görsel öğeler ekleyebilirsiniz.

## 9. Baskı Kalitesi

Kaliteli baskı için doğru dosya formatını (PDF, AI) kullanın.

## 10. Test Edin

Baskıya göndermeden önce tasarımınızı farklı kişilere göstererek geri bildirim alın.

Bu kuralları takip ederek etkili ve profesyonel kartvizitler tasarlayabilirsiniz.
    `,
    author: 'Ahmet Yılmaz',
    date: '2024-01-15',
    category: 'tasarim-ipuclari',
    image: '/images/blog/kartvizit-tasarim.jpg',
    tags: ['kartvizit', 'tasarım', 'profesyonel', 'ipuçları'],
    readTime: 5
  },
  {
    id: 'dijital-baski-vs-ofset',
    title: 'Dijital Baskı vs Ofset Baskı: Hangisini Seçmelisiniz?',
    excerpt: 'Dijital baskı ve ofset baskı arasındaki farkları öğrenin ve projeniz için doğru seçimi yapın.',
    content: `
# Dijital Baskı vs Ofset Baskı: Hangisini Seçmelisiniz?

Baskı projelerinizde doğru tekniği seçmek hem kalite hem de maliyet açısından kritik önem taşır.

## Dijital Baskı

### Avantajları:
- Hızlı üretim
- Düşük adet için ekonomik
- Değişken veri baskısı mümkün
- Hızlı revizyon imkanı

### Dezavantajları:
- Yüksek adetlerde pahalı
- Sınırlı kağıt seçenekleri
- Pantone renk sınırlaması

## Ofset Baskı

### Avantajları:
- Yüksek adetlerde ekonomik
- Mükemmel renk kalitesi
- Geniş kağıt seçenekleri
- Pantone renk desteği

### Dezavantajları:
- Uzun hazırlık süresi
- Düşük adetlerde pahalı
- Değişken veri baskısı zor

## Hangi Durumda Hangisini Seçmeli?

**Dijital Baskı Tercih Edin:**
- 1000 adet altı siparişlerde
- Hızlı teslimat gerektiğinde
- Kişiselleştirme yapacağınızda

**Ofset Baskı Tercih Edin:**
- 1000 adet üzeri siparişlerde
- En yüksek kalite istediğinizde
- Özel renk kullanacağınızda
    `,
    author: 'Mehmet Demir',
    date: '2024-01-10',
    category: 'baski-teknikleri',
    image: '/images/blog/dijital-ofset.jpg',
    tags: ['dijital baskı', 'ofset', 'teknik', 'kalite'],
    readTime: 7
  },
  {
    id: 'sosyal-medya-pazarlama',
    title: 'Baskı Ürünlerinizi Sosyal Medyada Nasıl Tanıtırsınız?',
    excerpt: 'Kartvizit, broşür ve diğer baskı ürünlerinizi sosyal medyada etkili şekilde tanıtmanın yolları.',
    content: `
# Baskı Ürünlerinizi Sosyal Medyada Nasıl Tanıtırsınız?

Sosyal medya, baskı ürünlerinizi tanıtmak için güçlü bir platform. Doğru stratejilerle geniş kitlelere ulaşabilirsiniz.

## Instagram Stratejileri

### Görsel İçerik
- Ürün fotoğrafları
- Tasarım süreci videoları
- Müşteri testimonialları
- Before/after karşılaştırmaları

### Hashtag Kullanımı
- #kartvizit #tasarım #baskı
- #profesyonel #kurumsal
- Şehir bazlı hashtagler

## Facebook Pazarlama

### İçerik Türleri
- Müşteri hikayeleri
- Eğitici içerikler
- Canlı yayınlar
- Etkinlik duyuruları

### Reklam Stratejileri
- Hedef kitle belirleme
- Coğrafi hedefleme
- İlgi alanı bazlı hedefleme

## LinkedIn B2B Pazarlama

### Profesyonel İçerik
- Sektör analizleri
- İş dünyası trendleri
- Başarı hikayeleri
- Uzman görüşleri

## Ölçüm ve Analiz

### Takip Edilmesi Gereken Metrikler
- Erişim sayısı
- Etkileşim oranı
- Web sitesi trafiği
- Dönüşüm oranları

Bu stratejileri uygulayarak sosyal medyada başarılı olabilirsiniz.
    `,
    author: 'Ayşe Kaya',
    date: '2024-01-05',
    category: 'pazarlama',
    image: '/images/blog/sosyal-medya.jpg',
    tags: ['sosyal medya', 'pazarlama', 'tanıtım', 'strateji'],
    readTime: 6
  },
  {
    id: 'cevre-dostu-baski',
    title: 'Çevre Dostu Baskı: Sürdürülebilir Seçenekler',
    excerpt: 'Çevre dostu baskı teknikleri ve geri dönüştürülebilir malzemeler hakkında bilmeniz gerekenler.',
    content: `
# Çevre Dostu Baskı: Sürdürülebilir Seçenekler

Günümüzde çevresel sorumluluk her sektörde olduğu gibi baskı sektöründe de önem kazanıyor.

## Geri Dönüştürülebilir Kağıtlar

### FSC Sertifikalı Kağıtlar
- Sürdürülebilir orman yönetimi
- Çevresel standartlara uygunluk
- Kalite garantisi

### Geri Dönüştürülmüş Kağıtlar
- %100 geri dönüştürülmüş seçenekler
- Karma geri dönüştürülmüş kağıtlar
- Özel dokulu seçenekler

## Çevre Dostu Mürekkepler

### Soya Bazlı Mürekkepler
- Doğal kaynaklardan üretim
- Düşük VOC emisyonu
- Parlak renk kalitesi

### Su Bazlı Mürekkepler
- Çevre dostu formül
- Güvenli kullanım
- Kaliteli sonuçlar

## Sürdürülebilir Baskı Teknikleri

### Dijital Baskı Avantajları
- Kimyasal atık azaltma
- Enerji tasarrufu
- Hızlı üretim

### Atık Azaltma Stratejileri
- Doğru adet hesaplama
- Proof baskı optimizasyonu
- Geri dönüşüm programları

Çevre dostu seçeneklerle hem doğayı koruyabilir hem de müşterilerinize değer katabilirsiniz.
    `,
    author: 'Fatma Özkan',
    date: '2023-12-28',
    category: 'sektor-haberleri',
    image: '/images/blog/cevre-dostu.jpg',
    tags: ['çevre', 'sürdürülebilir', 'geri dönüşüm', 'yeşil'],
    readTime: 8
  },
  {
    id: 'brosur-tasarim-rehberi',
    title: 'Etkili Broşür Tasarımı: Adım Adım Rehber',
    excerpt: 'Dikkat çeken ve etkili broşürler tasarlamak için kapsamlı rehber ve profesyonel ipuçları.',
    content: `
# Etkili Broşür Tasarımı: Adım Adım Rehber

Broşürler, işletmenizi tanıtmak ve ürünlerinizi pazarlamak için güçlü araçlardır.

## Planlama Aşaması

### Hedef Kitle Analizi
- Demografik özellikler
- İlgi alanları
- İhtiyaçlar ve beklentiler

### İçerik Stratejisi
- Ana mesaj belirleme
- Destekleyici bilgiler
- Çağrı metinleri (CTA)

## Tasarım Prensipleri

### Görsel Hiyerarşi
- Başlık önceliği
- Alt başlık düzeni
- İçerik akışı

### Renk Paleti
- Marka uyumu
- Kontrast kullanımı
- Psikolojik etkiler

## Teknik Özellikler

### Boyut Seçimi
- A4 (210x297mm)
- A5 (148x210mm)
- Özel boyutlar

### Katlama Seçenekleri
- Tek katlama
- Z katlama
- Kapı katlama

## Baskı Hazırlığı

### Dosya Formatları
- PDF/X-1a standartı
- CMYK renk modu
- 300 DPI çözünürlük

### Taşma Alanı
- 3mm bleed ekleme
- Güvenlik alanı bırakma
- Kesim işaretleri

Bu rehberi takip ederek profesyonel broşürler tasarlayabilirsiniz.
    `,
    author: 'Murat Şen',
    date: '2023-12-20',
    category: 'tasarim-ipuclari',
    image: '/images/blog/brosur-tasarim.jpg',
    tags: ['broşür', 'tasarım', 'rehber', 'profesyonel'],
    readTime: 9
  }
]

export function getBlogPosts(): BlogPost[] {
  return BLOG_POSTS
}

export function getBlogPost(id: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.id === id)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.category === category)
}

export function getBlogCategories(): BlogCategory[] {
  return BLOG_CATEGORIES
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  return BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
} 