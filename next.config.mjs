/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "development" ? "http" : "https",
        hostname: process.env.BACKEND_HOST,
      },
    ],
  },
};

export default nextConfig;
