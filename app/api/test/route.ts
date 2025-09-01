// app/api/test/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function GET() {
  const supabase = createClient();

  // Just try to fetch 1 product row
  const { data, error } = await supabase.from("products").select("*").limit(1);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
