'use client'

import { useState, useEffect, use } from 'react'
import { Star, ShoppingCart, Heart, ChevronDown, ChevronRight, Package, RotateCcw, Shield, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductImageCarousel from '@/components/product-image-carousel'
import ProductVariations from '@/components/product-variations'
import RelatedProducts from '@/components/related-products'
import ProductReviews from '@/components/product-reviews'
import RatingSystemActivator from '@/components/rating-system-activator'
import { IProduct, IVariant } from '@/models/Product'
import { useCartStore } from '@/lib/cart-store'
import { getProductDisplayPrice, getProductDisplayImage, calculateVariantPricing } from '@/lib/product-utils'
import { useToast } from '@/components/ui/custom-toast'
import Link from 'next/link'

// ── Accordion component ──────────────────────────────────────────────────────
function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-semibold text-gray-900 text-sm tracking-wide uppercase">{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-5 text-gray-600 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

// ── Trust badge ──────────────────────────────────────────────────────────────
function TrustBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <Icon className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
      <span>{label}</span>
    </div>
  )
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [allImages, setAllImages] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [product, setProduct] = useState<IProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addingToCart, setAddingToCart] = useState(false)
  const [realRating, setRealRating] = useState(0)
  const [realReviewCount, setRealReviewCount] = useState(0)
  const { addItem } = useCartStore()
  const toast = useToast()

  useEffect(() => {
    fetchProduct()
    fetchRealReviewStats()
  }, [resolvedParams.id])

  useEffect(() => {
    if (product) {
      if (product.hasVariants && product.variants && product.variants.length > 0) {
        const variantImages = product.variants.filter(v => v.isActive && v.image).map(v => v.image)
        const productImages = product.images || []
        const combinedImages = [...new Set([...productImages, ...variantImages])]
        setAllImages(combinedImages)
        const activeVariants = product.variants.filter(v => v.isActive)
        if (activeVariants.length > 0) {
          const cheapestVariant = activeVariants.reduce((cheapest, current) =>
            current.price < cheapest.price ? current : cheapest
          )
          setSelectedVariant(cheapestVariant)
          const variantImageIndex = combinedImages.findIndex(img => img === cheapestVariant.image)
          if (variantImageIndex !== -1) setSelectedImageIndex(variantImageIndex)
        }
      } else {
        setAllImages(product.images || [])
        setSelectedImageIndex(0)
      }
    }
  }, [product])

  const handleVariantChange = (variant: IVariant | null) => {
    setSelectedVariant(variant)
    if (variant?.image) {
      const imageIndex = allImages.findIndex(img => img === variant.image)
      if (imageIndex !== -1) setSelectedImageIndex(imageIndex)
    }
  }

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index)
    if (product?.hasVariants && product.variants) {
      const selectedImage = allImages[index]
      const matchingVariant = product.variants.find(v => v.image === selectedImage && v.isActive)
      if (matchingVariant && matchingVariant.id !== selectedVariant?.id) setSelectedVariant(matchingVariant)
    }
  }

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products/${resolvedParams.id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        setError('Product not found')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const fetchRealReviewStats = async () => {
    try {
      const response = await fetch(`/api/reviews/stats?productId=${resolvedParams.id}`)
      if (response.ok) {
        const data = await response.json()
        setRealRating(data.averageRating || 0)
        setRealReviewCount(data.totalReviews || 0)
      }
    } catch (error) {
      console.error('Error fetching real review stats:', error)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    setAddingToCart(true)
    const currentPrice = selectedVariant ? selectedVariant.price : getProductDisplayPrice(product).price
    const currentImage = selectedVariant ? selectedVariant.image : getProductDisplayImage(product)
    const variantName = selectedVariant ? selectedVariant.value : undefined
    addItem({
      id: product._id || '',
      name: product.name,
      price: currentPrice,
      wholesalePrice: selectedVariant?.wholesalePrice || product.wholesalePrice,
      wholesaleThreshold: selectedVariant?.wholesaleThreshold || product.wholesaleThreshold,
      image: currentImage,
      quantity,
      selectedSize: selectedVariant?.type === 'size' ? selectedVariant.value : undefined,
      selectedScent: selectedVariant?.type === 'scent' ? selectedVariant.value : undefined,
      variantId: selectedVariant?.id,
    })
    setTimeout(() => {
      setAddingToCart(false)
      toast.success(`${product.name}${variantName ? ` (${variantName})` : ''} added to cart!`)
    }, 500)
  }

  const getCurrentStock = () => selectedVariant ? selectedVariant.stock : product?.stockQuantity || 0

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-10">
          <div className="animate-pulse grid md:grid-cols-2 gap-12">
            <div className="h-[480px] bg-gray-100 rounded-2xl" />
            <div className="space-y-5 pt-2">
              <div className="h-3 bg-gray-100 rounded w-40" />
              <div className="h-8 bg-gray-100 rounded w-4/5" />
              <div className="h-5 bg-gray-100 rounded w-32" />
              <div className="h-10 bg-gray-100 rounded w-28" />
              <div className="h-24 bg-gray-100 rounded" />
              <div className="h-14 bg-gray-100 rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-7 h-7 text-gray-400" />
            </div>
            <h1 className="text-xl font-bold mb-2 text-gray-900">Product Not Found</h1>
            <p className="text-gray-500 mb-6 text-sm">This product doesn't exist or has been removed.</p>
            <Link href="/"><Button className="bg-blue-600 hover:bg-blue-700 text-white">Return Home</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Pricing helpers
  const pricing = selectedVariant ? calculateVariantPricing(selectedVariant, quantity) : null
  const displayPrice = getProductDisplayPrice(product)
  const currentStock = getCurrentStock()
  const inStock = currentStock > 0
  const wholesaleThreshold = selectedVariant?.wholesaleThreshold
  const wholesaleProgress = wholesaleThreshold ? Math.min((quantity / wholesaleThreshold) * 100, 100) : 0

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
        <div className="border-b border-gray-100 bg-gray-50/60">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-600 transition-colors">{product.category}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-600 font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        {/* ── Main product grid ──────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-12 mb-16">

            {/* Left: Images */}
            <div className="md:sticky md:top-6 self-start">
              <ProductImageCarousel
                images={allImages}
                selectedImageIndex={selectedImageIndex}
                onImageChange={handleImageChange}
              />
            </div>

            {/* Right: Details */}
            <div className="flex flex-col gap-6">

              {/* Header block */}
              <div>
                {/* Category pill */}
                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md uppercase tracking-wider mb-3">
                  {product.category}
                </span>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-3">
                  {product.name}
                </h1>

                {/* Rating row */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(realRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`}
                      />
                    ))}
                  </div>
                  {realRating > 0 ? (
                    <span className="text-sm font-semibold text-gray-700">{realRating.toFixed(1)}</span>
                  ) : null}
                  <span className="text-sm text-gray-400">
                    {realReviewCount > 0 ? `${realReviewCount} reviews` : 'No reviews yet'}
                  </span>
                  {/* Stock indicator */}
                  <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                    {inStock ? `${currentStock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Price block */}
              <div>
                {pricing ? (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-black text-gray-900">KSH {pricing.unitPrice}</span>
                    <span className="text-sm text-gray-400">per unit</span>
                    {pricing.isWholesale && (
                      <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-2.5 py-1 rounded-full">
                        Wholesale 🎉
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-black text-gray-900">KSH {displayPrice.price}</span>
                    {displayPrice.oldPrice && (
                      <>
                        <span className="text-lg line-through text-gray-300">KSH {displayPrice.oldPrice}</span>
                        <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                          -{Math.round(((displayPrice.oldPrice - displayPrice.price) / displayPrice.oldPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* Wholesale upsell / savings banner */}
                {pricing?.hasWholesale && !pricing.isWholesale && selectedVariant && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <Package className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Buy <strong>{pricing.wholesaleThreshold}+</strong> units for <strong>KSH {pricing.wholesalePrice}</strong> each — save {Math.round(((selectedVariant.price - pricing.wholesalePrice) / selectedVariant.price) * 100)}%</span>
                  </div>
                )}
                {pricing?.isWholesale && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                    <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Saving <strong>KSH {pricing.savings.toFixed(2)}</strong> ({pricing.savingsPercentage}%) with wholesale pricing!</span>
                  </div>
                )}
              </div>

              {/* Variants */}
              {product.hasVariants && product.variants && product.variants.length > 0 && (
                <div>
                  <ProductVariations
                    variants={product.variants}
                    onVariantChange={handleVariantChange}
                    selectedVariantId={selectedVariant?.id}
                  />
                </div>
              )}

              {/* Quantity + wholesale progress */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</span>
                  {pricing && (
                    <span className="text-xs text-gray-400">
                      Total: <span className="font-bold text-gray-700">KSH {pricing.totalPrice.toFixed(0)}</span>
                    </span>
                  )}
                </div>

                {/* Quick qty chips (wholesale) */}
                {wholesaleThreshold && (
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {[1, Math.floor(wholesaleThreshold / 2), wholesaleThreshold, wholesaleThreshold * 2].filter((v, i, a) => a.indexOf(v) === i && v > 0).map(val => (
                      <button
                        key={val}
                        onClick={() => setQuantity(val)}
                        className={`px-3 py-1 text-xs rounded-lg border font-medium transition-all ${
                          quantity === val
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : val >= wholesaleThreshold
                              ? 'border-green-200 bg-green-50 text-green-700 hover:border-green-400'
                              : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {val}{val >= wholesaleThreshold ? ' ★' : ''}
                      </button>
                    ))}
                  </div>
                )}

                {/* Qty stepper */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-lg font-light transition-colors">−</button>
                    <span className="w-12 text-center font-bold text-gray-900 text-sm">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-lg font-light transition-colors">+</button>
                  </div>

                  {/* Wholesale progress bar inline */}
                  {wholesaleThreshold && quantity < wholesaleThreshold && (
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{wholesaleThreshold - quantity} more for wholesale</span>
                        <span>{quantity}/{wholesaleThreshold}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${wholesaleProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={addingToCart || !inStock}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-6 text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {addingToCart ? 'Adding…' : !inStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                    isFavorite
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                  }`}
                  aria-label="Add to favorites"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <TrustBadge icon={Shield} label="1-year warranty" />
                <TrustBadge icon={RotateCcw} label="30-day easy returns" />
                <TrustBadge icon={Package} label="Secure packaging" />
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Accordion: Description / Benefits / Usage / Ingredients */}
              {/* <div className="-mt-2">
                <Accordion title="Description" defaultOpen>
                  <p>{product.description}</p>
                </Accordion>

                {product.benefits && product.benefits.length > 0 && (
                  <Accordion title="Benefits">
                    <ul className="space-y-2">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                )}

                {product.ingredients && (
                  <Accordion title="Ingredients">
                    <p>{product.ingredients}</p>
                  </Accordion>
                )}

                {product.usage && (
                  <Accordion title="Usage Instructions">
                    <p>{product.usage}</p>
                  </Accordion>
                )}
              </div> */}
            </div>
          </div>

          {/* ── Reviews ──────────────────────────────────────────────────── */}
          <div className="border-t border-gray-100 pt-12 mb-12 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
            <RatingSystemActivator productId={product._id || ''} productName={product.name} />
            <ProductReviews productId={product._id || ''} />
          </div>

          {/* ── Related products ─────────────────────────────────────────── */}
          <div className="border-t border-gray-100 pt-12">
            <RelatedProducts currentProductId={product._id || ''} category={product.category} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}