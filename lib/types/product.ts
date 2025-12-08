

// lib/types/product.ts
import { Database } from '@/lib/supabase/types';

// Extract types from your Supabase schema
export type ProductImage = Database['public']['Tables']['product_images']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type ProductSize = Database['public']['Tables']['product_sizes']['Row']; // Add this

// Base Product type from Supabase
export type Product = Database['public']['Tables']['products']['Row'] & {
  images?: ProductImage[];
  category?: Category;
  sizes?: ProductSize[]; // Add sizes relationship
};

// Explicit interfaces for more control
export interface IProductImage {
  image_id: number;
  product_id: number | null;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface IProductSize {
  size_id?: number;
  product_id: number;
  size_label: string;
  stock_quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface ICategory {
  category_id: number;
  name: string;
  age_range: string | null;
  description: string | null;
  is_active: boolean;
  display_order: number;
  seo_title: string | null;
  seo_description: string | null;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  product_id: number;
  name: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  is_on_sale: boolean;
  sale_start_date: string | null;
  sale_end_date: string | null;
  stock_quantity: number; // Total stock (can be calculated from sizes)
  category_id: number | null;
  attributes: any | null; // Make sure this includes sizes, colors, etc.
  is_featured: boolean;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  sku: string | null;
  weight_grams: number | null;
  parent_category_id: number | null;
  slug: string | null;
  created_by: number | null;
  created_at: string;
  updated_at: string;
  images?: IProductImage[];
  category?: ICategory;
  sizes?: IProductSize[]; // Add sizes array
}

// Types for form data and API requests
export interface ProductFormData {
  name: string;
  description: string;
  sku: string;
  category_id: number | string;
  price: number;
  sale_price: number | null;
  sale_start_date: string;
  sale_end_date: string;
  weight_grams: number | null;
  attributes: {
    sizes: string[]; // Available size labels like ['3yr', '4yr']
    colors: string[];
    material: string;
    care: string;
  };
  sizes: {
    size_label: string;
    stock_quantity: number;
  }[];
  is_active: boolean;
  is_featured: boolean;
  images: {
    url: string;
    isNew: boolean;
  }[];
}

// Type for size selection in frontend
export interface SizeOption {
  label: string;
  display: string;
  stock_quantity: number;
  available: boolean;
}

// Constants for available sizes
export const AVAILABLE_SIZES = [
  { label: '3yr', display: '3 Years' },
  { label: '4yr', display: '4 Years' },
  { label: '5yr', display: '5 Years' },
  { label: '6yr', display: '6 Years' },
  { label: '7yr', display: '7 Years' },
  { label: '8yr', display: '8 Years' }
] as const;