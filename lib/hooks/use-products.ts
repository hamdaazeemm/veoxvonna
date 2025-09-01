
// lib/hooks/use-products.ts
import { useState, useEffect } from 'react'
import { ProductService } from '@/lib/services/product-service'

export function useProducts(category?: string) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        let data;
        if (category) {
          data = await ProductService.getProductsByCategory(category)
        } else {
          // Use getAllProducts instead of getFeaturedProducts for the main products page
          data = await ProductService.getAllProducts()
        }
        setProducts(data)
      } catch (err) {
        setError('Failed to fetch products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  return { products, loading, error }
}

export function useProductSearch(searchTerm: string, category?: string) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([])
      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        const data = await ProductService.searchProducts(searchTerm, category)
        setProducts(data)
      } catch (err) {
        setError('Failed to search products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchTerm, category])

  return { products, loading, error }
}