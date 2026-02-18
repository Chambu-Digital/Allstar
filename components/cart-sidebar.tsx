'use client'

import { useState } from 'react'
import { Plus, Minus, ShoppingBag, Trash2, MessageCircle, Package, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCartStore } from '@/lib/cart-store'
import { sendWhatsAppOrder } from '@/lib/whatsapp-service'
import { useToast } from '@/components/ui/custom-toast'
import Link from 'next/link'

interface CartSidebarProps {
  children: React.ReactNode
}

export default function CartSidebar({ children }: CartSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const toast = useToast()

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(index)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(index, newQuantity)
    }
  }

  const handleRemoveItem = (index: number, name: string) => {
    removeItem(index)
    toast.success(`${name} removed`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }

  const handleWhatsAppCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    const orderItems = items.map(item => ({
      productId: item.id,
      name: `${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ''}${item.selectedScent ? ` - ${item.selectedScent}` : ''}`,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      variantId: item.variantId,
      variantDetails: {
        type: item.selectedSize ? 'size' : (item.selectedScent ? 'scent' : 'default'),
        value: item.selectedSize || item.selectedScent || 'default',
        sku: item.variantId || 'default'
      }
    }))
    try {
      await sendWhatsAppOrder('Customer', '+254713065412', orderItems, { county: 'Nairobi', area: 'CBD' }, 'whatsapp@allstar.co.ke')
      setIsOpen(false)
      clearCart()
      toast.success('Order sent via WhatsApp!')
    } catch (error) {
      console.error('Error processing WhatsApp order:', error)
      toast.error('Failed to process order. Please try again.')
    }
  }

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        className="w-full sm:max-w-[420px] p-0 flex flex-col bg-white border-l border-gray-100"
        style={{ gap: 0 }}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShoppingBag style={{ width: 18, height: 18 }} className="text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base leading-tight">My Cart</h2>
              <p className="text-xs text-gray-400 leading-tight">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-16">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-5">
              <Package className="w-9 h-9 text-gray-300" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Nothing here yet</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Browse our catalog and add something you love.
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl px-6 font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              Shop Now
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        ) : (
          <>
            
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.map((item, index) => {
                const lineTotal = item.price * item.quantity
                const variantLabel = [
                  item.selectedSize && `Size: ${item.selectedSize}`,
                  item.selectedScent && `Scent: ${item.selectedScent}`,
                ].filter(Boolean).join(' · ')

                return (
                  <div
                    key={`${item.id}-${item.selectedSize || 'default'}-${item.selectedScent || 'default'}`}
                    className="flex gap-3 bg-gray-50 rounded-2xl p-3 group"
                  >
                    {/* Image */}
                    <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-white flex-shrink-0 border border-gray-100">
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm leading-snug truncate pr-2">{item.name}</h4>
                        {variantLabel && (
                          <p className="text-xs text-gray-400 mt-0.5">{variantLabel}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Qty stepper */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price + delete */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            KSH {lineTotal.toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(index, item.name)}
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Footer ──────────────────────────────────────────────── */}
            <div className="border-t border-gray-100 bg-white px-5 py-5 space-y-4">
              {/* Order summary */}
              <div className="bg-gray-50 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Order total</p>
                  <p className="text-2xl font-black text-gray-900">
                    KSH <span className="text-blue-600">{totalPrice.toLocaleString()}</span>
                  </p>
                </div>
                <div className="text-right text-xs text-gray-400 space-y-0.5">
                  <p>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                  <p className="text-green-600 font-medium">Free delivery eligible</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                {/* WhatsApp CTA */}
                <Button
                  onClick={handleWhatsAppCheckout}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order via WhatsApp
                </Button>

                {/* View cart + coming soon row */}
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/cart" onClick={() => setIsOpen(false)} className="block">
                    <Button
                      variant="outline"
                      className="w-full h-10 text-xs font-semibold rounded-xl border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all"
                    >
                      View Cart
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full h-10 text-xs rounded-xl border-gray-100 text-gray-300 cursor-not-allowed"
                  >
                    Pay Online (Soon)
                  </Button>
                </div>

                {/* Clear cart */}
                <button
                  onClick={handleClearCart}
                  className="w-full text-xs text-gray-300 hover:text-red-400 transition-colors py-1 font-medium"
                >
                  Clear all items
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}