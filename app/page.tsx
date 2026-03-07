'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Zap, Shield, Truck, Star } from 'lucide-react'
import FlashDealsSection from '@/components/flash-deals'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'

// ─── Brand colours ─────────────────────────────────────────────────────────────
const BLUE        = '#2563EB'
const BLUE_DARK   = '#1d4ed8'
const ORANGE      = '#f97316'
const ORANGE_DARK = '#ea580c'

// ─── Slide data ────────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    tag: 'New Arrival',
    headline: 'Unleash Your',
    highlight: 'Tech Potential',
    sub: 'Premium laptops engineered for blazing performance and razor-sharp precision.',
    cta: { label: 'Shop Laptops', href: '/category/laptops' },
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=1080&fit=crop',
    stat: { value: '500+', label: 'Laptop Models' },
  },
  {
    id: 2,
    tag: 'Ultra Displays',
    headline: 'See More,',
    highlight: 'Do More',
    sub: 'Crystal-clear monitors with HDR brilliance and immersive curved designs.',
    cta: { label: 'Shop Monitors', href: '/category/monitors-displays' },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1920&h=1080&fit=crop',
    stat: { value: '4K', label: 'Ultra HD Ready' },
  },
  {
    id: 3,
    tag: 'Power Builds',
    headline: 'Desktop Power',
    highlight: 'Redefined',
    sub: 'Workstation-class desktop PCs built for creators, engineers, and gamers.',
    cta: { label: 'Shop Desktops', href: '/category/desktops' },
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&h=1080&fit=crop',
    stat: { value: '100%', label: 'Build Quality' },
  },
  {
    id: 4,
    tag: 'Must-Have Gear',
    headline: 'Complete Your',
    highlight: 'Setup',
    sub: 'Top-tier accessories that turn a good rig into an unstoppable workstation.',
    cta: { label: 'Shop Accessories', href: '/category/accessories' },
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=1920&h=1080&fit=crop',
    stat: { value: '1000+', label: 'Accessories' },
  },
]

const categories = [
  { href: '/category/laptops',           label: 'Laptops',     sub: 'Portable power',    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop', count: '200+ items' },
  { href: '/category/monitors-displays', label: 'Monitors',    sub: 'Crystal displays',  img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop', count: '80+ items'  },
  { href: '/category/desktops',          label: 'Desktops',    sub: 'Raw performance',   img: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop', count: '120+ items' },
  { href: '/category/accessories',       label: 'Accessories', sub: 'Complete your rig', img: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=400&fit=crop', count: '500+ items' },
]

const trustBadges = [
  { icon: <Truck  className="w-5 h-5" />, title: 'Fast Delivery',    sub: 'Nairobi same-day'    },
  { icon: <Shield className="w-5 h-5" />, title: 'Warranty Assured', sub: 'On all products'     },
  { icon: <Zap    className="w-5 h-5" />, title: 'Genuine Stock',    sub: '100% authentic'      },
  { icon: <Star   className="w-5 h-5" />, title: 'Top Rated',        sub: '4.9★ customer score' },
]

// ─── Product Tile ──────────────────────────────────────────────────────────────
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
      style={{ animation: 'fadeUp 0.5s ease both', animationDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      <div
        className="relative overflow-hidden rounded-xl mb-3 aspect-square transition-all duration-300"
        style={{ background: '#0d1b3e', border: '1px solid rgba(37,99,235,0.2)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.5)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)')}
      >
        <img src={displayImage} alt={product.name} className="w-full h-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.06]" />
        {hasDiscount && discountPct && (
          <span className="absolute top-2.5 left-2.5 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider" style={{ background: ORANGE }}>
            -{discountPct}%
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-14 flex items-end justify-center pb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(13,27,62,0.9), transparent)' }}>
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: ORANGE }}>Quick View →</span>
        </div>
      </div>
      <h3 className="text-xs font-medium text-slate-300 line-clamp-2 leading-snug mb-1.5 group-hover:text-orange-400 transition-colors duration-200">{product.name}</h3>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-white">KSh {price.toLocaleString()}</span>
        {oldPrice && <span className="text-[11px] line-through text-slate-500">KSh {oldPrice.toLocaleString()}</span>}
      </div>
    </Link>
  )
}

function SkeletonTile() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-xl w-full mb-3" style={{ background: 'rgba(37,99,235,0.08)' }} />
      <div className="space-y-1.5">
        <div className="h-2.5 rounded w-full"  style={{ background: 'rgba(37,99,235,0.08)' }} />
        <div className="h-2.5 rounded w-3/4"   style={{ background: 'rgba(37,99,235,0.08)' }} />
        <div className="h-3   rounded w-1/2 mt-1" style={{ background: 'rgba(37,99,235,0.08)' }} />
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="block w-6 h-0.5" style={{ background: ORANGE }} />
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>{children}</span>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [current,   setCurrent]   = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const [collectionProducts, setCollectionProducts] = useState<IProduct[]>([])
  const [loadingCollection,  setLoadingCollection]  = useState(true)
  const [loadingMore,        setLoadingMore]         = useState(false)
  const [collectionPage,     setCollectionPage]      = useState(1)
  const [hasMoreProducts,    setHasMoreProducts]     = useState(true)

  const goTo = useCallback((index: number, dir: 'next' | 'prev' = 'next') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => { setCurrent(index); setAnimating(false) }, 450)
  }, [animating])

  const nextSlide = useCallback(() => goTo((current + 1) % heroSlides.length, 'next'), [current, goTo])
  const prevSlide = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length, 'prev'), [current, goTo])

  useEffect(() => { const id = setInterval(nextSlide, 5500); return () => clearInterval(id) }, [nextSlide])
  useEffect(() => { fetchCollectionProducts() }, [])

  const fetchCollectionProducts = async (loadMore = false) => {
    try {
      loadMore ? setLoadingMore(true) : setLoadingCollection(true)
      const page = loadMore ? collectionPage : 1
      const res  = await fetch(`/api/products?catalog=true&page=${page}&limit=40`)
      if (res.ok) {
        const data = await res.json()
        setCollectionProducts(prev => loadMore ? [...prev, ...data.products] : data.products)
        setHasMoreProducts(data.products.length === 40)
        setCollectionPage(loadMore ? collectionPage + 1 : 2)
      }
    } catch (err) { console.error(err) }
    finally { setLoadingCollection(false); setLoadingMore(false) }
  }

  const slide = heroSlides[current]

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#060e24' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif !important; }
        @keyframes slideProgress { from{width:0%} to{width:100%} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .scrollbar-hide::-webkit-scrollbar { display:none }
        .orange-glow { box-shadow: 0 0 28px rgba(249,115,22,0.30); }
        .blue-glow   { box-shadow: 0 0 28px rgba(37,99,235,0.30);  }
      `}</style>

      <Header />

      <main className="flex-1">

        {/* ════════════════════════════════════════════════════════════════════
            HERO — Full-bleed background image, single-column slideshow
            Exactly matches About page hero recipe
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden select-none" style={{ minHeight: 580 }}>

          {/* Background photos — cross-fade per slide */}
          {heroSlides.map((s, i) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.headline}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity:    i === current ? 1 : 0,
                transform:  i === current ? 'scale(1.04)' : 'scale(1.1)',
                transition: 'opacity 0.7s ease, transform 8s ease-out',
              }}
            />
          ))}

          {/* Dark overlay layers — same recipe as About page */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(6,14,36,0.96) 0%, rgba(6,14,36,0.82) 45%, rgba(6,14,36,0.50) 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(6,14,36,0.65) 0%, transparent 55%)'
          }} />

          {/* Brand-colour mesh glows layered over the photo */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 8% 55%, rgba(37,99,235,0.22) 0%, transparent 45%),
                              radial-gradient(circle at 88% 18%, rgba(249,115,22,0.16) 0%, transparent 40%)`
          }} />

      

          {/* Top blue accent rule */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${BLUE},transparent)` }} />

          {/* ── Slide content — single column, left-aligned ── */}
          <div
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
            style={{ minHeight: 580 }}
          >
            <div
              className="max-w-2xl space-y-6 py-20"
              style={{
                opacity:   animating ? 0 : 1,
                transform: animating ? `translateY(${direction === 'next' ? '16px' : '-16px'})` : 'translateY(0)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
  

              {/* Slide tag — same SectionLabel style as About page */}
              <div className="flex items-center gap-3">
                <span className="block w-6 h-0.5" style={{ background: ORANGE }} />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>
                  {slide.tag}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight">
                {slide.headline}
                <br />
                <span style={{ color: ORANGE }}>{slide.highlight}</span>
              </h1>

              {/* Sub-copy */}
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-lg">
                {slide.sub}
              </p>


              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href={slide.cta.href}>
                  <button
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white hover:scale-105 transition-all orange-glow"
                    style={{ background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})` }}
                  >
                    {slide.cta.label}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link href="/products">
                  <button
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                  >
                    Browse All
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all focus:outline-none"
            style={{ background: 'rgba(6,14,36,0.55)', border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(37,99,235,0.5)`; e.currentTarget.style.background = 'rgba(37,99,235,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(6,14,36,0.55)' }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all focus:outline-none"
            style={{ background: 'rgba(6,14,36,0.55)', border: `1px solid rgba(37,99,235,0.4)` }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,14,36,0.55)' }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" style={{ color: BLUE }} />
          </button>

          {/* Thumbnail strip (desktop) */}
          <div className="absolute bottom-6 right-6 hidden lg:flex gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                className="relative w-20 h-12 rounded-lg overflow-hidden focus:outline-none transition-all duration-300"
                style={{
                  border:     i === current ? `2px solid ${ORANGE}` : '1px solid rgba(255,255,255,0.15)',
                  opacity:    i === current ? 1 : 0.5,
                  transform:  i === current ? 'scale(1.06)' : 'scale(1)',
                }}
              >
                <img src={s.image} alt={s.headline} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
                {i === current && (
                  <span className="absolute bottom-0 left-0 h-0.5"
                    style={{ background: ORANGE, animation: 'slideProgress 5.5s linear infinite' }} />
                )}
              </button>
            ))}
          </div>

          {/* Bottom orange accent rule */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(249,115,22,0.45),transparent)' }} />
        </section>



        {/* ════════════════════════════════════════════════════════════════════
            BEST SELLERS
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ background: '#070f25' }} className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <SectionLabel>Popular Choices</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight">Best Sellers</h2>
              </div>
              <Link href="/products?filter=bestsellers"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold transition-colors px-4 py-2 rounded-lg"
                style={{ color: ORANGE, border: `1px solid rgba(249,115,22,0.3)` }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(249,115,22,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <FlashDealsSection />
            <div className="mt-6 md:hidden">
              <Link href="/products?filter=bestsellers"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold"
                style={{ color: ORANGE, border: `1px solid rgba(249,115,22,0.3)` }}>
                View All Best Sellers <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            CATEGORIES
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ background: '#060e24' }} className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <SectionLabel>Browse</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight">Featured Categories</h2>
              </div>
              <Link href="/products" className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                All Categories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <Link key={cat.href} href={cat.href} className="group relative overflow-hidden rounded-2xl"
                  style={{ aspectRatio: i === 0 ? '1/1.15' : '1/1' }}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${cat.img}')` }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,14,36,0.25) 0%, rgba(6,14,36,0.88) 100%)' }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(180deg, transparent 40%, rgba(37,99,235,0.2) 100%)` }} />
                  <div className="absolute inset-0 rounded-2xl transition-colors duration-300"
                    style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `rgba(37,99,235,0.45)`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                  />
                  <div className="relative h-full flex flex-col justify-between p-4">
                    <div className="self-end">
                      <span className="text-[9px] font-bold text-white/40 tracking-wider uppercase">{cat.count}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-white mb-0.5">{cat.label}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{cat.sub}</span>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                          style={{ background: BLUE }}>
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            ALL PRODUCTS
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ background: '#070f25' }} className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <SectionLabel>Our Collection</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight">All Products</h2>
                <p className="text-sm text-slate-500 mt-1">Browse our complete range of premium tech</p>
              </div>
              {!loadingCollection && collectionProducts.length > 0 && (
                <Link href="/products"
                  className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                  style={{ color: ORANGE, border: `1px solid rgba(249,115,22,0.3)` }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(249,115,22,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {loadingCollection
                ? Array(10).fill(0).map((_, i) => <SkeletonTile key={i} />)
                : collectionProducts.map((p, i) => <ProductTile key={p._id} product={p} index={i} />)
              }
            </div>
            {hasMoreProducts && !loadingCollection && collectionProducts.length > 0 && (
              <div className="text-center pt-10">
                <button
                  onClick={() => fetchCollectionProducts(true)}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                  style={{ color: ORANGE, border: `1px solid rgba(249,115,22,0.35)`, background: 'rgba(249,115,22,0.06)' }}
                >
                  {loadingMore ? (
                    <><svg className="animate-spin h-4 w-4" style={{ color: ORANGE }} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Loading...</>
                  ) : (
                    <>Load More Products <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-20 md:py-24"
          style={{ background: `linear-gradient(135deg, #0a1628 0%, #0d1f47 100%)` }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, rgba(37,99,235,0.1) 0%, transparent 55%),
                              radial-gradient(circle at 10% 80%, rgba(249,115,22,0.08) 0%, transparent 45%)`
          }} />
          <img src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&h=800&fit=crop" alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.07] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${BLUE}, transparent)` }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <SectionLabel>Performance Unleashed</SectionLabel>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
                  Achieve Peak<br /><span style={{ color: ORANGE }}>Performance</span>
                </h2>
                <p className="text-slate-400 text-base leading-relaxed max-w-md">
                  Gear built for speed, endurance, and style. Every product curated for professionals, creators, and enthusiasts who refuse to compromise.
                </p>
                <div className="flex gap-3">
                  <Link href="/products">
                    <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white hover:scale-105 transition-all orange-glow"
                      style={{ background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})` }}>
                      Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/about">
                    <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '10K+',  label: 'Happy Customers',  color: 'orange' },
                  { val: '1500+', label: 'Products in Stock', color: 'blue'   },
                  { val: '99%',   label: 'Satisfaction Rate', color: 'blue'   },
                  { val: '5★',    label: 'Average Rating',    color: 'orange' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl p-5" style={{
                    background: stat.color === 'orange' ? 'rgba(249,115,22,0.08)' : 'rgba(37,99,235,0.1)',
                    border: stat.color === 'orange' ? '1px solid rgba(249,115,22,0.2)' : `1px solid rgba(37,99,235,0.25)`,
                  }}>
                    <div className="font-display text-3xl mb-1" style={{ color: stat.color === 'orange' ? ORANGE : BLUE }}>{stat.val}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(249,115,22,0.35),transparent)' }} />
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            ABOUT
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ background: '#060e24', borderTop: '1px solid rgba(255,255,255,0.04)' }} className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 pointer-events-none" style={{ borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}`, borderRadius: '12px 0 0 0', opacity: 0.5 }} />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none" style={{ borderBottom: `2px solid ${ORANGE}`, borderRight: `2px solid ${ORANGE}`, borderRadius: '0 0 12px 0', opacity: 0.5 }} />
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop" alt="Technology Workspace"
                  className="relative rounded-2xl w-full" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
                <div className="absolute -bottom-5 left-6 px-4 py-2.5 rounded-xl flex items-center gap-3"
                  style={{ background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE})`, boxShadow: `0 8px 24px rgba(37,99,235,0.4)` }}>
                  <Star className="w-4 h-4 text-white fill-white" />
                  <span className="text-xs font-bold text-white">Kenya's #1 Tech Store</span>
                </div>
              </div>
              <div className="space-y-6 pt-6 md:pt-0">
                <div>
                  <SectionLabel>About Allstar Tech</SectionLabel>
                  <h2 className="font-display text-3xl md:text-4xl text-white leading-[1.1] tracking-tight">
                    Elevate Your Tech<br /><span style={{ color: ORANGE }}>Experience</span>
                  </h2>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  At Allstar Tech, we believe every device should empower you to achieve more. Whether you're building a powerful workstation, upgrading your gaming setup, or finding the perfect laptop for productivity, our premium technology products are designed to push your limits.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Explore our collection of cutting-edge computers, high-performance components, and top-tier accessories — trusted by professionals and enthusiasts across Kenya.
                </p>
                <div className="flex gap-3 pt-1">
                  <Link href="/products">
                    <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white hover:scale-105 transition-all orange-glow"
                      style={{ background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})` }}>
                      Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/about">
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
                      Our Story
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}