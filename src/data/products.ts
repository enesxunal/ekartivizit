export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'kurumsal' | 'reklam' | 'promosyon';
  image: string;
  images?: string[]; // Ek görseller için
  href: string;
  gradient: string;
  features?: string[];
  sizes?: string[];
  materials?: string[];
  colors?: string[];
  windowOptions?: string[]; // Zarf için pencere seçenekleri
  minQuantity?: number;
  price?: {
    min: number;
    max: number;
  };
  extraOptions?: {
    name: string;
    price: number;
  }[];
  quantityPricing?: {
    quantity: number;
    price: number;
    material?: string;
    size?: string;
  }[];
  customSizing?: {
    enabled: boolean;
    pricePerCm2: number;
    minSize: number;
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
    image: '/images/Kartvizit.png',
    images: [
      '/images/Kartvizit.png',
      '/images/Kartvizit (1).png',
      '/images/Kartvizit (2).png',
      '/images/Kartvizit-Ekonomik.png'
    ],
    href: '/urun/kartvizit',
    gradient: 'from-[#59af05] to-[#4a9321]',
    features: ['Mat/Parlak Laminasyon', 'UV Spot Laminasyon', 'Özel Kesim', 'Kabartma Laklı'],
    sizes: ['86.75x54mm (Standart)'],
    materials: ['250 Gram Tek Yön', '350 Gram Çift Yön', '700 Gram Sıvama'],
    colors: ['CMYK 4 Renk', 'Pantone Özel Renk'],
    minQuantity: 1000,
    price: { min: 500, max: 2000 },
    extraOptions: [
      { name: 'Özel Kesim', price: 250 },
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 1000, price: 500, material: '250 Gram Tek Yön' },
      { quantity: 2000, price: 900, material: '250 Gram Tek Yön' },
      { quantity: 1000, price: 800, material: '350 Gram Çift Yön' },
      { quantity: 2000, price: 1500, material: '350 Gram Çift Yön' },
      { quantity: 1000, price: 900, material: '350 Gram Çift Yön (Düz Kesim)' },
      { quantity: 2000, price: 1600, material: '350 Gram Çift Yön (Düz Kesim)' },
      { quantity: 1000, price: 1100, material: '700 Gram Sıvama' },
      { quantity: 2000, price: 2000, material: '700 Gram Sıvama' }
    ]
  },
  {
    id: 'antetli-kagit',
    name: 'Antetli Kağıt',
    description: 'Kurumsal antetli kağıt tasarımları',
    category: 'kurumsal',
    image: '/images/antetli-kagit-2222.png',
    href: '/urun/antetli-kagit',
    gradient: 'from-blue-400 to-blue-600',
    features: ['Letterhead Tasarım', 'Tek Yön Renkli'],
    sizes: ['A4 (21x29.7cm)'],
    materials: ['80 Gram 1. Hamur'],
    colors: ['CMYK 4 Renk', 'Tek Renk'],
    minQuantity: 2000,
    price: { min: 2500, max: 2500 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 2000, price: 2500 }
    ]
  },
  {
    id: 'zarf',
    name: 'Zarf',
    description: 'Kurumsal zarf tasarımları',
    category: 'kurumsal',
    image: '/images/Zarf-Diplomat2.png',
    images: [
      '/images/Zarf-Diplomat2.png',
      '/images/diplomat-zarf-111.png'
    ],
    href: '/urun/zarf',
    gradient: 'from-gray-400 to-gray-600',
    features: ['Pencereli', 'Pencersiz', 'Tek Renk Baskı'],
    sizes: ['Diplomat (104x240mm)', 'Torba A5', 'Torba A4'],
    materials: ['110 Gram Kağıt'],
    colors: ['Tek Renk Baskı'],
    windowOptions: ['Pencereli', 'Pencersiz'],
    minQuantity: 500,
    price: { min: 1800, max: 3500 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 500, price: 1800, size: 'Diplomat (104x240mm)' },
      { quantity: 1000, price: 2500, size: 'Diplomat (104x240mm)' },
      { quantity: 500, price: 3000, size: 'Torba A5' },
      { quantity: 500, price: 3500, size: 'Torba A4' }
    ]
  },
  {
    id: 'makbuz',
    name: 'Makbuz',
    description: 'Özel tasarım makbuz ve fiş',
    category: 'kurumsal',
    image: '/images/makbuz-111.png',
    images: [
      '/images/makbuz-111.png',
      '/images/makbuz-222.png'
    ],
    href: '/urun/makbuz',
    gradient: 'from-yellow-400 to-yellow-600',
    features: ['Numaralı Makbuz', 'Karbonlu Kağıt', '50\'lik Otocopy'],
    sizes: ['14x20 cm', '20x29 cm'],
    materials: ['NCR Karbonlu'],
    colors: ['Tek Renk Siyah'],
    minQuantity: 10,
    price: { min: 1500, max: 4000 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 10, price: 1500, size: '14x20 cm' },
      { quantity: 20, price: 2250, size: '14x20 cm' },
      { quantity: 10, price: 2250, size: '20x29 cm' },
      { quantity: 20, price: 4000, size: '20x29 cm' }
    ]
  },
  {
    id: 'cepli-dosya',
    name: 'Cepli Dosya',
    description: 'Kurumsal cepli dosya tasarımları',
    category: 'kurumsal',
    image: '/images/Cepli-Dosya-111.png',
    images: [
      '/images/Cepli-Dosya-111.png',
      '/images/Cepli-dosya-222-800x800.png',
      '/images/Cepli-Dosya-333-800x800.png'
    ],
    href: '/urun/cepli-dosya',
    gradient: 'from-indigo-400 to-indigo-600',
    features: ['Kulak Yapıştırmalı', 'Mat Selefon', 'Kabartma Selefon'],
    sizes: ['A4 Boyut'],
    materials: ['250Gr. Bristol', '350Gr. Bristol'],
    colors: ['CMYK 4 Renk'],
    minQuantity: 250,
    price: { min: 4250, max: 10500 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 250, price: 4250, material: '250Gr. Bristol' },
      { quantity: 500, price: 6000, material: '250Gr. Bristol' },
      { quantity: 1000, price: 10500, material: '250Gr. Bristol' },
      { quantity: 500, price: 10000, material: '350Gr. Bristol (Mat Selefon + Kabartma Lak)' }
    ]
  },

  // REKLAM ÜRÜNLER
  {
    id: 'brosur',
    name: 'Broşür',
    description: 'Reklam broşürü tasarım ve baskı',
    category: 'reklam',
    image: '/images/Brosur-Ekonomik.png',
    images: [
      '/images/Brosur-Ekonomik.png',
      '/images/Brosur-Tek-Kirim-Standart.png',
      '/images/Brosur-Tek-Kirim-Standart-A5-800x800.png'
    ],
    href: '/urun/brosur',
    gradient: 'from-blue-400 to-blue-600',
    features: ['Çift Yön Baskı', 'Kırım (Tek-Çift)', 'Parlak Selefon'],
    sizes: ['A5 (140x200mm)', 'A4 (200x280mm)'],
    materials: ['115 Gram', '130 Gram'],
    colors: ['CMYK 4 Renk'],
    minQuantity: 1000,
    price: { min: 1400, max: 3500 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 },
      { name: 'Kırım 1000 Adet', price: 400 },
      { name: 'Kırım 2000 Adet', price: 600 },
      { name: 'Kırım 5000 Adet', price: 1000 }
    ],
    quantityPricing: [
      { quantity: 1000, price: 1400, material: '115 Gram', size: 'A5 (140x200mm)' },
      { quantity: 2000, price: 2000, material: '115 Gram', size: 'A5 (140x200mm)' },
      { quantity: 1000, price: 2200, material: '115 Gram', size: 'A4 (200x280mm)' },
      { quantity: 2000, price: 3500, material: '115 Gram', size: 'A4 (200x280mm)' },
      { quantity: 1000, price: 1400, material: '130 Gram', size: 'A5 (140x200mm)' },
      { quantity: 2000, price: 2000, material: '130 Gram', size: 'A5 (140x200mm)' },
      { quantity: 1000, price: 2000, material: '130 Gram', size: 'A4 (200x280mm)' },
      { quantity: 2000, price: 2800, material: '130 Gram', size: 'A4 (200x280mm)' }
    ]
  },
  {
    id: 'magnet',
    name: 'Magnet',
    description: 'Özel tasarım magnet çözümleri',
    category: 'reklam',
    image: '/images/Magnet-800x800.png',
    images: [
      '/images/Magnet-800x800.png',
      '/images/Magnet-ozel-Kesim-800x800.png',
      '/images/Magnet2.png'
    ],
    href: '/urun/magnet',
    gradient: 'from-purple-400 to-purple-600',
    features: ['Buzdolabı Magneti', 'Güçlü Mıknatıs', 'Parlak Selefon'],
    sizes: ['46x68mm (Standart)', 'Özel Ölçü'],
    materials: ['Parlak Selefon'],
    colors: ['CMYK 4 Renk'],
    minQuantity: 1000,
    price: { min: 1250, max: 1250 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 1000, price: 1250, size: '46x68mm (Standart)' }
    ],
    customSizing: {
      enabled: true,
      pricePerCm2: 0.2,
      minSize: 3
    }
  },
  {
    id: 'arac-magnet',
    name: 'Araç Magnet',
    description: 'Araç üstü magnet reklam çözümleri',
    category: 'reklam',
    image: '/images/Magnet Araç.png',
    href: '/urun/arac-magnet',
    gradient: 'from-red-400 to-red-600',
    features: ['Güçlü Tutunma', 'Hava Koşullarına Dayanıklı', 'Kolay Uygulama'],
    sizes: ['20x60 cm', '30x60 cm'],
    materials: ['Güçlü Magnet'],
    colors: ['CMYK UV Dayanıklı'],
    minQuantity: 2,
    price: { min: 1000, max: 1200 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 2, price: 1000, size: '20x60 cm' },
      { quantity: 2, price: 1200, size: '30x60 cm' }
    ]
  },
  {
    id: 'etiket',
    name: 'Etiket',
    description: 'Özel tasarım etiket çözümleri',
    category: 'reklam',
    image: '/images/Sticker.png',
    images: [
      '/images/Sticker.png',
      '/images/Sticker2-800x800.png'
    ],
    href: '/urun/etiket',
    gradient: 'from-orange-400 to-orange-600',
    features: ['Kuşe Etiket', 'Parlak Selefon', 'Özel Kesim'],
    sizes: ['53x83mm', 'A5', 'A4'],
    materials: ['Kuşe Etiket'],
    colors: ['CMYK 4 Renk'],
    minQuantity: 1000,
    price: { min: 700, max: 6200 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 },
      { name: 'Özel Kesim', price: 300 }
    ],
    quantityPricing: [
      { quantity: 1000, price: 700, size: '53x83mm', material: 'Standart Köşeli' },
      { quantity: 1000, price: 1000, size: '53x83mm', material: 'Özel Kesim' },
      { quantity: 1000, price: 3200, size: 'A5' },
      { quantity: 1000, price: 6200, size: 'A4' }
    ]
  },
  {
    id: 'yelken-bayrak',
    name: 'Yelken Bayrak',
    description: 'Açık hava reklam yelken bayrakları',
    category: 'reklam',
    image: '/images/Yelken-Bayrak-e1686170893487-800x799.png',
    href: '/urun/yelken-bayrak',
    gradient: 'from-green-400 to-green-600',
    features: ['Rüzgar Dayanımlı', 'UV Korumalı', '4 Renk Baskı'],
    sizes: ['75x300 cm'],
    materials: ['Polyester Kumaş'],
    colors: ['Dijital Baskı'],
    minQuantity: 2,
    price: { min: 2250, max: 2250 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 2, price: 2250 }
    ]
  },

  // PROMOSYON ÜRÜNLER
  {
    id: 'plastik-kalem',
    name: 'Plastik Kalem',
    description: 'Kurumsal promosyon kalemleri',
    category: 'promosyon',
    image: '/images/Kalem-e1685732155641.png',
    href: '/urun/plastik-kalem',
    gradient: 'from-indigo-400 to-indigo-600',
    features: ['4 Renk Baskı', 'Plastik Beyaz', 'Kaliteli Mürekkep'],
    sizes: ['Standart Boy'],
    materials: ['Plastik'],
    colors: ['Beyaz', '4 Renk Baskı'],
    minQuantity: 100,
    price: { min: 1000, max: 1000 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 100, price: 1000 }
    ]
  },
  {
    id: 'cakmak',
    name: 'Çakmak',
    description: 'Promosyon çakmak baskı hizmetleri',
    category: 'promosyon',
    image: '/images/Çakmak.png',
    href: '/urun/cakmak',
    gradient: 'from-red-400 to-red-600',
    features: ['4 Renk Baskı', 'Plastik Beyaz', 'Dayanıklı'],
    sizes: ['Standart Çakmak'],
    materials: ['Plastik'],
    colors: ['Beyaz', '4 Renk Baskı'],
    minQuantity: 100,
    price: { min: 1200, max: 1200 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 100, price: 1200 }
    ]
  },
  {
    id: 'seramik-kupa',
    name: 'Seramik Kupa',
    description: 'Özel tasarım seramik kupa baskı',
    category: 'promosyon',
    image: '/images/Kupa-e1686170189162-800x800.png',
    images: [
      '/images/Kupa-e1686170189162-800x800.png',
      '/images/Kupa2-e1686170511722.png'
    ],
    href: '/urun/seramik-kupa',
    gradient: 'from-pink-400 to-pink-600',
    features: ['4 Renk Baskı', 'Seramik', 'Bulaşık Makinesi Uyumlu'],
    sizes: ['Standart Kupa'],
    materials: ['Seramik'],
    colors: ['Beyaz', '4 Renk Baskı'],
    minQuantity: 10,
    price: { min: 1750, max: 1750 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 10, price: 1750 }
    ]
  },
  {
    id: 'takvim',
    name: 'Takvim',
    description: 'Özel tasarım piramit takvim',
    category: 'kurumsal',
    image: '/images/takvim-mockup-1.png',
    images: [
      '/images/takvim-mockup-1.png',
      '/images/takvim-mockup-2.1.png'
    ],
    href: '/urun/takvim',
    gradient: 'from-amber-400 to-amber-600',
    features: ['12 Yaprak', 'Parlak Kuşe', 'Çift Yön Renkli'],
    sizes: ['10x18cm (Yatay)'],
    materials: ['130 Gram Parlak Kuşe'],
    colors: ['CMYK 4 Renk'],
    minQuantity: 100,
    price: { min: 12000, max: 35000 },
    extraOptions: [
      { name: 'Logo Tasarımı', price: 250 }
    ],
    quantityPricing: [
      { quantity: 100, price: 12000 },
      { quantity: 250, price: 18000 },
      { quantity: 500, price: 25000 },
      { quantity: 1000, price: 35000 }
    ]
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