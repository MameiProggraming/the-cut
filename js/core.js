/* Shared helpers: elements, language, the data as the app sees it, the day's plan, sound and the toast. */
import { SESSIONS, MOBILITY, WEEK, SLOTS, PRE_GYM, TARGET, START } from './data/program.js';
import { MEALS } from './data/meals.js';
import { EXERCISES, ALTS, EQUIPMENT } from './data/exercises.js';
import { bank, settings, ymd, parseYmd, daysBetween, addDays, today } from './store.js';

export const $ = (id) => document.getElementById(id);
export const qs = (s, r = document) => r.querySelector(s);
export const qsa = (s, r = document) => [].slice.call(r.querySelectorAll(s));
export const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
export const lerp = (a, b, t) => a + (b - a) * t;
export const reduce = () => matchMedia('(prefers-reduced-motion:reduce)').matches;
export const fmt = (v) => Math.round(v).toLocaleString('en-GB');
export const fmt1 = (v) => (Math.round(v * 10) / 10).toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/* h('div.a.b', {attrs}, children...) */
export function h(tag, attrs, ...kids) {
  let id = null;
  tag = tag.replace(/#([\w-]+)/, (_, x) => { id = x; return ''; });
  const m = tag.split('.'), el = document.createElement(m[0] || 'div');
  if (m.length > 1) el.className = m.slice(1).join(' ');
  if (id) el.id = id;
  if (attrs) for (const k in attrs) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k === 'html') el.innerHTML = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    /* Custom properties (a session's --li) only take through setProperty; Object.assign drops them */
    else if (k === 'style' && typeof v === 'object') { for (const p in v) { if (p.startsWith('--')) el.style.setProperty(p, v[p]); else el.style[p] = v[p]; } }
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat(9)) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c)));
  return el;
}
/* append, skipping empty children */
export function add(el, ...kids) { for (const c of kids.flat(9)) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c))); return el; }
export const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5.2 5.2L20 6.5"/></svg>';
export const CHEV = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>';

/* Language. English is written in the code; Arabic is looked up by the English string, or by id for content. */
let AR = null, AR_DATA = null;
export function lang() { return settings.get().lang; }
export async function loadLang() {
  if (lang() !== 'ar' || AR) return;
  try { const m = await import('./data/ar.js'); AR = m.AR || {}; AR_DATA = m.AR_DATA || {}; } catch (e) { AR = {}; AR_DATA = {}; }
}
export function t(s, vars) {
  let out = (lang() === 'ar' && AR && AR[s]) || s;
  if (vars) out = out.replace(/\{(\w+)\}/g, (_, k) => vars[k] != null ? vars[k] : '');
  return out;
}
/* Content: tr('meals', id, 'name', fallback) */
export function tr(kind, id, field, fallback) {
  if (lang() !== 'ar' || !AR_DATA || !AR_DATA[kind] || !AR_DATA[kind][id]) return fallback;
  const v = AR_DATA[kind][id][field];
  return v == null ? fallback : v;
}
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS3 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const dayName = (i) => t(DAYS[i]);
export const dayShort = (i) => t(DAYS3[i]);
export const monShort = (i) => t(MONTHS[i]);
export function dateShort(s) { const d = parseYmd(s); return d.getDate() + ' ' + monShort(d.getMonth()); }

/* Meals as the app sees them: the starter bank with his edits and removals, plus what he added */
export function allMeals() {
  const b = bank.get();
  const list = MEALS.filter(m => !b.removed.includes(m.id)).map(m => b.edits[m.id] ? Object.assign({}, m, b.edits[m.id], { id: m.id, starter: true, edited: true }) : Object.assign({ starter: true }, m));
  return list.concat(b.added.map(m => Object.assign({ added: true }, m)));
}
export function mealById(id) {
  if (id === PRE_GYM.id) return PRE_GYM;
  const b = bank.get();
  const s = MEALS.find(m => m.id === id);
  if (s) return b.edits[id] ? Object.assign({}, s, b.edits[id], { id, starter: true, edited: true }) : Object.assign({ starter: true }, s);
  return b.added.find(m => m.id === id) || null;
}
export const mealName = (m) => m ? tr('meals', m.id, 'name', m.name) : '';

export function ex(id) { return EXERCISES[id] ? Object.assign({ id }, EXERCISES[id]) : null; }
export const exName = (e) => e ? tr('exercises', e.id, 'name', e.name) : '';
export { SESSIONS, MOBILITY, WEEK, SLOTS, TARGET, EXERCISES, ALTS, EQUIPMENT, START };

/* My gym: which equipment it has. Unknown means assume yes. */
export function hasEquipment(e) {
  const g = settings.get().gym;
  if (!g) return true;
  return (e.equipment || []).every(id => g[id] !== false);
}

/* The calendar of the programme */
export function weekNo(d = ymd()) {
  const s = parseYmd(settings.get().start || START);
  const sunday = ymd(new Date(s.getFullYear(), s.getMonth(), s.getDate() - s.getDay()));
  return Math.max(1, Math.floor(daysBetween(sunday, d) / 7) + 1);
}
export function dow(d = ymd()) { return parseYmd(d).getDay(); }
export function sessionFor(d = ymd()) { const g = WEEK[dow(d)].gym; return g ? SESSIONS[g] : null; }
/* Mobility days: the days without the gym carry M1 or M2 */
export function mobFor(d = ymd()) { const m = WEEK[dow(d)].mob; return m ? MOBILITY[m] : null; }
export const sessById = (id) => SESSIONS[id] || MOBILITY[id] || null;
/* Rough length of a mobility session, to the nearest 5 minutes: reps at 4 s each, holds as written, 10 s to change over */
export function mobMinutes(s) { let sec = 0; for (const m of s.moves) { const sides = m.per ? 2 : 1, one = m.hold ? m.hold : (parseInt(m.reps, 10) || 8) * 4; sec += m.sets * sides * (one + 10) + 20; } return Math.max(5, Math.round(sec / 300) * 5); }
export function nextSession(d = ymd()) {
  for (let i = 0; i < 8; i++) { const day = addDays(d, i), s = sessionFor(day); if (s) return { s, day, in: i }; }
  return null;
}
export function hm(s) { const [a, b] = s.split(':').map(Number); return a * 60 + b; }
export function nowMin() { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
export function minToHm(m) { m = (m + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }

/* The slots for a given day, with the meal picked for each */
export function daySlots(d = ymd()) {
  const w = WEEK[dow(d)], st = today.get(), tennis = settings.get().tennis || '18:30';
  return SLOTS.filter(s => (!s.gymOnly || w.gym) && (!s.tennisOnly || w.tennis) && (!s.noTennisOnly || !w.tennis)).map(s => {
    const time = s.id === 'fuel' ? minToHm(hm(tennis) - 90) : s.time;
    let note = s.note;
    if (s.id === 'breakfast' && !w.gym) note = s.noteRest;
    if (s.id === 'dinner' && !w.tennis) note = s.noteRest;
    if (s.id === 'lunch' && !w.tennis) note = 'Your biggest carb portion';
    const pick = mealById(st.picks[s.id]) || mealById(s.meal) || allMeals().find(m => m.cat === s.cat) || null;
    return Object.assign({}, s, { time, note, mealObj: pick, eaten: !!st.eaten[s.id] });
  });
}
export function totals() {
  const st = today.get(); let p = 0, k = 0;
  for (const s of daySlots()) if (s.eaten && s.mealObj) { p += s.mealObj.p; k += s.mealObj.k; }
  for (const id of st.extras) { const m = mealById(id); if (m) { p += m.p; k += m.k; } }
  return { p, k, left: Math.max(0, TARGET.kcal - k), over: Math.max(0, k - TARGET.kcal) };
}
/* What should I eat next: the bank meal that best closes the protein gap within the calories left */
export function suggest() {
  const { p, k } = totals(), gap = TARGET.protein - p, left = TARGET.kcal - k;
  if (gap <= 0) return null;
  const pending = daySlots().filter(s => !s.eaten && s.mealObj && !s.optional);
  const pendK = pending.reduce((a, s) => a + s.mealObj.k, 0), pendP = pending.reduce((a, s) => a + s.mealObj.p, 0);
  /* If what is still planned closes the gap within budget, the plan is the answer */
  if (pending.length && pendP >= gap && pendK <= left + 60) return { plan: true, slot: pending[0], gap, left };
  let best = null, bestScore = -1;
  for (const m of allMeals()) {
    if (m.k > left) continue;
    const cover = Math.min(m.p, gap) / gap, waste = m.k / Math.max(1, left);
    const score = cover - waste * 0.18 + (m.p / m.k) * 0.6;
    if (score > bestScore) { best = m; bestScore = score; }
  }
  return best ? { meal: best, gap, left } : { none: true, gap, left };
}

/* Sound, used sparingly: a soft click when a set is completed, a tennis-ball pock when rest ends. Starts only after a tap. */
let ac = null;
function ctx() {
  if (settings.get().mute) return null;
  try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac; } catch (e) { return null; }
}
export function unlockAudio() { if (!settings.get().mute) ctx(); }
export function sound(kind) {
  const a = ctx(); if (!a) return;
  const t0 = a.currentTime + 0.005, out = a.createGain(); out.gain.value = 0.9; out.connect(a.destination);
  if (kind === 'click') {
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(2300, t0); o.frequency.exponentialRampToValueAtTime(900, t0 + 0.03);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.32, t0 + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.05);
    o.connect(g).connect(out); o.start(t0); o.stop(t0 + 0.06);
  } else {
    /* pock: a hollow ball off strings, a quick pitch drop over a felt transient */
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(520, t0); o.frequency.exponentialRampToValueAtTime(190, t0 + 0.09);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.7, t0 + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
    o.connect(g).connect(out); o.start(t0); o.stop(t0 + 0.18);
    const n = a.createBufferSource(), b = a.createBuffer(1, a.sampleRate * 0.03, a.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
    const f = a.createBiquadFilter(), ng = a.createGain(); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 0.8; ng.gain.value = 0.35;
    n.buffer = b; n.connect(f).connect(ng).connect(out); n.start(t0);
  }
}

/* Toast */
let toastT;
export function toast(msg, action) {
  const el = $('toast'); if (!el) return;
  el.innerHTML = '';
  el.append(h('span', { text: msg }));
  if (action) el.append(h('button', { type: 'button', text: action.label, onclick: () => { el.classList.remove('on'); action.run(); } }));
  el.classList.add('on'); el.classList.toggle('act', !!action);
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), action ? 4200 : 2600);
}

/* A shared bus so screens can ask each other to refresh */
const subs = {};
export const bus = {
  on(ev, fn) { (subs[ev] = subs[ev] || []).push(fn); },
  emit(ev, x) { (subs[ev] || []).forEach(fn => { try { fn(x); } catch (e) { console.error(e); } }); }
};

/* Numbers that roll: each changed digit slides out and the new one slides in */
export function setNum(n, str) {
  if (!n) return;
  const old = n.dataset.v || n.textContent; n.dataset.v = str;
  if (old === str) return;
  let html = '';
  for (let i = 0; i < str.length; i++) {
    const o = old[old.length - str.length + i], c = str[i];
    if (reduce() || o === c) html += '<span class="c">' + c + '</span>';
    else html += '<span class="c" style="--i:' + i + '"><span class="o">' + (o === undefined ? '' : o) + '</span><span class="n">' + c + '</span></span>';
  }
  n.innerHTML = html;
}
export function setNumRaw(n, v) { if (n) { n.dataset.v = v; n.textContent = v; } }
