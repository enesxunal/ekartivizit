import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIFloatingButton from "@/components/AIFloatingButton";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { InventoryProvider } from "@/contexts/InventoryContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import { ToastProvider } from "@/contexts/ToastContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Kartvizit | Profesyonel Baskı Çözümleri - Online Tasarım ve Baskı",
  description: "Kartvizit, broşür, magnet, etiket ve kurumsal baskı ürünleri için online tasarım ve baskı hizmetleri. Ücretsiz tasarım desteği, aynı gün teslimat, KDV dahil fiyatlar. 500₺'den başlayan uygun fiyatlarla profesyonel baskı çözümleri.",
  keywords: "kartvizit baskı, broşür tasarım, magnet baskı, etiket baskı, online baskı, kurumsal baskı, antetli kağıt, zarf baskı, makbuz baskı, cepli dosya, promosyon ürünleri, plastik kalem, çakmak baskı, seramik kupa, yelken bayrak, ücretsiz tasarım, hızlı teslimat, KDV dahil fiyat",
  authors: [{ name: "E-Kartvizit" }],
  creator: "E-Kartvizit",
  publisher: "E-Kartvizit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://e-kartvizit.com',
    siteName: 'E-Kartvizit',
    title: 'E-Kartvizit | Profesyonel Baskı Çözümleri',
    description: 'Kartvizit, broşür, magnet ve kurumsal baskı ürünleri için online tasarım ve baskı hizmetleri. Ücretsiz tasarım desteği ve hızlı teslimat.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'E-Kartvizit - Profesyonel Baskı Çözümleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Kartvizit | Profesyonel Baskı Çözümleri',
    description: 'Online tasarım ve baskı hizmetleri. Ücretsiz tasarım desteği ve hızlı teslimat.',
    images: ['/images/og-image.png'],
  },
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  verification: {
    google: 'google-site-verification-code', // Google Search Console'dan alınacak
  },
  alternates: {
    canonical: 'https://e-kartvizit.com',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: '#59af05',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
        <PerformanceMonitor />
        <ToastProvider>
          <AuthProvider>
            <InventoryProvider>
              <OrderProvider>
                <ReviewProvider>
                  <CartProvider>
                    {children}
                    <WhatsAppButton />
                    <AIFloatingButton />
                  </CartProvider>
                </ReviewProvider>
              </OrderProvider>
            </InventoryProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
