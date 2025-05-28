// Canva Connect API Konfigürasyonu
export const canvaConfig = {
  // Canva Connect API URL'leri
  apiUrl: 'https://api.canva.com/rest/v1',
  authUrl: 'https://www.canva.com/api/oauth/authorize',
  tokenUrl: 'https://api.canva.com/rest/v1/oauth/token',
  
  // Redirect URL'leri (Canva geliştirici panelinde tanımlanmalı)
  redirectUri: 'https://ekartivizit.vercel.app/api/canva/callback',
  returnUrl: 'https://ekartivizit.vercel.app/tasarim-tamamlandi',
  
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
  kartvizit: [
    {
      id: 'DAGZqQqQqQq',
      name: 'Modern Kartvizit',
      description: 'Minimalist ve modern tasarım',
      url: 'https://www.canva.com/design/DAGZqQqQqQq/edit',
      thumbnailUrl: '/templates/kartvizit-modern.jpg'
    },
    {
      id: 'DAGZqQqQqQr',
      name: 'Klasik Kartvizit',
      description: 'Geleneksel ve profesyonel',
      url: 'https://www.canva.com/design/DAGZqQqQqQr/edit',
      thumbnailUrl: '/templates/kartvizit-klasik.jpg'
    },
    {
      id: 'DAGZqQqQqQs',
      name: 'Yaratıcı Kartvizit',
      description: 'Özgün ve dikkat çekici',
      url: 'https://www.canva.com/design/DAGZqQqQqQs/edit',
      thumbnailUrl: '/templates/kartvizit-yaratici.jpg'
    }
  ],
  broşür: [
    {
      id: 'DAGZqRrRrRr',
      name: 'Kurumsal Broşür',
      description: 'Profesyonel kurumsal tasarım',
      url: 'https://www.canva.com/design/DAGZqRrRrRr/edit',
      thumbnailUrl: '/templates/brosur-kurumsal.jpg'
    },
    {
      id: 'DAGZqRrRrRs',
      name: 'Modern Broşür',
      description: 'Çağdaş ve şık tasarım',
      url: 'https://www.canva.com/design/DAGZqRrRrRs/edit',
      thumbnailUrl: '/templates/brosur-modern.jpg'
    }
  ],
  magnet: [
    {
      id: 'DAGZqSsSsSs',
      name: 'Yaratıcı Magnet',
      description: 'Özel tasarım magnet çözümleri',
      url: 'https://www.canva.com/design/DAGZqSsSsSs/edit',
      thumbnailUrl: '/templates/magnet-yaratici.jpg'
    },
    {
      id: 'DAGZqSsSsSt',
      name: 'Kare Magnet',
      description: 'Klasik kare magnet tasarımı',
      url: 'https://www.canva.com/design/DAGZqSsSsSt/edit',
      thumbnailUrl: '/templates/magnet-kare.jpg'
    }
  ]
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