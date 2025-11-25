// // components/product/SizeSelector.tsx
// "use client";

// import { useState } from "react";
// import { AVAILABLE_SIZES } from "@/lib/types/product";

// interface SizeSelectorProps {
//   sizes?: {
//     size_label: string;
//     stock_quantity: number;
//   }[];
//   onSizeSelect?: (size: string) => void;
// }

// export default function SizeSelector({ sizes = [], onSizeSelect }: SizeSelectorProps) {
//   const [selectedSize, setSelectedSize] = useState<string>("");

//   const handleSizeSelect = (size: string) => {
//     setSelectedSize(size);
//     onSizeSelect?.(size);
//   };

//   // Get available sizes with stock info
//   const availableSizes = AVAILABLE_SIZES.map(size => {
//     const sizeData = sizes.find(s => s.size_label === size.label);
//     return {
//       ...size,
//       stock_quantity: sizeData?.stock_quantity || 0,
//       available: (sizeData?.stock_quantity || 0) > 0
//     };
//   });

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
//         <span className="text-sm text-gray-500">
//           {selectedSize ? `Selected: ${selectedSize}` : "Please select a size"}
//         </span>
//       </div>
      
//       <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
//         {availableSizes.map((size) => (
//           <button
//             key={size.label}
//             onClick={() => handleSizeSelect(size.label)}
//             disabled={!size.available}
//             className={`py-3 px-4 border rounded-lg text-sm font-medium transition-all ${
//               selectedSize === size.label
//                 ? "bg-black text-white border-black"
//                 : size.available
//                 ? "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                 : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//             }`}
//             title={!size.available ? "Out of stock" : `Select ${size.display}`}
//           >
//             {size.label}
//             {!size.available && (
//               <div className="text-xs text-red-500 mt-1">Sold out</div>
//             )}
//           </button>
//         ))}
//       </div>
      
//       {selectedSize && (
//         <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//           <p className="text-sm text-green-800">
//             <strong>Size {selectedSize}</strong> selected
//           </p>
//           <p className="text-xs text-green-700 mt-1">
//             {availableSizes.find(s => s.label === selectedSize)?.stock_quantity || 0} in stock
//           </p>
//         </div>
//       )}

//       {/* Stock summary */}
//       <div className="flex items-center justify-between text-sm text-gray-600">
//         <span>Available sizes:</span>
//         <span>
//           {availableSizes.filter(s => s.available).length} of {availableSizes.length} sizes in stock
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { AVAILABLE_SIZES } from "@/lib/types/product";

interface SizeSelectorProps {
  sizes?: {
    size_label: string;
    stock_quantity: number;
  }[];
  onSizeSelect?: (size: string, stockQuantity: number) => void;
}

export default function SizeSelector({ sizes, onSizeSelect }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSizeSelect = (size: string, stockQuantity: number) => {
    setSelectedSize(size);
    onSizeSelect?.(size, stockQuantity);
  };

  // If sizes is undefined or null, show loading
  if (sizes === undefined || sizes === null) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
        <div className="text-gray-500">Loading sizes...</div>
      </div>
    );
  }

  // If sizes is empty array, show no sizes available
  if (sizes.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">No sizes available for this product</p>
        </div>
      </div>
    );
  }

  console.log('SizeSelector - sizes received:', sizes);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
        <span className="text-sm text-gray-500">
          {selectedSize ? `Selected: ${selectedSize}` : "Please select a size"}
        </span>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {AVAILABLE_SIZES.map((size) => {
          const productSize = sizes.find(s => s.size_label === size.label);
          const isAvailable = productSize && productSize.stock_quantity > 0;
          const stockQuantity = productSize?.stock_quantity || 0;
          
          console.log(`Rendering ${size.label}:`, { 
            productSize, 
            isAvailable, 
            stockQuantity 
          });

          return (
            <button
              key={size.label}
              onClick={() => handleSizeSelect(size.label, stockQuantity)}
              disabled={!isAvailable}
              className={`py-3 px-4 border rounded-lg text-sm font-medium transition-all ${
                selectedSize === size.label
                  ? "bg-black text-white border-black"
                  : isAvailable
                  ? "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
            >
              {size.label}
              {isAvailable ? (
                <div className="text-xs text-gray-500 mt-1">{stockQuantity}</div>
              ) : (
                <div className="text-xs text-red-500 mt-1">Sold out</div>
              )}
            </button>
          );
        })}
      </div>
      
      {selectedSize && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-800">
            <strong>Size {selectedSize}</strong> selected
          </p>
        </div>
      )}
    </div>
  );
}