/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BACKEND_HOST,
      },
    ],
  },
};

export default nextConfig;
