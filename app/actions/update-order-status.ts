'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateOrderStatus(formData: FormData) {
  const orderId = formData.get('order_id') as string
  const status = formData.get('status') as string
  const courier = formData.get('courier') as string
  const trackingNumber = formData.get('tracking_number') as string
  const adminNotes = formData.get('admin_notes') as string

  if (!orderId || !status) {
    throw new Error('Order ID and status are required')
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    // Update the order status
    const updateData: any = {
      status,
      courier_service: courier || null,
      tracking_number: trackingNumber || null,
      admin_notes: adminNotes || null,
      updated_at: new Date().toISOString()
    }

    const { error: updateError } = await supabase
      .from('orders')
      .update(updateData)
      .eq('order_id', parseInt(orderId))

    if (updateError) {
      console.error('Error updating order:', updateError)
      throw new Error('Failed to update order status')
    }

    // If status is delivered, set delivered_at timestamp
    if (status === 'delivered') {
      const deliveredData: any = {
        delivered_at: new Date().toISOString()
      }

      const { error: deliveredError } = await supabase
        .from('orders')
        .update(deliveredData)
        .eq('order_id', parseInt(orderId))

      if (deliveredError) {
        console.error('Error setting delivered_at:', deliveredError)
        // Don't throw error here, status update was successful
      }
    }

    // Revalidate the orders page and dashboard to show updated data
    revalidatePath('/admin/orders')
    revalidatePath('/admin/dashboard')
    revalidatePath(`/admin/orders/${orderId}`)

  } catch (error) {
    console.error('Error in updateOrderStatus:', error)
    throw new Error('Failed to update order status. Please try again.')
  }

  // Redirect after successful update (outside try-catch to avoid catching redirect error)
  redirect(`/admin/orders/${orderId}?updated=true`)
}