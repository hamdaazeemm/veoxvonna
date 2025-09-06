// app/admin/orders/page.tsx
import { getUser } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'
import OrdersPageWrapper from '@/components/admin/orders-page-wrapper'

export default async function AdminOrders() {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <OrdersPageWrapper />
    </div>
  )
}