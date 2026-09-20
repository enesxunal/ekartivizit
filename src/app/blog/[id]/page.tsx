import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import { getBlogPost, getBlogPosts, getBlogCategories } from '@/data/blog'
import { getProductById } from '@/data/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { BlogPostingStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData'

interface BlogPostPageProps {
  params: Promise<{ id: string }>
}

const BASE_URL = 'https://ekartvizit.tr'

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = getBlogPost(id)
  if (!post) return { title: 'Yazı Bulunamadı', robots: { index: false, follow: false } }

  const url = `${BASE_URL}/blog/${post.id}`
  const image = post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'tr_TR',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: ['E-Kartvizit'],
      tags: post.tags,
      images: [{ url: image, alt: post.title }],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = getBlogPost(id)
  if (!post) notFound()

  const categories = getBlogCategories()
  const categoryName = categories.find((category) => category.id === post.category)?.name
  const relatedPosts = getBlogPosts()
    .filter((item) => item.id !== post.id && item.category === post.category)
    .slice(0, 3)
  const relatedProducts = (post.relatedProducts || [])
    .map((productId) => getProductById(productId))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))

  const url = `${BASE_URL}/blog/${post.id}`
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#171a16]">
      <BlogPostingStructuredData
        title={post.title}
        description={post.excerpt}
        url={url}
        image={post.image}
        datePublished={post.date}
      />
      <BreadcrumbStructuredData items={[
        { name: 'Ana Sayfa', url: BASE_URL },
        { name: 'Blog', url: `${BASE_URL}/blog` },
        { name: post.title, url },
      ]} />

      <Header />
      <article>
        <header className="border-b border-[#e4e7e1] bg-white">
          <div className="site-container max-w-5xl py-8 sm:py-10 lg:py-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-[#697067] hover:text-[#171a16]">
              <ArrowLeft className="size-4" /> Blog&apos;a dön
            </Link>
            <div className="mt-6 max-w-4xl">
              <p className="site-kicker mb-3">{categoryName}</p>
              <h1 className="text-[clamp(2.35rem,4.5vw,4.3rem)] font-semibold leading-[.93] tracking-[-.06em]">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[#687067]">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#838980]">
                <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" />{formatDate(post.date)}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" />{post.readTime} dk okuma</span>
                <span>E-Kartvizit Editör</span>
              </div>
            </div>
          </div>
        </header>

        <div className="site-container max-w-6xl py-8 sm:py-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
            <div className="rounded-[20px] border border-[#e1e4de] bg-white p-5 sm:p-8 lg:p-10">
              <div className="article-content">
                {renderMarkdown(post.content)}
              </div>

              <div className="mt-10 border-t border-[#e6e9e3] pt-6">
                <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#626960]">Etiketler</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f1f3ee] px-3 py-1.5 text-xs font-medium text-[#626960]">{tag}</span>)}
                </div>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-[82px] lg:h-fit">
              {relatedProducts.length > 0 && (
                <section className="rounded-[18px] border border-[#e1e4de] bg-white p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#326a1f]">İlgili ürünler</p>
                  <div className="mt-3 divide-y divide-[#edf0ea]">
                    {relatedProducts.map((product) => (
                      <Link key={product.id} href={product.href} className="flex items-center justify-between gap-3 py-3 text-sm font-semibold text-[#31362f] hover:text-[#326a1f]">
                        <span>{product.name}</span><ArrowRight className="size-3.5 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {relatedPosts.length > 0 && (
                <section className="rounded-[18px] border border-[#e1e4de] bg-white p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#626960]">İlgili rehberler</p>
                  <div className="mt-3 space-y-3">
                    {relatedPosts.map((item) => (
                      <Link key={item.id} href={`/blog/${item.id}`} className="block rounded-[12px] bg-[#f7f8f5] p-3 transition hover:bg-[#eef5e9]">
                        <p className="text-xs font-semibold leading-5 text-[#31362f]">{item.title}</p>
                        <p className="mt-1 text-[10px] text-[#626960]">{item.readTime} dk okuma</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  )
}

function renderMarkdown(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let listItems: string[] = []

  const flushList = () => {
    if (!listItems.length) return
    elements.push(
      <ul key={`list-${elements.length}`} className="my-5 space-y-2 pl-1">
        {listItems.map((item) => <li key={item} className="flex gap-2 text-sm leading-7 text-[#5f665d]"><span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-[#579d32]" />{item}</li>)}
      </ul>,
    )
    listItems = []
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2))
      return
    }
    flushList()
    if (!trimmed) return
    if (trimmed.startsWith('# ')) return
    if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={index} className="mb-3 mt-8 text-2xl font-semibold tracking-[-.035em] text-[#171a16] first:mt-0">{trimmed.slice(3)}</h2>)
      return
    }
    if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={index} className="mb-2 mt-6 text-lg font-semibold tracking-[-.02em] text-[#171a16]">{trimmed.slice(4)}</h3>)
      return
    }
    elements.push(<p key={index} className="mb-4 text-[15px] leading-7 text-[#5f665d]">{trimmed}</p>)
  })
  flushList()
  return elements
}
