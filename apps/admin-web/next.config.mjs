/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@lynkeer/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
