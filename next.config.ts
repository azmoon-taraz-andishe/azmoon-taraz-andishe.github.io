import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` for GitHub Pages
  output: "export",
  // GitHub Pages has no image optimization server
  images: { unoptimized: true },
  // Emit `/about/index.html` so paths resolve without a server rewriter
  trailingSlash: true,
};

export default nextConfig;
