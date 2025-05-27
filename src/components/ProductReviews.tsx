'use client'

import React, { useState } from 'react'
import { Star, ThumbsUp, MessageSquare, User, Calendar, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useReviews } from '@/contexts/ReviewContext'
import { useAuth } from '@/contexts/AuthContext'
import { createToast, useToast } from '@/components/ui/toast'

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { getApprovedReviews, getReviewStats, markHelpful, addReview } = useReviews()
  const { user } = useAuth()
  const { addToast } = useToast()
  const toast = createToast(addToast)
  
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    customerName: user?.name || '',
    customerEmail: user?.email || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const reviews = getApprovedReviews(productId)
  const stats = getReviewStats(productId)

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reviewForm.title.trim() || !reviewForm.comment.trim()) {
      toast.error('Lütfen başlık ve yorum alanlarını doldurun')
      return
    }

    if (!reviewForm.customerName.trim() || !reviewForm.customerEmail.trim()) {
      toast.error('Lütfen isim ve e-posta alanlarını doldurun')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await addReview({
        productId,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
        customerName: reviewForm.customerName,
        customerEmail: reviewForm.customerEmail,
        isVerifiedPurchase: !!user, // Giriş yapmış kullanıcılar doğrulanmış sayılır
      })

      if (result.success) {
        toast.success('Yorumunuz gönderildi!', result.message)
        setShowReviewForm(false)
        setReviewForm({
          rating: 5,
          title: '',
          comment: '',
          customerName: user?.name || '',
          customerEmail: user?.email || ''
        })
      } else {
        toast.error('Hata!', result.message)
      }
    } catch {
      toast.error('Bir hata oluştu', 'Lütfen tekrar deneyin')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMarkHelpful = (reviewId: string) => {
    markHelpful(reviewId)
    toast.success('Teşekkürler!', 'Yorumu faydalı olarak işaretlediniz')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const renderRatingDistribution = () => {
    if (stats.totalReviews === 0) return null

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = stats.ratingDistribution[rating] || 0
          const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0

          return (
            <div key={rating} className="flex items-center gap-2 text-sm">
              <span className="w-8">{rating}</span>
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-gray-600">{count}</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Yorum İstatistikleri */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Müşteri Yorumları
          </h3>
        </CardHeader>
        <CardContent>
          {stats.totalReviews > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ortalama Puan */}
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.averageRating}
                </div>
                {renderStars(Math.round(stats.averageRating), 'lg')}
                <p className="text-gray-600 mt-2">
                  {stats.totalReviews} değerlendirme
                </p>
              </div>

              {/* Puan Dağılımı */}
              <div>
                <h4 className="font-medium mb-4">Puan Dağılımı</h4>
                {renderRatingDistribution()}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Henüz yorum yapılmamış</p>
              <p className="text-sm text-gray-500">İlk yorumu siz yapın!</p>
            </div>
          )}

          {/* Yorum Yaz Butonu */}
          <div className="mt-6 pt-6 border-t">
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full md:w-auto"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Yorum Yaz
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Yorum Formu */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <h4 className="text-lg font-semibold">Yorumunuzu Yazın</h4>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Puan */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Puanınız *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewForm.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({reviewForm.rating} yıldız)
                  </span>
                </div>
              </div>

              {/* Başlık */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Yorumunuzun başlığı"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                  required
                />
              </div>

              {/* Yorum */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Yorumunuz *
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Ürün hakkındaki deneyiminizi paylaşın..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                  required
                />
              </div>

              {/* İletişim Bilgileri */}
              {!user && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Adınız *
                    </label>
                    <input
                      type="text"
                      value={reviewForm.customerName}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, customerName: e.target.value }))}
                      placeholder="Adınız ve soyadınız"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={reviewForm.customerEmail}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                      placeholder="E-posta adresiniz"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Butonlar */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#59af05] hover:bg-[#4a9321]"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Yorumlar Listesi */}
      {reviews.length > 0 && (
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">
            Tüm Yorumlar ({reviews.length})
          </h4>
          
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>

                  {/* Yorum İçeriği */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-medium">{review.customerName}</h5>
                      {review.isVerifiedPurchase && (
                        <div className="flex items-center gap-1 text-green-600 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Doğrulanmış Alıcı
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating, 'sm')}
                      <span className="text-sm text-gray-600">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    <h6 className="font-medium mb-2">{review.title}</h6>
                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    {/* Faydalı Buton */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleMarkHelpful(review.id)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#59af05] transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Faydalı ({review.helpfulCount})
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 