// app/admin/inventory/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

interface ProductRow {
  product_id: number;
  name: string;
  sku: string | null;
  stock_quantity: number | null;
  price: number;
}

export default async function AdminInventory() {
  const user = await getUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('product_id,name,sku,stock_quantity,price')
    .order('stock_quantity', { ascending: true })
    .limit(100)

  const rows = (products as ProductRow[] | null) || []

  const lowStock = rows.filter(p => (p.stock_quantity ?? 0) > 0 && (p.stock_quantity ?? 0) < 5).length
  const outOfStock = rows.filter(p => (p.stock_quantity ?? 0) <= 0).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Inventory</h1>
        <div className="flex gap-2">
          <span className="mono-badge">Low stock: {lowStock}</span>
          <span className="mono-badge">Out of stock: {outOfStock}</span>
        </div>
      </div>

      <div className="mono-card overflow-hidden">
        <div className="mono-card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-black">Stock Overview</h3>
            <span className="mono-badge">{rows.length} products</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((p) => {
                const qty = p.stock_quantity ?? 0
                const status = qty <= 0 ? 'Out of stock' : qty < 5 ? 'Low' : 'OK'
                return (
                  <tr key={p.product_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.sku || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">Rs. {p.price.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{qty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="mono-badge">{status}</span>
                    </td>
                  </tr>
                )
              })}
              {rows.length === 0 && (
                <tr>
                  <td className="px-6 py-12 text-center text-sm text-gray-500" colSpan={5}>No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


