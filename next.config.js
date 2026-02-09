/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jdi.k-pack.online",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "morgap44.k-pack.online",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "demo.myfatoorah.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "portal.myfatoorah.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
