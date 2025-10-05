import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let email: string | null = null
    let currentPassword: string | null = null
    let newPassword: string | null = null

    if (contentType.includes('application/json')) {
      const body = await request.json()
      email = body.email
      currentPassword = body.currentPassword
      newPassword = body.newPassword
    } else {
      const form = await request.formData()
      email = (form.get('email') as string) || null
      currentPassword = (form.get('currentPassword') as string) || null
      newPassword = (form.get('newPassword') as string) || null
    }

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const supabase = await createServerClient()

    // Verify current password by signing in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    })

    if (signInError || !signInData?.user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Update password for the authenticated user
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message || 'Failed to update password' }, { status: 500 })
    }

    // Sign the user out and force re-login
    const cookieStore = await cookies()
    await supabase.auth.signOut()

    const url = new URL('/auth/login', request.url)
    const response = NextResponse.redirect(url)
    response.cookies.set('sb-access-token', '', { maxAge: 0 })
    response.cookies.set('sb-refresh-token', '', { maxAge: 0 })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Unexpected error' }, { status: 500 })
  }
}


