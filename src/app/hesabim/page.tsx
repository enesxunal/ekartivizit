'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { User, Package, LogOut, Eye, EyeOff } from 'lucide-react'

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada gerçek login işlemi yapılacak
    setIsLoggedIn(true)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada gerçek kayıt işlemi yapılacak
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      confirmPassword: ''
    })
  }

  // Örnek sipariş geçmişi
  const orderHistory = [
    {
      id: '2024001',
      date: '15 Ocak 2024',
      status: 'Teslim Edildi',
      total: 1250,
      items: ['Kartvizit (1000 adet)', 'Broşür (500 adet)']
    },
    {
      id: '2024002',
      date: '10 Ocak 2024',
      status: 'Hazırlanıyor',
      total: 800,
      items: ['Magnet (100 adet)']
    }
  ]

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <div className="flex space-x-1 mb-4">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'login'
                      ? 'bg-[#59af05] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'register'
                      ? 'bg-[#59af05] text-white'
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
                  
                  <Button type="submit" className="w-full bg-[#59af05] hover:bg-[#4a9321]">
                    Giriş Yap
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
                  
                  <Button type="submit" className="w-full bg-[#59af05] hover:bg-[#4a9321]">
                    Kayıt Ol
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sol menü */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Hesabım</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-[#59af05] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Profil Bilgileri
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-[#59af05] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Sipariş Geçmişi
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-[#59af05] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Adreslerim
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 flex items-center space-x-2"
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
              <Card>
                <CardHeader>
                  <CardTitle>Profil Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ad Soyad
                        </label>
                        <input
                          type="text"
                          defaultValue="Ahmet Yılmaz"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          E-posta
                        </label>
                        <input
                          type="email"
                          defaultValue="ahmet@example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          defaultValue="0532 123 45 67"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Doğum Tarihi
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                        />
                      </div>
                    </div>
                    <Button className="bg-[#59af05] hover:bg-[#4a9321]">
                      Bilgileri Güncelle
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === 'orders' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Sipariş Geçmişi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Sipariş #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Teslim Edildi'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                            <p className="text-lg font-bold text-[#59af05] mt-1">
                              ₺{order.total.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-sm text-gray-600">• {item}</p>
                          ))}
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm">
                            Detayları Gör
                          </Button>
                          <Button variant="outline" size="sm">
                            Tekrar Sipariş Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'addresses' && (
              <Card>
                <CardHeader>
                  <CardTitle>Adreslerim</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Ev Adresi</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Mustafa Kemal Mah. 2139 Sk. No:15/5<br />
                            Çankaya/Ankara<br />
                            06420
                          </p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Düzenle</Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                            Sil
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="bg-[#59af05] hover:bg-[#4a9321]">
                      Yeni Adres Ekle
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