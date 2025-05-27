// Canva Apps SDK Entegrasyonu
export interface CanvaConfig {
  appId: string
  clientSecret: string
  redirectUri: string
  environment: 'development' | 'production'
}

export interface CanvaTemplate {
  id: string
  name: string
  category: 'kartvizit' | 'broşür' | 'magnet' | 'diğer'
  thumbnailUrl: string
  designUrl: string
  dimensions: {
    width: number
    height: number
  }
}

export interface CanvaDesign {
  id: string
  title: string
  urls: {
    editUrl: string
    viewUrl: string
  }
  exportUrls?: {
    pdf?: string
    png?: string
    jpg?: string
  }
  status: 'draft' | 'published' | 'exported'
  createdAt: string
  updatedAt: string
}

export interface CanvaExportRequest {
  designId: string
  format: 'pdf' | 'png' | 'jpg'
  quality: 'standard' | 'high'
}

export interface CanvaExportResponse {
  exportId: string
  status: 'pending' | 'completed' | 'failed'
  downloadUrl?: string
  error?: string
}

// Canva API Sınıfı
export class CanvaAPI {
  private config: CanvaConfig
  private baseUrl: string

  constructor(config: CanvaConfig) {
    this.config = config
    this.baseUrl = config.environment === 'production' 
      ? 'https://api.canva.com/rest/v1' 
      : 'https://api.canva.com/rest/v1'
  }

  // Kullanıcı kimlik doğrulama URL'si oluştur
  getAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.appId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'design:content:read design:content:write design:meta:read',
      ...(state && { state })
    })

    return `https://www.canva.com/api/oauth/authorize?${params.toString()}`
  }

  // Access token alma
  async getAccessToken(code: string): Promise<string> {
    const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: this.config.appId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Canva auth error: ${data.error_description || data.error}`)
    }

    return data.access_token
  }

  // Şablonlardan tasarım oluştur
  async createDesignFromTemplate(
    accessToken: string, 
    templateId: string, 
    title: string
  ): Promise<CanvaDesign> {
    const response = await fetch(`${this.baseUrl}/designs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        design_type: 'presentation',
        title,
        template_id: templateId,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Canva API error: ${data.error_description || data.error}`)
    }

    return {
      id: data.design.id,
      title: data.design.title,
      urls: data.design.urls,
      status: 'draft',
      createdAt: data.design.created_at,
      updatedAt: data.design.updated_at,
    }
  }

  // Boş tasarım oluştur
  async createBlankDesign(
    accessToken: string, 
    title: string, 
    category: string,
    dimensions?: { width: number; height: number }
  ): Promise<CanvaDesign> {
    const designType = this.getDesignType(category)
    
    const response = await fetch(`${this.baseUrl}/designs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        design_type: designType,
        title,
        ...(dimensions && { 
          dimensions: {
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`
          }
        }),
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Canva API error: ${data.error_description || data.error}`)
    }

    return {
      id: data.design.id,
      title: data.design.title,
      urls: data.design.urls,
      status: 'draft',
      createdAt: data.design.created_at,
      updatedAt: data.design.updated_at,
    }
  }

  // Tasarımı export et
  async exportDesign(
    accessToken: string, 
    designId: string, 
    format: 'pdf' | 'png' | 'jpg' = 'pdf'
  ): Promise<CanvaExportResponse> {
    const response = await fetch(`${this.baseUrl}/designs/${designId}/export`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        format: {
          type: format,
          ...(format === 'pdf' && { quality: 'high' }),
        },
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Canva export error: ${data.error_description || data.error}`)
    }

    return {
      exportId: data.job.id,
      status: data.job.status,
      downloadUrl: data.job.url,
    }
  }

  // Export durumunu kontrol et
  async checkExportStatus(
    accessToken: string, 
    exportId: string
  ): Promise<CanvaExportResponse> {
    const response = await fetch(`${this.baseUrl}/exports/${exportId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Canva API error: ${data.error_description || data.error}`)
    }

    return {
      exportId: data.job.id,
      status: data.job.status,
      downloadUrl: data.job.url,
      error: data.job.error,
    }
  }

  // Tasarım kategorisine göre Canva design type belirle
  private getDesignType(category: string): string {
    switch (category.toLowerCase()) {
      case 'kartvizit':
        return 'business_card'
      case 'broşür':
        return 'flyer'
      case 'magnet':
        return 'custom'
      default:
        return 'custom'
    }
  }

  // Kullanıcının tasarımlarını listele
  async getUserDesigns(accessToken: string): Promise<CanvaDesign[]> {
    const response = await fetch(`${this.baseUrl}/designs`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Canva API error: ${data.error_description || data.error}`)
    }

    return data.items.map((design: any) => ({
      id: design.id,
      title: design.title,
      urls: design.urls,
      status: 'draft',
      createdAt: design.created_at,
      updatedAt: design.updated_at,
    }))
  }
}

// Canva konfigürasyonu
export const canvaConfig: CanvaConfig = {
  appId: process.env.NEXT_PUBLIC_CANVA_APP_ID || '',
  clientSecret: process.env.CANVA_CLIENT_SECRET || '',
  redirectUri: process.env.NEXT_PUBLIC_CANVA_REDIRECT_URI || 'http://localhost:3000/canva/callback',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}

// Canva API instance
export const canvaAPI = new CanvaAPI(canvaConfig)

// Şablon kategorileri
export const templateCategories = {
  kartvizit: {
    name: 'Kartvizit',
    dimensions: { width: 1050, height: 600 }, // 3.5" x 2" in pixels at 300 DPI
    templates: [
      {
        id: 'template-kartvizit-1',
        name: 'Modern Kartvizit',
        thumbnailUrl: '/templates/kartvizit-modern.jpg',
      },
      {
        id: 'template-kartvizit-2',
        name: 'Klasik Kartvizit',
        thumbnailUrl: '/templates/kartvizit-klasik.jpg',
      },
      {
        id: 'template-kartvizit-3',
        name: 'Yaratıcı Kartvizit',
        thumbnailUrl: '/templates/kartvizit-yaratici.jpg',
      },
    ],
  },
  broşür: {
    name: 'Broşür',
    dimensions: { width: 2481, height: 3508 }, // A4 at 300 DPI
    templates: [
      {
        id: 'template-brosur-1',
        name: 'Kurumsal Broşür',
        thumbnailUrl: '/templates/brosur-kurumsal.jpg',
      },
      {
        id: 'template-brosur-2',
        name: 'Modern Broşür',
        thumbnailUrl: '/templates/brosur-modern.jpg',
      },
    ],
  },
  magnet: {
    name: 'Magnet',
    dimensions: { width: 1050, height: 1050 }, // Square magnet
    templates: [
      {
        id: 'template-magnet-1',
        name: 'Kare Magnet',
        thumbnailUrl: '/templates/magnet-kare.jpg',
      },
      {
        id: 'template-magnet-2',
        name: 'Yuvarlak Magnet',
        thumbnailUrl: '/templates/magnet-yuvarlak.jpg',
      },
    ],
  },
} 