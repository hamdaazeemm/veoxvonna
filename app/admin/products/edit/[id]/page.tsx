// app/admin/products/edit/[id]/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import ProductForm from '@/components/admin/product/product-form'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user) redirect('/auth/login')

  const { id } = await params
  const supabase = await createServerClient()
  const { data } = await supabase
    .from('products')
    .select('*, product_images(image_url)')
    .eq('product_id', Number(id))
    .single()

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Edit Product</h1>
      <ProductForm mode="edit" initial={data} />
    </div>
  )
}


