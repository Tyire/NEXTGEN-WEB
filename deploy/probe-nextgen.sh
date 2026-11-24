#!/usr/bin/env bash
# Live probe of the NextGen Nginx guards (R1-R8, F4, F5, F10, F17, F18).
# Usage: deploy/probe-nextgen.sh https://nextgen.102-213-77-4.sslip.io
# Exit code = number of failed checks.
set -u
BASE="${1:?give the base URL, for example https://nextgen.102-213-77-4.sslip.io}"
HOST="$(printf '%s' "$BASE" | sed -E 's#^[a-z]+://##; s#/.*$##')"
fail=0; pass=0
# On the VPS itself, run with PROBE_RESOLVE=127.0.0.1 (the router does not loop back).
if [[ -n "${PROBE_RESOLVE:-}" ]]; then
  curl() { command curl --resolve "$HOST:443:$PROBE_RESOLVE" --resolve "$HOST:80:$PROBE_RESOLVE" "$@"; }
fi

check() { # expected_code  description  curl-args...
  local want="$1" what="$2"; shift 2
  local got
  got="$(curl -sk -o /dev/null -w '%{http_code}' --max-time 15 "$@")"
  if [[ "$got" == "$want" ]]; then pass=$((pass+1)); printf 'PASS %s  %s\n' "$got" "$what"
  else fail=$((fail+1)); printf 'FAIL got %s want %s  %s\n' "$got" "$want" "$what"; fi
}
header_has() { # description  header-regex  path
  local what="$1" re="$2" path="$3"
  if curl -skI --max-time 15 "$BASE$path" | grep -qiE "$re"; then pass=$((pass+1)); echo "PASS hdr  $what"
  else fail=$((fail+1)); echo "FAIL hdr  $what"; fi
}
header_lacks() {
  local what="$1" re="$2" path="$3"
  if curl -skI --max-time 15 "$BASE$path" | grep -qiE "$re"; then fail=$((fail+1)); echo "FAIL hdr  $what"
  else pass=$((pass+1)); echo "PASS hdr  $what"; fi
}

echo "== real pages and real query words stay open"
check 200 "home"                          "$BASE/"
check 200 "plans page"                    "$BASE/plans/"
check 301 "no trailing slash redirects"   "$BASE/plans"
check 200 "utm tracking word"             "$BASE/?utm_source=x&utm_medium=y"
check 200 "gclid"                         "$BASE/?gclid=abc"
check 200 "fbclid"                        "$BASE/plans/?fbclid=abc"
check 200 "junk beside a real word"       "$BASE/?utm_source=x&zzz=1"
check 200 "next.js _rsc fetch word"       "$BASE/plans/?_rsc=abc"
check 200 "robots.txt"                    "$BASE/robots.txt"
check 200 "sitemap.xml"                   "$BASE/sitemap.xml"
check 200 "service worker"                "$BASE/sw.js"

echo "== R1 / F4 junk query words"
check 404 "only a made-up word"           "$BASE/?sihbb"
check 404 "made-up word with value"       "$BASE/plans/?foo=bar"
check 404 "two made-up words"             "$BASE/?a=1&b=2"

echo "== F18 WordPress query tricks (even beside a real word)"
check 404 "?author=1"                     "$BASE/?author=1"
check 404 "?rest_route"                   "$BASE/?rest_route=/wp/v2/users"
check 404 "?p=1 with utm"                 "$BASE/?p=1&utm_source=x"
check 404 "?feed=rss2"                    "$BASE/?feed=rss2"

echo "== R2 / F5 methods"
check 405 "POST"                          -X POST "$BASE/"
check 405 "PUT"                           -X PUT "$BASE/"
check 405 "DELETE"                        -X DELETE "$BASE/plans/"
check 405 "TRACE"                         -X TRACE "$BASE/"
check 200 "HEAD"                          -I "$BASE/"

echo "== R3 traversal and encoding"
check 400 "../ traversal"                 --path-as-is "$BASE/../../etc/passwd"
check 400 "%2e%2e"                        --path-as-is "$BASE/%2e%2e/%2e%2e/etc/passwd"
check 400 "double encoding"               --path-as-is "$BASE/%252e%252e/etc/passwd"
check 400 "null byte"                     --path-as-is "$BASE/index.html%00.php"
check 400 "overlong address"              "$BASE/?utm_source=$(printf 'a%.0s' $(seq 1 2100))"

echo "== R6 / F17 probe paths (any depth, any case, encoded)"
for p in /wp-admin /wp-login.php /xmlrpc.php /wp-json/wp/v2/users /wp-includes/x.js /wp-config.php.bak \
         /blog/wp-admin /WP-ADMIN /%77p-admin //wp-admin /wp-cron.php /wordpress/ /wp-content/plugins/x.php \
         /.env /.env.local /.git/config /.git/HEAD /.htaccess /.DS_Store /phpmyadmin/ /pma/ /adminer.php \
         /backup.sql /db.sqlite /site.zip /index.php /cgi-bin/test /vendor/autoload.php /server-status \
         /readme.txt /CHANGELOG.md /license.txt; do
  check 404 "probe $p" --path-as-is "$BASE$p"
done
check 404 "acme dir allowed but empty"   "$BASE/.well-known/nothing-here"

echo "== old WordPress addresses (cut-over redirects)"
check 301 "/shop-now/ -> plans"           "$BASE/shop-now/"
check 301 "/product/5mbps/ -> plans"      "$BASE/product/5mbps/"
check 301 "/self-care/ -> selfcare portal" "$BASE/self-care/"
check 301 "/datacenter/ -> cloud"         "$BASE/datacenter/"
check 410 "lorem demo post gone"          "$BASE/hello-world/"
check 410 "demo project gone"             "$BASE/project/project001/"
check 200 "/about/ unchanged"             "$BASE/about/"

echo "== F10 404 page and tiny 404"
check 404 "unknown page"                  "$BASE/no-such-page/"
header_has  "404 page is noindex"         '^x-robots-tag: .*noindex'  "/no-such-page/"
header_has  "404 page not cached"         '^cache-control: .*no-store' "/no-such-page/"
size="$(curl -sk --max-time 15 "$BASE/images/no-such.png" | wc -c | tr -d ' ')"
if [[ "$size" -le 16 ]]; then pass=$((pass+1)); echo "PASS tiny 404 for missing image ($size bytes)"
else fail=$((fail+1)); echo "FAIL tiny 404 for missing image ($size bytes)"; fi

echo "== R7 / R8 headers and Host"
header_lacks "no nginx version"           '^server: nginx/[0-9]'  "/"
header_lacks "no X-Powered-By"            '^x-powered-by'         "/"
header_has   "CSP present"                '^content-security-policy: default-src' "/"
header_has   "nosniff"                    '^x-content-type-options: nosniff'      "/"
header_has   "frame deny"                 '^x-frame-options: deny'                "/"
header_has   "HSTS"                       '^strict-transport-security'            "/"
if [[ "$HOST" == *sslip.io ]]; then header_has "staging is noindex" '^x-robots-tag: .*noindex' "/"; fi
IP="${PROBE_RESOLVE:-$(getent hosts "$HOST" 2>/dev/null | awk '{print $1}' | head -1)}"
if [[ -n "$IP" ]]; then
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 -H 'Host: evil.example' "http://$IP/")"
  if [[ "$code" == "000" ]]; then pass=$((pass+1)); echo "PASS bad Host gets no reply (444)"
  else fail=$((fail+1)); echo "FAIL bad Host got $code"; fi
fi

echo; echo "passed $pass, failed $fail"
exit "$fail"
