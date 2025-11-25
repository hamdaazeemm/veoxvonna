// // app/(shop)/categories/[slug]/page.tsx
// import { createServerClient } from "@/lib/supabase/server";
// import ProductCard from "@/components/product/product-card";
// import { notFound } from "next/navigation";
// import Link from "next/link";

// // Define types
// type CategoryData = {
//   category_id: number
//   name: string
//   slug: string | null
//   description: string | null
//   parent_category_id: number | null
// }

// type ProductData = {
//   product_id: number
//   name: string
//   price: number
//   sale_price: number | null
//   is_on_sale: boolean
//   sku: string | null
//   images: { image_url: string }[]
// }

// export default async function CategoryPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const supabase = await createServerClient();

//   // Get category by slug with type assertion
//   const { data: category, error: catError } = await supabase
//     .from("categories")
//     .select("*")
//     .eq("slug", slug)
//     .eq("is_active", true)
//     .single<CategoryData>();

//   if (catError || !category) {
//     notFound();
//   }

//   // Get products in this category with type assertion
//   const { data: products, error: prodError } = await supabase
//     .from("products")
//     .select(`
//       product_id,
//       name,
//       price,
//       sale_price,
//       is_on_sale,
//       sku,
//       images:product_images(image_url)
//     `)
//     .eq("category_id", category.category_id)
//     .eq("is_active", true)
//     .order("created_at", { ascending: false })
//     .returns<ProductData[]>();

//   if (prodError) {
//     console.error("Error fetching products:", prodError);
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <div className="mb-6">
//         <Link href="/" className="text-blue-600 hover:underline flex items-center gap-2">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//           Back to Home
//         </Link>
//       </div>

//       {/* Category Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
//         {category.description && (
//           <p className="text-gray-600">{category.description}</p>
//         )}
//         <p className="text-sm text-gray-500 mt-2">
//           {products?.length || 0} products found
//         </p>
//       </div>

//       {/* Products Grid */}
//       {products && products.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.product_id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <svg 
//             className="w-16 h-16 text-gray-400 mx-auto mb-4" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
//             />
//           </svg>
//           <p className="text-gray-500 text-lg">
//             No products available in this category yet.
//           </p>
//           <Link 
//             href="/products" 
//             className="inline-block mt-4 text-blue-600 hover:underline"
//           >
//             Browse all products
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// app/(shop)/categories/[slug]/page.tsx
import { createServerClient } from "@/lib/supabase/server";
import ProductCard from "@/components/product/product-card";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/sidebar"; // Added sidebar import

// Define types
type CategoryData = {
  category_id: number
  name: string
  slug: string | null
  description: string | null
  parent_category_id: number | null
}

type ProductData = {
  product_id: number
  name: string
  price: number
  sale_price: number | null
  is_on_sale: boolean
  sku: string | null
  images: { image_url: string }[]
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServerClient();

  // Get category by slug with type assertion
  const { data: category, error: catError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single<CategoryData>();

  if (catError || !category) {
    notFound();
  }

  // Get products in this category with type assertion
  const { data: products, error: prodError } = await supabase
    .from("products")
    .select(`
      product_id,
      name,
      price,
      sale_price,
      is_on_sale,
      sku,
      images:product_images(image_url)
    `)
    .eq("category_id", category.category_id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .returns<ProductData[]>();

  if (prodError) {
    console.error("Error fetching products:", prodError);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Sidebar /> {/* Added Sidebar component */}
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/products" className="hover:text-gray-700 transition-colors">
              Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </nav>

       

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
            
            {/* Load More Section (if needed in future) */}
            <div className="text-center mt-12">
              <p className="text-gray-500 text-sm">
                Showing all {products.length} products in {category.name}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We're currently updating our {category.name} collection. 
              Check back soon for new arrivals!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Browse All Products
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}