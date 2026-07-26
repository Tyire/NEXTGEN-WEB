const archiver = require("archiver");
const { createWriteStream, statSync } = require("fs");
const path = require("path");

const src  = path.join(__dirname, "..", "out");
const dest = path.join(__dirname, "..", "..", "nextgen-web-hostibily.zip");

const output  = createWriteStream(dest);
const archive = archiver("zip", { zlib: { level: 6 } });

output.on("close", () => {
  const mb = (statSync(dest).size / 1024 / 1024).toFixed(1);
  console.log(`✓ Created: ${dest}`);
  console.log(`  Size: ${mb} MB`);
  console.log("  NOTE: .vid video files excluded (they load from Vercel/CDN).");
  console.log("  Upload this zip to Hostibily → extract to public_html/");
});

archive.on("error", (err) => { throw err; });
archive.pipe(output);
archive.glob("**/*", { cwd: src, ignore: ["**/*.vid"], dot: true });
archive.finalize();
