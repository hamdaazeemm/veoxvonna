

// // app/products/[slug]/page.tsx

// import { ProductService } from "@/lib/services/product-service";
// import AddToCartButton from "@/components/AddToCartButton";
// import Image from "next/image";

// export default async function ProductDetail(props: { params: Promise<{ slug: string }> }) {
//   const { slug } = await props.params;
  
//   // Use the service directly
//   const product = await ProductService.getProductBySlug(slug);

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h1 className="text-2xl font-bold">Product not found</h1>
//       </div>
//     );
//   }

//   const mainImage = product.images?.[0];
//   const currentPrice = product.is_on_sale && product.sale_price ? product.sale_price : product.price;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Product Images */}
//         <div>
//           {mainImage && (
//             <Image
//               src={mainImage.image_url}
//               alt={mainImage.alt_text || product.name}
//               width={500}
//               height={500}
//               className="w-full rounded-lg"
//             />
//           )}
//         </div>

//         {/* Product Info */}
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-gray-600 mt-2">{product.category?.name}</p>
          
//           <div className="mt-4">
//             {product.is_on_sale && product.sale_price ? (
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl font-bold text-red-600">
//                   Rs. {product.sale_price.toLocaleString()}
//                 </span>
//                 <span className="text-lg text-gray-500 line-through">
//                   Rs. {product.price.toLocaleString()}
//                 </span>
//               </div>
//             ) : (
//               <span className="text-2xl font-bold">
//                 Rs. {product.price.toLocaleString()}
//               </span>
//             )}
//           </div>

//           <p className="mt-4 text-gray-700">{product.description}</p>

//           {/* Add to Cart Button */}
//           <div className="mt-6">
//             {/* //<AddToCartButton productId={product.product_id} /> */}
//             <AddToCartButton 
//   productId={product.product_id}
//   name={product.name}
//   price={currentPrice}
//   image_url={mainImage?.image_url}
// />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // app/products/[slug]/page.tsx
// import { ProductService } from "@/lib/services/product-service";
// import AddToCartButton from "@/components/AddToCartButton";
// import ProductImageSlider from "@/components/product/ProductImageSlider";
// import Header from "@/components/layout/header";
// import Footer from "@/components/layout/footer";
// import Sidebar from "@/components/layout/sidebar";

// export default async function ProductDetail(props: { params: Promise<{ slug: string }> }) {
//   const { slug } = await props.params;
  
//   const product = await ProductService.getProductBySlug(slug);

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col">
//         <Header />
//         <Sidebar />
//         <main className="flex-1 container mx-auto px-4 py-8 text-center">
//           <h1 className="text-2xl font-bold">Product not found</h1>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   const currentPrice = product.is_on_sale && product.sale_price ? product.sale_price : product.price;

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <Header />
//       <Sidebar />
      
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Images with Slider */}
//           <div className="space-y-4">
//             <ProductImageSlider 
//               images={product.images || []} 
//               productName={product.name} 
//             />
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
//               {product.category && (
//                 <p className="text-gray-600 mt-2">{product.category.name}</p>
//               )}
//             </div>
            
//             {/* Price */}
//             <div className="space-y-2">
//               {product.is_on_sale && product.sale_price ? (
//                 <div className="flex items-center gap-3">
//                   <span className="text-3xl font-bold text-red-600">
//                     Rs. {product.sale_price.toLocaleString()}
//                   </span>
//                   <span className="text-xl text-gray-500 line-through">
//                     Rs. {product.price.toLocaleString()}
//                   </span>
//                   <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
//                     Sale
//                   </span>
//                 </div>
//               ) : (
//                 <span className="text-3xl font-bold text-gray-900">
//                   Rs. {product.price.toLocaleString()}
//                 </span>
//               )}
//             </div>

//             {/* Description */}
//             {product.description && (
//               <div className="prose prose-lg max-w-none">
//                 <p className="text-gray-700 leading-relaxed">{product.description}</p>
//               </div>
//             )}

//             {/* Add to Cart Button */}
//             <div className="pt-4">
//               <AddToCartButton 
//                 productId={product.product_id}
//                 name={product.name}
//                 price={currentPrice}
//                 image_url={product.images?.[0]?.image_url}
//               />
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import { ProductService } from "@/lib/services/product-service";
import ProductClientPage from "./client-page";

export default async function ProductDetail(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  
  const product = await ProductService.getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </main>
      </div>
    );
  }

  // Pass the product data to the client component
  return <ProductClientPage product={product} />;
}