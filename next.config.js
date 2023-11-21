/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      'mongoose',
      'puppeteer-extra',
      'puppeteer-extra-plugin-stealth',
    ]
  },
  images: {
    domains: ['m.media-amazon.com']
  }
}

module.exports = nextConfig
