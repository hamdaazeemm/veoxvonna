// // components/layout/sidebar.tsx
// "use client";

// import { useSidebar } from '@/context/sidebar-context';
// import Link from 'next/link';

// export default function Sidebar() {
//   const { isSidebarOpen, closeSidebar } = useSidebar();

//   if (!isSidebarOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//         onClick={closeSidebar}
//       />
      
//       {/* Sidebar */}
//       <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto">
//         <div className="p-4">
//           <h2 className="text-lg font-semibold mb-4">Categories</h2>
//           <nav className="space-y-2">
//             <Link href="/products?category=unisex" onClick={closeSidebar} className="block p-2 hover:bg-gray-100 rounded">
//               Unisex
//             </Link>
//             <Link href="/products?category=girls" onClick={closeSidebar} className="block p-2 hover:bg-gray-100 rounded">
//               Girls
//             </Link>
//             <Link href="/products?category=boys" onClick={closeSidebar} className="block p-2 hover:bg-gray-100 rounded">
//               Boys
//             </Link>
//             <Link href="/products" onClick={closeSidebar} className="block p-2 hover:bg-gray-100 rounded">
//               All Products
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }

// components/layout/sidebar.tsx
"use client";

import { useSidebar } from '@/context/sidebar-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const pathname = usePathname();

  // Same categories structure as your shop layout
  const categories = [
    {
      name: "Unisex",
      slug: "unisex",
      subcategories: [
        { name: "Winter", slug: "unisex-winter" },
        { name: "Summer", slug: "unisex-summer" },
      ],
    },
    {
      name: "Girls",
      slug: "girls",
      subcategories: [
        { name: "Winter", slug: "girls-winter" },
        { name: "Summer", slug: "girls-summer" },
      ],
    },
    {
      name: "Boys",
      slug: "boys",
      subcategories: [
        { name: "Winter", slug: "boys-winter" },
        { name: "Summer", slug: "boys-summer" },
      ],
    },
  ];

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeSidebar}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto">
        <nav className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 px-2">
            Categories
          </h2>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.slug}>
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-3 hover:bg-gray-100 rounded-lg transition list-none">
                    <span className="font-medium text-gray-900">
                      {category.name}
                    </span>
                    <svg
                      className="w-5 h-5 transition-transform group-open:rotate-90 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </summary>
                  <ul className="ml-4 mt-1 space-y-1">
                    {category.subcategories.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={`/categories/${sub.slug}`}
                          onClick={closeSidebar}
                          className={`block p-2 pl-4 rounded-lg transition text-sm ${
                            pathname === `/categories/${sub.slug}`
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>

          {/* Additional Links */}
          <div className="mt-6 pt-4 border-t space-y-1">
            <Link
              href="/products"
              onClick={closeSidebar}
              className={`block p-3 rounded-lg transition ${
                pathname === "/products"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Products
            </Link>
            
          </div>
        </nav>
      </div>
    </>
  );
}