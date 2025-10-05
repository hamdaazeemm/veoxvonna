// 
// components/admin/admin-header.tsx
'use client'

import { LogOut, User } from 'lucide-react'

export default function AdminHeader({ user }: { user: any }) {
  return (
    <header className="border-b border-gray-300 bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <h1 className="text-xl font-semibold text-black hidden sm:block">
            Admin Dashboard
          </h1>
        </div>

        {/* Right side - User info */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-gray-900 font-medium">
              {user.email}
            </span>
          </div>
          
          <form action="/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition-colors duration-200 group"
            >
              <LogOut className="w-4 h-4 group-hover:text-red-600 transition-colors" />
              <span className="hidden sm:block text-sm font-medium">Sign out</span>
            </button>
          </form>
          

        </div>
      </div>
      <div className="bg-red-500 text-white p-4">
  If this is red, Tailwind works!
</div>

    </header>
  )
}
