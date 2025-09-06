// app/api/products/[slug]/route.ts


import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { ProductService } from "@/lib/services/product-service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log("Fetching product with slug:", slug); // Debug log
    
    const product = await ProductService.getProductBySlug(slug);
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error in products API:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" }, 
      { status: 500 }
    );
  }
}