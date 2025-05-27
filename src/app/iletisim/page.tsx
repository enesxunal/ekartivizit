'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData)
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adres',
      content: 'Mustafa Kemal Mah. 2139 Sk. 15/5 Çankaya/Ankara',
      action: 'Haritada Gör'
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: '0 850 840 30 11',
      action: 'Hemen Ara'
    },
    {
      icon: Mail,
      title: 'E-posta',
      content: 'info@ekartvizit.co',
      action: 'E-posta Gönder'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      content: 'Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 09:00 - 14:00',
      action: null
    }
  ]

  const socialMedia = [
    { icon: Instagram, name: 'Instagram', handle: '@e.kartvizit', color: 'bg-pink-500' },
    { icon: Facebook, name: 'Facebook', handle: 'E-Kartvizit', color: 'bg-blue-600' },
    { icon: Twitter, name: 'Twitter', handle: '@ekartvizit', color: 'bg-blue-400' },
    { icon: Linkedin, name: 'LinkedIn', handle: 'E-Kartvizit', color: 'bg-blue-700' }
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#59af05] to-[#4a9321] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              İletişim
            </h1>
            <p className="text-xl mb-8">
              Sorularınız, önerileriniz veya projeleriniz için bizimle iletişime geçin. 
              Uzman ekibimiz size en iyi hizmeti sunmaya hazır.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-[#59af05] hover:bg-gray-100">
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp ile İletişim
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#59af05]">
                  Bize Mesaj Gönderin
                </CardTitle>
                <p className="text-gray-600">
                  Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz. 
                  En kısa sürede size dönüş yapacağız.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Adınızı ve soyadınızı girin"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="E-posta adresinizi girin"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Telefon numaranızı girin"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Konu *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Mesaj konusunu girin"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesaj *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Mesajınızı detaylı olarak yazın..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05] focus:border-transparent"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-[#59af05] hover:bg-[#4a9321]"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Mesajı Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#59af05]">
                  İletişim Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#59af05] text-white rounded-lg flex items-center justify-center">
                        <info.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 text-sm whitespace-pre-line mb-2">
                        {info.content}
                      </p>
                      {info.action && (
                        <Button variant="outline" size="sm">
                          {info.action}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#59af05]">
                  Sosyal Medya
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {socialMedia.map((social, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-10 h-10 ${social.color} text-white rounded-lg flex items-center justify-center`}>
                        <social.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{social.name}</p>
                        <p className="text-sm text-gray-600">{social.handle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#59af05]">
                  Hızlı İletişim
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Telefon
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  E-posta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ofisimizi Ziyaret Edin
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ankara Çankaya&apos;da bulunan ofisimize gelerek ürünlerimizi yakından inceleyebilir, 
              uzman ekibimizle yüz yüze görüşebilirsiniz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Google Maps Embed */}
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#59af05] to-[#4a9321] flex items-center justify-center text-white">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Harita Yükleniyor...</h3>
                    <p>Mustafa Kemal Mah. 2139 Sk. 15/5 Çankaya/Ankara</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#59af05]">
                    Nasıl Ulaşırsınız?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Toplu Taşıma</h4>
                    <p className="text-sm text-gray-600">
                      Kızılay Metro İstasyonu&apos;ndan 15 dakika yürüme mesafesinde. 
                      Çankaya Belediyesi durağından 5 dakika.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Araç ile</h4>
                    <p className="text-sm text-gray-600">
                      Çankaya Caddesi üzerinden kolayca ulaşabilirsiniz. 
                      Ücretsiz otopark imkanı mevcuttur.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Çalışma Saatleri</h4>
                    <p className="text-sm text-gray-600">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi: 09:00 - 14:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                  
                  <Button className="w-full bg-[#59af05] hover:bg-[#4a9321]">
                    <MapPin className="h-4 w-4 mr-2" />
                    Haritada Aç
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En çok merak edilen sorular ve cevapları. Daha fazlası için SSS sayfamızı ziyaret edin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Minimum sipariş adedi nedir?
                </h3>
                <p className="text-gray-600 text-sm">
                  Kartvizit için 1000 adet, broşür için 1000 adet minimum sipariş alıyoruz.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Üretim süresi ne kadar?
                </h3>
                <p className="text-gray-600 text-sm">
                  Standart ürünler için 2-3 iş günü, özel tasarım için 3-5 iş günü.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Kargo ücreti var mı?
                </h3>
                <p className="text-gray-600 text-sm">
                  500₺ ve üzeri siparişlerde kargo ücretsiz, altında 25₺ kargo ücreti.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Tüm SSS&apos;leri Görüntüle
            </Button>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
} 