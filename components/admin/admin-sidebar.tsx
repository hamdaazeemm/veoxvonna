// components/admin/admin-sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Products', href: '/admin/products', icon: '👕' },
  { name: 'Orders', href: '/admin/orders', icon: '📦' },
  { name: 'Customers', href: '/admin/customers', icon: '👥' },
  { name: 'Inventory', href: '/admin/inventory', icon: '📋' },
  { name: 'Sales', href: '/admin/sales', icon: '💰' },
  { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Veoxvonna Admin</h1>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg ${
                pathname === item.href ? 'bg-gray-800 text-white' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}