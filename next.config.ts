import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*", // Cambia el puerto si tu backend usa otro
      },
    ];
  },
};

export default nextConfig;
