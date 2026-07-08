import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev'},
      { protocol: 'https', hostname: 'media.kitsu.app'}
    ],
  },
}

export default nextConfig
