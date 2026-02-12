'use client'

import { ArrowRight, Laptop, Monitor, Cpu, HardDrive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CategoryGrid from '@/components/category-grid'
import FlashDealsSection from '@/components/flash-deals'
import AllProductsSection from '@/components/all-products-section'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Epic Sports Style */}
        <section className="relative h-[600px] md:h-[700px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=1080&fit=crop" 
              alt="Technology Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
                Unleash Your
                <span className="block text-orange-400">Tech Potential</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Premium computer equipment
              </p>
              <div>
                <Link href="/products">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-7 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Best Sellers</h2>
            </div>
            <FlashDealsSection />
            <div className="text-center mt-10">
              <Link href="/products?filter=bestsellers">
                <Button variant="outline" size="lg" className="gap-2 border-2 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Category Showcase - Epic Sports Style */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Laptops Category */}
              <Link href="/category/laptops" className="group relative overflow-hidden rounded-lg h-[400px] shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop" 
                    alt="Laptops"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-4xl font-black text-white mb-4">Laptops</h3>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white w-fit">
                    Shop Now
                  </Button>
                </div>
              </Link>

              {/* Monitors Category */}
              <Link href="/category/monitors-displays" className="group relative overflow-hidden rounded-lg h-[400px] shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop" 
                    alt="Monitors"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-4xl font-black text-white mb-4">Monitors</h3>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white w-fit">
                    Shop Now
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">New Arrivals</h2>
            </div>
            <AllProductsSection />
            <div className="text-center mt-10">
              <Link href="/products?filter=new">
                <Button variant="outline" size="lg" className="gap-2 border-2 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner - Epic Sports Style */}
        <section className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920&h=1080&fit=crop" 
              alt="Gaming Setup"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-orange-800/80 to-transparent"></div>
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Achieve Peak Tech Performance
              </h2>
              <p className="text-xl md:text-2xl text-gray-200">
                Gear built for speed, endurance, and style
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-orange-600 px-10 py-7 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Top Picks */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Top Picks</h2>
            </div>
            <CategoryGrid />
            <div className="text-center mt-10">
              <Link href="/products?filter=featured">
                <Button variant="outline" size="lg" className="gap-2 border-2 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section - Epic Sports Style */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop" 
                  alt="Technology Workspace"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Elevate Your Tech Experience
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Allstar Tech, we believe every device should empower you to achieve more. Whether you're building a powerful workstation, upgrading your gaming setup, or finding the perfect laptop for productivity, our premium technology products are designed to push your limits. Explore our collection of cutting-edge computers, high-performance components, and top-tier accessories. Work smarter, play harder, and innovate faster with technology trusted by professionals and enthusiasts alike.
                </p>
                <Link href="/products">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
