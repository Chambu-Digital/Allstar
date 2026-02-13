'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, User, Search, Menu, Cpu, X, ChevronDown, Phone, Mail, MapPin, Tag, Zap, Star, Laptop2, LaptopIcon, Home, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ICategory } from '@/models/Category'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'
import { useCartStore } from '@/lib/cart-store'
import { useUserStore } from '@/lib/user-store'
import { companyInfo, getPhoneLink, getWhatsAppLink, getEmailLink } from '@/lib/company-info'
import CartSidebar from '@/components/cart-sidebar'

export default function Header() {
  const { getTotalItems, isLoaded } = useCartStore()
  const { user, checkAuth, isLoaded: userLoaded } = useUserStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetchCategories()
    if (!userLoaded) {
      checkAuth()
    }

    // Add scroll listener for header effects
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [checkAuth, userLoaded])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSearchResults(false)
      setIsSearchOpen(false)
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleSearchChange = async (value: string) => {
    setSearchQuery(value)
    
    if (value.trim().length < 2) {
      setShowSearchResults(false)
      setSearchResults([])
      return
    }

    setSearchLoading(true)
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(value.trim())}&catalog=true&limit=5`)
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.products || [])
        setShowSearchResults(true)
      }
    } catch (error) {
      console.error('Error searching:', error)
    } finally {
      setSearchLoading(false)
    }
  }

  const selectSearchResult = (product: any) => {
    setShowSearchResults(false)
    setSearchQuery('')
    setIsSearchOpen(false)
    window.location.href = `/product/${product._id}`
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
      {/* Premium Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5 text-sm">
            <div className="flex items-center gap-4 lg:gap-6">
              <a 
                href={getPhoneLink()} 
                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-medium hidden sm:inline">{companyInfo.phone}</span>
              </a>
              
              <a 
                href={getEmailLink()} 
                className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="text-xs">{companyInfo.email}</span>
              </a>
              
              <div className="hidden lg:flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs">{companyInfo.address}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
             
              
              {user ? (
                <Link href="/account" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors duration-200 group">
                  <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="hidden sm:inline text-xs font-medium">My Account</span>
                </Link>
              ) : (
                <Link href="/account/login" className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 text-xs font-semibold">
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className={`bg-white transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo - Enhanced */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                {/* Animated glow ring */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Main logo container */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                  {/* Geometric pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,white_49%,white_51%,transparent_52%)] bg-[length:6px_6px]"></div>
                  </div>
                  
                  {/* Circuit lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 48 48">
                    <path d="M12 12 L36 12 M12 24 L36 24 M12 36 L36 36 M12 12 L12 36 M24 12 L24 36 M36 12 L36 36" stroke="white" strokeWidth="1" fill="none"/>
                    <circle cx="12" cy="12" r="2" fill="white"/>
                    <circle cx="36" cy="12" r="2" fill="white"/>
                    <circle cx="12" cy="36" r="2" fill="white"/>
                    <circle cx="36" cy="36" r="2" fill="white"/>
                    <circle cx="24" cy="24" r="2" fill="white"/>
                  </svg>
                  
                  {/* CPU/Chip icon */}
                  <LaptopIcon className="w-6 h-6 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="leading-tight">
                <h1 className="text-xl lg:text-3xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent uppercase tracking-tight">
                  Allstar Tech
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-[12px] text-slate-900 uppercase tracking-wider font-bold">Premium Technology</p>
                </div>
              </div>
            </Link>

            {/* Desktop Search Bar - Enhanced */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8 relative">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-all duration-300"></div>
                  <div className="relative flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-transparent group-focus-within:bg-white transition-all duration-200 shadow-sm">
                    <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 flex-shrink-0 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search computers, laptops, accessories & more..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                      onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                      className="flex-1 bg-transparent ml-3 outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                    {searchLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-200 border-t-blue-500 flex-shrink-0"></div>
                    ) : (
                      <button type="submit" className="ml-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 text-xs font-semibold">
                        Search
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Desktop Search Results - Enhanced */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product, index) => {
                    const displayImage = getProductDisplayImage(product)
                    const { price } = getProductDisplayPrice(product)
                    
                    return (
                      <div
                        key={product._id}
                        onClick={() => selectSearchResult(product)}
                        className={`flex items-center gap-4 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 cursor-pointer transition-all duration-200 ${index !== 0 ? 'border-t border-slate-100' : ''}`}
                      >
                        <div className="relative w-14 h-14 flex-shrink-0">
                          <img
                            src={displayImage}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg border-2 border-slate-100"
                          />
                          {product.featured && (
                            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                              HOT
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-900 truncate">{product.name}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Tag className="w-3 h-3" />
                            {product.category}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            KSH {price.toLocaleString()}
                          </p>
                          {product.stock > 0 && (
                            <span className="text-[10px] text-green-600 font-medium">In Stock</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  
                  {searchQuery.trim() && (
                    <div className="border-t-2 border-slate-100 mt-2 pt-2">
                      <button
                        onClick={() => handleSearch({ preventDefault: () => {} } as any)}
                        className="w-full text-center px-4 py-3 text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Actions - Enhanced */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Mobile Search Toggle */}
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden hover:bg-blue-50 hover:text-blue-600 transition-all"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Categories Mega Menu - Desktop */}
              <div className="hidden lg:block relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-sm font-semibold border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg px-4"
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  <Menu className="w-4 h-4" />
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`} />
                </Button>
            
                {showCategories && (
                  <div
                    className="absolute top-full right-0 mt-3 bg-white border-2 border-slate-200 rounded-xl shadow-2xl py-3 min-w-64 z-50 overflow-hidden"
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                  >
                    <div className="px-4 pb-3 mb-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Browse by Category</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {categories.map((category, index) => (
                        <Link
                          key={category._id}
                          href={`/category/${category.slug}`}
                          className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 transition-all duration-200 font-medium group"
                        >
                          <span>{category.name}</span>
                          <ChevronDown className="w-4 h-4 -rotate-90 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 pt-3 mt-2 border-t border-slate-100">
                      <Link href="/products" className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                        View All Products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart - Enhanced */}
              <CartSidebar>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="relative border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 rounded-lg w-11 h-11"
                >
                  <ShoppingCart className="w-5 h-5 text-slate-700" />
                  {isLoaded && getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </CartSidebar>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-blue-50 hover:text-blue-600 transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation Bar - Desktop Only */}
      <BreadcrumbNav />

      {/* Mobile Search - Enhanced */}
      {isSearchOpen && (
        <div className="md:hidden border-t-2 border-slate-100 bg-white">
          <div className="px-4 py-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:bg-white transition-all duration-200 shadow-sm">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  className="flex-1 bg-transparent ml-3 outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  autoFocus
                />
                {searchLoading && (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-200 border-t-blue-500 flex-shrink-0"></div>
                )}
              </div>

              {/* Mobile Search Results - Enhanced */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl py-2 z-50 max-h-64 overflow-y-auto">
                  {searchResults.map((product) => {
                    const displayImage = getProductDisplayImage(product)
                    const { price } = getProductDisplayPrice(product)
                    
                    return (
                      <div
                        key={product._id}
                        onClick={() => selectSearchResult(product)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 cursor-pointer transition-all duration-200"
                      >
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg border-2 border-slate-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-900 truncate">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.category}</p>
                        </div>
                        <p className="text-sm font-bold text-blue-600 flex-shrink-0">KSH {price.toLocaleString()}</p>
                      </div>
                    )
                  })}
                  
                  {searchQuery.trim() && (
                    <div className="border-t-2 border-slate-100 mt-2 pt-2">
                      <button
                        onClick={() => handleSearch({ preventDefault: () => {} } as any)}
                        className="w-full text-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-semibold"
                      >
                        View all results →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu - Enhanced */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-slate-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            {/* Quick Links */}
            <Link href="/products" onClick={closeMobileMenu}>
              <Button variant="ghost" className="justify-start w-full h-12 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 font-semibold">
                <Zap className="w-4 h-4 mr-2" />
                All Products
              </Button>
            </Link>
            
            <Link href="/products?featured=true" onClick={closeMobileMenu}>
              <Button variant="ghost" className="justify-start w-full h-12 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 font-semibold">
                <Star className="w-4 h-4 mr-2" />
                Featured Deals
              </Button>
            </Link>

            <Link href="/about" onClick={closeMobileMenu}>
              <Button variant="ghost" className="justify-start w-full h-12 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 font-semibold">
                About Us
              </Button>
            </Link>

            <Link href="/contact" onClick={closeMobileMenu}>
              <Button variant="ghost" className="justify-start w-full h-12 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 font-semibold">
                Contact Us
              </Button>
            </Link>
            
            {/* Categories */}
            {categories.length > 0 && (
              <div className="border-t-2 border-slate-100 pt-4 mt-4">
                <div className="flex items-center justify-between px-4 py-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Categories
                  </p>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug}`}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 transition-all duration-200 rounded-lg mx-2 font-medium"
                    >
                      <span>{category.name}</span>
                      <ChevronDown className="w-4 h-4 -rotate-90 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

// Breadcrumb Navigation Component
function BreadcrumbNav() {
  const pathname = usePathname()
  
  // Don't show breadcrumb on homepage
  if (pathname === '/') return null
  
  // Generate breadcrumb items based on pathname
  const getBreadcrumbItems = (): Array<{ label: string; href: string }> => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const items: Array<{ label: string; href: string }> = []
    
    // Map common routes to readable names
    const routeNames: Record<string, string> = {
      'products': 'All Products',
      'about': 'About Us',
      'contact': 'Contact Us',
      'testimonials': 'Customer Reviews',
      'blog': 'Blog',
      'account': 'My Account',
      'cart': 'Shopping Cart',
      'checkout': 'Checkout'
    }
    
    pathSegments.forEach((segment, index) => {
      const label = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      items.push({ label, href })
    })
    
    return items
  }
  
  const breadcrumbItems = getBreadcrumbItems()
  
  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center py-3 text-sm">
          <Link 
            href="/" 
            className="flex items-center text-slate-600 hover:text-blue-600 transition-colors font-medium"
          >
            <Home className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-blue-600 font-semibold">{item.label}</span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}