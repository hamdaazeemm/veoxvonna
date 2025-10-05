// // 
// // components/admin/quick-actions.tsx
// import Link from 'next/link'
// import { Plus, PackageCheck, ClipboardList, BarChart3 } from 'lucide-react'

// export default function QuickActions() {
//   const actions = [
//     {
//       title: 'Add Product',
//       href: '/admin/products/new',
//       icon: Plus,
//       gradient: 'from-blue-500 to-blue-600',
//       description: 'Create new listing',
//     },
//     {
//       title: 'Process Orders',
//       href: '/admin/orders?status=pending',
//       icon: PackageCheck,
//       gradient: 'from-emerald-500 to-emerald-600',
//       description: 'Review pending',
//     },
//     {
//       title: 'Inventory',
//       href: '/admin/inventory',
//       icon: ClipboardList,
//       gradient: 'from-amber-500 to-amber-600',
//       description: 'Stock alerts',
//     },
//     {
//       title: 'Analytics',
//       href: '/admin/analytics',
//       icon: BarChart3,
//       gradient: 'from-purple-500 to-purple-600',
//       description: 'Sales performance',
//     },
//   ]

//   return (
//     <div className="flex flex-wrap gap-4 mb-8 justify-center">
//       {actions.map(({ title, href, icon: Icon, gradient, description }) => (
//         <Link
//           key={title}
//           href={href}
//           className="group relative bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 min-w-[250px] max-w-[280px]"
//         >
//           {/* Icon with gradient background */}
//           <div className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 mx-auto`}>
//             <Icon className="w-7 h-7 text-white" />
//           </div>
          
//           {/* Content */}
//           <div className="text-center">
//             <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
//             <p className="text-sm text-gray-600">{description}</p>
//           </div>
          
//           {/* Hover effect */}
//           <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-transparent group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300" />
//         </Link>
//       ))}
//     </div>
//   )
// }
// components/admin/quick-actions.tsx
import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    {
      title: 'Add Product',
      href: '/admin/products/new',
    },
    {
      title: 'Process Orders',
      href: '/admin/orders?status=pending',
    },
    {
      title: 'Inventory',
      href: '/admin/inventory',
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
    },
  ]

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {actions.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          className="bg-black text-white rounded-xl px-6 py-4 font-semibold text-base transition-all duration-200 hover:bg-gray-900 hover:scale-105 hover:shadow-xl flex-1 min-w-[200px] text-center border border-gray-800"
        >
          {title}
        </Link>
      ))}
    </div>
  )
}