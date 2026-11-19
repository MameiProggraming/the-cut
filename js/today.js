/* Today. The day is a film in three scenes and protein is the light: each part of the day is a one-sheet,
   eating opens the exposure, and the day below is a credit roll on one centre axis. Scrolling closes the
   frame down to a pinned 2.39:1 strip. Saturday's scene is the intermission. */
import { h, $, qs, qsa, clamp, lerp, reduce, fmt, t, tr, mealName, dayName, dayShort, monShort, weekNo, dow, sessionFor,
  daySlots, totals, suggest, hm, nowMin, minToHm, WEEK, TARGET, CHECK, CHEV, setNum, setNumRaw, bus, mealById, exName, ex, sound } from './core.js';
import { today as day, settings, flags, ymd } from './store.js';

const LAYOUT = 1040, K0 = .6;
/* The camera. Every shot is an anchor point in source pixels, where it lands on screen, a scale and a roll.
   rest: the one-sheet. pin: the pinned CinemaScope strip. wide: the cut-in. */
const CAM = {
  gym: { wide: [0, -240, 2576, 1447], plate: [620, -100, 1960, 1400], rest: { a: [1285, -14], x: .5, y: 120, k: .31, r: 0 }, pin: { a: [1285, 250], y: .36, k: .22, r: 0 }, centre: [1288, 723] },
  eat: { wide: [120, -200, 1560, 700], plate: [330, -40, 1240, 660], rest: { a: [812, 250], x: .5, y: 184, k: .72, r: 0 }, pin: { a: [800, 240], y: .33, k: .29, r: 0 }, centre: [840, 300] },
  tennis: { wide: [0, -300, 2576, 1447], plate: [760, -260, 2520, 1140], rest: { a: [1270, 226], x: .131, y: 222, k: .285, r: -14, fillW: .97 }, pin: { a: [1560, 500], y: .33, k: .235, r: 0 }, centre: [1288, 723] },
  rest: { wide: [0, 0, 1300, 1700], plate: null, rest: { a: [650, 560], x: .5, y: 330, k: .62, r: 0 }, pin: { a: [650, 760], y: .5, k: .42, r: 0 }, centre: [650, 760] }
};
/* The wide screen (from 900 px): the same lenses on a landscape frame. The picture is the window left of the
   credit roll. x is a share of that picture's width, y a share of its height, k is at a 900 px tall window.
   Gym is set between the title and the numbers in measureFloor; the intermission covers the frame. */
const DESK = '(min-width:900px)';
const DCAM = {
  gym: { a: [1285, -14], x: .5 },
  eat: { a: [900, 205], x: .63, y: .34, k: 1 },
  tennis: { a: [1290, 600], x: .5, y: .53, k: .44, r: -14 },
  rest: { a: [650, 850], x: .5, y: .5 }
};

let root, phone, scroller, proj, front, pinbar, spill, S = {}, scenes = [], mode = 'eat';
let W = 0, PH = 0, H1 = 0, B1 = 0, U = 1, ST = 0, AW = 0, X0 = 0, desk = false, heat = 0, scrollY = 0, ctx = null, built = false, started = false;
let ticking = false, lastY = 0, dir = 1, touching = false, settleT, clockT;

function img(src, box) { const i = new Image(); i.alt = ''; i.decoding = 'async'; i.src = src; i.dataset.box = box.join(','); return i; }
function camEl(k, hiToo) {
  const c = CAM[k], cam = h('div.cam'), lo = h('div.lo');
  if (k === 'rest') { const cu = h('div.curtain'); cu.dataset.box = c.wide.join(','); lo.append(cu, h('i.curtain-light')); qs('.curtain-light', lo).dataset.box = c.wide.join(','); cam.append(lo); return cam; }
  lo.append(img('art/' + k + '-w0.webp', c.wide), img('art/' + k + '-p0.webp', c.plate));
  cam.append(lo);
  if (hiToo) { const hi = h('div.hi'); hi.append(img('art/' + k + '-w1.webp', c.wide), img('art/' + k + '-p1.webp', c.plate)); cam.append(hi); }
  return cam;
}

function sceneList() {
  const w = WEEK[dow()];
  const list = [];
  if (w.rest) list.push('rest');
  if (w.gym) list.push('gym');
  list.push('eat');
  if (w.tennis) list.push('tennis');
  return list;
}
function defaultMode() {
  const w = WEEK[dow()], n = nowMin(), st = day.get(), ten = hm(settings.get().tennis || '18:30');
  if (w.rest) return n < hm('20:00') ? 'rest' : 'eat';
  if (w.gym && n < hm('10:30') && !st.done) return 'gym';
  if (w.tennis && n >= ten - 150 && n < ten + 120) return 'tennis';
  return 'eat';
}
/* The meal the lunch scene bills: the next one still to eat */
function eatSlot() {
  const tennis = WEEK[dow()].tennis;
  const slots = daySlots().filter(s => !s.optional && !(tennis && s.id === 'fuel')), n = nowMin();
  return slots.find(s => !s.eaten && hm(s.time) >= n - 75) || slots.find(s => !s.eaten) || slots[slots.length - 1];
}
const fuelSlot = () => daySlots().find(s => s.id === 'fuel');

function titleLines(s) {
  const tt = tr('sessions', s.id, 'title', s.title);
  if (tt.length <= 13) return [tt];
  const i = tt.indexOf(' & ');
  if (i > 0) return [tt.slice(0, i), tt.slice(i + 1)];
  /* No ampersand (Arabic): break at the space nearest the middle */
  const sp = [...tt.matchAll(/ /g)].map(m => m.index);
  if (!sp.length) return [tt];
  const mid = sp.reduce((a, b) => Math.abs(b - tt.length / 2) < Math.abs(a - tt.length / 2) ? b : a);
  return [tt.slice(0, mid), tt.slice(mid + 1)];
}
function splitName(n) {
  if (n.length < 15) return [n];
  const words = n.split(' '); let best = null;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
    const sc = Math.abs(a.length - b.length) + (/^[+&]/.test(b) ? -2 : 0);
    if (!best || sc < best.sc) best = { a, b, sc };
  }
  return best ? [best.a, best.b] : [n];
}
const amp = (s) => s.replace(/ ([+&]) /g, ' <i class="j">$1</i> ');

export function mountToday(el, c) {
  ctx = c; root = document.documentElement; phone = $('phone');
  el.innerHTML = '';
  build(el);
  bus.on('today', () => { if (built) { renderRoll(); update(); } });
  bus.on('meals', () => { if (built) { renderFront(); renderRoll(); update(); measureFloor(); apply(); } });
  bus.on('lang', () => { if (built) { el.innerHTML = ''; build(el); fit(); } });
  window.addEventListener('resize', () => { if (isShown()) fit(); });
}
function isShown() { return phone.dataset.view === 'today'; }
export function showToday() { if (built) { fit(); } }

function build(el) {
  scenes = sceneList();
  mode = defaultMode();
  if (!scenes.includes(mode)) mode = scenes[0];
  const sess = sessionFor();
  phone.style.setProperty('--tl', 0); phone.dataset.tl = '0';
  phone.dataset.mode = mode;
  phone.dataset.session = sess ? sess.id : '';
  qsa('.room i').forEach(r => r.classList.toggle('on', r.dataset.r === mode));
  S = {};
  const wkday = dayName(dow()), d = new Date();

  const sceneEls = scenes.map(k => {
    const n = h('div.scene.' + k, { 'data-s': k });
    const back = h('div.win.back', null, h('div.unwin', null, camEl(k, k !== 'rest'), h('div.grain'), h('div.floor'), h('div.sky')));
    n.append(back);
    if (k === 'gym') {
      const lines = titleLines(sess);
      n.append(h('h1.ttl', { html: lines.map(amp).join('<br>') }));
      phone.style.setProperty('--tl', lines.length - 1); phone.dataset.tl = String(lines.length - 1);
    }
    if (k === 'tennis') n.append(h('h1.ttl', { html: t('Tennis') + '<br><span class="up">' + (settings.get().tennis || '18:30') + '</span>' }));
    if (k === 'rest') n.append(h('h1.ttl.it', { html: t('Intermission') }));
    return n;
  });

  proj = h('div.proj', null, ...sceneEls, h('div.shield#shield'),
    h('div.pinbar', { 'aria-hidden': 'true' },
      h('div', null, h('span.num.v#figK2', { text: '2,200' }), h('span.lab', { text: t('kcal left of {n}', { n: '2,200' }) })),
      h('div.mid', null, h('span.num.v', { html: '<span id="figP2" style="display:inline-flex">0</span><small>g</small>' }), h('span.lab', { text: t('Protein of {n}', { n: 140 }) })),
      h('div.r', null, h('span.num.v.cd', { text: '00:00:00' }), h('span.lab.pinCut', { text: t('caffeine to 14:00') }))));

  const strip = h('div.strip', { role: 'group', 'aria-label': t('Part of the day') }, ...scenes.map(k => {
    const tm = k === 'gym' ? '07:00' : k === 'tennis' ? minToHm(hm(settings.get().tennis || '18:30') - 90) : k === 'rest' ? t('Rest') : (eatSlot() || {}).time || '13:00';
    const thumb = k === 'rest' ? h('span.th', null, h('i.curtain.mini')) : h('span.th', null, h('img', { src: 'art/' + k + '-t.webp', alt: '' }));
    const lbl = { gym: t('Gym'), eat: t('Eat'), tennis: t('Tennis'), rest: t('Rest day') }[k];
    return h('button', { type: 'button', 'data-go': k, 'aria-pressed': String(k === mode), 'aria-label': lbl + ', ' + tm, onclick: () => go(k) }, thumb, h('span.tm', { text: tm }));
  }));

  front = h('div.front', null,
    h('header.head', null,
      h('div.when', null, h('b', { text: dayShort(d.getDay()) + ' ' + d.getDate() + ' ' + monShort(d.getMonth()) }), h('span.lab', { text: t('Week {n}', { n: weekNo() }) })),
      scenes.length > 1 ? strip : h('span')),
    h('div.fronts'),
    h('div.board', null,
      h('div.prot', null,
        h('span.lab', { text: t('Protein') }),
        h('span.fig', null, h('span.num.big#figP', null, h('span.c', { text: '0' })), h('span.g', { text: 'g' })),
        h('span.lab', { text: t('of {n}', { n: TARGET.protein }) })),
      h('div.pl', null, h('i')),
      h('div.stats', null,
        h('div.l', null, h('span.num.v#figK', { text: '2,200' }), h('span.lab', { html: '<u>' + t('kcal left') + '</u> ' + t('of {n}', { n: '2,200' }) })),
        h('div.r', null, h('span.num.v.cd', { text: '00:00:00' }), h('span.lab#cutName', { text: t('caffeine to 14:00') })))),
    h('div.acts'),
    h('div.nexts'));

  const dayEl = h('section.day', { 'aria-label': t('The rest of the day') });
  const reel = h('div.reel', null, h('i#uProbe'), proj, front, dayEl);
  scroller = h('div.tscroll', null, reel);
  spill = h('i.spill');
  el.append(spill, scroller, h('div#totals.sr', { 'aria-live': 'polite' }));
  pinbar = qs('.pinbar', proj);

  scenes.forEach(k => {
    const n = qs('.scene.' + k, proj), s = Object.assign({}, CAM[k]);
    s.el = n; s.sky = qs('.sky', n); s.floor = qs('.floor', n); s.ttl = qs('.ttl', n); s.pinnedTtl = !!s.ttl;
    s.wins = qsa('.win', n); s.unwins = qsa('.unwin', n); s.cams = qsa('.cam', n); s.his = qsa('.hi', n);
    n.classList.toggle('on', k === mode);
    S[k] = s;
  });

  renderFront();
  renderRoll();
  bindScroll();
  built = true;
  drawClock();
  clearInterval(clockT); clockT = setInterval(drawClock, 1000);
  update(true);
}

/* The front of the one-sheet for each scene: billing, the action, and the first credit */
function renderFront() {
  const fr = qs('.fronts', front), acts = qs('.acts', front), nx = qs('.nexts', front);
  fr.innerHTML = ''; acts.innerHTML = ''; nx.innerHTML = '';
  const st = day.get(), sess = sessionFor();
  if (S.gym && sess) {
    const n = sess.moves.length;
    fr.append(h('div.credit.gym', null, h('span', { text: t('Session {s}, {n} moves', { s: sess.id, n }) }), h('span', { html: '<b>3 <i class="j">&times;</i> 8<i class="j">&ndash;</i>15</b>' })));
    const done = st.done === sess.id;
    acts.append(h('div.act.gym', null, h('button.go#start', { type: 'button', 'aria-pressed': String(done), html: CHECK + '<span>' + (done ? t('Done') : t('Start')) + '</span>', onclick: () => ctx.startLive(sess) })));
    const first = daySlots().find(s => !s.optional);
    if (first) nx.append(nextBtn('gym', 'r-' + first.id, first.time, mealName(first.mealObj), first.mealObj.p + ' g'));
  }
  const es = eatSlot();
  if (S.eat && es) {
    const m = es.mealObj;
    fr.append(h('h1.ttl#ttlEat', { html: splitName(mealName(m)).map(amp).join('<br>') }));
    fr.append(h('div.credit.eat', null, h('span', { html: '<b><i class="j">+</i>' + m.p + ' g</b>' }), h('span', { text: fmt(m.k) + ' kcal' })));
    acts.append(h('div.act.eat', null,
      h('button.go#addMeal', { type: 'button', 'aria-pressed': String(es.eaten), html: CHECK + '<span>' + (es.eaten ? t('Added') : t('Add')) + '</span>', onclick: () => toggleMeal(es.id) }),
      h('button.ghost', { type: 'button', text: t('Recipe'), onclick: (e) => ctx.openMeal(m, e.currentTarget, { slot: es }) })));
    const cut = nowMin() < hm('14:00');
    if (cut) nx.append(nextBtn('eat', 'interBox', '14:00', t('Caffeine ends'), null, t('Coke Zero counts')));
    else { const after = daySlots().filter(s => !s.optional && hm(s.time) > hm(es.time))[0]; if (after) nx.append(nextBtn('eat', 'r-' + after.id, after.time, mealName(after.mealObj), after.mealObj.p + ' g')); else nx.append(nextBtn('eat', 'rEnd', '', t('The rest of the day'), null, '')); }
  }
  if (S.tennis) {
    const f = fuelSlot();
    if (f) {
      fr.append(h('div.credit.tennis', null, h('span', { text: mealName(f.mealObj) }), h('span', { text: t('90 minutes before court') })));
      acts.append(h('div.act.tennis', null, h('button.go#addFuel', { type: 'button', 'aria-pressed': String(f.eaten), html: CHECK + '<span>' + (f.eaten ? t('Fuelled') : t('Fuel')) + '</span>', onclick: () => toggleMeal('fuel') })));
    }
    nx.append(nextBtn('tennis', 'r-lmnt', '', t('LMNT, 1 packet'), null, t('before you walk on court')));
  }
  if (S.rest) {
    fr.append(h('div.credit.rest', null, h('span', { text: t('Saturday. Full rest. Nothing.') })));
    acts.append(h('div.act.rest', null, h('button.go', { type: 'button', html: '<span>' + t('Plan the shop') + '</span>', onclick: () => ctx.openShop() })));
    const ns = 'Sunday';
    nx.append(nextBtn('rest', 'r-breakfast', '', t('Tomorrow'), null, t('Tennis, {t}', { t: settings.get().tennis || '18:30' })));
  }
}
function nextBtn(k, to, time, name, num, meta) {
  const b = h('button.next.' + k, { type: 'button', onclick: () => rollTo(to) });
  if (time) b.append(h('span.num', { text: time }));
  b.append(h('span.n', { text: name }));
  if (num) b.append(h('span.num', { text: num }));
  if (meta) b.append(h('span.m', { text: meta }));
  b.insertAdjacentHTML('beforeend', CHEV);
  return b;
}
function rollTo(id) {
  const tEl = $(id); if (!tEl) return;
  const top = tEl.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - B1 - U * 10;
  scroller.scrollTo({ top, behavior: reduce() ? 'auto' : 'smooth' });
}

/* The credit roll */
function renderRoll() {
  const dayEl = qs('.day', scroller); dayEl.innerHTML = '';
  const w = WEEK[dow()], st = day.get(), slots = daySlots();
  const rows = [];
  const mealRow = (s) => {
    const m = s.mealObj; if (!m) return null;
    const lines = splitName(mealName(m));
    const r = h('div.row.meal' + (s.optional ? '.opt' : ''), { id: 'r-' + s.id, 'aria-pressed': String(s.eaten), 'data-slot': s.id },
      h('span.l', null, h('span.num.time', { text: s.time }), h('span.num.mac', { html: '<b>' + m.p + '</b><small>&#8201;g</small><em>' + fmt(m.k) + ' kcal</em>' })),
      h('span.node', { html: CHECK }),
      h('span.rr', null, h('span.name', { html: lines.map(amp).join('<br>') }), h('span.note', { text: t(s.note) })),
      h('button.hit', { type: 'button', 'aria-pressed': String(s.eaten), 'aria-label': t('{name}, {p} grams, {k} kilocalories. Mark as eaten', { name: mealName(m), p: m.p, k: fmt(m.k) }), onclick: () => toggleMeal(s.id) }),
      h('button.nm', { type: 'button', 'aria-label': t('Open {name}, or swap it', { name: mealName(m) }), onclick: (e) => ctx.openMeal(m, r, { slot: s }) }));
    return r;
  };
  const tick = (id, time, name, note) => {
    const on = !!st.ticks[id];
    return h('button.row.tick', { type: 'button', id: 'r-' + id, 'aria-pressed': String(on), onclick: (e) => { day.patch(x => { x.ticks[id] = !x.ticks[id]; }); e.currentTarget.setAttribute('aria-pressed', String(!on)); sound('click'); bus.emit('today'); } },
      h('span.l', null, h('span.num.time', { text: time })), h('span.node', { html: CHECK }), h('span.rr', null, h('span.name', { text: name }), h('span.note', { text: note })));
  };
  for (const s of slots) {
    if (s.id === 'breakfast' || (s.id === 'pre')) { rows.push(mealRow(s)); if (s.id === 'breakfast') rows.push(tick('creatine', '5 g', t('Creatine'), t('Any time'))); continue; }
    if (s.id === 'lunch') {
      rows.push(mealRow(s));
      rows.push(h('div.inter#interBox', null, h('span.a#interName', { html: t('Caffeine ends at') + ' <span class="num">14:00</span>' }), h('span.num.cd#interClock', { text: '00:00:00' }), h('span.note', { text: t('Coke Zero counts.') })));
      continue;
    }
    if (s.id === 'fuel') {
      rows.push(mealRow(s));
      rows.push(tick('lmnt', t('1 packet'), 'LMNT', t('Before you walk on court')));
      const ten = settings.get().tennis || '18:30';
      rows.push(h('button.shot#toTennis', { type: 'button', 'aria-label': t('Tennis at {t}. Past 90 minutes, add carbs. LMNT has none.', { t: ten }), onclick: () => { scroller.scrollTo({ top: 0, behavior: reduce() ? 'auto' : 'smooth' }); go('tennis'); } },
        h('span.pic', null, h('img', { src: 'art/tennis-w0.webp', alt: '', loading: 'lazy' }), h('img', { src: 'art/tennis-w1.webp', alt: '', loading: 'lazy' })),
        h('span.row', null, h('span.l', null, h('span.num.time', { text: ten })), h('span.event'), h('span.rr', null, h('span.name', { text: t('Tennis') }), h('span.note', { text: t('Past 90 min, add carbs. LMNT has none.') })))));
      continue;
    }
    rows.push(mealRow(s));
  }
  /* Anything he added from the bank today */
  st.extras.forEach((id, i) => {
    const m = mealById(id); if (!m) return;
    const lines = splitName(mealName(m));
    rows.push(h('div.row.meal.extra', { id: 'r-x' + i, 'aria-pressed': 'true' },
      h('span.l', null, h('span.num.time', { text: t('Extra') }), h('span.num.mac', { html: '<b>' + m.p + '</b><small>&#8201;g</small><em>' + fmt(m.k) + ' kcal</em>' })),
      h('span.node', { html: CHECK }),
      h('span.rr', null, h('span.name', { html: lines.map(amp).join('<br>') }), h('span.note', { text: t('Added from the bank') })),
      h('button.hit', { type: 'button', 'aria-label': t('Remove {name} from today', { name: mealName(m) }), onclick: () => { day.patch(x => { x.extras.splice(i, 1); }); bus.emit('today'); ctx.toast(t('Removed from today.')); } }),
      h('button.nm', { type: 'button', 'aria-label': t('Open {name}', { name: mealName(m) }), onclick: (e) => ctx.openMeal(m, e.currentTarget.parentNode, {}) })));
  });
  /* What should I eat next */
  const sg = suggest();
  if (sg && !sg.plan && !sg.none) {
    const m = sg.meal;
    rows.push(h('div.inter.sugg', null,
      h('span.a', { html: t('Still {g} g short', { g: '<span class="num">' + sg.gap + '</span>' }) }),
      h('span.name', { html: splitName(mealName(m)).map(amp).join('<br>') }),
      h('span.note', { text: t('{p} g for {k} kcal. The best fit for what is left.', { p: m.p, k: fmt(m.k) }) }),
      h('span.btns', null,
        h('button.go.sm', { type: 'button', text: t('Add'), onclick: () => { day.patch(x => { x.extras.push(m.id); }); sound('click'); bus.emit('today'); flare(); } }),
        h('button.ghost.sm', { type: 'button', text: t('Recipe'), onclick: (e) => ctx.openMeal(m, e.currentTarget.closest('.inter'), {}) }))));
  }
  rows.push(h('button.row.addrow', { type: 'button', onclick: () => ctx.pickMeal({ title: t('Add to today'), onPick: (m) => { day.patch(x => { x.extras.push(m.id); }); bus.emit('today'); flare(); } }) },
    h('span.l'), h('span.node.plus', { html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' }), h('span.rr', null, h('span.name', { text: t('Add a meal') }), h('span.note', { text: t('From the bank') }))));
  const wk = dayName(dow());
  rows.push(h('div.end#rEnd', null, h('b', { html: t('End of {day}', { day: (wk[0] === 'W' ? '<span class="kW">W</span>' + wk.slice(1) : wk) }) })));
  dayEl.append(...rows.filter(Boolean));
  if (W) { layoutRoll(); }
}
function layoutRoll() {
  const shot = $('toTennis'), dayEl = qs('.day', scroller), endEl = qs('.end', dayEl);
  if (!endEl) return;
  const startEl = shot || endEl.previousElementSibling || endEl;
  const hgt = endEl.getBoundingClientRect().bottom - startEl.getBoundingClientRect().top;
  dayEl.style.paddingBottom = Math.max(U * 64, PH - B1 - hgt - U * 12) + 'px';
  dayEl.style.setProperty('--spine', (endEl.getBoundingClientRect().top - dayEl.getBoundingClientRect().top + U * 26) + 'px');
}

function toggleMeal(id) {
  let on = false;
  day.patch(x => { x.eaten[id] = !x.eaten[id]; on = x.eaten[id]; });
  sound('click');
  bus.emit('today');
  renderFront(); measureFloor(); apply();
  if (on) flare();
}

/* Geometry */
function fit() {
  const pr = proj.getBoundingClientRect();
  if (!pr.width) return;
  W = pr.width; PH = pr.height;
  const p = $('uProbe').getBoundingClientRect();
  U = p.width / 100; ST = p.height;
  desk = matchMedia(DESK).matches;
  if (desk) {
    /* The picture is the window left of the roll (right of it, right to left); the roll scrolls, the frame stays */
    const rw = qs('.day', scroller).getBoundingClientRect().width;
    AW = Math.max(320, W - rw); X0 = document.documentElement.dir === 'rtl' ? W - AW : 0;
    H1 = 0; B1 = ST;
  } else { AW = W; X0 = 0; H1 = W / 2.39; B1 = ST + H1; }
  $('shield').style.height = (desk ? 0 : B1) + 'px';
  Object.keys(S).forEach(k => {
    const s = S[k], R = s.rest, P = s.pin;
    const tl = k === 'gym' ? +(phone.dataset.tl || 0) : 0;
    const ww = s.wide[2] - s.wide[0], wh = s.wide[3] - s.wide[1];
    if (desk) {
      const D = DCAM[k], f = PH / 900, mx = (x) => X0 + AW * (X0 ? 1 - x : x);
      s.REST = k === 'rest'
        ? { ax: D.a[0], ay: D.a[1], x: mx(D.x), y: PH * D.y, k: Math.max(AW / ww, PH / wh) * 1.04, r: 0 }
        : { ax: D.a[0], ay: D.a[1], x: mx(D.x), y: PH * (D.y || 0), k: (D.k || .3) * f, r: D.r || 0 };
      if (k === 'eat' || k === 'tennis') cover(s, s.REST);
      s.PIN = s.REST;
      s.WIDE = { ax: s.centre[0], ay: s.centre[1], x: X0 + AW / 2, y: PH * .46, k: Math.max(AW / ww, PH / wh), r: 0 };
    } else {
      s.REST = { ax: R.a[0], ay: R.a[1], x: W * R.x, y: ST + (R.y + tl * 50) * U, k: R.k * (R.fillW ? Math.max(U, W / 390 * R.fillW) : U), r: R.fillW ? lerp(R.r, R.r + 4.5, clamp((W / 390 * R.fillW - U) / .1, 0, 1)) : R.r };
      s.PIN = { ax: P.a[0], ay: P.a[1], x: W / 2, y: ST + H1 * P.y, k: P.k * W / 390, r: P.r };
      s.WIDE = { ax: s.centre[0], ay: s.centre[1], x: W / 2, y: PH * .32, k: W / ww, r: 0 };
    }
    s.cams.forEach(c => qsa('[data-box]', c).forEach(i => {
      const b = i.dataset.box.split(',').map(Number);
      i.style.left = (b[0] * K0) + 'px'; i.style.top = (b[1] * K0) + 'px';
      i.style.width = ((b[2] - b[0]) * K0) + 'px'; i.style.height = ((b[3] - b[1]) * K0) + 'px';
    }));
  });
  measureFloor();
  layoutRoll();
  apply();
}
/* Wide screen: push in until the picture, rolled or not, covers the frame between the dark sky and the floor */
function cover(s, R) {
  const [x0, y0, x1, y1] = s.wide, a = -R.r * Math.PI / 180, cs = Math.cos(a), sn = Math.sin(a);
  const pts = [[X0, PH * .3], [X0 + AW, PH * .3], [X0, PH * .8], [X0 + AW, PH * .8]];
  const inside = ([px, py]) => { const dx = (px - R.x) / R.k, dy = (py - R.y) / R.k, sx = R.ax + dx * cs - dy * sn, sy = R.ay + dx * sn + dy * cs; return sx >= x0 && sx <= x1 && sy >= y0 && sy <= y1; };
  for (let i = 0; i < 40 && !pts.every(inside); i++) R.k *= 1.025;
}
function measureFloor() {
  if (!S[mode] || !W) return;
  const first = mode === 'gym' ? qs('.board', front) : mode === 'eat' ? $('ttlEat') : mode === 'tennis' ? qs('.credit.tennis', front) : qs('.credit.rest', front);
  if (!first) return;
  const ft = front.getBoundingClientRect().bottom - first.getBoundingClientRect().top;
  phone.style.setProperty('--ft', ft.toFixed(1) + 'px');
  if (desk) {
    /* Wide screen: the whole figure stands between the title and the numbers, the bar just above the protein */
    const g = S.gym;
    if (mode === 'gym' && g && g.REST && g.ttl) {
      const top = g.ttl.offsetTop + g.ttl.offsetHeight + U * 16, bar = PH - ft - U * 10;
      g.REST.y = top; g.REST.k = clamp((bar - top) / 1314, .18, AW / 1500);
    }
    S[mode].sPin = 1;
    return;
  }
  S[mode].sPin = (B1 - pinbar.offsetHeight - U * 6) / Math.max(1, PH - ft);
  if (mode === 'gym' && S.gym.REST) S.gym.REST.k = clamp((PH - ft - U * 2 - S.gym.REST.y) / 1314, .2, W / 1000);
}
function tf(c) {
  return 'translate3d(' + c.x.toFixed(2) + 'px,' + c.y.toFixed(2) + 'px,0) rotate(' + c.r.toFixed(3) + 'deg) scale(' + (c.k / K0).toFixed(5) + ') translate(' + (-c.ax * K0).toFixed(2) + 'px,' + (-c.ay * K0).toFixed(2) + 'px)';
}
function setCam(s, c) { s.cams.forEach(n => { n.style.transform = tf(c); }); }

/* Scrolling pulls the camera back and closes the frame down to CinemaScope */
function apply() {
  const s = S[mode]; if (!s || !s.REST) return;
  if (desk) {
    /* Wide screen: the frame never closes. Rolling the credits only eases the camera in a few per cent. */
    const q = clamp(scrollY / Math.max(1, PH), 0, 1), e = q * q * (3 - 2 * q);
    const c = Object.assign({}, s.REST, { k: s.REST.k * (1 + .035 * e) });
    s.current = c;
    if (!s.anim) setCam(s, c);
    s.wins.forEach(w => { w.style.transform = ''; });
    s.unwins.forEach(w => { w.style.transform = ''; });
    s.floor.style.transform = '';
    front.style.opacity = ''; s.sky.style.opacity = '';
    if (s.pinnedTtl) { s.ttl.style.transform = ''; s.ttl.style.opacity = ''; }
    pinbar.style.transform = ''; spill.style.transform = '';
    phone.classList.remove('pin');
    return;
  }
  const dist = Math.max(1, PH - B1), q = clamp(scrollY / dist, 0, 1), e = q * q * (3 - 2 * q);
  const B = Math.max(B1, PH - scrollY), R = s.REST, P = s.PIN;
  const c = { ax: lerp(R.ax, P.ax, e), ay: lerp(R.ay, P.ay, e), x: lerp(R.x, P.x, e), y: lerp(R.y, P.y, e), k: R.k * Math.pow(P.k / R.k, e), r: lerp(R.r, P.r, e) };
  s.current = c;
  if (!s.anim) setCam(s, c);
  const d = (B - PH).toFixed(1);
  s.wins.forEach(w => { w.style.transform = 'translate3d(0,' + d + 'px,0)'; });
  s.unwins.forEach(w => { w.style.transform = 'translate3d(0,' + (-d) + 'px,0)'; });
  s.floor.style.transform = 'scaleY(' + lerp(1, s.sPin || B1 / PH, clamp((PH - B) / Math.max(1, PH - B1), 0, 1)).toFixed(4) + ')';
  const ov = clamp(1 - scrollY / 150, 0, 1);
  front.style.opacity = ov.toFixed(3);
  s.sky.style.opacity = ov.toFixed(3);
  if (s.pinnedTtl) { s.ttl.style.transform = 'translate3d(0,' + (-scrollY).toFixed(1) + 'px,0)'; s.ttl.style.opacity = ov.toFixed(3); }
  pinbar.style.transform = 'translate3d(0,' + (B - pinbar.offsetHeight).toFixed(1) + 'px,0)';
  spill.style.transform = 'translate3d(0,' + B.toFixed(1) + 'px,0)';
  phone.classList.toggle('pin', isShown() && scrollY > 110);
}
function bindScroll() {
  scroller.addEventListener('scroll', () => {
    scrollY = scroller.scrollTop;
    if (scrollY !== lastY) { dir = scrollY > lastY ? 1 : -1; lastY = scrollY; }
    const live = S[mode] && S[mode].anim;
    if (scrollY > 4 && live && live.stop) live.stop();
    if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; apply(); }); }
    queueSettle();
  }, { passive: true });
  /* A scroll that stops while the frame is half closed finishes the move it was making */
  scroller.addEventListener('touchstart', () => { touching = true; clearTimeout(settleT); }, { passive: true });
  scroller.addEventListener('touchend', () => { touching = false; queueSettle(); }, { passive: true });
  scroller.addEventListener('touchcancel', () => { touching = false; queueSettle(); }, { passive: true });
}
function queueSettle() { clearTimeout(settleT); settleT = setTimeout(settle, 150); }
function settle() {
  if (touching || desk) return;
  const end = Math.max(1, PH - B1), y = scroller.scrollTop;
  if (y <= 2 || y >= end - 2) return;
  const to = dir > 0 ? (y > end * .2 ? end : 0) : (y < end * .8 ? 0 : end);
  scroller.scrollTo({ top: to, behavior: reduce() ? 'auto' : 'smooth' });
}

/* Numbers and light */
function update(first) {
  const { p, left, over } = totals();
  setNum($('figP'), String(p)); setNum($('figP2'), String(p));
  setNum($('figK'), fmt(over ? over : left)); setNum($('figK2'), fmt(over ? over : left));
  qsa('#figK + .lab u, .pinbar .lab', front.parentNode).forEach(() => {});
  const kl = qs('#figK + .lab', front); if (kl) kl.innerHTML = over ? '<u>' + t('kcal over') + '</u> ' + t('of {n}', { n: '2,200' }) : '<u>' + t('kcal left') + '</u> ' + t('of {n}', { n: '2,200' });
  heat = Math.min(1, Math.pow(p / TARGET.protein, .8));
  root.style.setProperty('--heat', heat.toFixed(3));
  root.style.setProperty('--pf', Math.min(1, p / TARGET.protein).toFixed(3));
  phone.dataset.full = p >= TARGET.protein ? 'true' : 'false';
  const tot = $('totals'); if (tot) tot.textContent = t('Protein {p} of 140 grams. {k} kilocalories left.', { p, k: fmt(left) });
  qsa('.row.meal[data-slot]', scroller).forEach(r => {
    const s = daySlots().find(x => x.id === r.dataset.slot); if (!s) return;
    r.setAttribute('aria-pressed', String(s.eaten)); const b = qs('.hit', r); if (b) b.setAttribute('aria-pressed', String(s.eaten));
  });
}
function flare() {
  if (reduce() || !S[mode]) return;
  S[mode].his.forEach(hh => hh.animate([{ opacity: 1 }, { opacity: 1, offset: .14 }, { opacity: heat }], { duration: 1200, easing: 'cubic-bezier(.3,.1,.2,1)' }));
}

/* A scene change is a hard cut to the wide shot, then the camera moves in to the one-sheet */
function move(s, dur, from) {
  if (s.anim && s.anim.stop) s.anim.stop();
  const As = s.cams.map(n => n.animate([{ transform: tf(from || s.WIDE) }, { transform: tf(s.REST) }], { duration: dur, easing: 'cubic-bezier(.12,.9,.14,1)' }));
  const hd = { stop() { As.forEach(a => a.cancel()); if (s.anim === hd) { s.anim = null; setCam(s, s.current || s.REST); } } };
  s.anim = hd;
  As[0].onfinish = () => { if (s.anim === hd) { s.anim = null; setCam(s, s.current || s.REST); } };
}
export function go(next) {
  if (next === mode || !S[next]) return;
  mode = next;
  phone.dataset.mode = mode;
  Object.keys(S).forEach(k => S[k].el.classList.toggle('on', k === mode));
  qsa('[data-go]', front).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.go === mode)));
  qsa('.room i').forEach(r => r.classList.toggle('on', r.dataset.r === mode));
  bus.emit('light', mode);
  measureFloor();
  apply();
  if (!reduce() && (desk || scrollY < 8)) {
    move(S[mode], 880);
    if (S[mode].ttl) S[mode].ttl.animate([{ opacity: 0 }, { opacity: 0, offset: .25 }, { opacity: 1 }], { duration: 560, easing: 'ease-out' });
  }
}
export const currentMode = () => mode;

/* Caffeine cut-off, live */
function drawClock() {
  const d = new Date(), left = Math.max(0, Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate(), 14, 0, 0) - d) / 1000));
  const over = left <= 0;
  const txt = over ? t('Passed') : [Math.floor(left / 3600), Math.floor(left % 3600 / 60), left % 60].map(n => String(n).padStart(2, '0')).join(':');
  qsa('.cd', phone).forEach(c => { c.textContent = txt; c.classList.toggle('word', over); });
  const cn = $('cutName'); if (cn) cn.textContent = over ? t('caffeine cut-off') : t('caffeine to 14:00');
  const pc = qs('.pinCut', phone); if (pc) pc.textContent = over ? t('caffeine cut-off') : t('caffeine to 14:00');
  const iname = $('interName'); if (iname) iname.innerHTML = (over ? t('Caffeine ended at') : t('Caffeine ends at')) + ' <span class="num">14:00</span>';
  const night = nowMin() >= hm('21:30') || nowMin() < hm('04:30');
  if ((phone.dataset.night === 'true') !== night) phone.dataset.night = String(night);
}

/* Opening: one shot of about 1.9 s. A line of light on black, the gate opens on his eyes, the day's name,
   then a flash cut to the one-sheet as the exposure comes up. Full only on the first open of the day. */
export function begin(full) {
  phone.classList.remove('wait');
  fit();
  update();
  const s = S[mode];
  if (reduce() || !s || !s.REST) return Promise.resolve();
  if (!full) {
    move(s, 900, Object.assign({}, s.REST, { k: s.REST.k * 1.06, y: s.REST.y + U * 6 }));
    return Promise.resolve();
  }
  flags.set('opened', ymd());
  return new Promise(resolve => {
    const op = $('opening'), tabs = qs('.tabs', phone);
    const eyes = qs('.cam', op);
    qsa('[data-box]', eyes).forEach(i => {
      const b = i.dataset.box.split(',').map(Number);
      i.style.left = (b[0] * K0) + 'px'; i.style.top = (b[1] * K0) + 'px'; i.style.width = ((b[2] - b[0]) * K0) + 'px'; i.style.height = ((b[3] - b[1]) * K0) + 'px';
    });
    const a = qsa('.sh', op), slit = qs('.slit', op), word = qs('.word', op), flash = qs('.flash', op), veil = qs('.veil', op);
    const wk = dayName(dow());
    word.innerHTML = wk[0] === 'W' ? '<span class="kW">W</span>' + wk.slice(1) : wk;
    /* The eyes fill the gate: by width on a phone; on a wide screen by height, so the plate is never blown up */
    const ek = (desk ? Math.max(PH / 800, W / 1340) : W / 390) * 1.02, ECU = { ax: 1285, ay: 262, x: W / 2, y: 262 * ek, k: ek, r: 0 };
    const WIDER = { ax: s.REST.ax, ay: s.REST.ay, x: s.REST.x, y: s.REST.y + U * 4, k: s.REST.k * 1.09, r: s.REST.r };
    phone.classList.add('intro');
    const A = [];
    const an = (el, kf, o) => { const x = el.animate(kf, Object.assign({ fill: 'both' }, o)); A.push(x); return x; };
    const TOTAL = 1880, CUT = 860, f = CUT / TOTAL;
    an(slit, [{ transform: 'scaleY(0)', opacity: 1 }, { transform: 'scaleY(1)', opacity: 1, offset: .8 }, { transform: 'scaleY(1)', opacity: 0 }], { duration: 250, easing: 'cubic-bezier(.5,0,.1,1)' });
    an(a[0], [{ transform: 'translateX(0)' }, { transform: 'translateX(-101%)' }], { duration: 340, delay: 200, easing: 'cubic-bezier(.62,.02,.2,1)' });
    an(a[1], [{ transform: 'translateX(0)' }, { transform: 'translateX(101%)' }], { duration: 340, delay: 200, easing: 'cubic-bezier(.62,.02,.2,1)' });
    an(word, [{ opacity: 0, transform: 'scale(1.03)' }, { opacity: 1, transform: 'none' }], { duration: 150, delay: 490, easing: 'ease-out' });
    an(word, [{ visibility: 'visible' }, { visibility: 'hidden' }], { duration: 1, delay: CUT });
    an(veil, [{ visibility: 'visible' }, { visibility: 'hidden' }], { duration: 1, delay: CUT });
    an(eyes, [{ transform: tf(ECU), visibility: 'visible' }, { transform: tf(Object.assign({}, ECU, { k: ECU.k * 1.05 })), visibility: 'visible', offset: f }, { transform: tf(Object.assign({}, ECU, { k: ECU.k * 1.05 })), visibility: 'hidden', offset: f + .0001 }, { visibility: 'hidden' }], { duration: TOTAL });
    s.cams.forEach(n => an(n, [{ transform: tf(WIDER) }, { transform: tf(WIDER), offset: f }, { transform: tf(WIDER), offset: f + .0001, easing: 'cubic-bezier(.1,.8,.15,1)' }, { transform: tf(s.REST) }], { duration: TOTAL }));
    if (s.ttl) {
      an(s.ttl, [{ opacity: 0 }, { opacity: 0, offset: f }, { opacity: 1, offset: f + .0001 }, { opacity: 1 }], { duration: TOTAL });
      an(s.ttl, [{ transform: 'scale(1.07)' }, { transform: 'scale(1.07)', offset: f }, { transform: 'none' }], { duration: TOTAL, easing: 'cubic-bezier(.16,1,.3,1)', composite: 'replace' });
    }
    const bw = qs('.back', s.el);
    an(bw, [{ opacity: 0 }, { opacity: 0, offset: f }, { opacity: .2, offset: f + .0001, easing: 'cubic-bezier(.3,.3,.3,1)' }, { opacity: 1, offset: .88 }, { opacity: 1 }], { duration: TOTAL });
    an(flash, [{ opacity: 0 }, { opacity: .94 }, { opacity: 0 }], { duration: 240, delay: CUT - 72, easing: 'ease-out' });
    an(front, [{ opacity: 0 }, { opacity: 1 }], { duration: 130, delay: 1350, easing: 'ease-out' });
    an(front, [{ transform: 'translateY(16px)' }, { transform: 'none' }], { duration: 420, delay: 1350, easing: 'cubic-bezier(.16,1,.3,1)', composite: 'replace' });
    an(tabs, [{ opacity: 0 }, { opacity: 1 }], { duration: 130, delay: 1350, easing: 'ease-out' });
    /* Wide screen: the credit roll is on screen from the cut, so it comes up with the numbers */
    if (desk) an(qs('.day', scroller), [{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: 1390, easing: 'ease-out' });
    s.anim = { stop() {} };
    setNumRaw($('figK'), '0'); setNumRaw($('figP'), '0');
    const numT = setTimeout(() => update(), 1380), endT = setTimeout(finish, TOTAL);
    function finish() {
      clearTimeout(numT); clearTimeout(endT);
      A.forEach(x => x.cancel());
      s.anim = null;
      update();
      phone.classList.remove('intro');
      apply();
      phone.removeEventListener('pointerdown', skip, true);
      document.removeEventListener('keydown', skipKey, true);
      resolve();
    }
    function skipKey(e) { e.preventDefault(); e.stopPropagation(); finish(); }
    function skip() {
      finish();
      const stop = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
      phone.addEventListener('click', stop, { capture: true, once: true });
      setTimeout(() => phone.removeEventListener('click', stop, true), 600);
    }
    phone.addEventListener('pointerdown', skip, true);
    document.addEventListener('keydown', skipKey, true);
  });
}
export function todayImages() { return S[mode] ? qsa('img', S[mode].el) : []; }
