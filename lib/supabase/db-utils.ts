// lib/supabase/db-utils.ts
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

type Tables = Database['public']['Tables']
// Sales Campaigns
type SalesCampaignRow = Tables['sales_campaigns']['Row']
type SalesCampaignUpdate = Tables['sales_campaigns']['Update']
type SalesCampaignInsert = Tables['sales_campaigns']['Insert']

// Products
type ProductRow = Tables['products']['Row']
type ProductUpdate = Tables['products']['Update']
type ProductInsert = Tables['products']['Insert']
export class DbUtils {
  constructor(private supabase: SupabaseClient<Database>) {}

  async insertOne<T extends keyof Tables>(
    table: T,
    data: Partial<Tables[T]['Insert']>
  ) {
    const { data: result, error } = await this.supabase
      .from(table as string)
      .insert(data as never)
      .select()
      .single()
    
    if (error) throw error
    return result as any
  }

  async insertMany<T extends keyof Tables>(
    table: T,
    data: Partial<Tables[T]['Insert']>[]
  ) {
    const { data: result, error } = await this.supabase
      .from(table as string)
      .insert(data as never)
      .select()
    
    if (error) throw error
    return result as any
  }

  async updateOne<T extends keyof Tables>(
    table: T,
    id: number,
    idColumn: string,
    data: Partial<Tables[T]['Update']>
  ) {
    const query = this.supabase
      .from(table as string)
      .update(data as never)
      .eq(idColumn, id)
      .select()
      .single()
    
    const { data: result, error } = await query
    
    if (error) throw error
    return result as any
  }

  async selectOne<T extends keyof Tables>(
    table: T,
    column: string,
    value: any
  ) {
    const { data, error } = await this.supabase
      .from(table as string)
      .select('*')
      .eq(column, value)
      .single()
    
    return { data: data as any, error }
  }
  
}