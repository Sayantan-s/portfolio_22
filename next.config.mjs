import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.mdx'],
  images: {
    remotePatterns: [
      {
        hostname: 'mages.unsplash.com'
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  experimental: {
    mdxRs: true
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
