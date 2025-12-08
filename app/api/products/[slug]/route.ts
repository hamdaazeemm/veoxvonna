

// // app/api/products/[slug]/route.ts
// import { NextResponse } from 'next/server'
// import { createServerClient } from '@/lib/supabase/server'
// import { ProductService } from '@/lib/services/product-service'

// export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
//   try {
//     const body = await request.json()
//     const supabase = await createServerClient()
 
//     const payload = {
//       name: body.name ?? null,
//       description: body.description ?? null,
//       price: body.price != null ? Number(body.price) : null,
//       sale_price: body.sale_price === '' || body.sale_price == null ? null : Number(body.sale_price),
//       is_on_sale: Boolean(body.sale_price && Number(body.sale_price) > 0),
//       sale_start_date: body.sale_start_date ? body.sale_start_date : null,
//       sale_end_date: body.sale_end_date ? body.sale_end_date : null,
//       stock_quantity: body.stock_quantity != null ? Number(body.stock_quantity) : null,
//       category_id: body.category_id ? Number(body.category_id) : null,
//       attributes: body.attributes ?? null,
//       is_featured: !!body.is_featured,
//       is_active: body.is_active !== false,
//       sku: body.sku ?? null,
//       weight_grams: body.weight_grams === '' || body.weight_grams == null ? null : Number(body.weight_grams),
//     }

//     const productId = Number(params.slug)

//     // 1. Update the product
//     const { data, error } = await supabase
//       .from('products')
//       .update(payload)
//       .eq('product_id', productId)
//       .select('*')
//       .single()

//     if (error) {
//       console.error('Product update error:', error)
//       throw error
//     }

//     // 2. Handle size quantities if provided
//     if (body.sizes && Array.isArray(body.sizes)) {
//       console.log('Updating sizes for product:', productId, body.sizes)
      
//       // Get the selected sizes from attributes
//       const selectedSizes = body.attributes?.sizes || []
      
//       // Delete sizes that are no longer selected
//       if (selectedSizes.length > 0) {
//         const { error: deleteError } = await supabase
//           .from('product_sizes')
//           .delete()
//           .eq('product_id', productId)
//           .not('size_label', 'in', `(${selectedSizes.map((s: string) => `'${s}'`).join(',')})`)

//         if (deleteError) {
//           console.error('Error deleting unselected sizes:', deleteError)
//         }
//       } else {
//         // If no sizes selected, delete all sizes for this product
//         const { error: deleteError } = await supabase
//           .from('product_sizes')
//           .delete()
//           .eq('product_id', productId)

//         if (deleteError) {
//           console.error('Error deleting all sizes:', deleteError)
//         }
//       }

//       // Insert or update sizes
//       const sizeUpdates = body.sizes
//         .filter((size: any) => selectedSizes.includes(size.size_label))
//         .map((size: any) => ({
//           product_id: productId,
//           size_label: size.size_label,
//           stock_quantity: Math.max(0, Number(size.stock_quantity) || 0)
//         }))

//       if (sizeUpdates.length > 0) {
//         // Use upsert to handle both insert and update
//         const { error: sizesError } = await supabase
//           .from('product_sizes')
//           .upsert(sizeUpdates, {
//             onConflict: 'product_id,size_label',
//             ignoreDuplicates: false
//           })

//         if (sizesError) {
//           console.error('Error updating sizes:', sizesError)
//           // Don't fail the whole request, but log it
//         } else {
//           console.log('Sizes updated successfully:', sizeUpdates.length)
//         }
//       }
//     }

//     // 3. Handle image updates if provided
//     if (body.images && Array.isArray(body.images)) {
//       console.log('Updating images for product:', productId, body.images)
      
//       // First delete existing images
//       const { error: deleteError } = await supabase
//         .from('product_images')
//         .delete()
//         .eq('product_id', productId)

//       if (deleteError) {
//         console.error('Error deleting old images:', deleteError)
//       }

//       // Then insert new images
//       if (body.images.length > 0) {
//         const productImages = body.images.map((url: string, index: number) => ({
//           product_id: productId,
//           image_url: url,
//           alt_text: `${body.name} - Image ${index + 1}`,
//           display_order: index,
//           is_primary: index === 0
//         }))

//         const { error: imagesError } = await supabase
//           .from('product_images')
//           .insert(productImages)

//         if (imagesError) {
//           console.error('Error inserting new images:', imagesError)
//         }
//       }
//     }

//     return NextResponse.json({ 
//       product: data,
//       message: 'Product updated successfully'
//     })
//   } catch (error: any) {
//     console.error('PATCH /api/products/[slug] failed:', error)
//     return NextResponse.json({ error: error?.message || 'Failed to update' }, { status: 500 })
//   }
// }

// export async function DELETE(
//   request: Request, 
//   { params }: { params: Promise<{ slug: string }> }
// ) {
//   try {
//     const { slug } = await params // AWAIT the params
//     const supabase = await createServerClient()
//     const productId = Number(slug) // Use the awaited slug
    
//     // Delete sizes first
//     await supabase.from('product_sizes').delete().eq('product_id', productId)
    
//     // Delete images
//     await supabase.from('product_images').delete().eq('product_id', productId)
    
//     // Then delete product
//     const { error } = await supabase.from('products').delete().eq('product_id', productId)
    
//     if (error) throw error
//     return NextResponse.json({ ok: true })
//   } catch (error: any) {
//     return NextResponse.json({ error: error?.message || 'Failed to delete' }, { status: 500 })
//   }
// }
// export async function GET(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const { slug } = params
//     const product = await ProductService.getProductBySlug(slug)
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 })
//     }
//     return NextResponse.json(product)
//   } catch (error) {
//     console.error('GET /api/products/[slug] failed:', error)
//     return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
//   }
// }


// app/api/products/[slug]/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { ProductService } from '@/lib/services/product-service'
import { updateProduct } from '@/lib/supabase/helpers'
import { upsertProductSizes } from '@/lib/supabase/helpers'
import { insertProductImages } from '@/lib/supabase/helpers'  

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json()
    const supabase = await createServerClient()
 
    // Build payload dynamically
    const payload: Record<string, any> = {}
    
    if (body.name !== undefined) payload.name = body.name
    if (body.description !== undefined) payload.description = body.description
    if (body.price != null) payload.price = Number(body.price)
    
    // Handle sale_price specially
    if (body.sale_price === '' || body.sale_price == null) {
      payload.sale_price = null
    } else if (body.sale_price !== undefined) {
      payload.sale_price = Number(body.sale_price)
    }
    
    payload.is_on_sale = Boolean(body.sale_price && Number(body.sale_price) > 0)
    
    if (body.sale_start_date !== undefined) payload.sale_start_date = body.sale_start_date || null
    if (body.sale_end_date !== undefined) payload.sale_end_date = body.sale_end_date || null
    if (body.stock_quantity != null) payload.stock_quantity = Number(body.stock_quantity)
    if (body.category_id !== undefined) payload.category_id = body.category_id ? Number(body.category_id) : null
    if (body.attributes !== undefined) payload.attributes = body.attributes
    if (body.is_featured !== undefined) payload.is_featured = !!body.is_featured
    if (body.is_active !== undefined) payload.is_active = body.is_active !== false
    if (body.sku !== undefined) payload.sku = body.sku
    
    // Handle weight_grams specially
    if (body.weight_grams === '' || body.weight_grams == null) {
      payload.weight_grams = null
    } else if (body.weight_grams !== undefined) {
      payload.weight_grams = Number(body.weight_grams)
    }

    const productId = Number(params.slug)

    // 1. Update the product using helper
    const { data, error } = await updateProduct(supabase, productId, payload)

    if (error) {
      console.error('Product update error:', error)
      throw error
    }

    // 2. Handle size quantities if provided
    if (body.sizes && Array.isArray(body.sizes)) {
      console.log('Updating sizes for product:', productId, body.sizes)
      
      // Get the selected sizes from attributes
      const selectedSizes = body.attributes?.sizes || []
      
      // Delete sizes that are no longer selected
      if (selectedSizes.length > 0) {
        const { error: deleteError } = await supabase
          .from('product_sizes')
          .delete()
          .eq('product_id', productId)
          .not('size_label', 'in', `(${selectedSizes.map((s: string) => `'${s}'`).join(',')})`)

        if (deleteError) {
          console.error('Error deleting unselected sizes:', deleteError)
        }
      } else {
        // If no sizes selected, delete all sizes for this product
        const { error: deleteError } = await supabase
          .from('product_sizes')
          .delete()
          .eq('product_id', productId)

        if (deleteError) {
          console.error('Error deleting all sizes:', deleteError)
        }
      }

      // Insert or update sizes
      const sizeUpdates = body.sizes
        .filter((size: any) => selectedSizes.includes(size.size_label))
        .map((size: any) => ({
          product_id: productId,
          size_label: size.size_label,
          stock_quantity: Math.max(0, Number(size.stock_quantity) || 0)
        }))

      if (sizeUpdates.length > 0) {
        const { error: sizesError } = await upsertProductSizes(supabase, sizeUpdates)

        if (sizesError) {
          console.error('Error updating sizes:', sizesError)
        } else {
          console.log('Sizes updated successfully:', sizeUpdates.length)
        }
      }
    }

    // 3. Handle image updates if provided
    if (body.images && Array.isArray(body.images)) {
      console.log('Updating images for product:', productId, body.images)
      
      // First delete existing images
      const { error: deleteError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId)

      if (deleteError) {
        console.error('Error deleting old images:', deleteError)
      }

      // Then insert new images
      if (body.images.length > 0) {
        const productImages = body.images.map((url: string, index: number) => ({
          product_id: productId,
          image_url: url,
          alt_text: `${body.name} - Image ${index + 1}`,
          display_order: index,
          is_primary: index === 0
        }))

        const { error: imagesError } = await insertProductImages(supabase, productImages)

        if (imagesError) {
          console.error('Error inserting new images:', imagesError)
        }
      }
    }

    return NextResponse.json({ 
      product: data,
      message: 'Product updated successfully'
    })
  } catch (error: any) {
    console.error('PATCH /api/products/[slug] failed:', error)
    return NextResponse.json({ error: error?.message || 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createServerClient()
    const productId = Number(slug)
    
    // Delete sizes first
    await supabase.from('product_sizes').delete().eq('product_id', productId)
    
    // Delete images
    await supabase.from('product_images').delete().eq('product_id', productId)
    
    // Then delete product
    const { error } = await supabase.from('products').delete().eq('product_id', productId)
    
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to delete' }, { status: 500 })
  }
}

export async function GET(
  request: Request,
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