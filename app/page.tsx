'use client'

import { ArrowRight, Laptop, Monitor, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FlashDealsSection from '@/components/flash-deals'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'

// ─── Hero Slide data ───────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    tag: 'New Arrival',
    headline: 'Unleash Your',
    highlight: 'Tech Potential',
    sub: 'Premium laptops engineered for blazing performance and razor-sharp precision.',
    cta: { label: 'Shop Laptops', href: '/category/laptops' },
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=1080&fit=crop',
    accent: 'from-blue-500 to-cyan-400',
    badge: 'bg-blue-500/20 border-blue-400/50 text-blue-300',
  },
  {
    id: 2,
    tag: 'Ultra Displays',
    headline: 'See More,',
    highlight: 'Do More',
    sub: 'Crystal-clear monitors with HDR brilliance and immersive curved designs.',
    cta: { label: 'Shop Monitors', href: '/category/monitors-displays' },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1920&h=1080&fit=crop',
    accent: 'from-cyan-500 to-teal-400',
    badge: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300',
  },
  {
    id: 3,
    tag: 'Power Builds',
    headline: 'Desktop Power',
    highlight: 'Redefined',
    sub: 'Workstation-class desktop PCs built for creators, engineers, and gamers.',
    cta: { label: 'Shop Desktops', href: '/category/desktops' },
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&h=1080&fit=crop',
    accent: 'from-violet-500 to-blue-500',
    badge: 'bg-violet-500/20 border-violet-400/50 text-violet-300',
  },
  {
    id: 4,
    tag: 'Must-Have Gear',
    headline: 'Complete Your',
    highlight: 'Setup',
    sub: 'Top-tier accessories that turn a good rig into an unstoppable workstation.',
    cta: { label: 'Shop Accessories', href: '/category/accessories' },
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=1920&h=1080&fit=crop',
    accent: 'from-indigo-500 to-cyan-400',
    badge: 'bg-indigo-500/20 border-indigo-400/50 text-indigo-300',
  },
]

// ─── Thumbnail strip images ────────────────────────────────────────────────────
const heroThumbs = [
  { src: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=140&fit=crop', label: 'Laptops' },
  { src: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=140&fit=crop', label: 'Monitors' },
  { src: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=200&h=140&fit=crop', label: 'Desktops' },
  { src: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200&h=140&fit=crop', label: 'Accessories' },
]

// ─── Product Tile Component ────────────────────────────────────────────────────
function ProductTile({ product, index }: { product: IProduct; index: number }) {
  const displayImage = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const hasDiscount = oldPrice && oldPrice > price
  const isFlashDeal = product.flashDealDiscount && product.flashDealDiscount > 0

  return (
    <Link
      href={`/product/${product._id}`}
      className="group block"
      style={{
        animation: 'fadeUp 0.5s ease both',
        animationDelay: `${Math.min(index * 60, 480)}ms`,
      }}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-square mb-2.5">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 tracking-wide">
            {isFlashDeal ? `-${product.flashDealDiscount}%` : 'SALE'}
          </span>
        )}
      </div>

      {/* NAME */}
      <h3 className="text-xs font-medium tracking-wide uppercase text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-200">
        {product.name}
      </h3>

      {/* PRICE */}
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

// ─── Skeleton Tile ──────────────────────────────────────────────────────────────
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

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // ── Hero slideshow state ──────────────────────────────────────────────────────
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  // ── Collection state ──────────────────────────────────────────────────────────
  const [collectionProducts, setCollectionProducts] = useState<IProduct[]>([])
  const [loadingCollection, setLoadingCollection] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [collectionPage, setCollectionPage] = useState(1)
  const [hasMoreProducts, setHasMoreProducts] = useState(true)

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev' = 'next') => {
      if (animating) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setCurrent(index)
        setAnimating(false)
      }, 500)
    },
    [animating]
  )

  const nextSlide = useCallback(() => {
    goTo((current + 1) % heroSlides.length, 'next')
  }, [current, goTo])

  const prevSlide = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length, 'prev')
  }, [current, goTo])

  // Auto-advance every 5 s
  useEffect(() => {
    const id = setInterval(nextSlide, 5000)
    return () => clearInterval(id)
  }, [nextSlide])

  // ── Fetch collection products ─────────────────────────────────────────────────
  useEffect(() => {
    fetchCollectionProducts()
  }, [])

  const fetchCollectionProducts = async (loadMore = false) => {
    try {
      loadMore ? setLoadingMore(true) : setLoadingCollection(true)
      const currentPage = loadMore ? collectionPage : 1
      const res = await fetch(`/api/products?catalog=true&page=${currentPage}&limit=40`)
      if (res.ok) {
        const data = await res.json()
        setCollectionProducts(prev => loadMore ? [...prev, ...data.products] : data.products)
        setHasMoreProducts(data.products.length === 40)
        setCollectionPage(loadMore ? collectionPage + 1 : 2)
      }
    } catch (err) {
      console.error('Error fetching collection:', err)
    } finally {
      setLoadingCollection(false)
      setLoadingMore(false)
    }
  }

  const slide = heroSlides[current]

  // ── Category scroll ───────────────────────────────────────────────────────────
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350
      const currentScroll = scrollContainerRef.current.scrollLeft
      const targetScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">

        {/* ══════════════════════════════════════════════════════════════════════
            HERO SECTION — Animated Slideshow Banner
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative h-[600px] md:h-[720px] overflow-hidden select-none">

          {/* Background layers — one per slide, cross-fade */}
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <img
                src={s.image}
                alt={s.highlight}
                className="w-full h-full object-cover"
                style={{
                  transform: i === current ? 'scale(1.05)' : 'scale(1.12)',
                  transition: 'transform 8s ease-out',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Tech-grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>
          ))}

          {/* Ambient glow orbs (accent-matched) */}
          <div
            className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-gradient-to-br ${slide.accent} transition-all duration-700`}
          />
          <div
            className={`absolute -bottom-32 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 bg-gradient-to-br ${slide.accent} transition-all duration-700`}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-[float_6s_ease-in-out_infinite]" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-[float_8s_ease-in-out_infinite_1s]" />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-[float_7s_ease-in-out_infinite_2s]" />
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-[float_9s_ease-in-out_infinite_1.5s]" />
            <div className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-blue-400 rounded-full animate-[float_7.5s_ease-in-out_infinite_0.5s]" />
          </div>

          {/* ── Slide content ── */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div
              className="max-w-2xl space-y-6"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${direction === 'next' ? '-40px' : '40px'})`
                  : 'translateX(0)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
              }}
            >
              {/* Badge */}
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-full text-xs font-bold tracking-widest uppercase ${slide.badge}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {slide.tag}
              </span>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white tracking-tight">
                {slide.headline}
                <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>
                  {slide.highlight}
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-lg md:text-xl text-slate-300 font-light max-w-lg leading-relaxed">
                {slide.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={slide.cta.href}>
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${slide.accent} text-white px-12 py-7 text-lg font-bold shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl group`}
                  >
                    {slide.cta.label}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 px-12 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Browse All
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Thumbnail strip (desktop) ── */}
          <div className="absolute bottom-8 right-8 hidden lg:flex gap-3">
            {heroThumbs.map((t, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                className={`relative w-28 h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-300 focus:outline-none ${
                  i === current
                    ? 'border-white scale-105 shadow-lg shadow-white/20'
                    : 'border-white/20 opacity-60 hover:opacity-90 hover:border-white/50'
                }`}
              >
                <img src={t.src} alt={t.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute bottom-1 left-0 right-0 text-center text-[10px] font-bold text-white/90 tracking-wide uppercase">
                  {t.label}
                </span>
                {i === current && (
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${slide.accent}`}
                    style={{ animation: 'slideProgress 5s linear infinite' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Prev / Next arrows ── */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* ── Dot indicators (mobile) ── */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                  i === current
                    ? `w-8 bg-gradient-to-r ${slide.accent}`
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* ── Slide counter ── */}
          <div className="absolute top-6 right-6 text-white/50 text-xs font-mono tracking-widest hidden md:block">
            {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
          </div>

         
        

          {/* Inline keyframes */}
          <style>{`
            @keyframes slideProgress {
              from { width: 0% }
              to   { width: 100% }
            }
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(18px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            BEST SELLERS
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
                  Popular Choices
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Best Sellers</h2>
              </div>
              <Link href="/products?filter=bestsellers" className="hidden md:block">
                <Button variant="outline" size="sm" className="gap-2 border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 px-6 py-5 text-sm font-semibold rounded-xl transition-all duration-300">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <FlashDealsSection />
            <div className="text-center mt-6 md:hidden">
              <Link href="/products?filter=bestsellers">
                <Button variant="outline" size="lg" className="gap-2 border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 w-full">
                  View All Best Sellers
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            CATEGORY SHOWCASE — Horizontal Scroll
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                Shop By Category
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Featured Categories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our curated selection of premium tech products
              </p>
            </div>

            <div className="relative group">
              {/* Nav buttons */}
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50 hover:scale-110 transform -translate-x-6"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-slate-900" />
              </button>

              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50 hover:scale-110 transform translate-x-6"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-slate-900" />
              </button>

              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Laptops */}
                <Link href="/category/laptops" className="group flex-shrink-0 w-80 snap-start">
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                          <Laptop className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white mb-2">Laptops</h3>
                        <p className="text-slate-300 text-sm">Portable power for work and play</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Monitors */}
                <Link href="/category/monitors-displays" className="group flex-shrink-0 w-80 snap-start">
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-cyan-500 transition-all duration-300">
                          <Monitor className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white mb-2">Monitors</h3>
                        <p className="text-slate-300 text-sm">Crystal-clear displays for every need</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Desktops */}
                <Link href="/category/desktops" className="group flex-shrink-0 w-80 snap-start">
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                          <Monitor className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white mb-2">Desktops</h3>
                        <p className="text-slate-300 text-sm">Ultimate performance for professionals</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Accessories */}
                <Link href="/category/accessories" className="group flex-shrink-0 w-80 snap-start">
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-cyan-500 transition-all duration-300">
                          <Laptop className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white mb-2">Accessories</h3>
                        <p className="text-slate-300 text-sm">Complete your tech setup</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* View All */}
                <Link href="/products" className="group flex-shrink-0 w-80 snap-start">
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-black text-white mb-2">View All</h3>
                      <p className="text-white/90 text-sm">Explore our complete catalog</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            COLLECTION SECTION — All Products
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                Our Collection
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">All Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our complete range of premium tech products
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {loadingCollection
                ? Array(8).fill(0).map((_, i) => <SkeletonTile key={i} />)
                : collectionProducts.map((p, i) => <ProductTile key={p._id} product={p} index={i} />)
              }
            </div>

            {/* Load More Button */}
            {hasMoreProducts && !loadingCollection && collectionProducts.length > 0 && (
              <div className="text-center pt-10">
                <button
                  onClick={() => fetchCollectionProducts(true)}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-semibold text-gray-700 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Loading More...
                    </>
                  ) : (
                    <>
                      Load More Products
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* View All Link */}
            {!loadingCollection && collectionProducts.length > 0 && (
              <div className="text-center mt-8">
                <Link href="/products">
                  <Button variant="outline" size="lg" className="gap-2 border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300">
                    View All Products
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&h=1080&fit=crop"
              alt="Gaming Setup"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold tracking-wide uppercase">
                  Performance Unleashed
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Achieve Peak Tech
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Performance</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                Gear built for speed, endurance, and style—engineered for excellence
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-12 py-7 text-lg font-bold shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 rounded-xl">
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            ABOUT SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-15 blur-2xl" />
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                    alt="Technology Workspace"
                    className="relative rounded-2xl shadow-2xl w-full"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-8">
                <div>
                  <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                    About Allstar Tech
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                    Elevate Your Tech
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                      Experience
                    </span>
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Allstar Tech, we believe every device should empower you to achieve more. Whether you're building a powerful workstation, upgrading your gaming setup, or finding the perfect laptop for productivity, our premium technology products are designed to push your limits.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Explore our collection of cutting-edge computers, high-performance components, and top-tier accessories. Work smarter, play harder, and innovate faster with technology trusted by professionals and enthusiasts alike.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/products">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-6 text-base font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300">
                      Shop Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 px-10 py-6 text-base font-semibold rounded-xl transition-all duration-300">
                      Learn More
                    </Button>
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