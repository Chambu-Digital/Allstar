'use client'

import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle, ChevronDown } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { companyInfo, getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/company-info'
import { useState } from 'react'

// ─── Brand colours ─────────────────────────────────────────────────────────────
const BLUE       = '#2563EB'
const BLUE_DARK  = '#1d4ed8'
const ORANGE     = '#f97316'
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

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const faqs = [
    { question: "What are your delivery options?",         answer: "We offer delivery across Kenya. Standard delivery takes 2-3 business days within Nairobi and 3-5 days for other regions. Express delivery options are available." },
    { question: "Do you offer installation and setup services?", answer: "Yes! We provide professional installation and setup services for computers, laptops, and other devices. Our technicians can visit your location or guide you remotely." },
    { question: "What warranty do your products come with?", answer: "All our products come with manufacturer warranties. The warranty period varies by product and brand, typically ranging from 1-3 years. We also offer extended warranty options." },
    { question: "Can I return or exchange a product?",     answer: "Yes, we have a 7-day return policy for unopened items in original condition. For defective products, we offer exchanges or repairs under warranty terms." },
    { question: "Do you offer bulk or corporate pricing?", answer: "Absolutely! We offer special pricing for bulk orders and corporate clients. Contact us directly to discuss your requirements and get a custom quote." },
  ]

  const contactCards = [
    {
      href: getPhoneLink(),
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Us',
      value: companyInfo.phone,
      sub: 'Mon–Sat: 8AM–6PM',
      color: 'blue',
      target: undefined,
    },
    {
      href: getWhatsAppLink(),
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      value: 'Quick Support',
      sub: 'Instant messaging',
      color: 'green',
      target: '_blank',
    },
    {
      href: getEmailLink(),
      icon: <Mail className="w-5 h-5" />,
      label: 'Email Us',
      value: companyInfo.email,
      sub: 'Response within 24hrs',
      color: 'orange',
      target: undefined,
    },
  ]

  const cardStyle = (color: string, hover = false) => {
    const map: Record<string, { bg: string; border: string; icon: string }> = {
      blue:   { bg: hover ? 'rgba(37,99,235,0.15)'   : 'rgba(37,99,235,0.08)',   border: hover ? 'rgba(37,99,235,0.5)'   : 'rgba(37,99,235,0.2)',   icon: BLUE },
      green:  { bg: hover ? 'rgba(34,197,94,0.15)'   : 'rgba(34,197,94,0.08)',   border: hover ? 'rgba(34,197,94,0.5)'   : 'rgba(34,197,94,0.2)',   icon: '#22c55e' },
      orange: { bg: hover ? 'rgba(249,115,22,0.15)'  : 'rgba(249,115,22,0.08)',  border: hover ? 'rgba(249,115,22,0.5)'  : 'rgba(249,115,22,0.2)',  icon: ORANGE },
    }
    return map[color] ?? map.blue
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        .orange-glow { box-shadow: 0 0 28px rgba(249,115,22,0.28); }
        .blue-glow   { box-shadow: 0 0 28px rgba(37,99,235,0.25); }
        .contact-card { transition: all 0.2s ease; }
        .contact-card:hover { transform: translateY(-2px); }
        .form-input {
          width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.65rem; font-size: 0.875rem;
          background: rgba(37,99,235,0.07); border: 1px solid rgba(37,99,235,0.18);
          color: white; outline: none; transition: border-color 0.2s;
        }
        .form-input::placeholder { color: #475569; }
        .form-input:focus { border-color: rgba(37,99,235,0.55); }
      `}</style>

      <div className="flex flex-col min-h-screen" style={{ background: '#060e24' }}>
        <Header />

        {/* ══════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ minHeight: 340, background: 'linear-gradient(135deg, #06122b 0%, #0a1a3a 55%, #0d1f47 100%)' }}
        >
          {/* Mesh glows */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 12% 60%, rgba(37,99,235,0.18) 0%, transparent 48%),
                              radial-gradient(circle at 85% 25%, rgba(249,115,22,0.12) 0%, transparent 42%)`
          }} />
       
          {/* Faint bg photo */}
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.06 }}
          />
          {/* Top line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${BLUE},transparent)` }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20" style={{ animation: 'fadeUp 0.6s ease both' }}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left */}
              <div className="space-y-5">
                <SectionLabel>Get In Touch</SectionLabel>
                <h1 className="font-display text-5xl md:text-6xl text-white leading-[1.05] tracking-tight">
                  Contact <span style={{ color: ORANGE }}>Our Team</span>
                </h1>
                <p className="text-slate-400 text-base leading-relaxed max-w-md">
                  Have questions? We're here to help. Reach out to our expert team and get a response within 24 hours.
                </p>
          
              </div>

            </div>
          </div>

          {/* Bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(249,115,22,0.35),transparent)' }} />
        </section>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-10">

          {/* ══════════════════════════════════════════════════════════════
              CONTACT CARDS ROW
          ══════════════════════════════════════════════════════════════ */}
          <div className="grid sm:grid-cols-3 gap-4">
            {contactCards.map(card => {
              const s = cardStyle(card.color)
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.target}
                  rel={card.target ? 'noopener noreferrer' : undefined}
                  className="contact-card flex items-center gap-4 p-5 rounded-2xl"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                  onMouseEnter={e => {
                    const h = cardStyle(card.color, true)
                    e.currentTarget.style.background = h.bg
                    e.currentTarget.style.borderColor = h.border
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = s.bg
                    e.currentTarget.style.borderColor = s.border
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.icon}20`, border: `1px solid ${s.icon}35` }}>
                    <span style={{ color: s.icon }}>{card.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">{card.label}</p>
                    <p className="text-sm font-semibold text-white leading-tight">{card.value}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{card.sub}</p>
                  </div>
                </a>
              )
            })}
          </div>

          {/* ══════════════════════════════════════════════════════════════
              MAIN GRID — form + info
          ══════════════════════════════════════════════════════════════ */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── LEFT: Info panel ─────────────────────────────────────── */}
            <div className="space-y-4">
              {/* Location + Hours card */}
              <div className="rounded-2xl p-6 space-y-5" style={{ background: '#334882ff', border: '1px solid rgba(37,99,235,0.12)' }}>
                <div>
                  <SectionLabel>Location</SectionLabel>
                  <h3 className="font-display text-xl text-white">Visit Our Store</h3>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
                    <MapPin className="w-4 h-4" style={{ color: BLUE }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{companyInfo.address}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{companyInfo.city}, {companyInfo.country}</p>
                  </div>
                </div>

                <div className="h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>
                      <Clock className="w-4 h-4" style={{ color: ORANGE }} />
                    </div>
                    <span className="text-sm font-semibold text-white">Business Hours</span>
                  </div>
                  <div className="space-y-2 pl-11">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Mon – Sat</span>
                      <span className="font-semibold text-white">8:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Sunday</span>
                      <span className="font-semibold" style={{ color: ORANGE }}>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

           
            </div>

            {/* ── RIGHT: Contact form ───────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl p-6 md:p-8 h-full" style={{ background: '#070f25', border: '1px solid rgba(37,99,235,0.12)' }}>
                <div className="mb-7">
                  <SectionLabel>Message Us</SectionLabel>
                  <h2 className="font-display text-3xl text-white tracking-tight">Send a Message</h2>
                  <p className="text-slate-500 text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>

                <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                        Your Name <span style={{ color: ORANGE }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="form-input"
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                        Email Address <span style={{ color: ORANGE }}>*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="form-input"
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="0712 345 678"
                        className="form-input"
                        value={formState.phone}
                        onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                        Subject <span style={{ color: ORANGE }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="How can we help?"
                        className="form-input"
                        value={formState.subject}
                        onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Message <span style={{ color: ORANGE }}>*</span>
                    </label>
                    <textarea
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="form-input resize-none"
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      required
                    />
                  </div>


                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-[11px] text-slate-600"><span style={{ color: ORANGE }}>*</span> Required fields</p>
                    <div className="flex gap-3 w-full sm:w-auto">
                      {/* WhatsApp shortcut */}
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border transition-all hover:scale-105"
                        style={{ border: '1px solid rgba(34,197,94,0.35)', background: 'rgba(34,197,94,0.08)', color: '#22c55e' }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                      {/* Submit */}
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 orange-glow"
                        style={{ background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})` }}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </>
  )
}