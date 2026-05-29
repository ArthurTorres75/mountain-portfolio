import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Improves tree-shaking for large packages — reduces unused JS in bundles
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/postprocessing",
      "postprocessing",
      "gsap",
      "@gsap/react",
    ],
  },

  async headers() {
    return [
      {
        // Self-hosted static assets: 1 year immutable cache
        source: "/textures/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
