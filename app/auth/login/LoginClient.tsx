

// //  app/auth/login/LoginClient.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'

// export default function LoginClient() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const searchParams = useSearchParams()
//   const redirectTo = searchParams.get('redirect') || '/admin/dashboard'
//   const supabase = createClient()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       console.log('🔐 Attempting login...')
      
//       const { data, error: signInError } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       })

//       if (signInError) {
//         setError(signInError.message)
//         return
//       }

//       if (data.session) {
//         console.log('✅ Login successful')
//         // Redirect immediately - let Supabase handle cookies
//         window.location.href = redirectTo
//       } else {
//         setError('Login failed')
//       }
//     } catch (error: any) {
//       setError(error.message || 'Login failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// app/auth/login/LoginClient.tsx - FIXED FOR BUILD
'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Create a separate component that uses useSearchParams
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/admin/dashboard'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('🔐 Attempting login...')
      
      // Import and create client inside the event handler
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      if (data.session) {
        console.log('✅ Login successful')
        window.location.href = redirectTo
      } else {
        setError('Login failed')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setError(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function LoginClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading login form...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}