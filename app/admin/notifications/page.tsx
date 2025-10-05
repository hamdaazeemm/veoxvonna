// app/admin/notifications/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

interface NotificationRow {
  notification_id: number;
  title: string;
  message: string;
  type: string | null;
  is_read: boolean | null;
  created_at: string;
}

export default async function AdminNotifications() {
  const user = await getUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createServerClient()
  const { data: items } = await supabase
    .from('admin_notifications')
    .select('notification_id,title,message,type,is_read,created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  const rows = (items as NotificationRow[] | null) || []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Notifications</h1>
        <span className="mono-badge">{rows.length} items</span>
      </div>

      <div className="mono-card overflow-hidden">
        <div className="divide-y divide-gray-200">
          {rows.map(n => (
            <div key={n.notification_id} className="p-4 flex items-start gap-4">
              <div>
                <span className="mono-badge">{n.type || 'system'}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-black">{n.title}</h3>
                  <span className="text-xs text-gray-600">{new Date(n.created_at).toLocaleString()}</span>
                </div>
                <p className="mt-1 text-sm text-gray-700">{n.message}</p>
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">No notifications</div>
          )}
        </div>
      </div>
    </div>
  )
}


