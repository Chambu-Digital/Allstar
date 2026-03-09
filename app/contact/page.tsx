'use client'

import {
  Mail, Phone, MapPin, Clock, MessageCircle,
  Send, CheckCircle, ChevronDown, ArrowRight,
  Sparkles, Star, Zap, Shield, Users
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { companyInfo, getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/company-info'
import { useState } from 'react'

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  orange:     '#f97316',
  orangeDark: '#ea580c',
  orangePale: '#fff7ed',
  orangeMid:  '#fed7aa',
  white:      '#ffffff',
  offWhite:   '#fafaf9',
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
function SectionTag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-2">
      <span style={{ display:'block', width:28, height:2.5, borderRadius:2, background: T.orange }} />
      <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color: T.orange, fontFamily:"'Outfit',sans-serif" }}>
        {children}
      </span>
    </div>
  )
}

function FormInput({
  label, required, type = 'text', placeholder, value, onChange, rows
}: {
  label: string; required?: boolean; type?: string; placeholder?: string
  value: string; onChange: (v: string) => void; rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const base: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 12, fontSize: 14,
    background: focused ? T.white : T.offWhite,
    border: `1.5px solid ${focused ? T.orange : T.stone200}`,
    boxShadow: focused ? '0 0 0 3px rgba(249,115,22,0.1)' : 'none',
    color: T.stone900, outline: 'none', transition: 'all 0.2s',
    resize: rows ? 'none' as const : undefined,
    fontFamily: "'Outfit', sans-serif",
  }
  return (
    <div>
      <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: T.stone500 }}>
        {label} {required && <span style={{ color: T.orange }}>*</span>}
      </label>
      {rows ? (
        <textarea
          rows={rows} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={base}
        />
      ) : (
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={base}
        />
      )}
    </div>
  )
}

function FaqItem({ q, a, open, onToggle }: { q:string; a:string; open:boolean; onToggle:()=>void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: open ? T.orangePale : T.white,
        border: `1.5px solid ${open ? T.orange : hovered ? T.orangeMid : T.stone200}`,
        boxShadow: open ? '0 4px 20px rgba(249,115,22,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150"
      >
        <span className="text-sm font-bold pr-4" style={{ color: open ? T.orange : T.stone900 }}>{q}</span>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
          style={{ color: open ? T.orange : T.stone400, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && (
        <div className="px-5 pb-5" style={{ animation:'slideDown 0.25s ease both', borderTop:`1px solid ${T.orangeMid}` }}>
          <p className="text-sm leading-relaxed pt-4" style={{ color: T.stone600 }}>{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [submitted,   setSubmitted]   = useState(false)
  const [submitting,  setSubmitting]  = useState(false)
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const set = (k: keyof typeof form) => (v: string) => setForm(s => ({ ...s, [k]: v }))

  const faqs = [
    { q: "What are your delivery options?",              a: "We offer delivery across Kenya. Standard delivery takes 2–3 business days within Nairobi and 3–5 days for other regions. Express same-day delivery is available within Nairobi." },
    { q: "Do you offer installation and setup services?", a: "Yes! We provide professional installation and setup for computers, laptops, and other devices. Our technicians can visit your location or guide you remotely." },
    { q: "What warranty do your products come with?",    a: "All products carry manufacturer warranties, typically 1–3 years. Extended warranty options are also available on request." },
    { q: "Can I return or exchange a product?",          a: "We have a 7-day return policy for unopened items in original condition. Defective products are exchanged or repaired under warranty." },
    { q: "Do you offer bulk or corporate pricing?",      a: "Absolutely! We offer special pricing for bulk and corporate orders. Contact us directly for a custom quote tailored to your requirements." },
  ]

  const contactCards = [
    { href: getPhoneLink(),    icon: <Phone          className="w-5 h-5" />, label:'Call Us',   value: companyInfo.phone,  sub: 'Mon–Sat: 8AM–6PM',       color: T.orange,  bg: T.orangePale, border: T.orangeMid, target: undefined   },
    { href: getWhatsAppLink(), icon: <MessageCircle  className="w-5 h-5" />, label:'WhatsApp',  value: 'Chat Instantly',   sub: 'Typically replies in mins', color: T.green,   bg: T.greenPale,  border: T.greenMid,  target: '_blank'    },
    { href: getEmailLink(),    icon: <Mail           className="w-5 h-5" />, label:'Email Us',  value: companyInfo.email,  sub: 'Response within 24hrs',  color: T.orange,  bg: T.orangePale, border: T.orangeMid, target: undefined   },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif !important; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown{ from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn    { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        .orange-glow  { box-shadow: 0 4px 24px rgba(249,115,22,0.4); }
        .orange-glow:hover { box-shadow: 0 6px 32px rgba(249,115,22,0.5); }
        .green-glow   { box-shadow: 0 4px 24px rgba(22,163,74,0.35); }
      `}</style>

      <div className="flex flex-col min-h-screen" style={{ background: T.offWhite }}>
        <Header />

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" style={{ background: T.stone900, minHeight: 320 }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:`radial-gradient(ellipse at 12% 60%, rgba(249,115,22,0.18) 0%, transparent 50%),
                             radial-gradient(ellipse at 88% 25%, rgba(249,115,22,0.10) 0%, transparent 45%)`
          }} />
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop" alt=""
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity:0.05, mixBlendMode:'luminosity' }} />
          <div className="absolute top-0 inset-x-0 h-0.5" style={{ background:`linear-gradient(90deg,transparent,${T.orange},transparent)` }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" style={{ animation:'fadeUp 0.6s ease both' }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left */}
              <div className="space-y-6">
                <SectionTag>Get In Touch</SectionTag>
                <h1 className="font-display text-5xl md:text-6xl text-white leading-[1.04] tracking-tight">
                  Contact <span style={{ color: T.orange }}>Our Team</span>
                </h1>
                <p className="text-base leading-relaxed max-w-md" style={{ color: T.stone400 }}>
                  Have questions? We're here to help. Reach out to our expert team and get a response within 24 hours.
                </p>
                {/* <div className="flex flex-wrap gap-3 pt-1">
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 green-glow"
                    style={{ background:`linear-gradient(135deg, ${T.greenDark}, ${T.green})` }}>
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                  <a href={getPhoneLink()}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                    style={{ color: T.orange, border:`1.5px solid rgba(249,115,22,0.4)`, background:'rgba(249,115,22,0.08)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(249,115,22,0.16)'; (e.currentTarget as HTMLElement).style.borderColor=T.orange }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(249,115,22,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(249,115,22,0.4)' }}>
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                </div> */}
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-0.5" style={{ background:`linear-gradient(90deg,transparent,rgba(249,115,22,0.45),transparent)` }} />
        </section>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-10">

          {/* ══════════════════════════════════════════════════════
              CONTACT CARDS ROW
          ══════════════════════════════════════════════════════ */}
          <div className="grid sm:grid-cols-3 gap-4" style={{ animation:'fadeUp 0.5s ease both' }}>
            {contactCards.map((card, i) => (
              <a key={card.label} href={card.href} target={card.target}
                rel={card.target ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: card.bg, border:`1.5px solid ${card.border}`,
                  boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
                  animationDelay:`${i*80}ms`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow=`0 8px 28px rgba(0,0,0,0.1)`; (e.currentTarget as HTMLElement).style.borderColor=card.color }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 2px 12px rgba(0,0,0,0.05)'; (e.currentTarget as HTMLElement).style.borderColor=card.border }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ background:`${card.color}20`, color:card.color }}>
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase mb-0.5" style={{ color:T.stone400, letterSpacing: '0.12em' }}>{card.label}</p>
                  <p className="text-sm font-bold truncate" style={{ color:T.stone900 }}>{card.value}</p>
                  <p className="text-[11px] mt-0.5" style={{ color:T.stone400 }}>{card.sub}</p>
                </div>
              </a>
            ))}
          </div>

          {/* ══════════════════════════════════════════════════════
              MAIN GRID — form + info sidebar
          ══════════════════════════════════════════════════════ */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── LEFT SIDEBAR ────────────────────────────────── */}
            <div className="space-y-5">

              {/* Location + Hours */}
              <div className="rounded-2xl overflow-hidden" style={{ background:T.white, border:`1.5px solid ${T.stone200}`, boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
                {/* Map placeholder */}
                <div className="relative h-40 overflow-hidden" style={{ background:T.stone100 }}>
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=200&fit=crop" alt="Map"
                    className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ background:T.orange }}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-12" style={{ background:`linear-gradient(to top, ${T.white}, transparent)` }} />
                </div>

                <div className="p-5 space-y-5">
                  <div>
                    <SectionTag>Location</SectionTag>
                    <h3 className="font-display text-lg font-black" style={{ color:T.stone900 }}>Visit Our Store</h3>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background:T.orangePale, color:T.orange }}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color:T.stone900 }}>{companyInfo.address}</p>
                      <p className="text-xs mt-0.5" style={{ color:T.stone400 }}>{companyInfo.city}, {companyInfo.country}</p>
                    </div>
                  </div>

                  <div className="h-px" style={{ background:T.stone100 }} />

                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background:T.orangePale, color:T.orange }}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold" style={{ color:T.stone900 }}>Business Hours</span>
                    </div>
                    <div className="space-y-2 pl-11">
                      {[
                        { day:'Monday – Friday', hrs:'8:00 AM – 6:00 PM', open:true },
                        { day:'Saturday',        hrs:'9:00 AM – 4:00 PM', open:true },
                        { day:'Sunday',          hrs:'Closed',             open:false },
                      ].map(r => (
                        <div key={r.day} className="flex items-center justify-between">
                          <span className="text-xs" style={{ color:T.stone500 }}>{r.day}</span>
                          <span className="text-xs font-bold" style={{ color:r.open ? T.stone800 : T.orange }}>{r.hrs}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

      
            </div>

            {/* ── CONTACT FORM ────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl h-full" style={{ background:T.white, border:`1.5px solid ${T.stone200}`, boxShadow:'0 2px 12px rgba(0,0,0,0.05)', overflow:'hidden' }}>

                {/* Form header */}
                <div className="px-6 md:px-8 pt-7 pb-6" style={{ borderBottom:`1.5px solid ${T.stone100}` }}>
                  <SectionTag>Message Us</SectionTag>
                  <h2 className="font-display text-3xl font-black tracking-tight" style={{ color:T.stone900 }}>Send a Message</h2>
                  <p className="text-sm mt-1" style={{ color:T.stone400 }}>Fill in the form below we'll get back to you within 24 hours.</p>
                </div>

                {submitted ? (
                  /* ── Success state ── */
                  <div className="flex flex-col items-center justify-center px-8 py-20 text-center space-y-5" style={{ animation:'popIn 0.4s ease both' }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background:T.greenPale, border:`2px solid ${T.greenMid}` }}>
                      <CheckCircle className="w-8 h-8" style={{ color:T.green }} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-black mb-2" style={{ color:T.stone900 }}>Message Sent!</h3>
                      <p className="text-sm leading-relaxed max-w-sm" style={{ color:T.stone500 }}>
                        Thank you for reaching out. Our team will review your message and respond within 24 hours.
                      </p>
                    </div>
                    <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', subject:'', message:'' }) }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 orange-glow"
                      style={{ background:`linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleSubmit} className="px-6 md:px-8 py-7 space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput label="Your Name"     required placeholder="John Doe"          value={form.name}    onChange={set('name')} />
                      <FormInput label="Email Address" required type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput label="Phone Number" type="tel" placeholder="0712 345 678" value={form.phone}   onChange={set('phone')} />
                      <FormInput label="Subject"      required   placeholder="How can we help?" value={form.subject} onChange={set('subject')} />
                    </div>
                    <FormInput label="Message" required placeholder="Tell us more about your inquiry…" value={form.message} onChange={set('message')} rows={6} />


                    {/* Form footer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2"
                      style={{ borderTop:`1.5px solid ${T.stone100}` }}>
                      <p className="text-[11px]" style={{ color:T.stone400 }}>
                        <span style={{ color:T.orange }}>*</span> Required fields. We respect your privacy.
                      </p>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 green-glow"
                          style={{ background:`linear-gradient(135deg, ${T.greenDark}, ${T.green})`, color:T.white }}>
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                        <button type="submit" disabled={submitting}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed orange-glow"
                          style={{ background:`linear-gradient(135deg, ${T.orangeDark}, ${T.orange})` }}>
                          {submitting ? (
                            <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>Sending…</>
                          ) : (
                            <><Send className="w-4 h-4" /> Send Message</>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

        
        

        

        </main>

        <Footer />
      </div>
    </>
  )
}