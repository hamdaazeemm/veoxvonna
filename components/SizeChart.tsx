// components/product/SizeChart.tsx
"use client";

import { useState } from "react";

export default function SizeChart() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("short");

  const sizeCharts = {
    short: {
      title: "Short Size Chart (Inches)",
      headers: ["Size", "3yr", "4yr", "5yr", "6yr", "7yr", "8yr"],
      measurements: [
        { name: "Waist Relax", values: ["8.5", "9", "9.5", "10", "10.5", "11"] },
        { name: "Length", values: ["11", "11.5", "12", "12.5", "13", "13.5"] }
      ]
    },
    trouser: {
      title: "Trouser Size Chart (Inches)",
      headers: ["Size", "3yr", "4yr", "5yr", "6yr", "7yr", "8yr"],
      measurements: [
        { name: "Waist Relax", values: ["8.5", "9", "9.5", "10", "10.5", "11"] },
        { name: "Length", values: ["21", "22.5", "24.5", "25.5", "27", "28.5"] }
      ]
    },
    shirt: {
      title: "Shirt Size Chart (Inches)",
      headers: ["Size", "3yr", "4yr", "5yr", "6yr", "7yr", "8yr"],
      measurements: [
        { name: "Front Length", values: ["14", "15", "16", "17", "18", "19"] },
        { name: "Sleeve Length", values: ["12", "12.25", "12.5", "12.75", "13", "13.25"] },
        { name: "Chest", values: ["13.5", "14", "14.5", "15", "15.5", "16"] },
        { name: "Neck Width", values: ["5.5", "5.75", "5.75", "6", "6", "6.25"] }
      ]
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-lg font-semibold text-gray-900">Size Chart</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6">
          {/* Category Tabs */}
          <div className="flex space-x-1 border-b border-gray-200">
            {Object.keys(sizeCharts).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeCategory === category
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Size Chart Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  {sizeCharts[activeCategory as keyof typeof sizeCharts].headers.map((header, index) => (
                    <th
                      key={header}
                      className={`px-4 py-3 font-semibold text-gray-900 ${
                        index === 0 ? "text-left" : "text-center"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sizeCharts[activeCategory as keyof typeof sizeCharts].measurements.map((measurement, rowIndex) => (
                  <tr key={measurement.name} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-200">
                      {measurement.name}
                    </td>
                    {measurement.values.map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3 text-center text-gray-700 border-r border-gray-200 last:border-r-0"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Size Guide Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">How to Measure:</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li><strong>Waist:</strong> Measure around the natural waistline</li>
              <li><strong>Length:</strong> Measure from waist to desired length</li>
              <li><strong>Chest:</strong> Measure around the fullest part of chest</li>
              <li><strong>Sleeve:</strong> Measure from shoulder to wrist</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}