import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
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
  title: {
    default: "Online Matbaa ve Baskı Ürünleri | E-Kartvizit",
    template: "%s | E-Kartvizit"
  },
  description: "Kartvizit, broşür, sticker, magnet ve kurumsal baskı ürünlerini ölçü, kağıt ve adet seçenekleriyle online sipariş edin.",
  keywords: [
    "kartvizit",
    "broşür",
    "magnet",
    "baskı",
    "tasarım",
    "online",
    "profesyonel",
    "kurumsal",
    "etiket",
    "antetli kağıt"
  ],
  authors: [{ name: "E-Kartvizit" }],
  creator: "E-Kartvizit",
  publisher: "E-Kartvizit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ekartvizit.tr'),
  verification: {
    google: 'z2Pwim5HU6RzkrpWjCg7k6zoobEpp_ShmleNBGgp-XY',
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://ekartvizit.tr",
    title: "Online Matbaa ve Baskı Ürünleri | E-Kartvizit",
    description: "Kartvizit, broşür, sticker, magnet ve kurumsal baskı ürünlerini online sipariş edin.",
    siteName: "E-Kartvizit",
    images: [
      {
        url: "https://ekartvizit.tr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "E-Kartvizit online matbaa ve baskı ürünleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Matbaa ve Baskı Ürünleri | E-Kartvizit",
    description: "Kartvizit, broşür, sticker, magnet ve kurumsal baskı ürünlerini online sipariş edin.",
    images: ["https://ekartvizit.tr/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/images/fav.png',
    shortcut: '/images/fav.png',
    apple: '/images/fav.png',
  },
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
