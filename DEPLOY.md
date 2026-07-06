# Deploying nextgen-web

The site is a **fully static Next.js export** — `npm run build` writes the
whole site to `out/`. Anything that can serve files can host it. No Node
runtime is needed in production.

```powershell
npm run build          # -> out/  (11 routes, sitemap.xml, robots.txt, sw.js)
```

Sanity-check locally before uploading (serves out/ on :3210):

```powershell
npx serve out -l 3210
```

---

## Option A — Nginx on a VPS

### 1. Get the files up

```bash
# from your machine (replace user/host)
scp -r out/ user@server:/tmp/nextgen
# on the server
sudo mkdir -p /var/www/nextgen.ng
sudo rsync -a --delete /tmp/nextgen/ /var/www/nextgen.ng/
sudo chown -R www-data:www-data /var/www/nextgen.ng
```

### 2. Server block

`/etc/nginx/sites-available/nextgen.ng`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name nextgen.ng www.nextgen.ng;
    # certbot will add the 301 -> https redirect here
    root /var/www/nextgen.ng;
    index index.html;

    # ── Routing ──────────────────────────────────────────────
    # Next static export emits /connectivity.html etc. — try the
    # clean URL, then the .html file, then 404.
    location / {
        try_files $uri $uri.html $uri/ =404;
    }
    error_page 404 /404.html;

    # ── Security headers ─────────────────────────────────────
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; upgrade-insecure-requests" always;
    # HSTS: uncomment ONLY after HTTPS is confirmed working
    # add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # ── Caching ──────────────────────────────────────────────
    # Hashed build assets: cache forever
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    # Media (30 days). IMPORTANT: .vid files are mp4 bytes served as
    # application/octet-stream ON PURPOSE (IDM download-manager bypass).
    # Do NOT add a video/* MIME type for .vid.
    location ~* \.(avif|webp|png|jpe?g|gif|svg|ico|mp4|webm|vid|woff2?)$ {
        add_header Cache-Control "public, max-age=2592000";
    }
    # HTML + service worker: always revalidate so deploys go live at once
    location ~* (\.html|sw\.js)$ {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    # ── Compression ──────────────────────────────────────────
    gzip on;
    gzip_types text/html text/css text/plain application/javascript application/json image/svg+xml application/xml;
    gzip_min_length 1024;
}
```

Enable + reload:

```bash
sudo ln -s /etc/nginx/sites-available/nextgen.ng /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3. HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d nextgen.ng -d www.nextgen.ng
```

Certbot rewrites the server block for 443 + auto-renewal. After the site
loads over HTTPS, uncomment the HSTS header and `sudo systemctl reload nginx`.

### 4. Redeploys

```bash
npm run build
rsync -a --delete out/ user@server:/var/www/nextgen.ng/
```

`--delete` removes stale hashed chunks. HTML is `must-revalidate` and the
service worker is network-first, so visitors get the new build immediately —
no cache purge needed.

---

## Option B — Static shared host (Hostinger / cPanel / LiteSpeed)

The export already contains everything the shared host needs, including
`.htaccess` (HTTPS redirect, security headers, caching, compression, 404).

1. `npm run build`
2. Zip the **contents** of `out/` (not the folder itself):
   ```powershell
   Compress-Archive -Path out\* -DestinationPath nextgen-deploy.zip -Force
   ```
3. In the host's file manager, open the site root (`public_html/` on
   Hostinger/cPanel) and **delete the previous deploy's files** (safe: the
   whole site lives in this one export).
4. Upload `nextgen-deploy.zip` and extract it in place. Confirm `.htaccess`
   is present (file managers often hide dotfiles — enable "show hidden").
5. Point the domain at the host if not already done, and enable the host's
   free SSL (Let's Encrypt toggle) — the `.htaccess` then forces HTTPS.
6. Verify: open the site, check `https://nextgen.ng/sitemap.xml` and
   `robots.txt` load, and that videos play (the `.vid` files must download
   as octet-stream — that's correct and intentional).

### Checklist after either deploy

- [ ] Home, all 5 subpages, `/404` render over HTTPS
- [ ] `sitemap.xml` + `robots.txt` reachable
- [ ] Videos play (hero + banners), theme toggle works
- [ ] Old phones: hard-refresh once — sw v3 purges every older cache
- [ ] `securityheaders.com` scan comes back green
