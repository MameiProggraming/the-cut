/* Progress: the weight chart is the hero. Faded daily points, a weekly-average trend lit on top, the 66–69 kg
   band, and a projected arrival. Then the photos, the plan, and the settings with the backup. */
import { h, add, $, qs, qsa, t, tr, fmt, fmt1, dateShort, bus, toast, sound, EQUIPMENT, TARGET, lang } from './core.js';
import { weights, settings, photos, compress, exportAll, importAll, ymd, addDays, daysBetween, parseYmd } from './store.js';
import { openLayer, closeTop } from './sheet.js';
import { PLAN } from './data/program.js';

let root, ctx;
const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>', MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>';
const VERSION = '1.0.0';

export function mountProgress(el, c) { root = el; ctx = c; render(); bus.on('lang', render); window.addEventListener('resize', () => { if ($('phone').dataset.view === 'progress') drawChart(); }); }
export function showProgress() { render(); }

/* The numbers behind the chart */
function series() {
  const ws = weights.all();
  const trend = ws.map((w, i) => { const from = addDays(w.d, -6); const a = ws.filter(x => x.d >= from && x.d <= w.d); return { d: w.d, kg: a.reduce((p, x) => p + x.kg, 0) / a.length }; });
  const last = ws[ws.length - 1] || null;
  const avg = (from, to) => { const a = ws.filter(x => x.d >= from && x.d <= to); return a.length ? a.reduce((p, x) => p + x.kg, 0) / a.length : null; };
  const now = ymd(), wkAvg = avg(addDays(now, -6), now), prevAvg = avg(addDays(now, -13), addDays(now, -7));
  /* Slope of the trend over the last three weeks, kg a day */
  let slope = null;
  const recent = trend.filter(x => x.d >= addDays(now, -21));
  if (recent.length >= 4) {
    const xs = recent.map(x => daysBetween(recent[0].d, x.d)), ys = recent.map(x => x.kg), n = xs.length;
    const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
    const num = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0), den = xs.reduce((a, x) => a + (x - mx) * (x - mx), 0);
    if (den > 0) slope = num / den;
  }
  const cur = trend.length ? trend[trend.length - 1].kg : TARGET.startKg;
  const rate = slope != null && slope < -0.005 ? slope : -0.45 / 7;
  const daysTo = cur > TARGET.hi ? Math.ceil((cur - TARGET.hi) / -rate) : 0;
  const arrive = addDays(trend.length ? trend[trend.length - 1].d : now, daysTo);
  const start = settings.get().start || '2026-11-03';
  const creatine = daysBetween(start, now) <= 14 && cur > TARGET.startKg - .2 && ws.length > 0;
  return { ws, trend, last, wkAvg, prevAvg, slope, cur, rate, arrive, daysTo, ownRate: slope != null && slope < -0.005, creatine, start };
}

function render() {
  const s = series(), today = ymd();
  root.innerHTML = '';
  const todayW = s.ws.find(w => w.d === today);
  let v = todayW ? todayW.kg : s.last ? s.last.kg : TARGET.startKg;
  const big = h('span.num' + (s.wkAvg == null ? '.none' : ''), { text: fmt1(s.wkAvg == null ? TARGET.startKg : s.wkAvg) });
  const d = s.wkAvg != null && s.prevAvg != null ? s.wkAvg - s.prevAvg : null;
  const head = h('header.ph', null,
    h('div.top', null, h('span.lab', { style: { color: 'var(--bone)' }, text: t('Weekly average') }), h('span.lab', { text: t('Target {a}–{b} kg', { a: TARGET.lo, b: TARGET.hi }) })),
    h('div.pl2', null,
      h('div.big', null, big, h('span.u', { text: 'kg' })),
      h('div.delta', null,
        d != null ? h('span.lab', { html: '<b>' + (d > 0 ? '+' : d < 0 ? '−' : '') + fmt1(Math.abs(d)) + ' kg</b> ' + t('on last week') }) : h('span.lab', { text: s.ws.length ? t('Two weeks of weigh-ins give the first change.') : t('The start weight. Log the first weigh-in to start the line.') }),
        s.ws.length ? h('span.lab', { html: s.daysTo ? t('Into the band around {d}', { d: '<b>' + dateShort(s.arrive) + '</b>' }) + (s.ownRate ? '' : ' ' + t('at 0.45 kg a week')) : '<b>' + t('In the band.') + '</b>' }) : null)),
    h('div.chart#chart'));
  const val = h('span.num', { html: fmt1(v) + '<small> kg</small>' });
  const bump = (x) => { v = Math.max(40, Math.min(140, Math.round((v + x) * 10) / 10)); val.innerHTML = fmt1(v) + '<small> kg</small>'; };
  let rep = null;
  const hold = (x) => ({ onpointerdown: () => { bump(x); let n = 0; rep = setInterval(() => { n++; bump(x * (n > 10 ? 5 : 1)); }, 140); }, onpointerup: () => clearInterval(rep), onpointerleave: () => clearInterval(rep), onpointercancel: () => clearInterval(rep) });
  const weigh = h('section', null,
    h('div.weigh', null,
      h('button.r', Object.assign({ type: 'button', 'aria-label': t('Less 0.1 kg'), html: MINUS }, hold(-.1))),
      h('div.v', null, val, h('span.lab', { text: todayW ? t('This morning, logged') : t('This morning') })),
      h('button.r', Object.assign({ type: 'button', 'aria-label': t('More 0.1 kg'), html: PLUS }, hold(.1)))),
    h('div.wsave', null, h('button.go', { type: 'button', 'aria-pressed': String(!!todayW), html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5.2 5.2L20 6.5"/></svg><span>' + (todayW ? t('Update today') : t('Log the weigh-in')) + '</span>', onclick: () => { weights.set(today, v); sound('click'); toast(t('{v} kg logged for today.', { v: fmt1(v) })); render(); } })),
    s.creatine ? h('div.cnote', { html: '<b>' + t('Week one: creatine.') + '</b> ' + t('It adds 1–1.5 kg of water inside the muscle. The line will rise before it falls; that is not fat.') }) : null);

  const shotsBox = h('div.shots');
  const photosSec = h('section.sec', null, h('h2.sh2', { text: t('Photos') }), h('p.sdesc', { text: tr('plan', 'photos', 'v', PLAN.measuring[2].text) }), h('div.due'), shotsBox,
    h('div.acts2', null, h('button.ghost', { type: 'button', text: t('Compare'), onclick: () => openCompare() }), h('button.go', { type: 'button', html: '<span>' + t('Take photo') + '</span>', onclick: () => openCamera(() => render()) })));
  fillShots(shotsBox, qs('.due', photosSec));

  const plan = h('section.sec', null,
    h('h2.sh2', { text: t('The plan') }),
    h('div.objv', null,
      h('div', null, h('span.num', { html: TARGET.startKg + '<small> kg</small>' }), h('span.lab', { text: t('Start, 3 Nov') })),
      h('i.ar'),
      h('div.t', null, h('span.num', { html: TARGET.lo + '–' + TARGET.hi + '<small> kg</small>' }), h('span.lab', { text: t('Target') }))),
    h('p.sdesc', { style: { marginTop: 'calc(var(--u)*16)' }, text: tr('plan', 'objective', 'v', PLAN.objective) }),
    h('div.nums4', null, ...PLAN.numbers.map((n, i) => h('div', null, h('span.num', { html: n.v + '<small>' + t(n.u) + '</small>' }), h('span.lab', { text: tr('plan', 'n' + i, 'l', n.l) }), h('p', { text: tr('plan', 'n' + i, 'n', n.n) })))),
    h('div.callout', null, h('b', { text: t('Calibrate, then stop') }), h('p', { text: tr('plan', 'calibrate', 'v', PLAN.calibrate) })),
    h('h3.sh2', { style: { marginTop: 'calc(var(--u)*34)', fontSize: 'calc(var(--u)*24)' }, text: t('Measuring it') }),
    h('div.meas', null, ...PLAN.measuring.map(m => h('div', null, h('b', { text: tr('plan', m.id, 'name', m.name) }), h('p', { text: tr('plan', m.id, 'v', m.text) })))),
    h('p.quote', { text: tr('plan', 'hierarchy', 'v', PLAN.hierarchy) }),
    h('div.callout', null, h('b', { text: t('Reality check') }), h('p', { text: tr('plan', 'reality', 'v', PLAN.reality) })));

  add(root, h('div.vs', null, h('div.vin', null, head, weigh, photosSec, plan, settingsSec(),
    h('div.foot', null, h('b.end-it.it', { text: t('The Cut') }), h('span.lab', { text: t('Version {v}. Review the plan at week 4.', { v: VERSION }) })))));
  requestAnimationFrame(drawChart);
}

function drawChart() {
  const el = $('chart'); if (!el) return;
  const W = el.clientWidth, H = el.clientHeight; if (!W) return;
  const s = series(), now = ymd();
  const first = s.ws.length ? (s.ws[0].d < s.start ? s.ws[0].d : s.start) : s.start;
  const endD = addDays(s.arrive > now ? s.arrive : now, 7);
  const span = Math.max(14, daysBetween(first, endD));
  const all = s.ws.map(w => w.kg).concat([TARGET.lo, TARGET.hi, TARGET.startKg]);
  const lo = Math.floor(Math.min(...all) - 1), hi = Math.ceil(Math.max(...all) + .6);
  const padL = 18, padR = 40, padT = 14, padB = 26;
  const x = (d) => padL + (W - padL - padR) * daysBetween(first, d) / span;
  const y = (kg) => padT + (H - padT - padB) * (hi - kg) / (hi - lo);
  let svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + t('Weight trend against the 66 to 69 kg target band') + '">';
  for (let k = lo; k <= hi; k++) if (k % 2 === 0) svg += '<line class="grid" x1="' + padL + '" x2="' + (W - padR + 6) + '" y1="' + y(k) + '" y2="' + y(k) + '"/><text x="' + (W - padR + 10) + '" y="' + (y(k) + 4) + '">' + k + '</text>';
  svg += '<rect class="tband" x="' + padL + '" y="' + y(TARGET.hi) + '" width="' + (W - padL - padR) + '" height="' + (y(TARGET.lo) - y(TARGET.hi)) + '"/>';
  svg += '<line class="bandl" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y(TARGET.hi) + '" y2="' + y(TARGET.hi) + '"/><line class="bandl" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y(TARGET.lo) + '" y2="' + y(TARGET.lo) + '"/>';
  svg += '<text class="bl" x="' + (padL + 6) + '" y="' + (y(TARGET.lo) - 6) + '">' + t('Target {a}–{b} kg', { a: TARGET.lo, b: TARGET.hi }) + '</text>';
  const cEnd = addDays(s.start, 14);
  svg += '<rect class="cmark" x="' + x(s.start) + '" y="' + padT + '" width="' + Math.max(0, x(cEnd) - x(s.start)) + '" height="' + (H - padT - padB) + '"/><text x="' + (x(s.start) + 4) + '" y="' + (H - padB - 6) + '">' + t('creatine water') + '</text>';
  /* month ticks */
  const stepD = Math.max(7, Math.ceil(span / Math.max(1, Math.floor((W - padL - padR) / 64)) / 7) * 7);
  for (let i = 0; i <= span; i += stepD) { const d = addDays(first, i); svg += '<text x="' + x(d) + '" y="' + (H - 6) + '" text-anchor="' + (i === 0 ? 'start' : 'middle') + '">' + dateShort(d) + '</text>'; }
  s.ws.forEach((w, i) => { svg += '<circle class="pt' + (i === s.ws.length - 1 ? ' last' : '') + '" cx="' + x(w.d).toFixed(1) + '" cy="' + y(w.kg).toFixed(1) + '" r="' + (i === s.ws.length - 1 ? 4 : 3) + '"/>'; });
  if (s.trend.length > 1) {
    const pts = s.trend.map(p => [x(p.d), y(p.kg)]);
    let dd = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (let i = 1; i < pts.length; i++) { const p0 = pts[i - 1], p1 = pts[i], mx = (p0[0] + p1[0]) / 2; dd += 'C' + mx.toFixed(1) + ' ' + p0[1].toFixed(1) + ' ' + mx.toFixed(1) + ' ' + p1[1].toFixed(1) + ' ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1); }
    svg += '<path class="trend" d="' + dd + '"/>';
  }
  const fromD = s.trend.length ? s.trend[s.trend.length - 1].d : s.start, fromK = s.trend.length ? s.cur : TARGET.startKg;
  if (s.daysTo > 0 || !s.trend.length) {
    const toD = s.trend.length ? s.arrive : addDays(s.start, Math.ceil((TARGET.startKg - TARGET.hi) / (0.45 / 7)));
    svg += '<path class="proj" d="M' + x(fromD).toFixed(1) + ' ' + y(fromK).toFixed(1) + 'L' + x(toD).toFixed(1) + ' ' + y(TARGET.hi).toFixed(1) + '"/><circle class="arrive" cx="' + x(toD).toFixed(1) + '" cy="' + y(TARGET.hi).toFixed(1) + '" r="5"/>';
    if (!s.trend.length) svg += '<text class="bl" x="' + (x(s.start) + 8) + '" y="' + (y(TARGET.startKg) - 10) + '">' + t('The plan: 0.45 kg a week from 72 kg') + '</text>';
  }
  svg += '</svg>';
  el.innerHTML = svg;
}

async function fillShots(box, due) {
  const list = await photos.list('progress');
  box.innerHTML = '';
  const last = list[list.length - 1];
  const next = last ? addDays(last.date.slice(0, 10), 14) : ymd();
  due.innerHTML = '';
  due.append(h('span.lab', { text: last ? t('Next photo') : t('First photo') }), h('span.num', { text: next <= ymd() ? t('Today') : dateShort(next) }));
  if (!list.length) { box.append(h('div.none', { html: '<span class="lab">' + t('Same spot, same light') + '</span>' })); return; }
  list.slice(-6).reverse().forEach(p => {
    const u = URL.createObjectURL(p.blob);
    box.append(h('button', { type: 'button', 'aria-label': t('Photo from {d}', { d: dateShort(p.date.slice(0, 10)) }), onclick: () => openCompare(p.id) }, h('img', { src: u, alt: '' }), h('span.lab', { text: dateShort(p.date.slice(0, 10)) })));
  });
}

/* The camera, with a faint outline of the last photo so pose and distance match */
export function openCamera(done) {
  let stream = null, facing = 'user', timer = false, ghostUrl = null;
  const stop = () => { if (stream) stream.getTracks().forEach(x => x.stop()); stream = null; if (ghostUrl) URL.revokeObjectURL(ghostUrl); };
  openLayer({ cls: 'cam2', label: t('Progress photo'), onClose: stop, bar: [h('button.ghost.sm', { type: 'button', text: t('Flip'), onclick: () => { facing = facing === 'user' ? 'environment' : 'user'; start(); } })], build: async (b) => {
    const video = h('video', { playsinline: true, muted: true, autoplay: true });
    const ghost = h('img.ghost-img', { alt: '' });
    const msg = h('p.msg.lab');
    const tm = h('button.ghost.sm', { type: 'button', 'aria-pressed': 'false', text: t('10 s timer'), onclick: () => { timer = !timer; tm.setAttribute('aria-pressed', String(timer)); tm.textContent = timer ? t('Timer on') : t('10 s timer'); } });
    const fileBtn = h('button.ghost.sm', { type: 'button', text: t('From photos'), onclick: () => pickFile() });
    const shutter = h('button.shutter', { type: 'button', 'aria-label': t('Take the photo'), onclick: () => shoot() });
    add(b, h('div.cv', null, video, ghost, msg, h('div.ctl', null, tm, shutter, fileBtn)));
    const list = await photos.list('progress');
    if (list.length) { ghostUrl = URL.createObjectURL(list[list.length - 1].blob); ghost.src = ghostUrl; msg.textContent = t('Line yourself up with the last photo.'); }
    else msg.textContent = t('Same spot, same light, same time of day.');
    window.__camStart = start;
    async function start() {
      if (stream) stream.getTracks().forEach(x => x.stop());
      try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1440 } }, audio: false }); video.srcObject = stream; video.style.transform = facing === 'user' ? 'scaleX(-1)' : ''; ghost.style.transform = video.style.transform; await video.play(); }
      catch (e) { msg.textContent = t('The camera is not available. Pick a photo instead.'); shutter.disabled = true; }
    }
    async function shoot() {
      if (timer) { for (let i = 10; i > 0; i--) { msg.textContent = String(i); await new Promise(r => setTimeout(r, 1000)); } }
      const c = document.createElement('canvas'), w = video.videoWidth, hh = video.videoHeight; if (!w) return;
      c.width = w; c.height = hh; const g = c.getContext('2d');
      if (facing === 'user') { g.translate(w, 0); g.scale(-1, 1); }
      g.drawImage(video, 0, 0, w, hh);
      c.toBlob(async (bl) => { if (!bl) return; await save(await compress(new File([bl], 'p.jpg', { type: 'image/jpeg' }), 1600, .85)); }, 'image/jpeg', .92);
      sound('click');
    }
    function pickFile() {
      const inp = h('input', { type: 'file', accept: 'image/*', style: { display: 'none' } });
      inp.addEventListener('change', async () => { const f = inp.files && inp.files[0]; inp.remove(); if (f) { try { await save(await compress(f, 1600, .85)); } catch (e) { toast(t('That photo could not be read. Try another.')); } } });
      document.body.append(inp); inp.click();
    }
    async function save(blob) { await photos.put('progress', { id: 'p' + Date.now().toString(36), date: new Date().toISOString(), blob }); toast(t('Photo saved. Next one in two weeks.')); closeTop(); done && done(); }
    start();
  } });
}

/* Before and after, with a slider */
export function openCompare(focus) {
  openLayer({ cls: 'cmpl', label: t('Before and after'), build: async (b) => {
    const list = await photos.list('progress');
    add(b, h('h2.lttl', { text: t('Before and after') }));
    if (list.length < 2) { add(b, h('p.empty', { text: list.length ? t('One photo so far. The comparison starts with the second, two weeks on.') : t('No photos yet. The first one is the before.') })); return; }
    let ai = 0, bi = focus ? Math.max(1, list.findIndex(p => p.id === focus)) : list.length - 1;
    const urls = list.map(p => URL.createObjectURL(p.blob));
    const ia = h('img', { alt: '' }), ib = h('img.aft', { alt: '' }), ta = h('span.tag.a'), tb = h('span.tag.b');
    const cmp = h('div.cmp', { role: 'slider', 'aria-label': t('Before and after'), 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': '50', tabindex: '0' }, ia, ib, h('i.hnd'), ta, tb);
    const set = () => { ia.src = urls[ai]; ib.src = urls[bi]; ta.textContent = dateShort(list[ai].date.slice(0, 10)); tb.textContent = dateShort(list[bi].date.slice(0, 10)); };
    const move = (cx) => { const r = cmp.getBoundingClientRect(); const k = Math.max(0, Math.min(1, (cx - r.left) / r.width)); cmp.style.setProperty('--cx', (k * 100).toFixed(1) + '%'); cmp.setAttribute('aria-valuenow', String(Math.round(k * 100))); };
    cmp.addEventListener('pointerdown', (e) => { cmp.setPointerCapture(e.pointerId); move(e.clientX); });
    cmp.addEventListener('pointermove', (e) => { if (cmp.hasPointerCapture(e.pointerId)) move(e.clientX); });
    cmp.addEventListener('keydown', (e) => { const v = +cmp.getAttribute('aria-valuenow'); if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { const nv = Math.max(0, Math.min(100, v + (e.key === 'ArrowLeft' ? -5 : 5))); cmp.style.setProperty('--cx', nv + '%'); cmp.setAttribute('aria-valuenow', String(nv)); e.preventDefault(); } });
    const pick = (which) => h('div.cmpsel', null, ...list.map((p, i) => h('button', { type: 'button', 'aria-pressed': String((which === 'a' ? ai : bi) === i), 'aria-label': dateShort(p.date.slice(0, 10)), onclick: (e) => { if (which === 'a') ai = i; else bi = i; qsa('button', e.currentTarget.parentNode).forEach((x, j) => x.setAttribute('aria-pressed', String(j === i))); set(); } }, h('img', { src: urls[i], alt: '' }))));
    set();
    add(b, h('div', { style: { height: 'calc(var(--u)*14)' } }), cmp, h('p.lab', { style: { margin: 'calc(var(--u)*14) var(--m) 0' }, text: t('Before') }), pick('a'), h('p.lab', { style: { margin: 'calc(var(--u)*10) var(--m) 0' }, text: t('After') }), pick('b'),
      h('div.acts2', { style: { padding: '0 var(--m)' } }, h('button.ghost.warn', { type: 'button', text: t('Delete the after photo'), onclick: async () => { const p = list[bi]; await photos.del('progress', p.id); closeTop(); toast(t('Photo deleted.')); render(); } })));
  } });
}

function settingsSec() {
  const st = settings.get();
  const row = (label, sub, ctl, attrs) => h('button.set-r', Object.assign({ type: 'button' }, attrs || {}), h('span', null, h('b', { text: label }), sub ? h('span.lab', { text: sub }) : null), ctl);
  const tennisTimes = []; for (let m = 16 * 60; m <= 21 * 60; m += 30) tennisTimes.push(String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'));
  const sel = h('select.cu', { 'aria-label': t('Tennis starts'), style: { minHeight: '44px', padding: '0 12px', borderRadius: '2px', background: 'var(--bk2)', border: 0, boxShadow: 'inset 0 0 0 1.5px var(--edge)' } }, ...tennisTimes.map(x => h('option', { value: x, text: x })));
  sel.value = st.tennis || '18:30';
  sel.addEventListener('change', () => { settings.set({ tennis: sel.value }); toast(t('Tennis moved to {t}. The pre-tennis meal follows it.', { t: sel.value })); bus.emit('meals'); });
  const startIn = h('input', { type: 'date', value: st.start || '2026-11-03', 'aria-label': t('Programme start'), style: { minHeight: '44px', padding: '0 10px', borderRadius: '2px', background: 'var(--bk2)', border: 0, boxShadow: 'inset 0 0 0 1.5px var(--edge)', fontSize: '16px' } });
  startIn.addEventListener('change', () => { if (startIn.value) { settings.set({ start: startIn.value }); toast(t('Start date saved.')); } });
  const gym = st.gym || {};
  const eq = h('div.eqg', null, ...EQUIPMENT.map(q => h('button', { type: 'button', 'aria-pressed': String(gym[q.id] !== false), onclick: (e) => { const g = settings.get().gym || {}; g[q.id] = g[q.id] === false; settings.set({ gym: g }); e.currentTarget.setAttribute('aria-pressed', String(g[q.id] !== false)); }, html: '<span>' + t(q.name) + '</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5.2 5.2L20 6.5"/></svg>' })));
  const imp = h('input', { type: 'file', accept: 'application/json,.json', style: { display: 'none' } });
  imp.addEventListener('change', async () => {
    const f = imp.files && imp.files[0]; if (!f) return;
    try { const r = await importAll(JSON.parse(await f.text())); toast(t('Restored: {m} meals, {w} weigh-ins, {p} photos.', { m: r.meals, w: r.weights, p: r.photos })); setTimeout(() => location.reload(), 1400); }
    catch (e) { toast(t('That file is not a backup from this app.')); }
    imp.value = '';
  });
  return h('section.sec', null,
    h('h2.sh2', { text: t('Settings') }),
    h('div.set-l', null,
      row(t('Language'), lang() === 'ar' ? 'English' : 'العربية', h('span.val', { text: lang() === 'ar' ? 'العربية' : 'English' }), { onclick: () => { settings.set({ lang: lang() === 'ar' ? 'en' : 'ar' }); location.reload(); } }),
      row(t('Sound'), t('A click on each set, a pock when rest ends'), h('span.tog'), { role: 'switch', 'aria-checked': String(!st.mute), onclick: (e) => { const m = !settings.get().mute; settings.set({ mute: m }); e.currentTarget.setAttribute('aria-checked', String(!m)); if (!m) sound('pock'); } }),
      h('div.set-r', null, h('span', null, h('b', { text: t('Tennis starts') }), h('span.lab', { text: t('Pre-tennis meal is 90 minutes before') })), sel),
      h('div.set-r', null, h('span', null, h('b', { text: t('Programme start') }), h('span.lab', { text: t('Sets the week number') })), startIn)),
    h('h3.sh2', { style: { marginTop: 'calc(var(--u)*30)', fontSize: 'calc(var(--u)*22)' }, text: t('My gym has') }),
    h('p.sdesc', { text: t('Swaps that need kit your gym lacks are marked.') }),
    h('div', { style: { margin: '0 calc(var(--m)*-1)' } }, eq),
    h('h3.sh2', { style: { marginTop: 'calc(var(--u)*30)', fontSize: 'calc(var(--u)*22)' }, text: t('Backup') }),
    h('p.sdesc', { text: t('Everything the app remembers lives on this phone only: added meals, weigh-ins, last lifts and photos. Export a backup to move it to another device or keep it safe.') }),
    h('div.acts2', null,
      h('button.ghost', { type: 'button', text: t('Import'), onclick: () => imp.click() }),
      h('button.go', { type: 'button', html: '<span>' + t('Export') + '</span>', onclick: async () => {
        const data = await exportAll(), blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const name = 'the-cut-backup-' + ymd() + '.json', file = new File([blob], name, { type: 'application/json' });
        try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: name }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
        const a = h('a', { href: URL.createObjectURL(blob), download: name }); document.body.append(a); a.click(); a.remove(); toast(t('Backup saved to your downloads.'));
      } })), imp);
}
