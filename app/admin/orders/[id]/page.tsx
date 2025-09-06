

// // app/admin/orders/[id]/page.tsx - UPDATED WITH WORKING FORM
// 'use client' // Add this at the top
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createServerClient } from '@/lib/supabase/server'
// import { getUser } from '@/lib/utils/auth'
// import { redirect } from 'next/navigation'
// import Link from 'next/link'
// import { MapPin, User, Phone, MessageCircle, Truck, Calendar, CreditCard, Package } from 'lucide-react'
// import { updateOrderStatus } from '@/app/actions/update-order-status'


// // Define a basic order type that matches your database
// interface BasicOrder {
//   order_id: number
//   order_number: string
//   customer_id: number
//   customer_name: string
//   customer_email: string
//   customer_phone: string
//   customer_whatsapp: string
//   total_amount: number
//   discount_amount: number
//   delivery_charges: number
//   final_amount: number
//   status: string
//   payment_method: string
//   payment_status: string
//   delivery_address_id: number | null
//   delivery_address_backup: any
//   courier_service: string
//   tracking_number: string
//   expected_delivery_date: string | null
//   delivered_at: string | null
//   notes: string
//   admin_notes: string
//   created_at: string
// }

// interface Address {
//   address_id: number
//   full_name: string
//   phone_number: string
//   whatsapp_number?: string
//   address_line_1: string
//   address_line_2?: string
//   area?: string
//   city: string
//   province?: string
//   postal_code?: string
//   country: string
//   address_type: string
//   delivery_instructions?: string
// }

// export default async function OrderDetailPage({ 
//   params,
//   searchParams 
// }: { 
//   params: Promise<{ id: string }>
//   searchParams: Promise<{ updated?: string }>
// }) {
//   const { id } = await params
//   const { updated } = await searchParams
//   const user = await getUser()

//   if (!user) {
//     redirect('/auth/login')
//   }

//   const supabase = await createServerClient()
  
//   // First, get the basic order data
//   const { data: order, error } = await supabase
//     .from('orders')
//     .select('*')
//     .eq('order_id', parseInt(id))
//     .single()

//   if (error || !order) {
//     return (
//       <div className="container mx-auto px-6 py-8">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
//           <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
//           <Link href="/admin/orders" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//             Back to Orders
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Type assertion for the order
//   const orderData = order as BasicOrder

//   // Get order items
//   const { data: orderItems } = await supabase
//     .from('order_items')
//     .select('*')
//     .eq('order_id', orderData.order_id)

//   // Get address - try both methods
//   let addressData: Address | null = null

//   // Method 1: Check if there's a linked address ID
//   if (orderData.delivery_address_id) {
//     const { data: address } = await supabase
//       .from('addresses')
//       .select('*')
//       .eq('address_id', orderData.delivery_address_id)
//       .single()
    
//     if (address) {
//       addressData = address as Address
//     }
//   }

//   // Method 2: Check if there's backup address data
//   if (!addressData && orderData.delivery_address_backup) {
//     // If the backup is a string, parse it as JSON
//     if (typeof orderData.delivery_address_backup === 'string') {
//       try {
//         addressData = JSON.parse(orderData.delivery_address_backup)
//       } catch (e) {
//         console.error('Failed to parse address backup:', e)
//       }
//     } else {
//       addressData = orderData.delivery_address_backup
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Success Message */}
//       {updated && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
//           Order status updated successfully!
//         </div>
//       )}
        
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <Package className="h-8 w-8 text-blue-600" />
//             <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
//           </div>
//           <div className="flex items-center gap-4 text-sm text-gray-600">
//             <span>Order #{orderData.order_number}</span>
//             <span className="flex items-center gap-1">
//               <Calendar className="h-4 w-4" />
//               {new Date(orderData.created_at).toLocaleDateString()}
//             </span>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//               orderData.status === 'delivered' ? 'bg-green-100 text-green-800' :
//               orderData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//               orderData.status === 'processing' ? 'bg-blue-100 text-blue-800' :
//               'bg-gray-100 text-gray-800'
//             }`}>
//               {orderData.status}
//             </span>
//           </div>
//         </div>
//         <Link 
//           href="/admin/orders" 
//           className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
//         >
//           ← Back to Orders
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Order Items Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//               <Package className="h-5 w-5" />
//               Order Items
//             </h2>
//             <div className="space-y-4">
//               {orderItems?.map((item: any) => (
//                 <div key={item.order_item_id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
//                       <Package className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium text-gray-900">{item.product_name}</h3>
//                       <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//                       {item.selected_attributes && (
//                         <div className="flex gap-2 mt-1">
//                           {Object.entries(item.selected_attributes).map(([key, value]) => (
//                             <span key={key} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
//                               {key}: {String(value)}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-gray-900">Rs. {item.total_price.toLocaleString()}</p>
//                     <p className="text-sm text-gray-600">Rs. {item.unit_price.toLocaleString()} each</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Totals */}
//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <div className="space-y-3 max-w-md ml-auto">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span>Rs. {orderData.total_amount.toLocaleString()}</span>
//                 </div>
//                 {orderData.discount_amount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>- Rs. {orderData.discount_amount.toLocaleString()}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-gray-600">
//                   <span>Delivery</span>
//                   <span>Rs. {orderData.delivery_charges.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
//                   <span>Total Amount</span>
//                   <span>Rs. {orderData.final_amount.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Delivery Address Card */}
//           {addressData ? (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <MapPin className="h-5 w-5 text-red-500" />
//                   Delivery Address
//                 </h2>
//                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
//                   {orderData.delivery_address_id ? 'Linked Address' : 'Backup Address'}
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-blue-100 p-2 rounded-lg">
//                       <User className="h-5 w-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Recipient Name</p>
//                       <p className="font-medium text-gray-900">{addressData.full_name}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="bg-green-100 p-2 rounded-lg">
//                       <Phone className="h-5 w-5 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Phone Number</p>
//                       <p className="font-medium text-gray-900">{addressData.phone_number}</p>
//                     </div>
//                   </div>

//                   {addressData.whatsapp_number && (
//                     <div className="flex items-center gap-3">
//                       <div className="bg-green-100 p-2 rounded-lg">
//                         <MessageCircle className="h-5 w-5 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600">WhatsApp</p>
//                         <p className="font-medium text-gray-900">{addressData.whatsapp_number}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="space-y-3">
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <p className="font-medium text-gray-900">{addressData.address_line_1}</p>
//                     {addressData.address_line_2 && (
//                       <p className="text-gray-600">{addressData.address_line_2}</p>
//                     )}
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {addressData.area && (
//                         <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
//                           {addressData.area}
//                         </span>
//                       )}
//                       <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
//                         {addressData.city}
//                       </span>
//                       {addressData.province && (
//                         <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
//                           {addressData.province}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {addressData.delivery_instructions && (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                       <p className="text-sm font-medium text-yellow-800 mb-1">Delivery Instructions</p>
//                       <p className="text-yellow-700 text-sm">{addressData.delivery_instructions}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <MapPin className="h-6 w-6 text-yellow-600" />
//                 <h3 className="text-lg font-semibold text-yellow-800">No Delivery Address</h3>
//               </div>
//               <p className="text-yellow-700">
//                 This order doesn't have a delivery address stored.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Customer Info Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <User className="h-5 w-5 text-purple-600" />
//               Customer Information
//             </h2>
//             <div className="space-y-3">
//               <div>
//                 <p className="text-sm text-gray-600">Full Name</p>
//                 <p className="font-medium text-gray-900">{orderData.customer_name}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Email Address</p>
//                 <p className="font-medium text-gray-900">{orderData.customer_email}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Phone Number</p>
//                 <p className="font-medium text-gray-900">{orderData.customer_phone}</p>
//               </div>
//               {orderData.customer_whatsapp && (
//                 <div>
//                   <p className="text-sm text-gray-600">WhatsApp</p>
//                   <p className="font-medium text-gray-900">{orderData.customer_whatsapp}</p>
//                 </div>
//               )}
//             </div>
//           </div>
   
//           {/* Order Status Card - UPDATED WITH FORM */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Truck className="h-5 w-5 text-orange-600" />
//               Order Status
//             </h2>
            
//             <form action={updateOrderStatus}>
//               <input type="hidden" name="order_id" value={orderData.order_id} />
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
//                   <select 
//                     name="status"
//                     defaultValue={orderData.status}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="confirmed">Confirmed</option>
//                     <option value="processing">Processing</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="delivered">Delivered</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Courier</label>
//                     <input 
//                       name="courier"
//                       type="text" 
//                       defaultValue={orderData.courier_service || ''}
//                       placeholder="e.g., TCS, Leopards"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Tracking #</label>
//                     <input 
//                       name="tracking_number"
//                       type="text" 
//                       defaultValue={orderData.tracking_number || ''}
//                       placeholder="Tracking number"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
//                   <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
//                     <CreditCard className="h-4 w-4 text-gray-600" />
//                     <span className="font-medium capitalize">
//                       {orderData.payment_method || 'Not specified'}
//                     </span>
//                   </div>
//                 </div>

//                 <button 
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
//                 >
//                   Update Status
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Order Timeline Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Timeline</h2>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Order Placed</span>
//                 <span className="text-sm font-medium text-gray-900">
//                   {new Date(orderData.created_at).toLocaleDateString()}
//                 </span>
//               </div>
//               {orderData.expected_delivery_date && (
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Expected Delivery</span>
//                   <span className="text-sm font-medium text-gray-900">
//                     {new Date(orderData.expected_delivery_date).toLocaleDateString()}
//                   </span>
//                 </div>
//               )}
//               {orderData.delivered_at && (
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Delivered At</span>
//                   <span className="text-sm font-medium text-green-600">
//                     {new Date(orderData.delivered_at).toLocaleDateString()}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





// app/admin/orders/[id]/page.tsx - WITH STATUS UPDATE FORM
import { createServerClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MapPin, User, Phone, MessageCircle, Truck, Calendar, CreditCard, Package } from 'lucide-react'
import { updateOrderStatus } from '@/app/actions/update-order-status'

// Define a basic order type that matches your database
interface BasicOrder {
  order_id: number
  order_number: string
  customer_id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_whatsapp: string
  total_amount: number
  discount_amount: number
  delivery_charges: number
  final_amount: number
  status: string
  payment_method: string
  payment_status: string
  delivery_address_id: number | null
  delivery_address_backup: any
  courier_service: string
  tracking_number: string
  expected_delivery_date: string | null
  delivered_at: string | null
  notes: string
  admin_notes: string
  created_at: string
}

interface Address {
  address_id: number
  full_name: string
  phone_number: string
  whatsapp_number?: string
  address_line_1: string
  address_line_2?: string
  area?: string
  city: string
  province?: string
  postal_code?: string
  country: string
  address_type: string
  delivery_instructions?: string
}

export default async function OrderDetailPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>
  searchParams: Promise<{ updated?: string }>
}) {
  const { id } = await params
  const { updated } = await searchParams
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createServerClient()
  
  // First, get the basic order data
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_id', parseInt(id))
    .single()

  if (error || !order) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <Link href="/admin/orders" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  // Type assertion for the order
  const orderData = order as BasicOrder

  // Get order items
  const { data: orderItems } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderData.order_id)

  // Get address - try both methods
  let addressData: Address | null = null

  // Method 1: Check if there's a linked address ID
  if (orderData.delivery_address_id) {
    const { data: address } = await supabase
      .from('addresses')
      .select('*')
      .eq('address_id', orderData.delivery_address_id)
      .single()
    
    if (address) {
      addressData = address as Address
    }
  }

  // Method 2: Check if there's backup address data
  if (!addressData && orderData.delivery_address_backup) {
    // If the backup is a string, parse it as JSON
    if (typeof orderData.delivery_address_backup === 'string') {
      try {
        addressData = JSON.parse(orderData.delivery_address_backup)
      } catch (e) {
        console.error('Failed to parse address backup:', e)
      }
    } else {
      addressData = orderData.delivery_address_backup
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Message */}
      {updated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Order status updated successfully! The changes have been reflected across all pages.
        </div>
      )}
        
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Order #{orderData.order_number}</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(orderData.created_at).toLocaleDateString()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              orderData.status === 'delivered' ? 'bg-green-100 text-green-800' :
              orderData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              orderData.status === 'processing' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {orderData.status}
            </span>
          </div>
        </div>
        <Link 
          href="/admin/orders" 
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          ← Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Items
            </h2>
            <div className="space-y-4">
              {orderItems?.map((item: any) => (
                <div key={item.order_item_id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      {item.selected_attributes && (
                        <div className="flex gap-2 mt-1">
                          {Object.entries(item.selected_attributes).map(([key, value]) => (
                            <span key={key} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {key}: {String(value)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">Rs. {item.total_price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Rs. {item.unit_price.toLocaleString()} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-3 max-w-md ml-auto">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {orderData.total_amount.toLocaleString()}</span>
                </div>
                {orderData.discount_amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- Rs. {orderData.discount_amount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Rs. {orderData.delivery_charges.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span>Rs. {orderData.final_amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          {addressData ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  Delivery Address
                </h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  {orderData.delivery_address_id ? 'Linked Address' : 'Backup Address'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Recipient Name</p>
                      <p className="font-medium text-gray-900">{addressData.full_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-medium text-gray-900">{addressData.phone_number}</p>
                    </div>
                  </div>

                  {addressData.whatsapp_number && (
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">WhatsApp</p>
                        <p className="font-medium text-gray-900">{addressData.whatsapp_number}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">{addressData.address_line_1}</p>
                    {addressData.address_line_2 && (
                      <p className="text-gray-600">{addressData.address_line_2}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {addressData.area && (
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                          {addressData.area}
                        </span>
                      )}
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        {addressData.city}
                      </span>
                      {addressData.province && (
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                          {addressData.province}
                        </span>
                      )}
                    </div>
                  </div>

                  {addressData.delivery_instructions && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-yellow-800 mb-1">Delivery Instructions</p>
                      <p className="text-yellow-700 text-sm">{addressData.delivery_instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">No Delivery Address</h3>
              </div>
              <p className="text-yellow-700">
                This order doesn't have a delivery address stored.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              Customer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">{orderData.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-medium text-gray-900">{orderData.customer_email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium text-gray-900">{orderData.customer_phone}</p>
              </div>
              {orderData.customer_whatsapp && (
                <div>
                  <p className="text-sm text-gray-600">WhatsApp</p>
                  <p className="font-medium text-gray-900">{orderData.customer_whatsapp}</p>
                </div>
              )}
            </div>
          </div>
   
          {/* Order Status Card - WITH UPDATE FORM */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-600" />
              Order Status
            </h2>
            
            <form action={updateOrderStatus} className="space-y-4">
              <input type="hidden" name="order_id" value={orderData.order_id} />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <select 
                  name="status"
                  defaultValue={orderData.status}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Courier Service</label>
                  <input 
                    name="courier"
                    type="text" 
                    defaultValue={orderData.courier_service || ''}
                    placeholder="e.g., TCS, Leopards"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                  <input 
                    name="tracking_number"
                    type="text" 
                    defaultValue={orderData.tracking_number || ''}
                    placeholder="Tracking number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                <textarea 
                  name="admin_notes"
                  rows={3}
                  defaultValue={orderData.admin_notes || ''}
                  placeholder="Add internal notes about this order..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <CreditCard className="h-4 w-4 text-gray-600" />
                  <span className="font-medium capitalize">
                    {orderData.payment_method || 'Not specified'}
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md font-medium"
              >
                Update Order Status
              </button>
            </form>
          </div>

          {/* Order Timeline Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Timeline</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Order Placed</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(orderData.created_at).toLocaleDateString()}
                </span>
              </div>
              {orderData.expected_delivery_date && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Expected Delivery</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(orderData.expected_delivery_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              {orderData.delivered_at && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivered At</span>
                  <span className="text-sm font-medium text-green-600">
                    {new Date(orderData.delivered_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}