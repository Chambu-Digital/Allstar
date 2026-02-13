'use client'

import { Zap, Award, Shield, Truck, Target, Heart, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

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

  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '500+', label: 'Products Available' },
    { number: '50+', label: 'Brand Partners' },
    { number: '24/7', label: 'Customer Support' },
  ]

  const mission = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower individuals and businesses across Kenya with access to quality technology solutions that enhance productivity and connectivity.',
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'To be Kenya\'s most trusted technology partner, recognized for exceptional service, quality products, and customer satisfaction.',
    },
    {
      icon: TrendingUp,
      title: 'Our Commitment',
      description: 'We are committed to staying ahead of technology trends while maintaining competitive pricing and personalized service for every customer.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Enhanced Professional Style */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop" 
              alt="Team Collaboration"
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
              <br></br>
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-full text-blue-300 text-sm font-semibold tracking-wide uppercase">
                  About Us
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-white tracking-tight">
                About{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Allstar Tech
                </span>
              </h1>
              {/* <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
                Your trusted technology partner for computers, electronics, and innovative solutions
              </p> */}
              <br></br>
              {/* Stats Bar */}
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.number}</div>
                    <div className="text-xs md:text-sm text-orange-300 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-center md:text-left">
                Allstar Tech has grown to become a trusted technology partner in Kenya. We specialize in computers, laptops, and electronics, partnering with leading brands like Dell, HP, ASUS, Lenovo, Samsung, and more to bring you quality technology at competitive prices.
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 border-l-4 border-primary">
                <p className="italic">
                  "What sets us apart is our dedication to understanding each customer's unique needs. Whether you're a student, professional, or business owner, we provide personalized recommendations and ongoing support to ensure your technology investment serves you well."
                </p>
              </div>
              
              <p className="text-center md:text-left">
                Our team of technology experts stays current with the latest innovations, ensuring we can guide you toward the best solutions for your requirements and budget. From initial consultation to after-sales support, we're with you every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Commitment */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Drives Us</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {mission.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="bg-background rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Our Values - Enhanced */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Us
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                We've built our reputation on four core principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="group bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                    <div className="flex items-start gap-4">
                     
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

       

        {/* CTA - Enhanced */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Upgrade Your Tech?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers. Experience quality technology, expert service, and competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Browse Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-6 text-lg rounded-lg border-2 hover:bg-accent">
                  Get In Touch
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Need help choosing the right product? Our experts are here to help
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}