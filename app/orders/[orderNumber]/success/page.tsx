// app/orders/[orderNumber]/success/page.tsx
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Database } from "@/lib/supabase/types";

// Add this to help with route matching
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ orderNumber: string }>;
}

// Define the order type with relations
type OrderWithRelations = Database['public']['Tables']['orders']['Row'] & {
  order_items: (Database['public']['Tables']['order_items']['Row'] & {
    products: {
      name: string;
      product_images: { image_url: string }[];
    } | null;
  })[];
};

export default async function OrderSuccessPage({ params }: PageProps) {
  // Await params
  const { orderNumber } = await params;
  
  console.log('Success page - Order Number:', orderNumber); // Debug log
  
  const supabase = await createServerClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (name, product_images (image_url))
      )
    `)
    .eq("order_number", orderNumber)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    notFound();
  }

  if (!order) {
    console.error('Order not found:', orderNumber);
    notFound();
  }

  // Type assertion after null check
  const typedOrder = order as unknown as OrderWithRelations;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
         <div className="mb-6">
        <Link href="/checkout" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
        <div className="mb-6">
            
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-left">
              <p className="text-gray-600">Order Number</p>
              <p className="font-semibold">{typedOrder.order_number}</p>
            </div>
            <div className="text-left">
              <p className="text-gray-600">Total Amount</p>
              <p className="font-semibold">Rs. {typedOrder.final_amount.toLocaleString()}</p>
            </div>
            <div className="text-left">
              <p className="text-gray-600">Payment Method</p>
              <p className="font-semibold">Cash on Delivery</p>
            </div>
            <div className="text-left">
              <p className="text-gray-600">Status</p>
              <p className="font-semibold capitalize">{typedOrder.status}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Order Items</h2>
          <div className="space-y-3">
            {typedOrder.order_items.map((item) => (
              <div
                key={item.order_item_id}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-3">
                  {item.products?.product_images?.[0]?.image_url && (
                    <img
                      src={item.products.product_images[0].image_url}
                      alt={item.product_name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">Rs. {item.total_price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Delivery Address</h2>
          {typedOrder.delivery_address_backup && (
            <div className="text-sm text-left bg-gray-50 p-4 rounded">
              <p className="font-medium">
                {(typedOrder.delivery_address_backup as any).full_name}
              </p>
              <p>{(typedOrder.delivery_address_backup as any).phone_number}</p>
              <p className="mt-2">
                {(typedOrder.delivery_address_backup as any).address_line_1}
                {(typedOrder.delivery_address_backup as any).address_line_2 && (
                  <>, {(typedOrder.delivery_address_backup as any).address_line_2}</>
                )}
              </p>
              <p>
                {(typedOrder.delivery_address_backup as any).area && 
                  `${(typedOrder.delivery_address_backup as any).area}, `}
                {(typedOrder.delivery_address_backup as any).city}
                {(typedOrder.delivery_address_backup as any).postal_code && 
                  ` - ${(typedOrder.delivery_address_backup as any).postal_code}`}
              </p>
              <p>{(typedOrder.delivery_address_backup as any).province}, Pakistan</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Link
            href="/products"
            className="block w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
          <Link
            href={`/orders/${typedOrder.order_number}`}
            className="block w-full border border-gray-300 py-3 rounded-md hover:bg-gray-50"
          >
            View Order Details
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          You will receive a confirmation email at {typedOrder.customer_email}
        </p>
      </div>
    </div>
  );
}