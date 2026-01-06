import type { NextConfig } from "next";
const runtimeCaching = [
  {
    urlPattern: /^http?.*/,
    handler: "NetworkFirst",
    options: {
      cacheName: "https-cache",
      expiration: { maxEntries: 200, maxAgeSeconds: 24 * 60 * 60 },
    },
  },
];

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: false 
  }
};

module.exports = withPWA(nextConfig);