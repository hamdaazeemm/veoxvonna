// app/orders/[orderNumber]/page.tsx
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Database } from "@/lib/supabase/types";

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
  addresses: Database['public']['Tables']['addresses']['Row'] | null;
};

export default async function OrderDetailPage({ params }: PageProps) {
  // Await params in Next.js 15
  const { orderNumber } = await params;
  
  const supabase = await createServerClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (name, product_images (image_url))
      ),
      addresses (*)
    `)
    .eq("order_number", orderNumber)
    .single();

  if (error || !order) {
    notFound();
  }

  // Type assertion after null check
  const typedOrder = order as unknown as OrderWithRelations;

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Order #{typedOrder.order_number}</h1>
            <p className="text-gray-600">
              Placed on {new Date(typedOrder.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[typedOrder.status]}`}>
            {typedOrder.status.charAt(0).toUpperCase() + typedOrder.status.slice(1)}
          </span>
        </div>

        {/* Order Timeline */}
        <div className="mb-6 pb-6 border-b">
          <h2 className="font-semibold mb-4">Order Status</h2>
          <div className="space-y-3">
            {["pending", "confirmed", "processing", "shipped", "delivered"].map((status) => {
              const statusIndex = ["pending", "confirmed", "processing", "shipped", "delivered"].indexOf(typedOrder.status);
              const currentIndex = ["pending", "confirmed", "processing", "shipped", "delivered"].indexOf(status);
              const isActive = currentIndex <= statusIndex;
              
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${isActive ? "bg-blue-600" : "bg-gray-300"}`} />
                  <span className={isActive ? "text-gray-900" : "text-gray-400"}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6 pb-6 border-b">
          <h2 className="font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {typedOrder.order_items.map((item) => (
              <div key={item.order_item_id} className="flex items-center gap-4">
                {item.products?.product_images?.[0]?.image_url && (
                  <img
                    src={item.products.product_images[0].image_url}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{item.product_name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Unit Price: Rs. {item.unit_price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rs. {item.total_price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6 pb-6 border-b">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>Rs. {typedOrder.total_amount.toLocaleString()}</span>
            </div>
            {typedOrder.discount_amount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- Rs. {typedOrder.discount_amount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charges</span>
              <span>Rs. {typedOrder.delivery_charges.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>Rs. {typedOrder.final_amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-3">Customer Information</h2>
            <div className="text-sm space-y-1">
              <p className="font-medium">{typedOrder.customer_name}</p>
              <p className="text-gray-600">{typedOrder.customer_email}</p>
              <p className="text-gray-600">{typedOrder.customer_phone}</p>
              {typedOrder.customer_whatsapp && (
                <p className="text-gray-600">WhatsApp: {typedOrder.customer_whatsapp}</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Delivery Address</h2>
            {typedOrder.delivery_address_backup && (
              <div className="text-sm space-y-1">
                <p className="font-medium">
                  {(typedOrder.delivery_address_backup as any).full_name}
                </p>
                <p className="text-gray-600">
                  {(typedOrder.delivery_address_backup as any).phone_number}
                </p>
                <p className="text-gray-600 mt-2">
                  {(typedOrder.delivery_address_backup as any).address_line_1}
                  {(typedOrder.delivery_address_backup as any).address_line_2 && (
                    <>, {(typedOrder.delivery_address_backup as any).address_line_2}</>
                  )}
                </p>
                <p className="text-gray-600">
                  {(typedOrder.delivery_address_backup as any).area && 
                    `${(typedOrder.delivery_address_backup as any).area}, `}
                  {(typedOrder.delivery_address_backup as any).city}
                  {(typedOrder.delivery_address_backup as any).postal_code && 
                    ` - ${(typedOrder.delivery_address_backup as any).postal_code}`}
                </p>
                <p className="text-gray-600">
                  {(typedOrder.delivery_address_backup as any).province}, Pakistan
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tracking Information */}
        {typedOrder.tracking_number && (
          <div className="mt-6 pt-6 border-t">
            <h2 className="font-semibold mb-3">Tracking Information</h2>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm mb-1">
                <span className="font-medium">Courier:</span> {typedOrder.courier_service}
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Tracking Number:</span> {typedOrder.tracking_number}
              </p>
              {typedOrder.expected_delivery_date && (
                <p className="text-sm text-gray-600">
                  Expected Delivery: {new Date(typedOrder.expected_delivery_date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Admin Notes (if any) */}
        {typedOrder.admin_notes && (
          <div className="mt-6 pt-6 border-t">
            <h2 className="font-semibold mb-3">Additional Notes</h2>
            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded">
              {typedOrder.admin_notes}
            </p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h3 className="font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          If you have any questions about your order, please contact our support team.
        </p>
        <a
          href={`https://wa.me/923001234567?text=Hi, I need help with order ${typedOrder.order_number}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Contact on WhatsApp
        </a>
      </div>
    </div>
  );
}