// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
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

    // Optional: Check user role
    try {
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('role')
        .eq('auth_uid', session.user.id)
        .single()

      if (dbError || !dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'super_admin')) {
        console.log('User not admin, redirecting to unauthorized')
        const redirectUrl = new URL('/unauthorized', req.url)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.log('Error checking user role, allowing access anyway')
      // Allow access temporarily if role check fails
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}