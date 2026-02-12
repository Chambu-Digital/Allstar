'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, User, Search, Menu, Zap, X, ChevronDown, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ICategory } from '@/models/Category'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'
import { useCartStore } from '@/lib/cart-store'
import { useUserStore } from '@/lib/user-store'
import { companyInfo, getPhoneLink } from '@/lib/company-info'
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

  useEffect(() => {
    fetchCategories()
    if (!userLoaded) {
      checkAuth()
    }
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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a 
                href={getPhoneLink()} 
                className="flex items-center gap-2 text-white hover:text-orange-100 transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-medium hidden sm:inline">{companyInfo.phone}</span>
              </a>
              <span className="text-orange-100 hidden md:inline">Mon-Sat: 8AM-6PM</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Link href="/account" className="text-white hover:text-orange-100 transition-colors duration-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-xs font-medium">My Account</span>
                </Link>
              ) : (
                <Link href="/account/login" className="text-white hover:text-orange-100 transition-colors duration-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-xs font-medium">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-orange-600 via-orange-500 to-teal-600 bg-clip-text text-transparent uppercase tracking-tight leading-none">
                  Allstar Tech
                </h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Premium Technology</p>
              </div>
            </div>
          </Link>

          {/* Desktop Search Bar - Centered */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 focus-within:border-teal-500 focus-within:bg-white transition-all duration-200 shadow-sm">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for computers, laptops, accessories..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  className="flex-1 bg-transparent ml-3 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
                {searchLoading && (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-600 flex-shrink-0"></div>
                )}
              </div>
            </form>

            {/* Desktop Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
                {searchResults.map((product) => {
                  const displayImage = getProductDisplayImage(product)
                  const { price } = getProductDisplayPrice(product)
                  
                  return (
                    <div
                      key={product._id}
                      onClick={() => selectSearchResult(product)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <img
                        src={displayImage}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md flex-shrink-0 border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <p className="text-sm font-bold text-teal-600 flex-shrink-0">KSH {price.toLocaleString()}</p>
                    </div>
                  )
                })}
                
                {searchQuery.trim() && (
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={() => handleSearch({ preventDefault: () => {} } as any)}
                      className="w-full text-left px-4 py-2 text-sm text-teal-600 hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden hover:bg-gray-100"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5 text-gray-700" />
            </Button>

            {/* Categories Dropdown - Desktop */}
            <div className="hidden lg:block relative">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm font-medium border-2 hover:border-orange-500 hover:text-orange-600 transition-all"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <Menu className="w-4 h-4" />
                Categories
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </Button>
            
              {showCategories && (
                <div
                  className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-2 min-w-56 z-50"
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug}`}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <CartSidebar>
              <Button 
                variant="outline" 
                size="icon" 
                className="relative border-2 hover:border-orange-500 hover:bg-orange-50 transition-all"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {isLoaded && getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </CartSidebar>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-gray-200 bg-gray-50">
            <div className="py-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus-within:border-orange-500 transition-all duration-200 shadow-sm">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                    className="flex-1 bg-transparent ml-3 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    autoFocus
                  />
                  {searchLoading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600 flex-shrink-0"></div>
                  )}
                </div>

                {/* Mobile Search Results */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 max-h-64 overflow-y-auto">
                    {searchResults.map((product) => {
                      const displayImage = getProductDisplayImage(product)
                      const { price } = getProductDisplayPrice(product)
                      
                      return (
                        <div
                          key={product._id}
                          onClick={() => selectSearchResult(product)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                          <img
                            src={displayImage}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded border border-gray-200 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.category}</p>
                          </div>
                          <p className="text-sm font-bold text-orange-600 flex-shrink-0">KSH {price.toLocaleString()}</p>
                        </div>
                      )
                    })}
                    
                    {searchQuery.trim() && (
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button
                          onClick={() => handleSearch({ preventDefault: () => {} } as any)}
                          className="w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-50 transition-colors duration-200 font-medium"
                        >
                          View all results for "{searchQuery}"
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-1">
              {/* Navigation Links */}
              <Link href="/products" onClick={closeMobileMenu}>
                <Button variant="ghost" className="justify-start w-full h-12 text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                  All Products
                </Button>
              </Link>
              
              {/* Categories */}
              {categories.length > 0 && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-xs font-bold text-gray-500 px-4 py-2 uppercase tracking-wider">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/category/${category.slug}`}
                        onClick={closeMobileMenu}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 rounded-md mx-2 font-medium"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
