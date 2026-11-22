/* Ingredient pictures: every item in the recipes has a photo of the thing as it is sold in the UAE, so whoever
   shops or cooks knows exactly what to pick up. Photos are openly licensed (Open Food Facts product shots of
   UAE packs, Wikimedia Commons for fresh food) and credited on the card. The meal shows them as the cast's
   headshots; tapping one opens what it is and where to find it. */
import { h, add, t, tr, lang } from './core.js';
import { openLayer } from './sheet.js';
import { INGREDIENTS } from './data/ingredients.js';

const norm = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
const BY = new Map();
for (const x of INGREDIENTS) for (const it of x.items) BY.set(norm(it), x);
const KEYS = [...BY.keys()].sort((a, b) => b.length - a.length);

/* The photo record for an ingredient line: exact match first, then the longest known name inside it
   ("Norwegian salmon fillet" finds salmon), so meals he adds get pictures too. */
export function ingInfo(item) {
  const k = norm(item);
  if (!k) return null;
  if (BY.has(k)) return BY.get(k);
  for (const key of KEYS) if (key.length > 2 && new RegExp('(^|[^a-z])' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z]|s\\b|$)').test(k)) return BY.get(key);
  return null;
}
export const STORE_URL = (q) => 'https://www.carrefouruae.com/mafuae/en/search?keyword=' + encodeURIComponent(q);

/* A headshot: the photo on a square of bone paper, so white pack shots and fresh food sit in one frame */
export function headshot(item, cls) {
  const x = ingInfo(item);
  const el = h('span.hsph' + (cls ? '.' + cls : ''));
  if (x) add(el, h('img', { src: x.file, alt: '', loading: 'lazy', decoding: 'async' }));
  else add(el, h('b', { text: (String(item || '?').trim()[0] || '?').toUpperCase() }));
  return el;
}

const what = (x) => (lang() === 'ar' && x.ar) ? x.ar : x.what;

export function openIngredient(item, label, amount, from) {
  const x = ingInfo(item);
  openLayer({ from, cls: 'ingc', label, build: (b) => {
    add(b,
      h('div.ingpic', null, headshot(item, 'big')),
      h('div.inghead', null,
        h('h2', { text: label ? label[0].toUpperCase() + label.slice(1) : '' }),
        amount ? h('span.num', { text: amount }) : null),
      x ? h('p.ingwhat', { text: what(x) }) : h('p.ingwhat', { text: t('No picture yet for this one.') }),
      x && x.product ? h('div.ingprod', null, h('span.lab', { text: x.uae ? t('On UAE shelves') : t('In the picture') }), h('p', { text: x.product })) : null,
      x ? h('div.acts2', null, h('a.go', { href: STORE_URL(x.find || item), target: '_blank', rel: 'noopener', html: '<span>' + t('Find it at Carrefour') + '</span>' })) : null,
      x ? h('p.ingcred', null, t('Photo: {a}, {l}.', { a: x.author, l: x.licence }) + ' ', h('a', { href: x.source, target: '_blank', rel: 'noopener', text: /openfoodfacts/.test(x.source) ? 'Open Food Facts' : 'Wikimedia Commons' })) : null);
  } });
}
