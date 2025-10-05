// // components/admin/admin-sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Shirt, Package, Users, ClipboardList, TrendingUp, BarChart3, Settings, User, LogOut } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Shirt },
  { name: 'Orders', href: '/admin/orders', icon: Package },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Inventory', href: '/admin/inventory', icon: ClipboardList },
  { name: 'Sales', href: '/admin/sales', icon: TrendingUp },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-gray-300 bg-white h-screen sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-300">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-black">Veoxvonna</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* User info + logout */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-black font-medium truncate">
              {user.email}
            </span>
          </div>
          <form action="/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-black px-2 py-1 rounded transition-colors duration-200 group"
            >
              <LogOut className="w-3 h-3 group-hover:text-red-600 transition-colors" />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto sidebar-scroll">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100 text-black'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-300 text-center">
        <p className="text-xs text-gray-500">Powered by Veoxvonna</p>
      </div>
    </div>
  )
}
