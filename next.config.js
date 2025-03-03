/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 1 day caching
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { isServer }) => {
    // Font optimization
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });

    return config;
  },
  // Add compression for static assets
  compress: true,
  // Add Asset optimization configuration
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },
}

module.exports = nextConfig 