'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'
import ProductSort from '@/components/product-sort'
import ViewToggle from '@/components/view-toggle'
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
  const [sortBy, setSortBy] = useState<'featured' | 'price-low-high' | 'price-high-low' | 'rating' | 'newest' | 'name-a-z' | 'name-z-a'>('featured')
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
      case 'price-low-high':
        return priceA - priceB
      case 'price-high-low':
        return priceB - priceA
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      case 'name-a-z':
        return a.name.localeCompare(b.name)
      case 'name-z-a':
        return b.name.localeCompare(a.name)
      case 'featured':
      default:
        return 0 // Keep original order for featured
    }
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - Enhanced Professional Style */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop" 
            alt="Technology Products"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-full text-blue-300 text-sm font-semibold tracking-wide uppercase">
                Complete Collection
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-white tracking-tight">
              All Products
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
              Discover our complete range of computers, laptops, and cutting-edge technology products
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-black text-white">{products.length}+</div>
                <div className="text-sm text-blue-300 font-medium">Products</div>
              </div>
              <div className="w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{availableCategories.length}+</div>
                <div className="text-sm text-blue-300 font-medium">Categories</div>
              </div>
              <div className="w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{dealProducts.length}</div>
                <div className="text-sm text-blue-300 font-medium">Hot Deals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </section>
      
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Deals Section - Compact */}
          {dealProducts.length > 0 && (
            <div className="mb-8 relative">
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-xl p-0.5 shadow-lg">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-gray-900">Hot Deals</h2>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Limited time offers
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDeals(!showDeals)}
                      className="text-xs text-white font-bold px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      {showDeals ? 'Hide' : 'View All'}
                    </button>
                  </div>
                  
                  {showDeals && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-gray-200">
                      {dealProducts.map((product) => {
                        const displayImage = getProductDisplayImage(product)
                        const { price, oldPrice } = getProductDisplayPrice(product)
                        const discount = product.flashDealDiscount || 20
                        
                        return (
                          <Link key={product._id} href={`/product/${product._id}`}>
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-300 group relative overflow-hidden">
                              {/* Hover Glow Effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-lg"></div>
                              
                              <div className="relative">
                                <div className="relative mb-2 rounded-lg overflow-hidden bg-white shadow-sm">
                                  <img
                                    src={displayImage}
                                    alt={product.name}
                                    className="w-full h-28 object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute top-2 right-2 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-black px-2 py-1 rounded-full shadow-md">
                                    -{discount}%
                                  </div>
                                </div>
                                <div className="space-y-1.5">
                                  <h3 className="font-bold text-xs line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                  </h3>
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-blue-600 font-black text-sm">
                                      KSH {price.toLocaleString()}
                                    </span>
                                    {oldPrice && (
                                      <span className="text-[10px] line-through text-gray-400 font-medium">
                                        KSH {oldPrice.toLocaleString()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters - Enhanced */}
          <div className="mb-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            {/* Search Bar */}
            <div className="relative max-w-2xl mb-8">
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <Search className="text-gray-400 w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Search for laptops, desktops, accessories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-700 placeholder:text-gray-400 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filters and Controls */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  {/* Category Dropdown Filter */}
                  <div className="relative min-w-[240px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Filter className="w-4 h-4 text-blue-600" />
                      <label className="text-sm font-semibold text-gray-900">Category</label>
                    </div>
                    <select
                      value={selectedCategories[0] || ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedCategories([e.target.value])
                        } else {
                          setSelectedCategories([])
                        }
                      }}
                      className="w-full px-4 py-3 text-sm font-medium border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-white text-gray-700 cursor-pointer hover:border-blue-300"
                    >
                      <option value="">All Categories</option>
                      {availableCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <ProductSort
                    currentSort={sortBy}
                    onSortChange={setSortBy}
                  />
                  
                  <ViewToggle
                    currentView={viewMode}
                    onViewChange={setViewMode}
                  />
                </div>
                
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="text-sm font-medium text-gray-600">
                    Showing <span className="text-blue-600 font-black text-lg">{sortedProducts.length}</span> products
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List - Enhanced */}
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8' 
              : 'space-y-6'
          }>
            {loading ? (
              // Loading skeleton - Enhanced
              Array(12).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden animate-pulse flex flex-col shadow-lg border border-gray-200"
                >
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-56" />
                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="h-3 bg-gray-200 rounded-full w-20" />
                    <div className="h-5 bg-gray-200 rounded-full w-full" />
                    <div className="h-3 bg-gray-200 rounded-full w-24" />
                    <div className="h-6 bg-gray-200 rounded-full w-28" />
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
                    className={`bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 group relative ${
                      viewMode === 'list' ? 'flex' : 'flex flex-col'
                    }`}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-2xl pointer-events-none"></div>
                    
                    <Link href={`/product/${product._id}`}>
                      <div className={`relative bg-gradient-to-br from-gray-50 to-white overflow-hidden cursor-pointer ${
                        viewMode === 'list' ? 'w-48 h-40' : 'h-56'
                      }`}>
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {hasDiscount && (
                          <div className="absolute top-4 left-4 bg-gradient-to-br from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-xl">
                            {isFlashDeal ? `-${product.flashDealDiscount}%` : 'SALE'}
                          </div>
                        )}
                        
                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                            <div className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm shadow-xl">
                              Quick View
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className={`p-6 flex-1 flex flex-col ${viewMode === 'list' ? 'justify-center' : ''}`}>
                      <span className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full w-fit">
                        {product.category}
                      </span>

                      <Link href={`/product/${product._id}`}>
                        <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 cursor-pointer leading-tight">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mb-4">
                        <ActiveRatingDisplay 
                          productId={product._id || ''}
                          initialRating={product.rating}
                          initialReviews={product.reviews}
                          size="sm"
                        />
                      </div>

                      <div className="flex flex-col gap-1 mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-baseline gap-3">
                          <span className="text-2xl font-black text-blue-600">
                            KSH {price.toLocaleString()}
                          </span>
                          {oldPrice && (
                            <span className="text-sm line-through text-gray-400 font-medium">
                              KSH {oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {oldPrice && (
                          <span className="text-xs text-green-600 font-semibold">
                            Save KSH {(oldPrice - price).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-600 line-clamp-2 mt-4 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Empty State - Enhanced */}
          {!loading && sortedProducts.length === 0 && (
            <div className="text-center py-24 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategories([])
                }}
                size="lg"
                className="px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Load More Button - Enhanced */}
          {hasMore && !loading && sortedProducts.length > 0 && (
            <div className="text-center mt-16">
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                size="lg"
                className="px-12 py-7 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 rounded-xl transform hover:scale-105 text-lg"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading More Products...
                  </span>
                ) : (
                  'Load More Products'
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}