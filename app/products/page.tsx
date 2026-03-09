'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'
import ProductSort from '@/components/product-sort'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {
  ArrowRight, ChevronDown, Search, X, Flame,
  SlidersHorizontal, LayoutGrid, List, Heart,
  ShoppingCart, Eye, Star, Tag, Zap, TrendingUp,
  ChevronRight, Filter, Check
} from 'lucide-react'

type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'rating' | 'newest' | 'name-a-z' | 'name-z-a'
type ViewMode  = 'grid' | 'list'

// ─── Design tokens (matches homepage & header) ────────────────────────────────
const T = {
  orange:     '#f97316',
  orangeDark: '#ea580c',
  orangePale: '#fff7ed',
  orangeMid:  '#fed7aa',
  white:      '#ffffff',
  offWhite:   '#fafaf9',
  stone100:   '#f5f5f4',
  stone200:   '#e7e5e4',
  stone300:   '#d6d3d1',
  stone400:   '#a8a29e',
  stone500:   '#78716c',
  stone600:   '#57534e',
  stone700:   '#44403c',
  stone800:   '#292524',
  stone900:   '#1c1917',
  green:      '#16a34a',
  greenPale:  '#f0fdf4',
  red:        '#dc2626',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const badgeColor: Record<string, string> = {
  'Hot Deal':   T.orange,
  'Best Seller':T.orange,
  'New':        '#059669',
  'Limited':    T.red,
  'Sale':       T.orange,
  'Flash':      T.orangeDark,
}

// ─── Product Card — Grid view ─────────────────────────────────────────────────
function ProductCardGrid({ product, index }: { product: IProduct; index: number }) {
  const img = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const disc = oldPrice && oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : null
  const isFlash = product.flashDealDiscount && product.flashDealDiscount > 0
  const discLabel = isFlash ? product.flashDealDiscount : disc
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: T.white,
        border: `1.5px solid ${hovered ? T.orange : T.stone200}`,
        boxShadow: hovered ? '0 8px 32px rgba(249,115,22,0.13)' : '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.28s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        animation: 'fadeUp 0.5s ease both',
        animationDelay: `${Math.min(index * 40, 400)}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: T.stone100 }}>
        <Link href={`/product/${product._id}`}>
          <img src={img} alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.07]" />
        </Link>

        {/* Discount badge */}
        {discLabel && (
          <span className="absolute top-3 left-3 text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-wide"
            style={{ background: T.orange }}>
            -{discLabel}%
          </span>
        )}
        {/* Flash badge */}
        {isFlash && (
          <span className="absolute top-3 left-3 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1"
            style={{ background: T.orangeDark }}>
            <Flame className="w-2.5 h-2.5" /> Flash
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setLiked(l => !l) }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: liked ? T.orange : 'rgba(255,255,255,0.9)',
            border: `1.5px solid ${liked ? T.orange : T.stone200}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>
          <Heart className="w-3.5 h-3.5" style={{ color: liked ? T.white : T.stone400, fill: liked ? T.white : 'transparent' }} />
        </button>

        {/* Hover actions overlay */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.9) 0%, transparent 100%)' }}>
          <Link href={`/product/${product._id}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-bold text-white backdrop-blur-sm transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <Eye className="w-3.5 h-3.5" /> View
          </Link>
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-bold text-white backdrop-blur-sm transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <ShoppingCart className="w-3.5 h-3.5" /> Cart
          </button>
        </div>

        {/* In-stock dot */}
        {product.stock > 0 && (
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-0" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {product.category && (
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: T.stone400 }}>
            {product.category}
          </span>
        )}
        <Link href={`/product/${product._id}`}>
          <h3 className="text-sm font-semibold line-clamp-2 leading-snug transition-colors duration-200"
            style={{ color: T.stone900 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone900}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-3 h-3"
                  style={{ fill: i <= Math.floor(product.rating) ? '#fbbf24' : 'transparent', color: i <= Math.floor(product.rating) ? '#fbbf24' : T.stone300 }} />
              ))}
            </div>
            <span className="text-[10px] font-semibold" style={{ color: T.stone400 }}>
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <span className="text-base font-black" style={{ color: T.orange }}>
              KSh {price.toLocaleString()}
            </span>
            {oldPrice && (
              <span className="ml-1.5 text-[11px] line-through" style={{ color: T.stone400 }}>
                KSh {oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          {/* {product.stock > 0
            ? <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: T.greenPale, color: T.green }}>In Stock</span>
            : <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#fef2f2', color: T.red }}>Out of Stock</span>
          } */}
        </div>
      </div>
    </div>
  )
}

// ─── Product Row — List view ──────────────────────────────────────────────────
function ProductRowList({ product, index }: { product: IProduct; index: number }) {
  const img = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const disc = oldPrice && oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : null
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex items-center gap-5 rounded-2xl p-4 transition-all duration-250"
      style={{
        background: T.white,
        border: `1.5px solid ${hovered ? T.orange : T.stone200}`,
        boxShadow: hovered ? '0 4px 20px rgba(249,115,22,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
        animation: 'fadeUp 0.5s ease both',
        animationDelay: `${Math.min(index * 35, 350)}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link href={`/product/${product._id}`} className="flex-shrink-0">
        <div className="w-24 h-24 rounded-xl overflow-hidden relative" style={{ background: T.stone100, border: `1.5px solid ${T.stone200}` }}>
          <img src={img} alt={product.name} className="w-full h-full object-contain p-2 transition-transform duration-400 group-hover:scale-105" />
          {disc && (
            <span className="absolute top-1.5 left-1.5 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full"
              style={{ background: T.orange }}>-{disc}%</span>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        {product.category && (
          <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: T.stone400 }}>{product.category}</p>
        )}
        <Link href={`/product/${product._id}`}>
          <h3 className="text-sm font-semibold leading-snug mb-1.5 transition-colors duration-150"
            style={{ color: T.stone900 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone900}>
            {product.name}
          </h3>
        </Link>
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-3 h-3"
                style={{ fill: i <= Math.floor(product.rating) ? '#fbbf24' : 'transparent', color: i <= Math.floor(product.rating) ? '#fbbf24' : T.stone300 }} />
            ))}
            <span className="text-[10px] ml-1" style={{ color: T.stone400 }}>{product.rating.toFixed(1)}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <span className="text-base font-black" style={{ color: T.orange }}>KSh {price.toLocaleString()}</span>
          {oldPrice && <span className="text-xs line-through" style={{ color: T.stone400 }}>KSh {oldPrice.toLocaleString()}</span>}
          {product.stock > 0
            ? <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: T.greenPale, color: T.green }}>In Stock</span>
            : <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#fef2f2', color: T.red }}>Out of Stock</span>
          }
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={() => setLiked(l => !l)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 hover:scale-110"
          style={{ background: liked ? T.orangePale : T.offWhite, border: `1.5px solid ${liked ? T.orange : T.stone200}` }}>
          <Heart className="w-4 h-4" style={{ color: liked ? T.orange : T.stone400, fill: liked ? T.orange : 'transparent' }} />
        </button>
        <Link href={`/product/${product._id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})`, boxShadow: '0 2px 8px rgba(249,115,22,0.3)' }}>
          View <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

// ─── Deal Tile ────────────────────────────────────────────────────────────────
function DealTile({ product }: { product: IProduct }) {
  const img = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const discount = product.flashDealDiscount || 20
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/product/${product._id}`} className="group block">
      <div className="relative overflow-hidden aspect-square rounded-2xl mb-3 transition-all duration-300"
        style={{
          background: T.stone100,
          border: `1.5px solid ${hovered ? T.orange : T.stone200}`,
          boxShadow: hovered ? '0 8px 28px rgba(249,115,22,0.15)' : 'none',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <img src={img} alt={product.name}
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.06]" />
        <span className="absolute top-2.5 left-2.5 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1"
          style={{ background: T.orange }}>
          <Flame className="w-2.5 h-2.5" /> -{discount}%
        </span>
        <div className="absolute inset-x-0 bottom-0 h-14 flex items-end justify-center pb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, rgba(249,115,22,0.85), transparent)` }}>
          <span className="text-[10px] font-bold tracking-widest uppercase text-white">Shop Now →</span>
        </div>
      </div>
      <p className="text-[9px] uppercase tracking-widest font-bold mb-0.5" style={{ color: T.stone400 }}>{product.category}</p>
      <h3 className="text-xs font-semibold line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors duration-200 mb-1"
        style={{ color: T.stone800 }}>
        {product.name}
      </h3>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-black" style={{ color: T.orange }}>KSh {price.toLocaleString()}</span>
        {oldPrice && <span className="text-[10px] line-through" style={{ color: T.stone400 }}>KSh {oldPrice.toLocaleString()}</span>}
      </div>
    </Link>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: T.white, border: `1.5px solid ${T.stone100}` }}>
      <div className="aspect-square" style={{ background: T.stone100 }} />
      <div className="p-4 space-y-2.5">
        <div className="h-2 rounded-full w-1/3"  style={{ background: T.stone200 }} />
        <div className="h-3 rounded-full w-full" style={{ background: T.stone200 }} />
        <div className="h-3 rounded-full w-3/4" style={{ background: T.stone200 }} />
        <div className="h-4 rounded-full w-1/2 mt-2" style={{ background: T.orangeMid || '#fed7aa' }} />
      </div>
    </div>
  )
}

// ─── Section Tag ──────────────────────────────────────────────────────────────
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-2">
      <span style={{ display:'block', width:28, height:2.5, borderRadius:2, background: T.orange }} />
      <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color: T.orange, fontFamily:"'Outfit',sans-serif" }}>
        {children}
      </span>
    </div>
  )
}

// ─── Category Pill ────────────────────────────────────────────────────────────
function CategoryPill({ label, active, count, onClick }: { label:string; active:boolean; count?:number; onClick:()=>void }) {
  const [hovered, setHovered] = useState(false)
  const isOn = active || hovered
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
      style={{
        background: active ? T.orange : hovered ? T.orangePale : T.white,
        color:      active ? T.white  : hovered ? T.orange     : T.stone600,
        border:     `1.5px solid ${active ? T.orange : hovered ? T.orange : T.stone200}`,
        boxShadow:  active ? '0 2px 8px rgba(249,115,22,0.3)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {active && <Check className="w-3 h-3" />}
      {label}
      {count !== undefined && (
        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-black"
          style={{ background: active ? 'rgba(255,255,255,0.25)' : T.stone100, color: active ? T.white : T.stone500 }}>
          {count}
        </span>
      )}
    </button>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products,            setProducts]            = useState<IProduct[]>([])
  const [dealProducts,        setDealProducts]        = useState<IProduct[]>([])
  const [loading,             setLoading]             = useState(true)
  const [loadingMore,         setLoadingMore]         = useState(false)
  const [page,                setPage]                = useState(1)
  const [hasMore,             setHasMore]             = useState(true)
  const [searchTerm,          setSearchTerm]          = useState('')
  const [sortBy,              setSortBy]              = useState<SortOption>('featured')
  const [selectedCategory,    setSelectedCategory]    = useState('')
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  const [showDeals,           setShowDeals]           = useState(true)
  const [filtersOpen,         setFiltersOpen]         = useState(false)
  const [viewMode,            setViewMode]            = useState<ViewMode>('grid')
  const [priceRange,          setPriceRange]          = useState<[number,number]>([0, 500000])
  const [inStockOnly,         setInStockOnly]         = useState(false)
  const [activeFiltersCount,  setActiveFiltersCount]  = useState(0)

  useEffect(() => {
    fetchProducts()
    fetchDealProducts()
    fetchCategories()
  }, [])

  // Track active filter count
  useEffect(() => {
    let count = 0
    if (selectedCategory) count++
    if (inStockOnly) count++
    if (priceRange[0] > 0 || priceRange[1] < 500000) count++
    setActiveFiltersCount(count)
  }, [selectedCategory, inStockOnly, priceRange])

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
      if (res.ok) { const d = await res.json(); setDealProducts(d.products || []) }
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

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setInStockOnly(false)
    setPriceRange([0, 500000])
  }

  const filtered = products.filter(p => {
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) && !p.category.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (selectedCategory && p.category !== selectedCategory) return false
    if (inStockOnly && !(p.stock > 0)) return false
    const { price } = getProductDisplayPrice(p)
    if (price < priceRange[0] || price > priceRange[1]) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    const { price: pA } = getProductDisplayPrice(a)
    const { price: pB } = getProductDisplayPrice(b)
    switch (sortBy) {
      case 'price-low-high': return pA - pB
      case 'price-high-low': return pB - pA
      case 'rating':         return (b.rating || 0) - (a.rating || 0)
      case 'newest':         return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      case 'name-a-z':       return a.name.localeCompare(b.name)
      case 'name-z-a':       return b.name.localeCompare(a.name)
      default:               return 0
    }
  })

  // Category counts
  const catCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif !important; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown{ from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        .scrollbar-hide::-webkit-scrollbar{ display:none }
        .scrollbar-hide{ -ms-overflow-style:none; scrollbar-width:none }
        .orange-glow{ box-shadow: 0 4px 24px rgba(249,115,22,0.4); }
      `}</style>

      <div className="min-h-screen flex flex-col" style={{ background: T.offWhite }}>
        <Header />

        {/* ══════════════════════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" style={{ background: T.stone900, minHeight: 280 }}>
          {/* Mesh glows */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:`radial-gradient(ellipse at 15% 60%, rgba(249,115,22,0.18) 0%, transparent 50%),
                             radial-gradient(ellipse at 85% 25%, rgba(249,115,22,0.10) 0%, transparent 45%)`
          }} />
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=600&fit=crop" alt=""
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.05, mixBlendMode: 'luminosity' }} />
          <div className="absolute top-0 inset-x-0 h-0.5" style={{ background:`linear-gradient(90deg,transparent,${T.orange},transparent)` }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20"
            style={{ animation: 'fadeUp 0.55s ease both' }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left */}
              <div className="space-y-5">
                <SectionTag>Complete Collection</SectionTag>
                <h1 className="font-display text-5xl md:text-6xl text-white leading-[1.04] tracking-tight">
                  All <span style={{ color: T.orange }}>Products</span>
                </h1>
                <p className="text-base leading-relaxed max-w-md" style={{ color: T.stone400 }}>
                  Computers, laptops &amp; cutting-edge technology everything you need in one place.
                </p>

                {/* Hero search */}
                <div className="flex items-center gap-3 max-w-sm px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)' }}
                  onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = T.orange}
                  onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'}>
                  <Search className="w-4 h-4 flex-shrink-0" style={{ color: T.orange }} />
                  <input
                    type="text"
                    placeholder="Search products…"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-slate-500"
                    style={{ color: T.white }}
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="transition-colors hover:text-white" style={{ color: T.stone400 }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-0.5" style={{ background:`linear-gradient(90deg,transparent,rgba(249,115,22,0.45),transparent)` }} />
        </section>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* ══════════════════════════════════════════════════════
              HOT DEALS SECTION
          ══════════════════════════════════════════════════════ */}
          {dealProducts.length > 0 && (
            <div className="rounded-2xl overflow-hidden"
              style={{ background: T.white, border: `1.5px solid ${T.stone200}`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <button
                onClick={() => setShowDeals(!showDeals)}
                className="w-full flex items-center justify-between px-6 py-4 transition-colors duration-150"
                style={{ background: showDeals ? T.orangePale : T.white }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.orangePale}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = showDeals ? T.orangePale : T.white}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: T.orange }}>
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-display text-base font-black" style={{ color: T.stone900 }}>Hot Deals</h2>
                    <p className="text-[10px] font-semibold" style={{ color: T.stone400 }}>Limited time offers</p>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
                    style={{ background: T.orange, color: T.white }}>
                    {dealProducts.length} deals
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 transition-transform duration-300"
                  style={{ color: T.stone400, transform: showDeals ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              {showDeals && (
                <div className="px-6 pb-6" style={{ borderTop:`1.5px solid ${T.stone100}`, animation:'slideDown 0.3s ease both' }}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-6">
                    {dealProducts.map(p => <DealTile key={p._id as string} product={p} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              FILTER + SORT TOOLBAR
          ══════════════════════════════════════════════════════ */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: T.white, border: `1.5px solid ${T.stone200}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>

            {/* Toolbar row */}
            <div className="flex items-center gap-3 px-5 py-4 flex-wrap">

              {/* Filter toggle */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: filtersOpen ? T.orange      : T.orangePale,
                  color:      filtersOpen ? T.white       : T.orange,
                  border:     `1.5px solid ${filtersOpen ? T.orange : T.orangeMid}`,
                }}>
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                    style={{ background: filtersOpen ? 'rgba(255,255,255,0.25)' : T.orange, color: T.white }}>
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              {/* Category quick pills — horizontal scroll */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 min-w-0">
                <CategoryPill label="All" active={selectedCategory === ''} onClick={() => setSelectedCategory('')} count={products.length} />
                {availableCategories.map(cat => (
                  <CategoryPill key={cat} label={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} count={catCounts[cat]} />
                ))}
              </div>

              {/* Right: view mode + sort + count */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold hidden sm:block" style={{ color: T.stone400 }}>{sorted.length} results</span>

                {/* View toggle */}
                <div className="flex rounded-xl overflow-hidden" style={{ border:`1.5px solid ${T.stone200}` }}>
                  {([['grid', <LayoutGrid className="w-4 h-4"/>], ['list', <List className="w-4 h-4"/>]] as [ViewMode, React.ReactNode][]).map(([mode, icon]) => (
                    <button key={mode} onClick={() => setViewMode(mode)}
                      className="w-9 h-9 flex items-center justify-center transition-all duration-150"
                      style={{
                        background: viewMode === mode ? T.orange : T.white,
                        color:      viewMode === mode ? T.white  : T.stone400,
                      }}>
                      {icon}
                    </button>
                  ))}
                </div>

                <ProductSort currentSort={sortBy} onSortChange={setSortBy} />
              </div>
            </div>

            {/* Expanded filters */}
            {filtersOpen && (
              <div className="px-5 pb-5 space-y-5" style={{ borderTop:`1.5px solid ${T.stone100}`, animation:'slideDown 0.25s ease both' }}>
                <div className="grid md:grid-cols-3 gap-6 pt-4">

                  {/* Price range */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: T.stone400 }}>Price Range</p>
                    <div className="space-y-2">
                      {[
                        [0, 30000,  'Under KSh 30K'],
                        [30000, 80000,  'KSh 30K – 80K'],
                        [80000, 200000, 'KSh 80K – 200K'],
                        [200000, 500000,'KSh 200K+'],
                      ].map(([min, max, label]) => (
                        <button key={label as string}
                          onClick={() => setPriceRange([min as number, max as number])}
                          className="flex items-center gap-2 w-full text-left text-xs font-semibold transition-all duration-150 px-3 py-2 rounded-xl"
                          style={{
                            background: priceRange[0] === min && priceRange[1] === max ? T.orangePale : 'transparent',
                            color: priceRange[0] === min && priceRange[1] === max ? T.orange : T.stone600,
                            border: `1.5px solid ${priceRange[0] === min && priceRange[1] === max ? T.orange : 'transparent'}`,
                          }}>
                          {priceRange[0] === min && priceRange[1] === max && <Check className="w-3 h-3 flex-shrink-0" />}
                          {label as string}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: T.stone400 }}>Availability</p>
                    <button onClick={() => setInStockOnly(!inStockOnly)}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold w-full text-left transition-all duration-150"
                      style={{
                        background: inStockOnly ? T.orangePale : T.offWhite,
                        border: `1.5px solid ${inStockOnly ? T.orange : T.stone200}`,
                        color: inStockOnly ? T.orange : T.stone700,
                      }}>
                      <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                        style={{ background: inStockOnly ? T.orange : T.white, border:`1.5px solid ${inStockOnly ? T.orange : T.stone300}` }}>
                        {inStockOnly && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      In Stock Only
                    </button>
                  </div>

                  {/* Reset */}
                  <div className="flex items-end">
                    {activeFiltersCount > 0 && (
                      <button onClick={clearFilters}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                        style={{ color: T.orange, border:`1.5px solid ${T.orangeMid}`, background: T.orangePale }}>
                        <X className="w-4 h-4" /> Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════════════════════
              SECTION HEADING + ACTIVE FILTER CHIPS
          ══════════════════════════════════════════════════════ */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <SectionTag>Browse</SectionTag>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight" style={{ color: T.stone900 }}>
                {selectedCategory || 'All'} <span style={{ color: T.orange }}>Products</span>
              </h2>
            </div>

            {/* Active filter chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {searchTerm && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: T.orangePale, color: T.orange, border:`1px solid ${T.orangeMid}` }}>
                  <Search className="w-3 h-3" /> "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: T.orangePale, color: T.orange, border:`1px solid ${T.orangeMid}` }}>
                  <Tag className="w-3 h-3" /> {selectedCategory}
                  <button onClick={() => setSelectedCategory('')} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: T.greenPale, color: T.green, border:`1px solid #bbf7d0` }}>
                  <Check className="w-3 h-3" /> In Stock
                  <button onClick={() => setInStockOnly(false)} className="hover:opacity-70"><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              PRODUCT GRID / LIST
          ══════════════════════════════════════════════════════ */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {loading
                ? Array(8).fill(0).map((_,i) => <SkeletonCard key={i} />)
                : sorted.map((p, i) => <ProductCardGrid key={p._id as string} product={p} index={i} />)
              }
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {loading
                ? Array(6).fill(0).map((_,i) => (
                    <div key={i} className="flex gap-4 rounded-2xl p-4 animate-pulse"
                      style={{ background: T.white, border:`1.5px solid ${T.stone100}` }}>
                      <div className="w-24 h-24 rounded-xl flex-shrink-0" style={{ background: T.stone100 }} />
                      <div className="flex-1 space-y-2.5 pt-1">
                        <div className="h-2 rounded-full w-1/4" style={{ background: T.stone200 }} />
                        <div className="h-3 rounded-full w-3/4" style={{ background: T.stone200 }} />
                        <div className="h-3 rounded-full w-1/2" style={{ background: T.stone200 }} />
                        <div className="h-4 rounded-full w-1/3" style={{ background: '#fed7aa' }} />
                      </div>
                    </div>
                  ))
                : sorted.map((p, i) => <ProductRowList key={p._id as string} product={p} index={i} />)
              }
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              EMPTY STATE
          ══════════════════════════════════════════════════════ */}
          {!loading && sorted.length === 0 && (
            <div className="text-center py-24 rounded-2xl" style={{ animation:'fadeUp 0.4s ease both', background: T.white, border:`1.5px solid ${T.stone200}` }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: T.orangePale, border:`1.5px solid ${T.orangeMid}` }}>
                <Search className="w-7 h-7" style={{ color: T.orange }} />
              </div>
              <h3 className="font-display text-xl mb-2" style={{ color: T.stone900 }}>No products found</h3>
              <p className="text-sm mb-6" style={{ color: T.stone400 }}>Try adjusting your search or clearing the filters.</p>
              <button onClick={clearFilters}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 orange-glow"
                style={{ background:`linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                Reset Filters <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              LOAD MORE
          ══════════════════════════════════════════════════════ */}
          {hasMore && !loading && sorted.length > 0 && (
            <div className="text-center pb-4">
              <button
                onClick={() => fetchProducts(true)}
                disabled={loadingMore}
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 orange-glow"
                style={{ background:`linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                {loadingMore ? (
                  <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>Loading…</>
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