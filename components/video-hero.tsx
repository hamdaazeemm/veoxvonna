


// // // components/video-hero.tsx
// // 'use client'

// // import { useEffect, useRef, useState } from 'react'
// // import Link from 'next/link'

// // interface VideoHeroProps {
// //   videoUrl: string
// // }

// // export default function VideoHero({ videoUrl }: VideoHeroProps) {
// //   const videoRef = useRef<HTMLVideoElement>(null)
// //   const [hasInteracted, setHasInteracted] = useState(false)
// //   const [showPlayPrompt, setShowPlayPrompt] = useState(false)

// //   useEffect(() => {
// //     const video = videoRef.current
// //     if (!video) return

// //     const attemptAutoPlay = async () => {
// //       try {
// //         // Try to play the video
// //         await video.play()
// //         setHasInteracted(true)
// //       } catch (error) {
// //         // Auto-play failed, show play prompt on mobile
// //         setShowPlayPrompt(true)
        
// //         // Set up interaction listeners
// //         const handleInteraction = () => {
// //           video.play().then(() => {
// //             setHasInteracted(true)
// //             setShowPlayPrompt(false)
// //           }).catch(console.error)
          
// //           // Remove listeners after first interaction
// //           document.removeEventListener('click', handleInteraction)
// //           document.removeEventListener('touchstart', handleInteraction)
// //         }

// //         document.addEventListener('click', handleInteraction)
// //         document.addEventListener('touchstart', handleInteraction)
// //       }
// //     }

// //     attemptAutoPlay()

// //     // Cleanup
// //     return () => {
// //       document.removeEventListener('click', () => {})
// //       document.removeEventListener('touchstart', () => {})
// //     }
// //   }, [])

// //   return (
// //     <section className="relative h-screen flex items-center justify-center bg-black">
// //       {/* Background Video */}
// //       <video
// //         ref={videoRef}
// //         muted
// //         loop
// //         playsInline
// //         className="absolute inset-0 w-full h-full object-cover opacity-70"
// //         preload="metadata"
// //         suppressHydrationWarning
// //         // Add poster for better mobile experience
// //         poster="/video-poster.jpg" // Optional: add a still frame from your video
// //       >
// //         <source src={videoUrl} type="video/mp4" />
// //         Your browser does not support the video tag.
// //       </video>
      
// //       {/* Mobile Play Prompt */}
// //       {showPlayPrompt && (
// //         <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
// //           <div className="text-center text-white p-6">
// //             <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
// //               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
// //                 <path d="M8 5v14l11-7z"/>
// //               </svg>
// //             </div>
            
            
// //           </div>
// //         </div>
// //       )}
      
// //       {/* Veoxvonna with small shop now button */}
// //       <div className="relative z-10 text-center text-white px-4">
// //         {/* <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
// //           Veoxvonna
// //         </h1> */}
// //         <Link 
// //           href="/products"
// //           className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 px-4 py-2 rounded text-sm hover:bg-white hover:bg-opacity-30 transition-all duration-300"
// //         >
// //           SHOP NOW
// //         </Link>
// //       </div>
// //     </section>
// //   )
// // }

// // components/video-hero.tsx
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'

// interface VideoHeroProps {
//   videoUrl: string
//   fallbackImageUrl?: string
// }

// export default function VideoHero({ videoUrl, fallbackImageUrl = "https://aqythdlgwbmegxhmucmd.supabase.co/storage/v1/object/public/dashboardimages/slideshow/sl1.webp" }: VideoHeroProps) {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const [hasInteracted, setHasInteracted] = useState(false)
//   const [showPlayPrompt, setShowPlayPrompt] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }
    
//     checkMobile()
//     window.addEventListener('resize', checkMobile)
    
//     return () => window.removeEventListener('resize', checkMobile)
//   }, [])

//   useEffect(() => {
//     if (isMobile) return
    
//     const video = videoRef.current
//     if (!video) return

//     const attemptAutoPlay = async () => {
//       try {
//         await video.play()
//         setHasInteracted(true)
//       } catch (error) {
//         setShowPlayPrompt(true)
        
//         const handleInteraction = () => {
//           video.play().then(() => {
//             setHasInteracted(true)
//             setShowPlayPrompt(false)
//           }).catch(console.error)
          
//           document.removeEventListener('click', handleInteraction)
//           document.removeEventListener('touchstart', handleInteraction)
//         }

//         document.addEventListener('click', handleInteraction)
//         document.addEventListener('touchstart', handleInteraction)
//       }
//     }

//     attemptAutoPlay()

//     return () => {
//       document.removeEventListener('click', () => {})
//       document.removeEventListener('touchstart', () => {})
//     }
//   }, [isMobile])

//   return (
//     <section className="relative h-screen flex items-center justify-center bg-black">
//       {/* Background Video - Hidden on mobile */}
//       <video
//         ref={videoRef}
//         muted
//         loop
//         playsInline
//         className={`absolute inset-0 w-full h-full object-cover opacity-70 ${
//           isMobile ? 'hidden' : 'block'
//         }`}
//         preload="metadata"
//         suppressHydrationWarning
//         poster={fallbackImageUrl}
//       >
//         <source src={videoUrl} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
      
//       {/* Background Image - Only shown on mobile with Next.js Image optimization */}
//       <div className={`absolute inset-0 w-full h-full ${
//         isMobile ? 'block' : 'hidden'
//       }`}>
//         <Image
//           src={fallbackImageUrl}
//           alt="Veoxvonna"
//           fill
//           className="object-cover opacity-70"
//           priority
//           quality={85}
//         />
//       </div>
      
//       {/* Mobile Play Prompt - Only show on desktop */}
//       {showPlayPrompt && !isMobile && (
//         <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
//           <div className="text-center text-white p-6">
//             <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M8 5v14l11-7z"/>
//               </svg>
//             </div>
//             <p className="text-sm">Tap to play video</p>
//           </div>
//         </div>
//       )}
      
//       {/* Veoxvonna with small shop now button */}
//       <div className="relative z-10 text-center text-white px-4">
//         <Link 
//           href="/products"
//           className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 px-4 py-2 rounded text-sm hover:bg-white hover:bg-opacity-30 transition-all duration-300"
//         >
//           SHOP NOW
//         </Link>
//       </div>
//     </section>
//   )
// }


// components/video-hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface VideoHeroProps {
  videoUrl: string
  mobileImageUrl?: string
}

export default function VideoHero({ 
  videoUrl, 
  mobileImageUrl = "https://aqythdlgwbmegxhmucmd.supabase.co/storage/v1/object/public/dashboardimages/IMG_2078.JPG" 
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Only run video logic on desktop
    if (isMobile || !isClient) return
    
    const video = videoRef.current
    if (!video) return

    // Simply try to play the video on desktop
    video.play().catch(error => {
      console.log('Auto-play prevented, but video will play on interaction:', error)
    })
  }, [isMobile, isClient])

  // Don't render until we know if it's mobile or desktop
  if (!isClient) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="relative z-10 text-center text-white px-4">
          <Link 
            href="/products"
            className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 px-4 py-2 rounded text-sm hover:bg-white hover:bg-opacity-30 transition-all duration-300"
          >
            SHOP NOW
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen flex items-center justify-center bg-black">
      {/* Background Video - Only on Desktop */}
      {!isMobile && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          preload="auto"
          suppressHydrationWarning
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Background Image - Only on Mobile */}
      {isMobile && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={mobileImageUrl}
            alt="Veoxvonna"
            fill
            className="object-cover opacity-70"
            priority
            quality={85}
          />
        </div>
      )}
      
      {/* Shop Now Button */}
      <div className="relative z-10 text-center text-white px-4">
        <Link 
          href="/products"
          className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 px-4 py-2 rounded text-sm hover:bg-white hover:bg-opacity-30 transition-all duration-300"
        >
          SHOP NOW
        </Link>
      </div>
    </section>
  )
}