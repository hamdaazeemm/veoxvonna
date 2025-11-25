

// lib/supabase/types.ts - COMPLETE REGENERATED VERSION
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_id: number
          customer_id: number | null
          full_name: string
          phone_number: string
          whatsapp_number: string | null
          address_line_1: string
          address_line_2: string | null
          area: string | null
          city: string
          province: string | null
          postal_code: string | null
          country: string
          address_type: string
          is_default: boolean
          delivery_instructions: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          address_id?: number
          customer_id?: number | null
          full_name: string
          phone_number: string
          whatsapp_number?: string | null
          address_line_1: string
          address_line_2?: string | null
          area?: string | null
          city: string
          province?: string | null
          postal_code?: string | null
          country?: string
          address_type?: string
          is_default?: boolean
          delivery_instructions?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          address_id?: number
          customer_id?: number | null
          full_name?: string
          phone_number?: string
          whatsapp_number?: string | null
          address_line_1?: string
          address_line_2?: string | null
          area?: string | null
          city?: string
          province?: string | null
          postal_code?: string | null
          country?: string
          address_type?: string
          is_default?: boolean
          delivery_instructions?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          cart_item_id: number
          customer_email: string
          customer_name: string | null
          customer_phone: string | null
          product_id: number | null
          quantity: number
          selected_attributes: Json | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          cart_item_id?: number
          customer_email: string
          customer_name?: string | null
          customer_phone?: string | null
          product_id?: number | null
          quantity?: number
          selected_attributes?: Json | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          cart_item_id?: number
          customer_email?: string
          customer_name?: string | null
          customer_phone?: string | null
          product_id?: number | null
          quantity?: number
          selected_attributes?: Json | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
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
          seo_title: string | null
          seo_description: string | null
          created_by: number | null
          updated_by: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          category_id?: number
          name: string
          age_range?: string | null
          description?: string | null
          is_active?: boolean
          display_order?: number
          seo_title?: string | null
          seo_description?: string | null
          created_by?: number | null
          updated_by?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          category_id?: number
          name?: string
          age_range?: string | null
          description?: string | null
          is_active?: boolean
          display_order?: number
          seo_title?: string | null
          seo_description?: string | null
          created_by?: number | null
          updated_by?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      coupons: {
        Row: {
          coupon_id: number
          code: string
          description: string | null
          discount_type: string
          discount_value: number
          minimum_order_amount: number
          maximum_discount_amount: number | null
          usage_limit: number | null
          used_count: number
          is_active: boolean
          valid_from: string | null
          valid_until: string | null
          first_time_customer_only: boolean
          created_by: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          coupon_id?: number
          code: string
          description?: string | null
          discount_type: string
          discount_value: number
          minimum_order_amount?: number
          maximum_discount_amount?: number | null
          usage_limit?: number | null
          used_count?: number
          is_active?: boolean
          valid_from?: string | null
          valid_until?: string | null
          first_time_customer_only?: boolean
          created_by?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          coupon_id?: number
          code?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          minimum_order_amount?: number
          maximum_discount_amount?: number | null
          usage_limit?: number | null
          used_count?: number
          is_active?: boolean
          valid_from?: string | null
          valid_until?: string | null
          first_time_customer_only?: boolean
          created_by?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          customer_id: number
          name: string
          email: string
          phone_number: string
          whatsapp_number: string | null
          preferred_language: string
          total_orders: number
          total_spent: number
          first_order_date: string | null
          last_order_date: string | null
          customer_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          customer_id?: number
          name: string
          email: string
          phone_number: string
          whatsapp_number?: string | null
          preferred_language?: string
          total_orders?: number
          total_spent?: number
          first_order_date?: string | null
          last_order_date?: string | null
          customer_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          customer_id?: number
          name?: string
          email?: string
          phone_number?: string
          whatsapp_number?: string | null
          preferred_language?: string
          total_orders?: number
          total_spent?: number
          first_order_date?: string | null
          last_order_date?: string | null
          customer_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      inventory_logs: {
        Row: {
          log_id: number
          product_id: number | null
          change_type: string
          quantity_change: number
          previous_stock: number
          new_stock: number
          order_id: number | null
          notes: string | null
          created_by: number | null
          created_at: string
        }
        Insert: {
          log_id?: number
          product_id?: number | null
          change_type: string
          quantity_change: number
          previous_stock: number
          new_stock: number
          order_id?: number | null
          notes?: string | null
          created_by?: number | null
          created_at?: string
        }
        Update: {
          log_id?: number
          product_id?: number | null
          change_type?: string
          quantity_change?: number
          previous_stock?: number
          new_stock?: number
          order_id?: number | null
          notes?: string | null
          created_by?: number | null
          created_at?: string
        }
      }
      order_coupons: {
        Row: {
          order_id: number
          coupon_id: number
          discount_applied: number
          created_at: string
        }
        Insert: {
          order_id: number
          coupon_id: number
          discount_applied: number
          created_at?: string
        }
        Update: {
          order_id?: number
          coupon_id?: number
          discount_applied?: number
          created_at?: string
        }
      }
      order_items: {
        Row: {
          order_item_id: number
          order_id: number | null
          product_id: number | null
          product_name: string
          quantity: number
          unit_price: number
          total_price: number
          selected_attributes: Json | null
          created_at: string
        }
        Insert: {
          order_item_id?: number
          order_id?: number | null
          product_id?: number | null
          product_name: string
          quantity: number
          unit_price: number
          total_price: number
          selected_attributes?: Json | null
          created_at?: string
        }
        Update: {
          order_item_id?: number
          order_id?: number | null
          product_id?: number | null
          product_name?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          selected_attributes?: Json | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          order_id: number
          order_number: string | null
          customer_id: number | null
          customer_name: string
          customer_email: string
          customer_phone: string
          customer_whatsapp: string | null
          total_amount: number
          discount_amount: number
          delivery_charges: number
          final_amount: number
          status: string
          payment_method: string | null
          payment_status: string
          delivery_address_id: number | null
          delivery_address_backup: Json | null
          courier_service: string | null
          tracking_number: string | null
          expected_delivery_date: string | null
          delivered_at: string | null
          notes: string | null
          admin_notes: string | null
          session_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          order_id?: number
          order_number?: string | null
          customer_id?: number | null
          customer_name: string
          customer_email: string
          customer_phone: string
          customer_whatsapp?: string | null
          total_amount: number
          discount_amount?: number
          delivery_charges?: number
          final_amount: number
          status?: string
          payment_method?: string | null
          payment_status?: string
          delivery_address_id?: number | null
          delivery_address_backup?: Json | null
          courier_service?: string | null
          tracking_number?: string | null
          expected_delivery_date?: string | null
          delivered_at?: string | null
          notes?: string | null
          admin_notes?: string | null
          session_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          order_id?: number
          order_number?: string | null
          customer_id?: number | null
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          customer_whatsapp?: string | null
          total_amount?: number
          discount_amount?: number
          delivery_charges?: number
          final_amount?: number
          status?: string
          payment_method?: string | null
          payment_status?: string
          delivery_address_id?: number | null
          delivery_address_backup?: Json | null
          courier_service?: string | null
          tracking_number?: string | null
          expected_delivery_date?: string | null
          delivered_at?: string | null
          notes?: string | null
          admin_notes?: string | null
          session_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          image_id: number
          product_id: number | null
          image_url: string
          alt_text: string | null
          display_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          image_id?: number
          product_id?: number | null
          image_url: string
          alt_text?: string | null
          display_order?: number
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          image_id?: number
          product_id?: number | null
          image_url?: string
          alt_text?: string | null
          display_order?: number
          is_primary?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          product_id: number
          name: string
          description: string | null
          price: number
          sale_price: number | null
          is_on_sale: boolean
          sale_start_date: string | null
          sale_end_date: string | null
          stock_quantity: number
          category_id: number | null
          attributes: Json | null
          is_featured: boolean
          is_active: boolean
          seo_title: string | null
          seo_description: string | null
          sku: string | null
          weight_grams: number | null
          parent_category_id: number | null  // ADD THIS
           slug: string | null  // ADD THIS (optional)
          created_by: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          product_id?: number
          name: string
          description?: string | null
          price: number
          sale_price?: number | null
          is_on_sale?: boolean
          sale_start_date?: string | null
          sale_end_date?: string | null
          stock_quantity?: number
          category_id?: number | null
          attributes?: Json | null
          is_featured?: boolean
          is_active?: boolean
          seo_title?: string | null
          seo_description?: string | null
          sku?: string | null
          weight_grams?: number | null
           parent_category_id: number | null  // ADD THIS
           slug: string | null  // ADD THIS (optional)
          created_by?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          product_id?: number
          name?: string
          description?: string | null
          price?: number
          sale_price?: number | null
          is_on_sale?: boolean
          sale_start_date?: string | null
          sale_end_date?: string | null
          stock_quantity?: number
          category_id?: number | null
          attributes?: Json | null
          is_featured?: boolean
          is_active?: boolean
          seo_title?: string | null
          seo_description?: string | null
          sku?: string | null
          weight_grams?: number | null
           parent_category_id: number | null  // ADD THIS
           slug: string | null  // ADD THIS (optional)
          created_by?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: number
          title: string
          video_url: string
          thumbnail_url: string | null
          is_active: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          video_url: string
          thumbnail_url?: string | null
          is_active?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          video_url?: string
          thumbnail_url?: string | null
          is_active?: boolean
          display_order?: number
          created_at?: string
        }
      }
      product_sizes: {
        Row: {
          size_id: number;
          product_id: number;
          size_label: string;
          stock_quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          size_id?: number;
          product_id: number;
          size_label: string;
          stock_quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          size_id?: number;
          product_id?: number;
          size_label?: string;
          stock_quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}