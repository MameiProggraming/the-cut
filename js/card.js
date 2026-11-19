/* Meal export as an image. The card is drawn on the phone: 1080 wide, at least 1920 tall, and a longer recipe
   grows the image rather than shrinking the text. His food photo sits on top once he has shot it. */
import { h, add, t, fmt, mealName, toast } from './core.js';
import { openLayer } from './sheet.js';
import { foodUrl, qty, ingText, mealSteps, mealTip } from './meal.js';

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
/* Bodoni's hairlines need a stroke in the same colour to hold, as on screen */
function heavy(c, text, x, y, sw) { c.fillText(text, x, y); if (sw) { c.lineWidth = sw; c.strokeStyle = c.fillStyle; c.lineJoin = 'round'; c.strokeText(text, x, y); } }

export async function drawCard(m) {
  await fonts();
  const photo = await foodUrl(m.id);
  const pic = await loadImg(photo || 'art/card-top.webp');
  const rtl = document.documentElement.dir === 'rtl';
  /* Measure first, on a scratch canvas, so the image can grow */
  const s = document.createElement('canvas').getContext('2d');
  serif(s, 800, 120);
  let tsize = 120, title = wrap(s, mealName(m), 960);
  while ((title.length > 2 || title.some(l => s.measureText(l).width > 960)) && tsize > 84) { tsize -= 6; serif(s, 800, tsize); title = wrap(s, mealName(m), 960); }
  const IG = m.ing || [];
  const ing = IG.map((i, n) => { sans(s, 500, 37); const last = !IG[n + 1] || IG[n + 1].for !== i.for; return { q: qty(i), lines: wrap(s, ingText(m, i, n), 318), forL: i.for && last ? t('for the {x}', { x: t(i.for) }) : null }; });
  const steps = mealSteps(m).map(x => { sans(s, 400, 36); return wrap(s, x, 412); });
  const tip = mealTip(m); sans(s, 500, 38);
  const tipL = tip ? wrap(s, tip, 860) : [];
  const yTitle = 590 + 22, lhT = Math.round(tsize * .98);
  const yBill = yTitle + title.length * lhT + 34;
  const yCols = yBill + 112 + 54 + 46;
  let ly = yCols + 64; for (const i of ing) ly += i.lines.length * 46 + (i.forL ? 34 : 0) + 6;
  let ry = yCols + 64; for (const st of steps) ry += st.length * 43 + 13;
  const yTip = Math.max(ly, ry) + 40;
  const yEnd = yTip + tipL.length * 47 + 90;
  const H = Math.max(1920, yEnd + 150);

  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, C.ground); g.addColorStop(590 / H, C.ground); g.addColorStop(690 / H, C.mid); g.addColorStop(Math.min(1, 1080 / H), C.ground); g.addColorStop(1, C.ground);
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  if (pic) {
    const ar = pic.naturalWidth / pic.naturalHeight, bw = W, bh = 590; let sw = pic.naturalWidth, sh = sw / (bw / bh), sx = 0, sy = (pic.naturalHeight - sh) * .3;
    if (sh > pic.naturalHeight) { sh = pic.naturalHeight; sw = sh * bw / bh; sx = (pic.naturalWidth - sw) / 2; sy = 0; }
    c.drawImage(pic, sx, Math.max(0, sy), sw, sh, 0, 0, bw, bh);
    const fg = c.createLinearGradient(0, 400, 0, 590); fg.addColorStop(0, 'rgba(11,6,4,0)'); fg.addColorStop(1, C.ground);
    if (photo) { c.fillStyle = fg; c.fillRect(0, 400, W, 191); }
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
  /* The cast and the scenes either side of the axis */
  c.strokeStyle = C.rule; c.beginPath(); c.moveTo(W / 2, yCols); c.lineTo(W / 2, Math.max(ly, ry) - 6); c.stroke();
  c.fillStyle = C.light; serif(c, 800, 46, true); c.textAlign = 'left';
  c.fillText(t('Starring'), 56, yCols + 46); c.fillText(t('Scenes'), 574, yCols + 46);
  let y = yCols + 64 + 36;
  for (const i of ing) {
    c.textAlign = 'right'; c.fillStyle = C.bone; serif(c, 800, 39); heavy(c, i.q, 172, y, 1.1);
    c.textAlign = 'left'; sans(c, 500, 37);
    i.lines.forEach((l, n) => c.fillText(l, 190, y + n * 46));
    y += (i.lines.length - 1) * 46;
    if (i.forL) { sans(c, 400, 30); c.fillStyle = C.dim; c.fillText(i.forL, 190, y + 34); y += 34; }
    y += 46 + 6;
  }
  y = yCols + 64 + 34;
  steps.forEach((st, n) => {
    c.fillStyle = C.light; serif(c, 700, 40); c.textAlign = 'left'; heavy(c, String(n + 1), 574, y, 1.1);
    c.fillStyle = C.bone; sans(c, 400, 36);
    st.forEach((l, k) => c.fillText(l, 614, y + k * 43));
    y += st.length * 43 + 13;
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
