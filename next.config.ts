import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/experiment/large-world-model", destination: "/experiment/robot-arm", permanent: true },
      { source: "/experiment/dobot-magician-python", destination: "/experiment/robot-arm", permanent: true },
    ];
  },
  images: { remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }] },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
