// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   serverExternalPackages: ['@supabase/ssr'],
// //   compiler: {
// //     removeConsole: process.env.NODE_ENV === 'production'
// //   }
// // };

// // export default nextConfig;
// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   serverExternalPackages: ['@supabase/ssr'],
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production'
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'aqythdlgwbmegxhmucmd.supabase.co',
//         port: '',
//         pathname: '/storage/v1/object/public/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  images: {
    domains: ['aqythdlgwbmegxhmucmd.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aqythdlgwbmegxhmucmd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;