// lib/supabase/helpers.ts
// Create this new file to wrap Supabase calls with proper typing

import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Typed wrapper for Supabase update operations
 */
export async function updateProduct(
  supabase: SupabaseClient,
  productId: number,
  payload: Record<string, any>
) {
  const query = supabase
    .from('products')
    .update(payload)
    .eq('product_id', productId)
    .select('*')
    .single()
  
  return query
}

/**
 * Typed wrapper for RPC calls
 */
export async function getCurrentPrice(
  supabase: SupabaseClient,
  productId: number
): Promise<number | null> {
  try {
    const { data, error } = await (supabase as any).rpc(
      'get_current_price',
      { p_product_id: productId }
    )
    
    if (error) {
      console.error('Error getting current price:', error)
      return null
    }
    
    return data as number
  } catch (err) {
    console.error('Exception getting current price:', err)
    return null
  }
}

/**
 * Typed wrapper for upsert operations
 */
export async function upsertProductSizes(
  supabase: SupabaseClient,
  sizes: Array<{
    product_id: number
    size_label: string
    stock_quantity: number
  }>
) {
  const query = supabase
    .from('product_sizes')
    .upsert(sizes, {
      onConflict: 'product_id,size_label',
      ignoreDuplicates: false
    })
  
  return query
}

/**
 * Typed wrapper for insert operations
 */
export async function insertProductImages(
  supabase: SupabaseClient,
  images: Array<{
    product_id: number
    image_url: string
    alt_text: string | null
    display_order: number
    is_primary: boolean
  }>
) {
  const query = supabase
    .from('product_images')
    .insert(images)
  
  return query
}


