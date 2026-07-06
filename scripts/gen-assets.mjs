// Rasterizes brand assets from the REAL icon mark (public/brand/logo-icon.png):
// PWA icons + favicon + OG image. Run after gen-logo.mjs.
//   node scripts/gen-logo.mjs && node scripts/gen-assets.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const INK = "#0b1c33"; // brand ink navy — matches the Ink & Signal palette
const ICON = "public/brand/logo-icon.png";

async function appIcon(size, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="${INK}"/></svg>`
  );
  const mark = await sharp(ICON)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp(bg).composite([{ input: mark, gravity: "centre" }]).png();
}

await mkdir("public/icons", { recursive: true });

for (const [out, size, pad] of [
  ["public/icons/icon-192.png", 192, 0.16],
  ["public/icons/icon-512.png", 512, 0.16],
  ["public/icons/icon-512-maskable.png", 512, 0.26],
  ["public/icons/apple-icon.png", 180, 0.14],
]) {
  await (await appIcon(size, pad)).toFile(out);
  console.log("wrote", out);
}

// favicon (transparent, no plate, so it reads on any tab color)
await sharp(ICON).resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile("public/favicon.png");
console.log("wrote public/favicon.png");

// OG image (1200x630) — grid + glow + real mark + text
const ogBg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1c33"/><stop offset="100%" stop-color="#081020"/></linearGradient>
    <linearGradient id="txt" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#FF1F4D"/><stop offset="55%" stop-color="#FF6B2C"/><stop offset="100%" stop-color="#FFA70F"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g opacity="0.07" stroke="#22344e">
    ${Array.from({ length: 19 }, (_, i) => `<line x1="${i * 64}" y1="0" x2="${i * 64}" y2="630"/>`).join("")}
    ${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 64}" x2="1200" y2="${i * 64}"/>`).join("")}
  </g>
  <ellipse cx="1050" cy="90" rx="340" ry="240" fill="#FF6B2C" opacity="0.14"/>
  <text x="232" y="150" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="54" fill="#f4f1ec">NextGen</text>
  <text x="234" y="190" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="22" letter-spacing="8" fill="url(#txt)">TELCOM</text>
  <text x="90" y="350" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="80" fill="#f4f1ec">Fiber that keeps</text>
  <text x="90" y="440" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="80" fill="url(#txt)">up with you.</text>
  <text x="92" y="520" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#a7b0ac">GPON Fiber · VoIP · Metro Ethernet — Lagos, Nigeria</text>
</svg>`;

const ogMark = await sharp(ICON).resize(120, 120, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp(Buffer.from(ogBg)).composite([{ input: ogMark, top: 84, left: 90 }]).png().toFile("public/og.png");
console.log("wrote public/og.png");
