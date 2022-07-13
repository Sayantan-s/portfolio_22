/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["page.tsx"],
  images: {
    domains: ["images.unsplash.com"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;
