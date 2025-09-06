import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // Create a direct Supabase client for API routes
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    )
    
    // Add timeout to the query
    const queryPromise = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    // Race between query and timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Query timeout')), 15000)
    )

    const { data: orders, error } = await Promise.race([queryPromise, timeoutPromise]) as any

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          error: 'Database connection failed', 
          details: error.message,
          orders: [] // Return empty array as fallback
        },
        { status: 200 } // Return 200 with error message instead of 500
      )
    }

    return NextResponse.json({ orders: orders || [] })
  } catch (error) {
    console.error('API error:', error)
    
    // Return empty orders array instead of error to prevent UI breaking
    return NextResponse.json({ 
      orders: [],
      error: 'Connection timeout - showing empty results',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
