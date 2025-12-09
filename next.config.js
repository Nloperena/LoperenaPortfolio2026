/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.licdn.com', 'cdn.shopify.com', 'videos.ctfassets.net', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
