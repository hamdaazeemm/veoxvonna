// components/layout/header.tsx
import CartIcon from "@/components/cart/cart-icon";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Veoxvonna
      </Link>
      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex space-x-6">
          <Link href="/products" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <Link href="/boys" className="text-gray-700 hover:text-blue-600">
            Boys
          </Link>
          <Link href="/girls" className="text-gray-700 hover:text-blue-600">
            Girls
          </Link>
          <Link href="/sale" className="text-red-600 hover:text-red-700">
            Sale
          </Link>
        </nav>
        <CartIcon />
      </div>
    </header>
  );
}