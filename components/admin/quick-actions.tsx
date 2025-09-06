// components/admin/quick-actions.tsx - NEW
import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    { 
      title: 'Add New Product', 
      href: '/admin/products/new', 
      icon: '➕',
      description: 'Create a new product listing'
    },
    { 
      title: 'Process Orders', 
      href: '/admin/orders?status=pending', 
      icon: '📦',
      description: 'Review pending orders'
    },
    { 
      title: 'Check Inventory', 
      href: '/admin/inventory', 
      icon: '📋',
      description: 'View low stock alerts'
    },
    { 
      title: 'View Analytics', 
      href: '/admin/analytics', 
      icon: '📊',
      description: 'See sales performance'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {actions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border border-gray-100"
        >
          <div className="text-2xl mb-2">{action.icon}</div>
          <h3 className="font-semibold mb-1">{action.title}</h3>
          <p className="text-sm text-gray-600">{action.description}</p>
        </Link>
      ))}
    </div>
  )
}