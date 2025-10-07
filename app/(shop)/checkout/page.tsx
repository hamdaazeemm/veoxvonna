// // app/(shop)/checkout/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useCartStore } from "@/store/cart-store";
// import { useRouter } from "next/navigation";

// interface AddressForm {
//   full_name: string;
//   phone_number: string;
//   whatsapp_number?: string;
//   address_line_1: string;
//   address_line_2?: string;
//   area?: string;
//   city: string;
//   province?: string;
//   postal_code?: string;
//   delivery_instructions?: string;
// }

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { items, loadCart } = useCartStore();
//   const [customerEmail, setCustomerEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
//   const [couponError, setCouponError] = useState("");

//   const [formData, setFormData] = useState<AddressForm>({
//     full_name: "",
//     phone_number: "",
//     whatsapp_number: "",
//     address_line_1: "",
//     address_line_2: "",
//     area: "",
//     city: "",
//     province: "Punjab",
//     postal_code: "",
//     delivery_instructions: "",
//   });

//   useEffect(() => {
//     const email = localStorage.getItem("customer_email");
//     if (email) {
//       setCustomerEmail(email);
//       loadCart(email);
//     } else {
//       router.push("/cart");
//     }
//   }, [loadCart, router]);

//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const deliveryCharges = subtotal > 2000 ? 0 : 200;
//   const discountAmount = appliedCoupon 
//     ? appliedCoupon.discount_type === "percentage"
//       ? Math.min(
//           (subtotal * appliedCoupon.discount_value) / 100,
//           appliedCoupon.maximum_discount_amount || Infinity
//         )
//       : appliedCoupon.discount_value
//     : 0;
//   const total = subtotal + deliveryCharges - discountAmount;

//   const handleApplyCoupon = async () => {
//     setCouponError("");
//     try {
//       const res = await fetch(`/api/coupons/validate?code=${couponCode}&total=${subtotal}`);
//       const data = await res.json();

//       if (!res.ok) {
//         setCouponError(data.error || "Invalid coupon");
//         return;
//       }

//       setAppliedCoupon(data);
//     } catch (error) {
//       setCouponError("Failed to apply coupon");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Create order
//       const orderData = {
//         customer_email: customerEmail,
//         customer_name: formData.full_name,
//         customer_phone: formData.phone_number,
//         customer_whatsapp: formData.whatsapp_number,
//         total_amount: subtotal,
//         discount_amount: discountAmount,
//         delivery_charges: deliveryCharges,
//         final_amount: total,
//         payment_method: "cod", // Cash on delivery
//         delivery_address: formData,
//         coupon_code: appliedCoupon?.code,
//         items: items.map((item) => ({
//           product_id: item.product_id,
//           product_name: item.name,
//           quantity: item.quantity,
//           unit_price: item.price,
//           total_price: item.price * item.quantity,
//           selected_attributes: item.selected_attributes,
//         })),
//       };

//       const response = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to create order");
//       }

//       // Clear cart
//       await fetch(`/api/cart?email=${customerEmail}`, { method: "DELETE" });

//       // Redirect to success page
//       router.push(`/orders/${result.order_number}/success`);
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert(error instanceof Error ? error.message : "Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
//         <button onClick={() => router.push("/products")} className="bg-blue-600 text-white px-6 py-2 rounded">
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Forms */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Contact Information */}
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Full Name *"
//                   required
//                   value={formData.full_name}
//                   onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
//                   className="border p-3 rounded"
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number *"
//                   required
//                   value={formData.phone_number}
//                   onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
//                   className="border p-3 rounded"
//                 />
//                 <input
//                   type="tel"
//                   placeholder="WhatsApp Number"
//                   value={formData.whatsapp_number}
//                   onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
//                   className="border p-3 rounded"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={customerEmail}
//                   disabled
//                   className="border p-3 rounded bg-gray-50"
//                 />
//               </div>
//             </div>

//             {/* Delivery Address */}
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Address Line 1 *"
//                   required
//                   value={formData.address_line_1}
//                   onChange={(e) => setFormData({ ...formData, address_line_1: e.target.value })}
//                   className="w-full border p-3 rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address Line 2"
//                   value={formData.address_line_2}
//                   onChange={(e) => setFormData({ ...formData, address_line_2: e.target.value })}
//                   className="w-full border p-3 rounded"
//                 />
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Area"
//                     value={formData.area}
//                     onChange={(e) => setFormData({ ...formData, area: e.target.value })}
//                     className="border p-3 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="City *"
//                     required
//                     value={formData.city}
//                     onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                     className="border p-3 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Postal Code"
//                     value={formData.postal_code}
//                     onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
//                     className="border p-3 rounded"
//                   />
//                 </div>
//                 <select
//                   value={formData.province}
//                   onChange={(e) => setFormData({ ...formData, province: e.target.value })}
//                   className="w-full border p-3 rounded"
//                 >
//                   <option value="Punjab">Punjab</option>
//                   <option value="Sindh">Sindh</option>
//                   <option value="KPK">KPK</option>
//                   <option value="Balochistan">Balochistan</option>
//                   <option value="Islamabad">Islamabad</option>
//                 </select>
//                 <textarea
//                   placeholder="Delivery Instructions (Optional)"
//                   value={formData.delivery_instructions}
//                   onChange={(e) => setFormData({ ...formData, delivery_instructions: e.target.value })}
//                   className="w-full border p-3 rounded"
//                   rows={3}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-lg shadow sticky top-4">
//               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//               {/* Order Items */}
//               <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
//                 {items.map((item) => (
//                   <div key={item.cart_item_id} className="flex justify-between text-sm">
//                     <span>
//                       {item.name} x {item.quantity}
//                     </span>
//                     <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Coupon */}
//               <div className="border-t pt-4 mb-4">
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     placeholder="Coupon code"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     className="flex-1 border p-2 rounded text-sm"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleApplyCoupon}
//                     className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300"
//                   >
//                     Apply
//                   </button>
//                 </div>
//                 {couponError && <p className="text-red-500 text-xs">{couponError}</p>}
//                 {appliedCoupon && (
//                   <p className="text-green-600 text-xs">
//                     ✓ Coupon "{appliedCoupon.code}" applied
//                   </p>
//                 )}
//               </div>

//               {/* Totals */}
//               <div className="space-y-2 border-t pt-4">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>Rs. {subtotal.toLocaleString()}</span>
//                 </div>
//                 {discountAmount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>- Rs. {discountAmount.toLocaleString()}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Delivery</span>
//                   <span>{deliveryCharges === 0 ? "FREE" : `Rs. ${deliveryCharges}`}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold border-t pt-2">
//                   <span>Total</span>
//                   <span>Rs. {total.toLocaleString()}</span>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 disabled:bg-gray-400"
//               >
//                 {loading ? "Placing Order..." : "Place Order (COD)"}
//               </button>

//               <p className="text-xs text-gray-500 mt-4 text-center">
//                 By placing this order, you agree to our terms and conditions
//               </p>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }


// app/(shop)/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";

interface AddressForm {
  full_name: string;
  phone_number: string;
  whatsapp_number?: string;
  address_line_1: string;
  address_line_2?: string;
  area?: string;
  city: string;
  province?: string;
  postal_code?: string;
  delivery_instructions?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, loadCart, clearCart } = useCartStore();
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState<AddressForm>({
    full_name: "",
    phone_number: "",
    whatsapp_number: "",
    address_line_1: "",
    address_line_2: "",
    area: "",
    city: "",
    province: "Punjab",
    postal_code: "",
    delivery_instructions: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("customer_email");
    if (email) {
      setCustomerEmail(email);
      loadCart(email);
    } else {
      router.push("/cart");
    }
  }, [loadCart, router]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharges = subtotal > 2000 ? 0 : 200;
  const discountAmount = appliedCoupon 
    ? appliedCoupon.discount_type === "percentage"
      ? Math.min(
          (subtotal * appliedCoupon.discount_value) / 100,
          appliedCoupon.maximum_discount_amount || Infinity
        )
      : appliedCoupon.discount_value
    : 0;
  const total = subtotal + deliveryCharges - discountAmount;

  const handleApplyCoupon = async () => {
    setCouponError("");
    try {
      const res = await fetch(`/api/coupons/validate?code=${couponCode}&total=${subtotal}`);
      const data = await res.json();

      if (!res.ok) {
        setCouponError(data.error || "Invalid coupon");
        return;
      }

      setAppliedCoupon(data);
    } catch (error) {
      setCouponError("Failed to apply coupon");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderData = {
        customer_email: customerEmail,
        customer_name: formData.full_name,
        customer_phone: formData.phone_number,
        customer_whatsapp: formData.whatsapp_number,
        total_amount: subtotal,
        discount_amount: discountAmount,
        delivery_charges: deliveryCharges,
        final_amount: total,
        payment_method: "cod",
        delivery_address: formData,
        coupon_code: appliedCoupon?.code,
        items: items.map((item) => ({
          product_id: item.product_id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
          selected_attributes: item.selected_attributes,
        })),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create order");
      }

      // Clear cart from database
      const deleteResponse = await fetch(`/api/cart?email=${encodeURIComponent(customerEmail)}`, { 
        method: "DELETE" 
      });

      if (!deleteResponse.ok) {
        console.error("Failed to clear cart from database");
      }

      // Clear cart from local state
      clearCart();

      // Redirect to success page - FIXED PATH
      router.push(`/orders/${result.order_number}/success`);
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => router.push("/products")} className="bg-blue-600 text-white px-6 py-2 rounded">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="border p-3 rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="border p-3 rounded"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  value={formData.whatsapp_number}
                  onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                  className="border p-3 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={customerEmail}
                  disabled
                  className="border p-3 rounded bg-gray-50"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Address Line 1 *"
                  required
                  value={formData.address_line_1}
                  onChange={(e) => setFormData({ ...formData, address_line_1: e.target.value })}
                  className="w-full border p-3 rounded"
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={formData.address_line_2}
                  onChange={(e) => setFormData({ ...formData, address_line_2: e.target.value })}
                  className="w-full border p-3 rounded"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="border p-3 rounded"
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="border p-3 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="border p-3 rounded"
                  />
                </div>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full border p-3 rounded"
                >
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="KPK">KPK</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
                <textarea
                  placeholder="Delivery Instructions (Optional)"
                  value={formData.delivery_instructions}
                  onChange={(e) => setFormData({ ...formData, delivery_instructions: e.target.value })}
                  className="w-full border p-3 rounded"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.cart_item_id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="border-t pt-4 mb-4">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border p-2 rounded text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-xs">{couponError}</p>}
                {appliedCoupon && (
                  <p className="text-green-600 text-xs">
                    ✓ Coupon "{appliedCoupon.code}" applied
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryCharges === 0 ? "FREE" : `Rs. ${deliveryCharges}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 disabled:bg-gray-400"
              >
                {loading ? "Placing Order..." : "Place Order (COD)"}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
