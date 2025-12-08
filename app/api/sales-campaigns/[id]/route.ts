
// //src/app/api/sales-campaigns/[id]/route.ts
// import { NextResponse } from 'next/server'
// import { createServerClient } from '@/lib/supabase/server'

// export async function GET(_req: Request, { params }: { params: { id: string } }) {
//   try {
//     const supabase = await createServerClient()
//     const { data, error } = await supabase
//       .from('sales_campaigns')
//       .select('*')
//       .eq('campaign_id', Number(params.id))
//       .single()
//     if (error) throw error
//     return NextResponse.json({ campaign: data })
//   } catch (error: any) {
//     return NextResponse.json({ error: error?.message || 'Failed to load campaign' }, { status: 500 })
//   }
// }

// export async function PATCH(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const body = await request.json()
//     const supabase = await createServerClient()
//     const { data, error } = await supabase
//       .from('sales_campaigns')
//       .update({
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
//       .eq('campaign_id', Number(params.id))
//       .select('*')
//       .single()
//     if (error) throw error
//     return NextResponse.json({ campaign: data })
//   } catch (error: any) {
//     return NextResponse.json({ error: error?.message || 'Failed to update campaign' }, { status: 500 })
//   }
// }


// src/app/api/sales-campaigns/[id]/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// Define the type locally right here
interface SalesCampaignUpdate {
  name?: string
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
  updated_at?: string
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('sales_campaigns')
      .select('*')
      .eq('campaign_id', Number(params.id))
      .single()
    if (error) throw error
    return NextResponse.json({ campaign: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to load campaign' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const supabase = await createServerClient()
    
    const updateData: SalesCampaignUpdate = {
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
      updated_at: new Date().toISOString(),
    }
    
    // Cast to any to bypass TypeScript temporarily
    const { data, error } = await (supabase as any)
      .from('sales_campaigns')
      .update(updateData)
      .eq('campaign_id', Number(params.id))
      .select('*')
      .single()
    
    if (error) throw error
    return NextResponse.json({ campaign: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update campaign' }, { status: 500 })
  }
}