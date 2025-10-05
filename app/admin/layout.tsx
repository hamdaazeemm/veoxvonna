// 


// app/admin/layout.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="h-screen bg-white text-black">
      {/* Fixed sidebar with integrated header */}
      <div className="fixed inset-y-0 left-0 w-64 border-r border-gray-200 bg-white overflow-hidden">
        <AdminSidebar user={user} />
      </div>

      {/* Content area with left padding equal to sidebar width */}
      <div className="pl-64 h-full overflow-y-auto">
        <main className="min-h-full">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}