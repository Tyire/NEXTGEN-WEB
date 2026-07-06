// PWA service worker v2 — REBUILT after v1 caused the mobile outage:
// v1 precached route HTML under a never-bumped cache name, so phones kept
// serving stale pages that referenced deleted JS chunks (dead header, hidden
// sections). v2 rules:
//   1. HTML is ALWAYS network-first and never precached.
//   2. The cache name is versioned — bumping it nukes every old cache
//      (including v1) on activate, which heals previously-broken phones.
//   3. Only immutable hashed assets (/_next/static/) are cache-first.
// v3: Ink & Signal rebrand — bump flushes stale fonts/images/videos cached
// under v2 (HTML rules unchanged: still network-first, never precached).
// v4: plum dark restored + maturity pass (solid accents, new pages).
const VERSION = "nextgen-v4";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations (HTML): network-first; cache a copy only as offline fallback.
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match("/")))
    );
    return;
  }

  // Immutable hashed build assets: cache-first (safe — the hash IS the version).
  if (url.pathname.startsWith("/_next/static/")) {
    e.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(request, copy));
            return res;
          })
      )
    );
    return;
  }

  // Everything else (images, fonts, video): stale-while-revalidate.
  e.respondWith(
    caches.match(request).then((cached) => {
      const net = fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
