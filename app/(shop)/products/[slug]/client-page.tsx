// app/(shop)/products/[slug]/client-page.tsx
"use client";

import { useState, useEffect } from "react";
import { IProduct } from "@/lib/types/product";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImageSlider from "@/components/product/ProductImageSlider";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/sidebar";
import SizeChart from "@/components/SizeChart";
import SizeSelector from "@/components/SizeSelector";

interface ProductClientPageProps {
  product: IProduct;
}

export default function ProductClientPage({ product }: ProductClientPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedStock, setSelectedStock] = useState<number>(0);

  const currentPrice = product.is_on_sale && product.sale_price ? product.sale_price : product.price;

  const handleSizeSelect = (size: string, stockQuantity: number) => {
    setSelectedSize(size);
    setSelectedStock(stockQuantity);
    console.log('Selected size:', size, 'Stock:', stockQuantity);
  };

  // Debug: Check the product structure
  useEffect(() => {
    console.log('ProductClientPage - product structure:', {
      hasSizes: !!product.sizes,
      sizesType: typeof product.sizes,
      sizesValue: product.sizes,
      productId: product.product_id
    });
  }, [product]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Sidebar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images with Slider */}
          <div className="space-y-4">
            <ProductImageSlider 
              images={product.images || []} 
              productName={product.name} 
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
              {product.category && (
                <p className="text-gray-600 mt-2">{product.category.name}</p>
              )}
            </div>
            
            {/* Price */}
            <div className="space-y-2">
              {product.is_on_sale && product.sale_price ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-red-600">
                    Rs. {product.sale_price.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Sale
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Debug info */}
            

            {/* Size Selector */}
            <SizeSelector 
              sizes={product.sizes}
              onSizeSelect={handleSizeSelect}
            />

            {/* Size Chart */}
            <SizeChart />

            {/* Add to Cart Button - Updated to include selected size */}
            <div className="pt-4">
              <AddToCartButton 
                productId={product.product_id}
                name={product.name}
                price={currentPrice}
                image_url={product.images?.[0]?.image_url}
                selectedSize={selectedSize}
                requireSize={true} // Set to true if size is required for this product
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}