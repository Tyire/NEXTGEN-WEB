// Run against the dev server or a served static export:
// node scripts/check-design-merge.mjs http://127.0.0.1:3107
import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:3107';
try {
const routes = ['/', '/connectivity/', '/voice/', '/enterprise/', '/plans/', '/about/', '/contact/', '/careers/', '/faq/', '/legal/privacy/', '/legal/terms/', '/legal/fair-usage/'];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route}: HTTP ${response.status}`);
  const raw = await response.text();
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: expected one main heading`);
  assert.match(html, /href="\/careers\/?"/, `${route}: careers link missing`);
  assert.match(html, /wa\.me\/2349166405000/, `${route}: WhatsApp contact missing`);
  if (route !== '/') continue;
  assert.match(html, /data-flythrough=""/, 'flythrough missing from server HTML');
  const flyText = html.match(/<div\b[^>]*data-flythrough-text=""[^>]*>/)?.[0];
  assert(flyText && !/opacity:\s*0(?:[;"\s]|$)/.test(flyText), 'flythrough copy must be visible without JS');
  assert.match(html, /data-speed-value=""[^>]*>1000<\/text>/, 'static gauge must show final value');
  assert.match(html, /it is not a live speed test/, 'gauge illustration disclosure missing');
  assert.match(html, /<svg[^>]*aria-labelledby="network-map-svg-title network-map-svg-description"/, 'accessible static map missing');
  for (const zone of ['Ikate', 'Lekki', 'Ajah', 'Ilasan', 'Orchid']) {
    assert.match(html, new RegExp(`<text[^>]*>${zone}</text>`), `${zone}: static map label missing`);
  }
  assert.doesNotMatch(html, /real residential tier results|Every node you see on the map is a real lit estate/);
  assert.match(html, /id="coverage-estate"/, 'coverage selector missing');
  assert(raw.includes('hero-mobile.vid'), 'mobile hero video source missing');
}
const support = await fetch(new URL('/support/', base));
assert.equal(support.status, 200, 'support redirect page missing');
assert((await support.text()).includes('/faq'), 'support must redirect to FAQ');
const missing = await fetch(new URL('/missing-design-merge-check/', base));
assert.equal(missing.status, 404, 'unknown routes must remain 404');
console.log(`PASS: ${routes.length} routes, support redirect, 404, static visual fallbacks, coverage selector, careers and WhatsApp.`);
} catch (error) {
  console.error(`FAIL: ${error.message.split('\n')[0]}`);
  process.exitCode = 1;
}
