


// // // components/AddToCartButton.tsx
// // "use client";
// // import { useState } from "react";
// // import { useCartStore } from "@/store/cart-store";
// // import { useRouter } from "next/navigation";

// // export default function AddToCartButton({ productId, name, price, image_url }: { 
// //   productId: number;
// //   name: string;
// //   price: number;
// //   image_url?: string;
// // }) {
// //   const [loading, setLoading] = useState(false);
// //   const { addItem } = useCartStore();
// //   const router = useRouter();

// //   async function handleAdd() {
// //     const email = localStorage.getItem("customer_email") || prompt("Enter your email to start cart:");

// //     if (!email) return;

// //     localStorage.setItem("customer_email", email);
// //     setLoading(true);

// //     try {
// //       await addItem({
// //         product_id: productId,
// //         name,
// //         price,
// //         quantity: 1,
// //         image_url
// //       }, email);
      
// //       // Redirect to cart page after adding item
// //       router.push("/cart");
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //       alert("Failed to add to cart");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <button
// //       onClick={handleAdd}
// //       disabled={loading}
// //       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
// //     >
// //       {loading ? "Adding..." : "Add to Cart"}
// //     </button>
// //   );
// // }

// // components/AddToCartButton.tsx
// "use client";
// import { useState } from "react";
// import { useCartStore } from "@/store/cart-store";
// import { useRouter } from "next/navigation";

// export default function AddToCartButton({ productId, name, price, image_url }: { 
//   productId: number;
//   name: string;
//   price: number;
//   image_url?: string;
// }) {
//   const [loading, setLoading] = useState(false);
//   const { addItem } = useCartStore();
//   const router = useRouter();

//   async function handleAdd() {
//     const email = localStorage.getItem("customer_email") || prompt("Enter your email to start cart:");

//     if (!email) return;

//     localStorage.setItem("customer_email", email);
//     setLoading(true);

//     try {
//       await addItem({
//         product_id: productId,
//         name,
//         price,
//         quantity: 1,
//         image_url
//       }, email);
      
//       // Redirect to cart page after adding item
//       router.push("/cart");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add to cart");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <button
//       onClick={handleAdd}
//       disabled={loading}
//       className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors duration-200 font-medium"
//     >
//       {loading ? "Adding..." : "Add to Cart"}
//     </button>
//   );
// }

// components/AddToCartButton.tsx
"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productId: number;
  name: string;
  price: number;
  image_url?: string;
  selectedSize?: string; // Add selectedSize prop
  requireSize?: boolean; // Add option to require size selection
}

export default function AddToCartButton({ 
  productId, 
  name, 
  price, 
  image_url,
  selectedSize,
  requireSize = false 
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();

  async function handleAdd() {
    // Check if size is required but not selected
    if (requireSize && !selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }

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
        image_url,
        selected_attributes: selectedSize ? { size: selectedSize } : undefined // Include size in attributes
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

  // Determine button text based on state
  const getButtonText = () => {
    if (loading) return "Adding...";
    if (requireSize && !selectedSize) return "Select Size First";
    if (selectedSize) return `Add to Cart (${selectedSize})`;
    return "Add to Cart";
  };

  // Determine if button should be disabled
  const isDisabled = loading || (requireSize && !selectedSize);

  return (
    <button
      onClick={handleAdd}
      disabled={isDisabled}
      className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
    >
      {getButtonText()}
    </button>
  );
}