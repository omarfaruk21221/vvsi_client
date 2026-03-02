/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এটি যেকোনো ডোমেইনকে পারমিশন দিবে
      },
      {
        protocol: "http",
        hostname: "**", // লোকাল বা আনসিকিউরড লিঙ্কের জন্য
      },
    ],
  },
};

export default nextConfig;
