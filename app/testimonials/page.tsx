'use client'

import { useState, useEffect } from 'react'
import { Star, MessageCircle, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface Testimonial {
  _id: string
  rating: number
  title: string
  comment: string
  createdAt: string
  productId: {
    _id: string
    name: string
    images: string[]
  }
  userId: {
    _id: string
    firstName: string
    lastName: string
  }
}

// Featured testimonials as fallback
const featuredTestimonials = [
  {
    _id: '1',
    rating: 5,
    title: 'Excellent Service!',
    comment: 'Amazing customer service and fast delivery. My Samsung fridge arrived in perfect condition.',
    createdAt: '2024-01-15',
    productId: { _id: '1', name: 'Samsung Refrigerator', images: [] },
    userId: { _id: '1', firstName: 'Sarah', lastName: 'Mwangi' }
  },
  {
    _id: '2',
    rating: 5,
    title: 'Great Quality Products',
    comment: 'The LG washing machine works perfectly. Installation was professional and quick.',
    createdAt: '2024-01-10',
    productId: { _id: '2', name: 'LG Washing Machine', images: [] },
    userId: { _id: '2', firstName: 'John', lastName: 'Kamau' }
  },
  {
    _id: '3',
    rating: 4,
    title: 'Highly Recommended',
    comment: 'Good prices and reliable products. Will definitely shop here again.',
    createdAt: '2024-01-08',
    productId: { _id: '3', name: 'Sony TV', images: [] },
    userId: { _id: '3', firstName: 'Grace', lastName: 'Wanjiku' }
  },
  {
    _id: '4',
    rating: 5,
    title: 'Outstanding Experience',
    comment: 'From browsing to delivery, everything was smooth. Great team at Allstar Tech!',
    createdAt: '2024-01-05',
    productId: { _id: '4', name: 'iPhone 15', images: [] },
    userId: { _id: '4', firstName: 'David', lastName: 'Ochieng' }
  }
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/reviews/public-stats')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data.recentReviews || featuredTestimonials)
      } else {
        setTestimonials(featuredTestimonials)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials(featuredTestimonials)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Enhanced Professional Style */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop" 
              alt="Customer Reviews"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-full text-blue-300 text-sm font-semibold tracking-wide uppercase">
                  Customer Reviews
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-white tracking-tight">
                What Our{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Customers Say
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
                Real experiences from our satisfied customers across Kenya
              </p>
              
              {/* Quick Stats */}
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">4.8</div>
                  <div className="text-xs md:text-sm text-blue-300 font-medium">Average Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">5000+</div>
                  <div className="text-xs md:text-sm text-blue-300 font-medium">Happy Customers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">98%</div>
                  <div className="text-xs md:text-sm text-blue-300 font-medium">Satisfaction</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">1200+</div>
                  <div className="text-xs md:text-sm text-blue-300 font-medium">Reviews</div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">What Our Customers Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Trusted by thousands of satisfied customers
              </p>
            </div>
            
            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card rounded-lg p-6 border border-border">
                    <div className="animate-pulse">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <div key={j} className="w-4 h-4 bg-muted rounded"></div>
                        ))}
                      </div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div>
                          <div className="h-3 bg-muted rounded mb-1 w-20"></div>
                          <div className="h-3 bg-muted rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.slice(0, 6).map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 relative group"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-xl pointer-events-none"></div>
                    
                    <Quote className="w-8 h-8 text-blue-500/20 absolute top-4 right-4" />
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? 'fill-blue-500 text-blue-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                    </div>

                    {/* Review Content */}
                    <h4 className="font-bold mb-2 text-gray-900">{testimonial.title}</h4>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      "{testimonial.comment}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-white">
                          {testimonial.userId.firstName.charAt(0)}{testimonial.userId.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {testimonial.userId.firstName} {testimonial.userId.lastName.charAt(0)}.
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.productId.name} • {new Date(testimonial.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Share Your Experience
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Purchased from Allstar Tech? We'd love to hear your feedback!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-base font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 rounded-xl">
                <MessageCircle className="w-5 h-5 mr-2" />
                Write a Review
              </Button>
              <Button variant="outline" className="px-8 py-6 text-base font-semibold border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 rounded-xl transition-all duration-300">
                Shop Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
