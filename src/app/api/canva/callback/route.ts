import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');

    // Debug log
    console.log('Canva callback received:', { 
      code: code ? 'present' : 'missing', 
      state, 
      error, 
      error_description,
      url: request.url 
    });

    // Hata durumu kontrolü
    if (error) {
      console.error('Canva authentication error:', error, error_description);
      const redirectUrl = new URL('/tasarim-tamamlandi', request.url);
      redirectUrl.searchParams.set('error', 'auth_failed');
      redirectUrl.searchParams.set('message', error_description || error);
      return NextResponse.redirect(redirectUrl);
    }

    // Authorization code kontrolü
    if (!code) {
      console.error('No authorization code received');
      const redirectUrl = new URL('/tasarim-tamamlandi', request.url);
      redirectUrl.searchParams.set('error', 'no_code');
      redirectUrl.searchParams.set('message', 'Authorization code not received');
      return NextResponse.redirect(redirectUrl);
    }

    // Test modu kontrolü
    if (code === 'test_code') {
      console.log('Test mode - redirecting to success page');
      const redirectUrl = new URL('/tasarim-tamamlandi', request.url);
      redirectUrl.searchParams.set('test', 'true');
      redirectUrl.searchParams.set('success', 'true');
      return NextResponse.redirect(redirectUrl);
    }

    // Gerçek token exchange işlemi için hazır template
    // Bu kısım Canva'dan client credentials aldıktan sonra aktifleştirilecek
    const shouldExchangeToken = false; // Geliştirme aşamasında false

    if (shouldExchangeToken) {
      try {
        // Token exchange için gerekli parametreler
        const tokenParams = new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          code_verifier: 'stored_code_verifier', // Session'dan alınacak
          redirect_uri: 'https://ekartivizit.vercel.app/api/canva/callback'
        });

        const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${process.env.CANVA_CLIENT_ID}:${process.env.CANVA_CLIENT_SECRET}`).toString('base64')}`
          },
          body: tokenParams.toString()
        });

        if (!response.ok) {
          throw new Error(`Token exchange failed: ${response.status}`);
        }

        const tokenData = await response.json();
        console.log('Token exchange successful:', { access_token: 'present', expires_in: tokenData.expires_in });
        
        // Token'ı güvenli bir şekilde saklayın (database, session, etc.)
        // Bu örnekte sadece log yazıyoruz
      } catch (tokenError) {
        console.error('Token exchange error:', tokenError);
        const redirectUrl = new URL('/tasarim-tamamlandi', request.url);
        redirectUrl.searchParams.set('error', 'token_exchange_failed');
        redirectUrl.searchParams.set('message', 'Failed to exchange authorization code for token');
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Şimdilik başarılı authentication sonrası kullanıcıyı yönlendir
    console.log('Canva callback successful, code received:', code.substring(0, 10) + '...');

    // Başarılı authentication sonrası kullanıcıyı tasarım tamamlandı sayfasına yönlendir
    const redirectUrl = new URL('/tasarim-tamamlandi', request.url);
    redirectUrl.searchParams.set('success', 'true');
    redirectUrl.searchParams.set('source', 'canva');
    redirectUrl.searchParams.set('oauth_test', 'true'); // OAuth testinin başarılı olduğunu göster
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error('Canva callback error:', error);
    const redirectUrl = new URL('/tasarim-tamamlandi', request.url);
    redirectUrl.searchParams.set('error', 'server_error');
    redirectUrl.searchParams.set('message', 'Internal server error');
    return NextResponse.redirect(redirectUrl);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Canva POST callback:', body);
    
    // Webhook verilerini işle
    const { type, data } = body;
    
    switch (type) {
      case 'design.published':
        console.log('Design published:', data);
        break;
      case 'design.updated':
        console.log('Design updated:', data);
        break;
      default:
        console.log('Unknown webhook type:', type);
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Canva POST callback error:', error);
    return NextResponse.json({ 
      error: 'Server error',
      message: (error as Error).message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// OPTIONS method for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 