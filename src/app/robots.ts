import { MetadataRoute } from 'next'

const privatePaths = ['/admin/', '/api/', '/private/', '/temp/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: 'https://ekartvizit.tr/sitemap.xml',
    host: 'https://ekartvizit.tr',
  }
}
