import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email') || ''

    const supabase = await createServerClient()
    let query = supabase
      .from('customers')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(50)

    if (email) {
      query = query.ilike('email', `%${email}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return NextResponse.json({ customers: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch customers' }, { status: 500 })
  }
}


