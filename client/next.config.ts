const path = require('path');

const runtimeCaching = [
  {
    urlPattern: /^https?.*/,
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
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
    ],
    // additionalData: `
    //   @use "styles/abstracts/colors" as colors;
    // `
  },
  experimental: {
    turbo: false 
  }
};

module.exports = withPWA(nextConfig);