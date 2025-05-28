import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, ShoppingCart, ArrowLeft, AlertCircle, TestTube } from 'lucide-react';

function TasarimTamamlandiContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          {/* URL parametrelerini kontrol et */}
          <URLParamsHandler />
        </div>
      </div>
    </div>
  );
}

function URLParamsHandler() {
  if (typeof window === 'undefined') {
    return <DefaultContent />;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const isTest = urlParams.get('test') === 'true';
  const error = urlParams.get('error');
  const message = urlParams.get('message');
  const source = urlParams.get('source');

  if (error) {
    return <ErrorContent error={error} message={message} />;
  }

  if (isTest) {
    return <TestContent />;
  }

  return <DefaultContent source={source} />;
}

function DefaultContent({ source }: { source?: string | null }) {
  return (
    <>
      {/* Başarı İkonu */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tasarımınız Başarıyla Tamamlandı!
        </h1>
        <p className="text-gray-600">
          {source === 'canva' 
            ? 'Canva&apos;da oluşturduğunuz tasarım başarıyla kaydedildi.'
            : 'Tasarımınız başarıyla kaydedildi.'
          }
        </p>
      </div>

      {/* Bilgi Kartları */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Tasarım Hazır</h3>
          <p className="text-blue-700 text-sm">
            Tasarımınız baskıya hazır halde kaydedildi ve siparişinize eklendi.
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">Yüksek Kalite</h3>
          <p className="text-green-700 text-sm">
            300 DPI çözünürlükte profesyonel baskı kalitesi garantisi.
          </p>
        </div>
      </div>

      {/* Aksiyon Butonları */}
      <div className="space-y-4">
        <Link 
          href="/sepet"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Sepete Git ve Siparişi Tamamla
        </Link>
        
        <div className="grid md:grid-cols-2 gap-4">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Tasarımı İndir
          </button>
          
          <Link 
            href="/tum-urunler"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Yeni Ürün Ekle
          </Link>
        </div>

        <Link 
          href="/"
          className="w-full text-center text-gray-500 hover:text-gray-700 font-medium py-2 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>
      </div>

      {/* Yardım Bölümü */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Yardıma mı ihtiyacınız var?</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <Link href="/sss" className="text-blue-600 hover:text-blue-700">
            • Sık Sorulan Sorular
          </Link>
          <Link href="/iletisim" className="text-blue-600 hover:text-blue-700">
            • Canlı Destek
          </Link>
          <span className="text-gray-600">
            • Telefon: 0850 840 30 11
          </span>
          <span className="text-gray-600">
            • E-posta: info@ekartvizit.co
          </span>
        </div>
      </div>
    </>
  );
}

function TestContent() {
  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
          <TestTube className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Test Başarılı!
        </h1>
        <p className="text-gray-600">
          Canva callback endpoint&apos;i çalışıyor.
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-green-900 mb-2">✅ Test Sonucu</h3>
        <p className="text-green-700 text-sm mb-4">
          OAuth callback URL'i başarıyla çalışıyor. Artık Canva geliştirici panelinde submission yapabilirsiniz.
        </p>
        <Link 
          href="/canva-test"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <TestTube className="w-4 h-4 mr-1" />
          Test Sayfasına Dön
        </Link>
      </div>

      <Link 
        href="/"
        className="w-full text-center text-gray-500 hover:text-gray-700 font-medium py-2 flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Ana Sayfaya Dön
      </Link>
    </>
  );
}

function ErrorContent({ error, message }: { error: string; message?: string | null }) {
  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bir Hata Oluştu
        </h1>
        <p className="text-gray-600">
          Tasarım işlemi sırasında bir sorun yaşandı.
        </p>
      </div>

      <div className="bg-red-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-red-900 mb-2">Hata Detayları</h3>
        <p className="text-red-700 text-sm mb-2">
          <strong>Hata Kodu:</strong> {error}
        </p>
        {message && (
          <p className="text-red-700 text-sm">
            <strong>Açıklama:</strong> {message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Link 
          href="/canva-test"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <TestTube className="w-5 h-5" />
          Test Sayfasına Git
        </Link>

        <Link 
          href="/"
          className="w-full text-center text-gray-500 hover:text-gray-700 font-medium py-2 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </>
  );
}

export default function TasarimTamamlandiPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    }>
      <TasarimTamamlandiContent />
    </Suspense>
  );
}

export const metadata = {
  title: 'Tasarım Tamamlandı - E-Kartvizit',
  description: 'Canva tasarımınız başarıyla tamamlandı. Siparişinizi tamamlamak için sepete gidin.',
}; 