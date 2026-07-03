# Deployment

NextGen Telcoms is a **Next.js static export** (`output: "export"` + `trailingSlash: true`).
`npm run build` writes a fully static site to `out/` — plain HTML/CSS/JS, no Node runtime
at serve time. It deploys anywhere that serves static files.

## Build (same for every target)

```bash
npm ci                # install exact deps
npm run build         # → out/  (11 routes prerendered)
```

`out/` contains: `index.html`, one folder per route (`plans/index.html`, `voice/index.html`, …),
`404.html`, hashed assets under `_next/static/`, self-hosted `images/` + `videos/`, and PWA files
(`manifest.webmanifest`, `sw.js`, `icons/`). No `basePath` — it serves from the domain root.

> Node **20+** is required to *build*. It is **not** required to *serve*.

---

## Option A — Static host (Hostinger / cPanel / shared hosting)

**Requirements**
- A hosting plan with a public web root (`public_html/`) — Apache or LiteSpeed (Hostinger is LiteSpeed).
- SSL certificate (Hostinger provides free Let's Encrypt — enable it in hPanel).
- Domain `nextgen.ng` pointed at the host (A record / nameservers).
- FTP/SFTP or the hPanel File Manager to upload.

**Steps**
1. `npm run build` locally.
2. Upload the **contents of `out/`** (not the folder itself) into `public_html/`.
   Include the hidden **`.htaccess`** (already generated into `out/` from `public/.htaccess`) —
   it forces HTTPS, sets the 404 page, and adds cache headers.
3. In hPanel enable **SSL** + **Force HTTPS**, and set the domain’s document root to `public_html/`.
4. Visit `https://nextgen.ng` — confirm home, `/plans/`, `/voice/`, a 404, and the PWA install prompt.

Clean URLs already work because each route is a real folder with `index.html`. Redeploy = re-upload `out/`.

---

## Option B — Linux server / VPS (Nginx)

Serve the static `out/` with Nginx. (`next start` is **not** used — static export has no server.)

**Requirements**
- Ubuntu/Debian VPS with `sudo`.
- Node **20+** + npm to build (on the server, or build in CI and `scp` the `out/` folder over).
- **Nginx** (or Caddy) to serve files.
- Domain `nextgen.ng` A record → server IP.
- `certbot` for HTTPS (Let's Encrypt).
- `ufw` allowing 80/443.

**Steps**
```bash
# 1. Build (on the server or copy out/ from CI)
git clone <repo> && cd nextgen-web
npm ci && npm run build
sudo mkdir -p /var/www/nextgen && sudo cp -r out/* /var/www/nextgen/

# 2. Nginx site (see block below)
sudo nano /etc/nginx/sites-available/nextgen
sudo ln -s /etc/nginx/sites-available/nextgen /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 3. Firewall + TLS
sudo ufw allow 'Nginx Full'
sudo certbot --nginx -d nextgen.ng -d www.nextgen.ng
```

**`/etc/nginx/sites-available/nextgen`**
```nginx
server {
    listen 80;
    server_name nextgen.ng www.nextgen.ng;
    root /var/www/nextgen;
    index index.html;

    # trailingSlash export: resolve /plans -> /plans/index.html, then /plans.html, then 404
    location / {
        try_files $uri $uri/ $uri.html /404.html;
    }

    error_page 404 /404.html;

    # hashed build assets — cache forever
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # media — 30 days
    location ~* \.(avif|webp|png|jpe?g|gif|svg|ico|mp4|webm|woff2?)$ {
        add_header Cache-Control "public, max-age=2592000";
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```
certbot rewrites this to listen on 443 and adds the HTTP→HTTPS redirect automatically.

**Redeploy:** `npm run build` → `sudo cp -r out/* /var/www/nextgen/` → done (no restart needed).

---

## Pre-launch checklist (still outstanding)
- **Street address** in `lib/site.ts` is region-level only — add the exact HQ address (updates footer + LocalBusiness JSON-LD).
- **Hero video licence** — confirm rights to the Kimi-V1 clip in `public/videos/`.
- Set the production domain everywhere it matters — `site.url` / `metadataBase` are already `https://nextgen.ng`.
