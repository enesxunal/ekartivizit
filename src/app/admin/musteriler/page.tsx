'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Search,
  Mail,
  Phone,
  Package,
  Eye,
  UserCheck
} from 'lucide-react'
import Link from 'next/link'
import { useOrders } from '@/contexts/OrderContext'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  status: 'active' | 'inactive'
  joinDate: string
  orders: unknown[]
}

export default function CustomersPage() {
  const { orders } = useOrders()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Müşteri verilerini sipariş verilerinden türetelim
  const customers = useMemo(() => {
    const customerMap = new Map<string, Customer>()

    orders.forEach(order => {
      const customerId = order.customerInfo.email
      const existingCustomer = customerMap.get(customerId)

      if (existingCustomer) {
        existingCustomer.totalOrders += 1
        existingCustomer.totalSpent += order.total
        existingCustomer.orders.push(order)
        
        // En son sipariş tarihi
        if (new Date(order.createdAt) > new Date(existingCustomer.lastOrderDate)) {
          existingCustomer.lastOrderDate = order.createdAt
        }
      } else {
        customerMap.set(customerId, {
          id: customerId,
          name: order.customerInfo.name,
          email: order.customerInfo.email,
          phone: order.customerInfo.phone,
          totalOrders: 1,
          totalSpent: order.total,
          lastOrderDate: order.createdAt,
          status: 'active',
          joinDate: order.createdAt,
          orders: [order]
        })
      }
    })

    return Array.from(customerMap.values()).sort((a, b) => 
      new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
    )
  }, [orders])

  // Filtreleme
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // İstatistikler
  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === 'active').length
  const avgOrderValue = customers.length > 0 
    ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Müşteriler</h1>
              <p className="text-gray-600">Müşteri bilgileri ve sipariş geçmişi</p>
            </div>
            <div className="flex gap-4">
              <Link href="/admin">
                <Button variant="outline">Panele Dön</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Toplam Müşteri</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Aktif Müşteri</p>
                  <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ortalama Sipariş</p>
                  <p className="text-2xl font-bold text-purple-600">₺{avgOrderValue.toFixed(0)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtreler */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Arama */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Müşteri ara (isim, email, telefon)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Durum Filtresi */}
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'Tümü' },
                  { value: 'active', label: 'Aktif' },
                  { value: 'inactive', label: 'Pasif' }
                ].map((status) => (
                  <Button
                    key={status.value}
                    variant={statusFilter === status.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status.value)}
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Müşteriler Listesi */}
        <div className="space-y-4">
          {filteredCustomers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Müşteri bulunamadı</h3>
                <p className="text-gray-600">Filtrelere uygun müşteri yok.</p>
              </CardContent>
            </Card>
          ) : (
            filteredCustomers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Sol Taraf - Müşteri Bilgileri */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-lg">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{customer.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </span>
                          </div>
                        </div>
                        <Badge className={customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {customer.status === 'active' ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>

                      {/* İstatistikler */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Toplam Sipariş</div>
                          <div className="font-semibold text-gray-900">{customer.totalOrders}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Toplam Harcama</div>
                          <div className="font-semibold text-gray-900">₺{customer.totalSpent.toFixed(0)}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Son Sipariş</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(customer.lastOrderDate).toLocaleDateString('tr-TR')}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Üyelik Tarihi</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(customer.joinDate).toLocaleDateString('tr-TR')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sağ Taraf - Aksiyonlar */}
                    <div className="lg:w-48 flex lg:flex-col gap-2">
                      <Link href={`/admin/musteriler/${customer.id}`}>
                        <Button size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Detaylar
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="w-full">
                        <Package className="w-4 h-4 mr-2" />
                        Siparişler ({customer.totalOrders})
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        E-posta Gönder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 