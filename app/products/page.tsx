'use client'

import { useState, useEffect } from 'react'
import { Star, Search, Filter, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'
import ProductSort from '@/components/product-sort'
import ViewToggle from '@/components/view-toggle'
import Breadcrumb from '@/components/breadcrumb'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ActiveRatingDisplay from '@/components/active-rating-display'

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [dealProducts, setDealProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  const [showDeals, setShowDeals] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchDealProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const categories = await response.json()
        const categoryNames = categories.map((cat: any) => cat.name)
        setAvailableCategories(categoryNames)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchDealProducts = async () => {
    try {
      const response = await fetch('/api/products?flashDeals=true&limit=4')
      if (response.ok) {
        const data = await response.json()
        setDealProducts(data.products || [])
      }
    } catch (error) {
      console.error('Error fetching deal products:', error)
    }
  }

  const fetchProducts = async (loadMore = false) => {
    try {
      if (loadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const currentPage = loadMore ? page : 1
      const response = await fetch(`/api/products?catalog=true&page=${currentPage}&limit=12`)
      
      if (response.ok) {
        const data = await response.json()
        
        if (loadMore) {
          setProducts(prev => [...prev, ...data.products])
        } else {
          setProducts(data.products)
        }
        
        setHasMore(data.products.length === 12)
        if (loadMore) {
          setPage(prev => prev + 1)
        } else {
          setPage(2)
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    fetchProducts(true)
  }

  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const { price: priceA } = getProductDisplayPrice(a)
    const { price: priceB } = getProductDisplayPrice(b)

    switch (sortBy) {
      case 'price-low':
        return priceA - priceB
      case 'price-high':
        return priceB - priceA
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'All Products', href: '/products' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">All Products</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Discover our complete range of computers, laptops, and technology products
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          {/* Deals Section - Compact */}
          {dealProducts.length > 0 && (
            <div className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <h2 className="text-xl font-black text-orange-600">Hot Deals</h2>
                    <p className="text-sm text-gray-600">Limited time offers - Don't miss out!</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeals(!showDeals)}
                  className="text-sm text-orange-600 hover:text-orange-700 font-bold px-4 py-2 bg-white rounded-lg border-2 border-orange-200 hover:border-orange-300 transition-all"
                >
                  {showDeals ? 'Hide Deals' : 'View All Deals'}
                </button>
              </div>
              
              {showDeals && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dealProducts.map((product) => {
                    const displayImage = getProductDisplayImage(product)
                    const { price, oldPrice } = getProductDisplayPrice(product)
                    const discount = product.flashDealDiscount || 20
                    
                    return (
                      <Link key={product._id} href={`/product/${product._id}`}>
                        <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-all border-2 border-transparent hover:border-orange-300 group">
                          <div className="relative mb-3">
                            <img
                              src={displayImage}
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                            />
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                              -{discount}%
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">{product.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-orange-600 font-black text-base">
                                KSH {price.toLocaleString()}
                              </span>
                              {oldPrice && (
                                <span className="text-xs line-through text-gray-400">
                                  {oldPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            {/* Search Bar */}
            <div className="relative max-w-xl mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for laptops, desktops, accessories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-gray-700"
              />
            </div>

            {/* Filters and Controls */}
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-gray-700">Filter by:</span>
                {availableCategories.slice(0, 8).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      if (selectedCategories.includes(category)) {
                        setSelectedCategories(prev => prev.filter(c => c !== category))
                      } else {
                        setSelectedCategories(prev => [...prev, category])
                      }
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <ProductSort
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />
                  
                  <ViewToggle
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />
                </div>
                
                <div className="text-sm font-medium text-gray-600">
                  Showing <span className="text-teal-600 font-bold">{sortedProducts.length}</span> products
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
              : 'space-y-4'
          }>
            {loading ? (
              // Loading skeleton
              Array(12).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden animate-pulse flex flex-col shadow-sm border border-gray-200"
                >
                  <div className="bg-gray-200 h-48" />
                  <div className="p-4 flex-1 flex flex-col space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-5 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              ))
            ) : (
              sortedProducts.map((product) => {
                const displayImage = getProductDisplayImage(product)
                const { price, oldPrice } = getProductDisplayPrice(product)
                const hasDiscount = oldPrice && oldPrice > price
                const isFlashDeal = product.flashDealDiscount && product.flashDealDiscount > 0
                
                return (
                  <div
                    key={product._id}
                    className={`bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all border-2 border-gray-100 hover:border-teal-300 group ${
                      viewMode === 'list' ? 'flex' : 'flex flex-col'
                    }`}
                  >
                    <Link href={`/product/${product._id}`}>
                      <div className={`relative bg-gray-50 overflow-hidden cursor-pointer ${
                        viewMode === 'list' ? 'w-40 h-32' : 'h-48'
                      }`}>
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {hasDiscount && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {isFlashDeal ? `-${product.flashDealDiscount}%` : 'SALE'}
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-xs font-semibold text-teal-600 mb-2 uppercase tracking-wide">{product.category}</span>

                      <Link href={`/product/${product._id}`}>
                        <h3 className="font-bold text-sm text-gray-900 group-hover:text-teal-600 transition-colors mb-2 line-clamp-2 cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>

                      <ActiveRatingDisplay 
                        productId={product._id || ''}
                        initialRating={product.rating}
                        initialReviews={product.reviews}
                        size="sm"
                      />

                      <div className="flex items-center gap-2 mt-auto pt-2">
                        <span className="text-lg font-black text-teal-600">
                          KSH {price.toLocaleString()}
                        </span>
                        {oldPrice && (
                          <span className="text-sm line-through text-gray-400">
                            {oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Empty State */}
          {!loading && sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No products found matching your criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategories([])
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !loading && sortedProducts.length > 0 && (
            <div className="text-center mt-10">
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                size="lg"
                className="px-8 py-6 bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {loadingMore ? 'Loading More Products...' : 'Load More Products'}
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}