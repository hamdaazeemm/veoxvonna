// // // components/cart/cart-drawer.tsx
// // "use client";

// // import { useCartStore } from "@/store/cart-store";

// // export default function CartDrawer({ onClose }: { onClose: () => void }) {
// //   const { items, removeItem, clearCart } = useCartStore();

// //   return (
// //     <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-4">
// //       <button className="mb-4" onClick={onClose}>❌ Close</button>

// //       <h2 className="text-xl font-bold mb-4">Your Cart</h2>

// //       {items.length === 0 ? (
// //         <p>Your cart is empty</p>
// //       ) : (
// //         <ul className="space-y-4">
// //           {items.map((item) => (
// //             <li key={item.product_id} className="flex justify-between">
// //               <span>{item.name} (x{item.quantity})</span>
// //               <span>Rs {item.price * item.quantity}</span>
// //               <button
// //                 onClick={() => removeItem(item.product_id)}
// //                 className="text-red-500 text-sm"
// //               >
// //                 Remove
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       )}

// //       {items.length > 0 && (
// //         <div className="mt-6">
// //           <button
// //             className="w-full bg-black text-white py-2 rounded"
// //             onClick={() => {
// //               clearCart();
// //               onClose();
// //             }}
// //           >
// //             Checkout
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// // components/cart/cart-drawer.tsx
// "use client";

// import { useCartStore } from "@/store/cart-store";
// import Image from "next/image";

// export default function CartDrawer({ onClose }: { onClose: () => void }) {
//   const { items, removeItem, updateQuantity, loading } = useCartStore();

//   const getCustomerEmail = () => {
//     return localStorage.getItem('customer_email') || '';
//   };

//   const handleRemove = async (productId: number) => {
//     const email = getCustomerEmail();
//     await removeItem(productId, email);
//   };

//   const handleQuantityChange = async (productId: number, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     const email = getCustomerEmail();
//     await updateQuantity(productId, newQuantity, email);
//   };

//   const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   return (
//     <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-4 overflow-y-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Your Cart</h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           ✕
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading cart...</p>
//       ) : items.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {items.map((item) => (
//               <div key={item.product_id} className="flex items-center space-x-3 border-b pb-3">
//                 {item.image_url && (
//                   <Image
//                     src={item.image_url}
//                     alt={item.name}
//                     width={60}
//                     height={60}
//                     className="rounded object-cover"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <h4 className="font-medium text-sm">{item.name}</h4>
//                   <p className="text-gray-600">Rs. {item.price}</p>
//                   <div className="flex items-center space-x-2 mt-1">
//                     <button
//                       onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
//                       className="w-6 h-6 bg-gray-200 rounded"
//                     >
//                       -
//                     </button>
//                     <span className="text-sm">{item.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
//                       className="w-6 h-6 bg-gray-200 rounded"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleRemove(item.product_id)}
//                   className="text-red-500 text-sm p-1"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 pt-4 border-t">
//             <div className="flex justify-between text-lg font-bold mb-4">
//               <span>Total:</span>
//               <span>Rs. {total}</span>
//             </div>
//             <button
//               className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
//               onClick={onClose}
//             >
//               Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }