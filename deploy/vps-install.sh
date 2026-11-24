#!/usr/bin/env bash
# One-time host setup on 102.213.77.4 (run as root ON THE VPS after outbound internet works).
# Installs: Nginx, certbot, fail2ban. Installs the NextGen Nginx files from /root/nextgen-deploy.
# Shared-host rules: /root/SHARED-HOST.md. Safe to run again.
set -euo pipefail
SRC=/root/nextgen-deploy

if pgrep -x apt-get >/dev/null || pgrep -x dpkg >/dev/null; then
  echo "apt or dpkg is running (maybe NEEP). Try again later."; exit 1
fi
timeout 6 bash -c '</dev/tcp/1.1.1.1/443' || { echo "No outbound internet yet."; exit 1; }

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx fail2ban

# fail2ban: SSH jail (key-only SSH, but bans stop the log flood).
cat > /etc/fail2ban/jail.d/sshd.local <<'EOT'
[sshd]
enabled  = true
backend  = systemd
maxretry = 3
findtime = 10m
bantime  = 1h
bantime.increment = true
bantime.maxtime = 1w
ignoreip = 127.0.0.1/8 ::1 192.168.250.0/24
EOT
systemctl enable --now fail2ban
systemctl restart fail2ban

# Nginx: NextGen owns nginx.conf tweaks, conf.d/* and nextgen.conf.
rm -f /etc/nginx/sites-enabled/default
sed -i -E 's/^([[:space:]]*)server_tokens/\1# server_tokens/' /etc/nginx/nginx.conf
install -m 644 "$SRC"/nginx/conf.d/*.conf /etc/nginx/conf.d/
install -d /etc/nginx/snippets
install -m 644 "$SRC"/nginx/snippets/*.conf /etc/nginx/snippets/
# Keep certbot's 443 lines if nextgen.conf already has them.
if ! grep -q "managed by Certbot" /etc/nginx/sites-available/nextgen.conf 2>/dev/null; then
  install -m 644 "$SRC"/nginx/sites-available/nextgen.conf /etc/nginx/sites-available/nextgen.conf
else
  echo "nextgen.conf has certbot lines: not replaced. Merge changes by hand."
fi
ln -sf /etc/nginx/sites-available/nextgen.conf /etc/nginx/sites-enabled/nextgen.conf
install -d -o www-data -g www-data /var/www/nextgen

nginx -t
systemctl enable nginx
systemctl reload nginx || systemctl restart nginx

echo "- $(date -u +%F) (NextGen): Nginx, certbot and fail2ban installed. apt is free." >> /root/SHARED-HOST.md
echo INSTALL_DONE
