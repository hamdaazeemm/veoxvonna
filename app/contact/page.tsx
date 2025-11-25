// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-3xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
            Contact Us
          </h1>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg mb-8 font-medium">
            We'd love to hear from you! Get in touch with Veoxvonna through any of the following channels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase border-b border-gray-200 pb-2">
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Email</h3>
                  <a 
                    href="mailto:veuxvonna@gmail.com" 
                    className="text-gray-700 hover:text-gray-900 transition-colors text-base"
                  >
                    veuxvonna@gmail.com
                  </a>
                  <p className="text-gray-600 text-sm mt-1">
                    For general inquiries, order questions, and customer support
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Social Media</h3>
                  <div className="flex space-x-6">
                    <a 
                      href="https://instagram.com/veuxvonna" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                      Instagram
                    </a>
                    <a 
                      href="https://wa.me/923001234567" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                      WhatsApp
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    Follow us for updates and message us directly
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase border-b border-gray-200 pb-2">
                Customer Support
              </h2>
              
              <p className="text-gray-700 mb-6">
                Our customer support team is here to assist you with any questions or concerns you may have. 
                We're committed to providing the best possible service for our Veoxvonna family.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">We Can Help With:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Order inquiries and order tracking</li>
                  <li>Returns and exchanges</li>
                  <li>Product questions and fabric care</li>
                  <li>Size guidance and fit assistance</li>
                  <li>Shipping and delivery information</li>
                  <li>General feedback and suggestions</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Response Time</h4>
                <p className="text-gray-600 text-sm">
                  We strive to respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please contact us via WhatsApp for faster assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">Business Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-gray-600">
                  Monday - Saturday: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Online Store</h3>
                <p className="text-gray-600">
                  24/7 available for browsing and ordering<br />
                  Support available during business hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}