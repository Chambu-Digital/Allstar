'use client'

import { Mail, Phone, MapPin, Clock, MessageCircle, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { companyInfo, getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/company-info'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Stay Updated with Tech Trends
              </h3>
              <p className="text-teal-100">
                Get exclusive deals, new arrivals, and tech tips delivered to your inbox
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto md:min-w-[400px]">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500 focus-visible:ring-white"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-3 tracking-wide">
                ALLSTAR TECH
              </h2>
              <p className="text-sm leading-relaxed">
                Your trusted partner for premium computers, laptops, and cutting-edge electronics. Quality products, competitive prices, exceptional service.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="text-white font-bold mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/laptops" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/category/desktop-computers" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Desktop Computers
                </Link>
              </li>
              <li>
                <Link href="/category/monitors-displays" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Monitors
                </Link>
              </li>
              <li>
                <Link href="/category/components" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Components
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a 
                  href={getPhoneLink()} 
                  className="flex items-start gap-3 hover:text-teal-400 transition-colors duration-200 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-teal-400" />
                  <div>
                    <div className="font-medium text-white">Call Us</div>
                    <div className="text-xs">{companyInfo.phone}</div>
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
                  <MessageCircle className="w-4 h-4 mt-0.5 text-green-400" />
                  <div>
                    <div className="font-medium text-white">WhatsApp</div>
                    <div className="text-xs">Quick Support</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href={getEmailLink()} 
                  className="flex items-start gap-3 hover:text-orange-400 transition-colors duration-200 group"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-orange-400" />
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div className="text-xs">{companyInfo.email}</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                <div>
                  <div className="font-medium text-white">Location</div>
                  <div className="text-xs leading-relaxed">
                    {companyInfo.address}<br />
                    {companyInfo.city}, {companyInfo.country}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-gray-400" />
                <div>
                  <div className="font-medium text-white">Hours</div>
                  <div className="text-xs">Mon-Sat: 8AM-6PM</div>
                  <div className="text-xs">Sunday: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Authorized Dealer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Warranty Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Expert Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Secure Payments</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="text-center md:text-left">
              <span className="text-gray-400">
                &copy; 2026 <span className="font-bold text-white">ALLSTAR TECH</span>. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-teal-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-teal-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <span>Made with ❤️ in Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
