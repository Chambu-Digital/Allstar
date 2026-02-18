'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'
import ProductSort from '@/components/product-sort'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ActiveRatingDisplay from '@/components/active-rating-display'

type SortOption =
  | 'featured'
  | 'price-low-high'
  | 'price-high-low'
  | 'rating'
  | 'newest'
  | 'name-a-z'
  | 'name-z-a'

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT TILE — matches reference image exactly
// Large image on pure white · ALL CAPS name · bold price · no card/border/bg
// ─────────────────────────────────────────────────────────────────────────────
function ProductTile({ product, index }: { product: IProduct; index: number }) {
  const displayImage = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const hasDiscount = oldPrice && oldPrice > price
  const isFlashDeal  = product.flashDealDiscount && product.flashDealDiscount > 0

  return (
    <Link
      href={`/product/${product._id}`}
      className="group block"
      style={{
        animation: 'fadeUp 0.5s ease both',
        animationDelay: `${Math.min(index * 60, 480)}ms`,
      }}
    >
      {/* IMAGE — large, on white, subtle zoom on hover */}
      <div className="relative overflow-hidden aspect-square mb-2.5">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 tracking-wide">
            {isFlashDeal ? `-${product.flashDealDiscount}%` : 'SALE'}
          </span>
        )}
      </div>

      {/* NAME — all caps, tight spacing */}
      <h3 className="text-xs font-medium tracking-wide uppercase text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-200">
        {product.name}
      </h3>

      {/* PRICE — bold, minimal */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-gray-900">
          KSh{price.toLocaleString()}
        </span>
        {oldPrice && (
          <span className="text-xs line-through text-gray-400">
            KSh{oldPrice.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DEAL TILE — same cardless pattern, compact
// ─────────────────────────────────────────────────────────────────────────────
function DealTile({ product }: { product: IProduct }) {
  const displayImage = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const discount = product.flashDealDiscount || 20

  return (
    <Link href={`/product/${product._id}`} className="group block">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 tracking-wide">
          -{discount}%
        </span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400 pointer-events-none" />
      </div>

      <div className="mt-2.5 space-y-0.5">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{product.category}</p>
        <h3 className="text-xs font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1.5 pt-0.5">
          <span className="text-sm font-bold text-gray-900">KSH {price.toLocaleString()}</span>
          {oldPrice && <span className="text-[11px] line-through text-gray-400">KSH {oldPrice.toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON TILE — square, matches product tile
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonTile() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-100 w-full mb-3" />
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="h-3.5 bg-gray-100 rounded w-20 mt-1" />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts]                         = useState<IProduct[]>([])
  const [dealProducts, setDealProducts]                 = useState<IProduct[]>([])
  const [loading, setLoading]                           = useState(true)
  const [loadingMore, setLoadingMore]                   = useState(false)
  const [page, setPage]                                 = useState(1)
  const [hasMore, setHasMore]                           = useState(true)
  const [searchTerm, setSearchTerm]                     = useState('')
  const [sortBy, setSortBy]                             = useState<SortOption>('featured')
  const [selectedCategory, setSelectedCategory]         = useState('')
  const [availableCategories, setAvailableCategories]   = useState<string[]>([])
  const [showDeals, setShowDeals]                       = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null) // kept for hot-deals if needed

  useEffect(() => {
    fetchProducts()
    fetchDealProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const cats = await res.json()
        setAvailableCategories(cats.map((c: { name: string }) => c.name))
      }
    } catch (err) { console.error(err) }
  }

  const fetchDealProducts = async () => {
    try {
      const res = await fetch('/api/products?flashDeals=true&limit=4')
      if (res.ok) {
        const data = await res.json()
        setDealProducts(data.products || [])
      }
    } catch (err) { console.error(err) }
  }

  const fetchProducts = async (loadMore = false) => {
    try {
      loadMore ? setLoadingMore(true) : setLoading(true)
      const currentPage = loadMore ? page : 1
      const res = await fetch(`/api/products?catalog=true&page=${currentPage}&limit=12`)
      if (res.ok) {
        const data = await res.json()
        setProducts(prev => loadMore ? [...prev, ...data.products] : data.products)
        setHasMore(data.products.length === 12)
        setPage(loadMore ? page + 1 : 2)
      }
    } catch (err) { console.error(err) }
    finally { setLoading(false); setLoadingMore(false) }
  }

  const filtered = products.filter(p => {
    if (searchTerm &&
      !p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !p.category.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (selectedCategory && p.category !== selectedCategory) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    const { price: pA } = getProductDisplayPrice(a)
    const { price: pB } = getProductDisplayPrice(b)
    switch (sortBy) {
      case 'price-low-high': return pA - pB
      case 'price-high-low': return pB - pA
      case 'rating':         return b.rating - a.rating
      case 'newest':         return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      case 'name-a-z':       return a.name.localeCompare(b.name)
      case 'name-z-a':       return b.name.localeCompare(a.name)
      default:               return 0
    }
  })

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop"
            alt="All Products"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          <div
            className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-center"
            style={{ animation: 'fadeUp 0.7s ease both' }}
          >
            <div className="space-y-4 max-w-lg">
              <p className="text-[11px] font-bold text-blue-300 uppercase tracking-[0.2em]">
                Complete Collection
              </p>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
                All Products
              </h1>
              <p className="text-white/55 text-base font-light">
                Computers, laptops &amp; cutting-edge technology
              </p>
              <div className="flex items-center gap-8 pt-2">
                {[
                  { val: `${products.length}+`, label: 'Products' },
                  { val: `${availableCategories.length}+`, label: 'Categories' },
                  { val: `${dealProducts.length}`, label: 'Hot Deals' },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center gap-8">
                    {i > 0 && <div className="w-px h-7 bg-white/15" />}
                    <div>
                      <div className="text-xl font-black text-white">{s.val}</div>
                      <div className="text-[10px] text-blue-300 uppercase tracking-[0.15em]">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-4 h-7 border border-white/20 rounded-full flex justify-center pt-1.5">
              <div className="w-0.5 h-2 bg-blue-400 rounded-full" />
            </div>
          </div>
        </section>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-10 space-y-10">

          {/* HOT DEALS */}
          {dealProducts.length > 0 && (
            <div>
              {/* Section label */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-0.5 h-4 bg-red-500" />
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.15em]">Hot Deals</h2>
                  <span className="text-xs text-gray-400">· Limited time</span>
                </div>
                <button
                  onClick={() => setShowDeals(!showDeals)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                >
                  {showDeals ? 'Hide' : 'View All'}
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${showDeals ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {showDeals && (
                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8"
                  style={{ animation: 'fadeUp 0.35s ease both' }}
                >
                  {dealProducts.map(p => <DealTile key={p._id} product={p} />)}
                </div>
              )}
            </div>
          )}

          {/* FILTER BAR — search + category pills only */}
          <div className="space-y-3">
            {/* Underline search — no box */}
            <div className="relative max-w-sm">
              <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-6 pr-7 py-2 text-sm border-b border-gray-200 focus:border-gray-900 focus:outline-none bg-transparent placeholder:text-gray-300 text-gray-900 transition-colors duration-200"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5">
              {['', ...availableCategories].map(cat => (
                <button
                  key={cat || 'all'}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200
                    ${selectedCategory === cat
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}
                  `}
                >
                  {cat || 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* ── PAGE TITLE + SORT BAR — exactly like reference ── */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Products</h2>
            <div className="flex items-center justify-end gap-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Sort by:</span>
                <ProductSort currentSort={sortBy} onSortChange={setSortBy} />
              </div>
              <span className="text-sm text-gray-400">{sorted.length} products</span>
            </div>
          </div>

          {/* ── PRODUCT GRID — ultra-clean, tight spacing like Epic Sports ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonTile key={i} />)
              : sorted.map((p, i) => <ProductTile key={p._id} product={p} index={i} />)
            }
          </div>

          {/* EMPTY STATE */}
          {!loading && sorted.length === 0 && (
            <div className="text-center py-16" style={{ animation: 'fadeUp 0.4s ease both' }}>
              <svg className="w-8 h-8 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">No products found</h3>
              <p className="text-gray-400 text-xs mb-4">Try different filters or clear your search.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('') }}
                className="px-5 py-2 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-700 rounded-full transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* LOAD MORE */}
          {hasMore && !loading && sorted.length > 0 && (
            <div className="text-center pt-2 pb-6">
              <button
                onClick={() => fetchProducts(true)}
                disabled={loadingMore}
                className="
                  inline-flex items-center gap-2 px-7 py-2.5
                  text-xs font-semibold text-gray-700
                  border border-gray-300 rounded-full
                  hover:border-gray-900 hover:text-gray-900
                  transition-all duration-200
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                {loadingMore ? (
                  <>
                    <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Load more
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </>
  )
}