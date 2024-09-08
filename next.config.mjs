/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: (process.env.NODE_ENV === "preview" || process.env.NODE_ENV === "development") ? "https" : "http",
        hostname: process.env.BACKEND_HOST,
      },
    ],
  },
};

export default nextConfig;
