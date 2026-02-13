'use client'

import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { companyInfo, getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/company-info'
import { useState } from 'react'

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What are your delivery options?",
      answer: "We offer delivery across Kenya. Standard delivery takes 2-3 business days within Nairobi and 3-5 days for other regions. Express delivery options are available."
    },
    {
      question: "Do you offer installation and setup services?",
      answer: "Yes! We provide professional installation and setup services for computers, laptops, and other devices. Our technicians can visit your location or guide you remotely."
    },
    {
      question: "What warranty do your products come with?",
      answer: "All our products come with manufacturer warranties. The warranty period varies by product and brand, typically ranging from 1-3 years. We also offer extended warranty options."
    },
    {
      question: "Can I return or exchange a product?",
      answer: "Yes, we have a 7-day return policy for unopened items in original condition. For defective products, we offer exchanges or repairs under warranty terms."
    },
    {
      question: "Do you offer bulk or corporate pricing?",
      answer: "Absolutely! We offer special pricing for bulk orders and corporate clients. Contact us directly to discuss your requirements and get a custom quote."
    }
  ]

  const reasons = [
    { icon: CheckCircle, text: "Expert technical support" },
    { icon: CheckCircle, text: "Genuine products with warranty" },
    { icon: CheckCircle, text: "Competitive pricing" },
    { icon: CheckCircle, text: "Fast response time" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Hero Section - Enhanced Professional Style */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop" 
            alt="Customer Support"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          {/* Tech grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-full text-blue-300 text-sm font-semibold tracking-wide uppercase">
                Get In Touch
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-white tracking-tight">
              Contact{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Our Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
              Have questions? We're here to help. Reach out to our expert team today
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">24hrs</div>
                <div className="text-xs md:text-sm text-blue-300 font-medium">Response Time</div>
              </div>
             
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">99%</div>
                <div className="text-xs md:text-sm text-blue-300 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information - Enhanced */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-2">Contact Information</h2>
                <p className="text-sm text-muted-foreground mb-6">Choose your preferred way to reach us</p>
                
                <div className="space-y-4">
                  <a 
                    href={getPhoneLink()} 
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/20"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                      <p className="text-sm text-muted-foreground font-medium">{companyInfo.phone}</p>
                      <p className="text-xs text-muted-foreground mt-1">Mon-Sat: 8AM-6PM</p>
                    </div>
                  </a>

                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-all group border border-transparent hover:border-green-200 dark:hover:border-green-900"
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 dark:group-hover:bg-green-600 transition-all">
                      <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">Quick Support</p>
                      <p className="text-xs text-muted-foreground mt-1">Instant messaging</p>
                    </div>
                  </a>

                  <a 
                    href={getEmailLink()} 
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all group border border-transparent hover:border-orange-200 dark:hover:border-orange-900"
                  >
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 dark:group-hover:bg-orange-600 transition-all">
                      <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                      <p className="text-sm text-muted-foreground break-all">{companyInfo.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">Response within 24hrs</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {companyInfo.address}<br />
                        {companyInfo.city}, {companyInfo.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="flex justify-between">
                          <span>Mon - Sat:</span>
                          <span className="font-medium">8:00 AM - 6:00 PM</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Sunday:</span>
                          <span className="font-medium">Closed</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

           
            </div>

            {/* Contact Form - Enhanced */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Your Name <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full h-11"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full h-11"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      placeholder="0712345678" 
                      className="w-full h-11"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      type="text" 
                      placeholder="How can we help you?" 
                      className="w-full h-11"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..." 
                      rows={6}
                      className="w-full resize-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="text-destructive">*</span> Required fields
                    </p>
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>

            
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
