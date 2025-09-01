// // // // lib/supabase/server.ts

// // lib/supabase/server.ts
// import { cookies } from "next/headers";
// import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
// import type { Database } from "@/lib/supabase/types";

// export const createServerClient = async () => {
//   const cookieStore = await cookies(); // Add await here
  
//   return createSupabaseServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: any) {
//           cookieStore.set({ name, value, ...options });
//         },
//         remove(name: string, options: any) {
//           cookieStore.set({ name, value: "", ...options });
//         },
//       },
//     }
//   );
// };



// lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

export const createServerClient = async () => {
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
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // Silence the error in components, only allow in Server Actions/Route Handlers
          }
        },
      },
    }
  );
};