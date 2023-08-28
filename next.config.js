/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.tuk.dev",
      },
      {
        protocol: "https",
        hostname: "link",
      },
      {
        protocol: "https",
        hostname: "fancytailwind.com",
      },
    ],
  },
};

module.exports = nextConfig;
