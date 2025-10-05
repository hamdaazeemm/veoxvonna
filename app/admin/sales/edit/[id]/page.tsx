// app/admin/sales/edit/[id]/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import CampaignForm from '@/components/admin/campaign-form'

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
  const user = await getUser()
  if (!user) redirect('/auth/login')

  const supabase = await createServerClient()
  const { data } = await supabase
    .from('sales_campaigns')
    .select('*')
    .eq('campaign_id', Number(params.id))
    .single()

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Edit Campaign</h1>
      <CampaignForm mode="edit" initial={data} />
    </div>
  )
}



