


// components/layout/footer.tsx (Simplified version)
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Veoxvonna</h3>
            <p className="text-gray-400">
              Premium kids clothing for ages 3-8 years in Pakistan.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/boys" className="text-gray-400 hover:text-white text-sm">Boys</Link>
              <Link href="/girls" className="text-gray-400 hover:text-white text-sm">Girls</Link>
              <Link href="/unisex" className="text-gray-400 hover:text-white text-sm">Unisex</Link>
              <Link href="/sale" className="text-gray-400 hover:text-white text-sm">Sale</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link>
              <Link href="/about" className="text-gray-400 hover:text-white text-sm">About</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">Email: info@veoxvonna.com</p>
            <p className="text-gray-400 text-sm">WhatsApp: +92 300 1234567</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Veoxvonna. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}