// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-9">
          <h3 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
            About Us
          </h3>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg mb-6 font-medium">
            Step into Veoxvonna, a dreamy place tucked behind the clouds where imagination dances, 
            a place only children can truly see.
          </p>
          
          <p className="mb-6">
            Born from a love for wonder and design, Veoxvonna redefines kidswear in Pakistan through 
            minimal luxury. Each piece is crafted with the softest threads, the finest materials, and 
            the gentlest hands. Created by ethical manufacturers who share our belief that care and 
            creativity belong in every stitch.
          </p>
          
          <p className="mb-6">
            Veoxvonna offers separate product lines to cater to all segments and their demands - boys, girls, 
            and unisex collections. Within each line, we offer a wide array of products that cater to a variety 
            of different styles and preferences, from highly fashionable, on-trend pieces to comfortable everyday 
            attire and essential apparel.
          </p>

          <p className="mb-6">
            Our collections are made with love, curiosity, and just a pinch of stardust, for little 
            dreamers who see the world not as it is but as it could be. Each garment is designed to 
            inspire imagination while providing the comfort and durability that active children need.
          </p>

          <p className="mb-6">
            Veoxvonna has always been able to provide the best in children's fashion through a unique 
            and flexible approach that adapts to the changing seasons while maintaining our commitment 
            to quality and comfort. We respond to key trends and develop them into wearable, practical 
            fashion that celebrates childhood in all its vibrant, expressive glory.
          </p>

          <p className="text-lg font-medium">
            Veoxvonna is more than clothing; it is a feeling of comfort, imagination, and quiet luxury, 
            woven together in every detail. Our mission is to dress the next generation of dreamers in 
            garments that are as special and unique as they are.
          </p>
        </div>

        {/* Brand Values Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality & Safety</h3>
              <p className="text-gray-600 text-sm">
                All our products are tested for compliance with children's apparel safety standards, 
                made with non-toxic dyes and materials, and free of loose embellishments or choking hazards.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ethical Manufacturing</h3>
              <p className="text-gray-600 text-sm">
                We partner only with ethical manufacturers who share our commitment to fair labor practices 
                and sustainable production methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}