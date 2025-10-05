// app/admin/settings/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'

export default async function AdminSettings() {
  const user = await getUser()
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Settings</h1>

      <div className="mono-card">
        <div className="mono-card-header">
          <h3 className="text-lg font-medium text-black">General</h3>
        </div>
        <div className="mono-card-body">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input className="mono-input" placeholder="Veoxvonna" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input className="mono-input" placeholder="support@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                <input className="mono-input" placeholder="03xx-xxxxxxx" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="mono-btn">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <div className="mono-card mt-6">
        <div className="mono-card-header">
          <h3 className="text-lg font-medium text-black">Change Password</h3>
        </div>
        <div className="mono-card-body">
          <form action="/api/auth/change-password" method="POST" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" className="mono-input" defaultValue={user.email} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input name="currentPassword" type="password" className="mono-input" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input name="newPassword" type="password" className="mono-input" minLength={6} required />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="mono-btn">Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


