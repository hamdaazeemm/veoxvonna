'use client'
import { useState } from 'react'
import { Calendar, Search, X } from 'lucide-react'

interface DateSearchProps {
  onSearch: (fromDate: string, toDate: string) => void
  onClear: () => void
}

export default function DateSearch({ onSearch, onClear }: DateSearchProps) {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const handleSearch = () => {
    onSearch(fromDate, toDate)
  }

  const handleClear = () => {
    setFromDate('')
    setToDate('')
    onClear()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Search Orders by Date</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Select start date"
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Select end date"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
          
          <button
            onClick={handleClear}
            className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>
      
      {(fromDate || toDate) && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Active Filters:</strong> 
            {fromDate && ` From: ${new Date(fromDate).toLocaleDateString()}`}
            {toDate && ` To: ${new Date(toDate).toLocaleDateString()}`}
          </p>
        </div>
      )}
    </div>
  )
}
