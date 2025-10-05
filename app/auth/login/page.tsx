//app/auth/login/page.tsx
import LoginClient from './LoginClient'
import { AuthErrorBoundary } from '@/components/auth/error-boundary'

export default function LoginPage() {
  return (
    <AuthErrorBoundary>
      <LoginClient />
    </AuthErrorBoundary>
  )
}








// // // lib/supabase/server.ts
// // import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
// // import { cookies } from 'next/headers'
// // import type { Database } from '@/lib/supabase/types'

// // // Safe cookie value parser
// // function safeParseCookieValue(value: string): string {
// //   if (!value) return value
  
// //   // If it's a base64 encoded value that starts with "base64-eyJ"
// //   if (value.startsWith('base64-eyJ')) {
// //     try {
// //       // Extract the base64 part (remove "base64-" prefix)
// //       const base64Content = value.substring(7)
// //       // Decode and return as string without parsing as JSON
// //       const decoded = atob(base64Content)
// //       return decoded
// //     } catch (error) {
// //       console.warn(`Failed to decode base64 cookie value: ${value.substring(0, 20)}...`)
// //       return ''
// //     }
// //   }
  
// //   return value
// // }

// // export const createServerClient = () => {
// //   // TEMPORARY: Return a mock client to avoid all cookie parsing issues
// //   // This completely bypasses Supabase SSR until the project is restored
// //   console.log('Using mock Supabase client to avoid cookie parsing issues during restoration')
  
// //   return {
// //     from: (table: string) => ({ 
// //       select: () => ({ data: [], error: null }),
// //       insert: () => ({ data: [], error: null }),
// //       update: () => ({ data: [], error: null }),
// //       delete: () => ({ data: [], error: null }),
// //       eq: () => ({ data: [], error: null }),
// //       single: () => ({ data: null, error: null }),
// //       order: () => ({ data: [], error: null }),
// //       limit: () => ({ data: [], error: null }),
// //       gte: () => ({ data: [], error: null }),
// //       lt: () => ({ data: [], error: null }),
// //       gt: () => ({ data: [], error: null }),
// //     }),
// //     auth: {
// //       getUser: () => Promise.resolve({ data: { user: null }, error: null }),
// //       getSession: () => Promise.resolve({ data: { session: null }, error: null }),
// //       signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
// //       signOut: () => Promise.resolve({ error: null }),
// //     }
// //   } as any
// // }

// // lib/supabase/server.ts
// import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'
// import type { Database } from '@/lib/supabase/types'

// // Safe cookie value parser
// function safeParseCookieValue(value: string): string {
//   if (!value) return value
  
//   // If it's a base64 encoded value that starts with "base64-eyJ"
//   if (value.startsWith('base64-eyJ')) {
//     try {
//       // Extract the base64 part (remove "base64-" prefix)
//       const base64Content = value.substring(7)
//       // Decode and return as string without parsing as JSON
//       const decoded = atob(base64Content)
//       return decoded
//     } catch (error) {
//       console.warn(`Failed to decode base64 cookie value: ${value.substring(0, 20)}...`)
//       return ''
//     }
//   }
  
//   return value
// }

// export const createServerClient = async () => {
//   const cookieStore = await cookies()  // <-- ADD await here

//   try {
//     console.log('Creating real Supabase server client')
    
//     return createSupabaseServerClient<Database>(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           get(name: string) {
//             try {
//               const cookie = cookieStore.get(name)
//               if (!cookie?.value) return undefined
              
//               // Parse and clean the cookie value
//               const cleanValue = safeParseCookieValue(cookie.value)
//               return cleanValue || undefined
//             } catch (error) {
//               console.warn(`Failed to get cookie ${name}:`, error)
//               return undefined
//             }
//           },
//           set(name: string, value: string, options: any) {
//             try {
//               cookieStore.set({ name, value, ...options })
//             } catch (error) {
//               console.warn(`Failed to set cookie ${name}:`, error)
//               // Ignore error in server component
//             }
//           },
//           remove(name: string, options: any) {
//             try {
//               cookieStore.set({ name, value: '', ...options, maxAge: 0 })
//             } catch (error) {
//               console.warn(`Failed to remove cookie ${name}:`, error)
//               // Ignore error in server component
//             }
//           },
//         },
//       }
//     )
//   } catch (error) {
//     console.error('Fatal error creating Supabase server client:', error)
//     // Only return mock client if there's a fatal error
//     return {
//       from: (table: string) => ({ 
//         select: () => Promise.resolve({ data: [], error: null }),
//         insert: () => Promise.resolve({ data: [], error: null }),
//         update: () => Promise.resolve({ data: [], error: null }),
//         delete: () => Promise.resolve({ data: [], error: null }),
//       }),
//       auth: {
//         getUser: () => Promise.resolve({ data: { user: null }, error: null }),
//         getSession: () => Promise.resolve({ data: { session: null }, error: null }),
//       }
//     } as any
//   }
// }