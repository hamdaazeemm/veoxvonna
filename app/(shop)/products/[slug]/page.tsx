

// app/products/[slug]/page.tsx

import { ProductService } from "@/lib/services/product-service";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";

export default async function ProductDetail(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  
  // Use the service directly
  const product = await ProductService.getProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const mainImage = product.images?.[0];
  const currentPrice = product.is_on_sale && product.sale_price ? product.sale_price : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          {mainImage && (
            <Image
              src={mainImage.image_url}
              alt={mainImage.alt_text || product.name}
              width={500}
              height={500}
              className="w-full rounded-lg"
            />
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.category?.name}</p>
          
          <div className="mt-4">
            {product.is_on_sale && product.sale_price ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-red-600">
                  Rs. {product.sale_price.toLocaleString()}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Add to Cart Button */}
          <div className="mt-6">
            {/* //<AddToCartButton productId={product.product_id} /> */}
            <AddToCartButton 
  productId={product.product_id}
  name={product.name}
  price={currentPrice}
  image_url={mainImage?.image_url}
/>
          </div>
        </div>
      </div>
    </div>
  );
}