
// // lib/utils/auth.ts
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'

// const getSupabaseClient = async () => {
//   const cookieStore =  cookies()
//   return createServerComponentClient({ cookies: () => cookieStore })
// }

// export const getSession = async () => {
//   try {
//     const supabase = await getSupabaseClient()
//     const { data: { session } } = await supabase.auth.getSession()
//     return session
//   } catch (error) {
//     console.error('Error getting session:', error)
//     return null
//   }
// }

// export const getUser = async () => {
//   try {
//     const supabase = await getSupabaseClient()
//     const { data: { user } } = await supabase.auth.getUser()
//     return user
//   } catch (error) {
//     console.error('Error getting user:', error)
//     return null
//   }
// }



// lib/utils/auth.ts - FIXED VERSION
import { createServerClient } from '@/lib/supabase/server'

export const getSession = async () => {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Session error:', error)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export const getUser = async () => {
  try {
    const supabase = await createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('User error:', error)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}
