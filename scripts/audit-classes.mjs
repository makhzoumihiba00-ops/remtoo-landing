import { readFileSync, readdirSync } from 'node:fs';

const used = new Set();
for (const f of readdirSync('.').filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/class="([^"]+)"/g)) {
    for (const cls of m[1].split(/\s+/)) if (cls) used.add(cls);
  }
}

const css = readFileSync('assets/site.css', 'utf8');
const selectors = new Set();
for (const m of css.matchAll(/\.((?:\\.|[a-zA-Z0-9_-])+)/g)) {
  selectors.add(m[1].replace(/\\(.)/g, '$1'));
}

const custom = new Set(['wrap', 'wrap-wide', 'btn', 'btn-primary', 'btn-ghost', 'testi-no-anim', 'testi-grabbing', 'testi-dot', 'testi-dot-active', 'icon-open', 'icon-close']);
const missing = [...used].filter((c) => !custom.has(c) && !selectors.has(c)).sort();
console.log('used classes:', used.size, '| missing from css:', missing.length);
console.log(missing.join('\n'));
