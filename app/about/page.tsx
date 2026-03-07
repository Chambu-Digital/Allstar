'use client'

import { Zap, Award, Shield, Truck, Target, Heart, TrendingUp, ArrowRight, Users, Package, Handshake, Clock } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

const BLUE        = '#2563EB'
const BLUE_DARK   = '#1d4ed8'
const ORANGE      = '#f97316'
const ORANGE_DARK = '#ea580c'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="block w-6 h-0.5" style={{ background: ORANGE }} />
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>
        {children}
      </span>
    </div>
  )
}

export default function AboutPage() {
  const values = [
    { icon: Zap,    title: 'Latest Technology', description: 'Cutting-edge computers, electronics, and accessories with the latest features and innovations from top global brands.' },
    { icon: Shield, title: 'Quality Guaranteed', description: 'Every product comes with manufacturer warranties and our own commitment to quality service and genuine stock.' },
    { icon: Truck,  title: 'Fast Delivery',      description: 'Quick and reliable delivery across Kenya with professional on-site setup services available on request.' },
    { icon: Award,  title: 'Expert Support',     description: 'Our knowledgeable team provides expert advice and dedicated technical support for every product we sell.' },
  ]

  const stats = [
    { number: '5,000+', label: 'Happy Customers', icon: <Users  className="w-5 h-5" />, color: 'orange' },
    { number: '500+',   label: 'Products',         icon: <Package className="w-5 h-5" />, color: 'blue'   },
    { number: '50+',    label: 'Brand Partners',   icon: <Handshake className="w-5 h-5" />, color: 'blue' },
    { number: '24/7',   label: 'Support',          icon: <Clock  className="w-5 h-5" />, color: 'orange' },
  ]

  const mission = [
    { icon: Target,     title: 'Our Mission',    accent: BLUE,   description: 'To empower individuals and businesses across Kenya with quality technology solutions that enhance productivity and connectivity.' },
    { icon: Heart,      title: 'Our Vision',     accent: ORANGE, description: "To be Kenya's most trusted technology partner — recognised for exceptional service, genuine products, and lasting customer satisfaction." },
    { icon: TrendingUp, title: 'Our Commitment', accent: BLUE,   description: 'We stay ahead of technology trends while maintaining competitive pricing and personalised service for every single customer.' },
  ]

  const brands = ['Dell', 'HP', 'ASUS', 'Lenovo', 'Samsung', 'Apple', 'Acer', 'LG']

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif !important; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0}                            to{opacity:1} }
        .orange-glow { box-shadow: 0 0 28px rgba(249,115,22,0.28); }
        .blue-glow   { box-shadow: 0 0 28px rgba(37,99,235,0.25);  }
        .value-card  { transition: all 0.25s ease; }
        .value-card:hover { transform: translateY(-3px); }
      `}</style>

      <div className="flex flex-col min-h-screen" style={{ background: '#060e24' }}>
        <Header />

        <main className="flex-1">

          {/* ════════════════════════════════════════════════════════════════
              HERO
          ════════════════════════════════════════════════════════════════ */}
          <section
            className="relative overflow-hidden"
            style={{ minHeight: 380, background: 'linear-gradient(135deg, #06122b 0%, #0a1a3a 55%, #0d1f47 100%)' }}
          >
            {/* Mesh glows */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle at 10% 55%, rgba(37,99,235,0.18) 0%, transparent 48%),
                                radial-gradient(circle at 88% 20%, rgba(249,115,22,0.12) 0%, transparent 42%)`
            }} />
         
            {/* Faint bg image */}
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=600&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: 0.06 }}
            />
            {/* Top line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${BLUE},transparent)` }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" style={{ animation: 'fadeUp 0.6s ease both' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left — text */}
                <div className="space-y-6">
                  <SectionLabel>About Us</SectionLabel>
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight">
                    About <br /><span style={{ color: ORANGE }}>Allstar Tech</span>
                  </h1>
                  <p className="text-slate-400 text-base leading-relaxed max-w-md">
                    Your trusted technology partner for computers, electronics, and innovative solutions across Kenya.
                  </p>
                  <div className="flex gap-3 pt-1">
                    <Link href="/products">
                      <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white hover:scale-105 transition-all orange-glow"
                        style={{ background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})` }}>
                        Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
                        Contact Us
                      </button>
                    </Link>
                  </div>
                </div>

            
              </div>
            </div>

            {/* Bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(249,115,22,0.35),transparent)' }} />
          </section>

          {/* ════════════════════════════════════════════════════════════════
              OUR STORY
          ════════════════════════════════════════════════════════════════ */}
          <section style={{ background: '#070f25' }} className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

                {/* Image side */}
                <div className="relative">
                  {/* Blue top-left corner bracket */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 pointer-events-none" style={{ borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}`, borderRadius: '12px 0 0 0', opacity: 0.5 }} />
                  {/* Orange bottom-right corner bracket */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none" style={{ borderBottom: `2px solid ${ORANGE}`, borderRight: `2px solid ${ORANGE}`, borderRadius: '0 0 12px 0', opacity: 0.5 }} />
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop"
                    alt="Allstar Tech Team"
                    className="rounded-2xl w-full"
                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                  />
                  {/* Floating quote badge */}
                  <div
                    className="absolute -bottom-5 left-6 right-6 px-5 py-3.5 rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE})`, boxShadow: `0 10px 30px rgba(37,99,235,0.4)` }}
                  >
                    <p className="text-xs text-blue-100 italic leading-relaxed">
                      "What sets us apart is our dedication to understanding each customer's unique needs."
                    </p>
                  </div>
                </div>

                {/* Text side */}
                <div className="space-y-6 pt-8 md:pt-0">
                  <div>
                    <SectionLabel>Our Story</SectionLabel>
                    <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight">
                      Built on Trust &<br /><span style={{ color: ORANGE }}>Expertise</span>
                    </h2>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Allstar Tech has grown to become a trusted technology partner in Kenya. We specialise in computers, laptops, and electronics, partnering with leading brands like Dell, HP, ASUS, Lenovo, Samsung, and more to bring you quality technology at competitive prices.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Our team of technology experts stays current with the latest innovations, ensuring we can guide you toward the best solutions for your requirements and budget. From initial consultation to after-sales support, we're with you every step of the way.
                  </p>

                  {/* Brand pills */}
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 font-semibold">Our Partners</p>
                    <div className="flex flex-wrap gap-2">
                      {brands.map(b => (
                        <span key={b} className="px-3 py-1 rounded-full text-xs font-semibold text-slate-300"
                          style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)' }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              MISSION / VISION / COMMITMENT
          ════════════════════════════════════════════════════════════════ */}
          <section style={{ background: '#060e24' }} className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <SectionLabel>What Drives Us</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight">
                  Our <span style={{ color: ORANGE }}>Purpose</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {mission.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="value-card rounded-2xl p-7" style={{
                      background: '#070f25',
                      border: `1px solid ${item.accent}28`,
                    }}>
                   
                      <h3 className="font-display text-lg text-white mb-3">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              WHY CHOOSE US
          ════════════════════════════════════════════════════════════════ */}
          <section style={{ background: '#070f25' }} className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Left — text + grid */}
                <div>
                  <SectionLabel>Why Choose Us</SectionLabel>
                  <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-3">
                    Four Reasons to <br /><span style={{ color: ORANGE }}>Trust Allstar</span>
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                    We've built our reputation on four core principles that guide everything we do — from the products we stock to the service we deliver.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {values.map((v, i) => {
                      const Icon = v.icon
                      const isOrange = i % 2 === 0
                      return (
                        <div key={i} className="value-card rounded-xl p-4" style={{
                          background: isOrange ? 'rgba(249,115,22,0.06)' : 'rgba(37,99,235,0.07)',
                          border: isOrange ? '1px solid rgba(249,115,22,0.18)' : '1px solid rgba(37,99,235,0.18)',
                        }}>
                        
                          <h3 className="text-sm font-bold text-white mb-1">{v.title}</h3>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{v.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right — image with corner brackets */}
                <div className="relative hidden md:block">
                  <div className="absolute -top-4 -right-4 w-20 h-20 pointer-events-none" style={{ borderTop: `2px solid ${ORANGE}`, borderRight: `2px solid ${ORANGE}`, borderRadius: '0 12px 0 0', opacity: 0.5 }} />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 pointer-events-none" style={{ borderBottom: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}`, borderRadius: '0 0 0 12px', opacity: 0.5 }} />
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=520&fit=crop"
                    alt="Technology workspace"
                    className="rounded-2xl w-full"
                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              CTA BANNER
          ════════════════════════════════════════════════════════════════ */}
          <section
            className="relative overflow-hidden py-20 md:py-24"
            style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1f47 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle at 70% 50%, rgba(37,99,235,0.1) 0%, transparent 55%),
                                radial-gradient(circle at 15% 80%, rgba(249,115,22,0.08) 0%, transparent 45%)`
            }} />
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=600&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: 0.05 }}
            />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${BLUE},transparent)` }} />

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <SectionLabel>Ready to upgrade?</SectionLabel>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.05] tracking-tight">
                Upgrade Your Tech<br />
                <span style={{ color: ORANGE }}>Today</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto">
                Join thousands of satisfied customers. Experience quality technology, expert service, and competitive prices — all under one roof.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link href="/products">
                  <button className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white hover:scale-105 transition-all orange-glow"
                    style={{ background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})` }}>
                    Browse Products <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
                    Get In Touch
                  </button>
                </Link>
              </div>
              <p className="text-xs text-slate-600 pt-2">
                Need help choosing the right product? Our experts are here to help.
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(249,115,22,0.35),transparent)' }} />
          </section>

        </main>

        <Footer />
      </div>
    </>
  )
}