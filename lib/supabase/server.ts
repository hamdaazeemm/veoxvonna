

// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

export const createServerClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      fetch: (url, options = {}) => {
        return fetch(url, {
          ...options,
          timeout: 30000, // 30 second timeout
        })
      }
    }
  })
}