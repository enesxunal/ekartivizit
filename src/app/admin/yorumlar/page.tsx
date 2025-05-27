'use client'

import React, { useState } from 'react'
import { Star, Check, X, Eye, User, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useReviews } from '@/contexts/ReviewContext'
import { createToast, useToast } from '@/components/ui/toast'

export default function AdminReviewsPage() {
  const { 
    reviews, 
    getPendingReviews, 
    approveReview, 
    rejectReview
  } = useReviews()
  const { addToast } = useToast()
  const toast = createToast(addToast)
  
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending')
  const [selectedProductId, setSelectedProductId] = useState<string>('')

  const pendingReviews = getPendingReviews()
  const approvedReviews = reviews.filter(review => review.isApproved)

  const filteredReviews = filter === 'pending' 
    ? pendingReviews
    : filter === 'approved' 
    ? approvedReviews
    : reviews

  const displayReviews = selectedProductId 
    ? filteredReviews.filter(review => review.productId === selectedProductId)
    : filteredReviews

  const handleApprove = (reviewId: string) => {
    approveReview(reviewId)
    toast.success('Yorum onaylandı!', 'Yorum artık ürün sayfasında görünecek')
  }

  const handleReject = (reviewId: string) => {
    rejectReview(reviewId)
    toast.success('Yorum reddedildi!', 'Yorum sistemden kaldırıldı')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const getProductName = (productId: string) => {
    const productNames: Record<string, string> = {
      'kartvizit': 'Kartvizit',
      'brosur': 'Broşür',
      'magnet': 'Magnet',
      'etiket': 'Etiket'
    }
    return productNames[productId] || productId
  }

  const uniqueProducts = [...new Set(reviews.map(review => review.productId))]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Yorum Yönetimi
          </h1>
          <p className="text-gray-600">
            Müşteri yorumlarını onaylayın veya reddedin
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Yorum</p>
                  <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Onay Bekleyen</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingReviews.length}</p>
                </div>
                <Eye className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Onaylanmış</p>
                  <p className="text-2xl font-bold text-green-600">{approvedReviews.length}</p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ortalama Puan</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {approvedReviews.length > 0 
                      ? (approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length).toFixed(1)
                      : '0.0'
                    }
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtreler */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              {/* Durum Filtresi */}
              <div className="flex gap-2">
                <Button
                  variant={filter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilter('pending')}
                  className={filter === 'pending' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                >
                  Onay Bekleyen ({pendingReviews.length})
                </Button>
                <Button
                  variant={filter === 'approved' ? 'default' : 'outline'}
                  onClick={() => setFilter('approved')}
                  className={filter === 'approved' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  Onaylanmış ({approvedReviews.length})
                </Button>
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  Tümü ({reviews.length})
                </Button>
              </div>

              {/* Ürün Filtresi */}
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#59af05]"
              >
                <option value="">Tüm Ürünler</option>
                {uniqueProducts.map(productId => (
                  <option key={productId} value={productId}>
                    {getProductName(productId)}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Yorumlar Listesi */}
        <div className="space-y-6">
          {displayReviews.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Yorum bulunamadı
                </h3>
                <p className="text-gray-600">
                  Seçilen filtrelere uygun yorum bulunmuyor.
                </p>
              </CardContent>
            </Card>
          ) : (
            displayReviews.map((review) => (
              <Card key={review.id} className={`${!review.isApproved ? 'border-orange-200 bg-orange-50' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                          {review.isVerifiedPurchase && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Doğrulanmış Alıcı
                            </span>
                          )}
                          {!review.isApproved && (
                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                              Onay Bekliyor
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{getProductName(review.productId)}</span>
                          <span>•</span>
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>E-posta: {review.customerEmail}</span>
                      <span>Faydalı: {review.helpfulCount}</span>
                    </div>

                    {!review.isApproved && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(review.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Onayla
                        </Button>
                        <Button
                          onClick={() => handleReject(review.id)}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reddet
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 