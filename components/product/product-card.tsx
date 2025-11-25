

// components/product/product-card.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductCardProps {
  product: {
    product_id: number;
    sku: string | null;
    name: string;
    price: number;
    sale_price?: number | null;
    is_on_sale?: boolean;
    images?: { image_url: string }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const slug = product.sku || product.product_id.toString();
  const imageUrl = product.images?.[0]?.image_url || "/placeholder.jpg";
  const [computedPrice, setComputedPrice] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/products/current-price/${product.product_id}`);
        const data = await res.json();
        if (isMounted && res.ok) {
          setComputedPrice(data.price);
        }
      } catch {}
    })();
    return () => { isMounted = false };
  }, [product.product_id]);

  const currentPrice = computedPrice ?? (product.is_on_sale && product.sale_price ? product.sale_price : product.price);

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link href={`/products/${slug}`}>
        <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover rounded mb-3" />
        <h3 className="font-semibold mb-1">{product.name}</h3>
        <div className="mb-3">
          {(computedPrice != null && computedPrice < product.price) || (product.is_on_sale && product.sale_price) ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-red-600">Rs. {currentPrice.toLocaleString()}</span>
              <span className="text-sm text-gray-500 line-through">Rs. {product.price.toLocaleString()}</span>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Sale</span>
            </div>
          ) : (
            <p className="text-gray-600">Rs. {product.price.toLocaleString()}</p>
          )}
        </div>
      </Link>
      
      {/* <AddToCartButton 
        productId={product.product_id}
        name={product.name}
        price={currentPrice}
        image_url={imageUrl}
      /> */}
    </div>
  );
}