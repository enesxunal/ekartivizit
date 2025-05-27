'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Mail, Send, CheckCircle, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function EmailTestPage() {
  const [recipient, setRecipient] = useState('')
  const [emailType, setEmailType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState<Array<{
    id: string
    type: string
    recipient: string
    status: 'success' | 'error' | 'pending'
    message: string
    timestamp: string
  }>>([])

  const emailTypes = [
    { value: 'welcome', label: 'Hoş Geldin E-postası', description: 'Kullanıcı kayıt olduğunda gönderilir' },
    { value: 'order-confirmation', label: 'Sipariş Onayı', description: 'Müşteri sipariş verdiğinde gönderilir' },
    { value: 'order-status', label: 'Durum Güncellemesi', description: 'Sipariş durumu değiştiğinde gönderilir' },
    { value: 'admin-notification', label: 'Admin Bildirimi', description: 'Yeni sipariş geldiğinde admin\'e gönderilir' }
  ]

  const sendTestEmail = async () => {
    if (!recipient || !emailType) {
      alert('Lütfen e-posta adresi ve e-posta türü seçin!')
      return
    }

    setIsLoading(true)
    const testId = Date.now().toString()

    // Pending durumunu ekle
    setTestResults(prev => [{
      id: testId,
      type: emailType,
      recipient,
      status: 'pending',
      message: 'Gönderiliyor...',
      timestamp: new Date().toLocaleString('tr-TR')
    }, ...prev])

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: emailType,
          recipient,
          data: {
            name: 'Test Kullanıcı',
            orderId: 'TEST' + Date.now(),
            phone: '0555 123 45 67',
            total: 150,
            paymentMethod: 'whatsapp',
            status: 'confirmed',
            statusMessage: 'Sipariş Onaylandı',
            items: [
              {
                product: { name: 'Test Kartvizit' },
                quantity: 1000,
                price: 150,
                selectedMaterial: 'Mat Kuşe',
                selectedSize: '9x5 cm'
              }
            ],
            address: {
              street: 'Test Sokak No:1 Daire:5',
              city: 'İstanbul',
              district: 'Kadıköy',
              postalCode: '34000'
            }
          }
        })
      })

      const result = await response.json()

      // Sonucu güncelle
      setTestResults(prev => prev.map(test => 
        test.id === testId 
          ? {
              ...test,
              status: result.success ? 'success' : 'error',
              message: result.success ? `Başarılı (ID: ${result.messageId})` : result.error
            }
          : test
      ))

    } catch (error) {
      // Hata durumunu güncelle
      setTestResults(prev => prev.map(test => 
        test.id === testId 
          ? {
              ...test,
              status: 'error' as const,
              message: 'Network hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')
            }
          : test
      ))
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />
      case 'pending': return <Clock className="w-5 h-5 text-orange-600" />
    }
  }

  const getStatusBadge = (status: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success': return <Badge className="bg-green-100 text-green-800">Başarılı</Badge>
      case 'error': return <Badge className="bg-red-100 text-red-800">Hata</Badge>
      case 'pending': return <Badge className="bg-orange-100 text-orange-800">Bekliyor</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">E-posta Test</h1>
              <p className="text-gray-600">E-posta şablonlarını test edin</p>
            </div>
            <div className="flex gap-4">
              <Link href="/admin">
                <Button variant="outline">Panele Dön</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Formu */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  E-posta Testi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="recipient">Alıcı E-posta Adresi</Label>
                  <Input
                    id="recipient"
                    type="email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="test@example.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="emailType">E-posta Türü</Label>
                  <Select value={emailType} onValueChange={setEmailType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="E-posta türü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {emailTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-gray-500">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={sendTestEmail}
                  disabled={isLoading || !recipient || !emailType}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Test E-postası Gönder
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* E-posta Türleri Bilgi */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>E-posta Türleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailTypes.map((type) => (
                    <div key={type.value} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900">{type.label}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Sonuçları */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Test Sonuçları</CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Henüz test yapılmadı</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {testResults.map((result) => (
                      <div key={result.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.status)}
                            <span className="font-medium">
                              {emailTypes.find(t => t.value === result.type)?.label}
                            </span>
                          </div>
                          {getStatusBadge(result.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div><strong>Alıcı:</strong> {result.recipient}</div>
                          <div><strong>Durum:</strong> {result.message}</div>
                          <div><strong>Zaman:</strong> {result.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* E-posta Konfigürasyonu Bilgisi */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>E-posta Konfigürasyonu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Mevcut Ayarlar:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>SMTP Sunucu:</strong> mail.ekartvizit.co
                </div>
                <div>
                  <strong>Port:</strong> 465 (SSL)
                </div>
                <div>
                  <strong>Gönderen:</strong> info@ekartvizit.co
                </div>
                <div>
                  <strong>Güvenlik:</strong> SSL/TLS
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 