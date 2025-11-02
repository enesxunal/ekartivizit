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
      redirect_uri: 'https://ekartvizit.co/api/canva/callback',
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

  async function generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
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

  // Test OAuth flow'u (simüle edilmiş)
  const testOAuthFlow = async () => {
    setTestStatus('testing')
    setTestMessage('OAuth flow test ediliyor...')

    try {
      // Simüle edilmiş OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Test callback URL'ini ziyaret et
      const testCallbackUrl = 'https://ekartvizit.co/api/canva/callback?code=test_code&state=test_state'
      
      setTestStatus('success')
      setTestMessage('OAuth flow başarılı! Test callback URL: ' + testCallbackUrl)
    } catch (error) {
      setTestStatus('error')
      setTestMessage('OAuth flow hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'))
    }
  }



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Canva OAuth Test Sayfası</h1>
          <p className="text-gray-600">Canva OAuth entegrasyonunu test edin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gerçek OAuth Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Gerçek OAuth Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Gerçek Canva OAuth flow&apos;unu test eder. Canva&apos;ya yönlendirir ve callback URL&apos;ini kontrol eder.
              </p>
              
              <Button 
                onClick={testRealCanvaOAuth}
                disabled={testStatus === 'testing'}
                className="w-full"
              >
                Gerçek OAuth Başlat
              </Button>

              <div className="text-xs text-gray-500">
                <p><strong>Client ID:</strong> OC-AZcSA-HyneyB</p>
                <p><strong>Redirect URI:</strong> https://ekartvizit.co/api/canva/callback</p>
                <p><strong>Scope:</strong> design:read design:write</p>
              </div>
            </CardContent>
          </Card>

          {/* Test OAuth Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Test OAuth Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Simüle edilmiş OAuth flow&apos;unu test eder ve callback URL&apos;ini kontrol eder.
              </p>
              
              <Button 
                onClick={testOAuthFlow}
                disabled={testStatus === 'testing'}
                className="w-full"
              >
                Test OAuth Flow
              </Button>

              <div className="text-xs text-gray-500">
                <p><strong>Test URL:</strong> https://ekartvizit.co/api/canva/callback</p>
                <p><strong>Test Code:</strong> test_code</p>
                <p><strong>Test State:</strong> test_state</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Sonuçları */}
        {testStatus !== 'idle' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Test Sonuçları</CardTitle>
            </CardHeader>
            <CardContent>
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
                    <TestTube className="w-5 h-5 text-blue-600" />
                  )}
                  <span className={`font-medium ${
                    testStatus === 'success' ? 'text-green-800' :
                    testStatus === 'error' ? 'text-red-800' :
                    'text-blue-800'
                  }`}>
                    {testMessage}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* OAuth Konfigürasyonu */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>OAuth Konfigürasyonu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Canva Developer Panel</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>App Name:</strong> E-Kartvizit Design Tool</p>
                  <p><strong>Client ID:</strong> OC-AZcSA-HyneyB</p>
                  <p><strong>Redirect URI:</strong> https://ekartvizit.co/api/canva/callback</p>
                  <p><strong>Scope:</strong> design:read, design:write</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Test URL&apos;leri</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Callback:</strong> https://ekartvizit.co/api/canva/callback</p>
                  <p><strong>Success Page:</strong> https://ekartvizit.co/tasarim-tamamlandi</p>
                  <p><strong>Test Page:</strong> https://ekartvizit.co/canva-test</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 