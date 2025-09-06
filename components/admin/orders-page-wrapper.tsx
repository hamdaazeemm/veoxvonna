'use client'
import { useState } from 'react'
import DateSearch from './date-search'
import OrdersTableClient from './orders-table-client'

export default function OrdersPageWrapper() {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const handleSearch = (from: string, to: string) => {
    setFromDate(from)
    setToDate(to)
  }

  const handleClear = () => {
    setFromDate('')
    setToDate('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
      
      {/* Date Search Component */}
      <DateSearch onSearch={handleSearch} onClear={handleClear} />
      
      {/* Orders Table with Date Filters */}
      <OrdersTableClient fromDate={fromDate} toDate={toDate} />
    </div>
  )
}
