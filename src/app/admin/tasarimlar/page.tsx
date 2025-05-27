'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Eye, Search, Filter, Calendar } from 'lucide-react'
import { useOrders } from '@/contexts/OrderContext'

interface CustomerDesign {
  id: string
  orderNumber: string
  customerName: string
  productCategory: string
  designTitle: string
  pdfUrl: string
  createdAt: string
  orderStatus: string
  customerEmail: string
}

export default function AdminTasarimlarPage() {
  const [designs, setDesigns] = useState<CustomerDesign[]>([])
  const [filteredDesigns, setFilteredDesigns] = useState<CustomerDesign[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  
  const { orders } = useOrders()

  // Sipariş verilerinden tasarımları çıkar
  useEffect(() => {
    const customerDesigns: CustomerDesign[] = []
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.customDesign) {
          customerDesigns.push({
            id: `${order.id}-${item.customDesign.designId}`,
            orderNumber: order.id,
            customerName: order.customerInfo.name,
            productCategory: item.product.category,
            designTitle: item.customDesign.designTitle,
            pdfUrl: item.customDesign.pdfUrl,
            createdAt: item.customDesign.createdAt,
            orderStatus: order.status,
            customerEmail: order.customerInfo.email
          })
        }
      })
    })
    
    setDesigns(customerDesigns)
    setFilteredDesigns(customerDesigns)
  }, [orders])

  // Filtreleme ve arama
  useEffect(() => {
    let filtered = designs

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(design => 
        design.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.designTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Kategori filtresi
    if (filterCategory !== 'all') {
      filtered = filtered.filter(design => design.productCategory === filterCategory)
    }

    // Durum filtresi
    if (filterStatus !== 'all') {
      filtered = filtered.filter(design => design.orderStatus === filterStatus)
    }

    setFilteredDesigns(filtered)
  }, [designs, searchTerm, filterCategory, filterStatus])

  const downloadPDF = (pdfUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'shipped': return 'bg-indigo-100 text-indigo-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Onay Bekliyor'
      case 'confirmed': return 'Onaylandı'
      case 'processing': return 'Hazırlanıyor'
      case 'shipped': return 'Kargoya Verildi'
      case 'delivered': return 'Teslim Edildi'
      default: return 'Bilinmiyor'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Müşteri Tasarımları
          </h1>
          <p className="text-gray-600">
            Canva ile oluşturulmuş müşteri tasarımlarını görüntüleyin ve indirin
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Toplam Tasarım</p>
                  <p className="text-2xl font-bold text-gray-900">{designs.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Bugün Oluşturulan</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {designs.filter(d => 
                      new Date(d.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Kartvizit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {designs.filter(d => d.productCategory.includes('kartvizit')).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Filter className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">İndirilebilir</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {designs.filter(d => d.pdfUrl).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtreler */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Arama */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Müşteri adı, tasarım adı veya sipariş no..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#59af05] focus:border-transparent"
                />
              </div>

              {/* Kategori Filtresi */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#59af05] focus:border-transparent"
              >
                <option value="all">Tüm Kategoriler</option>
                <option value="kartvizit">Kartvizit</option>
                <option value="broşür">Broşür</option>
                <option value="magnet">Magnet</option>
              </select>

              {/* Durum Filtresi */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#59af05] focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Onay Bekliyor</option>
                <option value="confirmed">Onaylandı</option>
                <option value="processing">Hazırlanıyor</option>
                <option value="shipped">Kargoya Verildi</option>
                <option value="delivered">Teslim Edildi</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Tasarım Listesi */}
        <Card>
          <CardHeader>
            <CardTitle>Tasarım Listesi ({filteredDesigns.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Sipariş No</th>
                    <th className="text-left py-3 px-4">Müşteri</th>
                    <th className="text-left py-3 px-4">Tasarım Adı</th>
                    <th className="text-left py-3 px-4">Kategori</th>
                    <th className="text-left py-3 px-4">Tarih</th>
                    <th className="text-left py-3 px-4">Durum</th>
                    <th className="text-left py-3 px-4">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDesigns.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500">
                        Hiç tasarım bulunamadı
                      </td>
                    </tr>
                  ) : (
                    filteredDesigns.map((design) => (
                      <tr key={design.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">#{design.orderNumber}</td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{design.customerName}</div>
                            <div className="text-sm text-gray-500">{design.customerEmail}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{design.designTitle}</td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {design.productCategory}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(design.createdAt).toLocaleDateString('tr-TR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(design.orderStatus)}`}>
                            {getStatusText(design.orderStatus)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {design.pdfUrl ? (
                              <Button
                                size="sm"
                                onClick={() => downloadPDF(
                                  design.pdfUrl, 
                                  `${design.designTitle}-${design.orderNumber}.pdf`
                                )}
                                className="bg-[#59af05] hover:bg-[#4a9321]"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                PDF İndir
                              </Button>
                            ) : (
                              <span className="text-sm text-gray-400">PDF Hazır Değil</span>
                            )}
                            
                            {design.pdfUrl && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(design.pdfUrl, '_blank')}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Görüntüle
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 