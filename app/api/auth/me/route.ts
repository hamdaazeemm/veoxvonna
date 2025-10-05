import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    return NextResponse.json({ user })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Authentication failed' }, { status: 500 })
  }
}


