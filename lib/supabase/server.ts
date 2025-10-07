

// // lib/supabase/server.ts 
// import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'
// import type { Database } from '@/lib/supabase/types'

// export const createServerClient = async () => {
//   const cookieStore = await cookies()

//   try {
//     return createSupabaseServerClient<Database>(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           get(name: string) {
//             // Simple cookie get - no complex parsing
//             return cookieStore.get(name)?.value
//           },
//           set(name: string, value: string, options: any) {
//             try {
//               cookieStore.set({ 
//                 name, 
//                 value, 
//                 ...options,
//                 sameSite: 'lax',
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//               })
//             } catch (error) {
//               // Ignore error in server component
//             }
//           },
//           remove(name: string, options: any) {
//             try {
//               cookieStore.set({ 
//                 name, 
//                 value: '', 
//                 ...options,
//                 maxAge: 0 
//               })
//             } catch (error) {
//               // Ignore error in server component
//             }
//           },
//         },
//       }
//     )
//   } catch (error) {
//     console.error('Error creating Supabase server client:', error)
//     throw error // Don't return mock - let it fail properly
//   }
// }

// lib/supabase/server.ts - FIXED WITH EXPLICIT RETURN TYPE
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/types'

export const createServerClient = async (): Promise<SupabaseClient<Database>> => {
  const cookieStore = await cookies()

  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ 
              name, 
              value, 
              ...options,
              sameSite: 'lax',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            })
          } catch (error) {
            // Ignore error in server component
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ 
              name, 
              value: '', 
              ...options,
              maxAge: 0 
            })
          } catch (error) {
            // Ignore error in server component
          }
        },
      },
    }
  )
}