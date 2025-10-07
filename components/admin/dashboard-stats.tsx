

// components/admin/dashboard-stats.tsx - FIXED FOR HYDRATION
import { createServerClient } from '@/lib/supabase/server'

// Add proper type interfaces
interface Order {
  order_id: number;
  final_amount: number;
  status: string;
  created_at: string;
}

interface Product {
  product_id: number;
  name: string;
  stock_quantity: number;
}

interface Customer {
  customer_id: number;
  created_at: string;
}

// Format number consistently for server and client
function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Format percentage consistently
function formatPercentage(percent: number): string {
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(1)}%`
}

export default async function DashboardStats() {
  const supabase = await createServerClient()
  
  // Get today's date range - use UTC for consistency
  const today = new Date()
  const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  const startOfToday = new Date(utcToday.setUTCHours(0, 0, 0, 0))
  const startOfMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
  const startOfLastMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1))
  const endOfLastMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0))

  // Fetch all the required data with proper typing
  const [
    { count: todayOrders, data: todayRevenueData },
    { count: pendingOrders },
    { data: lowStockProducts },
    { data: newCustomersThisWeek },
    currentMonthRevenue,
    lastMonthRevenue
  ] = await Promise.all([
    // Today's orders
    supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .gte('created_at', startOfToday.toISOString()),
    
    // Pending orders
    supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .eq('status', 'pending'),
    
    // Low stock products
    supabase
      .from('products')
      .select('*')
      .lt('stock_quantity', 5)
      .gt('stock_quantity', 0)
      .order('stock_quantity', { ascending: true })
      .limit(10),
    
    // New customers this week
    supabase
      .from('customers')
      .select('*')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    
    // Current month revenue
    supabase
      .from('orders')
      .select('final_amount')
      .gte('created_at', startOfMonth.toISOString())
      .eq('status', 'delivered'),
    
    // Last month revenue
    supabase
      .from('orders')
      .select('final_amount')
      .gte('created_at', startOfLastMonth.toISOString())
      .lt('created_at', endOfLastMonth.toISOString())
      .eq('status', 'delivered')
  ])

  // Calculate revenues with proper typing
  const currentMonthRevenueTotal = (currentMonthRevenue.data as Order[] | null)?.reduce(
    (sum: number, order: Order) => sum + order.final_amount, 0
  ) || 0

  const lastMonthRevenueTotal = (lastMonthRevenue.data as Order[] | null)?.reduce(
    (sum: number, order: Order) => sum + order.final_amount, 0
  ) || 0

  const revenueChange = lastMonthRevenueTotal > 0 
    ? ((currentMonthRevenueTotal - lastMonthRevenueTotal) / lastMonthRevenueTotal) * 100 
    : 0

  // Calculate today's revenue
  const todayRevenueTotal = (todayRevenueData as Order[] | null)?.reduce(
    (sum: number, order: Order) => sum + order.final_amount, 0
  ) || 0

  // Pre-calculate all values to avoid client-side formatting differences
  const lowStockCount = (lowStockProducts as Product[] | null)?.length || 0
  const todayOrdersCount = todayOrders || 0
  const pendingOrdersCount = pendingOrders || 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="mono-card p-6">
        <h3 className="text-sm font-medium text-gray-700">Today's Orders</h3>
        <p className="mt-2 text-3xl font-bold text-black">{todayOrdersCount}</p>
        <p className="text-gray-600 text-sm">Rs. {formatNumber(todayRevenueTotal)}</p>
      </div>

      <div className="mono-card p-6">
        <h3 className="text-sm font-medium text-gray-700">Pending Orders</h3>
        <p className="mt-2 text-3xl font-bold text-black">{pendingOrdersCount}</p>
        <p className="text-gray-600 text-sm">Awaiting confirmation</p>
      </div>

      <div className="mono-card p-6">
        <h3 className="text-sm font-medium text-gray-700">Low Stock</h3>
        <p className="mt-2 text-3xl font-bold text-black">{lowStockCount}</p>
        <p className="text-gray-600 text-sm">Products need restocking</p>
      </div>
      <div className="mono-card p-6">
        <h3 className="text-sm font-medium text-gray-700">Monthly Revenue</h3>
        <p className="mt-2 text-3xl font-bold text-black">Rs. {formatNumber(currentMonthRevenueTotal)}</p>
        <p className={`text-sm ${revenueChange >= 0 ? 'text-gray-800' : 'text-gray-800'}`}>
          {revenueChange >= 0 ? '↑' : '↓'} {formatPercentage(Math.abs(revenueChange))} from last month
        </p>
      </div>
    </div>
  )
}
