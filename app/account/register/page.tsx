'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/lib/user-store'
import GoogleSignInButton from '@/components/auth/google-sign-in-button'
import { useToast } from '@/components/ui/custom-toast'

export default function RegisterPage() {
  const router = useRouter()
  const { user } = useUserStore()
  const { success: showSuccessToast, error: showErrorToast } = useToast()
  const [returnTo, setReturnTo] = useState<string>('/')

  // Get return URL from query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const returnUrl = urlParams.get('returnTo')
    if (returnUrl) {
      setReturnTo(decodeURIComponent(returnUrl))
    }
  }, [])

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(returnTo)
    }
  }, [user, router, returnTo])

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img 
              src="/allstar-logo.svg" 
              alt="Allstar Tech" 
              className="h-16 w-auto mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-sm text-gray-600">Join us to get started</p>
        </div>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl font-semibold text-gray-900">Welcome to Allstar Tech</CardTitle>
            <CardDescription className="text-gray-600">
              Sign up with your Google account and enjoy the best electronic products you need.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Google Sign-In Button */}
            <GoogleSignInButton
              returnTo={returnTo}
              onSuccess={() => {
                showSuccessToast('Welcome to Allstar Tech!')
              }}
              onError={(error) => {
                console.error('Registration error:', error)
                showErrorToast('Google sign-up failed. Please try again.')
              }}
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/account/login"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
          >
            ← Back to store
          </Link>
        </div>
      </div>
    </div>
  )
}