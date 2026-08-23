#!/usr/bin/env node
/*
 * Rewrites the PHOTOS block in index.html so every relative src becomes a data: URI,
 * producing a single self-contained page. Use when the file has to travel on its own —
 * a published artifact, an attachment — where relative image paths cannot resolve.
 *
 *   node tools/inline-photos.mjs [--in index.html] [--out index.inlined.html]
 */
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const argOf = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i === -1 ? fallback : args[i + 1];
};
const inPath  = resolve(root, argOf("--in", "index.html"));
const outPath = resolve(root, argOf("--out", "index.inlined.html"));

const MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif"
};

let html = readFileSync(inPath, "utf8");

const open = html.indexOf("const PHOTOS = {");
if (open === -1) {
  console.error("Could not find the PHOTOS block in " + inPath);
  process.exit(1);
}
const close = html.indexOf("\n};", open);
const block = html.slice(open, close + 3);

let inlined = 0, skipped = 0, bytes = 0;

/* Line-wise so the commented-out example in the PHOTOS block is left alone. */
const isComment = (line) => /^\s*(\/\*|\*|\/\/)/.test(line);
const rewritten = block.split("\n").map((line) => {
  if (isComment(line)) return line;
  return line.replace(/src\s*:\s*"([^"]+)"/g, (whole, src) => {
    if (src.startsWith("data:")) { skipped++; return whole; }
    const file = resolve(root, src);
    if (!existsSync(file)) {
      console.warn("  missing, left as-is: " + src);
      skipped++;
      return whole;
    }
    const mime = MIME[extname(file).toLowerCase()];
    if (!mime) {
      console.warn("  unsupported type, left as-is: " + src);
      skipped++;
      return whole;
    }
    const size = statSync(file).size;
    bytes += size;
    inlined++;
    console.log("  inlined " + src + "  (" + (size / 1024).toFixed(0) + " KB)");
    return 'src:"data:' + mime + ';base64,' + readFileSync(file).toString("base64") + '"';
  });
}).join("\n");

if (!inlined) {
  console.log("Nothing to inline — no relative image paths found in PHOTOS.");
  process.exit(0);
}

writeFileSync(outPath, html.slice(0, open) + rewritten + html.slice(close + 3));

const total = statSync(outPath).size;
console.log("\n" + inlined + " inlined, " + skipped + " left alone.");
console.log("Wrote " + outPath + "  (" + (total / 1024 / 1024).toFixed(2) + " MB)");
if (total > 16 * 1024 * 1024) {
  console.warn("That is over the 16 MB artifact limit — downscale the images and rerun.");
}
