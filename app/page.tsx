

// app/dashboard/page.tsx
import { ProductService } from '@/lib/services/product-service'
import VideoHero from '@/components/video-hero'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Image from 'next/image'
import { Carousel } from '@/components/carousel'
import { Amatic_SC } from 'next/font/google'
import Sidebar from '@/components/layout/sidebar' // Add this import
import Footer from '@/components/layout/footer'
import MobileSwipeCarousel from '@/components/mobile-swipe-carousel' 
// ISR - Revalidate every hour
export const revalidate = 3600

const amatic = Amatic_SC({ 
  subsets: ['latin'],
  weight: ['400', '700'],
})

// Function to get featured products by specific category IDs
async function getFeaturedProductsByCategoryIds() {
  const categoryConfig = [
    { 
      name: 'boys', 
      displayName: 'Boys', 
      gradient: 'from-blue-50 to-blue-100', 
      hoverColor: 'blue',
      fallbackEmoji: '👦',
      categoryIds: [11, 12]
    },
    { 
      name: 'girls', 
      displayName: 'Girls', 
      gradient: 'from-pink-50 to-pink-100', 
      hoverColor: 'pink',
      fallbackEmoji: '👧',
      categoryIds: [13, 14]
    },
    { 
      name: 'unisex', 
      displayName: 'Unisex', 
      gradient: 'from-purple-50 to-purple-100', 
      hoverColor: 'purple',
      fallbackEmoji: '👕',
      categoryIds: [15, 16]
    }
  ]

  const results = []
  
  for (const category of categoryConfig) {
    try {
      let featuredProduct = null
      
      for (const categoryId of category.categoryIds) {
        const products = await ProductService.getProductsByCategory('', 10, categoryId, false)
        const featured = products.find(p => p.is_featured)
        if (featured) {
          featuredProduct = featured
          break
        }
      }
      
      if (!featuredProduct) {
        for (const categoryId of category.categoryIds) {
          const products = await ProductService.getProductsByCategory('', 5, categoryId, false)
          if (products.length > 0) {
            featuredProduct = products[0]
            break
          }
        }
      }

      if (featuredProduct) {
        const primaryImage = featuredProduct.images?.find(img => img.is_primary) || featuredProduct.images?.[0]
        
        results.push({
          name: category.name,
          displayName: category.displayName,
          gradient: category.gradient,
          hoverColor: category.hoverColor,
          fallbackEmoji: category.fallbackEmoji,
          featuredProduct: featuredProduct,
          primaryImage: primaryImage?.image_url,
          altText: primaryImage?.alt_text || featuredProduct.name,
          price: featuredProduct.sale_price || featuredProduct.price,
          hasImage: !!primaryImage?.image_url,
          isFeatured: featuredProduct.is_featured
        })
      } else {
        results.push({
          name: category.name,
          displayName: category.displayName,
          gradient: category.gradient,
          hoverColor: category.hoverColor,
          fallbackEmoji: category.fallbackEmoji,
          featuredProduct: null,
          primaryImage: null,
          altText: `${category.displayName} Collection`,
          price: null,
          hasImage: false,
          isFeatured: false
        })
      }
    } catch (error) {
      console.error(`Error fetching ${category.name} products:`, error)
      results.push({
        name: category.name,
        displayName: category.displayName,
        gradient: category.gradient,
        hoverColor: category.hoverColor,
        fallbackEmoji: category.fallbackEmoji,
        featuredProduct: null,
        primaryImage: null,
        altText: `${category.displayName} Collection`,
        price: null,
        hasImage: false,
        isFeatured: false
      })
    }
  }
  
  return results
}
  // Prepare slides for mobile carousel


// Function to get slideshow images from Supabase
async function getSlideshowImages() {
  try {
    // Replace these with your actual image URLs from Supabase
    const slideshowImages = [
      {
        id: 1,
        url: "https://aqythdlgwbmegxhmucmd.supabase.co/storage/v1/object/public/dashboardimages/IMG_2080.PNG",
        alt: "",
        title: "",
        subtitle: "",
        ctaText: "Shop Now",
        ctaLink: "/products?category=winter"
      },
      {
        id: 2,
        url: "https://aqythdlgwbmegxhmucmd.supabase.co/storage/v1/object/public/dashboardimages/IMG_2078.JPG",
        alt: "",
        title: "",
        subtitle: "",
        ctaText: "Shop Now",
        ctaLink: "/products?category=winter"
      },

    
      

    ];
    
    return slideshowImages;
  } catch (error) {
    console.error('Error fetching slideshow images:', error);
    return [];
  }
}

export default async function DashboardPage() {
  const [mainVideo, categoryProducts, slideshowImages] = await Promise.all([
    ProductService.getMainVideo(),
    getFeaturedProductsByCategoryIds(),
    getSlideshowImages()
  ])
  const mobileSlides = slideshowImages.map(slide => ({
    id: slide.id,
    url: slide.url,
    alt: slide.alt,
    title: slide.title,
    subtitle: slide.subtitle,
    ctaText: slide.ctaText,
    ctaLink: slide.ctaLink
  }))
  return (
    <div className="min-h-screen offwhite-bg">
      <Header />
      <Sidebar /> {/* Add Sidebar component here */}
       <main className="min-h-screen">
        {/* Mobile Swipe Carousel - Only on phone */}
        <div className="lg:hidden"> {/* Hidden on desktop */}
          <MobileSwipeCarousel slides={mobileSlides} />
        </div>

        {/* Desktop Video Hero - Only on desktop */}
        <div className="hidden lg:block"> {/* Hidden on mobile */}
          {mainVideo ? (
            <VideoHero videoUrl={mainVideo.video_url} />
          ) : (
            <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <div className="text-center text-white px-4">
                <Link 
                  href="/products"
                  className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 px-4 py-2 rounded text-sm hover:bg-white hover:bg-opacity-30 transition-all duration-300"
                >
                  SHOP NOW
                </Link>
              </div>
            </section>
          )}
        </div>
          <PromotionalVideosSection />
      </main>
       <Footer />
    </div>
  )
}

// Separate component for promotional videos
async function PromotionalVideosSection() {
  const videos = await ProductService.getVideos()
  
  if (videos.length <= 1) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.slice(1).map((video) => (
            <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <video
                controls
                className="w-full h-48 object-cover"
                poster={video.thumbnail_url || undefined}
              >
                <source src={video.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}




