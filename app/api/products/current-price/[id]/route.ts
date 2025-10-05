import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerClient()

    const productId = Number(params.id)
    const { data: product, error: prodErr } = await supabase
      .from('products')
      .select('product_id, price, sale_price, is_on_sale, category_id')
      .eq('product_id', productId)
      .single()
    if (prodErr || !product) throw prodErr || new Error('Product not found')

    // Base price
    let currentPrice = product.is_on_sale && product.sale_price ? product.sale_price : product.price

    // Fetch active campaigns
    const now = new Date().toISOString()
    const { data: campaigns } = await supabase
      .from('sales_campaigns')
      .select('*')
      .eq('is_active', true)
      .lte('start_date', now)
      .gte('end_date', now)

    if (campaigns && campaigns.length) {
      for (const c of campaigns) {
        const appliesToAll = c.applies_to === 'all'
        const appliesToCategory = c.applies_to === 'categories' && Array.isArray(c.target_categories) && c.target_categories.includes(product.category_id)
        const appliesToProduct = c.applies_to === 'products' && Array.isArray(c.target_products) && c.target_products.includes(productId)

        if (appliesToAll || appliesToCategory || appliesToProduct) {
          if (c.campaign_type === 'percentage' && c.discount_value) {
            const discounted = currentPrice * (1 - c.discount_value / 100)
            currentPrice = Math.max(0, Math.round(discounted))
          } else if (c.campaign_type === 'fixed' && c.discount_value) {
            currentPrice = Math.max(0, currentPrice - c.discount_value)
          } else if (c.campaign_type === 'free_shipping') {
            // price unchanged
          }
        }
      }
    }

    return NextResponse.json({ price: currentPrice, basePrice: product.price, salePrice: product.sale_price, isOnSale: product.is_on_sale })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to compute price' }, { status: 500 })
  }
}



