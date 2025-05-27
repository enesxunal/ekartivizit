import { useState, useMemo } from 'react'
import { Product } from '@/data/products'

export interface FilterOptions {
  category?: string
  priceRange?: {
    min: number
    max: number
  }
  materials?: string[]
  sizes?: string[]
  searchQuery?: string
  sortBy?: 'name' | 'price-low' | 'price-high' | 'popular'
}

export function useProductFilter(products: Product[], initialFilters: FilterOptions = {}) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Kategori filtresi
    if (filters.category && filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category)
    }

    // Arama filtresi
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.features?.some(feature => feature.toLowerCase().includes(query))
      )
    }

    // Fiyat aralığı filtresi
    if (filters.priceRange) {
      result = result.filter(product => {
        if (!product.price) return true
        const minPrice = product.price.min
        const maxPrice = product.price.max
        return (
          minPrice >= filters.priceRange!.min &&
          maxPrice <= filters.priceRange!.max
        )
      })
    }

    // Malzeme filtresi
    if (filters.materials && filters.materials.length > 0) {
      result = result.filter(product =>
        product.materials?.some(material => 
          filters.materials!.includes(material)
        )
      )
    }

    // Boyut filtresi
    if (filters.sizes && filters.sizes.length > 0) {
      result = result.filter(product =>
        product.sizes?.some(size => 
          filters.sizes!.includes(size)
        )
      )
    }

    // Sıralama
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name, 'tr'))
          break
        case 'price-low':
          result.sort((a, b) => (a.price?.min || 0) - (b.price?.min || 0))
          break
        case 'price-high':
          result.sort((a, b) => (b.price?.max || 0) - (a.price?.max || 0))
          break
        case 'popular':
          // Popülerlik sıralaması (şimdilik rastgele)
          result.sort(() => Math.random() - 0.5)
          break
      }
    }

    return result
  }, [products, filters])

  const updateFilter = (key: keyof FilterOptions, value: FilterOptions[keyof FilterOptions]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const getFilterCounts = () => {
    const categories = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const materials = products.reduce((acc, product) => {
      product.materials?.forEach(material => {
        acc[material] = (acc[material] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)

    const sizes = products.reduce((acc, product) => {
      product.sizes?.forEach(size => {
        acc[size] = (acc[size] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)

    return { categories, materials, sizes }
  }

  return {
    filteredProducts,
    filters,
    updateFilter,
    clearFilters,
    getFilterCounts,
    resultCount: filteredProducts.length
  }
} 