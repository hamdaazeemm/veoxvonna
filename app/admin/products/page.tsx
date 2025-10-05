// app/admin/products/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ProductsTableClient from '@/components/admin/products-table-client'

export default async function AdminProducts() {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Products Management</h1>
        <Link href="/admin/products/new" className="mono-btn">Add New Product</Link>
      </div>

      <ProductsTableClient />
    </div>
  )
}