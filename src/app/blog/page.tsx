'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react'
import { getBlogCategories, getBlogPosts } from '@/data/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const posts = getBlogPosts()
  const categories = getBlogCategories()

  const query = searchQuery.trim().toLocaleLowerCase('tr-TR')
  const filteredPosts = posts.filter((post) => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory
    const queryMatch = !query || [post.title, post.excerpt, ...post.tags].join(' ').toLocaleLowerCase('tr-TR').includes(query)
    return categoryMatch && queryMatch
  })

  const formatDate = (date: string) => new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
      <Header />
      <main>
        <section className="border-b border-[#e4e7e1] bg-white">
          <div className="site-container py-8 sm:py-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="site-kicker mb-3">Baskı rehberi</p>
                <h1 className="max-w-4xl text-[clamp(2.35rem,5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.06em]">Doğru ürünü ve baskı seçeneğini daha kolay belirleyin.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f665d] sm:text-base">Kartvizit, broşür, etiket, magnet ve kurumsal baskı ürünleri için ölçü, malzeme, fiyat ve dosya hazırlama rehberleri.</p>
              </div>
              <label className="relative block" aria-label="Blog yazılarında ara">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#697067]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Rehberlerde ara..."
                  className="h-12 w-full rounded-[12px] border border-[#dfe3dc] bg-[#f8f9f6] pl-10 pr-4 text-sm outline-none transition focus:border-[#579d32] focus:bg-white"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="site-container py-8 sm:py-10 lg:py-12" aria-labelledby="blog-list-heading">
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="Blog kategorileri">
            <button type="button" onClick={() => setSelectedCategory('all')} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${selectedCategory === 'all' ? 'bg-[#171a16] text-white' : 'border border-[#dfe3dc] bg-white text-[#51584f] hover:border-[#aeb4aa]'}`}>Tüm yazılar</button>
            {categories.map((category) => (
              <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${selectedCategory === category.id ? 'bg-[#171a16] text-white' : 'border border-[#dfe3dc] bg-white text-[#51584f] hover:border-[#aeb4aa]'}`}>
                {category.name} <span className="ml-1 opacity-70">{category.count}</span>
              </button>
            ))}
          </div>

          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#326a1f]">{filteredPosts.length} rehber</p>
              <h2 id="blog-list-heading" className="mt-1 text-2xl font-semibold tracking-[-.035em]">Baskı ve sipariş rehberleri</h2>
            </div>
          </div>

          {filteredPosts.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post) => {
                const category = categories.find((item) => item.id === post.category)
                return (
                  <article key={post.id} className="flex min-h-[300px] flex-col rounded-[18px] border border-[#e1e4de] bg-white p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[.1em] text-[#626960]">
                      <span className="text-[#326a1f]">{category?.name}</span>
                      <span className="inline-flex items-center gap-1 normal-case tracking-normal"><Clock className="size-3" />{post.readTime} dk</span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold leading-[1.05] tracking-[-.035em] text-[#171a16]">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5f665d]">{post.excerpt}</p>
                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#eceee9] pt-5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-[#697067]"><Calendar className="size-3.5" />{formatDate(post.date)}</span>
                      <Link href={`/blog/${post.id}`} aria-label={`${post.title} yazısını oku`} className="flex size-9 shrink-0 items-center justify-center rounded-[9px] border border-[#dfe3dc] text-[#343a32] transition hover:border-[#171a16] hover:bg-[#171a16] hover:text-white"><ArrowRight className="size-4" /></Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="rounded-[18px] border border-[#e1e4de] bg-white p-8 text-center text-sm text-[#5f665d]">Aramanıza uygun rehber bulunamadı.</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
