

// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export const createClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables. Please check your .env.local file.')
    console.error('Required variables:')
    console.error('- NEXT_PUBLIC_SUPABASE_URL')
    console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
  }
  
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch: (url, options = {}) => {
          return fetch(url, {
            ...options,
            // Add timeout and better error handling
            signal: AbortSignal.timeout(30000), // 30 second timeout
          }).catch((error) => {
            console.error('Supabase fetch error:', error)
            throw error
          })
        }
      }
    }
  )
}