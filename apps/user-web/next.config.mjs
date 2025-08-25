/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@lynkeer/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "**", // TODO: Change to the correct hostname
      },
    ],
  },
};

export default nextConfig;
