const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: String,
  role: { 
    type: String, 
    enum: ['customer', 'admin', 'super_admin'], 
    default: 'customer' 
  },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  permissions: {
    products: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    categories: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    orders: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    customers: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    admins: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    settings: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    reports: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    }
  }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function createSuperAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local')
      console.log('\n📝 Please add your MongoDB connection string to .env.local:')
      console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/allstartech')
      process.exit(1)
    }

    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ 
      email: 'admin@allstartech.co.ke',
      role: 'super_admin'
    })

    if (existingAdmin) {
      console.log('⚠️  Super admin already exists!')
      console.log('\n📧 Email: admin@allstartech.co.ke')
      console.log('🔑 If you forgot the password, delete this user from the database and run this script again.\n')
      
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })

      readline.question('Do you want to reset the password? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
          const salt = await bcrypt.genSalt(12)
          const hashedPassword = await bcrypt.hash('admin123', salt)
          
          await User.updateOne(
            { email: 'admin@allstartech.co.ke' },
            { password: hashedPassword }
          )
          
          console.log('\n✅ Password reset successfully!')
          console.log('📧 Email: admin@allstartech.co.ke')
          console.log('🔑 Password: admin123')
          console.log('\n⚠️  IMPORTANT: Change this password after logging in!\n')
        }
        
        readline.close()
        await mongoose.disconnect()
        process.exit(0)
      })
      
      return
    }

    // Hash password
    console.log('🔐 Hashing password...')
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash('admin123', salt)

    // Create super admin with full permissions
    const superAdmin = new User({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@allstartech.co.ke',
      password: hashedPassword,
      phone: '+254713065412',
      role: 'super_admin',
      isActive: true,
      isEmailVerified: true,
      permissions: {
        products: { view: true, create: true, edit: true, delete: true },
        categories: { view: true, create: true, edit: true, delete: true },
        orders: { view: true, create: true, edit: true, delete: true },
        customers: { view: true, create: true, edit: true, delete: true },
        admins: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: true }
      }
    })

    await superAdmin.save()

    console.log('✅ Super admin created successfully!\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email:    admin@allstartech.co.ke')
    console.log('🔑 Password: admin123')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('🌐 Login at: http://localhost:3000/admin/login\n')
    console.log('⚠️  IMPORTANT: Change this password immediately after logging in!\n')

    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
    process.exit(0)

  } catch (error) {
    console.error('❌ Error creating super admin:', error)
    
    if (error.code === 11000) {
      console.log('\n⚠️  A user with this email already exists.')
      console.log('Please check your database or use a different email.\n')
    }
    
    await mongoose.disconnect()
    process.exit(1)
  }
}

// Run the script
createSuperAdmin()
