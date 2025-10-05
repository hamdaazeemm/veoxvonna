// components/admin/orders-table.tsx - UPDATED WITH DATE FILTERING
import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface Order {
  order_id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  final_amount: number;
  status: string;
  payment_method: string;
  created_at: string;
}

interface OrdersTableProps {
  fromDate?: string;
  toDate?: string;
}

export default async function OrdersTable({ fromDate, toDate }: OrdersTableProps) {
  try {
    const supabase = await createServerClient()
    
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply date filters if provided
    if (fromDate) {
      const fromDateObj = new Date(fromDate)
      fromDateObj.setHours(0, 0, 0, 0)
      query = query.gte('created_at', fromDateObj.toISOString())
    }

    if (toDate) {
      const toDateObj = new Date(toDate)
      toDateObj.setHours(23, 59, 59, 999)
      query = query.lte('created_at', toDateObj.toISOString())
    }

    const { data: orders, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return (
        <div className="mono-card overflow-hidden">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="font-medium text-black">Error loading orders</p>
              <p className="text-sm mt-1 text-gray-600">{error.message}</p>
            </div>
          </div>
        </div>
      )
    }

    const typedOrders = orders as Order[] | null

  return (
    <div className="mono-card overflow-hidden">
      {/* Results Summary */}
      <div className="mono-card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-medium text-black">
              Orders
            </h3>
            <span className="mono-badge">
              {typedOrders?.length || 0} {(typedOrders?.length || 0) === 1 ? 'order' : 'orders'}
            </span>
          </div>
          {(fromDate || toDate) && (
            <div className="text-sm text-gray-600">
              Filtered by date range
            </div>
          )}
        </div>
      </div>

      {(!typedOrders || typedOrders.length === 0) ? (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-black">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {(fromDate || toDate) 
                ? 'Try adjusting your date range or clear the filters to see all orders.'
                : 'No orders have been placed yet.'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Order Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {typedOrders?.map((order) => (
            <tr 
              key={order.order_id} 
              className="hover:bg-gray-50 cursor-pointer"
            >
              {/* Clickable Order Number */}
              <td className="px-6 py-4 whitespace-nowrap">
                <Link 
                  href={`/admin/orders/${order.order_id}`}
                  className="text-black underline underline-offset-4 hover:no-underline"
                >
                  {order.order_number}
                </Link>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-black">{order.customer_name}</div>
                <div className="text-sm text-gray-500">{order.customer_phone}</div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                Rs. {order.final_amount.toLocaleString()}
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`mono-badge`}>
                  {order.status}
                </span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="capitalize">{order.payment_method}</span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/admin/orders/${order.order_id}`}
                  className="mr-3 underline underline-offset-4 text-black hover:no-underline"
                >
                  View
                </Link>
                <button className="mono-btn px-3 py-1 text-xs">
                  Process
                </button>
              </td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      )}
    </div>
  )
  } catch (error) {
    console.error('Connection error:', error)
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-center py-12">
          <div className="text-red-600 text-center">
            <p className="font-medium">Connection Error</p>
            <p className="text-sm mt-1">
              Unable to connect to the database. Please check your internet connection and try again.
            </p>
            <p className="text-xs mt-2 text-gray-500">
              If the problem persists, contact support.
            </p>
          </div>
        </div>
      </div>
    )
  }
}