import { MetadataRoute } from 'next'
import { PRODUCTS } from '@/data/products'
import { BLOG_POSTS } from '@/data/blog'

const baseUrl = 'https://ekartvizit.tr'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    ['', 1, 'daily'],
    ['/tum-urunler', 0.9, 'weekly'],
    ['/kurumsal', 0.85, 'weekly'],
    ['/reklam', 0.85, 'weekly'],
    ['/promosyon', 0.8, 'weekly'],
    ['/cok-satanlar', 0.75, 'weekly'],
    ['/tasarim', 0.7, 'monthly'],
    ['/blog', 0.7, 'weekly'],
    ['/sss', 0.6, 'monthly'],
    ['/hakkimizda', 0.5, 'monthly'],
    ['/iletisim', 0.5, 'monthly'],
  ].map(([path, priority, changeFrequency]) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: changeFrequency as 'daily' | 'weekly' | 'monthly',
    priority: priority as number,
  }))

  const productPages: MetadataRoute.Sitemap = PRODUCTS
    .filter((product) => !product.id.startsWith('test-'))
    .map((product) => ({
      url: `${baseUrl}${product.href}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...productPages, ...blogPages]
}
