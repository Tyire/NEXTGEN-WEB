// Turns the flat-white-bg Nextgen-logo.jpg into transparent assets:
//   logo-full.png       — black wordmark (for light bg)
//   logo-full-dark.png  — white wordmark (for dark bg), gradient icon untouched
//   logo-icon.png       — isolated icon mark
// Run: node scripts/gen-logo.mjs
import sharp from "sharp";

const SRC = "../Nextgen-logo.jpg";
const SCALE = 3; // upscale for crisp retina display

const base = sharp(SRC).resize({ width: 419 * SCALE, kernel: "lanczos3" }).ensureAlpha();
const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// White -> transparent with a soft edge band; also build a "dark" copy that
// recolors the black/gray wordmark pixels to off-white.
const light = Buffer.from(data);
const dark = Buffer.from(data);
const WHITE = [244, 241, 236];

for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const m = Math.min(r, g, b);
  const mx = Math.max(r, g, b);

  // alpha from "whiteness"
  let a;
  if (m >= 230) a = 0;
  else if (m <= 208) a = 255;
  else a = Math.round(((230 - m) / 22) * 255);

  light[i + 3] = a;
  dark[i + 3] = a;

  // dark variant: neutral (low-saturation) dark pixels = the wordmark -> white
  if (a > 0 && mx - m < 30 && mx < 170) {
    dark[i] = WHITE[0];
    dark[i + 1] = WHITE[1];
    dark[i + 2] = WHITE[2];
  }
}

const mk = (buf) =>
  sharp(buf, { raw: { width, height, channels } }).png({ compressionLevel: 9 });

await mk(light).trim().toFile("public/brand/logo-full.png");
await mk(dark).trim().toFile("public/brand/logo-full-dark.png");

// icon = left square region of the trimmed light logo
const trimmed = await mk(light).trim().toBuffer({ resolveWithObject: true });
const h = trimmed.info.height;
await sharp(trimmed.data)
  .extract({ left: 0, top: 0, width: Math.round(h * 1.02), height: h })
  .trim()
  .png()
  .toFile("public/brand/logo-icon.png");

console.log("wrote logo-full.png, logo-full-dark.png, logo-icon.png");
