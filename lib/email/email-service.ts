// lib/email/email-service.ts
import nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import fs from 'fs/promises'
import path from 'path'

export interface OrderEmailContext {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  orderDate: string
  items: Array<{
    name: string
    quantity: number
    unitPrice: number
    totalPrice: number
    size?: string
    color?: string
    attributes?: any
  }>
  subtotal: number
  discount: number
  deliveryCharges: number
  totalAmount: number
  shippingAddress: {
    full_name: string
    phone_number: string
    address_line_1: string
    address_line_2?: string
    area?: string
    city: string
    province?: string
    postal_code?: string
    country: string
    delivery_instructions?: string
  }
  paymentMethod: string
  trackingNumber?: string
  estimatedDeliveryDate?: string
}

class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    // Create transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }

  private async compileTemplate(templateName: string, context: any): Promise<string> {
    try {
      // Try to load template file
      const templatePath = path.join(process.cwd(), 'lib/email/templates', `${templateName}.hbs`)
      const templateContent = await fs.readFile(templatePath, 'utf-8')
      const template = Handlebars.compile(templateContent)
      return template(context)
    } catch (error) {
      console.warn(`Template ${templateName} not found, using default`)
      // Fallback to simple HTML template
      return this.getFallbackTemplate(templateName, context)
    }
  }

  private getFallbackTemplate(templateName: string, context: any): string {
    if (templateName === 'order-confirmation') {
      return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px; margin-bottom: 30px; }
        .order-details { background: #fff; border: 1px solid #dee2e6; border-radius: 5px; padding: 20px; margin-bottom: 20px; }
        .total { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Veuxvonna Kids Store</h1>
        <p>Order Confirmation</p>
    </div>
    
    <h2>Hello ${context.customerName}!</h2>
    <p>Thank you for your order. Here are your order details:</p>
    
    <div class="order-details">
        <h3>Order #${context.orderNumber}</h3>
        <p><strong>Date:</strong> ${context.orderDate}</p>
        
        <h4>Items:</h4>
        ${context.items.map((item: any) => `
        <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
            <p><strong>${item.name}</strong> × ${item.quantity}</p>
            <p>Price: PKR${item.unitPrice} × ${item.quantity} = ₹${item.totalPrice}</p>
            ${item.size ? `<p>Size: ${item.size}</p>` : ''}
        </div>
        `).join('')}
        
        <div class="total">
            <p><strong>Subtotal:</strong> PKR${context.subtotal}</p>
            <p><strong>Discount:</strong> PKR${context.discount}</p>
            <p><strong>Delivery:</strong> PKR${context.deliveryCharges}</p>
            <p><strong>Total:</strong> PKR${context.totalAmount}</p>
        </div>
    </div>
    
    <p>We'll notify you when your order ships.</p>
    <p>Thank you for shopping with us!</p>
</body>
</html>
      `
    }
    
    return `<p>Email from Veuxvonna Kids Store</p>`
  }

  async sendOrderConfirmation(to: string, context: OrderEmailContext): Promise<boolean> {
    try {
      const html = await this.compileTemplate('order-confirmation', {
        ...context,
        storeName: process.env.STORE_NAME || 'Veuxvonna Kids Store',
        storePhone: process.env.STORE_PHONE || '',
        storeWebsite: process.env.STORE_WEBSITE || 'https://veuxvonna.vercel.app',
        supportEmail: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
        year: new Date().getFullYear(),
      })

      const mailOptions = {
        from: `"${process.env.STORE_NAME || 'Veuxvonna Kids Store'}" <${process.env.EMAIL_USER}>`,
        to,
        subject: `Order Confirmation - #${context.orderNumber}`,
        html,
      }

      const info = await this.transporter.sendMail(mailOptions)
      console.log('Order confirmation email sent:', info.messageId)
      return true
    } catch (error) {
      console.error('Error sending order confirmation email:', error)
      return false
    }
  }

  async sendAdminNotification(orderData: any): Promise<boolean> {
    try {
      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER
      if (!adminEmail) return false

      const html = `
<!DOCTYPE html>
<html>
<body>
    <h2>New Order Received!</h2>
    <p><strong>Order #:</strong> ${orderData.orderNumber}</p>
    <p><strong>Customer:</strong> ${orderData.customerName}</p>
    <p><strong>Email:</strong> ${orderData.customerEmail}</p>
    <p><strong>Phone:</strong> ${orderData.customerPhone}</p>
    <p><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
    <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
    <p><a href="${process.env.ADMIN_URL || process.env.STORE_WEBSITE}/admin/orders/${orderData.orderNumber}">View Order Details</a></p>
</body>
</html>
      `

      const mailOptions = {
        from: `"${process.env.STORE_NAME || 'Veuxvonna'}" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `New Order #${orderData.orderNumber} - ₹${orderData.totalAmount}`,
        html,
      }

      await this.transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('Error sending admin notification:', error)
      return false
    }
  }
}

export const emailService = new EmailService()