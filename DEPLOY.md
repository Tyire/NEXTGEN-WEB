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

This assumes a fresh Ubuntu/Debian VPS with SSH access and root/sudo. Building
happens on **your own machine** — the server only ever receives the finished
static files, so it never needs Node.js installed.

### 0. One-time server setup

SSH into the box, then:

```bash
sudo apt update && sudo apt upgrade -y

# Nginx + Let's Encrypt client + firewall
sudo apt install -y nginx certbot python3-certbot-nginx ufw rsync

# Firewall: allow SSH + web, then turn it on
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'   # opens 80 + 443
sudo ufw enable
sudo ufw status
```

That's the entire server-side install list: `nginx`, `certbot` +
`python3-certbot-nginx`, `ufw`, `rsync`. No Node, no database, no PHP.

On your **local machine** (where you already have this project), make sure
you have Node.js 20+ and npm — that's all that's needed to build:

```powershell
node --version   # 20.x or newer
npm --version
```

If missing on Windows: `winget install OpenJS.NodeJS.LTS`.

### 1. Point DNS at the server

At your domain registrar, add these records (replace `SERVER_IP` with the
VPS's public IP):

| Type | Host | Value |
|---|---|---|
| A | `@` | `SERVER_IP` |
| A | `www` | `SERVER_IP` |

DNS can take a few minutes to a few hours to propagate. Confirm with
`nslookup nextgen.ng` before moving to the HTTPS step.

### 2. Build locally, get the files up

```powershell
npm run build          # writes the whole static site to out/
```

```bash
# from your machine (replace user/host)
scp -r out/ user@server:/tmp/nextgen
# on the server
sudo mkdir -p /var/www/nextgen.ng
sudo rsync -a --delete /tmp/nextgen/ /var/www/nextgen.ng/
sudo chown -R www-data:www-data /var/www/nextgen.ng
```

### 3. Server block

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

### 4. HTTPS (Let's Encrypt)

Already installed in step 0 — just run it (DNS from step 1 must have
propagated first, or this fails):

```bash
sudo certbot --nginx -d nextgen.ng -d www.nextgen.ng
```

Certbot rewrites the server block for 443, adds the HTTP→HTTPS redirect, and
sets up auto-renewal (a systemd timer — nothing more to do). After the site
loads over HTTPS, edit the server block to uncomment the HSTS header, then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 5. Verify it's live

```bash
curl -I https://nextgen.ng                # expect: HTTP/2 200
curl -I https://nextgen.ng/sitemap.xml    # expect: HTTP/2 200
```

Then open the site in a real browser from your phone (not on the same
network as the server) and click through Home → Plans → Contact.

### 6. Redeploys (every time you push a change)

```powershell
npm run build          # on your machine
```

```bash
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

- [ ] Home, all pages, `/404` render over HTTPS
- [ ] `sitemap.xml` + `robots.txt` reachable
- [ ] Videos play (hero + banners), theme toggle works
- [ ] Old phones: hard-refresh once — the service worker purges every older cache
- [ ] `securityheaders.com` scan comes back green
- [ ] Submit the contact form yourself once and confirm it reaches your inbox

---

## Contact form delivery

No secrets are involved either way — nothing below touches an `.env` file or
a server process.

**Current setup (already live, zero config):** the form posts as
`mailto:info@nextgen.ng` (`components/ContactForm.tsx`) — clicking Send opens
the visitor's own email app with the message pre-filled, and they hit send
from their own address. Works everywhere a mail client is configured; on a
phone/browser with none set up, nothing happens when they click Send.

**Optional upgrade — guaranteed delivery, still no backend:** a free
form-relay service (e.g. [Web3Forms](https://web3forms.com)) lets the static
form POST directly to their endpoint, which emails you. Their "access key"
is meant to sit in public HTML — it can only forward to the address you
registered, it can't read or send anything else. To switch:

1. Sign up at web3forms.com with `info@nextgen.ng` and copy the access key
   they give you.
2. In `components/ContactForm.tsx`, change the `<form>` tag:
   ```tsx
   <form action="https://api.web3forms.com/submit" method="post" className="grid gap-5">
     <input type="hidden" name="access_key" value="PASTE_YOUR_KEY_HERE" />
     {/* ...existing fields unchanged... */}
   ```
3. `npm run build` and redeploy.

Send me the key once you have it (or paste it directly into that file
yourself) and I'll wire it in.
