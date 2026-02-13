'use client'

import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Laptop2 } from 'lucide-react'
import Link from 'next/link'
import { companyInfo, getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/company-info'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 rounded-lg blur-sm opacity-60"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Laptop2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h2 className="text-xl font-black text-white tracking-wide">
                ALLSTAR TECH
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner for premium computers, laptops, and cutting-edge electronics. Quality products, exceptional service.
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400">Authorized Dealer</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                <span className="text-gray-400">Warranty Support</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400">Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  <span className="group-hover:translate-x-1 transition-transform">All Products</span>
                </Link>
              </li>
              <li>
                <Link href="/category/laptops" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  <span className="group-hover:translate-x-1 transition-transform">Laptops</span>
                </Link>
              </li>
              <li>
                <Link href="/category/desktop-computers" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  <span className="group-hover:translate-x-1 transition-transform">Desktop Computers</span>
                </Link>
              </li>
              <li>
                <Link href="/category/monitors-displays" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  <span className="group-hover:translate-x-1 transition-transform">Monitors</span>
                </Link>
              </li>
              <li>
                <Link href="/category/components" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  <span className="group-hover:translate-x-1 transition-transform">Components</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  <span className="group-hover:translate-x-1 transition-transform">Customer Reviews</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  <span className="group-hover:translate-x-1 transition-transform">Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href={getPhoneLink()} 
                  className="flex items-start gap-3 hover:text-blue-400 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-xs">Call Us</div>
                    <div className="text-xs text-gray-400">{companyInfo.phone}</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-green-400 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-xs">WhatsApp</div>
                    <div className="text-xs text-gray-400">Quick Support</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href={getEmailLink()} 
                  className="flex items-start gap-3 hover:text-cyan-400 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-xs">Email</div>
                    <div className="text-xs text-gray-400 break-all">{companyInfo.email}</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-white text-xs">Location</div>
                  <div className="text-xs leading-relaxed text-gray-400">
                    {companyInfo.address}<br />
                    {companyInfo.city}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-white text-xs">Hours</div>
                  <div className="text-xs text-gray-400">Mon-Sat: 8AM-6PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="text-center md:text-left">
              <span className="text-gray-500">
                &copy; 2026 <span className="font-bold text-white">ALLSTAR TECH</span>. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
