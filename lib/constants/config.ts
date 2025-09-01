// lib/constants/config.ts
export const SITE_CONFIG = {
  name: 'Veoxvonna',
  description: 'Premium kids clothing for ages 3-8 years in Pakistan',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  whatsapp: '+923001234567',
  email: 'info@veoxvonna.com',
  minOrderAmount: 500,
  freeDeliveryThreshold: 2000,
} as const

export const PAKISTANI_CITIES = [
  { name: 'Karachi', charges: 200 },
  { name: 'Lahore', charges: 250 },
  { name: 'Islamabad', charges: 300 },
  { name: 'Rawalpindi', charges: 300 },
  { name: 'Faisalabad', charges: 350 },
  { name: 'Multan', charges: 350 },
  { name: 'Peshawar', charges: 400 },
  { name: 'Quetta', charges: 450 },
] as const

export const ORDER_STATUSES = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
} as const

export const PAYMENT_METHODS = {
  cod: 'Cash on Delivery',
  jazzcash: 'JazzCash',
  easypaisa: 'EasyPaisa',
  bank_transfer: 'Bank Transfer',
} as const