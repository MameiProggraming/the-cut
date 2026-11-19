/* Train: today's session up front, what it works, the week, the three sessions and every move's card. */
import { h, add, qs, qsa, t, tr, fmt1, ex, exName, SESSIONS, WEEK, ALTS, EQUIPMENT, hasEquipment, weekNo, dow, sessionFor, nextSession, dayName, dayShort, CHECK, bus, toast, sound } from './core.js';
import { lifts, today as day, week as wk, settings, ymd, addDays } from './store.js';
import { openLayer, closeTop } from './sheet.js';
import { pair, still } from './figure.js';
import { muscleMap, sessionMuscles, WORKS } from './muscle.js';
import { PLAN } from './data/program.js';

let root, ctx, sel = null;
const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>', MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>';
export const restFor = (e) => e && e.kind === 'isolation' ? 60 : 90;
export const sessName = (s) => tr('sessions', s.id, 'title', s.title);
export function repsText(m) { return m.sets + ' × ' + m.reps + (m.unit === 'm' ? ' m' : '') + (m.per ? ' / ' + t(m.per) : ''); }
export function moveEx(s, i) { const sw = day.get().swaps[s.id + ':' + i]; return ex(sw || s.moves[i].ex); }
export const loadStep = (e) => e.load === 'each' ? 1 : 2.5;
export function loadLabel(e, kg) {
  if (kg == null) return t('Not set');
  if (e.load === 'body') return kg ? '+' + fmt1(kg).replace('.0', '') + ' kg' : t('Bodyweight');
  return fmt1(kg).replace('.0', '') + ' kg';
}
export function loadUnit(e) { return { each: t('each hand'), assist: t('assistance'), stack: t('on the stack'), total: t('total'), body: t('added') }[e.load] || ''; }

export function mountTrain(el, c) {
  root = el; ctx = c;
  bus.on('today', () => { if (document.getElementById('phone').dataset.view === 'train') render(); });
  bus.on('lang', render);
  render();
}
export function showTrain() { render(); }

function featured() {
  const s = sessionFor();
  if (s) return { s, when: t('Today, {d}', { d: dayName(dow()) }), today: true };
  const n = nextSession(addDays(ymd(), 1));
  return n ? { s: n.s, when: n.in === 0 ? t('Tomorrow') : dayName(dow(n.day)), today: false } : { s: SESSIONS.A, when: '', today: false };
}

function render() {
  const f = featured(), s = f.s, st = day.get(), w = wk.get(weekNo());
  if (!sel) sel = s.id;
  const phone = document.getElementById('phone');
  root.innerHTML = '';
  root.style.setProperty('--sl', s.light);
  const done = st.done === s.id;
  const hero = h('header.hero.train-hero', { style: { '--li': s.light, '--lic': s.lic } },
    h('div.pic', null, h('img', { src: 'art/gym-w0.webp', alt: '' }), h('img', { src: 'art/gym-w1.webp', alt: '', style: { opacity: done ? 1 : .35 } })),
    h('div.grain'),
    h('div.vtop', null, h('span.lab', { text: t('Week {n}', { n: weekNo() }) }), h('span.lab', { text: t('Session {s}', { s: s.id }) })),
    h('span.sletter', { 'aria-hidden': 'true', text: s.id }),
    h('div.ht', null,
      h('h1.vttl', { text: sessName(s) }),
      h('div.twhen', null, h('span.lab', { text: f.when }), h('span.lab', { text: t('{n} moves', { n: s.moves.length }) }), h('span.lab', { text: '3 × 8–15' }))));
  const go = h('button.go', { type: 'button', 'aria-pressed': String(done), html: CHECK + '<span>' + (done ? t('Done today') : f.today ? t('Start') : t('Start Session {s}', { s: s.id })) + '</span>', onclick: () => ctx.startLive(s) });
  const lit = sessionMuscles(s), wkM = new Set();
  Object.keys(w.done).forEach(id => { if (SESSIONS[id]) sessionMuscles(SESSIONS[id]).forEach(m => wkM.add(m)); });
  const intro = h('section.sec', { style: { paddingTop: 'calc(var(--u)*18)', '--li': s.light, '--lic': s.lic } },
    h('p.sdesc', { text: tr('sessions', s.id, 'note', s.note) }),
    h('div.acts2', null, go),
    h('h2.sh2', { style: { marginTop: 'calc(var(--u)*34)' }, text: t('What it works') }),
    h('div.mmap', { html: muscleMap(lit, wkM, [t('Front of the body'), t('Back of the body'), t('Front'), t('Back')]) }),
    h('div.mkey.lab', null, h('span', null, h('i'), t('Session {s}', { s: s.id })), h('span', null, h('i.wk'), t('Done this week')), h('span', null, h('i.off'), t('Rested'))));

  const today = dow();
  const wkRows = WEEK.map((d, i) => {
    const sessDone = d.gym && w.done[d.gym];
    return h('div.wd' + (i === today ? '.now' : ''), null,
      h('span.dn', { text: dayShort(i) }),
      h('span.ev', null, d.rest ? t('Full rest') : [d.gym ? t('Session {s}', { s: d.gym }) : null, d.gym && d.tennis ? h('span.lab', { text: t('then tennis') }) : !d.gym && d.tennis ? t('Tennis') : null]),
      h('span.st', { html: sessDone ? CHECK + t('Done') : d.hardest ? t('Push hardest') : d.tennis && !d.gym ? (settings.get().tennis || '18:30') : d.gym ? '07:00' : '' }));
  });
  const weekSec = h('section.sec', null, h('h2.sh2', { text: t('The week') }), h('p.sdesc', { text: t('Three gym sessions and five of tennis. Friday is the only day nothing follows, so it is the one to empty the tank on.') }), h('div.wk7', null, ...wkRows));

  const reel = h('section.sec', null, h('h2.sh2', { text: t('The sessions') }));
  const seg = h('div.reelseg', { role: 'tablist', 'aria-label': t('Sessions') }, ...Object.values(SESSIONS).map(x => h('button', { type: 'button', role: 'tab', 'aria-selected': String(x.id === sel), style: { '--sl': x.light }, onclick: () => { sel = x.id; render(); } }, h('b', { text: x.id }), h('span', { text: dayName(x.day) }))));
  const rs = SESSIONS[sel];
  const rows = rs.moves.map((m, i) => {
    const e = moveEx(rs, i), swapped = e.id !== m.ex, lw = lifts.get(e.id);
    const b = h('button.mvrow', { type: 'button', onclick: () => openExercise(e.id, b, { session: rs, idx: i }) },
      h('span.num.ix', { text: String(i + 1).padStart(2, '0') }),
      h('span', null, h('span.nm', { text: exName(e) }), h('span.lab', { html: swapped ? '<span class="sw">' + t('Swapped today') + '</span>' : (m.hint ? t(m.hint) : t(e.pattern === 'rotation' ? 'Rotation' : e.pattern[0].toUpperCase() + e.pattern.slice(1))) })),
      h('span.rp', null, h('span.num', { text: repsText(m) }), h('span.lab', { text: lw && lw.kg != null ? t('Last {w}', { w: loadLabel(e, lw.kg) }) : t('Rest {n} s', { n: restFor(e) }) })));
    return b;
  });
  add(reel, seg, h('div.rhead', { style: { '--li': rs.light } }, h('h3.sh2', { style: { fontSize: 'calc(var(--u)*26)' }, text: sessName(rs) }), h('p.sdesc', { text: tr('sessions', rs.id, 'note', rs.note) })), h('div.mvl', null, ...rows),
    rs.id !== s.id || !f.today ? h('div.acts2', null, h('button.ghost', { type: 'button', text: t('Start Session {s}', { s: rs.id }), onclick: () => ctx.startLive(rs) })) : null);
  const tennis = h('section.sec', null,
    h('h2.sh2', { text: t('What this does for tennis') }), h('p.sdesc', { text: tr('plan', 'tennis', 'v', PLAN.tennis) }),
    h('div.callout', null, h('b', { text: t('Two reps in reserve on every set.') }), h('p', { text: t('You are on court again in about ten hours. Grinding to failure in the morning is what ruins the evening session.') })));
  root.append(h('div.vs', null, h('div.vin', null, hero, intro, weekSec, reel, tennis)));
}

/* The exercise card */
export function openExercise(id, from, o = {}) {
  openLayer({ from, cls: 'exs', label: exName(ex(id)), build: (b) => fill(b, id, o) });
}
function fill(b, id, o) {
  const e = ex(id); if (!e) return;
  const s = o.session, i = o.idx, move = s ? s.moves[i] : null, orig = move ? move.ex : id;
  b.innerHTML = '';
  if (s) b.style.setProperty('--li', s.light), b.style.setProperty('--lic', s.lic);
  const lw = lifts.get(e.id);
  let kg = lw && lw.kg != null ? lw.kg : null;
  const val = h('span.num', { html: kg == null ? '–' : loadLabel(e, kg).replace(' kg', '<small> kg</small>') });
  const lab = h('span.lab', { text: kg == null ? t('Set your working weight') : t('Last lifted, {u}', { u: loadUnit(e) }) });
  const setKg = (d) => {
    kg = Math.max(0, Math.round(((kg == null ? (e.load === 'each' ? 10 : e.load === 'body' ? 0 : 20) - d : kg) + d) * 10) / 10);
    lifts.set(e.id, kg); val.innerHTML = loadLabel(e, kg).replace(' kg', '<small> kg</small>'); lab.textContent = t('Last lifted, {u}', { u: loadUnit(e) });
    sound('click'); bus.emit('lifts');
  };
  const cues = tr('exercises', e.id, 'cues', e.cues);
  const eq = (e.equipment || []).map(q => { const x = EQUIPMENT.find(y => y.id === q); return x ? t(x.name) : q; }).join(', ');
  add(b, 
    h('div', { html: pair(e.id) }),
    h('div.exhead', null,
      h('h2', { text: exName(e) + (move && move.hint && orig === e.id ? '' : '') }),
      h('div.exmeta', null,
        move ? h('span.num', { text: repsText(move) }) : null,
        h('span.lab', { text: t('Rest {n} s', { n: restFor(e) }) }),
        h('span.lab', { text: t(e.pattern[0].toUpperCase() + e.pattern.slice(1)) }),
        eq ? h('span.lab', { text: eq }) : null),
      move && move.hint && orig === e.id ? h('p.estn', { text: t(move.hint) }) : null),
    h('div.lw', null,
      h('button', { type: 'button', 'aria-label': t('Less weight'), html: MINUS, onclick: () => setKg(-loadStep(e)) }),
      h('div.v', null, val, lab),
      h('button', { type: 'button', 'aria-label': t('More weight'), html: PLUS, onclick: () => setKg(loadStep(e)) })),
    h('ol.cues', null, ...cues.map((c, n) => h('li', null, h('b.num', { text: String(n + 1) }), h('span', { text: c })))),
    h('div.exnote', null, h('span.lab', { text: t('The most common mistake') }), h('p', { text: tr('exercises', e.id, 'mistake', e.mistake) })),
    h('div.exnote', null, h('span.lab', { text: t('On court') }), h('p', { text: tr('exercises', e.id, 'tennis', e.tennis) })),
    move ? alts(b, e, o) : null);
}
function alts(b, cur, o) {
  const s = o.session, i = o.idx, orig = s.moves[i].ex;
  const list = [orig].concat(ALTS[orig] || []).filter(x => x !== cur.id);
  const yest = addDays(ymd(), -1);
  const box = h('section.alts', null, h('h3.sh2', { style: { fontSize: 'calc(var(--u)*24)' }, text: cur.id === orig ? t('Swap it') : t('Swapped from {n}', { n: exName(ex(orig)) }) }),
    h('p.sdesc', { text: t('Same movement pattern. Pick one and it replaces this move for today.') }));
  list.forEach(aid => {
    const a = ex(aid); if (!a) return;
    const ok = hasEquipment(a), lw = lifts.get(aid);
    const flags = [];
    if (aid === orig) flags.push(t('The original'));
    if (!ok) flags.push(t('Your gym lacks the kit'));
    if (lw && lw.date === yest) flags.push('<span class="flag">' + t('Done yesterday') + '</span>');
    const btn = h('button.alt', { type: 'button', 'aria-disabled': String(!ok), onclick: () => {
      day.patch(d => { if (aid === orig) delete d.swaps[s.id + ':' + i]; else d.swaps[s.id + ':' + i] = aid; });
      sound('click'); bus.emit('today'); fill(b, aid, o); b.scrollTop = 0;
      toast(aid === orig ? t('Back to {n}.', { n: exName(a) }) : t('{n} replaces it today.', { n: exName(a) }));
    } }, h('span.thumb', { html: still(aid, 'b') }), h('span', null, h('span.nm', { text: exName(a) }), h('span.lab', { html: (flags.join(' · ') || (a.equipment || []).map(q => { const x = EQUIPMENT.find(y => y.id === q); return x ? t(x.name) : q; }).join(', ') || t('No kit needed')) })));
    add(box, btn);
  });
  return box;
}
