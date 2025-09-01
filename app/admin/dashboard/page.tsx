// app/admin/dashboard/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const user = await getUser() // Use getUser() instead of getSession()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ... dashboard content ... */}
      </div>
    </div>
  )
}