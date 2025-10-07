
// lib/supabase/action-client.ts - FIXED VERSION
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
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, {
            ...options,
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
        },
        remove(name: string, options: any) {
          cookieStore.set(name, '', {
            ...options,
            maxAge: 0
          })
        },
      },
    }
  );
};