'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ShoppingCart, User, Search, Menu, X,
  ChevronDown, Phone, Mail, MapPin,
  Tag, Zap, Star, Home, ChevronRight,
  ArrowRight, Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ICategory } from '@/models/Category'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'
import { useCartStore } from '@/lib/cart-store'
import { useUserStore } from '@/lib/user-store'
import { companyInfo, getPhoneLink, getEmailLink } from '@/lib/company-info'
import CartSidebar from '@/components/cart-sidebar'

// ─── Design tokens — must stay in sync with homepage ─────────────────────────
const T = {
  orange:     '#f97316',
  orangeDark: '#ea580c',
  orangePale: '#fff7ed',
  orangeMid:  '#fed7aa',
  white:      '#ffffff',
  offWhite:   '#fafaf9',
  stone100:   '#f5f5f4',
  stone200:   '#e7e5e4',
  stone400:   '#a8a29e',
  stone600:   '#57534e',
  stone800:   '#292524',
  stone900:   '#1c1917',
}

export default function Header() {
  const { getTotalItems, isLoaded }              = useCartStore()
  const { user, checkAuth, isLoaded: userLoaded } = useUserStore()

  const [isSearchOpen,     setIsSearchOpen]     = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCategories,   setShowCategories]   = useState(false)
  const [categories,       setCategories]       = useState<ICategory[]>([])
  const [searchQuery,      setSearchQuery]      = useState('')
  const [searchResults,    setSearchResults]    = useState<any[]>([])
  const [showResults,      setShowResults]      = useState(false)
  const [searchLoading,    setSearchLoading]    = useState(false)
  const [scrolled,         setScrolled]         = useState(false)

  useEffect(() => {
    fetchCategories()
    if (!userLoaded) checkAuth()
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [checkAuth, userLoaded])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) setCategories(await res.json())
    } catch (e) { console.error(e) }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowResults(false); setIsSearchOpen(false)
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleSearchChange = async (value: string) => {
    setSearchQuery(value)
    if (value.trim().length < 2) { setShowResults(false); setSearchResults([]); return }
    setSearchLoading(true)
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(value.trim())}&catalog=true&limit=5`)
      if (res.ok) { const d = await res.json(); setSearchResults(d.products || []); setShowResults(true) }
    } catch (e) { console.error(e) }
    finally { setSearchLoading(false) }
  }

  const selectResult = (product: any) => {
    setShowResults(false); setSearchQuery(''); setIsSearchOpen(false)
    window.location.href = `/product/${product._id}`
  }

  // ── icon-button base styles ─────────────────────────────────────────────────
  const iconBtn = {
    base: {
      width: 44, height: 44, borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: T.offWhite, border: `2px solid ${T.stone200}`,
      cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0,
    } as React.CSSProperties,
    hover: { background: T.orangePale, borderColor: T.orange } as React.CSSProperties,
  }

  return (
    <>
      {/* ═════════════════════════════════════════════════════════════
          TOP INFO BAR  —  dark stone bg, orange accents
      ═════════════════════════════════════════════════════════════ */}
      <div style={{ background: T.stone900, borderBottom: `2px solid ${T.orangeDark}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">

            {/* Contact links */}
            <div className="flex items-center gap-5">
              <InfoLink href={getPhoneLink()} icon={<Phone className="w-3 h-3" />} label={companyInfo.phone} />
              <InfoLink href={getEmailLink()} icon={<Mail className="w-3 h-3" />} label={companyInfo.email} className="hidden md:flex" />
              <div className="hidden lg:flex items-center gap-2 text-xs" style={{ color: T.stone400 }}>
                <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: T.orange }} />
                <span>{companyInfo.address}</span>
              </div>
            </div>

            {/* Auth */}
            {user ? (
              <InfoLink href="/account" icon={<User className="w-3 h-3" />} label="My Account" />
            ) : (
              <Link href="/account/login"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})`, boxShadow: '0 2px 12px rgba(249,115,22,0.4)' }}>
                <User className="w-3 h-3" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          MAIN HEADER  —  white, sticky, orange on scroll
      ═════════════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: T.white,
          borderBottom: `2px solid ${scrolled ? T.orange : T.stone200}`,
          boxShadow: scrolled
            ? '0 4px 28px rgba(249,115,22,0.14)'
            : '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-4 transition-all duration-300"
            style={{ paddingTop: scrolled ? 12 : 16, paddingBottom: scrolled ? 12 : 16 }}
          >

            {/* ─── Logo ─────────────────────────────────────────────── */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <img
                src="/allstar-logo.svg"
                alt="Allstar Tech"
                className="w-auto transition-all duration-300 group-hover:scale-105"
                style={{ height: scrolled ? 34 : 44 }}
              />
            </Link>

            {/* ─── Desktop Search ───────────────────────────────────── */}
            <DesktopSearch
              searchQuery={searchQuery}
              searchResults={searchResults}
              showResults={showResults}
              searchLoading={searchLoading}
              onChangeQuery={handleSearchChange}
              onSubmit={handleSearch}
              onFocusShowResults={() => searchResults.length > 0 && setShowResults(true)}
              onBlurHideResults={() => setTimeout(() => setShowResults(false), 200)}
              onSelectResult={selectResult}
            />

            {/* ─── Right actions ────────────────────────────────────── */}
            <div className="flex items-center gap-2 lg:gap-2.5 ml-auto md:ml-0">

              {/* Mobile search toggle */}
              <HoverIconBtn
                className="md:hidden"
                onClick={() => setIsSearchOpen(v => !v)}
                active={isSearchOpen}
              >
                <Search className="w-4 h-4" style={{ color: T.stone600 }} />
              </HoverIconBtn>

              {/* Categories — desktop only */}
              <div className="hidden lg:block relative">
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: showCategories ? T.orangePale : T.offWhite,
                    border: `2px solid ${showCategories ? T.orange : T.stone200}`,
                    color: showCategories ? T.orange : T.stone800,
                  }}
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  <Menu className="w-4 h-4" />
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {showCategories && (
                  <div
                    className="absolute top-full right-0 mt-2 rounded-2xl py-3 min-w-[260px] z-50"
                    style={{
                      background: T.white,
                      border: `2px solid ${T.stone200}`,
                      boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                    }}
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                  >
                    <p className="px-4 pb-3 text-[10px] font-black tracking-widest uppercase"
                      style={{ color: T.stone400, borderBottom: `1px solid ${T.stone100}` }}>
                      Browse by Category
                    </p>
                    <div className="max-h-80 overflow-y-auto py-1">
                      {categories.map(cat => (
                        <CatRow key={cat._id} cat={cat} onClose={() => setShowCategories(false)} />
                      ))}
                    </div>
                    <div className="px-4 pt-3" style={{ borderTop: `1px solid ${T.stone100}` }}>
                      <Link href="/products"
                        className="inline-flex items-center gap-1.5 text-xs font-black transition-all duration-150"
                        style={{ color: T.orange }}>
                        View All Products <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <CartSidebar>
                <div className="relative">
                  <HoverIconBtn>
                    <ShoppingCart className="w-5 h-5" style={{ color: T.stone600 }} />
                  </HoverIconBtn>
                  {isLoaded && getTotalItems() > 0 && (
                    <span
                      className="absolute -top-2 -right-2 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center pointer-events-none"
                      style={{ background: T.orange, boxShadow: '0 2px 8px rgba(249,115,22,0.5)' }}
                    >
                      {getTotalItems()}
                    </span>
                  )}
                </div>
              </CartSidebar>

              {/* Mobile menu toggle */}
              <HoverIconBtn
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(v => !v)}
                active={isMobileMenuOpen}
              >
                {isMobileMenuOpen
                  ? <X    className="w-5 h-5" style={{ color: T.orange }} />
                  : <Menu className="w-5 h-5" style={{ color: T.stone600 }} />
                }
              </HoverIconBtn>
            </div>
          </div>
        </div>

        {/* ─── Mobile Search Drawer ─────────────────────────────────── */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4" style={{ borderTop: `1px solid ${T.stone100}` }}>
            <form onSubmit={handleSearch} className="relative mt-3">
              <div className="flex items-center rounded-xl px-4 py-3"
                style={{ background: T.offWhite, border: `2px solid ${T.stone200}` }}>
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: T.stone400 }} />
                <input
                  type="text" autoFocus
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  className="flex-1 bg-transparent ml-3 outline-none text-sm placeholder:text-slate-400"
                  style={{ color: T.stone800 }}
                />
                {searchLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-200 border-t-orange-500 flex-shrink-0" />
                )}
              </div>

              {showResults && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 rounded-xl py-2 z-50 max-h-64 overflow-y-auto"
                  style={{ background: T.white, border: `2px solid ${T.stone200}`, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}>
                  {searchResults.map(product => {
                    const img = getProductDisplayImage(product)
                    const { price } = getProductDisplayPrice(product)
                    return (
                      <SearchResultRow key={product._id} product={product} img={img} price={price} onSelect={() => selectResult(product)} />
                    )
                  })}
                  {searchQuery.trim() && (
                    <button onClick={() => handleSearch({ preventDefault: () => {} } as any)}
                      className="w-full text-center px-4 py-3 text-sm font-bold"
                      style={{ borderTop: `1px solid ${T.stone100}`, color: T.orange }}>
                      View all results →
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        )}

        {/* ─── Mobile Navigation Drawer ─────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden" style={{ borderTop: `2px solid ${T.stone100}`, background: T.white }}>
            <div className="px-4 py-4 space-y-0.5">
              {[
                { href: '/products',               label: 'All Products',  icon: <Zap  className="w-4 h-4" /> },
                { href: '/products?featured=true', label: 'Featured Deals', icon: <Star className="w-4 h-4" /> },
                { href: '/about',                  label: 'About Us',      icon: null },
                { href: '/contact',                label: 'Contact Us',    icon: null },
              ].map(({ href, label, icon }) => (
                <Link key={href} href={href} onClick={() => setIsMobileMenuOpen(false)}>
                  <MobileNavRow icon={icon} label={label} />
                </Link>
              ))}

              {categories.length > 0 && (
                <div className="pt-3 mt-3" style={{ borderTop: `2px solid ${T.stone100}` }}>
                  <p className="px-4 pb-2 text-[10px] font-black tracking-widest uppercase" style={{ color: T.stone400 }}>
                    Categories
                  </p>
                  {categories.map(cat => (
                    <Link key={cat._id} href={`/category/${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer"
                        style={{ color: T.stone800 }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.orangePale; el.style.color = T.orange }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = T.stone800 }}>
                        {cat.name}
                        <ChevronRight className="w-4 h-4 opacity-40" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Breadcrumb ───────────────────────────────────────────── */}
        <BreadcrumbNav />
      </header>
    </>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function InfoLink({ href, icon, label, className = '' }: { href: string; icon: React.ReactNode; label?: string; className?: string }) {
  return (
    <a href={href}
      className={`flex items-center gap-2 text-xs font-semibold transition-colors duration-150 ${className}`}
      style={{ color: T.stone400 }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone400}>
      <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,115,22,0.18)', color: T.orange }}>
        {icon}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  )
}

function HoverIconBtn({ children, onClick, active = false, className = '' }: {
  children: React.ReactNode; onClick?: () => void; active?: boolean; className?: string
}) {
  const [hovered, setHovered] = useState(false)
  const isActive = active || hovered
  // NOTE: we use className for responsive visibility (md:hidden / lg:hidden).
  // Do NOT set display via inline style — that would override Tailwind breakpoint classes.
  
  // Check if this is mobile by checking if className contains 'md:hidden' or 'lg:hidden'
  const isMobileOnly = className.includes('md:hidden') || className.includes('lg:hidden')
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        width: 44, height: 44, borderRadius: 12,
        background: isActive ? T.orangePale : T.offWhite,
        border: isMobileOnly ? 'none' : `2px solid ${isActive ? T.orange : T.stone200}`,
        transition: 'all 0.2s ease', cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}

function CatRow({ cat, onClose }: { cat: ICategory; onClose: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={`/category/${cat.slug}`} onClick={onClose}>
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-semibold transition-all duration-150 cursor-pointer"
        style={{
          background: hovered ? T.orangePale : 'transparent',
          color: hovered ? T.orange : T.stone800,
          paddingLeft: hovered ? 20 : 16,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {cat.name}
        <ChevronRight className="w-4 h-4 opacity-40" />
      </div>
    </Link>
  )
}

function SearchResultRow({ product, img, price, onSelect }: { product: any; img: string; price: number; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onClick={onSelect}
      className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150"
      style={{ background: hovered ? T.orangePale : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img src={img} alt={product.name} className="w-12 h-12 object-cover rounded-xl flex-shrink-0"
        style={{ border: `2px solid ${T.stone100}` }} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate" style={{ color: T.stone900 }}>{product.name}</p>
        <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: T.stone400 }}>
          <Tag className="w-3 h-3" /> {product.category}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-black" style={{ color: T.orange }}>KSH {price.toLocaleString()}</p>
        {product.stock > 0 && <span className="text-[10px] font-semibold text-green-600">In Stock</span>}
      </div>
    </div>
  )
}

function MobileNavRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer"
      style={{ background: hovered ? T.orangePale : 'transparent', color: hovered ? T.orange : T.stone800 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {icon && <span style={{ color: T.orange }}>{icon}</span>}
      {label}
    </div>
  )
}

function DesktopSearch({ searchQuery, searchResults, showResults, searchLoading, onChangeQuery, onSubmit, onFocusShowResults, onBlurHideResults, onSelectResult }: {
  searchQuery: string; searchResults: any[]; showResults: boolean; searchLoading: boolean
  onChangeQuery: (v: string) => void; onSubmit: (e: React.FormEvent) => void
  onFocusShowResults: () => void; onBlurHideResults: () => void; onSelectResult: (p: any) => void
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8 relative">
      <form onSubmit={onSubmit} className="w-full">
        <div className="relative flex items-center rounded-xl px-4 py-3 transition-all duration-200"
          style={{
            background: focused ? T.white : T.offWhite,
            border: `2px solid ${focused ? T.orange : T.stone200}`,
            boxShadow: focused ? '0 0 0 4px rgba(249,115,22,0.1)' : 'none',
          }}>
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: focused ? T.orange : T.stone400 }} />
          <input
            type="text"
            placeholder="Search computers, laptops, accessories & more…"
            value={searchQuery}
            onChange={e => onChangeQuery(e.target.value)}
            onFocus={() => { setFocused(true); onFocusShowResults() }}
            onBlur={() => { setFocused(false); onBlurHideResults() }}
            className="flex-1 bg-transparent ml-3 outline-none text-sm placeholder:text-slate-400"
            style={{ color: T.stone800 }}
          />
          {/* {searchLoading
            ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-200 border-t-orange-500 flex-shrink-0" />
            : (
              <button type="submit"
                className="ml-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-105 flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${T.orangeDark}, T.orange})`, boxShadow: '0 2px 8px rgba(249,115,22,0.35)' }}>
                Search
              </button>
            )
          } */}
        </div>
      </form>

      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl py-2 z-50 max-h-96 overflow-y-auto"
          style={{ background: T.white, border: `2px solid ${T.stone200}`, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
          {searchResults.map((product, i) => {
            const img = getProductDisplayImage(product)
            const { price } = getProductDisplayPrice(product)
            return (
              <div key={product._id} style={{ borderTop: i !== 0 ? `1px solid ${T.stone100}` : 'none' }}>
                <SearchResultRow product={product} img={img} price={price} onSelect={() => onSelectResult(product)} />
              </div>
            )
          })}
          {searchQuery.trim() && (
            <button onClick={() => onSubmit({ preventDefault: () => {} } as any)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-all duration-150"
              style={{ borderTop: `1px solid ${T.stone100}`, color: T.orange }}>
              <Sparkles className="w-4 h-4" />
              View all results for "{searchQuery}"
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function BreadcrumbNav() {
  const pathname = usePathname()
  const [productName, setProductName] = useState<string | null>(null)
  
  if (pathname === '/') return null

  // Fetch product name if on product page
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments[0] === 'product' && segments[1]) {
      fetch(`/api/products/${segments[1]}`)
        .then(res => res.json())
        .then(data => setProductName(data.name))
        .catch(() => setProductName(null))
    }
  }, [pathname])

  const routeNames: Record<string, string> = {
    products: 'All Products', about: 'About Us', contact: 'Contact Us',
    testimonials: 'Customer Reviews', blog: 'Blog', account: 'My Account',
    cart: 'Shopping Cart', checkout: 'Checkout', product: 'Product',
  }
  const segments = pathname.split('/').filter(Boolean)
  const crumbs   = segments.map((seg, i) => {
    // If this is a product ID (second segment after 'product'), use the fetched name
    if (i === 1 && segments[0] === 'product' && productName) {
      return { label: productName, href: '/' + segments.slice(0, i + 1).join('/') }
    }
    return {
      label: routeNames[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
      href:  '/' + segments.slice(0, i + 1).join('/'),
    }
  })

  return (
    <div style={{ background: T.offWhite, borderTop: `1px solid ${T.stone200}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center py-2.5">
          <Link href="/"
            className="flex items-center gap-1 text-xs font-semibold transition-colors duration-150"
            style={{ color: T.stone400 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone400}>
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          {crumbs.map((crumb, i) => (
            <div key={i} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 mx-1.5" style={{ color: T.stone200 }} />
              {i === crumbs.length - 1 ? (
                <span className="text-xs font-black" style={{ color: T.orange }}>{crumb.label}</span>
              ) : (
                <Link href={crumb.href}
                  className="text-xs font-semibold transition-colors duration-150"
                  style={{ color: T.stone400 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone400}>
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}