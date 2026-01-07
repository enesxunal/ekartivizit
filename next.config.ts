import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Environment variables - Server-side için runtime'da okunur
  env: {
    TOSLA_BASE_URL: process.env.TOSLA_BASE_URL || 'https://entegrasyon.tosla.com/api/Payment/',
    TOSLA_API_USER: process.env.TOSLA_API_USER || 'apiUser3016658',
    TOSLA_API_PASS: process.env.TOSLA_API_PASS || 'YN8L293GPY',
    TOSLA_CLIENT_ID: process.env.TOSLA_CLIENT_ID || '1000002147',
  },
  
  // Performans optimizasyonları
  compress: true,
  poweredByHeader: false,
  
  // Görsel optimizasyonları
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental özellikler
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Bundle analizi
  webpack: (config, { dev, isServer }) => {
    // Production'da bundle boyutunu optimize et
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },

  // Headers optimizasyonu
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
