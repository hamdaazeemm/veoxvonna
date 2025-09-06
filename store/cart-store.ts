



// store/cart-store.ts
import { create } from 'zustand'

interface CartItem {
  cart_item_id?: number
  product_id: number
  name: string
  price: number
  quantity: number
  image_url?: string
}

interface CartState {
  items: CartItem[]
  loading: boolean
  loadCart: (email: string) => Promise<void>
  addItem: (product: CartItem, email: string) => Promise<void>
  removeItem: (cartItemId: number, email: string) => Promise<void>
  updateQuantity: (cartItemId: number, quantity: number, email: string) => Promise<void>
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,

  loadCart: async (email: string) => {
    set({ loading: true })
    try {
      const response = await fetch(`/api/cart?email=${encodeURIComponent(email)}`)
      if (response.ok) {
        const cartData = await response.json()
        
        // Transform the data to match our CartItem interface
        const transformedItems = cartData.map((item: any) => ({
          cart_item_id: item.cart_item_id,
          product_id: item.products.product_id,
          name: item.products.name,
          price: item.products.sale_price || item.products.price,
          quantity: item.quantity,
          image_url: item.products.product_images?.[0]?.image_url
        }))
        
        set({ items: transformedItems })
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      set({ loading: false })
    }
  },

  addItem: async (product: CartItem, email: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_email: email,
          product_id: product.product_id,
          quantity: product.quantity || 1,
        }),
      })

      if (response.ok) {
        // Reload the cart to get the updated data with cart_item_id
        get().loadCart(email)
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  },

  removeItem: async (cartItemId: number, email: string) => {
    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Update local state immediately for better UX
        set({ items: get().items.filter(item => item.cart_item_id !== cartItemId) })
        // Then reload to ensure sync with database
        get().loadCart(email)
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  },

  updateQuantity: async (cartItemId: number, quantity: number, email: string) => {
    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      })

      if (response.ok) {
        // Update local state immediately for better UX
        set({
          items: get().items.map(item =>
            item.cart_item_id === cartItemId
              ? { ...item, quantity }
              : item
          )
        })
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  },

  clearCart: () => {
    set({ items: [] })
  }
}))