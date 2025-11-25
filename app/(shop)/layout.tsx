// // // app/(shop)/layout.tsx
// // import Header from "@/components/layout/header";
// // import Footer from "@/components/layout/footer";

// // export default function ShopLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <Header />
// //       <main className="flex-grow">
// //         {children}
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }



// // /
// // app/(shop)/layout.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Footer from "@/components/layout/footer";

// export default function ShopLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-40 border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {/* Sidebar Toggle - KEEP THIS */}
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 hover:bg-gray-100 rounded-lg transition"
//               aria-label="Toggle menu"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>

//             {/* Logo */}
//             <Link href="/" className="text-2xl font-bold text-gray-900">
//               VeuxVonna
//             </Link>
//           </div>

//           {/* Right side - Cart, Orders */}
//           <div className="flex items-center gap-2">
//             <Link
//               href="/orders"
//               className="hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <span className="text-sm font-medium">Orders</span>
//             </Link>
//             <Link
//               href="/cart"
//               className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                 />
//               </svg>
//               <span className="text-sm font-medium">Cart</span>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* REMOVED: Sidebar Overlay */}
//       {/* REMOVED: Sidebar Component */}

//       {/* Main Content - Full width */}
//       <main className="flex-1 min-h-[calc(100vh-73px)]">
//         {children}
//       </main>

//       <Footer />
//     </div>
//   );
// }


// // app/(shop)/layout.tsx
// import Header from "@/components/layout/header";
// import Footer from "@/components/layout/footer";

// export default function ShopLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow">
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// }



// /
// app/(shop)/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle - KEEP THIS */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-gray-900">
              VeuxVonna
            </Link>
          </div>

          {/* Right side - Cart, Orders */}
          <div className="flex items-center gap-2">
            <Link
              href="/orders"
              className="hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm font-medium">Orders</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm font-medium">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* REMOVED: Sidebar Overlay */}
      {/* REMOVED: Sidebar Component */}

      {/* Main Content - Full width */}
      <main className="flex-1 min-h-[calc(100vh-73px)]">
        {children}
      </main>

      <Footer />
    </div>
  );
}