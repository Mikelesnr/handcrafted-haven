import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // optional, but good for dev
      },
      {
        protocol: "https",
        hostname: "**", // Matches any domain
      },
    ],
  },
};

export default nextConfig;
