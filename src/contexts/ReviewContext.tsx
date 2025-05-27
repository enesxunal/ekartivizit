'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Review {
  id: string
  productId: string
  userId?: string
  customerName: string
  customerEmail: string
  rating: number // 1-5 yıldız
  title: string
  comment: string
  images?: string[] // Yorum fotoğrafları
  isVerifiedPurchase: boolean
  isApproved: boolean
  helpfulCount: number
  createdAt: string
  updatedAt: string
}

interface ReviewContextType {
  reviews: Review[]
  getProductReviews: (productId: string) => Review[]
  getApprovedReviews: (productId: string) => Review[]
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpfulCount' | 'isApproved'>) => Promise<{ success: boolean; message: string }>
  updateReview: (reviewId: string, updates: Partial<Review>) => void
  deleteReview: (reviewId: string) => void
  markHelpful: (reviewId: string) => void
  getReviewStats: (productId: string) => {
    averageRating: number
    totalReviews: number
    ratingDistribution: Record<number, number>
  }
  getProductReviewStats: (productId: string) => {
    averageRating: number
    totalReviews: number
  }
  getPendingReviews: () => Review[]
  approveReview: (reviewId: string) => void
  rejectReview: (reviewId: string) => void
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])

  // LocalStorage'dan yorumları yükle
  useEffect(() => {
    const savedReviews = localStorage.getItem('ekartvizit-reviews')
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews))
      } catch (error) {
        console.error('Yorum verisi yüklenirken hata:', error)
        initializeDefaultReviews()
      }
    } else {
      initializeDefaultReviews()
    }
  }, [])

  // Yorumlar değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('ekartvizit-reviews', JSON.stringify(reviews))
  }, [reviews])

  const initializeDefaultReviews = () => {
    const defaultReviews: Review[] = [
      {
        id: '1',
        productId: 'kartvizit',
        customerName: 'Ahmet Yılmaz',
        customerEmail: 'ahmet@example.com',
        rating: 5,
        title: 'Mükemmel kalite!',
        comment: 'Kartvizitler çok kaliteli geldi. Baskı kalitesi ve kağıt kalitesi harika. Kesinlikle tavsiye ederim.',
        isVerifiedPurchase: true,
        isApproved: true,
        helpfulCount: 12,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        productId: 'kartvizit',
        customerName: 'Fatma Demir',
        customerEmail: 'fatma@example.com',
        rating: 4,
        title: 'Güzel ürün',
        comment: 'Kartvizitler güzel oldu ama teslimat biraz geç geldi. Kalite açısından memnunum.',
        isVerifiedPurchase: true,
        isApproved: true,
        helpfulCount: 8,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        productId: 'brosur',
        customerName: 'Mehmet Kaya',
        customerEmail: 'mehmet@example.com',
        rating: 5,
        title: 'Profesyonel sonuç',
        comment: 'Broşürler tam istediğim gibi oldu. Renkler canlı, kağıt kalitesi yüksek. Müşterilerim çok beğendi.',
        isVerifiedPurchase: true,
        isApproved: true,
        helpfulCount: 15,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
    setReviews(defaultReviews)
  }

  const getProductReviews = (productId: string) => {
    return reviews.filter(review => review.productId === productId)
  }

  const getApprovedReviews = (productId: string) => {
    return reviews.filter(review => 
      review.productId === productId && review.isApproved
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const addReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpfulCount' | 'isApproved'>) => {
    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newReview: Review = {
        ...reviewData,
        id: Date.now().toString(),
        helpfulCount: 0,
        isApproved: false, // Yeni yorumlar onay bekler
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setReviews(prev => [newReview, ...prev])

      return {
        success: true,
        message: 'Yorumunuz başarıyla gönderildi! Onaylandıktan sonra yayınlanacaktır.'
      }
    } catch {
      return {
        success: false,
        message: 'Yorum gönderilirken bir hata oluştu.'
      }
    }
  }

  const updateReview = (reviewId: string, updates: Partial<Review>) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, ...updates, updatedAt: new Date().toISOString() }
        : review
    ))
  }

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId))
  }

  const markHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpfulCount: review.helpfulCount + 1 }
        : review
    ))
  }

  const getReviewStats = (productId: string) => {
    const productReviews = getApprovedReviews(productId)
    
    if (productReviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
    }

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / productReviews.length

    const ratingDistribution = productReviews.reduce((dist, review) => {
      dist[review.rating] = (dist[review.rating] || 0) + 1
      return dist
    }, {} as Record<number, number>)

    // Eksik rating'leri 0 ile doldur
    for (let i = 1; i <= 5; i++) {
      if (!ratingDistribution[i]) {
        ratingDistribution[i] = 0
      }
    }

    return {
      averageRating: Math.round(averageRating * 10) / 10, // 1 ondalık basamak
      totalReviews: productReviews.length,
      ratingDistribution
    }
  }

  const getProductReviewStats = (productId: string) => {
    const stats = getReviewStats(productId)
    return {
      averageRating: stats.averageRating,
      totalReviews: stats.totalReviews
    }
  }

  const getPendingReviews = () => {
    return reviews.filter(review => !review.isApproved)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const approveReview = (reviewId: string) => {
    updateReview(reviewId, { isApproved: true })
  }

  const rejectReview = (reviewId: string) => {
    deleteReview(reviewId)
  }

  return (
    <ReviewContext.Provider value={{
      reviews,
      getProductReviews,
      getApprovedReviews,
      addReview,
      updateReview,
      deleteReview,
      markHelpful,
      getReviewStats,
      getProductReviewStats,
      getPendingReviews,
      approveReview,
      rejectReview
    }}>
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider')
  }
  return context
} 