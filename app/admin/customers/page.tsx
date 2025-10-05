// app/admin/customers/page.tsx
'use client'
import { useEffect, useState } from 'react'

interface CustomerRow {
  customer_id: number;
  name: string;
  email: string;
  phone_number: string;
  total_orders: number | null;
  total_spent: number | null;
  last_order_date: string | null;
}

export default function AdminCustomers() {
  const [user, setUser] = useState<any>(null)
  const [rows, setRows] = useState<CustomerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchEmail, setSearchEmail] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Not authenticated')
        setUser(data.user)
      } catch {
        window.location.href = '/auth/login'
      }
    }
    checkAuth()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchEmail) params.set('email', searchEmail)
      const res = await fetch(`/api/customers?${params.toString()}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load customers')
      setRows(data.customers || [])
    } catch (e: any) {
      console.error('Failed to fetch customers:', e.message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchCustomers()
  }, [user, searchEmail])

  if (!user) return <div className="p-8 text-center">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Customers</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="mono-input w-64"
          />
          <button onClick={fetchCustomers} className="mono-btn-ghost">Search</button>
        </div>
      </div>

      <div className="mono-card overflow-hidden">
        <div className="mono-card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-black">Customer List</h3>
            <span className="mono-badge">{rows.length} {rows.length === 1 ? 'customer' : 'customers'}</span>
          </div>
        </div>
        {loading && <div className="p-4 text-center text-gray-600">Loading customers...</div>}
        {!loading && rows.length === 0 && (
          <div className="p-8 text-center text-gray-500">No customers found</div>
        )}
        {!loading && rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Last Order</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((c) => (
                  <tr key={c.customer_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{c.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.phone_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{c.total_orders ?? 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">Rs. {(c.total_spent ?? 0).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.last_order_date ? new Date(c.last_order_date).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}


