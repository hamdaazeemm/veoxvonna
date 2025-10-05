// app/admin/products/new/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import ProductForm from '@/components/admin/product/product-form'

export default async function NewProductPage() {
  const user = await getUser()
  if (!user) redirect('/auth/login')
  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Add New Product</h1>
      <ProductForm mode="create" />
    </div>
  )
}


