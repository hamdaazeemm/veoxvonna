// components/carousel.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface CarouselImage {
  id: number
  url: string
  alt: string
}

interface CarouselProps {
  images: CarouselImage[]
  autoSlideInterval?: number
}

export function Carousel({ images, autoSlideInterval = 5000 }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, autoSlideInterval)

    return () => clearInterval(timer)
  }, [images.length, autoSlideInterval])

  if (images.length === 0) return null

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}