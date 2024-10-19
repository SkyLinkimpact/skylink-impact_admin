/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.BACKEND_HOST,
        pathname: "/storage/media/**",
      },
    ],
  },
};

export default nextConfig;
