

// components/product/product-card.tsx
"use client";

import Link from "next/link";
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
  const currentPrice = product.is_on_sale && product.sale_price ? product.sale_price : product.price;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link href={`/products/${slug}`}>
        <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover rounded mb-3" />
        <h3 className="font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 mb-3">Rs. {currentPrice}</p>
      </Link>
      
      <AddToCartButton 
        productId={product.product_id}
        name={product.name}
        price={currentPrice}
        image_url={imageUrl}
      />
    </div>
  );
}