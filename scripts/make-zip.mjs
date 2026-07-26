/**
 * Creates nextgen-web-hostibily.zip from the out/ folder,
 * excluding .vid files (served from Vercel, not needed on static host).
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const archiverLib = require("archiver");
const archiver = archiverLib.Archiver ? archiverLib.create.bind(archiverLib) : archiverLib;
import { createWriteStream, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, "..", "out");
const dest = join(__dirname, "..", "..", "nextgen-web-hostibily.zip");

const output = createWriteStream(dest);
const archive = archiver("zip", { zlib: { level: 6 } });

await new Promise((resolve, reject) => {
  output.on("close", resolve);
  archive.on("error", reject);
  archive.pipe(output);
  // Add all files except .vid (videos are 24 MB and served from Vercel)
  archive.glob("**/*", {
    cwd: src,
    ignore: ["**/*.vid", "videos/*.vid"],
    dot: true,
  });
  archive.finalize();
});

const size = (statSync(dest).size / 1024 / 1024).toFixed(1);
console.log(`✓ ${dest} (${size} MB) — ready to upload to Hostibily`);
console.log("NOTE: .vid video files are excluded (25 MB). Videos will play from Vercel.");
