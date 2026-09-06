import type { NextConfig } from "next";

const API_BASE = process.env.API_BASE_URL ?? "https://api.gveda.com/v1/";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.gveda.com", pathname: "/static/**" },
      { protocol: "https", hostname: "files-r2.ayana.com", pathname: "/**" },
      { protocol: "https", hostname: "images.ctfassets.net", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${API_BASE.replace(/\/$/, "")}/:path*` },
    ];
  },
};

export default nextConfig;
