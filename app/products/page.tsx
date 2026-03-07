'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'
import ProductSort from '@/components/product-sort'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ActiveRatingDisplay from '@/components/active-rating-display'
import { ArrowRight, ChevronDown, Search, X, Flame, SlidersHorizontal } from 'lucide-react'

type SortOption =
  | 'featured'
  | 'price-low-high'
  | 'price-high-low'
  | 'rating'
  | 'newest'
  | 'name-a-z'
  | 'name-z-a'

// ─── Brand colours (matches homepage) ─────────────────────────────────────────
const BLUE       = '#2563EB'
const BLUE_DARK  = '#1d4ed8'
const ORANGE     = '#f97316'
const ORANGE_DARK = '#ea580c'

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT TILE — dark card, matches homepage style
// ─────────────────────────────────────────────────────────────────────────────
function ProductTile({ product, index }: { product: IProduct; index: number }) {
  const displayImage = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const hasDiscount = oldPrice && oldPrice > price
  const isFlashDeal = product.flashDealDiscount && product.flashDealDiscount > 0
  const discountPct = isFlashDeal
    ? product.flashDealDiscount
    : oldPrice ? Math.round((1 - price / oldPrice) * 100) : null

  return (
    <Link
      href={`/product/${product._id}`}
      className="group block"
      style={{ animation: 'fadeUp 0.5s ease both', animationDelay: `${Math.min(index * 45, 360)}ms` }}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden rounded-xl mb-3 aspect-square transition-all duration-300"
        style={{ background: '#0d1b3e', border: '1px solid rgba(37,99,235,0.18)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.5)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(37,99,235,0.18)')}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        {hasDiscount && discountPct && (
          <span
            className="absolute top-2.5 left-2.5 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider"
            style={{ background: ORANGE }}
          >
            -{discountPct}%
          </span>
        )}
        {/* Quick view overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-14 flex items-end justify-center pb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(13,27,62,0.92), transparent)' }}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: ORANGE }}>
            Quick View →
          </span>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xs font-medium text-slate-300 line-clamp-2 leading-snug mb-1.5 group-hover:text-orange-400 transition-colors duration-200">
        {product.name}
      </h3>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-white">KSh {price.toLocaleString()}</span>
        {oldPrice && (
          <span className="text-[11px] line-through text-slate-500">KSh {oldPrice.toLocaleString()}</span>
        )}
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DEAL TILE
// ─────────────────────────────────────────────────────────────────────────────
function DealTile({ product }: { product: IProduct }) {
  const displayImage = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const discount = product.flashDealDiscount || 20

  return (
    <Link href={`/product/${product._id}`} className="group block">
      <div
        className="relative overflow-hidden aspect-square rounded-xl mb-3 transition-all duration-300"
        style={{ background: '#0d1b3e', border: '1px solid rgba(37,99,235,0.18)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.5)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(37,99,235,0.18)')}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute top-2.5 left-2.5 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider"
          style={{ background: ORANGE }}
        >
          -{discount}%
        </span>
        <div
          className="absolute inset-x-0 bottom-0 h-14 flex items-end justify-center pb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(13,27,62,0.92), transparent)' }}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: ORANGE }}>
            Shop Now →
          </span>
        </div>
      </div>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">{product.category}</p>
      <h3 className="text-xs font-medium text-slate-300 line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors duration-200 mb-1">
        {product.name}
      </h3>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-white">KSh {price.toLocaleString()}</span>
        {oldPrice && <span className="text-[11px] line-through text-slate-500">KSh {oldPrice.toLocaleString()}</span>}
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonTile() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-xl w-full mb-3" style={{ background: 'rgba(37,99,235,0.07)' }} />
      <div className="space-y-1.5">
        <div className="h-2.5 rounded w-full"  style={{ background: 'rgba(37,99,235,0.07)' }} />
        <div className="h-2.5 rounded w-3/4"   style={{ background: 'rgba(37,99,235,0.07)' }} />
        <div className="h-3   rounded w-1/2 mt-1" style={{ background: 'rgba(37,99,235,0.07)' }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LABEL — matches homepage
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="block w-6 h-0.5" style={{ background: ORANGE }} />
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>
        {children}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts]                       = useState<IProduct[]>([])
  const [dealProducts, setDealProducts]               = useState<IProduct[]>([])
  const [loading, setLoading]                         = useState(true)
  const [loadingMore, setLoadingMore]                 = useState(false)
  const [page, setPage]                               = useState(1)
  const [hasMore, setHasMore]                         = useState(true)
  const [searchTerm, setSearchTerm]                   = useState('')
  const [sortBy, setSortBy]                           = useState<SortOption>('featured')
  const [selectedCategory, setSelectedCategory]       = useState('')
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  const [showDeals, setShowDeals]                     = useState(false)
  const [filtersOpen, setFiltersOpen]                 = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif !important; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .orange-glow { box-shadow: 0 0 28px rgba(249,115,22,0.30); }
        .blue-glow   { box-shadow: 0 0 28px rgba(37,99,235,0.25); }
        .pill-active { background: #2563EB !important; color: white !important; border-color: #2563EB !important; }
      `}</style>

      <div className="min-h-screen flex flex-col" style={{ background: '#060e24' }}>
        <Header />

        {/* ══════════════════════════════════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{
            minHeight: 320,
            background: 'linear-gradient(135deg, #06122b 0%, #0a1a3a 55%, #0d1f47 100%)',
          }}
        >
          {/* Mesh glows */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 10% 60%, rgba(37,99,235,0.18) 0%, transparent 48%),
                              radial-gradient(circle at 88% 25%, rgba(249,115,22,0.12) 0%, transparent 42%)`
          }} />
         
          {/* Faint bg image */}
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=600&fit=crop"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
          />
          {/* Blue top accent */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${BLUE}, transparent)` }} />

          <div
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20"
            style={{ animation: 'fadeUp 0.6s ease both' }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left — text */}
              <div className="space-y-5">
                <SectionLabel>Complete Collection</SectionLabel>
                <h1 className="font-display text-5xl md:text-6xl text-white leading-[1.05] tracking-tight">
                  All <span style={{ color: ORANGE }}>Products</span>
                </h1>
                <p className="text-slate-400 text-base leading-relaxed max-w-md">
                  Computers, laptops &amp; cutting-edge technology everything you need in one place.
                </p>

                {/* Search bar inside hero */}
                <div
                  className="flex items-center gap-3 max-w-sm px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}
                >
                  <Search className="w-4 h-4 shrink-0" style={{ color: BLUE }} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-1 text-sm bg-transparent focus:outline-none text-white placeholder:text-slate-500"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="text-slate-500 hover:text-white transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            
            </div>
          </div>

          {/* Orange bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)` }} />
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════════════════════════════ */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">

          {/* ── HOT DEALS ────────────────────────────────────────────────── */}
          {dealProducts.length > 0 && (
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#070f25', border: '1px solid rgba(249,115,22,0.15)' }}
            >
              <button
                onClick={() => setShowDeals(!showDeals)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}
                  >
                    <Flame className="w-4 h-4" style={{ color: ORANGE }} />
                  </div>
                  <div className="text-left">
                    <h2 className="font-display text-base text-white">Hot Deals</h2>
                    <p className="text-[10px] text-slate-500">Limited time offers</p>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(249,115,22,0.15)', color: ORANGE }}
                  >
                    {dealProducts.length} deals
                  </span>
                </div>
                <ChevronDown
                  className="w-4 h-4 text-slate-400 transition-transform duration-300"
                  style={{ transform: showDeals ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {showDeals && (
                <div
                  className="px-6 pb-6 grid grid-cols-2 md:grid-cols-4 gap-5"
                  style={{ animation: 'slideDown 0.3s ease both', borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="col-span-full pt-5" />
                  {dealProducts.map(p => <DealTile key={p._id} product={p} />)}
                </div>
              )}
            </div>
          )}

          {/* ── FILTER + SORT BAR ─────────────────────────────────────────── */}
          <div
            className="rounded-2xl px-5 py-4 space-y-4"
            style={{ background: '#070f25', border: '1px solid rgba(37,99,235,0.12)' }}
          >
            {/* Top row: filter toggle + sort + count */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: filtersOpen ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.07)',
                  border: `1px solid rgba(37,99,235,${filtersOpen ? '0.4' : '0.2'})`,
                  color: filtersOpen ? '#60a5fa' : '#94a3b8',
                }}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
                <ChevronDown
                  className="w-3 h-3 transition-transform duration-200"
                  style={{ transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <div className="flex items-center gap-4 ml-auto">
                <span className="text-xs text-slate-500">{sorted.length} products</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 hidden sm:block">Sort:</span>
                  <ProductSort currentSort={sortBy} onSortChange={setSortBy} />
                </div>
              </div>
            </div>

            {/* Expandable filter panel */}
            {filtersOpen && (
              <div className="pt-3 space-y-3" style={{ animation: 'slideDown 0.25s ease both', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {/* Category pills */}
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">Category</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['', ...availableCategories].map(cat => (
                      <button
                        key={cat || 'all'}
                        onClick={() => setSelectedCategory(cat)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
                        style={{
                          background: selectedCategory === cat ? BLUE : 'rgba(37,99,235,0.07)',
                          color: selectedCategory === cat ? 'white' : '#94a3b8',
                          border: selectedCategory === cat ? `1px solid ${BLUE}` : '1px solid rgba(37,99,235,0.15)',
                        }}
                      >
                        {cat || 'All'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── SECTION TITLE ────────────────────────────────────────────── */}
          <div className="flex items-end justify-between">
            <div>
              <SectionLabel>Browse</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight">Products</h2>
            </div>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('') }}
                className="text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                style={{ color: ORANGE, border: '1px solid rgba(249,115,22,0.25)', background: 'rgba(249,115,22,0.07)' }}
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          {/* ── PRODUCT GRID ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonTile key={i} />)
              : sorted.map((p, i) => <ProductTile key={p._id} product={p} index={i} />)
            }
          </div>

          {/* ── EMPTY STATE ──────────────────────────────────────────────── */}
          {!loading && sorted.length === 0 && (
            <div
              className="text-center py-20 rounded-2xl"
              style={{ animation: 'fadeUp 0.4s ease both', background: '#070f25', border: '1px solid rgba(37,99,235,0.1)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
              >
                <Search className="w-6 h-6" style={{ color: BLUE }} />
              </div>
              <h3 className="font-display text-xl text-white mb-2">No products found</h3>
              <p className="text-slate-500 text-sm mb-6">Try adjusting your search or clearing filters.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('') }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 orange-glow"
                style={{ background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})` }}
              >
                Reset filters <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── LOAD MORE ─────────────────────────────────────────────────── */}
          {hasMore && !loading && sorted.length > 0 && (
            <div className="text-center pb-6">
              <button
                onClick={() => fetchProducts(true)}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                style={{
                  color: ORANGE,
                  border: `1px solid rgba(249,115,22,0.35)`,
                  background: 'rgba(249,115,22,0.06)',
                }}
              >
                {loadingMore ? (
                  <>
                    <svg className="animate-spin h-4 w-4" style={{ color: ORANGE }} fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>Load More Products <ChevronDown className="w-4 h-4" /></>
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