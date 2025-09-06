// components/admin/products-table.tsx - FIXED
import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

// Add proper type interfaces
interface ProductImage {
  image_url: string;
  alt_text?: string;
  display_order: number;
  is_primary: boolean;
}

interface Category {
  category_id: number;
  name: string;
  age_range?: string;
  description?: string;
}

interface Product {
  product_id: number;
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  is_on_sale: boolean;
  stock_quantity: number;
  category_id?: number;
  attributes?: any;
  is_featured: boolean;
  is_active: boolean;
  sku?: string;
  weight_grams?: number;
  created_at: string;
  updated_at: string;
  categories?: Category;
  product_images?: ProductImage[];
}

export default async function ProductsTable() {
  const supabase = await createServerClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(name),
      product_images(image_url)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return <div>Error loading products: {error.message}</div>
  }

  // Cast the data to the proper type
  const typedProducts = products as Product[] | null

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {typedProducts?.map((product) => (
            <tr key={product.product_id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    {product.product_images?.[0] && (
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.product_images[0].image_url}
                        alt={product.name}
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.sku}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.categories?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Rs. {product.price.toLocaleString()}
                {product.sale_price && (
                  <span className="ml-2 text-red-600 line-through">
                    Rs. {product.sale_price.toLocaleString()}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.stock_quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  product.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/admin/products/edit/${product.product_id}`}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {(!typedProducts || typedProducts.length === 0) && (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}