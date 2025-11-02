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
  title: {
    default: "E-Kartvizit - Profesyonel Baskı Çözümleri",
    template: "%s | E-Kartvizit"
  },
  description: "Kartvizit, broşür, magnet ve kurumsal baskı ürünleri için online tasarım ve baskı hizmetleri. Ücretsiz tasarım desteği ve hızlı teslimat garantisi.",
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
  metadataBase: new URL('https://ekartvizit.co'),
  alternates: {
    canonical: 'https://ekartvizit.co',
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://ekartvizit.co",
    title: "E-Kartvizit - Profesyonel Baskı Çözümleri",
    description: "Kartvizit, broşür, magnet ve kurumsal baskı ürünleri için online tasarım ve baskı hizmetleri.",
    siteName: "E-Kartvizit",
    images: [
      {
        url: "https://ekartvizit.co/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "E-Kartvizit - Profesyonel Baskı Çözümleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Kartvizit - Profesyonel Baskı Çözümleri",
    description: "Kartvizit, broşür, magnet ve kurumsal baskı ürünleri için online tasarım ve baskı hizmetleri.",
    images: ["https://ekartvizit.co/twitter-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
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
