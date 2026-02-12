'use client'

import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/breadcrumb'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { companyInfo, getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/company-info'

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Get In Touch</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our team today.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <a 
                    href={getPhoneLink()} 
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-teal-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                      <Phone className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-sm text-gray-600">{companyInfo.phone}</p>
                      <p className="text-xs text-gray-500 mt-1">Mon-Sat: 8AM-6PM</p>
                    </div>
                  </a>

                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-sm text-gray-600">Quick Support</p>
                      <p className="text-xs text-gray-500 mt-1">Instant messaging</p>
                    </div>
                  </a>

                  <a 
                    href={getEmailLink()} 
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-orange-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                      <Mail className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-sm text-gray-600">{companyInfo.email}</p>
                      <p className="text-xs text-gray-500 mt-1">We'll respond within 24hrs</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {companyInfo.address}<br />
                        {companyInfo.city}, {companyInfo.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-sm text-gray-600">
                        Mon-Sat: 8:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full border-2 border-gray-200 focus:border-teal-500 rounded-lg py-3"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full border-2 border-gray-200 focus:border-teal-500 rounded-lg py-3"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      placeholder="0712345678" 
                      className="w-full border-2 border-gray-200 focus:border-teal-500 rounded-lg py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input 
                      type="text" 
                      placeholder="How can we help you?" 
                      className="w-full border-2 border-gray-200 focus:border-teal-500 rounded-lg py-3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..." 
                      rows={6}
                      className="w-full border-2 border-gray-200 focus:border-teal-500 rounded-lg resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
