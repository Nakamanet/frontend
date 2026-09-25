import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev'},
      { protocol: 'https', hostname: 'media.kitsu.app'}
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: 'build',
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
