// app/api/products/route.ts

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const sku = searchParams.get('sku') || ''
    const status = searchParams.get('status') || ''

    const supabase = await createServerClient()
    let query = supabase
      .from('products')
      .select(`*, categories(name), product_images(image_url)`) 
      .order('created_at', { ascending: false })

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }
    if (sku) {
      query = query.ilike('sku', `%${sku}%`)
    }
    if (category) {
      query = query.eq('category_id', Number(category))
    }
    if (status) {
      if (status === 'active') query = query.eq('is_active', true)
      if (status === 'inactive') query = query.eq('is_active', false)
    }

    const { data, error } = await query
    if (error) throw error
    return NextResponse.json({ products: data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createServerClient()

    const insertPayload: any = {
      name: body.name,
      description: body.description || null,
      price: body.price,
      sale_price: body.sale_price ?? null,
      is_on_sale: Boolean(body.sale_price && body.sale_price > 0),
      sale_start_date: body.sale_start_date || null,
      sale_end_date: body.sale_end_date || null,
      stock_quantity: body.stock_quantity ?? 0,
      category_id: body.category_id ? Number(body.category_id) : null,
      attributes: body.attributes || null,
      is_featured: !!body.is_featured,
      is_active: body.is_active !== false,
      sku: body.sku || null,
      weight_grams: body.weight_grams ? Number(body.weight_grams) : null,
    }

    const { data, error } = await supabase
      .from('products')
      .insert(insertPayload)
      .select('*')
      .single()

    if (error) throw error

    // Optional: insert images if provided
    if (Array.isArray(body.images) && body.images.length) {
      const imagesPayload = body.images.map((url: string, idx: number) => ({
        product_id: (data as any).product_id,
        image_url: url,
        alt_text: body.imageAlts?.[idx] || null,
        display_order: idx,
        is_primary: idx === 0,
      }))
      await supabase.from('product_images').insert(imagesPayload)
    }

    return NextResponse.json({ product: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create product' }, { status: 500 })
  }
}