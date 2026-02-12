const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  image: String,
  icon: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

const techCategories = [
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
    icon: 'Wifi',
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
    icon: 'Database',
    isActive: true
  }
]

async function seedTechCategories() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local')
      process.exit(1)
    }

    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Check if categories already exist
    const existingCount = await Category.countDocuments()
    
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing categories`)
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })

      readline.question('Do you want to delete existing categories and reseed? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
          await Category.deleteMany({})
          console.log('🗑️  Deleted existing categories\n')
          await insertCategories()
        } else {
          console.log('ℹ️  Keeping existing categories. Adding only new ones...\n')
          await insertNewCategories()
        }
        
        readline.close()
        await mongoose.disconnect()
        process.exit(0)
      })
    } else {
      await insertCategories()
      await mongoose.disconnect()
      process.exit(0)
    }

  } catch (error) {
    console.error('❌ Error seeding categories:', error)
    await mongoose.disconnect()
    process.exit(1)
  }
}

async function insertCategories() {
  try {
    const createdCategories = await Category.insertMany(techCategories)
    console.log(`✅ Successfully created ${createdCategories.length} categories!\n`)
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📦 Categories Created:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    createdCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (${cat.slug})`)
    })
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    console.log('🌐 View categories at: http://localhost:3000/admin/categories')
    console.log('➕ Add products at: http://localhost:3000/admin/products\n')
  } catch (error) {
    if (error.code === 11000) {
      console.log('⚠️  Some categories already exist. Use the reseed option to replace them.')
    } else {
      throw error
    }
  }
}

async function insertNewCategories() {
  let addedCount = 0
  let skippedCount = 0
  
  for (const category of techCategories) {
    try {
      const existing = await Category.findOne({ slug: category.slug })
      if (!existing) {
        await Category.create(category)
        console.log(`✅ Added: ${category.name}`)
        addedCount++
      } else {
        console.log(`⏭️  Skipped: ${category.name} (already exists)`)
        skippedCount++
      }
    } catch (error) {
      console.log(`❌ Error adding ${category.name}:`, error.message)
    }
  }
  
  console.log(`\n📊 Summary:`)
  console.log(`   Added: ${addedCount}`)
  console.log(`   Skipped: ${skippedCount}`)
  console.log(`\n🌐 View categories at: http://localhost:3000/admin/categories\n`)
}

// Run the script
seedTechCategories()
