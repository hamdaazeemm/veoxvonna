// app/api/orders/[orderNumber]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'
import { ProductService } from '@/lib/services/product-service'
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;
    
    // Create a direct Supabase client for API routes (no auth needed for order lookup)
    const supabase = createClient<Database>(
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

    console.log('Fetching order:', orderNumber);

    // Add timeout to the query
    const queryPromise = supabase
      .from("orders")
      .select(`
        *,
        order_items (
          *,
          products (name, product_images (image_url))
        )
      `)
      .eq("order_number", orderNumber)
      .single();

    // Race between query and timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Query timeout')), 10000)
    );

    const { data: order, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

    if (error) {
      console.error('Error fetching order:', error);
      return NextResponse.json(
        { error: "Order not found", details: error.message },
        { status: 404 }
      );
    }

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    console.log('Order found:', order.order_id);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error in order GET:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch order",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}