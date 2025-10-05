// app/admin/sales/new/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import CampaignForm from '@/components/admin/campaign-form'

export default async function NewCampaignPage() {
  const user = await getUser()
  if (!user) redirect('/auth/login')
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">New Campaign</h1>
      <CampaignForm mode="create" />
    </div>
  )
}


