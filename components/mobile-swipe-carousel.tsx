

// components/mobile-swipe-carousel.tsx
'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Slide {
  id: number
  url: string
  alt: string
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

interface MobileSwipeCarouselProps {
  slides: Slide[]
}

export default function MobileSwipeCarousel({ slides }: MobileSwipeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [scrollLocked, setScrollLocked] = useState(true)

  // Minimum swipe distance
  const minSwipeDistance = 50

  // Lock body scroll when component mounts and unlock when reaching last slide
  useEffect(() => {
    // Lock body scroll initially
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'

    // Store the current scroll position
    const scrollY = window.scrollY
    document.body.style.top = `-${scrollY}px`

    // Unlock when reaching last slide
    if (currentIndex === slides.length - 1) {
      const timer = setTimeout(() => {
        setScrollLocked(false)
        
        // Restore scroll
        const scrollY = parseInt(document.body.style.top || '0') * -1
        document.body.style.overflow = ''
        document.body.style.height = ''
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.top = ''
        window.scrollTo(0, scrollY)
      }, 300) // Small delay before unlocking
      
      return () => clearTimeout(timer)
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [currentIndex, slides.length])

  // Prevent wheel and touch scroll when locked
  useEffect(() => {
    const preventScroll = (e: Event) => {
      if (scrollLocked) {
        e.preventDefault()
      }
    }

    // Use passive: false to allow preventDefault
    document.addEventListener('touchmove', preventScroll, { passive: false })
    document.addEventListener('wheel', preventScroll, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventScroll)
      document.removeEventListener('wheel', preventScroll)
    }
  }, [scrollLocked])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? prev : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1))
  }, [slides.length])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    // Prevent default scroll behavior when locked
    if (scrollLocked && currentIndex < slides.length - 1) {
      e.preventDefault()
    }
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isUpSwipe = distance > minSwipeDistance
    const isDownSwipe = distance < -minSwipeDistance

    if (isUpSwipe) {
      nextSlide()
    } else if (isDownSwipe) {
      prevSlide()
    }
  }

  // Auto advance slides every 5 seconds
  useEffect(() => {
    if (!scrollLocked || currentIndex === slides.length - 1) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [scrollLocked, currentIndex, nextSlide, slides.length])

  if (slides.length === 0) return null

  return (
    <div className="relative w-full h-screen overflow-hidden lg:hidden">
      {/* Slides Container */}
      <div 
        className="flex flex-col transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            
            {/* Centered Transparent SHOP NOW Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link 
                href="/products"
                className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 px-6 py-3 rounded text-sm hover:bg-white hover:bg-opacity-30 transition-all duration-300"
                onClick={(e) => {
                  if (scrollLocked) {
                    e.preventDefault()
                    // Unlock scroll and navigate
                    setScrollLocked(false)
                    setTimeout(() => {
                      window.location.href = '/products'
                    }, 100)
                  }
                }}
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 6px Vertical Dots on Right Side */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-40'
            }`}
          />
        ))}
      </div>

      {/* Very Subtle Swipe Instruction */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-50">
        <div className="flex flex-col items-center space-y-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
          </svg>
          <span className="text-[10px]">Swipe</span>
        </div>
      </div>

      {/* Show "Scroll to continue" on last slide */}
      {currentIndex === slides.length - 1 && scrollLocked && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xs">
          <div className="flex flex-col items-center space-y-1 animate-pulse">
            <span className="text-[10px]">Scroll to continue</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}


