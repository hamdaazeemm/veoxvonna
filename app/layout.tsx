// app/layout.tsx
// import "./globals.css";
// import { ReactNode } from "react";

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="font-sans bg-gray-50">
//         <header className="p-4 bg-white shadow">Veoxvonna</header>
//         <main className="max-w-6xl mx-auto">{children}</main>
//         <footer className="p-4 bg-gray-200 mt-10">© 2025 Veoxvonna</footer>
//       </body>
//     </html>
//   );
// }


// app/(shop)/layout.tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veoxvonna - Premium Kids Clothing',
  description: 'Premium kids clothing for ages 3-8 years in Pakistan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}