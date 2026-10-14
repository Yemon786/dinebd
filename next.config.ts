import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // harfbuzzjs (Bengali PDF shaping) references fs/path in a Node-only branch.
      fs: { browser: "./lib/empty-module.ts" },
      path: { browser: "./lib/empty-module.ts" },
    },
  },
};

export default nextConfig;
