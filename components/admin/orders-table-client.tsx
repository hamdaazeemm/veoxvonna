'use client'
import { useState, useEffect } from 'react'
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

interface OrdersTableClientProps {
  fromDate?: string;
  toDate?: string;
}

export default function OrdersTableClient({ fromDate, toDate }: OrdersTableClientProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Function to fetch orders from API
  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/orders')
      const data = await response.json()
      
      // Always set orders, even if there's an error (fallback to empty array)
      setOrders(data.orders || [])
      
      // Show error message if there's a connection issue, but don't break the UI
      if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Failed to fetch orders')
      setOrders([]) // Set empty array as fallback
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch orders on component mount and retry
  useEffect(() => {
    fetchOrders()
  }, [retryCount])

  // Auto-refresh data every 30 seconds to show real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        fetchOrders()
      }
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [isLoading])

  // Filter orders based on date range
  useEffect(() => {
    if (!orders.length) {
      setFilteredOrders([])
      return
    }

    let filtered = [...orders]

    if (fromDate) {
      const fromDateObj = new Date(fromDate)
      fromDateObj.setHours(0, 0, 0, 0)
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.created_at)
        orderDate.setHours(0, 0, 0, 0)
        return orderDate >= fromDateObj
      })
    }

    if (toDate) {
      const toDateObj = new Date(toDate)
      toDateObj.setHours(23, 59, 59, 999)
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.created_at)
        return orderDate <= toDateObj
      })
    }

    setFilteredOrders(filtered)
  }, [orders, fromDate, toDate])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading orders...</span>
        </div>
      </div>
    )
  }

  // Retry function
  const retryFetch = () => {
    setRetryCount(prev => prev + 1)
    setError(null)
    setIsLoading(true)
  }

  // Refresh function for manual updates
  const refreshData = () => {
    fetchOrders()
  }

  // Show error as a banner instead of replacing the entire table
  const ErrorBanner = () => {
    if (!error) return null
    
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>Connection Issue:</strong> {error}
              </p>
            </div>
          </div>
          <button
            onClick={retryFetch}
            className="ml-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm hover:bg-yellow-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ErrorBanner />
      <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Results Summary */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-medium text-gray-900">
              Orders
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {(fromDate || toDate) && (
              <div className="text-sm text-gray-600">
                Filtered by date range
              </div>
            )}
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              <svg 
                className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.order_id} 
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  {/* Clickable Order Number */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/admin/orders/${order.order_id}`}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      {order.order_number}
                    </Link>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer_name}</div>
                    <div className="text-sm text-gray-500">{order.customer_phone}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rs. {order.final_amount.toLocaleString()}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
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
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </Link>
                    <button className="text-green-600 hover:text-green-900">
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
    </div>
  )
}
