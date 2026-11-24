#!/usr/bin/env bash
# Local test only: install the NextGen Nginx config into WSL Ubuntu and start Nginx.
set -e
R="$(cd "$(dirname "$0")/.." && pwd)"
rm -f /etc/nginx/sites-enabled/default
# 00-host.conf owns server_tokens; comment out a copy in nginx.conf.
sed -i -E 's/^([[:space:]]*)server_tokens/\1# server_tokens/' /etc/nginx/nginx.conf
cp "$R"/deploy/nginx/conf.d/*.conf /etc/nginx/conf.d/
mkdir -p /etc/nginx/snippets && cp "$R"/deploy/nginx/snippets/*.conf /etc/nginx/snippets/
cp "$R"/deploy/nginx/sites-available/nextgen.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/nextgen.conf /etc/nginx/sites-enabled/nextgen.conf
rm -rf /var/www/nextgen && mkdir -p /var/www/nextgen && cp -r "$R"/out/. /var/www/nextgen/ && rm -f /var/www/nextgen/.htaccess
grep -q sslip /etc/hosts || echo "127.0.0.1 nextgen.102-213-77-4.sslip.io" >> /etc/hosts
nginx -t
if pgrep -x nginx >/dev/null; then nginx -s reload; else nginx; fi
echo started
