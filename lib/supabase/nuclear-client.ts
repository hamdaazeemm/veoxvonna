// lib/supabase/nuclear-client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

class NuclearAuthClient {
  private supabase: any;
  
  constructor() {
    this.supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          // DISABLE all automatic session handling
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        global: {
          fetch: (url, options = {}) => {
            // Intercept ALL requests to prevent cookie setting
            return fetch(url, {
              ...options,
              credentials: 'omit', // Don't send or receive cookies
            }).then(response => {
              // Clone response to avoid mutation
              return response.clone();
            });
          }
        }
      }
    );
  }

  async signInWithPassword(email: string, password: string) {
    // Manual fetch to Supabase auth endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL!}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({ email, password }),
      credentials: 'omit', // CRITICAL: No cookies
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, error };
    }

    const data = await response.json();
    
    // MANUALLY store the session in localStorage ONLY
    if (data.access_token) {
      localStorage.setItem('sb-nuclear-session', JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: Date.now() + (data.expires_in * 1000),
        user: data.user
      }));
      
      console.log('✅ Session stored in localStorage - NO COOKIES');
    }
    
    return { data, error: null };
  }

  getSession() {
    // Get session from localStorage only
    const sessionStr = localStorage.getItem('sb-nuclear-session');
    if (!sessionStr) return { data: { session: null }, error: null };
    
    try {
      const sessionData = JSON.parse(sessionStr);
      return { 
        data: { 
          session: {
            access_token: sessionData.access_token,
            refresh_token: sessionData.refresh_token,
            user: sessionData.user
          }
        }, 
        error: null 
      };
    } catch {
      return { data: { session: null }, error: null };
    }
  }

  signOut() {
    localStorage.removeItem('sb-nuclear-session');
    return { error: null };
  }
}

export const createNuclearClient = () => {
  return new NuclearAuthClient();
};