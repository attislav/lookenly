import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Erlaubt alle HTTPS Domains
      },
    ],
    formats: ['image/avif', 'image/webp'], // Moderne Formate mit besserer Komprimierung
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Responsive Breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Kleine Bilder (Icons, Thumbnails)
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 Jahr Cache für optimierte Bilder
  },
};

export default nextConfig;
