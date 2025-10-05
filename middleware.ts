// // // middleware.ts
// // import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// // import { NextResponse } from 'next/server'
// // import type { NextRequest } from 'next/server'

// // export async function middleware(req: NextRequest) {
// //   const res = NextResponse.next()
// //   const supabase = createMiddlewareClient({ req, res })

// //   // Refresh session if expired - VERY IMPORTANT
// //   const { data: { session }, error } = await supabase.auth.getSession()
  
// //   console.log('Middleware session:', session?.user?.email) // Debug

// //   if (req.nextUrl.pathname.startsWith('/admin')) {
// //     if (!session) {
// //       console.log('No session, redirecting to login')
// //       const redirectUrl = new URL('/auth/login', req.url)
// //       return NextResponse.redirect(redirectUrl)
// //     }

// //     // Optional: Check user role
// //     try {
// //       const { data: dbUser, error: dbError } = await supabase
// //         .from('users')
// //         .select('role')
// //         .eq('auth_uid', session.user.id)
// //         .single()

// //       if (dbError || !dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'super_admin')) {
// //         console.log('User not admin, redirecting to unauthorized')
// //         const redirectUrl = new URL('/unauthorized', req.url)
// //         return NextResponse.redirect(redirectUrl)
// //       }
// //     } catch (error) {
// //       console.log('Error checking user role, allowing access anyway')
// //       // Allow access temporarily if role check fails
// //     }
// //   }

// //   return res
// // }

// // export const config = {
// //   matcher: ['/admin/:path*'],
// // }


// // middleware.ts
// import { createServerClient } from '@supabase/ssr'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   let res = NextResponse.next({
//     request: {
//       headers: req.headers,
//     },
//   })
  
//   try {
//     // Temporarily disable middleware auth checks until Supabase is restored
//     // and cookie issues are resolved
//     console.log('Middleware: Temporarily allowing all requests during Supabase restoration')
    
//     // Check if we're accessing admin pages
//     if (req.nextUrl.pathname.startsWith('/admin')) {
//       console.log('Admin page access - allowing during restoration period')
//       // Still allow access but log it
//       return res
//     }

//     // For non-admin pages, continue normally
//     return res

//     /* 
//     SUPABASE AUTH MIDDLEWARE - TEMPORARILY DISABLED
    
//     This middleware is temporarily disabled due to cookie parsing issues
//     during Supabase project restoration. Re-enable once restoration is complete.
    
//     To re-enable:
//     1. Uncomment the code below
//     2. Remove the temporary bypass logic above
//     3. Test authentication flow
//     */
//   } catch (error) {
//     console.error('Middleware error:', error)
//     // If there's a connection error, allow access to prevent blocking users
//     console.log('Allowing access due to middleware error')
//     return res
//   }
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// }

// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Safe cookie value parser
function safeParseCookieValue(value: string): string {
  if (!value) return value
  
  if (value.startsWith('base64-eyJ')) {
    try {
      const base64Content = value.substring(7)
      const decoded = atob(base64Content)
      return decoded
    } catch (error) {
      console.warn(`Failed to decode base64 cookie value: ${value.substring(0, 20)}...`)
      return ''
    }
  }
  
  return value
}

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })
  
  try {
    // Check for malformed cookies and clear them
    const cookies = req.cookies.getAll()
    let hasMalformedCookies = false
    
    cookies.forEach(cookie => {
      const name = cookie.name
      const value = cookie.value
      
      // Check if it's a Supabase cookie with base64 format that will cause parsing errors
      if ((name.includes('supabase') || name.startsWith('sb-')) && 
          value.startsWith('base64-')) {
        console.log(`Found malformed cookie: ${name}`)
        hasMalformedCookies = true
      }
    })
    
    // If malformed cookies found, clear them and redirect to login
    if (hasMalformedCookies) {
      console.log('Malformed cookies detected, clearing and redirecting to login')
      
      const response = NextResponse.redirect(new URL('/auth/login', req.url))
      
      // Delete all Supabase cookies
      cookies.forEach(cookie => {
        if (cookie.name.includes('supabase') || cookie.name.startsWith('sb-')) {
          response.cookies.delete(cookie.name)
          response.cookies.set(cookie.name, '', { 
            maxAge: 0, 
            path: '/',
            expires: new Date(0)
          })
        }
      })
      
      return response
    }
    
    // Check if we're accessing admin pages
    if (req.nextUrl.pathname.startsWith('/admin')) {
      console.log('Admin page access attempt:', req.nextUrl.pathname)
      
      try {
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              get(name: string) {
                const cookie = req.cookies.get(name)
                if (!cookie?.value) return undefined
                
                // Parse and clean the cookie value
                const cleanValue = safeParseCookieValue(cookie.value)
                return cleanValue || undefined
              },
              set(name: string, value: string, options: any) {
                res.cookies.set({ name, value, ...options })
              },
              remove(name: string, options: any) {
                res.cookies.set({ name, value: '', ...options, maxAge: 0 })
              },
            },
          }
        )

        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth error in middleware:', error)
        }

        if (!session) {
          console.log('No session, redirecting to login')
          const loginUrl = new URL('/auth/login', req.url)
          loginUrl.searchParams.set('redirect', req.nextUrl.pathname)
          return NextResponse.redirect(loginUrl)
        }

        console.log('Session valid for user:', session.user.email)
      } catch (error) {
        console.error('Middleware auth check error:', error)
        // Allow access if there's an error to prevent blocking users
        console.log('Allowing access due to auth check error')
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // If there's a fatal error, allow access to prevent blocking users
    console.log('Allowing access due to middleware error')
    return res
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}