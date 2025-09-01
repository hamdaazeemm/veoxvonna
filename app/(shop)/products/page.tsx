// // app/(shop)/products/page.tsx

import ProductCard from "@/components/product/product-card";
import { ProductService } from "@/lib/services/product-service";

export default async function ProductsPage() {
  // Use the service directly instead of fetch
  const products = await ProductService.getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}