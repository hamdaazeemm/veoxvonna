import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('sales_campaigns')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json({ campaigns: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to load campaigns' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from('sales_campaigns')
      .insert({
        name: body.name,
        description: body.description,
        campaign_type: body.campaign_type,
        discount_value: body.discount_value,
        minimum_order_amount: body.minimum_order_amount,
        maximum_discount_amount: body.maximum_discount_amount,
        is_active: body.is_active,
        start_date: body.start_date,
        end_date: body.end_date,
        applies_to: body.applies_to,
        target_categories: body.target_categories || [],
        target_products: body.target_products || [],
        usage_limit: body.usage_limit,
      })
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json({ campaign: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create campaign' }, { status: 500 })
  }
}
