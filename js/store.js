/* Everything the app remembers. Three things persist over time: weight, progress photos and the last weight
   lifted on each exercise. Added meals persist because entering a meal is paid once, ever. Today's picks and
   ticks reset each morning. Every read and write is guarded: the app must render with storage gone. */

const P = 'rt1.';
const mem = {};

function read(k, fallback) {
  try {
    const v = localStorage.getItem(P + k);
    if (v == null) return k in mem ? mem[k] : fallback;
    return JSON.parse(v);
  } catch (e) { return k in mem ? mem[k] : fallback; }
}
function write(k, v) {
  mem[k] = v;
  try { localStorage.setItem(P + k, JSON.stringify(v)); return true; } catch (e) { return false; }
}

/* Dates, always local */
export function ymd(d = new Date()) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
export function parseYmd(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
export function addDays(s, n) { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); }
export function daysBetween(a, b) { return Math.round((parseYmd(b) - parseYmd(a)) / 864e5); }

/* Settings */
const DEFAULT_SETTINGS = { lang: 'en', mute: false, tennis: '18:30', start: '2026-11-03', gym: null };
export const settings = {
  get() { return Object.assign({}, DEFAULT_SETTINGS, read('settings', {})); },
  set(patch) { const s = Object.assign(this.get(), patch); write('settings', s); return s; }
};

/* The meal bank: starter meals are in the source; this holds what he added, what he changed and what he removed */
export const bank = {
  get() { return Object.assign({ added: [], edits: {}, removed: [] }, read('bank', {})); },
  save(b) { return write('bank', b); }
};

/* Last weight lifted per exercise: { kg, date } */
export const lifts = {
  all() { return read('lifts', {}); },
  get(id) { return this.all()[id] || null; },
  set(id, kg) { const a = this.all(); a[id] = { kg, date: ymd() }; write('lifts', a); return a[id]; },
  touch(id) { const a = this.all(); if (a[id]) { a[id].date = ymd(); write('lifts', a); } else { a[id] = { kg: null, date: ymd() }; write('lifts', a); } }
};

/* Morning weigh-ins: [{ d:'2026-11-10', kg:71.6 }] sorted by date */
export const weights = {
  all() { return read('weights', []).slice().sort((a, b) => a.d < b.d ? -1 : 1); },
  set(d, kg) { const a = this.all().filter(w => w.d !== d); if (kg != null) a.push({ d, kg }); a.sort((x, y) => x.d < y.d ? -1 : 1); write('weights', a); return a; }
};

/* Today: resets each morning */
function blankDay(d) { return { date: d, eaten: {}, picks: {}, extras: [], ticks: {}, done: null, swaps: {} }; }
export const today = {
  get() { const t = read('today', null); const d = ymd(); return t && t.date === d ? Object.assign(blankDay(d), t) : blankDay(d); },
  save(t) { return write('today', t); },
  patch(fn) { const t = this.get(); fn(t); this.save(t); return t; }
};

/* This week's completed sessions, for the muscle map and the week-sealed moment */
export const week = {
  get(n) { const w = read('week', null); return w && w.n === n ? w : { n, done: {} }; },
  mark(n, s) { const w = this.get(n); w.done[s] = ymd(); write('week', w); return w; },
  unmark(n, s) { const w = this.get(n); delete w.done[s]; write('week', w); return w; }
};

export const shop = {
  get() { return Object.assign({ counts: {}, ticked: {} }, read('shop', {})); },
  save(s) { return write('shop', s); }
};

export const flags = {
  get(k) { return read('flag.' + k, null); },
  set(k, v) { return write('flag.' + k, v); }
};

/* Photos live in IndexedDB: progress photos and his food photos are too large for localStorage */
let dbp = null;
function db() {
  if (dbp) return dbp;
  dbp = new Promise((res, rej) => {
    try {
      const r = indexedDB.open('rashed-training', 1);
      r.onupgradeneeded = () => {
        const d = r.result;
        if (!d.objectStoreNames.contains('progress')) d.createObjectStore('progress', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('food')) d.createObjectStore('food', { keyPath: 'id' });
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    } catch (e) { rej(e); }
  }).catch(() => null);
  return dbp;
}
function tx(store, mode, fn) {
  return db().then(d => {
    if (!d) return null;
    return new Promise((res, rej) => {
      try {
        const t = d.transaction(store, mode), s = t.objectStore(store);
        const out = fn(s);
        t.oncomplete = () => res(out && 'result' in out ? out.result : out);
        t.onerror = () => rej(t.error);
      } catch (e) { rej(e); }
    });
  }).catch(() => null);
}
export const photos = {
  list(store) { return tx(store, 'readonly', s => s.getAll()).then(a => (a || []).sort((x, y) => x.date < y.date ? -1 : 1)); },
  get(store, id) { return tx(store, 'readonly', s => s.get(id)); },
  put(store, rec) { return tx(store, 'readwrite', s => s.put(rec)); },
  del(store, id) { return tx(store, 'readwrite', s => s.delete(id)); }
};

/* Downscale and compress a photo before it is stored */
export function compress(file, max = 1600, q = 0.82) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(im.naturalWidth * k); c.height = Math.round(im.naturalHeight * k);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? res(b) : rej(new Error('compress')), 'image/jpeg', q);
    };
    im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('image')); };
    im.src = url;
  });
}

function blobToData(b) { return new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.onerror = () => r(null); f.readAsDataURL(b); }); }
function dataToBlob(s) { return fetch(s).then(r => r.blob()); }

/* The backup: everything the app remembers, in one JSON file */
export async function exportAll() {
  const out = { app: 'rashed-training', version: 1, exported: new Date().toISOString(),
    settings: settings.get(), bank: bank.get(), lifts: lifts.all(), weights: weights.all(), progress: [], food: [] };
  for (const st of ['progress', 'food']) {
    const list = await photos.list(st);
    for (const p of list) out[st].push(Object.assign({}, p, { blob: undefined, data: p.blob ? await blobToData(p.blob) : null }));
  }
  return out;
}
export async function importAll(obj) {
  if (!obj || obj.app !== 'rashed-training') throw new Error('not-backup');
  if (obj.settings) write('settings', obj.settings);
  if (obj.bank) write('bank', obj.bank);
  if (obj.lifts) write('lifts', obj.lifts);
  if (obj.weights) write('weights', obj.weights);
  let n = 0;
  for (const st of ['progress', 'food']) {
    for (const p of obj[st] || []) {
      if (!p.data) continue;
      const rec = Object.assign({}, p); delete rec.data; rec.blob = await dataToBlob(p.data);
      await photos.put(st, rec); n++;
    }
  }
  return { meals: (obj.bank && obj.bank.added || []).length, weights: (obj.weights || []).length, photos: n };
}
