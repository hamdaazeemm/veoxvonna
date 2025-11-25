// lib/upload-utils.ts
import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables')
}

console.log('Supabase URL:', supabaseUrl)
console.log('Service key available:', !!supabaseServiceKey)

// Create admin client with service role key
const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey // Fallback to anon key if service key not available
)

export async function uploadProductImage(file: File): Promise<{ url: string; path: string }> {
  try {
    console.log('Starting upload process...')

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `products/${fileName}`

    console.log('Uploading file to:', filePath)

    // Upload to Supabase Storage using admin client
    const { data, error } = await supabaseAdmin.storage
      .from('products')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error details:', error)
      
      // More specific error handling
      if (error.message.includes('row-level security')) {
        throw new Error(
          'RLS policy violation. The service role key should bypass RLS. Please check your key.'
        )
      }
      
      if (error.message.includes('bucket')) {
        throw new Error('Storage bucket "products" not found or inaccessible')
      }
      
      throw new Error(`Upload failed: ${error.message}`)
    }

    if (!data) {
      throw new Error('Upload failed: No data returned')
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('products')
      .getPublicUrl(filePath)

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL')
    }

    console.log('✅ Upload successful, public URL:', urlData.publicUrl)

    return { 
      url: urlData.publicUrl,
      path: filePath
    }

  } catch (error) {
    console.error('Upload utility error:', error)
    throw error
  }
}