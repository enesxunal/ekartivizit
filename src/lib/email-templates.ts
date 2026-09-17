// E-posta şablonları - Client-side'da da kullanılabilir
export const emailTemplates = {
  // Kullanıcı kayıt onayı
  userRegistration: (userName: string, userEmail: string) => ({
    subject: 'E-Kartvizit\'e Hoş Geldiniz! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #59af05; margin: 0;">E-Kartvizit</h1>
            <p style="color: #666; margin: 5px 0;">Profesyonel Kartvizit Çözümleri</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Hoş Geldiniz ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            E-Kartvizit ailesine katıldığınız için teşekkür ederiz. Artık profesyonel kartvizitler tasarlayabilir ve sipariş verebilirsiniz.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #59af05; margin-top: 0;">Hesap Bilgileriniz:</h3>
            <p style="margin: 5px 0;"><strong>E-posta:</strong> ${userEmail}</p>
            <p style="margin: 5px 0;"><strong>Kayıt Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://ekartvizit.tr" style="background-color: #59af05; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Alışverişe Başla
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
            <p>E-Kartvizit | info@ekartvizit.tr | www.ekartvizit.tr</p>
          </div>
        </div>
      </div>
    `
  }),

  // Sipariş onayı - Müşteri
  orderConfirmationCustomer: (orderData: {
    orderId: string;
    total: number;
    paymentMethod: string;
    customerInfo: { name: string; email: string; address: { street: string; district: string; city: string; postalCode: string } };
    items: Array<{ product: { name: string }; quantity: number; price: number; selectedMaterial?: string; selectedSize?: string }>
  }) => ({
    subject: `Siparişiniz Alındı - #${orderData.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #59af05; margin: 0;">E-Kartvizit</h1>
            <p style="color: #666; margin: 5px 0;">Sipariş Onayı</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Siparişiniz Alındı! 🎉</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Sayın ${orderData.customerInfo.name}, siparişinizi aldık ve en kısa sürede hazırlamaya başlayacağız.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #59af05; margin-top: 0;">Sipariş Detayları:</h3>
            <p style="margin: 5px 0;"><strong>Sipariş No:</strong> #${orderData.orderId}</p>
            <p style="margin: 5px 0;"><strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR')}</p>
            <p style="margin: 5px 0;"><strong>Ödeme Yöntemi:</strong> ${getPaymentMethodName(orderData.paymentMethod)}</p>
            <p style="margin: 5px 0;"><strong>Toplam:</strong> ₺${orderData.total}</p>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #eee; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin: 0; padding: 15px 20px; border-bottom: 1px solid #eee;">Sipariş İçeriği:</h3>
            ${orderData.items.map((item) => `
              <div style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                  <div>
                    <h4 style="margin: 0 0 5px 0; color: #333;">${item.product.name}</h4>
                    <p style="margin: 0; color: #666; font-size: 14px;">Adet: ${item.quantity.toLocaleString()}</p>
                    ${item.selectedMaterial ? `<p style="margin: 0; color: #666; font-size: 14px;">Malzeme: ${item.selectedMaterial}</p>` : ''}
                    ${item.selectedSize ? `<p style="margin: 0; color: #666; font-size: 14px;">Boyut: ${item.selectedSize}</p>` : ''}
                  </div>
                  <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; color: #59af05;">₺${item.price}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #59af05; margin-top: 0;">Teslimat Adresi:</h3>
            <p style="margin: 5px 0; line-height: 1.6;">
              ${orderData.customerInfo.address.street}<br>
              ${orderData.customerInfo.address.district}, ${orderData.customerInfo.address.city}<br>
              ${orderData.customerInfo.address.postalCode}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://ekartvizit.tr/siparis-takip/${orderData.orderId}" style="background-color: #59af05; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Siparişimi Takip Et
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Siparişinizle ilgili sorularınız için: info@ekartvizit.tr</p>
            <p>E-Kartvizit | info@ekartvizit.tr | www.ekartvizit.tr</p>
          </div>
        </div>
      </div>
    `
  }),

  // Sipariş bildirimi - Admin
  orderNotificationAdmin: (orderData: {
    orderId: string;
    total: number;
    paymentMethod: string;
    customerInfo: { name: string; email: string; phone: string; address: { street: string; district: string; city: string } };
    items: Array<{ product: { name: string }; quantity: number; price: number; selectedMaterial?: string; selectedSize?: string }>
  }) => ({
    subject: `🔔 Yeni Sipariş Alındı - #${orderData.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #59af05; margin: 0;">E-Kartvizit</h1>
            <p style="color: #666; margin: 5px 0;">Yeni Sipariş Bildirimi</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Yeni Sipariş Alındı! 🎉</h2>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>⚡ Acil:</strong> Yeni sipariş işleme alınmayı bekliyor.</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #59af05; margin-top: 0;">Sipariş Bilgileri:</h3>
            <p style="margin: 5px 0;"><strong>Sipariş No:</strong> #${orderData.orderId}</p>
            <p style="margin: 5px 0;"><strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}</p>
            <p style="margin: 5px 0;"><strong>Toplam Tutar:</strong> ₺${orderData.total}</p>
            <p style="margin: 5px 0;"><strong>Ödeme Yöntemi:</strong> ${getPaymentMethodName(orderData.paymentMethod)}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #59af05; margin-top: 0;">Müşteri Bilgileri:</h3>
            <p style="margin: 5px 0;"><strong>Ad Soyad:</strong> ${orderData.customerInfo.name}</p>
            <p style="margin: 5px 0;"><strong>E-posta:</strong> ${orderData.customerInfo.email}</p>
            <p style="margin: 5px 0;"><strong>Telefon:</strong> ${orderData.customerInfo.phone}</p>
            <p style="margin: 5px 0;"><strong>Adres:</strong> ${orderData.customerInfo.address.street}, ${orderData.customerInfo.address.district}, ${orderData.customerInfo.address.city}</p>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #eee; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin: 0; padding: 15px 20px; border-bottom: 1px solid #eee;">Sipariş İçeriği:</h3>
            ${orderData.items.map((item) => `
              <div style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                  <div>
                    <h4 style="margin: 0 0 5px 0; color: #333;">${item.product.name}</h4>
                    <p style="margin: 0; color: #666; font-size: 14px;">Adet: ${item.quantity.toLocaleString()}</p>
                    ${item.selectedMaterial ? `<p style="margin: 0; color: #666; font-size: 14px;">Malzeme: ${item.selectedMaterial}</p>` : ''}
                    ${item.selectedSize ? `<p style="margin: 0; color: #666; font-size: 14px;">Boyut: ${item.selectedSize}</p>` : ''}
                  </div>
                  <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; color: #59af05;">₺${item.price}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://ekartvizit.tr/admin/siparisler/${orderData.orderId}" style="background-color: #59af05; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Siparişi Görüntüle
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
            <p>E-Kartvizit Admin Paneli</p>
          </div>
        </div>
      </div>
    `
  }),

  // Sipariş durum güncellemesi
  orderStatusUpdate: (orderData: {
    orderId: string;
    customerInfo: { name: string };
  }, statusData: { status: string; message: string }) => ({
    subject: `Sipariş Durumu Güncellendi - #${orderData.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #59af05; margin: 0;">E-Kartvizit</h1>
            <p style="color: #666; margin: 5px 0;">Sipariş Durum Güncellemesi</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Sipariş Durumu Güncellendi</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Sayın ${orderData.customerInfo.name}, siparişinizin durumu güncellendi.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #59af05; margin-top: 0;">Güncel Durum:</h3>
            <p style="margin: 5px 0;"><strong>Sipariş No:</strong> #${orderData.orderId}</p>
            <p style="margin: 5px 0;"><strong>Durum:</strong> ${statusData.message}</p>
            <p style="margin: 5px 0;"><strong>Güncelleme Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://ekartvizit.tr/siparis-takip/${orderData.orderId}" style="background-color: #59af05; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Siparişimi Takip Et
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Siparişinizle ilgili sorularınız için: info@ekartvizit.tr</p>
            <p>E-Kartvizit | info@ekartvizit.tr | www.ekartvizit.tr</p>
          </div>
        </div>
      </div>
    `
  })
}

// Ödeme yöntemi adlarını çevir
function getPaymentMethodName(method: string): string {
  const methods: Record<string, string> = {
    'whatsapp': 'WhatsApp ile Ödeme',
    'credit-card': 'Kredi Kartı',
    'bank-transfer': 'Banka Havalesi'
  }
  return methods[method] || method
}

// E-posta doğrulama
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
} 