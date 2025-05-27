import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { getBlogPost, getBlogPosts, getBlogCategories } from '@/data/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface BlogPostPageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = getBlogPost(id)
  
  if (!post) {
    notFound()
  }

  const allPosts = getBlogPosts()
  const categories = getBlogCategories()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const categoryName = categories.find(cat => cat.id === post.category)?.name

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Blog&apos;a Dön
            </Button>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-[#59af05] text-white">
                {categoryName}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} dakika okuma
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span className="mr-4">{post.author}</span>
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(post.date)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-gray-500" />
                <Button variant="ghost" size="sm">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <div className="aspect-video bg-gradient-to-br from-[#59af05] to-[#4a9321] rounded-t-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {post.title.split(' ').slice(0, 3).join(' ')}
                </span>
              </div>
              
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  {post.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                          {paragraph.replace('# ', '')}
                        </h1>
                      )
                    }
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
                          {paragraph.replace('## ', '')}
                        </h2>
                      )
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">
                          {paragraph.replace('### ', '')}
                        </h3>
                      )
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <li key={index} className="text-gray-700 mb-1">
                          {paragraph.replace('- ', '')}
                        </li>
                      )
                    }
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <p key={index} className="font-bold text-gray-900 mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </p>
                      )
                    }
                    if (paragraph.trim() === '') {
                      return <br key={index} />
                    }
                    return (
                      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
                
                {/* Tags */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold text-gray-900 mb-3">Etiketler:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-[#59af05]">
                    İlgili Yazılar
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                        <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                          <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {formatDate(relatedPost.date)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Newsletter */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 text-[#59af05]">
                  Bülten Aboneliği
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Yeni blog yazılarımızdan haberdar olmak için e-posta adresinizi bırakın.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                  <Button className="w-full bg-[#59af05] hover:bg-[#4a9321]">
                    Abone Ol
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 text-[#59af05]">
                  İletişim
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sorularınız için bizimle iletişime geçin.
                </p>
                <Button variant="outline" className="w-full">
                  Bize Yazın
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  )
} 