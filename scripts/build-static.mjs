// Static export build for GitHub Pages.
//
// The payment API routes (`app/api/**`) are server-only — `force-dynamic`, POST,
// and they read the incoming Request — so `output: "export"` refuses to build
// with them present. They stay on `main` for the eventual Node-host deploy; this
// script just moves them aside for the duration of the static build.

import { execSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";

const API_DIR = "app/api";
const STASH_DIR = ".api-stash";

function restore() {
  if (existsSync(STASH_DIR)) renameSync(STASH_DIR, API_DIR);
}

process.on("exit", restore);
process.on("SIGINT", () => {
  restore();
  process.exit(130);
});

if (existsSync(API_DIR)) renameSync(API_DIR, STASH_DIR);

try {
  execSync("next build", { stdio: "inherit" });
} finally {
  restore();
}
