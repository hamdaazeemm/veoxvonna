

// app/api/cart/route.ts

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

// Create a proper type for cart items
type CartItem = Database['public']['Tables']['cart_items']['Row'];
type CartItemInsert = Database['public']['Tables']['cart_items']['Insert'];
type CartItemUpdate = Database['public']['Tables']['cart_items']['Update'];

// app/api/cart/route.ts - Fix the GET method
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        cart_item_id, 
        quantity, 
        selected_attributes,
        products (
          product_id,
          name, 
          price, 
          sale_price, 
          is_on_sale,
          product_images (image_url)
        )
      `)
      .eq("customer_email", email);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = await createServerClient(); // Add await

    if (!body.customer_email || !body.product_id) {
      return NextResponse.json(
        { error: "Email and product_id are required" }, 
        { status: 400 }
      );
    }

    // Create properly typed insert object
    const insertData: CartItemInsert = {
      customer_email: body.customer_email,
      customer_name: body.customer_name || null,
      customer_phone: body.customer_phone || null,
      product_id: body.product_id,
      quantity: body.quantity || 1,
      selected_attributes: body.selected_attributes || {},
    };

    // For upsert, we need to use the array syntax with proper typing
    const { data, error } = await supabase
      .from("cart_items")
      .upsert([insertData] as never[], { // Cast to never[] and use array syntax
        onConflict: 'customer_email,product_id,selected_attributes',
        ignoreDuplicates: false
      })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}