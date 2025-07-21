import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://portafolio-cursos2025-backend-production.up.railway.app/:path*", // Cambia el puerto si tu backend usa otro
      },
    ];
  },
};

export default nextConfig;
