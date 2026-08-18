import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
