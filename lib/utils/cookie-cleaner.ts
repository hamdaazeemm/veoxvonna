// // Utility to help clean malformed Supabase cookies
// export function clearSupabaseCookies() {
//   if (typeof window === 'undefined') return
  
//   // List of Supabase cookie names that might be malformed
//   const supabaseCookieNames = [
//     'sb-access-token',
//     'sb-refresh-token',
//     'supabase-auth-token',
//     'supabase.auth.token'
//   ]
  
//   // Clear all cookies that start with common Supabase prefixes
//   document.cookie.split(';').forEach(cookie => {
//     const [name, value] = cookie.split('=')
//     const trimmedName = name.trim()
//     const trimmedValue = value ? value.trim() : ''
    
//     // Check if it's a Supabase-related cookie or starts with sb-
//     if (supabaseCookieNames.some(sbName => trimmedName.includes(sbName)) || 
//         trimmedName.startsWith('sb-') ||
//         trimmedName.includes('supabase') ||
//         trimmedValue.startsWith('base64-eyJ')) {
      
//       console.log(`Clearing potentially malformed cookie: ${trimmedName}`)
      
//       // Clear the cookie by setting it to expire in the past
//       document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost`
//       document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
//       document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.localhost`
//     }
//   })
// }

// export function safeJsonParse(value: string): any {
//   try {
//     // If it starts with "base64-", try to decode it first
//     if (value.startsWith('base64-')) {
//       const base64Content = value.substring(7) // Remove "base64-" prefix
//       try {
//         const decoded = atob(base64Content)
//         return JSON.parse(decoded)
//       } catch {
//         console.warn('Failed to decode base64 cookie value:', value.substring(0, 20) + '...')
//         return null
//       }
//     }
    
//     // Try parsing as regular JSON
//     return JSON.parse(value)
//   } catch {
//     console.warn('Failed to parse cookie value as JSON:', value.substring(0, 20) + '...')
//     return null
//   }
// }


// lib/utils/cookie-cleaner.ts

// Utility to help clean malformed Supabase cookies
export function clearSupabaseCookies() {
  if (typeof window === 'undefined') return
  
  console.log('Clearing Supabase cookies...')
  
  // List of Supabase cookie names that might be malformed
  const supabaseCookieNames = [
    'sb-access-token',
    'sb-refresh-token',
    'supabase-auth-token',
    'supabase.auth.token'
  ]
  
  const cookies = document.cookie.split(';')
  
  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=')
    const trimmedName = name?.trim() || ''
    const trimmedValue = value?.trim() || ''
    
    // Check if it's a Supabase-related cookie
    const isSupabaseCookie = 
      supabaseCookieNames.some(sbName => trimmedName.includes(sbName)) ||
      trimmedName.startsWith('sb-') ||
      trimmedName.includes('supabase') ||
      trimmedName.includes('auth-token') ||
      trimmedValue.startsWith('base64-eyJ')
    
    if (isSupabaseCookie) {
      console.log(`Clearing potentially malformed cookie: ${trimmedName}`)
      
      // Get hostname for domain variations
      const hostname = window.location.hostname
      const domains = [
        '',
        hostname,
        `.${hostname}`,
        // Handle localhost specially
        hostname === 'localhost' ? 'localhost' : `.${hostname.split('.').slice(-2).join('.')}`
      ]
      
      const paths = ['/', '/auth', '/admin', '/api']
      
      // Clear cookie with all domain/path combinations
      domains.forEach(domain => {
        paths.forEach(path => {
          const domainPart = domain ? `; domain=${domain}` : ''
          
          // Try multiple expiration formats
          document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}${domainPart}`
          document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainPart}`
          document.cookie = `${trimmedName}=; expires=${new Date(0).toUTCString()}; path=${path}${domainPart}`
          
          // Also try with SameSite attributes
          document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}${domainPart}; SameSite=Lax`
          document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}${domainPart}; SameSite=None; Secure`
        })
      })
    }
  })
  
  console.log('Cookie clearing complete')
}

// Additional utility functions

// Safe JSON parser with base64 support
export function safeJsonParse(value: string): any {
  try {
    // If it starts with "base64-", try to decode it first
    if (value.startsWith('base64-')) {
      const base64Content = value.substring(7) // Remove "base64-" prefix
      try {
        const decoded = atob(base64Content)
        return JSON.parse(decoded)
      } catch {
        console.warn('Failed to decode base64 cookie value:', value.substring(0, 20) + '...')
        return null
      }
    }
    
    // Try parsing as regular JSON
    return JSON.parse(value)
  } catch {
    console.warn('Failed to parse cookie value as JSON:', value.substring(0, 20) + '...')
    return null
  }
}

// Additional utility to check for problematic cookies
export function checkForMalformedCookies(): string[] {
  if (typeof document === 'undefined') return []
  
  const malformedCookies: string[] = []
  const cookies = document.cookie.split(';')
  
  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=').map(s => s.trim())
    
    // Check if it's a Supabase cookie with base64 format issue
    if (name && (name.includes('supabase') || name.startsWith('sb'))) {
      if (value && value.startsWith('base64-')) {
        malformedCookies.push(name)
        console.warn('Found malformed cookie:', name)
      }
    }
  })
  
  return malformedCookies
}

// Utility to clear all cookies (nuclear option)
export function clearAllCookies() {
  if (typeof document === 'undefined') return
  
  console.log('Clearing ALL cookies...')
  
  const cookies = document.cookie.split(';')
  
  cookies.forEach(cookie => {
    const [name] = cookie.split('=')
    const trimmedName = name.trim()
    
    const hostname = window.location.hostname
    const domains = ['', hostname, `.${hostname}`]
    const paths = ['/', '/auth', '/admin', '/api']
    
    domains.forEach(domain => {
      paths.forEach(path => {
        const domainPart = domain ? `; domain=${domain}` : ''
        document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainPart}`
      })
    })
  })
  
  console.log('All cookies cleared')
}