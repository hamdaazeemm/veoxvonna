// app/admin/layout.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/admin-sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  
  console.log('Admin layout user:', user?.email) // Debug

  if (!user) {
    console.log('No user in admin layout, redirecting to login')
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}