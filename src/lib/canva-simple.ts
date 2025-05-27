// Basit Canva Entegrasyonu - Test Amaçlı
export interface SimpleCanvaConfig {
  appId: string
  redirectUri: string
}

export class SimpleCanvaIntegration {
  private config: SimpleCanvaConfig

  constructor(config: SimpleCanvaConfig) {
    this.config = config
  }

  // Canva editör URL'si oluştur
  createDesignUrl(category: string, templateId?: string): string {
    
    if (templateId) {
      // Gerçek template ID'si varsa direkt template URL'si
      return `https://www.canva.com/design/${templateId}/edit`
    }
    
    // Boş tasarım için - yeni Canva URL formatı
    return `https://www.canva.com/create/business-cards/`
  }

  // Canva'da tasarım yap ve geri dön URL'si
  createDesignWithCallback(category: string, templateId?: string): string {
    const designUrl = this.createDesignUrl(category, templateId)
    const returnUrl = encodeURIComponent(this.config.redirectUri)
    
    // Canva'nın callback sistemini kullan
    return `${designUrl}?return_to=${returnUrl}`
  }

  // Embed URL oluştur (iframe için)
  createEmbedUrl(category: string, templateId?: string): string {
    const designUrl = this.createDesignUrl(category, templateId)
    return `${designUrl}?embed=true`
  }
}

// Basit konfigürasyon
export const simpleCanvaConfig: SimpleCanvaConfig = {
  appId: process.env.NEXT_PUBLIC_CANVA_APP_ID || '',
  redirectUri: process.env.NEXT_PUBLIC_CANVA_REDIRECT_URI || 'http://localhost:3000/canva/callback',
}

export const simpleCanva = new SimpleCanvaIntegration(simpleCanvaConfig)

// Template ID'leri (gerçek Canva template ID'leri ile değiştirilecek)
export const canvaTemplates = {
  kartvizit: [
    {
      id: 'DAFdGI1Dab4', // Örnek template ID
      name: 'Modern Kartvizit',
      thumbnailUrl: '/templates/kartvizit-modern.jpg',
    },
    {
      id: 'DAFdGI1Dab5', // Örnek template ID  
      name: 'Klasik Kartvizit',
      thumbnailUrl: '/templates/kartvizit-klasik.jpg',
    }
  ],
  broşür: [
    {
      id: 'DAFdGI1Dab6', // Örnek template ID
      name: 'Kurumsal Broşür', 
      thumbnailUrl: '/templates/brosur-kurumsal.jpg',
    }
  ],
  magnet: [
    {
      id: 'DAFdGI1Dab7', // Örnek template ID
      name: 'Kare Magnet',
      thumbnailUrl: '/templates/magnet-kare.jpg',
    }
  ]
} 