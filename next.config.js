/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

const nextConfig = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.mdx'],
  images: {
    domains: ['images.unsplash.com']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'development'
  }
});

module.exports = nextConfig;
