// components/admin/admin-header.tsx
'use client'

export default function AdminHeader({ user }: { user: any }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Welcome, {user.email}
          </span>
          <form action="/auth/logout" method="POST">
            <button
              type="submit"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}