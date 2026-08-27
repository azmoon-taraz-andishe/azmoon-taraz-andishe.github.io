import type { NextConfig } from "next";

// NOTE: `output: "export"` (static site for GitHub Pages) was removed because the
// payment flow needs a running server: it holds the gateway secret, receives the
// bank callback, and calls "verify". A static export cannot do any of that.
// Deploy this app to a Node-capable host (e.g. an Iran-based host such as Liara /
// ArvanCloud) before going live with payments.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
