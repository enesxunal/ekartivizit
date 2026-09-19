'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'
import { useOrders } from '@/contexts/OrderContext'
import { useToast } from '@/contexts/ToastContext'
import { User, Package, LogOut, Eye, EyeOff, MapPin, Phone, Mail, Edit } from 'lucide-react'

export default function AccountPage() {
  const { user, isAuthenticated, login, register, logout, updateProfile, isLoading } = useAuth()
  const { addToast } = useToast()
  const { orders } = useOrders()
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  })

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      district: user?.address?.district || '',
      postalCode: user?.address?.postalCode || ''
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      addToast({
        type: 'error',
        title: 'Eksik Bilgi',
        description: 'E-posta ve şifre alanları zorunludur'
      })
      return
    }

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      addToast({
        type: 'success',
        title: 'Giriş Başarılı! 🎉',
        description: result.message
      })
    } else {
      addToast({
        type: 'error',
        title: 'Giriş Hatası',
        description: result.message
      })
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      addToast({
        type: 'error',
        title: 'Eksik Bilgi',
        description: 'Tüm alanları doldurunuz'
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      addToast({
        type: 'error',
        title: 'Şifre Hatası',
        description: 'Şifreler eşleşmiyor'
      })
      return
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    })
    
    if (result.success) {
      addToast({
        type: 'success',
        title: 'Kayıt Başarılı! 🎉',
        description: result.message
      })
    } else {
      addToast({
        type: 'error',
        title: 'Kayıt Hatası',
        description: result.message
      })
    }
  }

  const handleLogout = () => {
    logout()
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      confirmPassword: ''
    })
    addToast({
      type: 'info',
      title: 'Çıkış Yapıldı',
      description: 'Başarıyla çıkış yaptınız'
    })
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await updateProfile(profileData)
    
    if (result.success) {
      setIsEditing(false)
      addToast({
        type: 'success',
        title: 'Profil Güncellendi! ✅',
        description: result.message
      })
    } else {
      addToast({
        type: 'error',
        title: 'Güncelleme Hatası',
        description: result.message
      })
    }
  }

  // Kullanıcının sipariş geçmişini server-side kayıtlardan al
  const getUserOrders = () => {
    if (!user) return []
    return orders
      .filter((order) => order.userId === user.id || order.customerInfo.email === user.email)
      .map((order) => ({
        id: order.id,
        date: new Date(order.createdAt).toLocaleDateString('tr-TR'),
        status: getOrderStatusText(order.status),
        total: order.total,
        items: order.items.map((item) => `${item.product.name} (${item.quantity} adet)`)
      }))
  }

  const getOrderStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'Beklemede',
      'confirmed': 'Onaylandı',
      'preparing': 'Hazırlanıyor',
      'printing': 'Basılıyor',
      'shipping': 'Kargoda',
      'delivered': 'Teslim Edildi',
      'cancelled': 'İptal Edildi'
    }
    return statusMap[status] || status
  }

  const orderHistory = getUserOrders()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
        <Header />
        
        <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="rounded-[28px] border-black/8 shadow-none">
            <CardHeader>
              <div className="flex space-x-1 mb-4">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-2xl transition-colors ${
                    activeTab === 'login'
                      ? 'bg-[#171a16] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-2xl transition-colors ${
                    activeTab === 'register'
                      ? 'bg-[#171a16] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Kayıt Ol
                </button>
              </div>
              <CardTitle className="text-center">
                {activeTab === 'login' ? 'Hesabınıza Giriş Yapın' : 'Yeni Hesap Oluşturun'}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-[#171a16] hover:bg-black"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                  </Button>
                  
                  <div className="text-center">
                    <Link href="/sifremi-unuttum" className="text-sm text-[#59af05] hover:underline">
                      Şifremi Unuttum
                    </Link>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre Tekrar
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-[#171a16] hover:bg-black"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      
      <main className="site-container py-10 sm:py-12 lg:py-16">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-[-0.035em] text-[#171a16]">Hoş Geldiniz, {user?.name}!</h1>
          <p className="text-[#687067]">Hesap bilgilerinizi yönetin ve siparişlerinizi takip edin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sol menü */}
          <div className="lg:col-span-1">
            <Card className="rounded-[28px] border-black/8 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Hesabım</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-3 py-2 rounded-2xl transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-[#171a16] text-white'
                      : 'hover:bg-black/5'
                  }`}
                >
                  Profil Bilgileri
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-3 py-2 rounded-2xl transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-[#171a16] text-white'
                      : 'hover:bg-black/5'
                  }`}
                >
                  Sipariş Geçmişi
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-3 py-2 rounded-2xl transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-[#171a16] text-white'
                      : 'hover:bg-black/5'
                  }`}
                >
                  Adreslerim
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-2xl hover:bg-red-50 text-red-600 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Çıkış Yap</span>
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Ana içerik */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card className="rounded-[28px] border-black/8 shadow-none">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Profil Bilgileri</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'İptal' : 'Düzenle'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Ad Soyad</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefon</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Adres Bilgileri</h3>
                        <div>
                          <Label htmlFor="address.street">Adres</Label>
                          <Input
                            id="address.street"
                            name="address.street"
                            value={profileData.address.street}
                            onChange={handleProfileChange}
                            placeholder="Mahalle, sokak, bina no, daire no"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="address.city">İl</Label>
                            <Input
                              id="address.city"
                              name="address.city"
                              value={profileData.address.city}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="address.district">İlçe</Label>
                            <Input
                              id="address.district"
                              name="address.district"
                              value={profileData.address.district}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="address.postalCode">Posta Kodu</Label>
                            <Input
                              id="address.postalCode"
                              name="address.postalCode"
                              value={profileData.address.postalCode}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          İptal
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-[#687067]">Ad Soyad</p>
                            <p className="font-medium">{user?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-[#687067]">E-posta</p>
                            <p className="font-medium">{user?.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-[#687067]">Telefon</p>
                            <p className="font-medium">{user?.phone || 'Belirtilmemiş'}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-[#687067]">Adres</p>
                            <p className="font-medium">
                              {user?.address?.street ? 
                                `${user.address.street}, ${user.address.district}, ${user.address.city}` : 
                                'Belirtilmemiş'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'orders' && (
              <Card className="rounded-[28px] border-black/8 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Sipariş Geçmişi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orderHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz sipariş yok</h3>
                      <p className="text-[#687067] mb-4">İlk siparişinizi vererek alışverişe başlayın</p>
                      <Link href="/">
                        <Button className="rounded-full bg-[#171a16] hover:bg-black">
                          Alışverişe Başla
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orderHistory.map((order: { id: string; date: string; status: string; total: number; items: string[] }) => (
                      <div key={order.id} className="border border-black/8 rounded-2xl p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">Sipariş #{order.id}</h3>
                            <p className="text-sm text-[#687067]">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Teslim Edildi' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                            <p className="text-lg font-bold text-[#59af05] mt-1">₺{order.total}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item: string, index: number) => (
                            <p key={index} className="text-sm text-[#687067]">• {item}</p>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <Link href={`/siparis/${order.id}`}>
                            <Button variant="outline" size="sm">
                              Sipariş İncele
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'addresses' && (
              <Card className="rounded-[28px] border-black/8 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Adreslerim</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz adres eklenmemiş</h3>
                    <p className="text-[#687067] mb-4">Hızlı teslimat için adres bilgilerinizi ekleyin</p>
                    <Button 
                      className="rounded-full bg-[#171a16] hover:bg-black"
                      onClick={() => setActiveTab('profile')}
                    >
                      Adres Ekle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 