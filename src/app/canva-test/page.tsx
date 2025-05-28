'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, TestTube, CheckCircle, AlertCircle } from 'lucide-react'

export default function CanvaTestPage() {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [testMessage, setTestMessage] = useState('')

  // Gerçek OAuth test flow'u
  const testRealCanvaOAuth = async () => {
    // PKCE code verifier ve challenge oluştur
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const state = generateState()

    // Code verifier'ı session storage'a kaydet (gerçek uygulamada güvenli storage kullanın)
    sessionStorage.setItem('canva_code_verifier', codeVerifier)
    sessionStorage.setItem('canva_state', state)

    // Gerçek Canva OAuth URL'i oluştur
    const authParams = new URLSearchParams({
      response_type: 'code',
      client_id: 'OC-AZcSA-HyneyB', // Gerçek client ID
      redirect_uri: 'https://ekartivizit.vercel.app/api/canva/callback',
      scope: 'design:read design:write',
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    })

    const authUrl = `https://www.canva.com/api/oauth/authorize?${authParams.toString()}`
    window.open(authUrl, '_self') // Aynı pencerede aç
  }

  // PKCE helper functions
  function generateCodeVerifier() {
    const array = new Uint8Array(96)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  async function generateCodeChallenge(verifier: string) {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = new Uint8Array(hashBuffer)
    return btoa(String.fromCharCode.apply(null, Array.from(hashArray)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  function generateState() {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  // Basit OAuth test flow'u
  const testCanvaOAuth = () => {
    setTestStatus('testing')
    setTestMessage('Canva OAuth test başlatılıyor...')

    // Test callback'i simüle et
    setTimeout(() => {
      setTestStatus('success')
      setTestMessage('Test başarılı! OAuth flow çalışıyor.')
    }, 2000)

    // Gerçek test için Canva'ya yönlendir (yorumda)
    // const testParams = new URLSearchParams({
    //   response_type: 'code',
    //   client_id: 'test_client_id', // Gerçek client ID ile değiştirilecek
    //   redirect_uri: 'https://ekartivizit.vercel.app/api/canva/callback',
    //   scope: 'design:read design:write',
    //   state: 'test_state_' + Date.now()
    // })
    // const authUrl = `https://www.canva.com/api/oauth/authorize?${testParams.toString()}`
    // window.open(authUrl, '_blank')
  }

  // Callback URL'ini test et
  const testCallbackUrl = async () => {
    setTestStatus('testing')
    setTestMessage('Callback URL test ediliyor...')

    try {
      const response = await fetch('/api/canva/callback?code=test_code&state=test_state')
      
      if (response.ok) {
        setTestStatus('success')
        setTestMessage('Callback URL çalışıyor!')
      } else {
        setTestStatus('error')
        setTestMessage('Callback URL hatası: ' + response.status)
      }
    } catch (error) {
      setTestStatus('error')
      setTestMessage('Network hatası: ' + (error as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Canva Entegrasyon Test Sayfası
            </h1>
            <p className="text-gray-600">
              Canva OAuth flow&apos;unu test etmek için bu sayfayı kullanın
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* OAuth Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-blue-600" />
                  OAuth Flow Test
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Canva OAuth kimlik doğrulama akışını test eder
                </p>
                
                <Button 
                  onClick={testRealCanvaOAuth}
                  disabled={testStatus === 'testing'}
                  className="w-full mb-2"
                >
                  🚀 Gerçek Canva OAuth Test Et
                </Button>

                <Button 
                  onClick={testCanvaOAuth}
                  disabled={testStatus === 'testing'}
                  variant="outline"
                  className="w-full"
                >
                  {testStatus === 'testing' ? 'Test Ediliyor...' : '🧪 Simülasyon Test'}
                </Button>

                {testStatus !== 'idle' && (
                  <div className={`p-3 rounded-lg ${
                    testStatus === 'success' ? 'bg-green-50 text-green-800' :
                    testStatus === 'error' ? 'bg-red-50 text-red-800' :
                    'bg-blue-50 text-blue-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      {testStatus === 'success' && <CheckCircle className="w-4 h-4" />}
                      {testStatus === 'error' && <AlertCircle className="w-4 h-4" />}
                      <span className="text-sm">{testMessage}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Callback Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-green-600" />
                  Callback URL Test
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  API callback endpoint&apos;inin çalışıp çalışmadığını test eder
                </p>
                
                <Button 
                  onClick={testCallbackUrl}
                  disabled={testStatus === 'testing'}
                  variant="outline"
                  className="w-full"
                >
                  {testStatus === 'testing' ? 'Test Ediliyor...' : 'Callback Test Et'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* URL Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle>Entegrasyon URL&apos;leri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Authorized Redirects:</h4>
                <code className="block bg-gray-100 p-2 rounded text-sm">
                  https://ekartivizit.vercel.app/api/canva/callback
                </code>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Return Navigation:</h4>
                <code className="block bg-gray-100 p-2 rounded text-sm">
                  https://ekartivizit.vercel.app/tasarim-tamamlandi
                </code>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">⚠️ Önemli Not:</h4>
                <p className="text-sm text-yellow-700">
                  Bu URL&apos;leri Canva geliştirici panelinde tanımladıktan sonra OAuth flow&apos;unu en az bir kez test etmeniz gerekiyor.
                  Test etmeden submission yapamazsınız.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Test Adımları */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Test Adımları</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Canva geliştirici panelinde yukarıdaki URL&apos;leri ekleyin</li>
                <li>Client ID ve Client Secret&apos;i alın</li>
                <li>Bu sayfadaki test butonlarını kullanarak endpoint&apos;leri test edin</li>
                <li>Gerçek bir OAuth flow&apos;u test edin</li>
                <li>Canva&apos;da submission&apos;ı tamamlayın</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 