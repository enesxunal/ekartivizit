'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { getBlogPosts, getBlogCategories, searchBlogPosts, getBlogPostsByCategory } from '@/data/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const allPosts = getBlogPosts()
  const categories = getBlogCategories()
  
  const filteredPosts = searchQuery 
    ? searchBlogPosts(searchQuery)
    : selectedCategory === 'all' 
      ? allPosts 
      : getBlogPostsByCategory(selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#59af05] to-[#4a9321] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              E-Kartvizit Blog
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Baskı dünyasından haberler, tasarım ipuçları ve sektör trendleri
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Blog yazılarında ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#59af05]">Kategoriler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    selectedCategory === 'all' 
                      ? 'bg-[#59af05] hover:bg-[#4a9321]' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory('all')}
                >
                  Tüm Yazılar ({allPosts.length})
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    className={`w-full justify-start ${
                      selectedCategory === category.id 
                        ? 'bg-[#59af05] hover:bg-[#4a9321]' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-[#59af05]">Popüler Etiketler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['kartvizit', 'tasarım', 'baskı', 'profesyonel', 'pazarlama', 'broşür', 'dijital', 'ofset'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-[#59af05] hover:text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600">
                  &quot;{searchQuery}&quot; için {filteredPosts.length} sonuç bulundu
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#59af05] to-[#4a9321] flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {post.title.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-[#59af05] text-white">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} dk
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                        <Calendar className="h-4 w-4 ml-3 mr-1" />
                        {formatDate(post.date)}
                      </div>
                      
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-[#59af05] hover:text-[#4a9321]">
                          Devamını Oku
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery 
                    ? 'Aradığınız kriterlere uygun blog yazısı bulunamadı.'
                    : 'Bu kategoride henüz blog yazısı bulunmuyor.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  )
} 