

// app/api/cart/[id]/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type CartItemUpdate = Database['public']['Tables']['cart_items']['Update'];

export async function PATCH(
  req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const supabase = await createServerClient();

    // Create properly typed update object
    const updateData: CartItemUpdate = {
      quantity: body.quantity,
      updated_at: new Date().toISOString() // Add updated timestamp
    };

    // Use the array syntax with type assertion
    const { data, error } = await supabase
      .from("cart_items")
      .update([updateData] as never) // ← Use array syntax with never
      .eq("cart_item_id", parseInt(params.id))
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("PATCH cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerClient(); // Add await

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_item_id", parseInt(params.id));

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}