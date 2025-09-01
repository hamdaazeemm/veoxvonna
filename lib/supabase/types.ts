// lib/supabase/types.ts
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          product_id: number
          name: string
          description: string | null
          price: number
          sale_price: number | null
          is_on_sale: boolean
          stock_quantity: number
          category_id: number | null
          attributes: any | null
          is_featured: boolean
          is_active: boolean
          sku: string | null
          weight_grams: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          price: number
          sale_price?: number | null
          is_on_sale?: boolean
          stock_quantity?: number
          category_id?: number | null
          attributes?: any | null
          is_featured?: boolean
          is_active?: boolean
          sku?: string | null
          weight_grams?: number | null
        }
        Update: {
          name?: string
          description?: string | null
          price?: number
          sale_price?: number | null
          is_on_sale?: boolean
          stock_quantity?: number
          category_id?: number | null
          attributes?: any | null
          is_featured?: boolean
          is_active?: boolean
          sku?: string | null
          weight_grams?: number | null
        }
      }
      categories: {
        Row: {
          category_id: number
          name: string
          age_range: string | null
          description: string | null
          is_active: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          age_range?: string | null
          description?: string | null
          is_active?: boolean
          display_order?: number
        }
        Update: {
          name?: string
          age_range?: string | null
          description?: string | null
          is_active?: boolean
          display_order?: number
        }
      }
      product_images: {
        Row: {
          image_id: number
          product_id: number
          image_url: string
          alt_text: string | null
          display_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          product_id: number
          image_url: string
          alt_text?: string | null
          display_order?: number
          is_primary?: boolean
        }
        Update: {
          product_id?: number
          image_url?: string
          alt_text?: string | null
          display_order?: number
          is_primary?: boolean
        }
      }
      cart_items: {
        Row: {
          cart_item_id: number
          customer_email: string
          customer_name: string | null
          customer_phone: string | null
          product_id: number
          quantity: number
          selected_attributes: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          customer_email: string
          customer_name?: string | null
          customer_phone?: string | null
          product_id: number
          quantity?: number
          selected_attributes?: any | null
        }
        Update: {
          customer_email?: string
          customer_name?: string | null
          customer_phone?: string | null
          product_id?: number
          quantity?: number
          selected_attributes?: any | null
          updated_at?: string
        }
      }
    
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_price: {
        Args: {
          p_product_id: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}