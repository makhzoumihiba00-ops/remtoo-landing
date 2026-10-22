// One-shot typography pass (2026-10-22):
//  - p/li/label body text: one ladder step up (xs->sm, sm/0.95rem->base, 13px->sm)
//    skipping eyebrow badges (uppercase / tracking-*)
//  - h1-h4: clamp() values x1.1, size classes one step up
//  - muted text contrast: slate-500 -> slate-600, then slate-400 -> slate-500
import { readFileSync, writeFileSync } from 'node:fs';

const pages = ['index.html', 'curriculum.html', 'for-schools.html', 'for-teachers.html',
  'free-sample.html', 'pricing.html', 'whats-included.html'];

const bodyLadder = [
  [/((?:sm|md|lg|xl|2xl|max-\[[0-9]+px\]):)?text-sm\b/g, '$1text-base'],
  [/((?:sm|md|lg|xl|2xl|max-\[[0-9]+px\]):)?text-xs\b/g, '$1text-sm'],
  [/((?:sm|md|lg|xl|2xl|max-\[[0-9]+px\]):)?text-\[13px\]/g, '$1text-sm'],
  [/((?:sm|md|lg|xl|2xl|max-\[[0-9]+px\]):)?text-\[0\.95rem\]/g, '$1text-base'],
];
const headLadder = [
  [/text-5xl\b/g, 'text-6xl'],
  [/text-4xl\b/g, 'text-5xl'],
  [/text-3xl\b/g, 'text-4xl'],
  [/text-2xl\b/g, 'text-3xl'],
  [/text-xl\b/g, 'text-2xl'],
  [/text-lg\b/g, 'text-xl'],
  [/text-\[1\.08rem\]/g, 'text-lg'],
  [/text-\[1\.05rem\]/g, 'text-lg'],
  [/text-\[1\.35rem\]/g, 'text-[1.5rem]'],
  [/text-\[15px\]/g, 'text-base'],
  [/text-\[0\.95rem\]/g, 'text-base'],
  [/text-\[13px\]/g, 'text-[15px]'],
];
const bumpClamp = (s) => s.replace(/clamp\(([^)]*)\)/g, (m, args) =>
  'clamp(' + args.replace(/([0-9]*\.?[0-9]+)(rem|vw|px|%)/g, (_, n, u) =>
    (Math.round(parseFloat(n) * 11) / 10) + u) + ')');

let report = {};
for (const f of pages) {
  let html = readFileSync(f, 'utf8');
  const before = html;

  // opening tags of interest: bump size classes inside the class attribute
  html = html.replace(/<(p|li|label|h1|h2|h3|h4)\b[^>]*>/g, (tag) => {
    const isHeading = /^<(h1|h2|h3|h4)\b/.test(tag);
    let out = tag;
    if (isHeading) {
      for (const [re, rep] of headLadder) out = out.replace(re, rep);
      out = bumpClamp(out);
    } else {
      if (/uppercase|tracking-\[/.test(out)) return tag; // eyebrow/badge chrome
      for (const [re, rep] of bodyLadder) out = out.replace(re, rep);
    }
    return out;
  });

  // muted-contrast: order matters (500->600 first, then 400->500)
  html = html.replaceAll('text-slate-500', 'text-slate-600').replaceAll('text-slate-400', 'text-slate-500');

  if (html !== before) writeFileSync(f, html);
  report[f] = {
    pBase: (html.match(/<p [^>]*text-base/g) || []).length,
    liBase: (html.match(/<li [^>]*text-base/g) || []).length,
    slate600: (html.match(/text-slate-600/g) || []).length,
    slate400: (html.match(/text-slate-400/g) || []).length,
  };
}
console.log(JSON.stringify(report, null, 1));
