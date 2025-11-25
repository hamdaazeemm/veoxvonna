// components/mobile-swipe-carousel.tsx
'use client'

import { useState, useCallback } from 'react'
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

  // Minimum swipe distance
  const minSwipeDistance = 50

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
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
    </div>
  )
}