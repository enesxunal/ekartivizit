// Mail konfigürasyonu (şimdilik simüle edilmiş)
const mailConfig = {
  host: process.env.SMTP_HOST || '',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
}

export interface MailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendMail({ to, subject }: MailOptions) {
  try {
    // Şimdilik simüle edilmiş mail gönderimi
    console.log('Mail gönderiliyor:', { to, subject, smtpConfigured: !!mailConfig.host && !!mailConfig.auth.user })
    
    // Gerçek mail gönderimi için nodemailer kullanılacak
    // const transporter = nodemailer.createTransporter(mailConfig)
    // const info = await transporter.sendMail({
    //   from: '"E-Kartvizit" <info@ekartvizit.tr>',
    //   to,
    //   subject,
    //   html,
    //   text: text || html.replace(/<[^>]*>/g, '')
    // })

    const mockMessageId = `mock-${Date.now()}-${Math.random().toString(36).substring(7)}`
    console.log('Mail gönderildi (simüle):', mockMessageId)
    
    return { success: true, messageId: mockMessageId }
  } catch (error) {
    console.error('Mail gönderme hatası:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Bilinmeyen hata' }
  }
}

// Mail şablonları
export const mailTemplates = {
  // Kayıt hoş geldin maili
  welcome: (name: string) => ({
    subject: 'E-Kartvizit\'e Hoş Geldiniz! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #59af05; margin: 0;">E-Kartvizit</h1>
          <p style="color: #666; margin: 5px 0;">Profesyonel Baskı Çözümleri</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">Merhaba ${name}! 👋</h2>
          <p style="color: #666; line-height: 1.6;">
            E-Kartvizit ailesine hoş geldiniz! Hesabınız başarıyla oluşturuldu.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Artık binlerce ürün arasından seçim yapabilir, özel tasarımlarınızı oluşturabilir 
            ve profesyonel baskı hizmetlerimizden faydalanabilirsiniz.
          </p>
        </div>
        
        <div style="background: #59af05; color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0;">İlk Siparişinizde %10 İndirim!</h3>
          <p style="margin: 0; font-size: 18px; font-weight: bold;">Kod: WELCOME10</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://ekartvizit.tr" style="background: #59af05; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Alışverişe Başla
          </a>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
          <p>Bu mail otomatik olarak gönderilmiştir.</p>
          <p>E-Kartvizit | info@ekartvizit.tr | 0850 XXX XX XX</p>
        </div>
      </div>
    `
  }),

  // Sipariş onay maili
  orderConfirmation: (orderData: {
    orderId: string
    customerName: string
    items: Array<{ name: string; quantity: number; price: number }>
    total: number
    trackingNumber?: string
  }) => ({
    subject: `Siparişiniz Alındı - #${orderData.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #59af05; margin: 0;">E-Kartvizit</h1>
          <p style="color: #666; margin: 5px 0;">Sipariş Onayı</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">Merhaba ${orderData.customerName}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Siparişiniz başarıyla alındı ve işleme konuldu.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #59af05; margin-top: 0;">Sipariş Detayları</h3>
            <p><strong>Sipariş No:</strong> #${orderData.orderId}</p>
            ${orderData.trackingNumber ? `<p><strong>Takip No:</strong> ${orderData.trackingNumber}</p>` : ''}
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Ürün</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Adet</th>
                  <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Fiyat</th>
                </tr>
              </thead>
              <tbody>
                ${orderData.items.map(item => `
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
                    <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                    <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${item.price}₺</td>
                  </tr>
                `).join('')}
                <tr style="background: #f5f5f5; font-weight: bold;">
                  <td colspan="2" style="padding: 10px; border: 1px solid #ddd;">TOPLAM</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${orderData.total}₺</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div style="background: #59af05; color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0;">Tahmini Teslimat: 2-3 İş Günü</h3>
          <p style="margin: 0;">Siparişinizin durumunu takip edebilirsiniz.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://ekartvizit.tr/siparislerim" style="background: #59af05; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">
            Siparişlerimi Görüntüle
          </a>
          <a href="https://wa.me/905XXXXXXXXX" style="background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            WhatsApp Destek
          </a>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
          <p>Bu mail otomatik olarak gönderilmiştir.</p>
          <p>E-Kartvizit | info@ekartvizit.tr | 0850 XXX XX XX</p>
        </div>
      </div>
    `
  }),

  // Sipariş durum güncelleme
  orderStatusUpdate: (orderData: {
    orderId: string
    customerName: string
    status: string
    trackingNumber?: string
  }) => {
    const statusMessages = {
      confirmed: 'Siparişiniz onaylandı ve hazırlanmaya başlandı.',
      preparing: 'Siparişiniz hazırlanıyor.',
      printing: 'Siparişiniz basılıyor.',
      shipping: 'Siparişiniz kargoya verildi.',
      delivered: 'Siparişiniz teslim edildi.'
    }

    return {
      subject: `Sipariş Güncelleme - #${orderData.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #59af05; margin: 0;">E-Kartvizit</h1>
            <p style="color: #666; margin: 5px 0;">Sipariş Güncelleme</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Merhaba ${orderData.customerName}!</h2>
            <p style="color: #666; line-height: 1.6;">
              Sipariş #${orderData.orderId} durumunda güncelleme var:
            </p>
            
            <div style="background: #59af05; color: white; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
              <h3 style="margin: 0;">${statusMessages[orderData.status as keyof typeof statusMessages] || 'Sipariş durumu güncellendi.'}</h3>
              ${orderData.trackingNumber ? `<p style="margin: 10px 0 0 0;">Takip No: ${orderData.trackingNumber}</p>` : ''}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://ekartvizit.tr/siparislerim" style="background: #59af05; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Sipariş Detayını Görüntüle
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
            <p>Bu mail otomatik olarak gönderilmiştir.</p>
            <p>E-Kartvizit | info@ekartvizit.tr | 0850 XXX XX XX</p>
          </div>
        </div>
      `
    }
  }
} 