// app/admin/sales/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface CampaignRow {
  campaign_id: number;
  name: string;
  campaign_type: string | null;
  discount_value: number | null;
  minimum_order_amount: number | null;
  maximum_discount_amount: number | null;
  is_active: boolean | null;
  start_date: string;
  end_date: string;
  usage_limit: number | null;
  used_count: number | null;
}

export default async function AdminSales() {
  const user = await getUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createServerClient()
  const { data: campaigns } = await supabase
    .from('sales_campaigns')
    .select(`
      campaign_id,
      name,
      campaign_type,
      discount_value,
      minimum_order_amount,
      maximum_discount_amount,
      is_active,
      start_date,
      end_date,
      usage_limit,
      used_count
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  const rows = (campaigns as CampaignRow[] | null) || []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Sales & Promotions</h1>
        <Link href="/admin/sales/new" className="mono-btn">New Campaign</Link>
      </div>

      <div className="mono-card overflow-hidden">
        <div className="mono-card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-black">Campaigns</h3>
            <span className="mono-badge">{rows.length} {rows.length === 1 ? 'campaign' : 'campaigns'}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Discount Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Min Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Max Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Period</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map(r => (
                <tr key={r.campaign_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <Link href={`/admin/sales/edit/${r.campaign_id}`} className="underline underline-offset-4 hover:no-underline">
                      {r.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{r.campaign_type || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {r.discount_value ? (
                      r.campaign_type === 'percentage' ? `${r.discount_value}%` : `Rs. ${r.discount_value.toLocaleString()}`
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {r.minimum_order_amount ? `Rs. ${r.minimum_order_amount.toLocaleString()}` : 'No minimum'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {r.maximum_discount_amount ? `Rs. ${r.maximum_discount_amount.toLocaleString()}` : 'No limit'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {r.usage_limit ? `${r.used_count || 0}/${r.usage_limit}` : `${r.used_count || 0} uses`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm"><span className="mono-badge">{r.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div>{new Date(r.start_date).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">to {new Date(r.end_date).toLocaleDateString()}</div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="px-6 py-12 text-center text-sm text-gray-500" colSpan={8}>No campaigns found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


