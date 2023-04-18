/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = {
  ...nextConfig,
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
