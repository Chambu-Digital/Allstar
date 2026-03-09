'use client'

import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Shield, Truck, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import { companyInfo, getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/company-info'

// ─── Design tokens (in sync with header & all pages) ─────────────────────────
const T = {
  orange:     '#f97316',
  orangeDark: '#ea580c',
  orangePale: '#fff7ed',
  orangeMid:  '#fed7aa',
  white:      '#ffffff',
  stone100:   '#f5f5f4',
  stone200:   '#e7e5e4',
  stone400:   '#a8a29e',
  stone500:   '#78716c',
  stone600:   '#57534e',
  stone700:   '#44403c',
  stone800:   '#292524',
  stone900:   '#1c1917',
  green:      '#16a34a',
  greenDark:  '#15803d',
  greenPale:  '#f0fdf4',
  greenMid:   '#bbf7d0',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-sm transition-all duration-150"
        style={{ color: T.stone400 }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone400}
      >
        <ArrowRight
          className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 flex-shrink-0"
          style={{ color: T.orange }}
        />
        <span className="group-hover:translate-x-0.5 transition-transform duration-150">{children}</span>
      </Link>
    </li>
  )
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span style={{ display:'block', width:20, height:2.5, borderRadius:2, background:T.orange, flexShrink:0 }} />
      <h4 className="text-xs font-bold uppercase" style={{ color: T.white, fontFamily:"'Outfit',sans-serif", letterSpacing: '0.12em' }}>
        {children}
      </h4>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap');
        footer * { font-family: 'Outfit', sans-serif; }
      `}</style>

      <footer style={{ background: T.stone900 }}>

    

        {/* ══════════════════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* ── Brand ── */}
            <div className="space-y-5 lg:col-span-1">
              <Link href="/" className="inline-block group">
                <img src="/allstar-logo.svg" alt="Allstar Tech"
                  className="h-10 w-auto transition-all duration-200 group-hover:scale-105"
                />
              </Link>

              <p className="text-sm leading-relaxed" style={{ color:T.stone400 }}>
                Your trusted partner for premium computers, laptops, and cutting-edge electronics in Kenya. Quality products, exceptional service.
              </p>

              {/* WhatsApp CTA */}
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105"
                style={{ background:`linear-gradient(135deg, ${T.greenDark}, ${T.green})`, boxShadow:'0 4px 16px rgba(22,163,74,0.35)' }}>
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              {/* Hours pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                style={{ background:'rgba(249,115,22,0.1)', border:`1px solid rgba(249,115,22,0.2)`, color:T.orange }}>
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                Mon–Sat: 8AM – 6PM
              </div>
            </div>

            {/* ── Shop ── */}
            <div>
              <ColHeading>Shop</ColHeading>
              <ul className="space-y-2.5">
                <FooterLink href="/products">All Products</FooterLink>
                <FooterLink href="/category/laptops">Laptops</FooterLink>
                <FooterLink href="/category/desktop-computers">Desktop Computers</FooterLink>
                <FooterLink href="/category/monitors-displays">Monitors & Displays</FooterLink>
                <FooterLink href="/category/components">Components</FooterLink>
                <FooterLink href="/category/accessories">Accessories</FooterLink>
              </ul>
            </div>

            {/* ── Company ── */}
            <div>
              <ColHeading>Company</ColHeading>
              <ul className="space-y-2.5">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
                <FooterLink href="/testimonials">Customer Reviews</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
              </ul>
            </div>

            {/* ── Contact ── */}
            <div>
              <ColHeading>Get In Touch</ColHeading>
              <ul className="space-y-3">

                {/* Phone */}
                <li>
                  <a href={getPhoneLink()} className="flex items-center gap-3 group transition-all duration-150">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150"
                      style={{ background:'rgba(249,115,22,0.12)', color:T.orange }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='rgba(249,115,22,0.25)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='rgba(249,115,22,0.12)'}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:T.stone500 }}>Call Us</p>
                      <p className="text-sm font-semibold group-hover:text-orange-400 transition-colors duration-150" style={{ color:T.white }}>
                        {companyInfo.phone}
                      </p>
                    </div>
                  </a>
                </li>

                {/* WhatsApp */}
                <li>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 group transition-all duration-150">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150"
                      style={{ background:'rgba(22,163,74,0.12)', color:T.green }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='rgba(22,163,74,0.25)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='rgba(22,163,74,0.12)'}>
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:T.stone500 }}>WhatsApp</p>
                      <p className="text-sm font-semibold group-hover:text-green-400 transition-colors duration-150" style={{ color:T.white }}>
                        Chat Instantly
                      </p>
                    </div>
                  </a>
                </li>

                {/* Email */}
                <li>
                  <a href={getEmailLink()} className="flex items-center gap-3 group transition-all duration-150">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150"
                      style={{ background:'rgba(249,115,22,0.12)', color:T.orange }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='rgba(249,115,22,0.25)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='rgba(249,115,22,0.12)'}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:T.stone500 }}>Email</p>
                      <p className="text-sm font-semibold group-hover:text-orange-400 transition-colors duration-150 break-all" style={{ color:T.white }}>
                        {companyInfo.email}
                      </p>
                    </div>
                  </a>
                </li>

                {/* Address */}
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background:'rgba(255,255,255,0.06)', color:T.stone400 }}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:T.stone500 }}>Location</p>
                    <p className="text-sm font-semibold leading-snug" style={{ color:T.white }}>{companyInfo.address}</p>
                    <p className="text-xs mt-0.5" style={{ color:T.stone400 }}>{companyInfo.city}, {companyInfo.country}</p>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════════════════ */}
        <div style={{ borderTop:`1px solid rgba(255,255,255,0.07)` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

              <p className="text-xs text-center sm:text-left" style={{ color:T.stone500 }}>
                &copy; {year}{' '}
                <span className="font-black" style={{ color:T.white }}>ALLSTAR TECH</span>
                {' '}— All rights reserved.
              </p>

              <div className="flex items-center gap-4 text-xs">
                <Link href="/privacy"
                  className="transition-colors duration-150"
                  style={{ color:T.stone500 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone500}>
                  Privacy Policy
                </Link>
                <span className="w-1 h-1 rounded-full" style={{ background:T.orange }} />
                <Link href="/terms"
                  className="transition-colors duration-150"
                  style={{ color:T.stone500 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone500}>
                  Terms of Service
                </Link>
                <span className="w-1 h-1 rounded-full hidden sm:block" style={{ background:T.orange }} />
                <Link href="/contact"
                  className="transition-colors duration-150 hidden sm:block"
                  style={{ color:T.stone500 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.orange}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.stone500}>
                  Contact
                </Link>
              </div>

            </div>
          </div>
        </div>

      </footer>
    </>
  )
}