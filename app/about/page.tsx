'use client'

import { Zap, Award, Shield, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/breadcrumb'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { companyInfo } from '@/lib/company-info'

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: 'Latest Technology',
      description: 'We offer cutting-edge computers, electronics, and accessories with the latest features and innovations.',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'All our products come with manufacturer warranties and our commitment to quality service.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across Kenya with professional setup services available.',
    },
    {
      icon: Award,
      title: 'Expert Support',
      description: 'Our knowledgeable team provides expert advice and technical support for all products.',
    },
  ]

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="py-4 px-4 md:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 px-4 md:px-8 bg-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About <span className="font-black uppercase tracking-wide">ALLSTAR TECH</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              Your trusted technology partner for computers, electronics, and innovative solutions. We bring you cutting-edge technology with exceptional service and competitive prices.
            </p>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Allstar Tech has grown to become a trusted technology partner in Kenya. We specialize in computers, laptops, and electronics, partnering with leading brands like Dell, HP, ASUS, Lenovo, Samsung, and more to bring you quality technology at competitive prices.
            </p>
 
          </div>
        </section>

        {/* Store Information & Contact */}
        <section className="py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Visit Our Store
            </h2>
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">Location & Contact</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Phone: {companyInfo.phone}</p>
                    <p>Email: {companyInfo.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">Business Hours</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Mon-Sat: 8:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-8 md:py-12 px-4 md:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Why Choose Us
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                return (
                  <div key={index} className="bg-card rounded-lg p-6 border border-border">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 md:py-12 px-4 md:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Shop?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied customers. Quality technology, expert service, competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                  Shop Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-6 py-3">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
