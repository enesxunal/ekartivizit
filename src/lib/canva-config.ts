// Canva Connect API Konfigürasyonu
export const canvaConfig = {
  // Canva Connect API URL'leri
  apiUrl: 'https://api.canva.com/rest/v1',
  authUrl: 'https://www.canva.com/api/oauth/authorize',
  tokenUrl: 'https://api.canva.com/rest/v1/oauth/token',
  
  // Redirect URL'leri (Canva geliştirici panelinde tanımlanmalı)
  redirectUri: 'https://ekartvizit.co/api/canva/callback',
  returnUrl: 'https://ekartvizit.co/tasarim-tamamlandi',
  
  // Geliştirme ortamı için localhost URL'leri
  dev: {
    redirectUri: 'http://127.0.0.1:3000/api/canva/callback',
    returnUrl: 'http://127.0.0.1:3000/tasarim-tamamlandi',
  },
  
  // OAuth scope'ları
  scopes: [
    'design:read',
    'design:write',
    'design:content:read',
    'design:content:write',
    'design:meta:read'
  ],
  
  // Ürün kategorilerine göre Canva tasarım tipleri
  designTypes: {
    kartvizit: 'business_card',
    broşür: 'flyer',
    magnet: 'sticker',
    etiket: 'label',
    antetli: 'letterhead'
  },
  
  // Standart boyutlar (piksel cinsinden, 300 DPI)
  dimensions: {
    kartvizit: { width: 1050, height: 600 }, // 3.5" x 2"
    broşür: { width: 2481, height: 3508 }, // A4
    magnet: { width: 1050, height: 1050 }, // Kare magnet
    etiket: { width: 750, height: 750 }, // Kare etiket
    antetli: { width: 2481, height: 3508 } // A4
  }
}

// Canva şablon URL'leri (gerçek template ID'leri ile değiştirilecek)
export const canvaTemplates = {
  kartvizit: {
    modern: 'https://www.canva.com/design/DAF1234567890',
    classic: 'https://www.canva.com/design/DAF0987654321',
    minimal: 'https://www.canva.com/design/DAF1122334455'
  },
  broşür: {
    a4: 'https://www.canva.com/design/DAF2233445566',
    a5: 'https://www.canva.com/design/DAF3344556677'
  },
  magnet: {
    kare: 'https://www.canva.com/design/DAF4455667788',
    yuvarlak: 'https://www.canva.com/design/DAF5566778899'
  }
}

// Canva tasarım boyutları (piksel cinsinden)
export const canvaDimensions = {
  kartvizit: { width: 1050, height: 600 },
  broşür_a4: { width: 2481, height: 3508 },
  broşür_a5: { width: 1748, height: 2481 },
  magnet: { width: 1050, height: 1050 },
  etiket: { width: 750, height: 750 }
}

// Canva renk paletleri
export const canvaColorPalettes = {
  kurumsal: ['#59af05', '#4a9321', '#ffffff', '#333333'],
  modern: ['#2563eb', '#1d4ed8', '#ffffff', '#1f2937'],
  klasik: ['#dc2626', '#991b1b', '#ffffff', '#374151'],
  minimal: ['#6b7280', '#374151', '#ffffff', '#111827']
}

// Canva URL oluşturucu fonksiyonları
export const createCanvaUrl = {
  // Şablon düzenleme URL'si (return_to parametresi ile)
  editTemplate: (templateId: string, returnUrl?: string) => {
    const baseUrl = `https://www.canva.com/design/${templateId}/edit`
    const params = new URLSearchParams()
    
    if (returnUrl) {
      params.append('return_to', returnUrl)
    }
    
    // UTM parametreleri ekle
    params.append('utm_source', 'ekartvizit')
    params.append('utm_medium', 'integration')
    params.append('utm_campaign', 'template_edit')
    
    return `${baseUrl}?${params.toString()}`
  },
  
  // Yeni tasarım oluşturma URL'si
  createNew: (category: string, returnUrl?: string) => {
    const designType = canvaConfig.designTypes[category as keyof typeof canvaConfig.designTypes] || 'custom'
    const baseUrl = `https://www.canva.com/create/${designType}`
    const params = new URLSearchParams()
    
    if (returnUrl) {
      params.append('return_to', returnUrl)
    }
    
    params.append('utm_source', 'ekartvizit')
    params.append('utm_medium', 'integration')
    params.append('utm_campaign', 'new_design')
    
    return `${baseUrl}?${params.toString()}`
  }
}

// Ortam kontrolü
export const getCanvaConfig = () => {
  const isDev = process.env.NODE_ENV === 'development'
  
  return {
    ...canvaConfig,
    redirectUri: isDev ? canvaConfig.dev.redirectUri : canvaConfig.redirectUri,
    returnUrl: isDev ? canvaConfig.dev.returnUrl : canvaConfig.returnUrl
  }
} 