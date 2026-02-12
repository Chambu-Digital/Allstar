'use client'

import { useState, useRef, useEffect } from 'react'
import { ShoppingCart, User, Search, Zap, ChevronLeft, ChevronRight, Star, ArrowRight, Laptop, Monitor, Cpu, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HeroSlider from '@/components/hero-slider'
import CategoryGrid from '@/components/category-grid'
import FlashDealsSection from '@/components/flash-deals'
import AllProductsSection from '@/components/all-products-section'
import BlogSection from '@/components/blog-section'
import ReviewStatsSection from '@/components/review-stats-section'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-50 via-background to-orange-50 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-black leading-tight">
                  Unleash Your
                  <span className="block bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">Tech Potential</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  Premium computers and electronics for performance and innovation
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <Link href="/products">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Shop Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop" 
                    alt="Premium Laptop"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-black">Best Sellers</h2>
              <Link href="/products?filter=bestsellers">
                <Button variant="outline" className="gap-2">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <FlashDealsSection />
          </div>
        </section>

        {/* Category Showcase */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/category/laptops" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/5 p-8 hover:shadow-xl transition-all duration-300 border border-teal-200">
                <div className="relative z-10">
                  <Laptop className="w-12 h-12 text-teal-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Laptops</h3>
                  <p className="text-muted-foreground mb-4">High-performance computing</p>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                    Shop Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Laptop className="w-48 h-48 text-teal-600" />
                </div>
              </Link>

              <Link href="/category/monitors-displays" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 p-8 hover:shadow-xl transition-all duration-300 border border-orange-200">
                <div className="relative z-10">
                  <Monitor className="w-12 h-12 text-orange-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Monitors</h3>
                  <p className="text-muted-foreground mb-4">Crystal clear displays</p>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                    Shop Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Monitor className="w-48 h-48 text-orange-600" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-black">New Arrivals</h2>
              <Link href="/products?filter=new">
                <Button variant="outline" className="gap-2">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <AllProductsSection />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Achieve Peak Tech Performance
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Technology built for speed, productivity, and innovation
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Top Picks */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-black">Top Picks</h2>
              <Link href="/products?filter=featured">
                <Button variant="outline" className="gap-2">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <CategoryGrid />
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-orange-50 via-background to-teal-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
              Elevate Your Tech Experience
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At Allstar Tech, we believe every device should empower you to achieve more. Whether you're building a powerful workstation, upgrading your gaming setup, or finding the perfect laptop for productivity, our premium technology products are designed to push your limits. Explore our collection of cutting-edge computers, high-performance components, and top-tier accessories. Work smarter, play harder, and innovate faster with technology trusted by professionals and enthusiasts alike.
            </p>
            <Link href="/about">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

      

        {/* Reviews */}
        {/* <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReviewStatsSection />
          </div>
        </section> */}
      </main>
      
      <Footer />
    </div>
  )
}
