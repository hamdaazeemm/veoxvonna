// lib/supabase/action-client.ts
import { cookies } from "next/headers";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

export const createActionClient = async () => {
  const cookieStore = await cookies();
  
  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Use the new getAll() method
        getAll() {
          return cookieStore.getAll();
        },
        // Use the new setAll() method
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
};