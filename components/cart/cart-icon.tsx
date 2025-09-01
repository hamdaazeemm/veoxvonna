// components/cart/cart-icon.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";
import Link from "next/link";

export default function CartIcon() {
  const { items, loadCart, loading } = useCartStore();

  useEffect(() => {
    // Load cart when component mounts
    const email = localStorage.getItem('customer_email');
    if (email) {
      loadCart(email);
    }
  }, [loadCart]);

  return (
    <div className="relative">
      <Link href="/cart" className="relative p-2 block">
        <ShoppingCart size={24} />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Link>
    </div>
  );
}