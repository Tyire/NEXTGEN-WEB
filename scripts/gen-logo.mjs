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

  // alpha from "whiteness" — thresholds tight enough to also drop the
  // near-white JPG-artifact ring around the mark (the "white residue").
  let a;
  if (m >= 214) a = 0;
  else if (m <= 186) a = 255;
  else a = Math.round(((214 - m) / 28) * 255);

  light[i + 3] = a;
  dark[i + 3] = a;

  // Defringe: edge pixels are blends with the white bg — un-blend them
  // (observed = true*α + 255*(1-α)) or they leave a white halo on dark surfaces.
  if (a > 0 && a < 255) {
    for (let c = 0; c < 3; c++) {
      const v = Math.round((data[i + c] * 255 - 255 * (255 - a)) / a);
      const u = Math.max(0, Math.min(255, v));
      light[i + c] = u;
      dark[i + c] = u;
    }
  }

  // dark variant: neutral (low-saturation) dark pixels = the wordmark -> white
  if (a > 0 && mx - m < 30 && mx < 170) {
    dark[i] = WHITE[0];
    dark[i + 1] = WHITE[1];
    dark[i + 2] = WHITE[2];
  }
}

// Erode the alpha mask (3x3 min filter) — the outermost ring of edge pixels
// is white/pink-blended anti-aliasing from the JPG; no color threshold can
// separate it, so shrink the mask past it. 2 iterations ≈ 0.7px at 1x.
function erodeAlpha(buf, iterations = 2) {
  for (let it = 0; it < iterations; it++) {
    const src = Buffer.from(buf);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let min = 255;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy, nx = x + dx;
            if (ny < 0 || ny >= height || nx < 0 || nx >= width) { min = 0; continue; }
            const a = src[(ny * width + nx) * channels + 3];
            if (a < min) min = a;
          }
        }
        buf[(y * width + x) * channels + 3] = min;
      }
    }
  }
}
erodeAlpha(light);
erodeAlpha(dark);

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
