// components/admin/products-table-client.tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

interface ProductRow {
  product_id: number
  name: string
  sku: string | null
  price: number
  sale_price: number | null
  stock_quantity: number
  is_active: boolean
  categories?: { name: string } | null
  product_images?: { image_url: string }[]
}

interface CategoryOption { category_id: number; name: string }

export default function ProductsTableClient() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<ProductRow[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])

  // filters
  const [search, setSearch] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  const query = useMemo(() => {
    const p = new URLSearchParams()
    if (search) p.set('search', search)
    if (sku) p.set('sku', sku)
    if (category) p.set('category', category)
    if (status) p.set('status', status)
    return p.toString()
  }, [search, sku, category, status])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/products${query ? `?${query}` : ''}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load products')
      setRows(data.products || [])
    } catch (e: any) {
      setError(e.message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch {}
  }

  useEffect(() => { fetchCategories() }, [])
  useEffect(() => { fetchProducts() }, [query])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error || 'Failed to delete')
      return
    }
    fetchProducts()
  }

  return (
    <div>
      <div className="mono-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input className="mono-input md:flex-1" placeholder="Search name..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <input className="mono-input md:w-56" placeholder="Search SKU..." value={sku} onChange={(e) => setSku(e.target.value)} />
          <select className="mono-select md:w-56" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.category_id} value={c.category_id}>{c.name}</option>
            ))}
          </select>
          <select className="mono-select md:w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="mono-card overflow-hidden">
        {error && (
          <div className="mono-card-header text-sm text-red-700">{error}</div>
        )}
        {loading ? (
          <div className="p-8 text-center text-gray-600">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map(p => (
                  <tr key={p.product_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {p.product_images?.[0] && (
                            <img className="h-10 w-10 rounded-full object-cover" src={p.product_images[0].image_url} alt={p.name} />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-black">{p.name}</div>
                          <div className="text-sm text-gray-600">{p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.categories?.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      Rs. {p.price.toLocaleString()}
                      {p.sale_price ? (
                        <span className="ml-2 text-gray-500 line-through">Rs. {p.sale_price.toLocaleString()}</span>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{p.stock_quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="mono-badge">{p.is_active ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/products/edit/${p.product_id}`} className="mr-3 underline underline-offset-4 text-black hover:no-underline">Edit</Link>
                      <button onClick={() => handleDelete(p.product_id)} className="text-sm text-black underline underline-offset-4 hover:no-underline">Delete</button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td className="px-6 py-12 text-center text-sm text-gray-500" colSpan={6}>No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}


