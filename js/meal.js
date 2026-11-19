/* A meal, billed like a film: the picture, the title, the numbers, then the cast (ingredients, grams first)
   and the scenes (steps). Also the picker for building a day and the composer for adding a meal, which is
   paid once, ever, so it is set like part of the product rather than a form. */
import { h, add, $, qs, qsa, t, tr, fmt, esc, mealName, allMeals, mealById, bus, toast, sound, CHECK, daySlots } from './core.js';
import { bank, today as day, photos, compress } from './store.js';
import { openLayer, closeTop } from './sheet.js';
import { exportMeal } from './card.js';
import { openScan } from './scan.js';

export const CATS = [['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['dinner', 'Dinner'], ['snack', 'Snack']];
const catName = (c) => t((CATS.find(x => x[0] === c) || [c, c])[1]);

export function qty(i) {
  if (i.q == null) return '';
  const q = i.q === 0.5 ? '½' : i.q === 0.25 ? '¼' : i.q === 0.75 ? '¾' : String(i.q);
  return i.u ? q + ' ' + i.u : q;
}
export function ingText(m, i, idx) {
  const item = tr('meals', m.id, 'ing', null);
  const it = item && item[idx] ? item[idx] : i.item;
  return it + (i.prep ? ', ' + (tr('prep', i.prep, 'v', i.prep)) : '');
}
export const mealSteps = (m) => tr('meals', m.id, 'steps', m.steps || []);
export const mealTip = (m) => tr('meals', m.id, 'tip', m.tip);

/* His food photo, or the designed placeholder in the same frame */
const urls = {};
export async function foodUrl(id) {
  if (urls[id]) return urls[id];
  const rec = await photos.get('food', id);
  if (rec && rec.blob) { urls[id] = URL.createObjectURL(rec.blob); return urls[id]; }
  return null;
}
export function plate(m, big) {
  const fr = h('span.plate' + (big ? '.big' : ''), null, h('i.dish'), h('i.key'), h('span.grain'));
  if (big) fr.append(h('span.pcap', { text: t('No photo yet. Shoot it the first time you cook it.') }));
  foodUrl(m.id).then(u => { if (u) { fr.classList.add('has'); fr.prepend(h('img', { src: u, alt: mealName(m) })); } });
  return fr;
}
export function pickPhoto(id, done) {
  const inp = h('input', { type: 'file', accept: 'image/*', capture: 'environment', style: { display: 'none' } });
  inp.addEventListener('change', async () => {
    const f = inp.files && inp.files[0]; inp.remove(); if (!f) return;
    try {
      const blob = await compress(f, 1600, .84);
      await photos.put('food', { id, date: new Date().toISOString(), blob });
      if (urls[id]) URL.revokeObjectURL(urls[id]); delete urls[id];
      toast(t('Photo saved.')); bus.emit('meals'); done && done();
    } catch (e) { toast(t('That photo could not be read. Try another.')); }
  });
  document.body.append(inp); inp.click();
}

/* The meal card, grown from wherever it was tapped */
export function openMeal(m, from, o = {}) {
  if (!m) return;
  const slot = o.slot || null;
  openLayer({ from, cls: 'meal', label: mealName(m), bar: [h('button.ghost.sm', { type: 'button', text: t('Export'), onclick: () => exportMeal(m) })], build: (b) => fillMeal(b, m, slot) });
}
function fillMeal(b, m, slot) {
  b.innerHTML = '';
  const st = day.get();
  const pic = h('div.mpic', null, plate(m, true), h('button.ghost.sm.shoot', { type: 'button', text: t('Photo'), onclick: () => pickPhoto(m.id, () => fillMeal(b, mealById(m.id) || m, slot)) }));
  const isEaten = slot ? !!st.eaten[slot.id] : false;
  const main = slot
    ? h('button.go', { type: 'button', 'aria-pressed': String(isEaten), html: CHECK + '<span>' + (isEaten ? t('Eaten') : t('Mark as eaten')) + '</span>', onclick: (e) => {
        let on; day.patch(x => { x.eaten[slot.id] = !x.eaten[slot.id]; on = x.eaten[slot.id]; }); sound('click'); bus.emit('today');
        e.currentTarget.setAttribute('aria-pressed', String(on)); qs('span', e.currentTarget).textContent = on ? t('Eaten') : t('Mark as eaten'); } })
    : h('button.go', { type: 'button', html: CHECK + '<span>' + t('Add to today') + '</span>', onclick: (e) => {
        day.patch(x => { x.extras.push(m.id); }); sound('click'); bus.emit('today'); e.currentTarget.setAttribute('aria-pressed', 'true'); qs('span', e.currentTarget).textContent = t('Added to today'); } });
  const steps = mealSteps(m), tip = mealTip(m);
  add(b, 
    pic,
    h('div.mhead', null,
      h('h2.mttl', { text: mealName(m) }),
      h('div.bill', null,
        h('div.a', null, h('span.num.n', { html: m.p + '<small> g</small>' }), h('span.lab', { text: t('protein') })),
        h('div.b', null, h('span.num.n', { text: fmt(m.k) }), h('span.lab', { text: t('kcal') }))),
      h('div.sub', null,
        h('span', { text: (m.c != null ? m.c + ' g ' + t('carbs') : '') }),
        h('span', { text: (m.f != null ? m.f + ' g ' + t('fat') : '') })),
      m.est ? h('p.estn', { text: t('Carbs and fat are estimates from the listed grams.') }) : null),
    h('div.macts', null, main),
    slot ? swapList(m, slot, b) : null,
    h('div.cols', null,
      h('section.cast', null, h('h3.it', { text: t('Starring') }),
        ...(m.ing || []).map((i, idx, all) => h('div.ci', null, h('b.num', { text: qty(i) }), h('span', null, ingText(m, i, idx), i.for && (!all[idx + 1] || all[idx + 1].for !== i.for) ? h('span.for', { text: t('for the {x}', { x: t(i.for) }) }) : null)))),
      h('section.scenes', null, h('h3.it', { text: t('Scenes') }),
        steps.length ? h('ol', null, ...steps.map((s, n) => h('li', null, h('b.num', { text: String(n + 1) }), h('span', { text: s })))) : h('p.lab', { text: t('No steps yet.') }))),
    tip ? h('p.mtip', { text: tip }) : null,
    m.batch && m.batch.text ? h('div.mbatch', null, h('span.lab', { text: t('Sunday prep') }), h('p', { text: tr('meals', m.id, 'batch', m.batch.text) })) : null,
    h('div.mfoot', null,
      m.builtin ? null : h('button.ghost.sm', { type: 'button', text: t('Edit'), onclick: () => openComposer(m) }),
      m.builtin ? null : h('button.ghost.sm.warn', { type: 'button', text: m.added ? t('Delete') : t('Remove from the bank'), onclick: () => removeMeal(m) }),
      m.edited ? h('button.ghost.sm', { type: 'button', text: t('Restore the original'), onclick: () => { const bb = bank.get(); delete bb.edits[m.id]; bank.save(bb); bus.emit('meals'); closeTop(); toast(t('Original restored.')); } }) : null),
    h('div.endc', null, h('b.it', { text: t('Rashed’s meal bank') })));
}
function swapList(m, slot, b) {
  const cat = slot.cat || m.cat;
  const list = allMeals().filter(x => x.cat === cat && x.id !== m.id);
  if (!list.length) return null;
  return h('section.swap', null,
    h('h3.lab', { text: t('Swap for another {c}', { c: catName(cat).toLowerCase() }) }),
    h('div.swl', null, ...list.map(x => h('button.swi', { type: 'button', onclick: () => {
      day.patch(d => { d.picks[slot.id] = x.id; }); bus.emit('meals'); sound('click');
      const ns = daySlots().find(s => s.id === slot.id); fillMeal(b, x, ns); b.scrollTop = 0;
      toast(t('{a} is now on for {s}.', { a: mealName(x), s: t(slot.label).toLowerCase() }));
    } }, h('span.nm', { text: mealName(x) }), h('span.num', { text: x.p + ' g' }), h('span.lab', { text: fmt(x.k) + ' kcal' })))));
}
function removeMeal(m) {
  const b = bank.get(), snap = JSON.stringify(b);
  if (m.added) b.added = b.added.filter(x => x.id !== m.id); else b.removed.push(m.id);
  bank.save(b); bus.emit('meals'); closeTop();
  toast(t('{n} removed.', { n: mealName(m) }), { label: t('Undo'), run: () => { bank.save(JSON.parse(snap)); bus.emit('meals'); } });
}

/* The picker: building a day is picking meals */
export function pickMeal(o) {
  let cat = o.cat || 'all';
  openLayer({ cls: 'pick', label: o.title || t('Pick a meal'), build: (b) => {
    const list = h('div.plist');
    const seg = h('div.seg', { role: 'tablist' }, ...[['all', 'All']].concat(CATS).map(([id, n]) => h('button', { type: 'button', role: 'tab', 'aria-selected': String(id === cat), text: t(n), onclick: () => { cat = id; qsa('button', seg).forEach(x => x.setAttribute('aria-selected', String(x.textContent === t(n)))); draw(); } })));
    function draw() {
      list.innerHTML = '';
      allMeals().filter(m => cat === 'all' || m.cat === cat).forEach(m => list.append(h('button.pi', { type: 'button', onclick: () => { closeTop(); o.onPick(m); toast(t('{n} added to today.', { n: mealName(m) })); } },
        plate(m), h('span.pn', null, h('span.nm', { text: mealName(m) }), h('span.lab', { text: catName(m.cat) })), h('span.pm', null, h('span.num', { text: m.p + ' g' }), h('span.lab', { text: fmt(m.k) + ' kcal' })))));
    }
    add(b, h('h2.lttl', { text: o.title || t('Pick a meal') }), seg, list);
    draw();
  } });
}

/* The composer: name, cast in grams, scenes, the numbers. kcal follows the macros unless he types it. */
export function openComposer(m, prefill) {
  const editing = !!m;
  const src = m || prefill || { name: '', cat: 'lunch', ing: [{ q: null, u: 'g', item: '' }], steps: [''], p: null, c: null, f: null, k: null };
  const d = JSON.parse(JSON.stringify(src));
  if (!d.ing || !d.ing.length) d.ing = [{ q: null, u: 'g', item: '' }];
  if (!d.steps || !d.steps.length) d.steps = [''];
  let kTouched = d.k != null && editing;
  openLayer({ cls: 'compose', label: editing ? t('Edit meal') : t('New meal'), closeText: t('Cancel'), build: (b) => {
    const err = h('p.err', { role: 'alert' });
    const name = h('textarea.cname', { rows: '1', placeholder: t('Name the meal'), 'aria-label': t('Meal name'), maxlength: '80' });
    name.value = d.name || '';
    const grow = () => { name.style.height = 'auto'; name.style.height = name.scrollHeight + 'px'; };
    name.addEventListener('input', () => { d.name = name.value.replace(/\n/g, ' '); grow(); });
    const cats = h('div.seg.cats', { role: 'radiogroup', 'aria-label': t('Category') }, ...CATS.map(([id, n]) => h('button', { type: 'button', role: 'radio', 'aria-checked': String(d.cat === id), text: t(n), onclick: (e) => { d.cat = id; qsa('button', cats).forEach(x => x.setAttribute('aria-checked', String(x === e.currentTarget))); } })));
    const ingBox = h('div.cing'), stepBox = h('ol.csteps');
    function drawIng() {
      ingBox.innerHTML = '';
      d.ing.forEach((i, n) => {
        const q = h('input.num.cq', { type: 'text', inputmode: 'decimal', placeholder: '0', 'aria-label': t('Amount'), value: i.q == null ? '' : String(i.q) });
        q.addEventListener('input', () => { const v = parseFloat(q.value.replace(',', '.')); i.q = isNaN(v) ? null : v; });
        const u = h('select.cu', { 'aria-label': t('Unit') }, ...[['g', 'g'], ['ml', 'ml'], ['', t('count')]].map(([v, l]) => h('option', { value: v, text: l })));
        u.value = i.u || ''; u.addEventListener('change', () => { i.u = u.value; });
        const it = h('input.ci', { type: 'text', placeholder: t('Ingredient'), 'aria-label': t('Ingredient'), value: i.item || '' });
        it.addEventListener('input', () => { i.item = it.value; });
        const rm = h('button.crm', { type: 'button', 'aria-label': t('Remove ingredient'), html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>', onclick: () => { d.ing.splice(n, 1); if (!d.ing.length) d.ing.push({ q: null, u: 'g', item: '' }); drawIng(); } });
        ingBox.append(h('div.crow', null, q, u, it, rm));
      });
    }
    function drawSteps() {
      stepBox.innerHTML = '';
      d.steps.forEach((s, n) => {
        const ta = h('textarea.cs', { rows: '2', placeholder: n === 0 ? t('First step') : t('Next step'), 'aria-label': t('Step {n}', { n: n + 1 }) });
        ta.value = s; ta.addEventListener('input', () => { d.steps[n] = ta.value; });
        const rm = h('button.crm', { type: 'button', 'aria-label': t('Remove step {n}', { n: n + 1 }), html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>', onclick: () => { d.steps.splice(n, 1); if (!d.steps.length) d.steps.push(''); drawSteps(); } });
        stepBox.append(h('li', null, h('b.num', { text: String(n + 1) }), ta, rm));
      });
    }
    const nums = {};
    const numIn = (key, label, unit) => {
      const inp = h('input.num', { type: 'text', inputmode: 'decimal', placeholder: '0', 'aria-label': label, value: d[key] == null ? '' : String(d[key]) });
      inp.addEventListener('input', () => {
        const v = parseFloat(inp.value.replace(',', '.')); d[key] = isNaN(v) ? null : Math.round(v);
        if (key === 'k') kTouched = inp.value !== '';
        if (key !== 'k' && !kTouched) { const kk = (d.p || 0) * 4 + (d.c || 0) * 4 + (d.f || 0) * 9; d.k = kk ? Math.round(kk) : null; nums.k.value = d.k == null ? '' : String(d.k); }
      });
      nums[key] = inp;
      return h('label.cn' + (key === 'p' ? '.lead' : ''), null, inp, h('span.lab', { text: unit + ' ' + label }));
    };
    drawIng(); drawSteps();
    const save = h('button.go', { type: 'button', html: '<span>' + (editing ? t('Save changes') : t('Save to the bank')) + '</span>', onclick: () => {
      d.name = (d.name || '').trim();
      const missing = [];
      if (!d.name) missing.push(t('a name'));
      if (d.p == null) missing.push(t('protein'));
      if (d.k == null) missing.push(t('calories'));
      if (missing.length) { err.textContent = t('Add {x} to save it.', { x: missing.join(', ') }); err.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
      const clean = { name: d.name, cat: d.cat, p: d.p, k: d.k, c: d.c, f: d.f, est: false,
        ing: d.ing.filter(i => (i.item || '').trim()).map(i => ({ q: i.q, u: i.u || '', item: i.item.trim(), aisle: i.aisle || 'pantry' })),
        steps: d.steps.map(s => s.trim()).filter(Boolean).map(s => /[.!?]$/.test(s) ? s : s + '.'), tip: d.tip || null, batch: d.batch || null, source: d.source || null };
      const bb = bank.get();
      if (editing && m.starter) bb.edits[m.id] = clean;
      else if (editing) bb.added = bb.added.map(x => x.id === m.id ? Object.assign({ id: m.id }, clean) : x);
      else { clean.id = 'u-' + Date.now().toString(36); bb.added.push(clean); }
      bank.save(bb); bus.emit('meals'); sound('click');
      closeTop(); if (editing) closeTop();
      toast(editing ? t('Saved.') : t('{n} is in the bank for good.', { n: clean.name }), editing ? null : { label: t('Add to today'), run: () => { day.patch(x => { x.extras.push(clean.id); }); bus.emit('today'); } });
    } });
    add(b, 
      h('div.chead', null,
        h('span.lab', { text: editing ? t('Edit meal') : t('New meal. Entered once, kept for good.') }),
        name, cats,
        editing ? null : h('button.ghost.sm.scan', { type: 'button', text: t('Scan a packet'), onclick: () => openScan((meal) => { closeTop(); openComposer(null, meal); }) })),
      h('section.cnums', null, h('h3.it', { text: t('The numbers') }), h('div.cgrid', null, numIn('p', t('protein'), 'g'), numIn('c', t('carbs'), 'g'), numIn('f', t('fat'), 'g'), numIn('k', t('kcal'), ''))),
      h('section', null, h('h3.it', { text: t('Starring') }), ingBox, h('button.cadd', { type: 'button', text: t('Add an ingredient'), onclick: () => { d.ing.push({ q: null, u: 'g', item: '' }); drawIng(); qsa('.ci', ingBox).pop().focus(); } })),
      h('section', null, h('h3.it', { text: t('Scenes') }), stepBox, h('button.cadd', { type: 'button', text: t('Add a step'), onclick: () => { d.steps.push(''); drawSteps(); qsa('.cs', stepBox).pop().focus(); } })),
      err,
      h('div.csave', null, save));
    requestAnimationFrame(grow);
  } });
}
