'use client'

import {
  ArrowRight, ChevronLeft, ChevronRight,
  Zap, Shield, Truck, Star, Heart, ShoppingCart,
  Eye, TrendingUp, Award, Users, Clock, CheckCircle,
  Search, Play, Sparkles
} from 'lucide-react'
import FlashDealsSection from '@/components/flash-deals'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'

// ─── Design Tokens ─────────────────────────────────────────────────────────
const T = {
  orange:      '#f97316',
  orangeDark:  '#ea580c',
  orangeLight: '#fb923c',
  orangePale:  '#fff7ed',
  orangeMid:   '#fed7aa',
  white:       '#ffffff',
  offWhite:    '#fafaf9',
  stone50:     '#fafaf9',
  stone100:    '#f5f5f4',
  stone200:    '#e7e5e4',
  stone400:    '#a8a29e',
  stone600:    '#57534e',
  stone800:    '#292524',
  stone900:    '#1c1917',
  // Hero keeps dark bg
  heroBg:      '#060e24',
}

// ─── Static Data ────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1, tag: 'New Arrival',
    headline: 'Unleash Your', highlight: 'Tech Potential',
    sub: 'Premium laptops engineered for blazing performance and razor-sharp precision.',
    cta: { label: 'Shop Laptops', href: '/category/laptops' },
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=1080&fit=crop',
    stat: { value: '500+', label: 'Laptop Models' },
  },
  {
    id: 2, tag: 'Ultra Displays',
    headline: 'See More,', highlight: 'Do More',
    sub: 'Crystal-clear monitors with HDR brilliance and immersive curved designs.',
    cta: { label: 'Shop Monitors', href: '/category/monitors-displays' },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1920&h=1080&fit=crop',
    stat: { value: '4K', label: 'Ultra HD Ready' },
  },
  {
    id: 3, tag: 'Power Builds',
    headline: 'Desktop Power', highlight: 'Redefined',
    sub: 'Workstation-class desktop PCs built for creators, engineers, and gamers.',
    cta: { label: 'Shop Desktops', href: '/category/desktops' },
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&h=1080&fit=crop',
    stat: { value: '100%', label: 'Build Quality' },
  },
  {
    id: 4, tag: 'Must-Have Gear',
    headline: 'Complete Your', highlight: 'Setup',
    sub: 'Top-tier accessories that turn a good rig into an unstoppable workstation.',
    cta: { label: 'Shop Accessories', href: '/category/accessories' },
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=1920&h=1080&fit=crop',
    stat: { value: '1000+', label: 'Accessories' },
  },
]

const categories = [
  { href: '/category/laptops',           label: 'Laptops',     sub: 'Portable powerhouses', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop', count: '200+', emoji: '💻' },
  { href: '/category/monitors-displays', label: 'Monitors',    sub: 'Crystal-clear displays',img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop', count: '80+',  emoji: '🖥️' },
  { href: '/category/desktops',          label: 'Desktops',    sub: 'Raw workstation power', img: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop', count: '120+', emoji: '🖧'  },
  { href: '/category/accessories',       label: 'Accessories', sub: 'Complete your rig',     img: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=400&fit=crop', count: '500+', emoji: '🎧' },
]

const trustBadges = [
  { icon: <Truck   className="w-6 h-6" />, title: 'Same-Day Delivery',  sub: 'Within Nairobi' },
  { icon: <Shield  className="w-6 h-6" />, title: 'Full Warranty',      sub: 'On all products' },
  { icon: <Zap     className="w-6 h-6" />, title: '100% Genuine',       sub: 'Authentic stock' },
  { icon: <Star    className="w-6 h-6" />, title: '4.9★ Rated',         sub: 'Verified buyers' },
]

const stats = [
  { value: '10K+',  label: 'Happy Customers', icon: <Users  className="w-5 h-5" /> },
  { value: '500+',  label: 'Products',         icon: <Award  className="w-5 h-5" /> },
  { value: '5 Yrs', label: 'In Business',      icon: <Clock  className="w-5 h-5" /> },
  { value: '4.9★',  label: 'Avg. Rating',      icon: <Star   className="w-5 h-5" /> },
]

const promoFeatures = [
  { emoji: '🚀', title: 'Next-Gen Performance', desc: 'Latest chips and components from the world\'s top brands.' },
  { emoji: '🛡️', title: 'Backed by Warranty',   desc: 'Full manufacturer warranty on every single item.' },
  { emoji: '📦', title: 'Fast Fulfilment',       desc: 'Order before 2 PM, receive same day in Nairobi.' },
  { emoji: '💬', title: 'Expert Support',        desc: 'Real humans ready to help you pick the right gear.' },
]

const reviews = [
  { name: 'James Kamau',   role: 'Software Engineer', text: 'Allstar Tech has been my go-to for over 3 years. Lightning-fast delivery and every product I\'ve bought has been genuine. The MacBook I ordered arrived same day!', rating: 5, avatar: 'JK' },
  { name: 'Grace Wanjiku', role: 'Graphic Designer',  text: 'I was skeptical about online tech shops but Allstar blew me away. The UltraSharp monitor is exactly as described. Customer support was outstanding.', rating: 5, avatar: 'GW' },
  { name: 'Brian Otieno',  role: 'IT Manager',        text: 'Procured 20 laptops for our office through Allstar. Competitive prices, bulk discount applied without haggling. Will definitely order again.', rating: 5, avatar: 'BO' },
  { name: 'Amina Hassan',  role: 'Content Creator',   text: 'Got my entire studio setup from here — monitor, keyboard, webcam. Everything arrived perfectly packed. The prices beat every other store I checked.', rating: 5, avatar: 'AH' },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionTag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-3">
      <span style={{ display: 'block', width: 28, height: 2.5, borderRadius: 2, background: T.orange }} />
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: T.orange,
        fontFamily: "'Outfit', sans-serif",
      }}>{children}</span>
    </div>
  )
}

function ProductTile({ product, index }: { product: IProduct; index: number }) {
  const displayImage = getProductDisplayImage(product)
  const { price, oldPrice } = getProductDisplayPrice(product)
  const hasDiscount = oldPrice && oldPrice > price
  const discountPct = oldPrice ? Math.round((1 - price / oldPrice) * 100) : null
  const [liked, setLiked] = useState(false)

  return (
    <Link
      href={`/product/${product._id}`}
      className="group block"
      style={{ animation: 'fadeUp 0.5s ease both', animationDelay: `${Math.min(index * 45, 400)}ms` }}
    >
      <div
        className="relative overflow-hidden rounded-2xl mb-3 aspect-square transition-all duration-300"
        style={{ background: T.stone100, border: `1.5px solid ${T.stone200}` }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.15)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = T.stone200; e.currentTarget.style.boxShadow = 'none' }}
      >
        <img
          src={displayImage} alt={product.name}
          className="w-full h-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.07]"
        />
        {/* Discount badge */}
        {hasDiscount && discountPct && (
          <span className="absolute top-2.5 left-2.5 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide"
            style={{ background: T.orange }}>
            -{discountPct}%
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setLiked(l => !l) }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: liked ? T.orange : 'rgba(255,255,255,0.85)', border: `1px solid ${liked ? T.orange : T.stone200}`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <Heart className="w-3.5 h-3.5" style={{ color: liked ? '#fff' : T.stone400, fill: liked ? '#fff' : 'transparent' }} />
        </button>
        {/* Quick view bar */}
        <div className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.92), rgba(249,115,22,0.7))' }}>
          <Eye className="w-4 h-4 text-white" />
          <span className="text-[10px] font-bold text-white tracking-widest uppercase">Quick View</span>
          <ShoppingCart className="w-4 h-4 text-white" />
        </div>
      </div>
      <h3 className="text-xs font-semibold line-clamp-2 leading-snug mb-1.5 transition-colors duration-200"
        style={{ color: T.stone800 }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone800}>
        {product.name}
      </h3>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-black" style={{ color: T.orange }}>KSh {price.toLocaleString()}</span>
        {oldPrice && <span className="text-[11px] line-through" style={{ color: T.stone400 }}>KSh {oldPrice.toLocaleString()}</span>}
      </div>
    </Link>
  )
}

function SkeletonTile() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-2xl w-full mb-3" style={{ background: T.stone200 }} />
      <div className="space-y-1.5">
        <div className="h-2.5 rounded-full w-full"  style={{ background: T.stone200 }} />
        <div className="h-2.5 rounded-full w-3/4"   style={{ background: T.stone200 }} />
        <div className="h-3   rounded-full w-1/2 mt-1" style={{ background: T.orangeMid }} />
      </div>
    </div>
  )
}

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl p-6 space-y-4"
      style={{
        width: 320, background: T.white,
        border: `1.5px solid ${T.stone200}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        animation: 'fadeUp 0.6s ease both',
        animationDelay: `${index * 100}ms`,
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.orange; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 36px rgba(249,115,22,0.12)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.stone200; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4" style={{ fill: T.orange, color: T.orange }} />
        ))}
      </div>
      <p className="text-sm leading-relaxed italic" style={{ color: T.stone600 }}>"{review.text}"</p>
      <div className="flex items-center gap-3 pt-1">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${T.orange}, ${T.orangeDark})` }}>
          {review.avatar}
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: T.stone900 }}>{review.name}</p>
          <p className="text-xs" style={{ color: T.stone400 }}>{review.role}</p>
        </div>
        <CheckCircle className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: '#10b981' }} />
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  const scrollContainerRef  = useRef<HTMLDivElement>(null)
  const productsRowRef      = useRef<HTMLDivElement>(null)
  const reviewsRowRef       = useRef<HTMLDivElement>(null)

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

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    if (ref.current) ref.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' })
  }

  const slide = heroSlides[current]

  return (
    <div className="flex flex-col min-h-screen" style={{ background: T.offWhite }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Syne:wght@700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }
        .font-display { font-family: 'Syne', sans-serif !important; }

        @keyframes slideProgress { from{width:0%} to{width:100%} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.4);opacity:1} }

        .scrollbar-hide::-webkit-scrollbar { display: none }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .orange-glow  { box-shadow: 0 4px 28px rgba(249,115,22,0.45); }
        .orange-glow:hover { box-shadow: 0 6px 36px rgba(249,115,22,0.55); }
        .card-lift    { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(249,115,22,0.15); }

        .marquee-wrap { overflow: hidden; }
        .marquee-track { display:flex; animation: marquee 26s linear infinite; white-space: nowrap; }

        .dot-live { display:inline-block; width:6px; height:6px; border-radius:50%; background:#22c55e; animation: pulse-dot 1.6s ease infinite; }

        /* Diagonal divider */
        .diagonal-top    { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
        .diagonal-bottom { clip-path: polygon(0 6%, 100% 0, 100% 100%, 0 100%); }

        /* Section entrance */
        .section-enter { animation: fadeUp 0.6s ease both; }
      `}</style>

      <Header />

      <main className="flex-1">

       
     

        {/* ══════════════════════════════════════════════════
            HERO — dark background preserved
        ══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden select-none" style={{ minHeight: 600, background: T.heroBg }}>

          {heroSlides.map((s, i) => (
            <img key={s.id} src={s.image} alt={s.headline}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: i === current ? 1 : 0, transform: i === current ? 'scale(1.04)' : 'scale(1.1)', transition: 'opacity 0.75s ease, transform 9s ease-out' }}
            />
          ))}

          {/* Dark overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,14,36,0.97) 0%, rgba(6,14,36,0.82) 48%, rgba(6,14,36,0.45) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,14,36,0.7) 0%, transparent 58%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 8% 55%, rgba(249,115,22,0.18) 0%, transparent 40%),
                              radial-gradient(circle at 90% 20%, rgba(249,115,22,0.10) 0%, transparent 35%)`
          }} />

          {/* Orange top accent rule */}
          <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${T.orange}, transparent)` }} />

          {/* Slide content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{ minHeight: 600 }}>
            <div
              className="max-w-2xl space-y-7 py-20"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? `translateY(${direction === 'next' ? '18px' : '-18px'})` : 'translateY(0)',
                transition: 'opacity 0.42s ease, transform 0.42s ease',
              }}
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2.5">
                <span style={{ display: 'block', width: 28, height: 2.5, borderRadius: 2, background: T.orange }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.orange, fontFamily: "'Outfit', sans-serif" }}>
                  {slide.tag}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-white leading-[1.01] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)' }}>
                {slide.headline}<br />
                <span style={{ color: T.orange }}>{slide.highlight}</span>
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-lg">{slide.sub}</p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href={slide.cta.href}>
                  <button className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 orange-glow"
                    style={{ background: `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                    {slide.cta.label}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                    style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}
                    onMouseEnter={e => { (e.currentTarget).style.borderColor = T.orange; (e.currentTarget).style.background = 'rgba(249,115,22,0.12)' }}
                    onMouseLeave={e => { (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget).style.background = 'rgba(255,255,255,0.07)' }}>
                    Browse All
                  </button>
                </Link>
              </div>

           
            </div>
          </div>

          {/* Arrows */}
          {[
            { dir: 'prev' as const, action: prevSlide, Icon: ChevronLeft, pos: 'left-4' },
            { dir: 'next' as const, action: nextSlide, Icon: ChevronRight, pos: 'right-4' },
          ].map(({ dir, action, Icon, pos }) => (
            <button key={dir} onClick={action} aria-label={dir}
              className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all focus:outline-none`}
              style={{ background: 'rgba(6,14,36,0.65)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}
              onMouseEnter={e => { (e.currentTarget).style.background = T.orange; (e.currentTarget).style.borderColor = T.orange }}
              onMouseLeave={e => { (e.currentTarget).style.background = 'rgba(6,14,36,0.65)'; (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.14)' }}>
              <Icon className="w-5 h-5 text-white" />
            </button>
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? T.orange : 'rgba(255,255,255,0.3)' }}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 right-6 hidden lg:flex gap-2">
            {heroSlides.map((s, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                className="relative w-20 h-12 rounded-lg overflow-hidden transition-all duration-300"
                style={{ border: i === current ? `2px solid ${T.orange}` : '1px solid rgba(255,255,255,0.15)', opacity: i === current ? 1 : 0.45, transform: i === current ? 'scale(1.07)' : 'scale(1)' }}>
                <img src={s.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.28)' }} />
                {i === current && <span className="absolute bottom-0 left-0 h-0.5" style={{ background: T.orange, animation: 'slideProgress 5.5s linear infinite' }} />}
              </button>
            ))}
          </div>

          {/* Bottom orange rule */}
          <div className="absolute bottom-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${T.orange}, transparent)` }} />
        </section>



        {/* ══════════════════════════════════════════════════
            BEST SELLERS — FlashDealsSection
        ══════════════════════════════════════════════════ */}
        <section style={{ background: T.offWhite }} className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <SectionTag>Popular Choices</SectionTag>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight" style={{ color: T.stone900 }}>
                  Best <span style={{ color: T.orange }}>Sellers</span>
                </h2>
              </div>
              <Link href="/products?filter=bestsellers"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                style={{ color: T.orange, border: `1.5px solid ${T.orange}`, background: T.orangePale }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.orange; (e.currentTarget as HTMLElement).style.color = T.white }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.orangePale; (e.currentTarget as HTMLElement).style.color = T.orange }}>
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <FlashDealsSection />
            <div className="mt-6 md:hidden">
              <Link href="/products?filter=bestsellers"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold"
                style={{ color: T.orange, border: `1.5px solid ${T.orange}`, background: T.orangePale }}>
                View All Best Sellers <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

       

        {/* ══════════════════════════════════════════════════
            CATEGORIES
        ══════════════════════════════════════════════════ */}
        <section style={{ background: T.offWhite }} className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <SectionTag>Browse</SectionTag>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight" style={{ color: T.stone900 }}>
                  Shop by <span style={{ color: T.orange }}>Category</span>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {(['left', 'right'] as const).map(dir => (
                  <button key={dir} onClick={() => scrollRow(scrollContainerRef, dir)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ background: T.orangePale, border: `1.5px solid ${T.orangeMid}`, color: T.orange }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.orange; (e.currentTarget as HTMLElement).style.color = T.white }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.orangePale; (e.currentTarget as HTMLElement).style.color = T.orange }}>
                    {dir === 'left' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
              {categories.map((cat) => (
                <Link key={cat.href} href={cat.href}
                  className="group relative overflow-hidden rounded-2xl flex-shrink-0 snap-start block"
                  style={{ width: 280, height: 320 }}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${cat.img}')` }} />
                  {/* Default overlay */}
                  <div className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)' }} />
                  {/* Orange hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(180deg, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.65) 100%)` }} />
                  {/* Border */}
                  <div className="absolute inset-0 rounded-2xl transition-all duration-300"
                    style={{ border: '2px solid rgba(255,255,255,0.0)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = T.orange}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0)'} />

                  <div className="relative h-full flex flex-col justify-between p-5">
                    <div className="self-end">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(249,115,22,0.85)', color: T.white, backdropFilter: 'blur(6px)' }}>
                        {cat.count}+ items
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">{cat.emoji}</div>
                      <h3 className="font-display text-2xl text-white mb-0.5 group-hover:text-orange-200 transition-colors">{cat.label}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">{cat.sub}</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                          style={{ background: T.white }}>
                          <ArrowRight className="w-3.5 h-3.5" style={{ color: T.orange }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            ALL PRODUCTS
        ══════════════════════════════════════════════════ */}
        <section style={{ background: T.offWhite, borderTop: `2px solid ${T.stone100}` }} className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <SectionTag>Our Collection</SectionTag>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight" style={{ color: T.stone900 }}>
                  All <span style={{ color: T.orange }}>Products</span>
                </h2>
                <p className="text-sm mt-1" style={{ color: T.stone400 }}>Browse our complete range of premium tech</p>
              </div>
              {!loadingCollection && collectionProducts.length > 0 && (
                <Link href="/products"
                  className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                  style={{ color: T.orange, border: `1.5px solid ${T.orange}`, background: T.orangePale }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.orange; (e.currentTarget as HTMLElement).style.color = T.white }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.orangePale; (e.currentTarget as HTMLElement).style.color = T.orange }}>
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {loadingCollection
                ? Array(10).fill(0).map((_, i) => <SkeletonTile key={i} />)
                : collectionProducts.map((p, i) => <ProductTile key={p._id as string} product={p} index={i} />)
              }
            </div>
            {hasMoreProducts && !loadingCollection && collectionProducts.length > 0 && (
              <div className="text-center pt-10">
                <button
                  onClick={() => fetchCollectionProducts(true)}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 orange-glow"
                  style={{ color: T.white, background: `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                  {loadingMore
                    ? <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Loading…</>
                    : <>Load More Products <ChevronRight className="w-4 h-4" /></>
                  }
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            PROMO BANNER — split with feature grid
        ══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-20 md:py-28" style={{ background: T.stone900 }}>
          {/* Subtle orange glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.14) 0%, transparent 55%),
                              radial-gradient(ellipse at 90% 80%, rgba(249,115,22,0.07) 0%, transparent 45%)`
          }} />
          <img src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&h=800&fit=crop" alt=""
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.06, mixBlendMode: 'luminosity' }} />
          {/* Top orange rule */}
          <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${T.orange}, transparent)` }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              {/* Left */}
              <div className="space-y-7">
                <SectionTag>Performance Unleashed</SectionTag>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.04] tracking-tight">
                  Achieve Peak<br /><span style={{ color: T.orange }}>Performance</span>
                </h2>
                <p className="leading-relaxed max-w-md text-base" style={{ color: T.stone400 }}>
                  Gear built for speed, endurance, and style. Every product curated for professionals, creators, and enthusiasts who refuse to compromise.
                </p>
                <ul className="space-y-3">
                  {['Genuine products with full warranty', 'Same-day delivery in Nairobi', 'Dedicated after-sales support', 'Competitive trade-in program'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-sm" style={{ color: T.stone400 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link href="/products">
                    <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white hover:scale-105 transition-all orange-glow"
                      style={{ background: `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                      Shop Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/about">
                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-105"
                      style={{ color: T.orange, border: `1.5px solid rgba(249,115,22,0.4)`, background: 'rgba(249,115,22,0.07)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = T.orange }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.4)' }}>
                      Our Story
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right: feature cards */}
              <div className="grid grid-cols-2 gap-4">
                {promoFeatures.map((f, i) => (
                  <div key={i} className="card-lift rounded-2xl p-5 cursor-default"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.45)'; (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.05)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}>
                    <h4 className="text-sm font-bold text-white mb-1.5">{f.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: T.stone400 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${T.orange}, transparent)` }} />
        </section>

    

        {/* ══════════════════════════════════════════════════
            ABOUT SECTION
        ══════════════════════════════════════════════════ */}
        <section style={{ background: T.white, borderTop: `2px solid ${T.stone100}` }} className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 pointer-events-none"
                  style={{ borderTop: `3px solid ${T.orange}`, borderLeft: `3px solid ${T.orange}`, borderRadius: '14px 0 0 0' }} />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none"
                  style={{ borderBottom: `3px solid ${T.orangeMid}`, borderRight: `3px solid ${T.orangeMid}`, borderRadius: '0 0 14px 0' }} />
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                  alt="Technology Workspace"
                  className="relative rounded-2xl w-full"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }} />
             
              </div>

              {/* Text */}
              <div className="space-y-6 pt-6 md:pt-0">
                <SectionTag>About Allstar Tech</SectionTag>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-tight" style={{ color: T.stone900 }}>
                  Elevate Your Tech<br /><span style={{ color: T.orange }}>Experience</span>
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: T.stone600 }}>
                  At Allstar Tech, we believe every device should empower you to achieve more. Whether you're building a powerful workstation, upgrading your gaming setup, or finding the perfect laptop for productivity, our premium technology products are designed to push your limits.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: T.stone600 }}>
                  Explore our collection of cutting-edge computers, high-performance components, and top-tier accessories — trusted by professionals and enthusiasts across Kenya.
                </p>
                <div className="flex gap-3 pt-1">
                  <Link href="/products">
                    <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white hover:scale-105 transition-all orange-glow"
                      style={{ background: `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                      Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/about">
                    <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                      style={{ color: T.orange, border: `1.5px solid ${T.orangeMid}`, background: T.orangePale }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.orange; (e.currentTarget as HTMLElement).style.color = T.white; (e.currentTarget as HTMLElement).style.borderColor = T.orange }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.orangePale; (e.currentTarget as HTMLElement).style.color = T.orange; (e.currentTarget as HTMLElement).style.borderColor = T.orangeMid }}>
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