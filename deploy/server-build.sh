#!/usr/bin/env bash
# Build and publish NextGen ON THE VPS (owner request 24 Nov 2026: keep heavy
# work off the laptop). Called by the post-receive hook of
# /srv/git/nextgen-web.git, or by hand:  bash /srv/nextgen-web/deploy/server-build.sh
#
# Layout on the VPS
#   /srv/git/nextgen-web.git   bare repo (laptop remote "vps")
#   /srv/nextgen-web           checkout, owned by user "nextgen"; builds run as that user
#   /var/www/nextgen           live site (www-data); previous version in nextgen.prev
set -euo pipefail
BRANCH="${1:-feat/redesign-signal}"
SRC=/srv/nextgen-web
GIT_DIR_BARE=/srv/git/nextgen-web.git
LOG=/var/log/nextgen-build.log
exec > >(tee -a "$LOG") 2>&1
echo "=== $(date -Is) build $BRANCH"

# 1. Check out the pushed branch (as the build user, never as root).
# The index file lives in the checkout, because the bare repo belongs to root.
runuser -u nextgen -- env GIT_INDEX_FILE="$SRC/.git-index" \
  git --git-dir="$GIT_DIR_BARE" --work-tree="$SRC" checkout -f "$BRANCH"
cd "$SRC"

# 2. Install packages only when the lockfile changed.
LOCK_SUM=$(sha256sum package-lock.json | cut -d' ' -f1)
if [[ ! -d node_modules || "$(cat .lock.sum 2>/dev/null)" != "$LOCK_SUM" ]]; then
  runuser -u nextgen -- npm ci --no-audit --no-fund
  echo "$LOCK_SUM" > .lock.sum && chown nextgen: .lock.sum
fi

# 3. Build with low priority so NEEP stays fast.
runuser -u nextgen -- nice -n 10 npm run build
test -f out/index.html

# 4. Nginx kit: install changed files, test, reload. A failed test keeps the old config.
install -m 644 deploy/nginx/conf.d/*.conf /etc/nginx/conf.d/
install -m 644 deploy/nginx/snippets/*.conf /etc/nginx/snippets/
nginx -t && systemctl reload nginx

# 5. Atomic swap; keep one rollback copy.
rm -rf /var/www/nextgen.new
cp -a out /var/www/nextgen.new
rm -f /var/www/nextgen.new/.htaccess
chown -R www-data:www-data /var/www/nextgen.new
rm -rf /var/www/nextgen.prev
[[ -d /var/www/nextgen ]] && mv /var/www/nextgen /var/www/nextgen.prev
mv /var/www/nextgen.new /var/www/nextgen
echo "site swapped $(git --git-dir="$GIT_DIR_BARE" rev-parse --short "$BRANCH")"
echo "Rollback: rm -rf /var/www/nextgen && mv /var/www/nextgen.prev /var/www/nextgen"
