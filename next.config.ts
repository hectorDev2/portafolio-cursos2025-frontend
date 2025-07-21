import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://portafolio-cursos2025-backend-production.up.railway.app/",
      },
    ];
  },
};

export default nextConfig;
