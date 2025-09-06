// // middleware.ts
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient({ req, res })

//   // Refresh session if expired - VERY IMPORTANT
//   const { data: { session }, error } = await supabase.auth.getSession()
  
//   console.log('Middleware session:', session?.user?.email) // Debug

//   if (req.nextUrl.pathname.startsWith('/admin')) {
//     if (!session) {
//       console.log('No session, redirecting to login')
//       const redirectUrl = new URL('/auth/login', req.url)
//       return NextResponse.redirect(redirectUrl)
//     }

//     // Optional: Check user role
//     try {
//       const { data: dbUser, error: dbError } = await supabase
//         .from('users')
//         .select('role')
//         .eq('auth_uid', session.user.id)
//         .single()

//       if (dbError || !dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'super_admin')) {
//         console.log('User not admin, redirecting to unauthorized')
//         const redirectUrl = new URL('/unauthorized', req.url)
//         return NextResponse.redirect(redirectUrl)
//       }
//     } catch (error) {
//       console.log('Error checking user role, allowing access anyway')
//       // Allow access temporarily if role check fails
//     }
//   }

//   return res
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// }


// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired - VERY IMPORTANT
    const { data: { session }, error } = await supabase.auth.getSession()
    
    console.log('Middleware session:', session?.user?.email) // Debug

    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!session) {
        console.log('No session, redirecting to login')
        const redirectUrl = new URL('/auth/login', req.url)
        return NextResponse.redirect(redirectUrl)
      }

      // Optional: Check user role (temporarily disabled for debugging)
      console.log('User authenticated, allowing access to admin area')
      
      // TODO: Re-enable role check once user is properly set up in database
      /*
      try {
        const { data: dbUser, error: dbError } = await supabase
          .from('users')
          .select('role')
          .eq('auth_uid', session.user.id)
          .single()

        console.log('Role check result:', { dbUser, dbError, userId: session.user.id })

        if (dbError) {
          console.log('Database error checking role:', dbError.message)
          // If there's a database error, allow access temporarily
          console.log('Allowing access due to database error')
        } else if (!dbUser) {
          console.log('User not found in database, allowing access')
          // If user not found in database, allow access (they might be using auth only)
        } else if (dbUser.role !== 'admin' && dbUser.role !== 'super_admin') {
          console.log('User not admin, redirecting to unauthorized')
          const redirectUrl = new URL('/unauthorized', req.url)
          return NextResponse.redirect(redirectUrl)
        } else {
          console.log('User is admin, allowing access')
        }
      } catch (error) {
        console.log('Error checking user role, allowing access anyway:', error)
        // Allow access if role check fails
      }
      */
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // If there's a connection error, allow access to prevent blocking users
    console.log('Allowing access due to middleware error')
    return res
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}