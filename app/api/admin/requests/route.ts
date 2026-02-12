import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AdminRequest from '@/models/AdminRequest'
import { requireAuth } from '@/lib/auth'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const adminRequestSchema = z.object({
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().optional() // Accept but ignore confirmPassword
}).transform(({ confirmPassword, ...rest }) => rest) // Remove confirmPassword from the data

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received admin request:', { ...body, password: '[REDACTED]' })
    
    // Validate input
    const validatedData = adminRequestSchema.parse(body)
    console.log('Validated data:', { ...validatedData, password: '[REDACTED]' })
    
    await connectDB()
    console.log('Database connected')
    
    // Check if request already exists for this email
    const existingRequest = await AdminRequest.findOne({ email: validatedData.email })
    if (existingRequest) {
      console.log('Duplicate request found for email:', validatedData.email)
      return NextResponse.json(
        { error: 'A request with this email already exists' },
        { status: 400 }
      )
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(validatedData.password, salt)
    console.log('Password hashed successfully')
    
    // Create admin request
    const adminRequest = new AdminRequest({
      ...validatedData,
      password: hashedPassword
    })
    
    await adminRequest.save()
    console.log('Admin request saved successfully:', adminRequest._id)
    
    return NextResponse.json({
      message: 'Admin request submitted successfully',
      requestId: adminRequest._id
    }, { status: 201 })
    
  } catch (error: any) {
    console.error('Admin request error:', error)
    console.error('Error stack:', error.stack)
    
    if (error.name === 'ZodError') {
      console.error('Validation errors:', error.errors)
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A request with this email already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to submit admin request', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    
    // Only super admins can view admin requests
    if (user.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Super admin access required' },
        { status: 403 }
      )
    }
    
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'
    
    const requests = await AdminRequest.find({ status })
      .select('-password') // Don't return password hashes
      .sort({ requestedAt: -1 })
      .lean()
    
    return NextResponse.json({
      requests
    })
    
  } catch (error: any) {
    console.error('Error fetching admin requests:', error)
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch admin requests' },
      { status: 500 }
    )
  }
}
