// Script to check Supabase connection
const { createClient } = require('@supabase/supabase-js')

async function checkConnection() {
  console.log('🔍 Checking Supabase connection...')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    console.log('Please check your .env.local file')
    return
  }
  
  console.log('✅ Environment variables found')
  console.log('URL:', supabaseUrl)
  console.log('Key:', supabaseKey.substring(0, 20) + '...')
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    })
    
    console.log('🔄 Testing database connection...')
    
    // Test a simple query
    const { data, error } = await supabase
      .from('orders')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Database query failed:', error.message)
    } else {
      console.log('✅ Database connection successful')
    }
    
    // Test auth connection
    console.log('🔄 Testing auth connection...')
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.error('❌ Auth connection failed:', authError.message)
    } else {
      console.log('✅ Auth connection successful')
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    
    if (error.message.includes('timeout')) {
      console.log('\n💡 Timeout suggestions:')
      console.log('1. Check your internet connection')
      console.log('2. Verify Supabase project is running')
      console.log('3. Check if there are any firewall restrictions')
      console.log('4. Try using a different network')
    }
  }
}

checkConnection()
