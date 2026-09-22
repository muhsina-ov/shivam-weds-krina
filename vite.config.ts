import fs from "node:fs";
import type { ServerResponse } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serves binary assets from src/assets/ at /__local/{filename} so the page can
// load the real files locally. Only matches the binary extensions used by the
// project and never serves the adjacent *.asset.json metadata files.
const ASSET_EXT_RE = /\.(png|jpe?g|mp4|webp|avif|gif|svg|webm|mp3|m4a|ogg|wav)$/i;
const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  avif: "image/avif",
  mp4: "video/mp4",
  webm: "audio/webm",
  mp3: "audio/mpeg",
  m4a: "audio/mp4",
  ogg: "audio/ogg",
  wav: "audio/wav",
};

const localAssetsPlugin = {
  name: "local-assets",
  apply: "serve" as const,
  configureServer(server: { middlewares: { use: (m: unknown) => void } }) {
    server.middlewares.use((req: { url?: string }, res: ServerResponse, next: () => void) => {
      const url = req.url ?? "";
      const m = url.match(/^\/__local\/([^/?]+)(?:\?.*)?$/);
      if (!m) return next();
      const filename = m[1];
      if (!filename) return next();
      if (!ASSET_EXT_RE.test(filename)) return next();
      const filePath = path.resolve(__dirname, "src/assets", filename);
      // Prevent path traversal: filename was already constrained to [^/]+, so
      // resolve() can't escape src/assets, but double-check the prefix.
      if (!filePath.startsWith(path.resolve(__dirname, "src/assets") + path.sep)) return next();
      if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        return res.end();
      }
      const ext = path.extname(filePath).slice(1).toLowerCase();
      res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
      fs.createReadStream(filePath).pipe(res);
      return;
    });
  },
};

export default defineConfig({
  plugins: [localAssetsPlugin, tanstackStart(), viteReact(), tailwindcss(), nitro()],
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    exclude: ["gsap", "@gsap/react"],
  },
});
