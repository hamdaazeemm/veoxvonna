// components/admin/recent-activity.tsx - FIXED
import { createServerClient } from '@/lib/supabase/server'

interface Order {
  order_id: number;
  order_number: string;
  customer_name: string;
  final_amount: number;
  status: string;
  created_at: string;
}

interface InventoryLog {
  log_id: number;
  product_id: number;
  products?: { name: string };
  quantity_change: number;
  change_type: string;
  created_at: string;
}

export default async function RecentActivity() {
  const supabase = createServerClient()
  
  // Get recent orders with proper typing
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  // Get recent stock changes
  const { data: stockChanges } = await supabase
    .from('inventory_logs')
    .select('*, products(name)')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {(recentOrders as Order[] | null)?.map((order) => (
            <div key={order.order_id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="text-sm text-gray-600">{order.customer_name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Rs. {order.final_amount.toLocaleString()}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
          {(!recentOrders || recentOrders.length === 0) && (
            <p className="text-gray-500">No recent orders</p>
          )}
        </div>
      </div>

      {/* Stock Changes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Stock Activity</h2>
        <div className="space-y-3">
          {(stockChanges as InventoryLog[] | null)?.map((log) => (
            <div key={log.log_id} className="border-b pb-2">
              <p className="font-medium">{log.products?.name || 'Product'}</p>
              <p className="text-sm">
                <span className={log.quantity_change > 0 ? 'text-green-600' : 'text-red-600'}>
                  {log.quantity_change > 0 ? '+' : ''}{log.quantity_change}
                </span>
                {' '}stock change • {log.change_type}
              </p>
            </div>
          ))}
          {(!stockChanges || stockChanges.length === 0) && (
            <p className="text-gray-500">No recent stock activity</p>
          )}
        </div>
      </div>
    </div>
  )
}