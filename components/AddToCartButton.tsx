


// components/AddToCartButton.tsx
"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId, name, price, image_url }: { 
  productId: number;
  name: string;
  price: number;
  image_url?: string;
}) {
  const [loading, setLoading] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();

  async function handleAdd() {
    const email = localStorage.getItem("customer_email") || prompt("Enter your email to start cart:");

    if (!email) return;

    localStorage.setItem("customer_email", email);
    setLoading(true);

    try {
      await addItem({
        product_id: productId,
        name,
        price,
        quantity: 1,
        image_url
      }, email);
      
      // Redirect to cart page after adding item
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}