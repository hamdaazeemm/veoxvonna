// app/auth/logout/route.ts
import { createActionClient } from '@/lib/supabase/action-client' // Use action client
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createActionClient() // Safe to use in Route Handler
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/auth/login', '/'))
}