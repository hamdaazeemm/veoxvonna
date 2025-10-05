// // app/api/auth/clear-cookies/route.ts
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

// export async function POST() {
//   const cookieStore = cookies()
  
//   // Get all cookies
//   const allCookies = cookieStore.getAll()
  
//   // Delete all Supabase cookies
//   allCookies.forEach(cookie => {
//     if (
//       cookie.name.includes('supabase') || 
//       cookie.name.includes('sb-') ||
//       cookie.name.startsWith('sb')
//     ) {
//       cookieStore.delete(cookie.name)
//     }
//   })
  
//   return NextResponse.json({ success: true })
// }