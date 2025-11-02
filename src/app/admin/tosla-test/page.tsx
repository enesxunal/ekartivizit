'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { testToslaConnection, processToslaPayment } from '@/lib/tosla'
import { CheckCircle, AlertCircle, Loader2, CreditCard, TestTube } from 'lucide-react'

export default function ToslaTestPage() {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [testMessage, setTestMessage] = useState('')
  const [testDetails, setTestDetails] = useState<{ success: boolean; message: string; details?: unknown } | null>(null)
  
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [paymentMessage, setPaymentMessage] = useState('')
  const [paymentDetails, setPaymentDetails] = useState<{ paymentId?: string; redirectUrl?: string; errorCode?: string } | null>(null)

  // Test ödeme verileri
  const [testPaymentData, setTestPaymentData] = useState({
    amount: 1.00,
    currency: 'TRY',
    orderId: `TEST-${Date.now()}`,
    customerName: 'Test Müşteri',
    customerEmail: 'test@example.com',
    customerPhone: '05551234567',
    cardNumber: '4111111111111111', // Test kart numarası
    expiryMonth: '12',
    expiryYear: '2025',
    cvc: '123',
    cardHolderName: 'Test Müşteri'
  })

  // Bağlantı testi
  const handleConnectionTest = async () => {
    setTestStatus('testing')
    setTestMessage('')
    setTestDetails(null)

    try {
      const result = await testToslaConnection()
      
      if (result.success) {
        setTestStatus('success')
        setTestMessage(result.message)
        setTestDetails({ success: result.success, message: result.message, details: result.details })
      } else {
        setTestStatus('error')
        setTestMessage(result.message)
        setTestDetails({ success: result.success, message: result.message, details: result.details })
      }
    } catch (error) {
      setTestStatus('error')
      setTestMessage('Test sırasında hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'))
    }
  }

  // Test ödeme
  const handleTestPayment = async () => {
    setPaymentStatus('processing')
    setPaymentMessage('')
    setPaymentDetails(null)

    try {
      const paymentRequest = {
        amount: testPaymentData.amount,
        currency: testPaymentData.currency,
        orderId: testPaymentData.orderId,
        customerInfo: {
          name: testPaymentData.customerName,
          email: testPaymentData.customerEmail,
          phone: testPaymentData.customerPhone
        },
        cardInfo: {
          cardNumber: testPaymentData.cardNumber,
          expiryMonth: testPaymentData.expiryMonth,
          expiryYear: testPaymentData.expiryYear,
          cvc: testPaymentData.cvc,
          cardHolderName: testPaymentData.cardHolderName
        },
        returnUrl: `${window.location.origin}/admin/tosla-test?success=true`,
        cancelUrl: `${window.location.origin}/admin/tosla-test?cancel=true`
      }

      const result = await processToslaPayment(paymentRequest)
      
      if (result.success) {
        setPaymentStatus('success')
        setPaymentMessage('Test ödeme başarılı!')
        setPaymentDetails({
          paymentId: result.paymentId,
          redirectUrl: result.redirectUrl
        })
      } else {
        setPaymentStatus('error')
        setPaymentMessage(result.errorMessage || 'Test ödeme başarısız')
        setPaymentDetails({
          errorCode: result.errorCode
        })
      }
    } catch (error) {
      setPaymentStatus('error')
      setPaymentMessage('Test ödeme sırasında hata: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setTestPaymentData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tosla Entegrasyon Testi</h1>
          <p className="text-gray-600">Tosla ödeme sistemi entegrasyonunu test edin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bağlantı Testi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Bağlantı Testi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Tosla API bağlantısını test eder ve kimlik doğrulama bilgilerini kontrol eder.
              </p>
              
              <Button 
                onClick={handleConnectionTest}
                disabled={testStatus === 'testing'}
                className="w-full"
              >
                {testStatus === 'testing' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Test Ediliyor...
                  </>
                ) : (
                  'Bağlantıyı Test Et'
                )}
              </Button>

              {testStatus !== 'idle' && (
                <div className={`p-4 rounded-lg ${
                  testStatus === 'success' ? 'bg-green-50 border border-green-200' :
                  testStatus === 'error' ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center gap-2">
                    {testStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : testStatus === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    )}
                    <span className={`font-medium ${
                      testStatus === 'success' ? 'text-green-800' :
                      testStatus === 'error' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>
                      {testMessage}
                    </span>
                  </div>
                  
                  {testDetails && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-medium">Detayları Göster</summary>
                      <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                        {JSON.stringify(testDetails, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Ödeme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Test Ödeme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Test kartı ile 1₺&apos;lik ödeme işlemi gerçekleştirir.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Tutar (₺)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={testPaymentData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="1.00"
                  />
                </div>
                <div>
                  <Label htmlFor="orderId">Sipariş No</Label>
                  <Input
                    id="orderId"
                    value={testPaymentData.orderId}
                    onChange={(e) => handleInputChange('orderId', e.target.value)}
                    placeholder="TEST-123456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Müşteri Adı</Label>
                  <Input
                    id="customerName"
                    value={testPaymentData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Test Müşteri"
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">E-posta</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={testPaymentData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cardNumber">Test Kart No</Label>
                <Input
                  id="cardNumber"
                  value={testPaymentData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="4111111111111111"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Ay</Label>
                  <Input
                    id="expiryMonth"
                    value={testPaymentData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    placeholder="12"
                  />
                </div>
                <div>
                  <Label htmlFor="expiryYear">Yıl</Label>
                  <Input
                    id="expiryYear"
                    value={testPaymentData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    placeholder="2025"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    value={testPaymentData.cvc}
                    onChange={(e) => handleInputChange('cvc', e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>

              <Button 
                onClick={handleTestPayment}
                disabled={paymentStatus === 'processing'}
                className="w-full"
              >
                {paymentStatus === 'processing' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Ödeme İşleniyor...
                  </>
                ) : (
                  'Test Ödemesi Yap'
                )}
              </Button>

              {paymentStatus !== 'idle' && (
                <div className={`p-4 rounded-lg ${
                  paymentStatus === 'success' ? 'bg-green-50 border border-green-200' :
                  paymentStatus === 'error' ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center gap-2">
                    {paymentStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : paymentStatus === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    )}
                    <span className={`font-medium ${
                      paymentStatus === 'success' ? 'text-green-800' :
                      paymentStatus === 'error' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>
                      {paymentMessage}
                    </span>
                  </div>
                  
                  {paymentDetails && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-medium">Detayları Göster</summary>
                      <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                        {JSON.stringify(paymentDetails, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* API Bilgileri */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Konfigürasyonu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">API User</Label>
                <p className="text-sm text-gray-600 font-mono">apiUser3016658</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Client ID</Label>
                <p className="text-sm text-gray-600 font-mono">1000002147</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Ortam</Label>
                <p className="text-sm text-gray-600">{process.env.NODE_ENV === 'production' ? 'Production' : 'Test'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
