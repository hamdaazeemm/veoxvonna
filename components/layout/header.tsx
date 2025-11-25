

// // components/layout/header.tsx
// "use client";

// import CartIcon from "@/components/cart/cart-icon";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSidebar } from "@/context/sidebar-context";

// export default function Header() {
//   const pathname = usePathname();
//   const isHomePage = pathname === "/" || pathname === "/dashboard";
//    const { toggleSidebar } = useSidebar(); // Now this is properly defined


//   return (
//     <header className={`flex justify-between items-center p-4 fixed top-0 w-full z-50 transition-all duration-300 ${
//       isHomePage 
//         ? "bg-transparent text-white" 
//         : "bg-black text-white shadow-md"
//     }`}>
//       <div className="flex items-center gap-4">
//         {/* Sidebar Toggle Button */}
//         <button
//           onClick={toggleSidebar}
//           className={`p-2 rounded-lg transition ${
//             isHomePage 
//               ? "hover:bg-white/20 text-white" 
//               : "hover:bg-gray-800 text-white"
//           }`}
//           aria-label="Toggle menu"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>

//         <Link href="/" className="text-2xl font-bold">
//           Veoxvonna
//         </Link>
//       </div>
//       {/* <Link href="/" className="text-2xl font-bold">
//         Veoxvonna
//       </Link> */}
//       <div className="flex items-center space-x-6">
//         <nav className="hidden md:flex space-x-4">
//           <Link 
//             href="/products?category=unisex" 
//             className={`text-sm font-medium transition-colors ${
//               isHomePage ? "text-white hover:text-gray-300" : "text-gray-300 hover:text-white"
//             }`}
//           >
//             Unisex
//           </Link>
//           <Link 
//             href="/products?category=girls" 
//             className={`text-sm font-medium transition-colors ${
//               isHomePage ? "text-white hover:text-gray-300" : "text-gray-300 hover:text-white"
//             }`}
//           >
//             Girls
//           </Link>
//           <Link 
//             href="/products?category=boys" 
//             className={`text-sm font-medium transition-colors ${
//               isHomePage ? "text-white hover:text-gray-300" : "text-gray-300 hover:text-white"
//             }`}
//           >
//             Boys
//           </Link>
//         </nav>
//         <div className={isHomePage ? "text-white" : "text-white"}>
//           <CartIcon />
//         </div>
//       </div>
//     </header>
//   );
// }

// components/layout/header.tsx
"use client";

import CartIcon from "@/components/cart/cart-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/dashboard";
  const { toggleSidebar } = useSidebar();

  return (
    <header className={`flex justify-between items-center p-4 fixed top-0 w-full z-50 transition-all duration-300 ${
      isHomePage 
        ? "bg-transparent text-white" 
        : "bg-white text-gray-900 shadow-md"  // Changed to white background with black text
    }`}>
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg transition ${
            isHomePage 
              ? "hover:bg-white/20 text-white" 
              : "hover:bg-gray-100 text-gray-900"  // Changed hover and text color for non-homepage
          }`}
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

        <Link href="/" className="text-2xl font-bold">
          Veoxvonna
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex space-x-4">
          <Link 
            href="/products?category=unisex" 
            className={`text-sm font-medium transition-colors ${
              isHomePage 
                ? "text-white hover:text-gray-300" 
                : "text-gray-700 hover:text-gray-900"  // Changed to dark text for non-homepage
            }`}
          >
            Unisex
          </Link>
          <Link 
            href="/products?category=girls" 
            className={`text-sm font-medium transition-colors ${
              isHomePage 
                ? "text-white hover:text-gray-300" 
                : "text-gray-700 hover:text-gray-900"  // Changed to dark text for non-homepage
            }`}
          >
            Girls
          </Link>
          <Link 
            href="/products?category=boys" 
            className={`text-sm font-medium transition-colors ${
              isHomePage 
                ? "text-white hover:text-gray-300" 
                : "text-gray-700 hover:text-gray-900"  // Changed to dark text for non-homepage
            }`}
          >
            Boys
          </Link>
        </nav>
        <div className={isHomePage ? "text-white" : "text-gray-900"}> {/* Changed text color for non-homepage */}
          <CartIcon />
        </div>
      </div>
    </header>
  );
}