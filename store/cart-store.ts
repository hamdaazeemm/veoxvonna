



// // store/cart-store.ts
// import { create } from 'zustand'

// interface CartItem {
//   cart_item_id?: number
//   product_id: number
//   name: string
//   price: number
//   quantity: number
//   image_url?: string
// }

// interface CartState {
//   items: CartItem[]
//   loading: boolean
//   loadCart: (email: string) => Promise<void>
//   addItem: (product: CartItem, email: string) => Promise<void>
//   removeItem: (cartItemId: number, email: string) => Promise<void>
//   updateQuantity: (cartItemId: number, quantity: number, email: string) => Promise<void>
//   clearCart: () => void
// }

// export const useCartStore = create<CartState>((set, get) => ({
//   items: [],
//   loading: false,

//   loadCart: async (email: string) => {
//     set({ loading: true })
//     try {
//       const response = await fetch(`/api/cart?email=${encodeURIComponent(email)}`)
//       if (response.ok) {
//         const cartData = await response.json()
        
//         // Transform the data to match our CartItem interface
//         const transformedItems = cartData.map((item: any) => ({
//           cart_item_id: item.cart_item_id,
//           product_id: item.products.product_id,
//           name: item.products.name,
//           price: item.products.sale_price || item.products.price,
//           quantity: item.quantity,
//           image_url: item.products.product_images?.[0]?.image_url
//         }))
        
//         set({ items: transformedItems })
//       }
//     } catch (error) {
//       console.error('Error loading cart:', error)
//     } finally {
//       set({ loading: false })
//     }
//   },

//   addItem: async (product: CartItem, email: string) => {
//     try {
//       const response = await fetch('/api/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           customer_email: email,
//           product_id: product.product_id,
//           quantity: product.quantity || 1,
//         }),
//       })

//       if (response.ok) {
//         // Reload the cart to get the updated data with cart_item_id
//         get().loadCart(email)
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error)
//     }
//   },

//   removeItem: async (cartItemId: number, email: string) => {
//     try {
//       const response = await fetch(`/api/cart/${cartItemId}`, {
//         method: 'DELETE',
//       })

//       if (response.ok) {
//         // Update local state immediately for better UX
//         set({ items: get().items.filter(item => item.cart_item_id !== cartItemId) })
//         // Then reload to ensure sync with database
//         get().loadCart(email)
//       }
//     } catch (error) {
//       console.error('Error removing from cart:', error)
//     }
//   },

//   updateQuantity: async (cartItemId: number, quantity: number, email: string) => {
//     try {
//       const response = await fetch(`/api/cart/${cartItemId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ quantity }),
//       })

//       if (response.ok) {
//         // Update local state immediately for better UX
//         set({
//           items: get().items.map(item =>
//             item.cart_item_id === cartItemId
//               ? { ...item, quantity }
//               : item
//           )
//         })
//       }
//     } catch (error) {
//       console.error('Error updating quantity:', error)
//     }
//   },

//   clearCart: () => {
//     set({ items: [] })
//   }
// }))
// {
//   "name": "veoxvonna",
//   "version": "0.1.0",
//   "private": true,
//   "scripts": {
//     "dev": "next dev --hostname 0.0.0.0",
//     "build": "next build",
//     "start": "next start",
//     "lint": "eslint",
//     "tailwind:init": "tailwindcss init -p"
//   },
//   "dependencies": {
//     "@supabase/ssr": "^0.8.0",
//     "@supabase/supabase-js": "^2.86.2",
//     "lucide-react": "^0.460.0",
//     "next": "^14.2.11",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "tailwindcss": "^3.4.1",
//     "zustand": "^5.0.8"
//   },
//   "devDependencies": {
//     "@eslint/eslintrc": "^3",
//     "@tailwindcss/postcss": "^4.1.13",
//     "@types/node": "^20.17.16",
//     "@types/react": "^18.2.0",
//     "@types/react-dom": "^18.2.0",
//     "autoprefixer": "^10.4.21",
//     "eslint": "^8.56.0",
//     "eslint-config-next": "14.0.0",
//     "postcss": "^8.5.6",
//     "typescript": "^5.3.3"
//   }
// }


// store/cart-store.ts
import { create } from 'zustand'

interface CartItem {
  cart_item_id?: number
  product_id: number
  name: string
  price: number
  quantity: number
  image_url?: string
  selected_attributes?: any | null  // Add this line
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
          image_url: item.products.product_images?.[0]?.image_url,
          selected_attributes: item.selected_attributes  // Add this line
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
          selected_attributes: product.selected_attributes || null  // Add this line
        }),
      })

      if (response.ok) {
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
        set({ items: get().items.filter(item => item.cart_item_id !== cartItemId) })
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