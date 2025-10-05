

// lib/supabase/server.ts
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/types'

// Safe cookie value parser
function safeParseCookieValue(value: string): string {
  if (!value) return value
  
  // If it's a base64 encoded value that starts with "base64-eyJ"
  if (value.startsWith('base64-eyJ')) {
    try {
      // Extract the base64 part (remove "base64-" prefix)
      const base64Content = value.substring(7)
      // Decode and return as string without parsing as JSON
      const decoded = atob(base64Content)
      return decoded
    } catch (error) {
      console.warn(`Failed to decode base64 cookie value: ${value.substring(0, 20)}...`)
      return ''
    }
  }
  
  return value
}

export const createServerClient = () => {
  // TEMPORARY: Return a mock client to avoid all cookie parsing issues
  // This completely bypasses Supabase SSR until the project is restored
  console.log('Using mock Supabase client to avoid cookie parsing issues during restoration')
  
  return {
    from: (table: string) => ({ 
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: [], error: null }),
      update: () => ({ data: [], error: null }),
      delete: () => ({ data: [], error: null }),
      eq: () => ({ data: [], error: null }),
      single: () => ({ data: null, error: null }),
      order: () => ({ data: [], error: null }),
      limit: () => ({ data: [], error: null }),
      gte: () => ({ data: [], error: null }),
      lt: () => ({ data: [], error: null }),
      gt: () => ({ data: [], error: null }),
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    }
  } as any
}

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
