// // app/admin/dashboard/page.tsx - UPDATED
// import { getUser } from '@/lib/utils/auth'
// import { redirect } from 'next/navigation'
// import DashboardStats from '@/components/admin/dashboard-stats'
// import RecentActivity from '@/components/admin/recent-activity'
// import QuickActions from '@/components/admin/quick-actions'

// export default async function AdminDashboard() {
//   const user = await getUser()

//   if (!user) {
//     redirect('/auth/login')
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
//       {/* Quick Actions */}
//       <QuickActions />
      
//       {/* Key Metrics */}
//       <DashboardStats />
      
//       {/* Recent Activity */}
//       <RecentActivity />
//     </div>
//   )
// }

// app/admin/dashboard/page.tsx - UPDATED WITH SUSPENSE
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import DashboardStats from '@/components/admin/dashboard-stats'
import RecentActivity from '@/components/admin/recent-activity'
import QuickActions from '@/components/admin/quick-actions'
import { Suspense } from 'react'

// Loading components for suspense
function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}

function ActivityLoading() {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex justify-between items-center border-b pb-2">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function AdminDashboard() {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <QuickActions />
      </section>
      
      {/* Key Metrics with Suspense */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Metrics</h2>
        <Suspense fallback={<StatsLoading />}>
          <DashboardStats />
        </Suspense>
      </section>
      
      {/* Recent Activity with Suspense */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h2>
        <Suspense fallback={<ActivityLoading />}>
          <RecentActivity />
        </Suspense>
      </section>
    </div>
  )
}