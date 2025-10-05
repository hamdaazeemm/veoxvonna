'use client'

import { useState } from 'react'
import { clearSupabaseCookies } from '@/lib/utils/cookie-cleaner'

export default function ClearCookiesPage() {
  const [cleared, setCleared] = useState(false)

  const handleClearCookies = () => {
    try {
      clearSupabaseCookies()
      setCleared(true)
      // Also clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }
    } catch (error) {
      console.error('Failed to clear cookies:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Clear Authentication Data</h1>
        
        {!cleared ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              If you're experiencing authentication issues, clearing stored cookies and data can help resolve them.
            </p>
            <button
              onClick={handleClearCookies}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Clear All Authentication Data
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Cleared Successfully</h2>
            <p className="text-gray-600 mb-6">
              All authentication cookies and stored data have been cleared.
            </p>
            <a
              href="/auth/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
            >
              Go to Login
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
