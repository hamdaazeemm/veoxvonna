// components/flip-cards.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

interface FlipCardsProps {
  categories: any[]
}

export default function FlipCards({ categories }: FlipCardsProps) {
  const [flipped, setFlipped] = useState<number | null>(null)

  // Check if categories exists and is an array
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No categories available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {categories.map((category, index) => (
        <div
          key={category.name}
          className="relative h-64 cursor-pointer"
          onMouseEnter={() => setFlipped(index)}
          onMouseLeave={() => setFlipped(null)}
        >
          <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
            flipped === index ? 'rotate-y-180' : ''
          }`}>
            {/* Front of card */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className={`h-3/4 relative overflow-hidden ${
                category.hasImage ? '' : `bg-gradient-to-br ${category.gradient}`
              }`}>
                {category.hasImage && category.primaryImage ? (
                  <img
                    src={category.primaryImage}
                    alt={category.altText || category.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl">{category.fallbackEmoji || '👕'}</span>
                  </div>
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.displayName || 'Category'}
                </h3>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 flex flex-col justify-center items-center text-white">
              <span className="text-4xl mb-4">{category.fallbackEmoji || '👕'}</span>
              <h3 className="text-xl font-bold mb-2 text-center">
                {category.displayName || 'Category'}
              </h3>
              <p className="text-sm text-gray-300 text-center mb-4">
                Explore our collection
              </p>
              <Link 
                href={`/products?category=${category.name}`}
                className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}