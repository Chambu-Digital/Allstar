'use client'

import { useState, useEffect } from 'react'
import { Zap, Clock, Flame, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IProduct } from '@/models/Product'
import { getProductDisplayImage, getProductDisplayPrice } from '@/lib/product-utils'

interface FeaturedDeal {
  id: number
  name: string
  originalPrice: number
  salePrice: number
  discount: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
  category: string
  slug: string
}

export default function FlashDealsSection() {
  const [timeLeft, setTimeLeft] = useState(3600)
  const [deals, setDeals] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)

  // Featured electronics deals when no database deals
  const featuredDeals: FeaturedDeal[] = [
    {
      id: 1,
      name: "Samsung 55\" 4K Smart TV",
      originalPrice: 89999,
      salePrice: 67499,
      discount: 25,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
      rating: 4.8,
      reviews: 234,
      inStock: true,
      category: "Entertainment",
      slug: "samsung-55-4k-smart-tv"
    },
    {
      id: 2,
      name: "LG Inverter Refrigerator 345L",
      originalPrice: 72999,
      salePrice: 54749,
      discount: 25,
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600",
      rating: 4.7,
      reviews: 189,
      inStock: true,
      category: "Home Appliances",
      slug: "lg-inverter-refrigerator-345l"
    },
    {
      id: 3,
      name: "iPhone 15 Pro 256GB",
      originalPrice: 149999,
      salePrice: 134999,
      discount: 10,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
      rating: 4.9,
      reviews: 456,
      inStock: true,
      category: "Mobile & Tablets",
      slug: "iphone-15-pro-256gb"
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Headphones",
      originalPrice: 34999,
      salePrice: 24499,
      discount: 30,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      rating: 4.8,
      reviews: 312,
      inStock: true,
      category: "Audio & Headphones",
      slug: "sony-wh-1000xm5-headphones"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetchFlashDeals()
  }, [])

  const fetchFlashDeals = async () => {
    try {
      const response = await fetch('/api/products?flashDeals=true&limit=4')
      if (response.ok) {
        const data = await response.json()
        setDeals(data.products)
      }
    } catch (error) {
      console.error('Error fetching flash deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const displayDeals: (IProduct | FeaturedDeal)[] = deals.length > 0 ? deals : featuredDeals

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto">
        {/* Deals Grid - Clean & Minimal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse border border-gray-100">
                <div className="bg-gray-200 h-48" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
              </div>
            ))
          ) : (
            displayDeals.slice(0, 4).map((deal) => {
              // Handle both database products and featured deals
              const isDbProduct = '_id' in deal
              const dealId = isDbProduct ? (deal as IProduct)._id : (deal as FeaturedDeal).id
              const dealName = deal.name
              const dealImage = isDbProduct ? getProductDisplayImage(deal as IProduct) : (deal as FeaturedDeal).image
              const dealSlug = isDbProduct ? (deal as IProduct)._id : (deal as FeaturedDeal).slug
              
              let dealPrice: number, dealOldPrice: number | undefined, dealDiscount: number
              if (isDbProduct) {
                const product = deal as IProduct
                const { price, oldPrice } = getProductDisplayPrice(product)
                dealPrice = price
                dealOldPrice = oldPrice
                dealDiscount = product.flashDealDiscount || 20
              } else {
                const featuredDeal = deal as FeaturedDeal
                dealPrice = featuredDeal.salePrice
                dealOldPrice = featuredDeal.originalPrice
                dealDiscount = featuredDeal.discount
              }

              return (
                <Link key={dealId} href={`/product/${dealSlug}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-orange-300">
                    {/* Image */}
                    <div className="relative overflow-hidden bg-gray-50">
                      <img
                        src={dealImage}
                        alt={dealName}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        -{dealDiscount}%
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                        {dealName}
                      </h3>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-orange-600">
                          KSH {dealPrice.toLocaleString()}
                        </span>
                        {dealOldPrice && (
                          <span className="text-xs line-through text-gray-400">
                            {dealOldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
