#!/usr/bin/env bash
# Build the static site and publish it to the VPS with an atomic swap and a rollback copy.
# Run from Git Bash on the owner's PC:  bash deploy/deploy-site.sh
# Needs the key ~/.ssh/id_nextgen_vps. Skip the build with NO_BUILD=1.
set -euo pipefail
cd "$(dirname "$0")/.."
VPS=root@102.213.77.4
SSH=(ssh -i "$HOME/.ssh/id_nextgen_vps" -o IdentitiesOnly=yes -o BatchMode=yes -o ConnectTimeout=25 -o ServerAliveInterval=10)

[[ "${NO_BUILD:-0}" == 1 ]] || npm run build

# Copy the Nginx files too, so vps-install.sh always has the current version.
tar -C deploy -cz nginx vps-install.sh probe-nextgen.sh | "${SSH[@]}" "$VPS" 'rm -rf /root/nextgen-deploy && mkdir -p /root/nextgen-deploy && tar --no-same-owner -xz -C /root/nextgen-deploy'

# Upload the site to a new folder, then swap. The previous version stays as /var/www/nextgen.prev.
tar -C out --exclude=.htaccess -cz . | "${SSH[@]}" "$VPS" '
  set -e
  rm -rf /var/www/nextgen.new && mkdir -p /var/www/nextgen.new
  tar --no-same-owner -xz -C /var/www/nextgen.new
  chown -R www-data:www-data /var/www/nextgen.new
  test -f /var/www/nextgen.new/index.html
  rm -rf /var/www/nextgen.prev
  [ -d /var/www/nextgen ] && mv /var/www/nextgen /var/www/nextgen.prev
  mv /var/www/nextgen.new /var/www/nextgen
  echo "site swapped"'

echo "Rollback if needed:"
echo "  ssh root@102.213.77.4 'rm -rf /var/www/nextgen && mv /var/www/nextgen.prev /var/www/nextgen'"
