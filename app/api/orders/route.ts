// //app/api/orders/route.ts

// import { NextResponse } from 'next/server'
// import { createClient } from '@supabase/supabase-js'

// export async function GET() {
//   try {
//     // Create a direct Supabase client for API routes
//     const supabase = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         auth: {
//           persistSession: false,
//           autoRefreshToken: false,
//           detectSessionInUrl: false
//         }
//       }
//     )
    
//     // Add timeout to the query
//     const queryPromise = supabase
//       .from('orders')
//       .select('*')
//       .order('created_at', { ascending: false })

//     // Race between query and timeout
//     const timeoutPromise = new Promise((_, reject) => 
//       setTimeout(() => reject(new Error('Query timeout')), 15000)
//     )

//     const { data: orders, error } = await Promise.race([queryPromise, timeoutPromise]) as any

//     if (error) {
//       console.error('Supabase error:', error)
//       return NextResponse.json(
//         { 
//           error: 'Database connection failed', 
//           details: error.message,
//           orders: [] // Return empty array as fallback
//         },
//         { status: 200 } // Return 200 with error message instead of 500
//       )
//     }

//     return NextResponse.json({ orders: orders || [] })
//   } catch (error) {
//     console.error('API error:', error)
    
//     // Return empty orders array instead of error to prevent UI breaking
//     return NextResponse.json({ 
//       orders: [],
//       error: 'Connection timeout - showing empty results',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     })
//   }
// }


// // app/api/orders/route.ts - MERGED VERSION
// // app/api/orders/route.ts - FIXED WITH PROPER TYPES
// import { NextResponse } from 'next/server'
// import { createServerClient } from '@/lib/supabase/server'
// import { createClient } from '@supabase/supabase-js'
// import type { Database } from '@/lib/supabase/types'

// // Type aliases for cleaner code
// type CustomerInsert = Database['public']['Tables']['customers']['Insert']
// type CustomerRow = Database['public']['Tables']['customers']['Row']
// type AddressInsert = Database['public']['Tables']['addresses']['Insert']
// type OrderInsert = Database['public']['Tables']['orders']['Insert']
// type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']

// // GET - Fetch orders (your existing code + customer filter)
// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const email = url.searchParams.get("email");

//     // Create a direct Supabase client for API routes
//     const supabase = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         auth: {
//           persistSession: false,
//           autoRefreshToken: false,
//           detectSessionInUrl: false
//         }
//       }
//     )
    
//     // Build query
//     let query = supabase
//       .from('orders')
//       .select(`
//         *,
//         order_items (
//           *,
//           products (name, product_images (image_url))
//         )
//       `)
//       .order('created_at', { ascending: false })

//     // Filter by email if provided (for customer orders page)
//     if (email) {
//       query = query.eq('customer_email', email)
//     }

//     // Add timeout to the query
//     const timeoutPromise = new Promise((_, reject) => 
//       setTimeout(() => reject(new Error('Query timeout')), 15000)
//     )

//     const { data: orders, error } = await Promise.race([query, timeoutPromise]) as any

//     if (error) {
//       console.error('Supabase error:', error)
//       return NextResponse.json(
//         { 
//           error: 'Database connection failed', 
//           details: error.message,
//           orders: []
//         },
//         { status: 200 }
//       )
//     }

//     return NextResponse.json(orders || [])
//   } catch (error) {
//     console.error('API error:', error)
    
//     return NextResponse.json(
//       [], 
//       { status: 200 }
//     )
//   }
// }

// // POST - Create new order (checkout)
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const supabase =  await createServerClient();

//     // Validate required fields
//     if (!body.customer_email || !body.items || body.items.length === 0) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Generate unique order number
//     const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

//     // Step 1: Create or get customer
//     let customerId: number | null = null;

//     const { data: existingCustomer } = await supabase
//       .from("customers")
//       //.select("customer_id, total_orders, total_spent")
//       .select<'*', Database['public']['Tables']['customers']['Row']>('*')
//       .eq("email", body.customer_email)
//       .single();

//     if (existingCustomer) {
//       customerId = existingCustomer.customer_id;

//       // Update customer stats - proper typing
//       const updateData = {
//         total_orders: existingCustomer.total_orders + 1,
//         total_spent: existingCustomer.total_spent + body.final_amount,
//         last_order_date: new Date().toISOString(),
//       };

//       await supabase
//         .from("customers")
//         .update(updateData)
//         .eq("customer_id", customerId);
//     } else {
//       // Create new customer - proper typing
//       const newCustomerData: Database['public']['Tables']['customers']['Insert'] = {
//         name: body.customer_name,
//         email: body.customer_email,
//         phone_number: body.customer_phone,
//         whatsapp_number: body.customer_whatsapp || null,
//         total_orders: 1,
//         total_spent: body.final_amount,
//         first_order_date: new Date().toISOString(),
//         last_order_date: new Date().toISOString(),
//       };

//       const { data: newCustomer, error: customerError } = await supabase
//         .from("customers")
//         .insert(newCustomerData)
//         .select("customer_id")
//         .single();

//       if (customerError || !newCustomer) {
//         console.error("Customer creation error:", customerError);
//         throw new Error("Failed to create customer");
//       }

//       customerId = newCustomer.customer_id;
//     }

//     // Step 2: Create delivery address
//     let addressId: number | null = null;

//     if (body.delivery_address) {
//       const addressData: AddressInsert = {
//         customer_id: customerId,
//         full_name: body.delivery_address.full_name,
//         phone_number: body.delivery_address.phone_number,
//         whatsapp_number: body.delivery_address.whatsapp_number || null,
//         address_line_1: body.delivery_address.address_line_1,
//         address_line_2: body.delivery_address.address_line_2 || null,
//         area: body.delivery_address.area || null,
//         city: body.delivery_address.city,
//         province: body.delivery_address.province || null,
//         postal_code: body.delivery_address.postal_code || null,
//         delivery_instructions: body.delivery_address.delivery_instructions || null,
//         is_default: false,
//       };

//       const { data: address, error: addressError } = await supabase
//         .from("addresses")
//         .insert(addressData)
//         .select("address_id")
//         .single();

//       if (addressError) {
//         console.error("Address creation error:", addressError);
//       } else if (address) {
//         addressId = address.address_id;
//       }
//     }

//     // Step 3: Create order
//     const orderData:Database['public']['Tables']['orders']['Insert'] = {
//       order_number: orderNumber,
//       customer_id: customerId,
//       customer_name: body.customer_name,
//       customer_email: body.customer_email,
//       customer_phone: body.customer_phone,
//       customer_whatsapp: body.customer_whatsapp || null,
//       total_amount: body.total_amount,
//       discount_amount: body.discount_amount || 0,
//       delivery_charges: body.delivery_charges || 0,
//       final_amount: body.final_amount,
//       status: "pending",
//       payment_method: body.payment_method || "cod",
//       payment_status: "pending",
//       delivery_address_id: addressId,
//       delivery_address_backup: body.delivery_address,
//     };

//     const { data: order, error: orderError } = await supabase
//       .from("orders")
//       .insert(orderData)
//       .select("order_id")
//       .single();

//     if (orderError || !order) {
//       console.error("Order creation error:", orderError);
//       throw new Error("Failed to create order");
//     }

//     // Step 4: Create order items
//     const orderItems: OrderItemInsert[] = body.items.map((item: any) => ({
//       order_id: order.order_id,
//       product_id: item.product_id,
//       product_name: item.product_name,
//       quantity: item.quantity,
//       unit_price: item.unit_price,
//       total_price: item.total_price,
//       selected_attributes: item.selected_attributes || null,
//     }));

//     const { error: itemsError } = await supabase
//       .from("order_items")
//       .insert(orderItems);

//     if (itemsError) {
//       console.error("Order items error:", itemsError);
//       throw new Error("Failed to create order items");
//     }

//     // Step 5: Apply coupon if provided
//     if (body.coupon_code) {
//       const { data: coupon } = await supabase
//         .from("coupons")
//         .select("coupon_id, used_count")
//         .eq("code", body.coupon_code)
//         .single();

//       if (coupon) {
//         // Insert order coupon
//         await supabase.from("order_coupons").insert({
//           order_id: order.order_id,
//           coupon_id: coupon.coupon_id,
//           discount_applied: body.discount_amount,
//         });

//         // Update coupon usage
//         await supabase
//           .from("coupons")
//           .update({ used_count: coupon.used_count + 1 })
//           .eq("coupon_id", coupon.coupon_id);
//       }
//     }

//     // Step 6: Update product stock
//     for (const item of body.items) {
//       const { data: product } = await supabase
//         .from("products")
//         .select("stock_quantity")
//         .eq("product_id", item.product_id)
//         .single();

//       if (product) {
//         const newStock = product.stock_quantity - item.quantity;
        
//         await supabase
//           .from("products")
//           .update({ stock_quantity: newStock })
//           .eq("product_id", item.product_id);

//         // Log inventory change
//         await supabase.from("inventory_logs").insert({
//           product_id: item.product_id,
//           change_type: "sale",
//           quantity_change: -item.quantity,
//           order_id: order.order_id,
//           previous_stock: product.stock_quantity,
//           new_stock: newStock,
//           notes: `Order ${orderNumber}`,
//         });
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       order_id: order.order_id,
//       order_number: orderNumber,
//     });
//   } catch (error) {
//     console.error("Order creation error:", error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Failed to create order" },
//       { status: 500 }
//     );
//   }
// }
// export async function DELETE(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const email = url.searchParams.get("email");

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const supabase = await createServerClient();
    
//     const { error } = await supabase
//       .from("cart_items")
//       .delete()
//       .eq("customer_email", email);

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal server error" }, 
//       { status: 500 }
//     );
//   }
// }

// app/api/orders/route.ts - USING DB UTILS WRAPPER
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'
import { DbUtils } from '@/lib/supabase/db-utils'
import { ProductService } from '@/lib/services/product-service'
import { emailService } from '@/lib/email/email-service'
export async function GET() {
  try {
    // Create a direct Supabase client for API routes
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    )
    
    // Add timeout to the query
    const queryPromise = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    // Race between query and timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Query timeout')), 15000)
    )

    const { data: orders, error } = await Promise.race([queryPromise, timeoutPromise]) as any

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          error: 'Database connection failed', 
          details: error.message,
          orders: [] // Return empty array as fallback
        },
        { status: 200 } // Return 200 with error message instead of 500
      )
    }

    return NextResponse.json({ orders: orders || [] })
  } catch (error) {
    console.error('API error:', error)
    
    // Return empty orders array instead of error to prevent UI breaking
    return NextResponse.json({ 
      orders: [],
      error: 'Connection timeout - showing empty results',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
// POST - Create new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = await createServerClient();
    const db = new DbUtils(supabase);

    if (!body.customer_email || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    //const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Step 1: Create or get customer
    let customerId: number | null = null;

    const { data: existingCustomer } = await db.selectOne(
      "customers",
      "email",
      body.customer_email
    );

    if (existingCustomer) {
      customerId = existingCustomer.customer_id;

      if (customerId !== null) {
        await db.updateOne("customers", customerId, "customer_id", {
          total_orders: existingCustomer.total_orders + 1,
          total_spent: Number(existingCustomer.total_spent) + Number(body.final_amount),
          last_order_date: new Date().toISOString(),
        });
      }
    } else {
      const newCustomer = await db.insertOne("customers", {
        name: body.customer_name,
        email: body.customer_email,
        phone_number: body.customer_phone,
        whatsapp_number: body.customer_whatsapp || null,
        total_orders: 1,
        total_spent: Number(body.final_amount),
        first_order_date: new Date().toISOString(),
        last_order_date: new Date().toISOString(),
      });

      customerId = newCustomer.customer_id;
    }

    // Ensure we have a valid customer ID before proceeding
    if (!customerId) {
      throw new Error("Failed to get customer ID");
    }

    // Step 2: Create delivery address
    let addressId: number | null = null;

    if (body.delivery_address) {
      try {
        const address = await db.insertOne("addresses", {
          customer_id: customerId,
          full_name: body.delivery_address.full_name,
          phone_number: body.delivery_address.phone_number,
          whatsapp_number: body.delivery_address.whatsapp_number || null,
          address_line_1: body.delivery_address.address_line_1,
          address_line_2: body.delivery_address.address_line_2 || null,
          area: body.delivery_address.area || null,
          city: body.delivery_address.city,
          province: body.delivery_address.province || null,
          postal_code: body.delivery_address.postal_code || null,
          delivery_instructions: body.delivery_address.delivery_instructions || null,
          is_default: false,
        });

        addressId = address.address_id;
      } catch (error) {
        console.error("Address creation error:", error);
      }
    }

    // Step 3: Create order
    const order = await db.insertOne("orders", {
      //order_number: orderNumber,
      customer_id: customerId,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      customer_whatsapp: body.customer_whatsapp || null,
      total_amount: Number(body.total_amount),
      discount_amount: Number(body.discount_amount) || 0,
      delivery_charges: Number(body.delivery_charges) || 0,
      final_amount: Number(body.final_amount),
      status: "confirmed",
      payment_method: body.payment_method || "cod",
      payment_status: "pending",
      delivery_address_id: addressId,
      delivery_address_backup: body.delivery_address || null,
    });
      // The order should now have the database-generated order_number
    console.log('Order created with number:', order.order_number);

    // Step 4: Create order items
    const orderItems = body.items.map((item: any) => ({
      order_id: order.order_id,
      product_id: item.product_id,
      product_name: item.product_name,
      quantity: Number(item.quantity),
      unit_price: Number(item.unit_price),
      total_price: Number(item.total_price),
      selected_attributes: item.selected_attributes || null,
    }));

    await db.insertMany("order_items", orderItems);

    // Step 5: Apply coupon if provided
    if (body.coupon_code) {
      const { data: coupon } = await db.selectOne("coupons", "code", body.coupon_code);

      if (coupon) {
        await db.insertOne("order_coupons", {
          order_id: order.order_id,
          coupon_id: coupon.coupon_id,
          discount_applied: Number(body.discount_amount),
        });

        await db.updateOne("coupons", coupon.coupon_id, "coupon_id", {
          used_count: coupon.used_count + 1,
        });
      }
    }

   
    const inventoryUpdated = await ProductService.updateInventoryAfterOrder(order.order_id)

if (!inventoryUpdated) {
  console.error('Failed to update inventory for order:', order.order_id)
  // Don't fail the order, but log it for manual intervention
} 
// ========== STEP 7: SEND EMAILS ==========
    const emailResults = {
      customerEmailSent: false,
      adminEmailSent: false
    }

    try {
      // Send order confirmation to customer
      emailResults.customerEmailSent = await emailService.sendOrderConfirmation(
        body.customer_email,
        {
          orderNumber: order.order_number || `ORD-${order.order_id}`,
          customerName: body.customer_name,
          customerEmail: body.customer_email,
          customerPhone: body.customer_phone,
          orderDate: new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          items: body.items.map((item: any) => ({
            name: item.product_name,
            quantity: item.quantity,
            unitPrice: item.unit_price,
            totalPrice: item.total_price,
            size: item.selected_attributes?.size,
            color: item.selected_attributes?.color,
            attributes: item.selected_attributes
          })),
          subtotal: body.total_amount,
          discount: body.discount_amount || 0,
          deliveryCharges: body.delivery_charges || 0,
          totalAmount: body.final_amount,
          shippingAddress: body.delivery_address,
          paymentMethod: body.payment_method || 'COD',
        }
      )

      // Send admin notification
      emailResults.adminEmailSent = await emailService.sendAdminNotification({
        orderNumber: order.order_number || `ORD-${order.order_id}`,
        customerName: body.customer_name,
        customerEmail: body.customer_email,
        customerPhone: body.customer_phone,
        totalAmount: body.final_amount,
        paymentMethod: body.payment_method || 'COD',
      })

      console.log('Email sending results:', emailResults)

    } catch (emailError) {
      console.error('Error sending emails:', emailError)
      // Don't fail the order if emails fail
    }

    return NextResponse.json({
      success: true,
      order_id: order.order_id,
      order_number: order.order_number,
      inventory_updated: inventoryUpdated,
       emails_sent: emailResults
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create order" },
      { status: 500 }
    );
  }
}

// DELETE - Clear cart
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createServerClient();
    
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("customer_email", email);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}