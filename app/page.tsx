'use client'

import { ArrowRight, Laptop, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FlashDealsSection from '@/components/flash-deals'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Enhanced Professional Style */}
        <section className="relative h-[600px] md:h-[700px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=1080&fit=crop" 
              alt="Technology Background"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-full text-blue-300 text-sm font-semibold tracking-wide uppercase">
                  Premium Technology
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] text-white tracking-tight">
                Unleash Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Tech Potential
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
                Premium computer equipment engineered for performance, designed for excellence
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/products">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-12 py-7 text-lg font-bold shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 rounded-xl">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/products?filter=featured">
                  <Button size="lg" className="bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm text-white border-2 border-slate-600/50 hover:border-cyan-400/50 px-12 py-7 text-lg font-semibold rounded-xl transition-all duration-300">
                    Explore Products
                  </Button>
                </Link>
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

        {/* Trust Badges */}
        {/* <section className="py-8 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center gap-4 group">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Truck className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Free Shipping</h3>
                  <p className="text-gray-600 text-sm">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 group">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Shield className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Warranty Protection</h3>
                  <p className="text-gray-600 text-sm">1-year guarantee</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 group">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <HeadphonesIcon className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">Expert assistance</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Best Sellers Section - Enhanced Compact Layout */}
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

        {/* Category Showcase - Modern Horizontal Scroll */}
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
            
            {/* Horizontal Scrolling Categories */}
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
                {/* Laptops */}
                <Link href="/category/laptops" className="group flex-shrink-0 w-80 snap-start">
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
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
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
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
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
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
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
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
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                    
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
              
              {/* Scroll Hint */}
              <div className="flex justify-center mt-6 gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        {/* <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                Latest Releases
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">New Arrivals</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Be the first to experience our newest technology
              </p>
            </div>
            <AllProductsSection />
            <div className="text-center mt-12">
              <Link href="/products?filter=new">
                <Button variant="outline" size="lg" className="gap-2 border-2 border-gray-300 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600 px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300">
                  View All New Arrivals
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section> */}

        {/* CTA Banner - Enhanced Professional Style */}
        <section className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&h=1080&fit=crop" 
              alt="Gaming Setup"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
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

        

        {/* About Section - Enhanced Professional Style */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-15 blur-2xl"></div>
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