import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { ProductService } from '@/lib/services/product-service'

export async function PATCH(_req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await _req.json()
    const supabase = await createServerClient()

    const payload = {
      name: body.name ?? null,
      description: body.description ?? null,
      price: body.price != null ? Number(body.price) : null,
      sale_price: body.sale_price === '' || body.sale_price == null ? null : Number(body.sale_price),
      is_on_sale: Boolean(body.sale_price && Number(body.sale_price) > 0),
      sale_start_date: body.sale_start_date ? body.sale_start_date : null,
      sale_end_date: body.sale_end_date ? body.sale_end_date : null,
      stock_quantity: body.stock_quantity != null ? Number(body.stock_quantity) : null,
      category_id: body.category_id ? Number(body.category_id) : null,
      attributes: body.attributes ?? null,
      is_featured: !!body.is_featured,
      is_active: body.is_active !== false,
      sku: body.sku ?? null,
      weight_grams: body.weight_grams === '' || body.weight_grams == null ? null : Number(body.weight_grams),
    }

    const { data, error } = await supabase
      .from('products')
      .update(payload)
      .eq('product_id', Number(params.slug))
      .select('*')
      .single()

    if (error) {
      console.error('Product update error:', error)
      throw error
    }
    return NextResponse.json({ product: data })
  } catch (error: any) {
    console.error('PATCH /api/products/[slug] failed:', error)
    return NextResponse.json({ error: error?.message || 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  try {
    const supabase = await createServerClient()
    // Delete images first (FK may cascade, but do manual to be safe)
    await supabase.from('product_images').delete().eq('product_id', Number(params.slug))
    const { error } = await supabase.from('products').delete().eq('product_id', Number(params.slug))
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to delete' }, { status: 500 })
  }
}
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const product = await ProductService.getProductBySlug(slug)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error('GET /api/products/[slug] failed:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}