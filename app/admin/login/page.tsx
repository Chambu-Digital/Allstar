'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react'
import { useUserStore } from '@/lib/user-store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SimpleResetModal from '@/components/admin/simple-reset-modal'

const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

type AdminLoginForm = z.infer<typeof adminLoginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const { login, user, isLoading } = useUserStore()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [showSimpleReset, setShowSimpleReset] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema)
  })

  // Redirect if already logged in as admin or super_admin
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'super_admin')) {
      router.push('/admin')
    } else if (user && user.role === 'customer') {
      setError('Access denied. Admin privileges required.')
    }
  }, [user, router])

  const onSubmit = async (data: AdminLoginForm) => {
    setError('')
    
    const result = await login(data.email, data.password)
    
    if (result.success) {
      // Check if user is admin or super_admin after successful login
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        if (userData.user.role === 'admin' || userData.user.role === 'super_admin') {
          router.push('/admin')
        } else {
          setError('Access denied. Admin privileges required.')
          // Logout non-admin user
          await fetch('/api/auth/logout', { method: 'POST' })
        }
      }
    } else {
      setError(result.error || 'Login failed')
    }
  }

  // Don't show login form if already logged in as admin or super_admin
  if (user && (user.role === 'admin' || user.role === 'super_admin')) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ALLSTAR TECH
          </Link>
          <p className="text-slate-400 mt-2">Admin Portal</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@allstar.co.ke"
                    className="pl-10 focus-visible:ring-blue-500"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter admin password"
                    className="pl-10 pr-10 focus-visible:ring-blue-500"
                    {...register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Sign In to Admin
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Forgot your password?{' '}
                <button
                  type="button"
                  onClick={() => setShowSimpleReset(true)}
                  className="text-blue-600 font-medium hover:text-cyan-600 hover:underline transition-colors"
                >
                  Reset Password
                </button>
              </p>
              <p className="text-sm text-muted-foreground">
                Don't have admin access?{' '}
                <Link
                  href="/admin/register"
                  className="text-blue-600 font-medium hover:text-cyan-600 hover:underline transition-colors"
                >
                  Request Access
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Need customer access?{' '}
                <Link
                  href="/account/login"
                  className="text-blue-600 font-medium hover:text-cyan-600 hover:underline transition-colors"
                >
                  Customer Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
          >
            ← Back to store
          </Link>
        </div>

        {/* Simple Reset Modal */}
        <SimpleResetModal
          isOpen={showSimpleReset}
          onClose={() => setShowSimpleReset(false)}
        />
      </div>
    </div>
  )
}