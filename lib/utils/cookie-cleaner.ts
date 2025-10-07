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
// lib/utils/cookie-cleaner.ts
export function clearSupabaseCookies() {
  if (typeof window === 'undefined') return;
  
  console.log('Clearing Supabase cookies...');
  
  // Get all cookies
  const cookies = document.cookie.split(';');
  
  cookies.forEach(cookie => {
    const [name] = cookie.split('=');
    const cookieName = name?.trim() || '';
    
    // Clear ALL cookies that might be Supabase-related
    if (cookieName.includes('supabase') || cookieName.startsWith('sb-')) {
      console.log(`Clearing cookie: ${cookieName}`);
      
      // Simple deletion - no complex domain/path combinations that can cause SecurityError
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });
  
  console.log('Cookie clearing complete');
}

// Nuclear option for emergency cleanup
export function nuclearCookieCleanup() {
  if (typeof window === 'undefined') return;
  
  console.log('🚨 NUCLEAR COOKIE CLEANUP');
  
  // Clear ALL cookies
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [name] = cookie.split('=');
    const cookieName = name?.trim() || '';
    
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
  
  // Clear all storage
  localStorage.clear();
  sessionStorage.clear();
  
  console.log('✅ ALL DATA CLEARED');
}