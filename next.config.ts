import type { NextConfig } from "next";

// This site is deployed as a static export to GitHub Pages
// (azmoon-taraz-andishe.github.io — an org root site, so no basePath).
//
// The payment flow (`app/api/payment/*`, the ZarinPal/PayPing adapters) needs a
// running server to hold the gateway secret, receive the bank callback and call
// "verify". It cannot work on a static host — go live with payments only after
// deploying this app to a Node-capable host (e.g. Liara / ArvanCloud).
const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` for GitHub Pages
  output: "export",
  // GitHub Pages has no image optimization server
  images: { unoptimized: true },
  // Emit `/about/index.html` so paths resolve without a server rewriter
  trailingSlash: true,
};

export default nextConfig;
