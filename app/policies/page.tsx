// app/policies/page.tsx
export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-3xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
            Policies
          </h1>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg mb-8 font-medium">
            At Veoxvonna, we are committed to providing the best shopping experience while ensuring 
            the safety and satisfaction of our customers and their little ones.
          </p>

          <div className="space-y-12">
            {/* Returns & Exchanges */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
                Returns & Exchanges Policy
              </h2>
              <p className="text-gray-700 mb-4 font-medium">
                We want you (and your little one) to love what you ordered
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li>
                  <strong className="font-semibold">Return Window:</strong> Items can be returned within 
                  10 days of delivery for store credit or exchange.
                </li>
                <li>
                  <strong className="font-semibold">Condition:</strong> Items must be unworn, unwashed, 
                  not torn or damaged with original tags attached.
                </li>
                <li>
                  <strong className="font-semibold">Process:</strong> Please initiate your return by 
                  contacting us on Instagram or WhatsApp.
                </li>
              </ul>
            </section>

            {/* Shipping & Delivery */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
                Shipping & Delivery Policy
              </h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li>
                  <strong className="font-semibold">Delivery timelines:</strong> Orders usually arrive 
                  within 5-7 business days. You'll receive tracking information once your order is shipped.
                </li>
                <li>
                  <strong className="font-semibold">Lost/Damaged packages:</strong> If your order doesn't 
                  arrive or arrives damaged, contact us within 7 days of expected delivery, and we'll 
                  replace the items or provide an exclusive discount coupon for future purchases.
                </li>
              </ul>
            </section>

            {/* Safety & Quality */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
                Safety & Quality Commitment
              </h2>
              <p className="text-gray-700 mb-4">
                Your child's safety is our top priority. All our products are:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li>Tested for compliance with children's apparel safety standards</li>
                <li>Made with non-toxic dyes and materials</li>
                <li>Free of loose embellishments or choking hazards</li>
                <li>Designed with comfort and durability in mind</li>
              </ul>
            </section>

            {/* Sustainability */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
                Sustainability Promise
              </h2>
              <p className="text-gray-700 mb-4">
                We're committed to doing good for kids and the planet through responsible practices.
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li>
                  <strong className="font-semibold">Eco-friendly materials:</strong> Many of our products 
                  use organic cotton, recycled fibers, and low-impact dyes to minimize environmental impact.
                </li>
                <li>
                  <strong className="font-semibold">Fair labor practices:</strong> We partner only with 
                  ethical manufacturers who share our commitment to fair wages and safe working conditions.
                </li>
                <li>
                  <strong className="font-semibold">Sustainable packaging:</strong> We use recyclable and 
                  minimal packaging to reduce waste.
                </li>
              </ul>
            </section>

            {/* Terms & Conditions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
                Terms & Conditions
              </h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li>
                  <strong className="font-semibold">Use of Products:</strong> Our clothing is designed 
                  for everyday wear. We are not responsible for damages caused by misuse or improper care.
                </li>
                <li>
                  <strong className="font-semibold">Limitation of Liability:</strong> Our responsibility 
                  is limited to the price paid for the product as outlined in our return policy.
                </li>
                <li>
                  <strong className="font-semibold">Product Information:</strong> We make every effort 
                  to display accurate colors and details, but slight variations may occur due to screen 
                  settings and manufacturing processes.
                </li>
                <li>
                  <strong className="font-semibold">Privacy:</strong> We respect your privacy and are 
                  committed to protecting your personal information in accordance with applicable laws.
                </li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-gray-200 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our policies or need assistance with your order, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <a 
                href="mailto:veuxvonna@gmail.com" 
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Email: veuxvonna@gmail.com
              </a>
              <a 
                href="https://wa.me/923001234567" 
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                WhatsApp: +92 300 1234567
              </a>
              <a 
                href="https://instagram.com/veuxvonna" 
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Instagram: @veuxvonna
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}