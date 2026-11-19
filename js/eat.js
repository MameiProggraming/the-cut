/* Eat: the meal bank as a gallery of plates, the week's shop, and what to take and skip. */
import { h, add, qs, qsa, t, tr, fmt, mealName, allMeals, mealById, totals, daySlots, WEEK, TARGET, bus, toast, sound, CHECK } from './core.js';
import { shop, today as day, settings } from './store.js';
import { openLayer } from './sheet.js';
import { plate, openMeal, openComposer, CATS, qty } from './meal.js';
import { openScan } from './scan.js';
import { AISLES } from './data/meals.js';
import { SUPPLEMENTS, SLOTS } from './data/program.js';

let root, ctx, cat = 'all';
const CHEVR = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>';
const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>', MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>';

export function mountEat(el, c) {
  root = el; ctx = c;
  bus.on('meals', () => render());
  bus.on('today', () => { const tt = qs('.etot', root); if (tt) tt.replaceWith(totalsEl()); });
  bus.on('lang', render);
  render();
}
export function showEat() { const tt = qs('.etot', root); if (tt) tt.replaceWith(totalsEl()); }

function totalsEl() {
  const { p, left, over } = totals();
  return h('div.etot', null,
    h('div', null, h('span.num', { text: p + ' g' }), h('span.lab', { text: t('protein today, of {n}', { n: TARGET.protein }) })),
    h('div', null, h('span.num', { text: fmt(over || left) }), h('span.lab', { text: over ? t('kcal over') : t('kcal left') })));
}

function render() {
  const meals = allMeals();
  root.innerHTML = '';
  const grid = h('div.mgrid');
  const draw = () => {
    grid.innerHTML = '';
    grid.append(h('button.mtile.new', { type: 'button', onclick: () => openComposer(null) }, h('span.plate', { html: PLUS }), h('span.nm', { text: t('New meal') }), h('span.lab', { text: t('Entered once, kept for good') })));
    allMeals().filter(m => cat === 'all' || m.cat === cat).forEach(m => {
      const b = h('button.mtile', { type: 'button', onclick: () => openMeal(m, b, {}) }, plate(m), h('span.nm', { text: mealName(m) }),
        h('span.mm', null, h('span.num', { text: m.p + ' g' }), h('span.lab', { text: fmt(m.k) + ' kcal' })));
      grid.append(b);
    });
  };
  const seg = h('div.seg', { role: 'tablist', 'aria-label': t('Meal type') }, ...[['all', 'All']].concat(CATS).map(([id, n]) => h('button', { type: 'button', role: 'tab', 'aria-selected': String(id === cat), text: t(n === 'Snack' ? 'Snacks' : n), onclick: (e) => { cat = id; qsa('button', seg).forEach(x => x.setAttribute('aria-selected', String(x === e.currentTarget))); draw(); } })));
  draw();
  const hero = h('header.hero.eat-hero', null,
    h('div.pic', null, h('img', { src: 'art/eat-w0.webp', alt: '' }), h('img', { src: 'art/eat-w1.webp', alt: '' })),
    h('div.grain'),
    h('div.vtop', null, h('span.lab', { text: t('{n} meals', { n: meals.length }) }), h('button.ghost.sm', { type: 'button', text: t('Scan'), onclick: () => openScan((meal) => { openComposer(null, meal); }) })),
    h('div.ht', null, h('h1.vttl', { text: t('The meal bank') }), h('p.vsub', { text: t('Every meal is entered once and kept. Building a day is picking.') }), totalsEl()));
  const shopBand = h('button.band', { type: 'button', onclick: () => openShop() }, h('span', null, h('b', { text: t('The week’s shop') }), h('span.lab', { text: t('Pick the week’s meals. One list in grams, by aisle, and the Sunday prep.') })), h('span', { html: CHEVR }));
  const supp = h('section.sec', null,
    h('h2.sh2', { text: t('Take') }),
    h('div.supp', null, ...SUPPLEMENTS.take.map(x => h('div.si', null, h('b', { text: tr('supp', x.id, 'name', x.name) }), h('span.dose', { text: tr('supp', x.id, 'dose', x.dose) }), h('p', { text: tr('supp', x.id, 'text', x.text) })))),
    h('h2.sh2', { style: { marginTop: 'calc(var(--u)*34)' }, text: t('Skip') }),
    h('div.supp.skip', null, ...SUPPLEMENTS.skip.map(x => h('div.si', null, h('b', { text: tr('supp', x.id, 'name', x.name) }), h('p', { text: tr('supp', x.id, 'text', x.text) })))),
    ...SUPPLEMENTS.notes.map(x => h('div.callout', null, h('b', { text: tr('supp', x.id, 'title', x.title) }), h('p', { text: tr('supp', x.id, 'text', x.text) }))));
  add(root, h('div.vs', null, h('div.vin', null, hero, h('section.sec', { style: { paddingTop: 'calc(var(--u)*14)' } }, seg), grid, shopBand, supp)));
}

/* The week's shop */
function templateCounts() {
  const counts = {};
  WEEK.forEach(w => {
    SLOTS.filter(s => (!s.gymOnly || w.gym) && (!s.tennisOnly || w.tennis) && (!s.noTennisOnly || !w.tennis) && !s.optional).forEach(s => {
      const id = (day.get().picks[s.id]) || s.meal; counts[id] = (counts[id] || 0) + 1;
    });
  });
  return counts;
}
export function openShop() {
  openLayer({ cls: 'shop', label: t('The week’s shop'), build: (b) => {
    const st = shop.get();
    const rows = h('div.shrows'), out = h('div');
    const meals = allMeals();
    const drawRows = () => {
      rows.innerHTML = '';
      CATS.forEach(([c, n]) => {
        const list = meals.filter(m => m.cat === c); if (!list.length) return;
        add(rows, h('h4.lab', { style: { margin: 'calc(var(--u)*18) 0 0', color: 'var(--li)', fontWeight: 600 }, text: t(n === 'Snack' ? 'Snacks' : n) }));
        list.forEach(m => {
          const v = st.counts[m.id] || 0;
          const num = h('span.num', { text: String(v) });
          const stp = h('div.step', { 'data-zero': String(!v) },
            h('button', { type: 'button', 'aria-label': t('One fewer {n}', { n: mealName(m) }), html: MINUS, onclick: () => setC(m.id, -1, num, stp) }), num,
            h('button', { type: 'button', 'aria-label': t('One more {n}', { n: mealName(m) }), html: PLUS, onclick: () => setC(m.id, 1, num, stp) }));
          add(rows, h('div.shr', null, h('span', null, h('span.nm', { text: mealName(m) }), h('span.lab', { text: m.p + ' g · ' + fmt(m.k) + ' kcal' })), stp));
        });
      });
    };
    const setC = (id, d, num, stp) => {
      st.counts[id] = Math.max(0, Math.min(14, (st.counts[id] || 0) + d));
      if (!st.counts[id]) delete st.counts[id];
      shop.save(st); num.textContent = String(st.counts[id] || 0); stp.dataset.zero = String(!st.counts[id]); drawList();
    };
    const drawList = () => {
      out.innerHTML = '';
      const ids = Object.keys(st.counts).filter(id => st.counts[id] > 0 && mealById(id));
      if (!ids.length) { add(out, h('p.empty', { text: t('Nothing picked yet. Add meals above, or start from the template week.') })); return; }
      const lines = {};
      ids.forEach(id => {
        const m = mealById(id), n = st.counts[id];
        const arIng = tr('meals', m.id, 'ing', null);
        (m.ing || []).forEach((i, ix) => {
          if (i.shop === false) return;
          const key = (i.item || '').toLowerCase() + '|' + (i.u || '') + '|' + (i.q == null ? 'x' : '');
          const L = lines[key] = lines[key] || { item: (arIng && arIng[ix]) || i.item, u: i.u || '', q: 0, none: i.q == null, aisle: i.aisle || 'pantry', meals: new Set() };
          if (i.q != null) L.q += i.q * n;
          L.meals.add(mealName(m));
        });
      });
      const byA = {};
      Object.entries(lines).forEach(([k, L]) => { (byA[L.aisle] = byA[L.aisle] || []).push([k, L]); });
      const kcal = ids.reduce((a, id) => a + mealById(id).k * st.counts[id], 0), prot = ids.reduce((a, id) => a + mealById(id).p * st.counts[id], 0), n = ids.reduce((a, id) => a + st.counts[id], 0);
      add(out, h('section.sec', null, h('h2.sh2', { text: t('The list') }), h('p.sdesc', { text: t('{n} meals: {p} g of protein, {k} kcal across the week.', { n, p: fmt(prot), k: fmt(kcal) }) })));
      AISLES.forEach(a => {
        const list = byA[a.id]; if (!list) return;
        add(out, h('div.aisle', null, h('h4', { text: t(a.name) }), ...list.sort((x, y) => x[1].item.localeCompare(y[1].item)).map(([k, L]) => {
          const on = !!st.ticked[k];
          const amount = L.none ? t('to taste') : L.u ? fmt(L.q) + ' ' + L.u : String(Math.round(L.q * 2) / 2).replace('.5', '½');
          return h('button.gl', { type: 'button', 'aria-pressed': String(on), onclick: (e) => { st.ticked[k] = !st.ticked[k]; if (!st.ticked[k]) delete st.ticked[k]; shop.save(st); e.currentTarget.setAttribute('aria-pressed', String(!!st.ticked[k])); } },
            h('b.num', { text: amount }), h('span', { text: L.item }), h('i', { html: CHECK }));
        })));
      });
      const prep = ids.map(id => mealById(id)).filter(m => m.batch && m.batch.text);
      if (prep.length) {
        add(out, h('div.prep', null, h('h3', { text: t('Sunday prep') }), h('ul', null, ...prep.map(m => {
          const n2 = st.counts[m.id], ing = (m.ing || []).find(i => m.batch.item && i.item === m.batch.item && i.q != null);
          const amt = ing ? fmt(ing.q * n2) + ' ' + (ing.u || '') : null;
          return h('li', null, amt ? h('b', { text: amt + ' ' }) : null, h('span', { text: tr('meals', m.id, 'batch', m.batch.text) + (amt ? ' ' + t('({n} × {m})', { n: n2, m: mealName(m) }) : '') }));
        }))));
      }
      add(out, h('div.acts2', { style: { padding: '0 var(--m)' } },
        h('button.ghost', { type: 'button', text: t('Clear'), onclick: () => { st.counts = {}; st.ticked = {}; shop.save(st); drawRows(); drawList(); } }),
        h('button.go', { type: 'button', html: '<span>' + t('Share the list') + '</span>', onclick: () => shareList(byA) })));
    };
    add(b, h('h2.lttl', { text: t('The week’s shop') }), h('p.sdesc', { style: { margin: 'calc(var(--u)*8) var(--m) 0' }, text: t('How many times will you eat each meal this week?') }),
      h('div.acts2', { style: { padding: '0 var(--m)' } }, h('button.ghost', { type: 'button', text: t('Use the template week'), onclick: () => { st.counts = templateCounts(); shop.save(st); drawRows(); drawList(); toast(t('The template week is in. Adjust it to how you will really eat.')); } })),
      rows, out);
    drawRows(); drawList();
  } });
}
async function shareList(byA) {
  const st = shop.get();
  let txt = t('The week’s shop') + '\n';
  AISLES.forEach(a => { const l = byA[a.id]; if (!l) return; txt += '\n' + t(a.name) + '\n'; l.forEach(([k, L]) => { if (st.ticked[k]) return; txt += '- ' + (L.none ? '' : (L.u ? fmt(L.q) + ' ' + L.u + ' ' : L.q + ' ')) + L.item + '\n'; }); });
  try { if (navigator.share) { await navigator.share({ title: t('The week’s shop'), text: txt }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(txt); toast(t('The list is copied.')); } catch (e) { toast(t('Sharing is not available here.')); }
}
