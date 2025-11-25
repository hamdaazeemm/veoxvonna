
//lib/services/product-service.ts

import { createServerClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'
//import { IProduct } from '@/lib/types/product'
import { IProduct, AVAILABLE_SIZES } from '@/lib/types/product';
type Product = Database['public']['Tables']['products']['Row'] & {
  images: Database['public']['Tables']['product_images']['Row'][]
  category: Database['public']['Tables']['categories']['Row'] | null
   sizes: Database['public']['Tables']['product_sizes']['Row'][] // Add this
}
// Define types for specific queries
// Define types for specific queries with proper JSON handling
type OrderItem = Database['public']['Tables']['order_items']['Row'] & {
  selected_attributes?: {
    size?: string;
    [key: string]: any;
  };
}
type ProductSize = Database['public']['Tables']['product_sizes']['Row']
type InventoryLog = Database['public']['Tables']['inventory_logs']['Row']
type CategoryData = {
  category_id: number
  name: string
  parent_category_id: number | null
}
type Video = Database['public']['Tables']['videos']['Row']
type SizeStock = {
  stock_quantity: number;
}

export class ProductService {
  // Get products by category (server-side)
  // static async getProductsByCategory(categoryName: string, limit = 20,categoryId?: number, includeSubcategories = true) {
  //   const supabase = await createServerClient()
  //       let categoryIds = [categoryId];
    
  //   if (includeSubcategories) {
  //   // Get subcategories with type assertion
  //   const { data: subcats } = await supabase
  //     .from('categories')
  //     .select('category_id')
  //     .eq('parent_category_id', categoryId)
  //     .returns<CategoryData[]>()
    
  //   if (subcats) {
  //     categoryIds = [...categoryIds, ...subcats.map(c => c.category_id)];
  //   }
  // }
  //   const { data: products, error } = await supabase
  //     .from('products')
  //     .select(`
  //       *,
  //       images:product_images(*),
  //       category:categories(*)
  //     `)
  //     .eq('is_active', true)
  //     .in('category_id', categoryIds)
  //     .eq('categories.name', categoryName.toLowerCase())
  //     .order('created_at', { ascending: false })
  //     .limit(limit)

  //   if (error) {
  //     console.error('Error fetching products:', error)
  //     return []
  //   }

  //   return products as Product[]
  // }
// Add these type definitions at the top of your product-service.ts file

  static async getVideos(limit = 10): Promise<Video[]> {
    const supabase = await createServerClient()
    
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('Error fetching videos:', error)
      return []
    }

    return videos || []
  }
   static async getMainVideo(): Promise<Video | null> {
    const supabase = await createServerClient()
    
    const { data: video, error } = await supabase
      .from('videos')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(1)
      .single()

    if (error) {
      console.error('Error fetching main video:', error)
      return null
    }

    return video
  }

// Then update your method:
static async getProductsByCategory(
  categoryName: string, 
  limit = 20,
  categoryId?: number, 
  includeSubcategories = true
) {
  const supabase = await createServerClient()
  
  // If categoryId is not provided, fetch by name only
  if (!categoryId) {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*),
        category:categories(*),
         sizes:product_sizes(*)  // ADD THIS
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
  
  // If categoryId is provided, include subcategories logic
  let categoryIds = [categoryId];

  if (includeSubcategories) {
    // Get subcategories with type assertion
    const { data: subcats } = await supabase
      .from('categories')
      .select('category_id')
      .eq('parent_category_id', categoryId)
      .returns<CategoryData[]>()
    
    if (subcats) {
      categoryIds = [...categoryIds, ...subcats.map(c => c.category_id)];
    }
  }

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*),
      category:categories(*),
       sizes:product_sizes(*)  // Make sure this is included
    `)
    .eq('is_active', true)
    .in('category_id', categoryIds)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return products as Product[]
}
// Helper to get available sizes with stock
  static getAvailableSizes(product: IProduct) {
    return AVAILABLE_SIZES.map(size => {
      const sizeData = product.sizes?.find(s => s.size_label === size.label);
      return {
        ...size,
        stock_quantity: sizeData?.stock_quantity || 0,
        available: (sizeData?.stock_quantity || 0) > 0
      };
    });
  }
static async getAllProducts(limit = 20) {
    const supabase = await createServerClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        images:product_images(*),
        category:categories(*),
         sizes:product_sizes(*)  // ADD THIS
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
        category:categories(*),
         sizes:product_sizes(*)  // ADD THIS
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

  // // Get single product by ID or SKU (server-side)
  // static async getProductBySlug(slug: string) {
  //   const supabase = await createServerClient()
    
  //   // Try to find by SKU first, then by ID
  //   let query = supabase
  //     .from('products')
  //     .select(`
  //       *,
  //       images:product_images(*),
  //       category:categories(*)
  //     `)
  //     .eq('is_active', true)

  //   // Check if slug is a number (product_id) or string (SKU)
  //   if (!isNaN(Number(slug))) {
  //     query = query.eq('product_id', parseInt(slug))
  //   } else {
  //     query = query.eq('sku', slug)
  //   }

  //   const { data: products, error } = await query.single()

  //   if (error) {
  //     console.error('Error fetching product:', error)
  //     return null
  //   }

  //   return products as Product
  // }
static async getProductBySlug(slug: string): Promise<IProduct | null> {
    const supabase = await createServerClient();
    
    // Try to find by SKU first, then by ID
    let query = supabase
      .from('products')
      .select(`
        *,
        images:product_images(*),
        category:categories(*),
         sizes:product_sizes(*)  // ADD THIS
      `)
      .eq('is_active', true);

    // Check if slug is a number (product_id) or string (SKU)
    if (!isNaN(Number(slug))) {
      query = query.eq('product_id', parseInt(slug));
    } else {
      query = query.eq('sku', slug);
    }

    const { data: product, error } = await query.single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return product as IProduct;
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
//  const { data, error } = await supabase.rpc(
//     "get_current_price",
//     { p_product_id: productId }
//   );
  if (error) {
    console.error("Error getting current price:", error);
    return null;
  }

  return data;
}



  // Check product stock
//  static async checkProductStock(productId: number, quantity = 1) {
//   const supabase = createClient()
  
//   const { data: product, error } = await supabase
//     .from("products")
//     .select("stock_quantity")
//     .eq("product_id", productId)
//     .eq("is_active", true)
//     .single<{ stock_quantity: number }>()

//   if (error || !product) {
//     console.error("Error checking stock:", error)
//     return false
//   }

//   return product.stock_quantity >= quantity
// }
// Add method to get size stock
static async getSizeStock(productId: number, sizeLabel: string): Promise<number> {
  const supabase = createClient()
  
  const { data: size, error } = await supabase
    .from('product_sizes')
    .select('stock_quantity')
    .eq('product_id', productId)
    .eq('size_label', sizeLabel)
     .single<{ stock_quantity: number }>() // Add type annotation here

  if (error || !size) {
    console.error('Error fetching size stock:', error)
    return 0
  }

  return size.stock_quantity
}
static async checkProductStock(productId: number, quantity = 1, sizeLabel?: string): Promise<boolean> {
  const supabase = createClient()
  
  if (sizeLabel) {
    // Check specific size stock
    const stock = await this.getSizeStock(productId, sizeLabel)
    return stock >= quantity
  } else {
    // Check overall product stock (sum of all sizes)
    const { data: sizes, error } = await supabase
      .from('product_sizes')
      .select('stock_quantity')
      .eq('product_id', productId)
      .returns<{ stock_quantity: number }[]>() // Add type annotation

    if (error || !sizes) {
      console.error('Error checking stock:', error)
      return false
    }

    const totalStock = sizes.reduce((sum, size) => sum + size.stock_quantity, 0)
    return totalStock >= quantity
  }
}

   // ============ INVENTORY MANAGEMENT METHODS ============

  static async updateInventoryAfterOrder(orderId: number): Promise<boolean> {
    const supabase = await createServerClient()
    
    try {
      console.log(`🔄 Updating inventory for order: ${orderId}`)
      
      const { data: orderItems, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)
        .returns<OrderItem[]>()

      if (error) {
        console.error('Error fetching order items:', error)
        return false
      }

      if (!orderItems || orderItems.length === 0) {
        console.error('No order items found for order:', orderId)
        return false
      }

      for (const item of orderItems) {
        const selectedAttributes = item.selected_attributes;
        const selectedSize = selectedAttributes && typeof selectedAttributes === 'object' && 'size' in selectedAttributes 
          ? (selectedAttributes as any).size 
          : undefined;

        // FIXED: Check for null product_id
        if (item.product_id && selectedSize && typeof selectedSize === 'string') {
          console.log(`📦 Updating inventory for product ${item.product_id}, size ${selectedSize}, quantity ${item.quantity}`)
          await this.reduceSizeStock(item.product_id, selectedSize, item.quantity)
        } else if (item.product_id) {
          console.log(`📦 Updating general inventory for product ${item.product_id}, quantity ${item.quantity}`)
          await this.reduceProductStock(item.product_id, item.quantity)
        } else {
          console.error('❌ Skipping item with null product_id:', item)
        }
      }
      
      console.log(`✅ Inventory updated successfully for order: ${orderId}`)
      return true
    } catch (error) {
      console.error('❌ Error updating inventory after order:', error)
      return false
    }
  }

  static async reduceSizeStock(productId: number, sizeLabel: string, quantity: number): Promise<boolean> {
    const supabase = await createServerClient()
    
    try {
      // FIXED: Use proper type assertion to avoid 'never' type
      const { data: sizeData, error: fetchError } = await supabase
        .from('product_sizes')
        .select('stock_quantity')
        .eq('product_id', productId)
        .eq('size_label', sizeLabel)
        .single() as { data: { stock_quantity: number | null } | null, error: any }

      if (fetchError || !sizeData) {
        console.error(`Error fetching size stock for ${sizeLabel}:`, fetchError)
        return false
      }

      // FIXED: Handle null stock_quantity properly
      const currentStock = sizeData.stock_quantity ?? 0
      const newStock = Math.max(0, currentStock - quantity)

      console.log(`Size ${sizeLabel}: ${currentStock} -> ${newStock} (reduced by ${quantity})`)

      const { error: updateError } = await supabase
        .from('product_sizes')
        .update({
          stock_quantity: newStock,
          updated_at: new Date().toISOString()
        } as never)
        .eq('product_id', productId)
        .eq('size_label', sizeLabel)

      if (updateError) {
        console.error(`Error updating size stock for ${sizeLabel}:`, updateError)
        return false
      }

      await this.updateTotalProductStock(productId)
      await this.logInventoryChange(productId, 'order_placed', -quantity, `Size: ${sizeLabel}, Order reduction`)

      return true
    } catch (error) {
      console.error('Error reducing size stock:', error)
      return false
    }
  }

  static async updateTotalProductStock(productId: number): Promise<boolean> {
    const supabase = await createServerClient()
    
    try {
      // FIXED: Use proper type assertion
      const { data: sizes, error } = await supabase
        .from('product_sizes')
        .select('stock_quantity')
        .eq('product_id', productId) as { data: { stock_quantity: number | null }[] | null, error: any }

      if (error || !sizes) {
        console.error('Error fetching sizes for total stock:', error)
        return false
      }

      const totalStock = sizes.reduce((sum, size) => sum + (size.stock_quantity ?? 0), 0)

      console.log(`Updating total stock for product ${productId}: ${totalStock}`)

      const { error: updateError } = await supabase
        .from('products')
        .update({
          stock_quantity: totalStock,
          updated_at: new Date().toISOString()
        } as never)
        .eq('product_id', productId)

      if (updateError) {
        console.error('Error updating total product stock:', updateError)
        return false
      }

      return true
    } catch (error) {
      console.error('Error updating total product stock:', error)
      return false
    }
  }

  static async reduceProductStock(productId: number, quantity: number): Promise<boolean> {
    const supabase = await createServerClient()
    
    try {
      // FIXED: Use proper type assertion
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('product_id', productId)
        .single() as { data: { stock_quantity: number | null } | null, error: any }

      if (fetchError || !product) {
        console.error('Error fetching product stock:', fetchError)
        return false
      }

      const currentStock = product.stock_quantity ?? 0
      const newStock = Math.max(0, currentStock - quantity)

      console.log(`Product ${productId}: ${currentStock} -> ${newStock} (reduced by ${quantity})`)

      const { error: updateError } = await supabase
        .from('products')
        .update({
          stock_quantity: newStock,
          updated_at: new Date().toISOString()
        } as never)
        .eq('product_id', productId)

      if (updateError) {
        console.error('Error reducing product stock:', updateError)
        return false
      }

      await this.logInventoryChange(productId, 'order_placed', -quantity, 'General stock reduction')

      return true
    } catch (error) {
      console.error('Error reducing product stock:', error)
      return false
    }
  }

  static async logInventoryChange(
    productId: number, 
    changeType: string, 
    quantityChange: number, 
    notes?: string
  ): Promise<boolean> {
    const supabase = await createServerClient()
    
    try {
      // FIXED: Use proper type assertion
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('product_id', productId)
        .single() as { data: { stock_quantity: number | null } | null, error: any }

      if (fetchError || !product) {
        console.error('Error fetching product for inventory log:', fetchError)
        return false
      }

      const currentStock = product.stock_quantity ?? 0
      const previousStock = currentStock - quantityChange

      const logData = {
        product_id: productId,
        change_type: changeType,
        quantity_change: quantityChange,
        previous_stock: previousStock,
        new_stock: currentStock,
        notes: notes,
        created_at: new Date().toISOString()
      }

      const { error: insertError } = await supabase
        .from('inventory_logs')
        .insert(logData as never)

      if (insertError) {
        console.error('Error inserting inventory log:', insertError)
        return false
      }

      console.log(`📝 Inventory log created for product ${productId}`)
      return true
    } catch (error) {
      console.error('Error logging inventory change:', error)
      return false
    }
  }

  static async restockSize(productId: number, sizeLabel: string, quantity: number): Promise<boolean> {
    const supabase = await createServerClient()
    
    try {
      // FIXED: Use proper type assertion
      const { data: sizeData, error: fetchError } = await supabase
        .from('product_sizes')
        .select('stock_quantity')
        .eq('product_id', productId)
        .eq('size_label', sizeLabel)
        .single() as { data: { stock_quantity: number | null } | null, error: any }

      if (fetchError || !sizeData) {
        console.error(`Error fetching size stock for restock:`, fetchError)
        return false
      }

      const currentStock = sizeData.stock_quantity ?? 0
      const newStock = currentStock + quantity

      const { error: updateError } = await supabase
        .from('product_sizes')
        .update({
          stock_quantity: newStock,
          updated_at: new Date().toISOString()
        } as never)
        .eq('product_id', productId)
        .eq('size_label', sizeLabel)

      if (updateError) {
        console.error(`Error restocking size ${sizeLabel}:`, updateError)
        return false
      }

      await this.updateTotalProductStock(productId)
      await this.logInventoryChange(productId, 'restock', quantity, `Size: ${sizeLabel}, Manual restock`)

      return true
    } catch (error) {
      console.error('Error restocking size:', error)
      return false
    }
  }
}