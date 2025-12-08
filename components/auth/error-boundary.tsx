// // components/auth/error-boundary.tsx
'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class AuthErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  async componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Auth Error Boundary caught an error:', error, errorInfo)
    
    if (error.message.includes('cookie') || error.message.includes('JSON.parse')) {
      console.log('Detected cookie parsing error, attempting to clear cookies...')
      
      try {
        if (typeof window !== 'undefined') {
          // Use dynamic import with error handling
          try {
            const { clearSupabaseCookies } = await import('@/lib/utils/cookie-cleaner')
            clearSupabaseCookies()
          } catch (importError) {
            console.warn('Could not import cookie-cleaner, using fallback method:', importError)
            // Fallback: clear cookies manually
            this.clearCookiesManually()
          }
        }
      } catch (clearError) {
        console.error('Failed to clear cookies:', clearError)
      }
    }
  }

  private clearCookiesManually() {
    // Clear Supabase-related cookies
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      
      // Clear Supabase-related cookies
      if (name.includes('supabase') || name.includes('sb-') || name.includes('auth')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      }
    }
    
    // Also clear localStorage
    localStorage.clear()
    sessionStorage.clear()
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
            <p className="text-gray-600 mb-6">
              There was an issue with authentication data. This might be due to corrupted cookies or connection issues.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => {
                  this.clearCookiesManually()
                  window.location.reload()
                }}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear Auth Data
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}