export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  }).format(price).replace('PKR', 'Rs.')
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export function generateProductUrl(product: any): string {
  const slug = product.sku || product.product_id.toString()
  return `/products/${slug}`
}

export function getDeliveryCharges(city: string): number {
  const charges = {
    karachi: 200,
    lahore: 250,
    islamabad: 300,
    rawalpindi: 300,
  }
  
  return charges[city.toLowerCase() as keyof typeof charges] || 350
}

export function isFreeDeliveryEligible(amount: number): boolean {
  return amount >= 2000
}
