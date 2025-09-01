// app/api/products/route.ts

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { ProductService } from "@/lib/services/product-service";
export async function GET() {
  try {
    const products = await ProductService.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" }, 
      { status: 500 }
    );
  }
}