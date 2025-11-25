
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/lib/utils/force-cookie-clear'
import { SidebarProvider } from '@/context/sidebar-context';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'Arial'],
})

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
         <SidebarProvider>
{children}
         </SidebarProvider>
        
      </body>
    </html>
  )
}