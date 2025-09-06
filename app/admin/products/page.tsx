// app/admin/products/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import ProductsTable from '@/components/admin/products-table'

export default async function AdminProducts() {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add New Product
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option value="">All Categories</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
            <option value="unisex">Unisex</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {/* Products Table */}
      <ProductsTable />
    </div>
  )
}