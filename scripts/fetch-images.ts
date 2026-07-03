/**
 * Build-time Pexels fetch → self-hosted optimized imagery + manifest.
 * Usage:  PEXELS_API_KEY=xxx npm run fetch-images
 *
 * - Reads slot definitions from data/imagery.ts (query + orientation per slot).
 * - Queries Pexels, downloads one good landscape/portrait per slot.
 * - Optimizes to AVIF + WebP responsive widths into public/images/people/.
 * - Rewrites data/imagery.ts with local src, alt, avg_color, photographer credit.
 *
 * License: Pexels allows commercial use, no attribution required (we credit anyway).
 * We DO NOT hotlink the Pexels CDN at runtime — everything is self-hosted.
 *
 * ponytail: single-file script, direct REST API (no SDK/Composio). Run on demand,
 * not in the build pipeline, so a missing key never breaks `next build`.
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { imagery, type ImageSlot } from "../data/imagery";

const KEY = process.env.PEXELS_API_KEY;
const OUT_DIR = path.join(process.cwd(), "public/images/people");
const WIDTHS = [640, 1024, 1600];

async function searchOne(slot: ImageSlot) {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", slot.query);
  url.searchParams.set("orientation", slot.orientation === "square" ? "square" : slot.orientation);
  url.searchParams.set("per_page", "10");
  const res = await fetch(url, { headers: { Authorization: KEY! } });
  if (!res.ok) throw new Error(`Pexels ${res.status} for "${slot.query}"`);
  const data = (await res.json()) as { photos: PexelsPhoto[] };
  // pick the first non-empty result (eyeball/curate manually if you want)
  return data.photos[0];
}

type PexelsPhoto = {
  src: { original: string; large2x: string };
  alt: string;
  avg_color: string;
  photographer: string;
  photographer_url: string;
};

async function processSlot(slot: ImageSlot): Promise<ImageSlot> {
  const photo = await searchOne(slot);
  if (!photo) {
    console.warn(`! no result for ${slot.id} ("${slot.query}") — leaving placeholder`);
    return slot;
  }
  const buf = Buffer.from(await (await fetch(photo.src.original)).arrayBuffer());
  const base = `${slot.id}`;
  for (const w of WIDTHS) {
    await sharp(buf).resize(w).avif({ quality: 55 }).toFile(path.join(OUT_DIR, `${base}-${w}.avif`));
    await sharp(buf).resize(w).webp({ quality: 70 }).toFile(path.join(OUT_DIR, `${base}-${w}.webp`));
  }
  console.log(`✓ ${slot.id} ← ${photo.photographer}`);
  return {
    ...slot,
    src: `/images/people/${base}`, // consumer appends -<w>.avif/.webp via srcset
    alt: photo.alt || slot.alt,
    avgColor: photo.avg_color || slot.avgColor,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
  };
}

async function main() {
  if (!KEY) {
    console.error("PEXELS_API_KEY not set. Get a free key at https://www.pexels.com/api/ and add it to .env");
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });
  // Optional: SLOT=hero re-fetches only that slot; all others are kept as-is so
  // a targeted refresh never clobbers already-curated images.
  const ONLY = process.env.SLOT;
  const updated: Record<string, ImageSlot> = {};
  for (const slot of Object.values(imagery)) {
    if (ONLY && slot.id !== ONLY) {
      updated[slot.id] = slot;
      continue;
    }
    try {
      updated[slot.id] = await processSlot(slot);
    } catch (e) {
      console.warn(`! ${slot.id} failed:`, (e as Error).message);
      updated[slot.id] = slot;
    }
  }
  // rewrite manifest
  const body =
    `// AUTO-UPDATED by scripts/fetch-images.ts — slot definitions + fetched metadata.\n` +
    `export type ImageSlot = ${"{ id: string; query: string; orientation: 'landscape'|'portrait'|'square'; src: string|null; alt: string; avgColor: string; photographer: string|null; photographerUrl: string|null }"};\n\n` +
    `export const imagery: Record<string, ImageSlot> = ${JSON.stringify(updated, null, 2)};\n\n` +
    `export const photoCredits = Object.values(imagery).filter((s) => s.src && s.photographer).map((s) => ({ name: s.photographer!, url: s.photographerUrl! }));\n`;
  await writeFile(path.join(process.cwd(), "data/imagery.ts"), body, "utf8");
  console.log("Manifest rewritten: data/imagery.ts");
}

main();
