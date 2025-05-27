import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/sepet/',
          '/hesabim/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/sepet/',
          '/hesabim/',
        ],
      },
    ],
    sitemap: 'https://e-kartvizit.com/sitemap.xml',
    host: 'https://e-kartvizit.com',
  }
} 