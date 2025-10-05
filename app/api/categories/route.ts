import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('categories')
      .select('category_id,name,age_range')
      .eq('is_active', true)
      .order('display_order')
    if (error) throw error
    return NextResponse.json({ categories: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to load categories' }, { status: 500 })
  }
}


