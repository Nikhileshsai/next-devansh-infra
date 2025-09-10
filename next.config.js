/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    //
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  images: {
    domains: [
      'picsum.photos',
      'img.icons8.com',
      // Add your Supabase domain here
      'your-supabase-project.supabase.co',
      // Add any other image domains you use
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
