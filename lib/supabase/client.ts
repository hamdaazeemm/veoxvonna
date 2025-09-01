
// // // lib/supabase/client.ts
// // import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// // import { Database } from '@/lib/supabase/types'

// // export const createClient = () => createClientComponentClient<Database>();




// // // lib/supabase/client.ts
// import { createBrowserClient } from "@supabase/ssr";
// import type { Database } from "@/lib/supabase/types";

// export const createClient = () =>
//   createBrowserClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );


// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )