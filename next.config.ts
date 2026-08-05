import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

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

export default withNextIntl(nextConfig)
