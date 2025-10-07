// // app/(shop)/cart/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useCartStore } from "@/store/cart-store";
// import Link from "next/link";
// import Image from "next/image";

// export default function CartPage() {
//   const { items, loadCart, removeItem, updateQuantity, loading } = useCartStore();
//   const [customerEmail, setCustomerEmail] = useState("");

//   useEffect(() => {
//     // Load cart when component mounts
//     const email = localStorage.getItem('customer_email');
//     if (email) {
//       setCustomerEmail(email);
//       loadCart(email);
//     }
//   }, [loadCart]);

//   const handleRemove = async (cartItemId: number) => {
//     if (customerEmail && cartItemId) {
//       await removeItem(cartItemId, customerEmail);
//     }
//   };

//   const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
//     if (newQuantity < 1) {
//       // If quantity becomes 0, remove the item
//       await handleRemove(cartItemId);
//       return;
//     }
//     if (customerEmail && cartItemId) {
//       await updateQuantity(cartItemId, newQuantity, customerEmail);
//     }
//   };

//   const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
//         <p>Loading your cart...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {items.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
//           <Link 
//             href="/products" 
//             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-lg font-semibold mb-4">Cart Items ({items.length})</h2>
//               <div className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.cart_item_id} className="flex items-center space-x-4 border-b pb-4">
//                     {item.image_url && (
//                       <Image
//                         src={item.image_url}
//                         alt={item.name}
//                         width={80}
//                         height={80}
//                         className="rounded object-cover"
//                       />
//                     )}
//                     <div className="flex-1">
//                       <h3 className="font-medium">{item.name}</h3>
//                       <p className="text-gray-600">Rs. {item.price.toLocaleString()}</p>
//                       <div className="flex items-center space-x-2 mt-2">
//                         <button
//                           onClick={() => handleQuantityChange(item.cart_item_id!, item.quantity - 1)}
//                           className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
//                         >
//                           -
//                         </button>
//                         <span className="text-sm">{item.quantity}</span>
//                         <button
//                           onClick={() => handleQuantityChange(item.cart_item_id!, item.quantity + 1)}
//                           className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
//                       <button
//                         onClick={() => handleRemove(item.cart_item_id!)}
//                         className="text-red-500 text-sm mt-2"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
//               <div className="space-y-2 mb-4">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>Rs. {total.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>Rs. {total > 2000 ? 0 : 200}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
//                   <span>Total</span>
//                   <span>Rs. {(total > 2000 ? total : total + 200).toLocaleString()}</span>
//                 </div>
//               </div>

//               {total > 0 && total < 2000 && (
//                 <p className="text-green-600 text-sm mb-4">
//                   Add Rs. {(2000 - total).toLocaleString()} more for free shipping!
//                 </p>
//               )}

//               <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 mb-4">
//                 Proceed to Checkout
//               </button>

//               <Link 
//                 href="/products" 
//                 className="w-full text-center block border border-gray-300 py-2 rounded-md hover:bg-gray-50"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// app/(shop)/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { items, loadCart, removeItem, updateQuantity, loading } = useCartStore();
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    // Load cart when component mounts
    const email = localStorage.getItem('customer_email');
    if (email) {
      setCustomerEmail(email);
      loadCart(email);
    }
  }, [loadCart]);

  const handleRemove = async (cartItemId: number) => {
    if (customerEmail && cartItemId) {
      await removeItem(cartItemId, customerEmail);
    }
  };

  const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // If quantity becomes 0, remove the item
      await handleRemove(cartItemId);
      return;
    }
    if (customerEmail && cartItemId) {
      await updateQuantity(cartItemId, newQuantity, customerEmail);
    }
  };

  const handleCheckout = () => {
    if (!customerEmail) {
      alert("Please add your email to continue");
      return;
    }
    router.push("/checkout");
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link 
            href="/products" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Cart Items ({items.length})</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.cart_item_id} className="flex items-center space-x-4 border-b pb-4">
                    {item.image_url && (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">Rs. {item.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.cart_item_id!, item.quantity - 1)}
                          className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.cart_item_id!, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      <button
                        onClick={() => handleRemove(item.cart_item_id!)}
                        className="text-red-500 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Rs. {total > 2000 ? 0 : 200}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>Rs. {(total > 2000 ? total : total + 200).toLocaleString()}</span>
                </div>
              </div>

              {total > 0 && total < 2000 && (
                <p className="text-green-600 text-sm mb-4">
                  Add Rs. {(2000 - total).toLocaleString()} more for free shipping!
                </p>
              )}

              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 mb-4"
              >
                Proceed to Checkout
              </button>

              <Link 
                href="/products" 
                className="w-full text-center block border border-gray-300 py-2 rounded-md hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}