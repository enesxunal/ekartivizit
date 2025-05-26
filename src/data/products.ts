export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'kurumsal' | 'reklam' | 'promosyon';
  image: string;
  href: string;
  gradient: string;
  features?: string[];
  sizes?: string[];
  materials?: string[];
  colors?: string[];
  minQuantity?: number;
  price?: {
    min: number;
    max: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'kurumsal',
    name: 'Kurumsal',
    description: 'Profesyonel kurumsal ürünler',
    icon: 'Building2',
    href: '/kurumsal'
  },
  {
    id: 'reklam',
    name: 'Reklam',
    description: 'Reklam ve tanıtım ürünleri',
    icon: 'Megaphone',
    href: '/reklam'
  },
  {
    id: 'promosyon',
    name: 'Promosyon',
    description: 'Promosyon ve hediye ürünleri',
    icon: 'Gift',
    href: '/promosyon'
  }
];

export const PRODUCTS: Product[] = [
  // KURUMSAL ÜRÜNLER
  {
    id: 'kartvizit',
    name: 'Kartvizit',
    description: 'Profesyonel kartvizit tasarımları',
    category: 'kurumsal',
    image: '/images/kartvizit.jpg',
    href: '/kurumsal/kartvizit',
    gradient: 'from-[#59af05] to-[#4a9321]',
    features: ['Mat/Parlak Laminasyon', 'UV Spot Laminasyon', 'Özel Kesim'],
    sizes: ['85x55mm (Standart)', '90x50mm', '85x50mm'],
    materials: ['350gr Kuşe Karton', '300gr Bristol', '250gr Kraft'],
    colors: ['CMYK 4 Renk', 'Pantone Özel Renk'],
    minQuantity: 100,
    price: { min: 25, max: 150 }
  },
  {
    id: 'antetli-kagit',
    name: 'Antetli Kağıt',
    description: 'Kurumsal antetli kağıt tasarımları',
    category: 'kurumsal',
    image: '/images/antetli-kagit.jpg',
    href: '/kurumsal/antetli-kagit',
    gradient: 'from-blue-400 to-blue-600',
    features: ['Letterhead Tasarım', 'Logo Entegrasyonu', 'Özel Boyut'],
    sizes: ['A4 (21x29.7cm)', 'A5 (14.8x21cm)', 'Özel Boyut'],
    materials: ['80gr Beyaz Kağıt', '90gr Beyaz Kağıt', '100gr Kuşe'],
    colors: ['CMYK 4 Renk', 'Tek Renk', 'İki Renk'],
    minQuantity: 250,
    price: { min: 50, max: 200 }
  },
  {
    id: 'zarf',
    name: 'Zarf',
    description: 'Kurumsal zarf tasarımları',
    category: 'kurumsal',
    image: '/images/zarf.jpg',
    href: '/kurumsal/zarf',
    gradient: 'from-gray-400 to-gray-600',
    features: ['Pencereli/Pencersiz', 'Özel Logo Baskı', 'Farklı Boyutlar'],
    sizes: ['DL (11x22cm)', 'C5 (16.2x22.9cm)', 'C4 (22.9x32.4cm)'],
    materials: ['80gr Beyaz Kağıt', '90gr Kraft', '100gr Renkli'],
    colors: ['CMYK 4 Renk', 'Tek Renk Baskı'],
    minQuantity: 250,
    price: { min: 75, max: 300 }
  },
  {
    id: 'makbuz',
    name: 'Makbuz',
    description: 'Özel tasarım makbuz ve fiş',
    category: 'kurumsal',
    image: '/images/makbuz.jpg',
    href: '/kurumsal/makbuz',
    gradient: 'from-yellow-400 to-yellow-600',
    features: ['Numaralı Makbuz', 'Karbonlu Kağıt', 'Özel Tasarım'],
    sizes: ['A6 (10.5x14.8cm)', 'A5 (14.8x21cm)', 'Özel Boyut'],
    materials: ['NCR Karbonlu', '80gr Beyaz', '90gr Renkli'],
    colors: ['Tek Renk', 'İki Renk', 'CMYK'],
    minQuantity: 100,
    price: { min: 40, max: 180 }
  },
  {
    id: 'cepli-dosya',
    name: 'Cepli Dosya',
    description: 'Kurumsal cepli dosya tasarımları',
    category: 'kurumsal',
    image: '/images/cepli-dosya.jpg',
    href: '/kurumsal/cepli-dosya',
    gradient: 'from-indigo-400 to-indigo-600',
    features: ['Mat Laminasyon', 'UV Spot', 'Özel Kesim'],
    sizes: ['A4 Boyut', 'A5 Boyut', 'Özel Boyut'],
    materials: ['350gr Kuşe', '300gr Bristol', '280gr Kraft'],
    colors: ['CMYK 4 Renk', 'Pantone Özel'],
    minQuantity: 100,
    price: { min: 150, max: 500 }
  },

  // REKLAM ÜRÜNLER
  {
    id: 'brosur',
    name: 'Broşür',
    description: 'Reklam broşürü tasarım ve baskı',
    category: 'reklam',
    image: '/images/brosur.jpg',
    href: '/reklam/brosur',
    gradient: 'from-blue-400 to-blue-600',
    features: ['Çift Katlama', 'Üç Katlama', 'Z Katlama'],
    sizes: ['A4 (21x29.7cm)', 'A5 (14.8x21cm)', 'A6 (10.5x14.8cm)'],
    materials: ['170gr Kuşe', '200gr Kuşe', '250gr Kuşe'],
    colors: ['CMYK 4 Renk', 'Pantone Özel Renk'],
    minQuantity: 250,
    price: { min: 100, max: 400 }
  },
  {
    id: 'magnet',
    name: 'Magnet',
    description: 'Özel tasarım magnet çözümleri',
    category: 'reklam',
    image: '/images/magnet.jpg',
    href: '/reklam/magnet',
    gradient: 'from-purple-400 to-purple-600',
    features: ['Buzdolabı Magneti', 'Güçlü Mıknatıs', 'Dayanıklı Baskı'],
    sizes: ['85x55mm', '90x50mm', '100x70mm', 'Özel Boyut'],
    materials: ['0.7mm Magnet', '1mm Magnet', 'Esnek Magnet'],
    colors: ['CMYK 4 Renk', 'UV Dayanıklı'],
    minQuantity: 100,
    price: { min: 150, max: 600 }
  },
  {
    id: 'arac-magnet',
    name: 'Araç Magnet',
    description: 'Araç üstü magnet reklam çözümleri',
    category: 'reklam',
    image: '/images/arac-magnet.jpg',
    href: '/reklam/arac-magnet',
    gradient: 'from-red-400 to-red-600',
    features: ['Güçlü Tutunma', 'Hava Koşullarına Dayanıklı', 'Kolay Uygulama'],
    sizes: ['30x40cm', '40x60cm', '50x70cm', 'Özel Boyut'],
    materials: ['1.5mm Güçlü Magnet', '2mm Extra Güçlü'],
    colors: ['CMYK UV Dayanıklı', 'Lamine Koruma'],
    minQuantity: 10,
    price: { min: 200, max: 800 }
  },
  {
    id: 'etiket',
    name: 'Etiket',
    description: 'Özel tasarım etiket çözümleri',
    category: 'reklam',
    image: '/images/etiket.jpg',
    href: '/reklam/etiket',
    gradient: 'from-orange-400 to-orange-600',
    features: ['Su Geçirmez', 'Yapışkan Etiket', 'Şeffaf/Opak'],
    sizes: ['Yuvarlak', 'Kare', 'Dikdörtgen', 'Özel Kesim'],
    materials: ['Vinyl Etiket', 'Kağıt Etiket', 'Şeffaf Etiket'],
    colors: ['CMYK 4 Renk', 'Beyaz Baskı', 'Metalik'],
    minQuantity: 250,
    price: { min: 50, max: 300 }
  },
  {
    id: 'yelken-bayrak',
    name: 'Yelken Bayrak',
    description: 'Açık hava reklam yelken bayrakları',
    category: 'reklam',
    image: '/images/yelken-bayrak.jpg',
    href: '/reklam/yelken-bayrak',
    gradient: 'from-green-400 to-green-600',
    features: ['Rüzgar Dayanımlı', 'UV Korumalı', 'Çift Taraflı Baskı'],
    sizes: ['2.5m', '3m', '4m', '5m'],
    materials: ['Polyester Kumaş', 'Mesh Kumaş', 'Vinyl'],
    colors: ['Dijital Baskı', 'Sublimation'],
    minQuantity: 1,
    price: { min: 300, max: 1200 }
  },

  // PROMOSYON ÜRÜNLER
  {
    id: 'plastik-kalem',
    name: 'Plastik Kalem',
    description: 'Kurumsal promosyon kalemleri',
    category: 'promosyon',
    image: '/images/plastik-kalem.jpg',
    href: '/promosyon/plastik-kalem',
    gradient: 'from-indigo-400 to-indigo-600',
    features: ['Logo Baskı', 'Farklı Renkler', 'Kaliteli Mürekkep'],
    sizes: ['Standart Boy', 'Kısa Boy', 'Uzun Boy'],
    materials: ['ABS Plastik', 'PP Plastik', 'Metal Klips'],
    colors: ['Mavi', 'Siyah', 'Kırmızı', 'Yeşil', 'Beyaz'],
    minQuantity: 250,
    price: { min: 200, max: 800 }
  },
  {
    id: 'cakmak',
    name: 'Çakmak',
    description: 'Promosyon çakmak baskı hizmetleri',
    category: 'promosyon',
    image: '/images/cakmak.jpg',
    href: '/promosyon/cakmak',
    gradient: 'from-red-400 to-red-600',
    features: ['Logo Baskı', 'Tam Renkli Baskı', 'Dayanıklı'],
    sizes: ['Standart Çakmak', 'Mini Çakmak'],
    materials: ['Plastik Gövde', 'Metal Gövde'],
    colors: ['Beyaz', 'Siyah', 'Kırmızı', 'Mavi', 'Sarı'],
    minQuantity: 100,
    price: { min: 300, max: 1000 }
  },
  {
    id: 'seramik-kupa',
    name: 'Seramik Kupa',
    description: 'Özel tasarım seramik kupa baskı',
    category: 'promosyon',
    image: '/images/seramik-kupa.jpg',
    href: '/promosyon/seramik-kupa',
    gradient: 'from-pink-400 to-pink-600',
    features: ['Sublimation Baskı', 'Bulaşık Makinesi Uyumlu', 'Dayanıklı'],
    sizes: ['300ml', '350ml', '400ml'],
    materials: ['Seramik', 'Porselen', 'Cam'],
    colors: ['Beyaz', 'Siyah', 'Renkli İç', 'Metalik'],
    minQuantity: 50,
    price: { min: 400, max: 1200 }
  }
];

// Kategoriye göre ürünleri getiren fonksiyon
export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter(product => product.category === category);
};

// Popüler ürünleri getiren fonksiyon (her kategoriden 2'şer)
export const getPopularProducts = (): Product[] => {
  const kurumsal = getProductsByCategory('kurumsal').slice(0, 2);
  const reklam = getProductsByCategory('reklam').slice(0, 2);
  const promosyon = getProductsByCategory('promosyon').slice(0, 2);
  return [...kurumsal, ...reklam, ...promosyon];
};

// ID'ye göre ürün getiren fonksiyon
export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

// Kategori bilgisini getiren fonksiyon
export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(category => category.id === id);
}; 