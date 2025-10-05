// // app/auth/logout/route.ts
// import { createActionClient } from '@/lib/supabase/action-client' // Use action client
// import { NextResponse } from 'next/server'

// export async function POST() {
//   const supabase = await createActionClient() // Safe to use in Route Handler
//   await supabase.auth.signOut()
//   return NextResponse.redirect(new URL('/auth/login', '/'))
// }


import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerClient()
    
    await supabase.auth.signOut()
    
    // Clear the session cookie
    const url = new URL('/auth/login', request.url)
    const response = NextResponse.redirect(url)
    response.cookies.set('sb-access-token', '', { maxAge: 0 })
    response.cookies.set('sb-refresh-token', '', { maxAge: 0 })
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    const url = new URL('/auth/login', request.url)
    return NextResponse.redirect(url)
  }
}