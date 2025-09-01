
//lib/services/product-service.ts

import { createServerClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row'] & {
  images: Database['public']['Tables']['product_images']['Row'][]
  category: Database['public']['Tables']['categories']['Row'] | null
}

export class ProductService {
  // Get products by category (server-side)
  static async getProductsByCategory(categoryName: string, limit = 20) {
    const supabase = await createServerClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .eq('categories.name', categoryName.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    return products as Product[]
  }

static async getAllProducts(limit = 20) {
    const supabase = await createServerClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    return products as Product[]
  }


  // Get featured products (server-side)
  static async getFeaturedProducts(limit = 8) {
    const supabase = await createServerClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured products:', error)
      return []
    }

    return products as Product[]
  }

  // Get single product by ID or SKU (server-side)
  static async getProductBySlug(slug: string) {
    const supabase = await createServerClient()
    
    // Try to find by SKU first, then by ID
    let query = supabase
      .from('products')
      .select(`
        *,
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)

    // Check if slug is a number (product_id) or string (SKU)
    if (!isNaN(Number(slug))) {
      query = query.eq('product_id', parseInt(slug))
    } else {
      query = query.eq('sku', slug)
    }

    const { data: products, error } = await query.single()

    if (error) {
      console.error('Error fetching product:', error)
      return null
    }

    return products as Product
  }

  // Get all categories (server-side)
  static async getCategories() {
    const supabase = await createServerClient()
    
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return categories
  }

  // Search products (client-side)
  static async searchProducts(searchTerm: string, category?: string) {
    const supabase = createClient()
    
    let query = supabase
      .from('products')
      .select(`
        *,
        images:product_images(*),
        category:categories(*)
      `)
      .eq('is_active', true)
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)

    if (category) {
      query = query.eq('categories.name', category.toLowerCase())
    }

    const { data: products, error } = await query
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Error searching products:', error)
      return []
    }

    return products as Product[]
  }

 // Get current product price (with sales and flash sales)
// Get current product price (with sales and flash sales)
static async getCurrentPrice(productId: number) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc<number, { p_product_id: number }>(
    "get_current_price",
    { p_product_id: productId }
  );

  if (error) {
    console.error("Error getting current price:", error);
    return null;
  }

  return data;
}



  // Check product stock
 static async checkProductStock(productId: number, quantity = 1) {
  const supabase = createClient()
  
  const { data: product, error } = await supabase
    .from("products")
    .select("stock_quantity")
    .eq("product_id", productId)
    .eq("is_active", true)
    .single<{ stock_quantity: number }>()

  if (error || !product) {
    console.error("Error checking stock:", error)
    return false
  }

  return product.stock_quantity >= quantity
}
}