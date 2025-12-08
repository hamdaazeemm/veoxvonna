// // app/api/sales-campaigns/route.ts
// import { NextResponse } from 'next/server'
// import { createServerClient } from '@/lib/supabase/server'

// export async function GET() {
//   try {
//     const supabase = await createServerClient()
//     const { data, error } = await supabase
//       .from('sales_campaigns')
//       .select('*')
//       .order('created_at', { ascending: false })
//     if (error) throw error
//     return NextResponse.json({ campaigns: data })
//   } catch (error: any) {
//     return NextResponse.json({ error: error?.message || 'Failed to load campaigns' }, { status: 500 })
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json()
//     const supabase = await createServerClient()

//     const { data, error } = await supabase
//       .from('sales_campaigns')
//       .insert({
//         name: body.name,
//         description: body.description,
//         campaign_type: body.campaign_type,
//         discount_value: body.discount_value,
//         minimum_order_amount: body.minimum_order_amount,
//         maximum_discount_amount: body.maximum_discount_amount,
//         is_active: body.is_active,
//         start_date: body.start_date,
//         end_date: body.end_date,
//         applies_to: body.applies_to,
//         target_categories: body.target_categories || [],
//         target_products: body.target_products || [],
//         usage_limit: body.usage_limit,
//       })
//       .select('*')
//       .single()

//     if (error) throw error
//     return NextResponse.json({ campaign: data })
//   } catch (error: any) {
//     return NextResponse.json({ error: error?.message || 'Failed to create campaign' }, { status: 500 })
//   }
// }

// app/api/sales-campaigns/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// Define type locally
interface SalesCampaignInsert {
  name: string
  description?: string | null
  campaign_type?: string | null
  discount_value?: number | null
  minimum_order_amount?: number | null
  maximum_discount_amount?: number | null
  is_active?: boolean
  start_date?: string | null
  end_date?: string | null
  applies_to?: string
  target_categories?: string[] | null
  target_products?: number[] | null
  usage_limit?: number | null
  used_count?: number
  created_by?: number | null
}

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

    const insertData: SalesCampaignInsert = {
      name: body.name,
      description: body.description,
      campaign_type: body.campaign_type,
      discount_value: body.discount_value,
      minimum_order_amount: body.minimum_order_amount,
      maximum_discount_amount: body.maximum_discount_amount,
      is_active: body.is_active !== undefined ? body.is_active : true,
      start_date: body.start_date,
      end_date: body.end_date,
      applies_to: body.applies_to || 'all',
      target_categories: body.target_categories || [],
      target_products: body.target_products || [],
      usage_limit: body.usage_limit,
      used_count: 0,
      created_by: null, // Set this if you have user auth
    }

    // Use type assertion to bypass TypeScript
    const { data, error } = await (supabase as any)
      .from('sales_campaigns')
      .insert(insertData)
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json({ campaign: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create campaign' }, { status: 500 })
  }
}