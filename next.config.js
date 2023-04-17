/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://admin.iid.org.in/api/:path*",
      },
      {
        source: "/basepath/:path*",
        destination: "https://admin.iid.org.in/storage/:path*",
      },
    ];
  },
};
