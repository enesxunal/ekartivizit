/**
 * Ürün kategorisine göre tahmini teslim süresini hesaplar
 */

export interface DeliveryTimeConfig {
  minDays: number
  maxDays: number
  description: string
}

/**
 * Ürün ID'sine göre teslim süresini döndürür
 */
export function getDeliveryTimeByProduct(productId: string): DeliveryTimeConfig {
  // Ürün kategorisine göre teslim süreleri
  const deliveryTimes: Record<string, DeliveryTimeConfig> = {
    // Kartvizit - 86.75x54mm (Standart boyut)
    'kartvizit': {
      minDays: 5,
      maxDays: 7,
      description: '5-7 iş günü içinde'
    },
    // Broşür
    'brosur': {
      minDays: 5,
      maxDays: 5,
      description: '5 iş günü içinde'
    },
    // Magnet
    'magnet': {
      minDays: 5,
      maxDays: 5,
      description: '5 iş günü içinde'
    },
    // Araç Magnet
    'arac-magnet': {
      minDays: 5,
      maxDays: 5,
      description: '5 iş günü içinde'
    },
    // Etiket
    'etiket': {
      minDays: 5,
      maxDays: 5,
      description: '5 iş günü içinde'
    },
    // Cepli Dosya
    'cepli-dosya': {
      minDays: 7,
      maxDays: 7,
      description: '7 iş günü içinde'
    },
    // Zarf (Diplomat, Torba A5/A4)
    'zarf': {
      minDays: 10,
      maxDays: 10,
      description: '10 iş günü içinde'
    },
    // Makbuz
    'makbuz': {
      minDays: 5,
      maxDays: 5,
      description: '5 iş günü içinde'
    },
    // Antetli Kağıt
    'antetli-kagit': {
      minDays: 5,
      maxDays: 5,
      description: '5 iş günü içinde'
    },
    // Promosyon Ürünleri
    'plastik-kalem': {
      minDays: 5,
      maxDays: 7,
      description: '5-7 iş günü içinde'
    },
    'seramik-kupa': {
      minDays: 5,
      maxDays: 7,
      description: '5-7 iş günü içinde'
    },
    'yelken-bayrak': {
      minDays: 5,
      maxDays: 7,
      description: '5-7 iş günü içinde'
    },
    'cakmak': {
      minDays: 5,
      maxDays: 7,
      description: '5-7 iş günü içinde'
    },
    // Takvim
    'takvim': {
      minDays: 7,
      maxDays: 7,
      description: '7 iş günü içinde'
    }
  }

  // Ürün ID'sine göre teslim süresini al
  const deliveryTime = deliveryTimes[productId]
  
  // Bulunamazsa varsayılan değer
  if (!deliveryTime) {
    return {
      minDays: 5,
      maxDays: 7,
      description: '5-7 iş günü içinde'
    }
  }

  return deliveryTime
}

/**
 * Birden fazla ürün için en uzun teslim süresini hesaplar
 */
export function calculateEstimatedDelivery(items: Array<{ product: { id: string } }>): Date {
  if (!items || items.length === 0) {
    // Varsayılan: 5 iş günü
    return addBusinessDays(new Date(), 5)
  }

  let maxDays = 0

  // Her ürün için teslim süresini kontrol et
  items.forEach(item => {
    const deliveryTime = getDeliveryTimeByProduct(item.product.id)
    const days = Math.max(deliveryTime.minDays, deliveryTime.maxDays)
    if (days > maxDays) {
      maxDays = days
    }
  })

  // En uzun teslim süresini kullan
  return addBusinessDays(new Date(), maxDays)
}

/**
 * İş günü ekler (Hafta sonu hariç)
 */
function addBusinessDays(date: Date, businessDays: number): Date {
  const result = new Date(date)
  let daysToAdd = businessDays
  let currentDay = result.getDay() // 0 = Pazar, 6 = Cumartesi

  // Eğer bugün hafta sonu ise, Pazartesi'ye al
  if (currentDay === 0) {
    // Pazar ise, 1 gün ekle (Pazartesi)
    result.setDate(result.getDate() + 1)
    currentDay = 1
  } else if (currentDay === 6) {
    // Cumartesi ise, 2 gün ekle (Pazartesi)
    result.setDate(result.getDate() + 2)
    currentDay = 1
  }

  // İş günlerini ekle
  while (daysToAdd > 0) {
    result.setDate(result.getDate() + 1)
    currentDay = result.getDay()

    // Hafta sonu değilse iş günü sayısını azalt
    if (currentDay !== 0 && currentDay !== 6) {
      daysToAdd--
    }
  }

  return result
}

