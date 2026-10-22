// Add plan-name data-labels to the pricing comparison table cells (col index 1..3)
// so the mobile stacked view can label each value. Also drops min-w-[620px]
// and the swipe container's overflow-x-auto (stacking replaces scrolling).
import { readFileSync, writeFileSync } from 'node:fs';

const labels = ['Teacher Plan', 'School Plan', 'Custom Plan'];
let html = readFileSync('pricing.html', 'utf8');
const orig = html;

// un-swipe the card container and the table itself
html = html.replace(
  '<div class="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">',
  '<div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm">'
);
html = html.replace(
  '<table class="w-full min-w-[620px] border-collapse text-left text-sm">',
  '<table class="pricing-table w-full border-collapse text-left text-sm">'
);

// label tds by cell order within each body row (cells 1-3 after the row-header th)
let labeled = 0;
html = html.replace(/<tr[\s\S]*?<\/tr>/g, (tr) => {
  if (!tr.includes('<tbody') && !/<th scope="row"/.test(tr)) return tr; // header row: skip
  let i = -1;
  return tr.replace(/<td /g, (m) => {
    i += 1;
    if (i > 2) return m;
    labeled += 1;
    return `<td data-label="${labels[i]}" `;
  });
});

if (labeled !== 15) throw new Error(`expected 15 tds labeled, got ${labeled}`);
if (html === orig) throw new Error('no changes made');
writeFileSync('pricing.html', html);
console.log(`ok: ${labeled} cells labeled, container + min-w unswiped`);
