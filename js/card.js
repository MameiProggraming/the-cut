/* Meal export as an image. The card is drawn on the phone: 1080 wide, at least 1920 tall, and a longer recipe
   grows the image rather than shrinking the text. His food photo sits on top once he has shot it. */
import { h, add, t, fmt, mealName, toast } from './core.js';
import { openLayer } from './sheet.js';
import { foodUrl, mealArt, qty, ingText, mealSteps, mealTip, kitAmt } from './meal.js';
import { ingInfo } from './ing.js';
import { KITCHEN, KITCHEN_UI, KITCHEN_BATCH } from './data/kitchen.js';

const W = 1080;
const C = { ground: '#0B0604', mid: '#20120A', bone: '#FAEFE0', dim: '#DCC8B0', light: '#FFC48A', rule: 'rgba(232,200,160,.42)' };
const SERIF = '"Bodoni Moda", Didot, serif', SANS = 'Jost, "Century Gothic", sans-serif';

function loadImg(src) { return new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; }); }
async function fonts() {
  if (!document.fonts) return;
  const want = ['800 120px ' + SERIF, '900 112px ' + SERIF, '700 40px ' + SERIF, 'italic 800 46px ' + SERIF, '500 37px ' + SANS, '400 36px ' + SANS];
  try { await Promise.all(want.map(f => document.fonts.load(f))); } catch (e) {}
}
function wrap(c, text, max) {
  const words = String(text).split(/\s+/), lines = []; let cur = '';
  for (const w of words) { const tryL = cur ? cur + ' ' + w : w; if (c.measureText(tryL).width > max && cur) { lines.push(cur); cur = w; } else cur = tryL; }
  if (cur) lines.push(cur);
  return lines;
}
function serif(c, wgt, size, italic) { c.font = (italic ? 'italic ' : '') + wgt + ' ' + size + 'px ' + SERIF; }
function sans(c, wgt, size) { c.font = wgt + ' ' + size + 'px ' + SANS; }
/* An ingredient photo on bone paper, as on screen: multiply turns a white pack shot's ground into paper */
const PAPER = '#ECE1D0';
function headshotOn(c, img, x, y, size, letter) {
  c.save();
  c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = 26; c.shadowOffsetY = 10;
  c.fillStyle = PAPER; c.fillRect(x, y, size, size);
  c.restore();
  if (img) { c.save(); c.globalCompositeOperation = 'multiply'; c.drawImage(img, x, y, size, size); c.restore(); }
  else if (letter) { c.save(); c.fillStyle = '#8C7A66'; c.textAlign = 'center'; c.font = '900 ' + Math.round(size * .4) + 'px ' + SERIF; c.fillText(letter, x + size / 2, y + size * .64); c.restore(); }
}
async function ingImages(items) { return Promise.all(items.map(it => { const x = ingInfo(it); return x ? loadImg(x.file) : Promise.resolve(null); })); }
/* Bodoni's hairlines need a stroke in the same colour to hold, as on screen */
function heavy(c, text, x, y, sw) { c.fillText(text, x, y); if (sw) { c.lineWidth = sw; c.strokeStyle = c.fillStyle; c.lineJoin = 'round'; c.strokeText(text, x, y); } }

export async function drawCard(m) {
  await fonts();
  const photo = await foodUrl(m.id), art = photo ? null : mealArt(m);
  const pic = await loadImg(photo || art || 'art/card-top.webp');
  const rtl = document.documentElement.dir === 'rtl';
  /* Measure first, on a scratch canvas, so the image can grow */
  const s = document.createElement('canvas').getContext('2d');
  serif(s, 800, 120);
  let tsize = 120, title = wrap(s, mealName(m), 960);
  while ((title.length > 2 || title.some(l => s.measureText(l).width > 960)) && tsize > 84) { tsize -= 6; serif(s, 800, tsize); title = wrap(s, mealName(m), 960); }
  const IG = m.ing || [];
  const COLS = 4, GX = 24, MX = 56, CELL = (W - MX * 2 - GX * (COLS - 1)) / COLS;
  const ing = IG.map((i, n) => { sans(s, 500, 32); const last = !IG[n + 1] || IG[n + 1].for !== i.for; return { q: qty(i) || kitAmt(m, i), lines: wrap(s, ingText(m, i, n), CELL), forL: i.for && last ? t('for the {x}', { x: t(i.for) }) : null, letter: (i.item || '?')[0].toUpperCase() }; });
  const imgs = await ingImages(IG.map(i => i.item));
  const steps = mealSteps(m).map(x => { sans(s, 400, 37); return wrap(s, x, W - MX * 2 - 58); });
  const tip = mealTip(m); sans(s, 500, 38);
  const tipL = tip ? wrap(s, tip, 860) : [];
  const yTitle = 590 + 22, lhT = Math.round(tsize * .98);
  const yBill = yTitle + title.length * lhT + 34;
  const yCols = yBill + 112 + 54 + 46;
  const rows = []; for (let n = 0; n < ing.length; n += COLS) rows.push(ing.slice(n, n + COLS));
  const rowH = (r) => CELL + 58 + Math.max(...r.map(i => i.lines.length)) * 40 + (r.some(i => i.forL) ? 32 : 0) + 34;
  let ly = yCols + 70; for (const r of rows) ly += rowH(r);
  const yScenes = ly + 30;
  let ry = yScenes + 70; for (const st of steps) ry += st.length * 46 + 16;
  const yTip = ry + 40;
  const yEnd = yTip + tipL.length * 47 + 90;
  const H = Math.max(1920, yEnd + 150);

  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, C.ground); g.addColorStop(590 / H, C.ground); g.addColorStop(690 / H, C.mid); g.addColorStop(Math.min(1, 1080 / H), C.ground); g.addColorStop(1, C.ground);
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  if (pic) {
    const ar = pic.naturalWidth / pic.naturalHeight, bw = W, bh = 590; let sw = pic.naturalWidth, sh = sw / (bw / bh), sx = 0, sy = (pic.naturalHeight - sh) * (art ? .5 : .3);
    if (sh > pic.naturalHeight) { sh = pic.naturalHeight; sw = sh * bw / bh; sx = (pic.naturalWidth - sw) / 2; sy = 0; }
    c.drawImage(pic, sx, Math.max(0, sy), sw, sh, 0, 0, bw, bh);
    const fg = c.createLinearGradient(0, 400, 0, 590); fg.addColorStop(0, 'rgba(11,6,4,0)'); fg.addColorStop(1, C.ground);
    if (photo || art) { c.fillStyle = fg; c.fillRect(0, 400, W, 191); }
  }
  c.textBaseline = 'alphabetic'; c.textAlign = 'center';
  c.fillStyle = C.bone; serif(c, 800, tsize);
  title.forEach((l, n) => heavy(c, l, W / 2, yTitle + lhT * .8 + n * lhT, 1.6));
  /* The billing on the axis */
  c.strokeStyle = C.rule; c.lineWidth = 2;
  c.beginPath(); c.moveTo(W / 2, yBill + 10); c.lineTo(W / 2, yBill + 112 + 54); c.stroke();
  const base = yBill + 98;
  c.textAlign = 'right'; c.fillStyle = C.light; serif(c, 900, 112);
  sans(c, 500, 38); const lp = t('protein'), lpw = c.measureText(lp).width;
  c.fillStyle = C.bone; c.fillText(lp, W / 2 - 34, base);
  serif(c, 900, 62); const gw = c.measureText(' g').width; c.fillStyle = C.light; heavy(c, ' g', W / 2 - 34 - lpw - 18, base, 0);
  serif(c, 900, 112); heavy(c, String(m.p), W / 2 - 34 - lpw - 18 - gw, base, 1.4);
  c.textAlign = 'left'; heavy(c, fmt(m.k), W / 2 + 34, base, 1.4);
  const kw = c.measureText(fmt(m.k)).width; sans(c, 500, 38); c.fillStyle = C.bone; c.fillText(t('kcal'), W / 2 + 34 + kw + 18, base);
  sans(c, 500, 37); c.fillStyle = C.dim;
  const catL = t({ breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack' }[m.cat] || 'Meal');
  const macro = (m.c != null && m.f != null) ? m.c + ' g ' + t('carbs') + ', ' + m.f + ' g ' + t('fat') : '';
  c.textAlign = 'right'; c.fillText(catL, W / 2 - 34, base + 54); c.textAlign = 'left'; c.fillText(macro, W / 2 + 34, base + 54);
  /* The cast as headshots, grams first, then the scenes */
  const rtlX = (x, w) => rtl ? W - x - (w || 0) : x;
  c.fillStyle = C.light; serif(c, 800, 46, true); c.textAlign = rtl ? 'right' : 'left';
  c.fillText(t('Starring'), rtlX(MX), yCols + 46);
  let y = yCols + 70, k = 0;
  for (const r of rows) {
    r.forEach((i, n) => {
      const x = rtlX(MX + n * (CELL + GX), CELL), img = imgs[k++];
      headshotOn(c, img, x, y, CELL, i.letter);
      const tx = rtl ? x + CELL : x;
      c.textAlign = rtl ? 'right' : 'left';
      if (i.q) { c.fillStyle = C.light; serif(c, 800, 40); heavy(c, i.q, tx, y + CELL + 50, 1.1); }
      c.fillStyle = C.bone; sans(c, 500, 32);
      i.lines.forEach((l, j) => c.fillText(l, tx, y + CELL + 50 + 40 + j * 40));
      if (i.forL) { sans(c, 400, 27); c.fillStyle = C.dim; c.fillText(i.forL, tx, y + CELL + 50 + 40 + i.lines.length * 40); }
    });
    y += rowH(r);
  }
  c.fillStyle = C.light; serif(c, 800, 46, true); c.textAlign = rtl ? 'right' : 'left';
  c.fillText(t('Scenes'), rtlX(MX), yScenes + 46);
  y = yScenes + 70 + 34;
  steps.forEach((st, n) => {
    c.fillStyle = C.light; serif(c, 700, 42); c.textAlign = rtl ? 'right' : 'left'; heavy(c, String(n + 1), rtlX(MX), y, 1.1);
    c.fillStyle = C.bone; sans(c, 400, 37);
    st.forEach((l, j) => c.fillText(l, rtl ? W - MX - 58 : MX + 58, y + j * 46));
    y += st.length * 46 + 16;
  });
  c.textAlign = 'center'; c.fillStyle = C.bone; sans(c, 500, 38);
  tipL.forEach((l, n) => c.fillText(l, W / 2, yTip + 38 + n * 47));
  const ye = H - 62;
  c.strokeStyle = C.rule; c.beginPath(); c.moveTo(W / 2, ye - 84); c.lineTo(W / 2, ye - 50); c.stroke();
  c.fillStyle = C.light; serif(c, 800, 50, true); c.fillText(t('Rashed’s meal bank'), W / 2, ye);
  return cv;
}

export async function shareCanvas(cv, fileName, title) {
  const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
  if (!blob) { toast(t('The image could not be made.')); return; }
  const file = new File([blob], fileName, { type: 'image/png' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title }); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  const a = h('a', { href: URL.createObjectURL(blob), download: fileName });
  document.body.append(a); a.click(); a.remove();
  toast(t('Saved to your downloads.'));
}

export async function exportMeal(m) {
  let cv = null;
  const fileName = (m.name || 'meal').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.png';
  openLayer({ cls: 'export', label: t('Export {n} as an image', { n: mealName(m) }),
    bar: [h('button.go.sm', { type: 'button', text: t('Share'), onclick: () => cv && shareCanvas(cv, fileName, mealName(m)) })],
    build: async (b) => {
      const holder = h('div.exsheet', null, h('p.lab.exwait', { text: t('Setting the card…') }));
      add(b, holder);
      cv = await drawCard(m);
      const url = cv.toDataURL('image/jpeg', .9);
      holder.innerHTML = '';
      add(holder, h('img', { src: url, alt: t('{n}: {p} g protein, {k} kcal, with ingredients and steps', { n: mealName(m), p: m.p, k: fmt(m.k) }) }));
    } });
}

/* ---------- For the kitchen ----------
   The recipe as the helpers cook it: every ingredient weighed in grams with its photo, every step spelled out,
   in Bahasa Indonesia (English beside it so Rashed can check what was sent). One column, large type, for a
   phone propped up in the kitchen. Also as plain text for WhatsApp. */
const KFALL = {
  id: { untranslated: 'Resep ini belum diterjemahkan. Langkahnya dalam bahasa Inggris.' },
  en: { untranslated: 'This recipe was added in the app, so it has no translation yet.' }
};
const KL = (lng, key, fb) => (KITCHEN_UI[lng] && KITCHEN_UI[lng][key]) || (KITCHEN_UI.en && KITCHEN_UI.en[key]) || (KFALL[lng] && KFALL[lng][key]) || fb;
const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (_, k) => v[k] != null ? v[k] : '');
const frac = (q) => q === 0.5 ? '½' : q === 0.25 ? '¼' : q === 0.75 ? '¾' : q === 1.5 ? '1½' : String(q);

/* The kitchen version of a meal, or one built from the meal itself when he added it in the app */
export const hasBatch = (m) => !!KITCHEN_BATCH[m.id];
function timeText(lng, n) { return n >= 60 ? fill(KL(lng, 'hoursMinutes', '{h} h {m} min'), { h: Math.floor(n / 60), m: n % 60 }) : fill(KL(lng, 'minutes', '{n} minutes'), { n }); }
export function kitchenOf(m, lng, part) {
  const K = KITCHEN[m.id], pick = (x) => x ? (x[lng] || x.en || '') : '';
  const ingOf = (list) => list.map(i => ({ item: i.item, q: i.q, u: i.u, text: pick(i), extra: !!i.extra }));
  if (part === 'batch' && KITCHEN_BATCH[m.id]) {
    const B = KITCHEN_BATCH[m.id], nm = K && K.name ? pick(K.name) : m.name;
    const meta = [fill(KL(lng, 'makes', 'Makes {n} portions'), { n: B.portions }), B.when ? pick(B.when) : null,
      B.fridgeDays ? fill(KL(lng, 'fridgeDays', 'Keeps {n} days in the fridge'), { n: B.fridgeDays }) : null,
      B.freezerMonths ? fill(KL(lng, 'freezerMonths', 'Keeps {n} months in the freezer'), { n: B.freezerMonths }) : null];
    return { kind: 'batch', name: nm, sub: KL(lng, 'batch', 'Batch for the week') + (B.optional ? ' · ' + KL(lng, 'optional', 'Optional') : ''), en: m.name, meta,
      ing: ingOf(B.ing || []), steps: (B.steps || []).map(pick), notes: (B.notes || []).map(pick), own: true };
  }
  if (K) return {
    kind: 'meal', name: K.name ? pick(K.name) : m.name, en: m.name, own: true,
    meta: [fill(KL(lng, 'serves', 'Serves {n}'), { n: K.serves || 1 }), K.time ? timeText(lng, K.time) + (K.wait ? ' · ' + pick(K.wait) : '') : null, fill(KL(lng, 'proteinG', '{n} g protein'), { n: m.p }), fill(KL(lng, 'kcalN', '{n} kcal'), { n: fmt(m.k) })],
    ing: ingOf(K.ing), steps: K.steps.map(pick), notes: (K.notes || []).map(pick)
  };
  return { kind: 'meal', name: m.name, en: m.name, own: false,
    meta: [fill(KL(lng, 'serves', 'Serves {n}'), { n: 1 }), m.mins ? timeText(lng, m.mins) : null, fill(KL(lng, 'proteinG', '{n} g protein'), { n: m.p }), fill(KL(lng, 'kcalN', '{n} kcal'), { n: fmt(m.k) })],
    ing: (m.ing || []).map(i => ({ item: i.item, q: i.q, u: i.u, text: i.item + (i.prep ? ', ' + i.prep : '') })),
    steps: m.steps || [], notes: [KL(lng, 'untranslated', '')] };
}
/* The house rules that go under every recipe */
const RULES = ['scale', 'oil', 'noExtras', 'ask'];
function amount(i, lng) {
  if (i.q == null) return KL(lng, 'toTaste', lng === 'id' ? 'secukupnya' : 'to taste');
  return i.u ? frac(i.q) + ' ' + i.u : frac(i.q);
}

export async function drawKitchen(m, lng, part) {
  await fonts();
  const k = kitchenOf(m, lng, part);
  const photo = await foodUrl(m.id), art = photo ? null : mealArt(m);
  const pic = await loadImg(photo || art || 'art/card-top.webp');
  const main = k.ing.filter(i => !i.extra), extras = k.ing.filter(i => i.extra);
  const imgs = await ingImages(main.map(i => i.item));
  const MX = 64, TH = 156, TX = MX + TH + 30, TW = W - TX - MX;
  const s = document.createElement('canvas').getContext('2d');
  serif(s, 800, 100);
  let ts = 100, title = wrap(s, k.name, 940);
  while ((title.length > 2 || title.some(l => s.measureText(l).width > 940)) && ts > 66) { ts -= 6; serif(s, 800, ts); title = wrap(s, k.name, 940); }
  sans(s, 500, 33);
  const meta = [k.meta.slice(0, 2), k.meta.slice(2)].map(g => g.filter(Boolean).join('  ·  ')).filter(Boolean).flatMap(x => wrap(s, x, 940));
  sans(s, 500, 37);
  const rows = main.map(i => ({ amt: amount(i, lng), lines: wrap(s, i.text, TW), letter: (i.item || '?')[0].toUpperCase() }));
  sans(s, 500, 34);
  const xrows = extras.map(i => ({ amt: amount(i, lng), lines: wrap(s, i.text, W - MX * 2 - 230) }));
  sans(s, 400, 39);
  const steps = k.steps.map(x => wrap(s, x, W - MX * 2 - 64));
  sans(s, 400, 35);
  const notes = k.notes.filter(Boolean).map(x => wrap(s, x, W - MX * 2 - 40));
  sans(s, 400, 32);
  const rules = RULES.map(r => wrap(s, KL(lng, r, ''), W - MX * 2)).filter(x => x.length && x[0]);
  /* Heights */
  const yT = 430, sub = k.kind === 'batch' ? k.sub : (lng !== 'en' ? k.en : null);
  const brk = [];
  let y = yT + title.length * Math.round(ts * 1.02) + (sub ? 56 : 0) + meta.length * 44 + 30;
  const yIng = y + 40;
  brk.push(yIng - 24);
  y = yIng + 74;
  for (const r of rows) { brk.push(y - 22); y += Math.max(TH, 60 + r.lines.length * 46) + 30; }
  const yX = y + 6;
  if (xrows.length) { brk.push(yX - 4); y = yX + 56; for (const r of xrows) y += r.lines.length * 44 + 12; y += 10; }
  const ySteps = y + 30;
  brk.push(ySteps - 4);
  y = ySteps + 80;
  for (const st of steps) { brk.push(y - 6); y += st.length * 52 + 26; }
  const yNotes = y + 16;
  if (notes.length) { brk.push(yNotes - 4); y = yNotes + 74; for (const n of notes) { brk.push(y - 6); y += n.length * 46 + 16; } }
  const yRules = y + 30;
  brk.push(yRules - 12);
  y = yRules + 40; for (const r of rules) y += r.length * 42 + 12;
  const H = Math.max(1920, y + 170);

  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d');
  c.fillStyle = C.ground; c.fillRect(0, 0, W, H);
  if (pic) {
    const bh = 420; let sw = pic.naturalWidth, sh = sw / (W / bh), sx = 0, sy = (pic.naturalHeight - sh) * (art ? .5 : .35);
    if (sh > pic.naturalHeight) { sh = pic.naturalHeight; sw = sh * W / bh; sx = (pic.naturalWidth - sw) / 2; sy = 0; }
    c.drawImage(pic, sx, Math.max(0, sy), sw, sh, 0, 0, W, bh);
    const fg = c.createLinearGradient(0, 230, 0, 421); fg.addColorStop(0, 'rgba(11,6,4,0)'); fg.addColorStop(1, C.ground);
    c.fillStyle = fg; c.fillRect(0, 230, W, 191);
  }
  c.textBaseline = 'alphabetic'; c.textAlign = 'center';
  c.fillStyle = C.bone; serif(c, 800, ts);
  const lh = Math.round(ts * 1.02);
  title.forEach((l, n) => heavy(c, l, W / 2, yT + lh * .82 + n * lh, 1.6));
  y = yT + title.length * lh;
  if (sub) { c.fillStyle = k.kind === 'batch' ? C.light : C.dim; serif(c, 700, 38, true); c.fillText(sub, W / 2, y + 44); y += 56; }
  c.fillStyle = k.kind === 'batch' ? C.bone : C.light; sans(c, 500, 33); meta.forEach((l, j) => c.fillText(l, W / 2, y + 48 + j * 44));
  c.strokeStyle = C.rule; c.lineWidth = 2; c.beginPath(); c.moveTo(W / 2 - 60, yIng - 4); c.lineTo(W / 2 + 60, yIng - 4); c.stroke();
  /* Ingredients: photo, amount, what it is */
  c.textAlign = 'left'; c.fillStyle = C.light; serif(c, 800, 52, true); c.fillText(KL(lng, 'ingredients', 'Ingredients'), MX, yIng + 50);
  y = yIng + 74;
  rows.forEach((r, n) => {
    headshotOn(c, imgs[n], MX, y, TH, r.letter);
    c.fillStyle = C.light; serif(c, 800, 46); heavy(c, r.amt, TX, y + 44, 1.2);
    c.fillStyle = C.bone; sans(c, 500, 37);
    r.lines.forEach((l, j) => c.fillText(l, TX, y + 44 + 50 + j * 46));
    y += Math.max(TH, 60 + r.lines.length * 46) + 30;
  });
  if (xrows.length) {
    c.fillStyle = C.dim; sans(c, 600, 28); c.fillText(KL(lng, 'alsoNeeded', 'Also needed').toUpperCase(), MX, yX + 30);
    y = yX + 56 + 34;
    xrows.forEach(r => { c.fillStyle = C.light; serif(c, 800, 36); heavy(c, r.amt, MX, y, 1); c.fillStyle = C.bone; sans(c, 500, 34); r.lines.forEach((l, j) => c.fillText(l, MX + 230, y + j * 44)); y += r.lines.length * 44 + 12; });
  }
  /* Method */
  c.fillStyle = C.light; serif(c, 800, 52, true); c.fillText(KL(lng, 'method', 'Method'), MX, ySteps + 50);
  y = ySteps + 80 + 38;
  steps.forEach((st, n) => {
    c.fillStyle = C.light; serif(c, 800, 46); heavy(c, String(n + 1), MX, y + 2, 1.2);
    c.fillStyle = C.bone; sans(c, 400, 39);
    st.forEach((l, j) => c.fillText(l, MX + 64, y + j * 52));
    y += st.length * 52 + 26;
  });
  if (notes.length) {
    c.fillStyle = C.light; serif(c, 800, 52, true); c.fillText(KL(lng, 'notes', 'Notes'), MX, yNotes + 50);
    y = yNotes + 74 + 34;
    c.fillStyle = C.bone; sans(c, 400, 35);
    notes.forEach(nl => { c.fillStyle = C.light; c.fillRect(MX, y - 13, 16, 3); c.fillStyle = C.bone; nl.forEach((l, j) => c.fillText(l, MX + 40, y + j * 46)); y += nl.length * 46 + 16; });
  }
  /* The house rules, quiet, before the sign-off */
  c.strokeStyle = C.rule; c.lineWidth = 2; c.beginPath(); c.moveTo(MX, yRules); c.lineTo(W - MX, yRules); c.stroke();
  y = yRules + 40 + 30; c.textAlign = 'left'; c.fillStyle = C.dim; sans(c, 400, 32);
  rules.forEach(r => { r.forEach((l, j) => c.fillText(l, MX, y + j * 42)); y += r.length * 42 + 12; });
  c.textAlign = 'center';
  const ye = H - 70;
  c.strokeStyle = C.rule; c.beginPath(); c.moveTo(W / 2, ye - 62); c.lineTo(W / 2, ye - 34); c.stroke();
  c.fillStyle = C.light; serif(c, 800, 46, true); c.fillText(t('Rashed’s meal bank'), W / 2, ye + 6);
  return { cv, pages: paginate(cv, brk, k.name) };
}
/* WhatsApp shrinks a very tall picture until the text cannot be read, so a long recipe is cut into phone-sized
   pages (1080 x 1920) between ingredients and steps, never through one. Each page after the first carries the
   recipe's name and its page number. */
function paginate(cv, brk, name) {
  const PH = 1920, HEAD = 150, FOOT = 100, H = cv.height;
  if (H <= PH) return [cv];
  const cuts = []; let st = 0, first = true;
  while (st < H) {
    const room = PH - (first ? 0 : HEAD) - FOOT;
    if (H - st <= room + FOOT) { cuts.push([st, H]); break; }
    const ok = brk.filter(b => b > st + 200 && b <= st + room);
    const end = ok.length ? ok[ok.length - 1] : st + room;
    cuts.push([st, end]); st = end; first = false;
  }
  return cuts.map(([a, b], n) => {
    const pg = document.createElement('canvas'); pg.width = W; pg.height = PH;
    const c = pg.getContext('2d');
    c.fillStyle = C.ground; c.fillRect(0, 0, W, PH);
    const top = n ? HEAD : 0;
    c.drawImage(cv, 0, a, W, b - a, 0, top, W, b - a);
    c.textBaseline = 'alphabetic';
    const num = (n + 1) + ' / ' + cuts.length;
    if (n) {
      c.textAlign = 'left'; c.fillStyle = C.light; serif(c, 800, 40, true);
      let nm = name; while (c.measureText(nm).width > 760 && nm.length > 4) nm = nm.slice(0, -2);
      c.fillText(nm === name ? nm : nm.trim() + '…', 64, 92);
      c.textAlign = 'right'; c.fillStyle = C.dim; sans(c, 500, 32); c.fillText(num, W - 64, 92);
      c.strokeStyle = C.rule; c.lineWidth = 2; c.beginPath(); c.moveTo(64, 124); c.lineTo(W - 64, 124); c.stroke();
    }
    if (n < cuts.length - 1) { c.textAlign = 'right'; c.fillStyle = C.dim; sans(c, 500, 32); c.fillText(num + '  →', W - 64, PH - 46); }
    return pg;
  });
}
export async function sharePages(list, base, title) {
  const blobs = await Promise.all(list.map(cv => new Promise(r => cv.toBlob(r, 'image/png'))));
  if (blobs.some(b => !b)) { toast(t('The image could not be made.')); return; }
  const files = blobs.map((b, n) => new File([b], base + (list.length > 1 ? '-' + (n + 1) : '') + '.png', { type: 'image/png' }));
  try { if (navigator.canShare && navigator.canShare({ files })) { await navigator.share({ files, title }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  files.forEach(f => { const a = h('a', { href: URL.createObjectURL(f), download: f.name }); document.body.append(a); a.click(); a.remove(); });
  toast(t('Saved to your downloads.'));
}

/* The same recipe as WhatsApp text: bold headings, one line per ingredient, numbered steps */
export function kitchenText(m, lng, part) {
  const k = kitchenOf(m, lng, part), out = [];
  out.push(KL(lng, 'greeting', ''), '');
  out.push('*' + k.name + '*');
  if (k.kind === 'batch') out.push('_' + k.sub + '_'); else if (lng !== 'en') out.push('_' + k.en + '_');
  out.push(k.meta.filter(Boolean).join(' · '));
  out.push('', '*' + KL(lng, 'ingredients', 'Ingredients') + '*');
  k.ing.filter(i => !i.extra).forEach(i => out.push('• ' + amount(i, lng) + ' – ' + i.text));
  const ex = k.ing.filter(i => i.extra);
  if (ex.length) { out.push('_' + KL(lng, 'alsoNeeded', 'Also needed') + '_'); ex.forEach(i => out.push('• ' + amount(i, lng) + ' – ' + i.text)); }
  out.push('', '*' + KL(lng, 'method', 'Method') + '*');
  k.steps.forEach((x, n) => out.push((n + 1) + '. ' + x));
  const notes = k.notes.filter(Boolean);
  if (notes.length) { out.push('', '*' + KL(lng, 'notes', 'Notes') + '*'); notes.forEach(x => out.push('- ' + x)); }
  out.push('');
  RULES.forEach(r => { const x = KL(lng, r, ''); if (x) out.push(x); });
  const bye = KL(lng, 'thanks', ''); if (bye) out.push('', bye);
  return out.join('\n');
}

export function exportKitchen(m, from) {
  let lng = 'id', part = 'meal', pages = null, token = 0;
  const file = () => (m.name || 'meal').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + (part === 'batch' ? '-batch' : '') + (lng === 'id' ? '-dapur' : '-kitchen');
  const sharePics = () => pages && sharePages(pages, file(), kitchenOf(m, lng, part).name);
  const shareText = async () => {
    const txt = kitchenText(m, lng, part);
    try { if (navigator.share) { await navigator.share({ text: txt }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(txt); toast(t('The recipe is copied. Paste it into WhatsApp.')); } catch (e) { toast(t('Sharing is not available here.')); }
  };
  openLayer({ from, cls: 'export.kitchen', label: t('Send {n} to the kitchen', { n: mealName(m) }),
    bar: [h('button.go.sm', { type: 'button', text: t('Share'), onclick: sharePics })],
    build: (b) => {
      const holder = h('div.exsheet');
      const seg = h('div.seg.kseg', { role: 'tablist', 'aria-label': t('Language of the recipe') },
        ...[['id', 'Bahasa Indonesia'], ['en', t('English, to check')]].map(([v, l]) => h('button', { type: 'button', role: 'tab', 'aria-selected': String(v === lng), text: l, onclick: (e) => { lng = v; [...seg.children].forEach(x => x.setAttribute('aria-selected', String(x === e.currentTarget))); draw(); } })));
      const pseg = hasBatch(m) ? h('div.seg.kseg.kpart', { role: 'tablist', 'aria-label': t('Which recipe') },
        ...[['meal', t('This meal')], ['batch', t('Batch for the week')]].map(([v, l]) => h('button', { type: 'button', role: 'tab', 'aria-selected': String(v === part), text: l, onclick: (e) => { part = v; [...pseg.children].forEach(x => x.setAttribute('aria-selected', String(x === e.currentTarget))); draw(); } }))) : null;
      const acts = h('div.acts2.kacts', null,
        h('button.go', { type: 'button', html: '<span>' + t('Share pictures') + '</span>', onclick: sharePics }),
        h('button.ghost', { type: 'button', text: t('As text'), onclick: shareText }));
      const note = KITCHEN[m.id] ? null : h('p.lab.knote', { text: t('Meals you add yourself go out with your own English steps.') });
      add(b, h('div.khead', null, h('h2', { text: t('For the kitchen') }), h('p.sdesc', { text: t('Every ingredient in grams with its photo, and every step, ready to send to whoever is cooking.') })), seg, pseg, note, holder, acts);
      async function draw() {
        const my = ++token;
        holder.innerHTML = ''; add(holder, h('p.lab.exwait', { text: t('Setting the card…') }));
        const r = await drawKitchen(m, lng, part);
        if (my !== token) return;
        pages = r.pages; holder.innerHTML = '';
        const nm = kitchenOf(m, lng, part).name;
        pages.forEach((pg, n) => add(holder, h('img', { src: pg.toDataURL('image/jpeg', .88), alt: pages.length > 1 ? t('{n}, page {i} of {of}', { n: nm, i: n + 1, of: pages.length }) : nm })));
      }
      draw();
    } });
}
