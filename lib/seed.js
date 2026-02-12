const mongoose = require('mongoose')

// MongoDB connection
async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return
    }
    
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }
    
    // Clean up the URI to handle potential parsing issues
    const cleanUri = mongoUri.replace('?appName=Serenleaf', '?appName=Serenleaf&retryWrites=true&w=majority')
    
    await mongoose.connect(cleanUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  image: String,
  icon: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

// Product Schema
const variantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, min: 0 },
  wholesalePrice: { type: Number, min: 0 },
  wholesaleThreshold: { type: Number, min: 1 },
  image: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  sku: { type: String, required: true },
  isActive: { type: Boolean, default: true }
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  hasVariants: { type: Boolean, default: false },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, min: 0 },
  wholesalePrice: { type: Number, min: 0 },
  wholesaleThreshold: { type: Number, min: 1 },
  images: [String],
  variants: [variantSchema],
  category: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0, min: 0 },
  isBestseller: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isFlashDeal: { type: Boolean, default: false },
  flashDealDiscount: { type: Number, min: 0, max: 100 },
  isNewProduct: { type: Boolean, default: false },
  ingredients: String,
  usage: String,
  benefits: [String],
  tags: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)
const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

const categories = [
  {
    name: 'Laptops',
    slug: 'laptops',
    description: 'High-performance laptops for work, gaming, and creativity. From ultrabooks to gaming powerhouses.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    icon: 'Laptop',
    isActive: true
  },
  {
    name: 'Desktop Computers',
    slug: 'desktop-computers',
    description: 'Powerful desktop PCs, workstations, and all-in-one computers for professionals and gamers.',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800',
    icon: 'Monitor',
    isActive: true
  },
  {
    name: 'Computer Components',
    slug: 'computer-components',
    description: 'CPUs, GPUs, RAM, motherboards, storage drives, and components for building or upgrading PCs.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
    icon: 'Cpu',
    isActive: true
  },
  {
    name: 'Monitors & Displays',
    slug: 'monitors-displays',
    description: 'High-resolution monitors, gaming displays, and professional screens for every need.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    icon: 'Monitor',
    isActive: true
  },
  {
    name: 'Peripherals',
    slug: 'peripherals',
    description: 'Keyboards, mice, webcams, and essential computer peripherals for productivity.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
    icon: 'Keyboard',
    isActive: true
  },
  {
    name: 'Networking',
    slug: 'networking',
    description: 'Routers, switches, network adapters, and connectivity solutions for home and office.',
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800',
    icon: 'Wifi',
    isActive: true
  },
  {
    name: 'Storage Solutions',
    slug: 'storage-solutions',
    description: 'External hard drives, SSDs, NAS systems, and backup solutions for data storage.',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800',
    icon: 'HardDrive',
    isActive: true
  },
  {
    name: 'Printers & Scanners',
    slug: 'printers-scanners',
    description: 'Inkjet, laser printers, multifunction devices, and document scanners for office use.',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800',
    icon: 'Printer',
    isActive: true
  },
  {
    name: 'Audio & Headphones',
    slug: 'audio-headphones',
    description: 'Premium headphones, speakers, and audio equipment for music and gaming.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    icon: 'Headphones',
    isActive: true
  },
  {
    name: 'Mobile & Tablets',
    slug: 'mobile-tablets',
    description: 'Latest smartphones, tablets, and mobile accessories from top brands.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    icon: 'Smartphone',
    isActive: true
  },
  {
    name: 'Gaming',
    slug: 'gaming',
    description: 'Gaming consoles, controllers, VR headsets, and gaming accessories.',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800',
    icon: 'Gamepad2',
    isActive: true
  },
  {
    name: 'Smart Home & IoT',
    slug: 'smart-home-iot',
    description: 'Smart home devices, security cameras, and IoT products for connected living.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    icon: 'Home',
    isActive: true
  },
  {
    name: 'Cables & Adapters',
    slug: 'cables-adapters',
    description: 'USB cables, HDMI cables, adapters, and connectivity accessories.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
    icon: 'Cable',
    isActive: true
  },
  {
    name: 'Power & UPS',
    slug: 'power-ups',
    description: 'UPS systems, power banks, surge protectors, and power management solutions.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800',
    icon: 'Battery',
    isActive: true
  },
  {
    name: 'Software & Licenses',
    slug: 'software-licenses',
    description: 'Operating systems, productivity software, antivirus, and software licenses.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
    icon: 'Code',
    isActive: true
  }
]

const products = [
  // Dell Laptop Collection
  {
    name: 'Dell XPS 13 Laptop',
    slug: 'dell-xps-13-laptop',
    description: 'Premium ultrabook with stunning InfinityEdge display, powerful Intel processors, and all-day battery life. Perfect for professionals and creators.',
    hasVariants: true,
    price: 0,
    images: [],
    variants: [
      {
        id: 'variant-xps-i5-8gb',
        type: 'config',
        value: 'i5 / 8GB / 256GB SSD',
        price: 89999,
        oldPrice: 99999,
        wholesalePrice: 85999,
        wholesaleThreshold: 5,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        stock: 12,
        sku: 'DELL-XPS13-I5-8-256',
        isActive: true
      },
      {
        id: 'variant-xps-i7-16gb',
        type: 'config',
        value: 'i7 / 16GB / 512GB SSD',
        price: 129999,
        oldPrice: 145999,
        wholesalePrice: 124999,
        wholesaleThreshold: 3,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        stock: 8,
        sku: 'DELL-XPS13-I7-16-512',
        isActive: true
      },
      {
        id: 'variant-xps-i7-32gb',
        type: 'config',
        value: 'i7 / 32GB / 1TB SSD',
        price: 169999,
        oldPrice: 189999,
        wholesalePrice: 164999,
        wholesaleThreshold: 2,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        stock: 5,
        sku: 'DELL-XPS13-I7-32-1TB',
        isActive: true
      }
    ],
    category: 'Laptops',
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviews: 142,
    isBestseller: true,
    isFeatured: true,
    ingredients: '13.4" FHD+ Display, Intel Core Processors, Thunderbolt 4, Windows 11 Pro',
    usage: 'Ideal for business, content creation, and everyday computing. Lightweight and portable.',
    benefits: [
      'Stunning InfinityEdge display',
      'All-day battery life up to 12 hours',
      'Premium aluminum chassis',
      'Thunderbolt 4 connectivity',
      'Windows Hello facial recognition'
    ],
    tags: ['laptop', 'dell', 'ultrabook', 'business', 'variants'],
    isActive: true
  },
  
  // Gaming Laptop
  {
    name: 'ASUS ROG Gaming Laptop',
    slug: 'asus-rog-gaming-laptop',
    description: 'High-performance gaming laptop with NVIDIA RTX graphics, high refresh rate display, and advanced cooling system.',
    hasVariants: true,
    price: 0,
    images: [],
    variants: [
      {
        id: 'variant-rog-rtx3050',
        type: 'config',
        value: 'RTX 3050 / 16GB / 512GB',
        price: 119999,
        oldPrice: 134999,
        wholesalePrice: 114999,
        wholesaleThreshold: 3,
        image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=500',
        stock: 10,
        sku: 'ASUS-ROG-3050-16-512',
        isActive: true
      },
      {
        id: 'variant-rog-rtx4060',
        type: 'config',
        value: 'RTX 4060 / 16GB / 1TB',
        price: 159999,
        oldPrice: 179999,
        wholesalePrice: 154999,
        wholesaleThreshold: 2,
        image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=500',
        stock: 6,
        sku: 'ASUS-ROG-4060-16-1TB',
        isActive: true
      }
    ],
    category: 'Laptops',
    inStock: true,
    stockQuantity: 16,
    rating: 4.7,
    reviews: 98,
    isNewProduct: true,
    isFeatured: true,
    ingredients: '15.6" 144Hz Display, NVIDIA RTX Graphics, RGB Keyboard, Advanced Cooling',
    usage: 'Perfect for gaming, 3D rendering, and demanding applications.',
    benefits: ['High refresh rate display', 'Powerful RTX graphics', 'RGB mechanical keyboard', 'Advanced cooling system'],
    tags: ['gaming', 'laptop', 'asus', 'rtx', 'high-performance']
  },

  // Desktop PC
  {
    name: 'HP EliteDesk Desktop PC',
    slug: 'hp-elitedesk-desktop-pc',
    description: 'Professional desktop computer for business and productivity. Reliable, secure, and powerful.',
    hasVariants: false,
    price: 74999,
    oldPrice: 84999,
    wholesalePrice: 69999,
    wholesaleThreshold: 5,
    images: ['https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500'],
    variants: [],
    category: 'Desktop Computers',
    inStock: true,
    stockQuantity: 15,
    rating: 4.6,
    reviews: 67,
    ingredients: 'Intel Core i5, 16GB RAM, 512GB SSD, Windows 11 Pro',
    usage: 'Ideal for office work, multitasking, and business applications.',
    benefits: ['Business-grade reliability', 'Easy to upgrade', 'Multiple USB ports', 'Energy efficient'],
    tags: ['desktop', 'hp', 'business', 'office'],
    isActive: true
  },

  // Monitor
  {
    name: 'LG UltraWide Monitor 34"',
    slug: 'lg-ultrawide-monitor-34',
    description: 'Immersive 34-inch ultrawide monitor with QHD resolution, perfect for productivity and entertainment.',
    hasVariants: false,
    price: 45999,
    oldPrice: 54999,
    wholesalePrice: 42999,
    wholesaleThreshold: 4,
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'],
    variants: [],
    category: 'Monitors & Displays',
    inStock: true,
    stockQuantity: 20,
    rating: 4.8,
    reviews: 134,
    isBestseller: true,
    ingredients: '34" QHD (3440x1440), IPS Panel, HDR10, USB-C',
    usage: 'Perfect for multitasking, content creation, and immersive gaming.',
    benefits: ['Ultra-wide screen real estate', 'Stunning color accuracy', 'USB-C connectivity', 'HDR support'],
    tags: ['monitor', 'lg', 'ultrawide', 'productivity'],
    isActive: true
  },

  // Mechanical Keyboard
  {
    name: 'Logitech MX Mechanical Keyboard',
    slug: 'logitech-mx-mechanical-keyboard',
    description: 'Premium wireless mechanical keyboard with tactile switches and multi-device connectivity.',
    hasVariants: true,
    price: 0,
    images: [],
    variants: [
      {
        id: 'variant-mx-clicky',
        type: 'switch',
        value: 'Clicky Switches',
        price: 16999,
        oldPrice: 19999,
        wholesalePrice: 15499,
        wholesaleThreshold: 10,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        stock: 25,
        sku: 'LOG-MX-CLICKY',
        isActive: true
      },
      {
        id: 'variant-mx-tactile',
        type: 'switch',
        value: 'Tactile Switches',
        price: 16999,
        oldPrice: 19999,
        wholesalePrice: 15499,
        wholesaleThreshold: 10,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        stock: 30,
        sku: 'LOG-MX-TACTILE',
        isActive: true
      }
    ],
    category: 'Peripherals',
    inStock: true,
    stockQuantity: 55,
    rating: 4.7,
    reviews: 89,
    isFlashDeal: true,
    flashDealDiscount: 15,
    ingredients: 'Mechanical Switches, Wireless Bluetooth, Backlit Keys, Multi-Device',
    usage: 'Connect up to 3 devices and switch seamlessly. Perfect for typing and productivity.',
    benefits: ['Premium mechanical switches', 'Multi-device connectivity', 'Long battery life', 'Backlit keys'],
    tags: ['keyboard', 'logitech', 'mechanical', 'wireless'],
    isActive: true
  },

  // External SSD
  {
    name: 'Samsung T7 Portable SSD',
    slug: 'samsung-t7-portable-ssd',
    description: 'Ultra-fast portable SSD with USB 3.2 Gen 2 speeds up to 1050MB/s. Compact and durable.',
    hasVariants: true,
    price: 0,
    images: [],
    variants: [
      {
        id: 'variant-t7-500gb',
        type: 'capacity',
        value: '500GB',
        price: 8999,
        oldPrice: 11999,
        wholesalePrice: 7999,
        wholesaleThreshold: 15,
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
        stock: 40,
        sku: 'SAM-T7-500GB',
        isActive: true
      },
      {
        id: 'variant-t7-1tb',
        type: 'capacity',
        value: '1TB',
        price: 14999,
        oldPrice: 18999,
        wholesalePrice: 13499,
        wholesaleThreshold: 10,
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
        stock: 35,
        sku: 'SAM-T7-1TB',
        isActive: true
      },
      {
        id: 'variant-t7-2tb',
        type: 'capacity',
        value: '2TB',
        price: 27999,
        oldPrice: 32999,
        wholesalePrice: 25999,
        wholesaleThreshold: 5,
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
        stock: 20,
        sku: 'SAM-T7-2TB',
        isActive: true
      }
    ],
    category: 'Storage Solutions',
    inStock: true,
    stockQuantity: 95,
    rating: 4.9,
    reviews: 256,
    isBestseller: true,
    isFlashDeal: true,
    flashDealDiscount: 25,
    ingredients: 'NVMe SSD, USB 3.2 Gen 2, AES 256-bit Encryption, Shock Resistant',
    usage: 'Plug and play storage for backups, file transfers, and portable storage.',
    benefits: ['Lightning-fast speeds', 'Compact and portable', 'Hardware encryption', 'Durable metal body'],
    tags: ['ssd', 'samsung', 'storage', 'portable', 'fast'],
    isActive: true
  }
]

async function seedDatabase() {
  try {
    await connectDB()
    
    // Clear existing data
    await Category.deleteMany({})
    await Product.deleteMany({})
    
    console.log('Cleared existing data')
    
    // Seed categories
    const createdCategories = await Category.insertMany(categories)
    console.log(`Seeded ${createdCategories.length} categories`)
    
    // Create a map of category names to IDs
    const categoryMap = new Map()
    createdCategories.forEach(cat => {
      categoryMap.set(cat.name, cat._id)
    })
    
    // Add categoryId to products and ensure isActive is true
    const productsWithCategoryId = products.map(product => ({
      ...product,
      categoryId: categoryMap.get(product.category),
      isActive: true
    }))
    
    // Seed products
    const createdProducts = await Product.insertMany(productsWithCategoryId)
    console.log(`Seeded ${createdProducts.length} products`)
    
    console.log('Database seeded successfully!')
    return { success: true, categories: createdCategories.length, products: createdProducts.length || 0 }
    
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

module.exports = { seedDatabase }