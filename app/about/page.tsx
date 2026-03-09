'use client'

import {
  Zap, Award, Shield, Truck, Target, Heart, TrendingUp,
  ArrowRight, Users, Package, Handshake, Clock,
  CheckCircle, Star, MapPin, Phone, Mail, ChevronRight,
  Sparkles, Globe, Coffee, Lightbulb
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useState } from 'react'

// ─── Design Tokens ──────────────────────────────────────────────────────────
const T = {
  orange:      '#f97316',
  orangeDark:  '#ea580c',
  orangeLight: '#fb923c',
  orangePale:  '#fff7ed',
  orangeMid:   '#fed7aa',
  white:       '#ffffff',
  offWhite:    '#fafaf9',
  stone50:     '#fafaf9',
  stone100:    '#f5f5f4',
  stone200:    '#e7e5e4',
  stone300:    '#d6d3d1',
  stone400:    '#a8a29e',
  stone500:    '#78716c',
  stone600:    '#57534e',
  stone700:    '#44403c',
  stone800:    '#292524',
  stone900:    '#1c1917',
  // Hero dark background (preserved from original)
  heroBg:      '#060e24',
  heroBg2:     '#070f25',
  heroBg3:     '#0a1628',
}

// ─── Static Data ─────────────────────────────────────────────────────────────
const values = [
  { icon: Zap,       title: 'Latest Technology',  description: 'Cutting-edge computers, electronics, and accessories with the latest features and innovations from top global brands.', emoji: '⚡' },
  { icon: Shield,    title: 'Quality Guaranteed',  description: 'Every product comes with manufacturer warranties and our commitment to genuine stock and exceptional service.', emoji: '🛡️' },
  { icon: Truck,     title: 'Fast Delivery',       description: 'Quick and reliable delivery across Kenya with professional on-site setup services available on request.', emoji: '🚚' },
  { icon: Award,     title: 'Expert Support',      description: 'Our knowledgeable team provides expert advice and dedicated technical support for every product we sell.', emoji: '🏆' },
]

const stats = [
  { number: '10,000+', label: 'Happy Customers', icon: <Users     className="w-5 h-5" />, sub: 'And counting' },
  { number: '500+',    label: 'Products',         icon: <Package   className="w-5 h-5" />, sub: 'Curated range' },
  { number: '50+',     label: 'Brand Partners',   icon: <Handshake className="w-5 h-5" />, sub: 'Global brands' },
  { number: '24/7',    label: 'Support',           icon: <Clock     className="w-5 h-5" />, sub: 'Always available' },
]

const mission = [
  {
    icon: Target,     title: 'Our Mission',    emoji: '🎯',
    description: 'To empower individuals and businesses across Kenya with quality technology solutions that enhance productivity, creativity, and connectivity for everyone.',
  },
  {
    icon: Heart,      title: 'Our Vision',     emoji: '💡',
    description: "To be Kenya's most trusted technology partner — recognised for exceptional service, genuine products, lasting customer satisfaction, and community impact.",
  },
  {
    icon: TrendingUp, title: 'Our Commitment', emoji: '📈',
    description: 'We stay ahead of technology trends while maintaining competitive pricing and delivering personalised service that treats every customer as a partner.',
  },
]

const team = [
  { name: 'Alex Mwangi',     role: 'CEO & Founder',     avatar: 'AM', expertise: 'Enterprise Solutions & Strategy' },
  { name: 'Cynthia Oduya',   role: 'Head of Sales',      avatar: 'CO', expertise: 'Customer Experience & Growth' },
  { name: 'David Kimani',    role: 'Lead Tech Advisor',  avatar: 'DK', expertise: 'Hardware & Custom Builds' },
  { name: 'Fatuma Abdirahman', role: 'Support Lead',     avatar: 'FA', expertise: 'After-Sales & Tech Support' },
]

const timeline = [
  { year: '2019', title: 'Founded', desc: 'Started as a small accessories shop in Nairobi CBD with a big vision.' },
  { year: '2020', title: 'Expansion', desc: 'Expanded our product range to include laptops, desktops, and monitors.' },
  { year: '2021', title: 'Partnerships', desc: 'Secured authorised partnerships with Dell, HP, ASUS, and Lenovo.' },
  { year: '2022', title: 'Online Launch', desc: 'Launched our e-commerce platform to serve customers across Kenya.' },
  { year: '2023', title: '5,000+ Customers', desc: 'Hit a major milestone — 5,000 happy customers served.' },
  { year: '2024', title: 'Growing Strong', desc: 'Expanded warehouse, faster deliveries, and 10K+ customers reached.' },
]

const brands = ['Dell', 'HP', 'ASUS', 'Lenovo', 'Samsung', 'Apple', 'Acer', 'LG', 'MSI', 'Corsair']

const perks = [
  { icon: '🎁', label: 'Free Setup Assistance' },
  { icon: '🔄', label: '7-Day Easy Returns' },
  { icon: '💳', label: 'Flexible Payment Plans' },
  { icon: '📦', label: 'Secure Packaging' },
  { icon: '🛠️', label: 'On-Site Tech Support' },
  { icon: '🏷️', label: 'Best Price Guarantee' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionTag({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2.5 mb-3 ${center ? 'justify-center w-full' : ''}`}>
      <span style={{ display: 'block', width: 28, height: 2.5, borderRadius: 2, background: T.orange }} />
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: T.orange,
        fontFamily: "'Outfit', sans-serif",
      }}>{children}</span>
    </div>
  )
}

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background: T.white,
        border: `1.5px solid ${hovered ? T.orange : T.stone200}`,
        boxShadow: hovered ? '0 12px 40px rgba(249,115,22,0.15)' : '0 2px 16px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        animation: `fadeUp 0.5s ease both`,
        animationDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top orange bar */}
      <div className="h-1.5 w-full transition-all duration-300"
        style={{ background: hovered ? `linear-gradient(90deg, ${T.orangeDark}, ${T.orange})` : T.stone200 }} />
      <div className="p-6 text-center space-y-3">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-lg text-white mx-auto transition-all duration-300"
          style={{ background: hovered ? `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` : `linear-gradient(135deg, ${T.stone700}, ${T.stone900})` }}>
          {member.avatar}
        </div>
        <div>
          <h3 className="font-bold text-sm" style={{ color: T.stone900, fontFamily: "'Syne', sans-serif" }}>{member.name}</h3>
          <p className="text-xs font-semibold mt-0.5 transition-colors duration-300" style={{ color: hovered ? T.orange : T.stone400 }}>{member.role}</p>
        </div>
        <p className="text-xs leading-relaxed px-2" style={{ color: T.stone500 }}>{member.expertise}</p>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(5) // latest by default

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Syne:wght@700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }
        .font-display { font-family: 'Syne', sans-serif !important; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes shimmer { from{background-position:-200% 0} to{background-position:200% 0} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }

        .orange-glow { box-shadow: 0 4px 28px rgba(249,115,22,0.42); }
        .orange-glow:hover { box-shadow: 0 6px 36px rgba(249,115,22,0.55); }
        .card-lift   { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(249,115,22,0.14); }
        .float-badge { animation: float 3.5s ease-in-out infinite; }

        .brand-pill { transition: all 0.2s ease; cursor: default; }
        .brand-pill:hover { background: ${T.orange} !important; color: white !important; border-color: ${T.orange} !important; transform: scale(1.05); }

        .timeline-dot { transition: all 0.25s ease; }

        .value-card { transition: all 0.25s ease; }
        .value-card:hover { transform: translateY(-4px); }

        .perk-chip { transition: all 0.2s ease; cursor: default; }
        .perk-chip:hover { background: ${T.orange} !important; color: white !important; border-color: ${T.orange} !important; }
      `}</style>

      <div className="flex flex-col min-h-screen" style={{ background: T.offWhite }}>
        <Header />

        <main className="flex-1">

          {/* ════════════════════════════════════════════════════════
              HERO — dark bg preserved, orange accent
          ════════════════════════════════════════════════════════ */}
          <section className="relative overflow-hidden" style={{ minHeight: 480, background: T.heroBg }}>

            {/* Mesh glows */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle at 8% 55%, rgba(249,115,22,0.18) 0%, transparent 45%),
                                radial-gradient(circle at 88% 20%, rgba(249,115,22,0.10) 0%, transparent 40%),
                                radial-gradient(circle at 50% 90%, rgba(249,115,22,0.07) 0%, transparent 40%)`
            }} />

            {/* Faint bg image */}
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=600&fit=crop" alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: 0.07 }} />

            {/* Top orange rule */}
            <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${T.orange}, transparent)` }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"
              style={{ animation: 'fadeUp 0.65s ease both' }}>
              <div className="grid md:grid-cols-2 gap-14 items-center">

                {/* Left — Text */}
                <div className="space-y-7">
                  <SectionTag>About Us</SectionTag>
                  <h1 className="font-display text-white leading-[1.01] tracking-tight"
                    style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                    About<br /><span style={{ color: T.orange }}>Allstar Tech</span>
                  </h1>
                  <p className="text-slate-400 text-base leading-relaxed max-w-md">
                    Kenya's trusted technology partner — delivering genuine products, expert advice, and exceptional service since 2019.
                  </p>

               

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link href="/products">
                      <button className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white hover:scale-105 transition-all orange-glow"
                        style={{ background: `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                        Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                        style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.orange; (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.12)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}>
                        Contact Us
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right — Image with overlapping stat cards */}
                <div className="relative hidden md:block">
                  <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none"
                    style={{ borderTop: `2px solid ${T.orange}`, borderRight: `2px solid ${T.orange}`, borderRadius: '0 12px 0 0', opacity: 0.6 }} />
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 pointer-events-none"
                    style={{ borderBottom: `2px solid rgba(255,255,255,0.2)`, borderLeft: `2px solid rgba(255,255,255,0.2)`, borderRadius: '0 0 0 12px' }} />
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop"
                    alt="Allstar Tech Team"
                    className="rounded-2xl w-full"
                    style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.55)' }} />


                </div>
              </div>
            </div>

            {/* Bottom orange rule */}
            <div className="absolute bottom-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${T.orange}, transparent)` }} />
          </section>


          {/* ════════════════════════════════════════════════════════
              OUR STORY — white bg
          ════════════════════════════════════════════════════════ */}
          <section style={{ background: T.white }} className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

                {/* Image */}
                <div className="relative order-2 md:order-1">
                  <div className="absolute -top-4 -left-4 w-20 h-20 pointer-events-none"
                    style={{ borderTop: `3px solid ${T.orange}`, borderLeft: `3px solid ${T.orange}`, borderRadius: '14px 0 0 0' }} />
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 pointer-events-none"
                    style={{ borderBottom: `3px solid ${T.orangeMid}`, borderRight: `3px solid ${T.orangeMid}`, borderRadius: '0 0 14px 0' }} />
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop"
                    alt="Allstar Tech Team"
                    className="rounded-2xl w-full"
                    style={{ boxShadow: '0 16px 56px rgba(0,0,0,0.12)' }} />
                  {/* Quote badge */}
                  <div className="absolute -bottom-6 left-6 right-6 px-5 py-4 rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${T.orangeDark}, ${T.orange})`, boxShadow: '0 10px 32px rgba(249,115,22,0.38)' }}>
                    <p className="text-xs text-white/90 italic leading-relaxed">
                      "What sets us apart is our dedication to understanding each customer's unique needs and delivering solutions that truly make a difference."
                    </p>
                    <p className="text-[10px] font-bold text-white/60 mt-2">— Alex Mwangi, CEO & Founder</p>
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-6 pt-10 md:pt-0 order-1 md:order-2">
                  <SectionTag>Our Story</SectionTag>
                  <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight" style={{ color: T.stone900 }}>
                    Built on Trust &<br /><span style={{ color: T.orange }}>Expertise</span>
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: T.stone600 }}>
                    Allstar Tech was born from a simple belief — Kenyans deserve access to world-class technology at fair prices, with service that actually cares. What started as a small accessories shop has grown into one of Nairobi's most trusted technology destinations.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: T.stone600 }}>
                    We partner with leading global brands like Dell, HP, ASUS, Lenovo, Samsung, and Apple to bring you quality technology backed by genuine warranties. Our team of experts stays current with every innovation so we can guide you toward the best solution for your exact needs and budget.
                  </p>

                

                  {/* Partner brands */}
                  <div>
                    <p className="text-[11px] font-bold uppercase mb-3" style={{ color: T.stone400, letterSpacing: '0.12em' }}>Our Brand Partners</p>
                    <div className="flex flex-wrap gap-2">
                      {brands.map(b => (
                        <span key={b} className="brand-pill px-3 py-1.5 rounded-full text-xs font-bold"
                          style={{ background: T.stone100, color: T.stone700, border: `1.5px solid ${T.stone200}` }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════
              MISSION / VISION / COMMITMENT
          ════════════════════════════════════════════════════════ */}
          <section style={{ background: T.offWhite, borderTop: `2px solid ${T.stone100}` }} className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <SectionTag center>What Drives Us</SectionTag>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight" style={{ color: T.stone900 }}>
                  Our <span style={{ color: T.orange }}>Purpose</span>
                </h2>
                <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: T.stone500 }}>
                  Three pillars that shape every decision we make, every product we stock, and every interaction we have.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {mission.map((item, i) => (
                  <div key={i} className="card-lift rounded-2xl p-8 cursor-default"
                    style={{
                      background: T.white,
                      border: `1.5px solid ${T.stone200}`,
                      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                      animation: `fadeUp 0.5s ease both`,
                      animationDelay: `${i * 100}ms`,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.orange; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(249,115,22,0.14)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.stone200; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)' }}>
                  
                    {/* Top orange accent line */}
                    <div className="w-10 h-1 rounded-full mb-4" style={{ background: T.orange }} />
                    <h3 className="font-display text-lg mb-3" style={{ color: T.stone900 }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: T.stone500 }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        

          {/* ════════════════════════════════════════════════════════
              WHY CHOOSE US — split layout with value cards
          ════════════════════════════════════════════════════════ */}
          <section style={{ background: T.offWhite, borderTop: `2px solid ${T.stone100}` }} className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Left */}
                <div>
                  <SectionTag>Why Choose Us</SectionTag>
                  <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight mb-4" style={{ color: T.stone900 }}>
                    Reasons to<br /><span style={{ color: T.orange }}>Trust Allstar</span>
                  </h2>
                  <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: T.stone500 }}>
                    We've built our reputation on four core principles that guide everything we do — from the products we stock to the service we deliver.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {values.map((v, i) => (
                      <div key={i} className="value-card rounded-2xl p-5 cursor-default"
                        style={{
                          background: T.white,
                          border: `1.5px solid ${T.stone200}`,
                          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                          animation: `fadeUp 0.5s ease both`,
                          animationDelay: `${i * 80}ms`,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.orange; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(249,115,22,0.13)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.stone200; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}>
                        <h3 className="text-xs font-bold mb-1.5" style={{ color: T.stone900 }}>{v.title}</h3>
                        <p className="text-[11px] leading-relaxed" style={{ color: T.stone500 }}>{v.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — image */}
                <div className="relative hidden md:block">
                  <div className="absolute -top-4 -right-4 w-20 h-20 pointer-events-none"
                    style={{ borderTop: `3px solid ${T.orange}`, borderRight: `3px solid ${T.orange}`, borderRadius: '0 14px 0 0' }} />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 pointer-events-none"
                    style={{ borderBottom: `3px solid ${T.orangeMid}`, borderLeft: `3px solid ${T.orangeMid}`, borderRadius: '0 0 0 14px' }} />
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=520&fit=crop"
                    alt="Technology workspace"
                    className="rounded-2xl w-full"
                    style={{ boxShadow: '0 16px 56px rgba(0,0,0,0.1)' }} />
              
                </div>
              </div>
            </div>
          </section>

    

      

          {/* ════════════════════════════════════════════════════════
              CTA BANNER — orange bg
          ════════════════════════════════════════════════════════ */}
          <section className="relative overflow-hidden py-20 md:py-24" style={{ background: T.orange }}>
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 55%),
                                radial-gradient(ellipse at 85% 80%, rgba(0,0,0,0.08) 0%, transparent 45%)`
            }} />
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=600&fit=crop" alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: 0.04, mixBlendMode: 'multiply' }} />

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-bold text-white/60 tracking-widest uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>Ready to upgrade?</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.05] tracking-tight">
                Upgrade Your Tech<br /><span style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.4)', textUnderlineOffset: 6 }}>Today</span>
              </h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Join thousands of satisfied Kenyans. Experience quality technology, expert service, and competitive prices — all under one roof.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link href="/products">
                  <button className="group inline-flex items-center gap-2 px-9 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-all"
                    style={{ background: T.white, color: T.orange, boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 36px rgba(0,0,0,0.2)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)'}>
                    Browse Products <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-9 py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                    style={{ border: '2px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)' }}>
                    Get In Touch
                  </button>
                </Link>
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Need help choosing? Our experts are just a message away.
              </p>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  )
}