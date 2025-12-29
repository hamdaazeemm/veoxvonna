// // // app/(shop)/products/page.tsx

// import ProductCard from "@/components/product/product-card";
// import { ProductService } from "@/lib/services/product-service";

// export default async function ProductsPage() {
//   // Use the service directly instead of fetch
//   const products = await ProductService.getAllProducts();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">All Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.product_id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }


// app/(shop)/products/page.tsx
import ProductCard from "@/components/product/product-card";
import { ProductService } from "@/lib/services/product-service";

export default async function ProductsPage() {
  // Use the service directly instead of fetch
  const products = await ProductService.getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">Browse our complete collection</p>
       
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg 
            className="w-16 h-16 text-gray-400 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
            />
          </svg>
          <p className="text-gray-500 text-lg">No products available yet.</p>
        </div>
      )}
    </div>
  );
}