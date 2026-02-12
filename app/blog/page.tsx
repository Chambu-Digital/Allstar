import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { IBlogPost } from '@/models/BlogPost'
import { getBlogPosts } from '@/lib/blog-service'
import Breadcrumb from '@/components/breadcrumb'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Tech Blog | Allstar Tech - Computer Reviews & Tech Guides',
  description: 'Stay updated with the latest computer reviews, buying guides, tech tips, and product comparisons. Your trusted source for technology knowledge.',
  keywords: 'tech blog, computer reviews, laptop guides, PC building, gaming tech, technology news, hardware reviews'
}

async function fetchBlogPosts() {
  try {
    const data = await getBlogPosts({ published: true })
    return data.posts || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    // Return empty array to show featured content instead
    return []
  }
}

export default async function BlogPage() {
  let posts: IBlogPost[] = []
  
  try {
    posts = await fetchBlogPosts()
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    // Continue with empty posts array to show featured content
  }

  // Simplified featured content - only 4 posts
  const featuredContent = [
    {
      id: 1,
      title: "Ultimate Gaming PC Build Guide 2025",
      excerpt: "Build your dream gaming rig with our comprehensive component selection guide.",
      category: "PC Building",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600",
      date: "Feb 10, 2026",
      slug: "gaming-pc-build-guide"
    },
    {
      id: 2,
      title: "Best Laptops for Professionals",
      excerpt: "Top laptop picks for productivity, performance, and portability in 2026.",
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
      date: "Feb 8, 2026",
      slug: "best-professional-laptops"
    },
    {
      id: 3,
      title: "Monitor Buying Guide: 4K vs 1440p",
      excerpt: "Which resolution is right for your gaming and productivity needs?",
      category: "Monitors",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600",
      date: "Feb 5, 2026",
      slug: "monitor-resolution-guide"
    },
    {
      id: 4,
      title: "SSD vs HDD: Storage Comparison",
      excerpt: "Understanding the differences and choosing the right storage for your needs.",
      category: "Storage",
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600",
      date: "Feb 2, 2026",
      slug: "ssd-vs-hdd-comparison"
    }
  ]

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3">Tech Blog</h1>
            <p className="text-white/90">
              Computer reviews, buying guides, and technology insights
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        {posts.length === 0 ? (
          <div>
            {/* Featured Content */}
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Latest Articles</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {featuredContent.map((post) => (
                <article key={post.id} className="bg-card rounded-lg overflow-hidden hover:shadow-md transition-shadow group border">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="p-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <time>{post.date}</time>
                      <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="font-semibold text-sm text-card-foreground mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-teal-600 hover:text-orange-500 font-medium transition-colors text-xs">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Compact Newsletter */}
            <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-lg p-4 text-center border border-teal-100">
              <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                Get the latest tech news and exclusive deals
              </p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-teal-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-orange-500 hover:to-orange-600 text-white px-4 py-2 rounded font-medium transition-all text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`}>
                <article className="bg-card rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group border">
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  
                  <div className="p-3">
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      <time dateTime={post.publishedAt?.toString()}>
                        {post.publishedAt 
                          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })
                          : new Date(post.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })
                        }
                      </time>
                    </div>

                    <h2 className="font-semibold text-sm text-card-foreground mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">{post.excerpt}</p>

                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-teal-100 text-teal-700"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="inline-flex items-center text-teal-600 hover:text-orange-500 font-medium transition-colors text-xs">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}