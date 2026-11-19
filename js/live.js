/* Live session mode: one move full-screen, sets as large tap marks, the rest timer as a film leader counting
   down to the next set, the next move previewed, the screen kept awake. Nothing is saved but the last weight. */
import { h, add, $, qs, qsa, t, tr, fmt, ex, exName, weekNo, CHECK, bus, toast, sound, SESSIONS } from './core.js';
import { lifts, today as day, week as wk, weights, ymd } from './store.js';
import { openLayer, closeTop } from './sheet.js';
import { play, still } from './figure.js';
import { moveEx, repsText, restFor, loadLabel, loadUnit, loadStep, sessName, openExercise } from './train.js';
import { shareCanvas } from './card.js';

const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>', MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>';
let lock = null, redraw = null;
bus.on('today', () => { if (redraw) redraw(); });
async function wake(on) {
  try {
    if (on && 'wakeLock' in navigator) { lock = await navigator.wakeLock.request('screen'); }
    else if (!on && lock) { await lock.release(); lock = null; }
  } catch (e) { lock = null; }
}

export function startLive(s) {
  const phone = $('phone');
  const state = { i: 0, sets: s.moves.map(m => new Array(m.sets).fill(false)), t0: Date.now(), timer: null, stopFig: () => {} };
  const first = state.sets.findIndex(x => x.some(v => !v)); state.i = Math.max(0, first);
  const onVis = () => { if (document.visibilityState === 'visible' && phone.classList.contains('live-on')) wake(true); };
  openLayer({ cls: 'live', label: t('Session {s}, live', { s: s.id }), closeText: t('End'),
    onClose: () => { redraw = null; state.stopFig(); clearInterval(state.timer); wake(false); phone.classList.remove('live-on'); document.removeEventListener('visibilitychange', onVis); bus.emit('today'); },
    build: (b, layer) => {
      layer.style.setProperty('--li', s.light); layer.style.setProperty('--lic', s.lic);
      phone.classList.add('live-on');
      wake(true); document.addEventListener('visibilitychange', onVis);
      draw(b, s, state);
      redraw = () => { if (!qs('.leader.on', b) && !qs('.fin', b)) { const k = moveEx(s, state.i).id; if (k !== state.ex) draw(b, s, state); } };
    } });
}

function draw(b, s, st) {
  st.stopFig();
  b.innerHTML = '';
  const m = s.moves[st.i], e = moveEx(s, st.i), sets = st.sets[st.i];
  st.ex = e.id;
  const lw = lifts.get(e.id);
  let kg = lw && lw.kg != null ? lw.kg : null;
  const prog = h('div.lvprog', null, ...s.moves.map((_, n) => h('i' + (st.sets[n].every(Boolean) ? '.done' : n === st.i ? '.now' : ''))));
  const fig = h('div.lvfig');
  const cues = tr('exercises', e.id, 'cues', e.cues); let ci = 0;
  const cue = h('button.lvcue', { type: 'button', 'aria-label': t('Next cue'), text: cues[0], onclick: () => { ci = (ci + 1) % cues.length; cue.textContent = cues[ci]; } });
  const setBtns = sets.map((on, n) => h('button.set', { type: 'button', 'aria-pressed': String(on), 'aria-label': t('Set {n} of {of}', { n: n + 1, of: sets.length }), html: '<span class="num">' + (n + 1) + '</span><span class="lab">' + t('set') + '</span>' + CHECK, onclick: () => tapSet(n) }));
  const val = h('span.num', { html: kg == null ? '–' : loadLabel(e, kg).replace(' kg', '<small> kg</small>') });
  const vlab = h('span.lab', { text: kg == null ? t('Tap + to set the weight') : t('Last lifted, {u}', { u: loadUnit(e) }) });
  const bump = (d) => {
    kg = Math.max(0, Math.round(((kg == null ? (e.load === 'each' ? 10 : e.load === 'body' ? 0 : 20) - d : kg) + d) * 10) / 10);
    lifts.set(e.id, kg); val.innerHTML = loadLabel(e, kg).replace(' kg', '<small> kg</small>'); vlab.textContent = t('Last lifted, {u}', { u: loadUnit(e) }); sound('click');
  };
  const nextI = st.i + 1 < s.moves.length ? st.i + 1 : -1;
  const allDone = sets.every(Boolean);
  const nextBtn = h('button.go', { type: 'button', 'aria-pressed': String(allDone), html: '<span>' + (nextI < 0 ? t('Finish') : t('Next move')) + '</span>', onclick: () => { if (nextI < 0) finish(b, s, st); else { st.i = nextI; draw(b, s, st); } } });
  const leader = buildLeader(b, s, st);
  add(b, 
    h('div.lv', null,
      h('div.lvbg', null, h('img', { src: 'art/gym-p0.webp', alt: '' })),
      prog,
      h('div.lvhead', null,
        h('span.lab', { text: t('Session {s}', { s: s.id }) + '  ·  ' + t('{n} of {of}', { n: st.i + 1, of: s.moves.length }) }),
        h('h2', { text: exName(e) }),
        h('div.meta', null, h('span.num', { text: repsText(m) }), h('span.lab', { text: t('Rest {n} s', { n: restFor(e) }) }), m.hint && e.id === m.ex ? h('span.lab', { text: t(m.hint) }) : null)),
      fig, cue,
      h('div.lvsets', null, ...setBtns),
      h('div.lvweight', null, h('button', { type: 'button', 'aria-label': t('Less weight'), html: MINUS, onclick: () => bump(-loadStep(e)) }), h('div.v', null, val, vlab), h('button', { type: 'button', 'aria-label': t('More weight'), html: PLUS, onclick: () => bump(loadStep(e)) })),
      nextI >= 0 ? h('button.lvnext', { type: 'button', onclick: () => { st.i = nextI; draw(b, s, st); } }, h('span.lab', { text: t('Next') }), h('b', { text: exName(moveEx(s, nextI)) }), h('span.num', { text: repsText(s.moves[nextI]) })) : h('div.lvnext', null, h('span.lab', { text: t('Last move. Then the session is done.') })),
      h('div.lvacts', null, h('button.ghost', { type: 'button', text: t('Swap'), onclick: (ev) => openExercise(e.id, ev.currentTarget, { session: s, idx: st.i }) }), nextBtn)),
    leader.el);
  st.stopFig = play(fig, e.id);
  st.showLeader = leader.show;
  function tapSet(n) {
    const on = !sets[n];
    sets[n] = on;
    setBtns[n].setAttribute('aria-pressed', String(on));
    sound('click');
    lifts.touch(e.id);
    qsa('i', prog)[st.i].className = sets.every(Boolean) ? 'done' : 'now';
    const done = sets.every(Boolean);
    nextBtn.setAttribute('aria-pressed', String(done));
    if (on && !done) leader.show(restFor(e), t('Set {n} next', { n: sets.findIndex(x => !x) + 1 }));
    else if (on && done && nextI >= 0) leader.show(restFor(e), t('Next: {n}', { n: exName(moveEx(s, nextI)) }), () => { st.i = nextI; draw(b, s, st); });
  }
}

/* The film leader */
function buildLeader(b, s, st) {
  const R = 46;
  const wedge = document.createElementNS('http://www.w3.org/2000/svg', 'path'); wedge.setAttribute('class', 'wedge');
  const hand = document.createElementNS('http://www.w3.org/2000/svg', 'line'); hand.setAttribute('class', 'hand'); hand.setAttribute('x1', 50); hand.setAttribute('y1', 50);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<line class="cross" x1="0" y1="50" x2="100" y2="50"/><line class="cross" x1="50" y1="0" x2="50" y2="100"/><circle class="ring2" cx="50" cy="50" r="40"/><circle class="ring" cx="50" cy="50" r="' + R + '"/>';
  svg.prepend(wedge); svg.append(hand);
  const n = h('span.n', { text: '90' });
  const what = h('span.lab', { text: '' });
  const el = h('div.leader', { role: 'timer', 'aria-live': 'off' },
    h('div.ldial', null, svg, n),
    h('div.lt', null, h('b', { text: t('Rest') }), what),
    h('div.lacts', null, h('button.ghost', { type: 'button', text: t('+15 s'), onclick: () => { end += 15000; } }), h('button.go', { type: 'button', text: t('Go now'), onclick: () => stop(true) })));
  let end = 0, total = 90, after = null, raf = 0;
  function frame() {
    const left = Math.max(0, end - Date.now()), sec = Math.ceil(left / 1000);
    const k = 1 - left / (total * 1000), a = k * 2 * Math.PI;
    const x = 50 + R * Math.sin(a), y = 50 - R * Math.cos(a);
    wedge.setAttribute('d', k <= 0 ? '' : k >= 1 ? 'M50 50m-' + R + ' 0a' + R + ' ' + R + ' 0 1 0 ' + (2 * R) + ' 0a' + R + ' ' + R + ' 0 1 0 -' + (2 * R) + ' 0' : 'M50 50L50 ' + (50 - R) + 'A' + R + ' ' + R + ' 0 ' + (k > .5 ? 1 : 0) + ' 1 ' + x.toFixed(2) + ' ' + y.toFixed(2) + 'Z');
    hand.setAttribute('x2', x.toFixed(2)); hand.setAttribute('y2', y.toFixed(2));
    if (n.textContent !== String(sec)) n.textContent = String(sec);
    if (left <= 0) { stop(false); return; }
    raf = requestAnimationFrame(frame);
  }
  function show(sec, label, next) {
    total = sec; end = Date.now() + sec * 1000; after = next || null;
    what.textContent = label || '';
    el.classList.add('on');
    cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
    clearInterval(st.timer); st.timer = setInterval(() => { if (end && Date.now() >= end && el.classList.contains('on')) stop(false); }, 500);
  }
  function stop(skipped) {
    cancelAnimationFrame(raf); clearInterval(st.timer); end = 0;
    if (!skipped) { sound('pock'); try { navigator.vibrate && navigator.vibrate(180); } catch (e) {} el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
    setTimeout(() => { el.classList.remove('on'); if (after) { const f = after; after = null; f(); } }, skipped ? 0 : 520);
  }
  return { el, show };
}

function finish(b, s, st) {
  st.stopFig(); clearInterval(st.timer);
  const n = weekNo();
  day.patch(d => { d.done = s.id; });
  const w = wk.mark(n, s.id);
  const sets = st.sets.flat().filter(Boolean).length, moves = st.sets.filter(x => x.some(Boolean)).length;
  const mins = Math.max(1, Math.round((Date.now() - st.t0) / 60000));
  bus.emit('today');
  if (s.id === 'C') { closeTop(); sealWeek(n, w); return; }
  add(b, h('div.fin', null,
    h('b.ft', { text: t('End of {s}', { s: sessName(s) }) }),
    h('div.fs', null,
      h('div', null, h('span.num', { text: String(moves) }), h('span.lab', { text: t('moves') })),
      h('div', null, h('span.num', { text: String(sets) }), h('span.lab', { text: t('sets') })),
      h('div', null, h('span.num', { text: String(mins) }), h('span.lab', { text: t('minutes') }))),
    h('p.sdesc', { style: { marginTop: 'calc(var(--u)*18)', textAlign: 'center' }, text: t('Protein within the hour. The weights you used are saved for next time.') }),
    h('button.go', { type: 'button', html: '<span>' + t('Back to today') + '</span>', onclick: () => { closeTop(); bus.emit('go', { view: 'today' }); } })));
}

/* Week sealed: finishing Session C ends the week's film */
export function sealWeek(n, w) {
  const done = Object.keys(w.done).filter(k => SESSIONS[k]).length;
  const ws = weights.all(), wkAvg = (from) => { const a = ws.filter(x => x.d >= from && x.d <= ymd()); return a.length ? a.reduce((p, x) => p + x.kg, 0) / a.length : null; };
  openLayer({ cls: 'sealed', label: t('Week {n}, done', { n }), build: (b, layer) => {
    layer.style.setProperty('--li', SESSIONS.C.light); layer.style.setProperty('--lic', SESSIONS.C.lic);
    const sl = h('div.sl.grained', null,
      h('div.slpic', null, h('img', { src: 'art/gym-p1.webp', alt: '' })), h('div.grain'),
      h('b.w1', { text: t('Week {n}', { n }) }),
      h('b.w2', { text: t('done.') }),
      h('div.fs', null,
        h('div', null, h('span.num', { text: done + '/3' }), h('span.lab', { text: t('sessions') })),
        h('div', null, h('span.num', { text: '21' }), h('span.lab', { text: t('moves a week') }))),
      h('div.acts2', null,
        h('button.go', { type: 'button', html: '<span>' + t('Share the card') + '</span>', onclick: async () => shareCanvas(await sealCard(n, done), 'week-' + n + '-done.png', t('Week {n}, done', { n })) })));
    add(b, sl);
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
      qs('.slpic', sl).animate([{ opacity: 0, transform: 'scale(1.08)' }, { opacity: 1, transform: 'none' }], { duration: 1600, easing: 'cubic-bezier(.16,1,.3,1)' });
      qs('.w1', sl).animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: 300, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      qs('.w2', sl).animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 900, fill: 'backwards' });
    }
    sound('pock');
  } });
}
/* The 9:16 story card */
async function sealCard(n, done) {
  const W = 1080, H = 1920, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d');
  try { await Promise.all(['900 300px "Bodoni Moda"', 'italic 800 140px "Bodoni Moda"', '500 40px Jost'].map(f => document.fonts.load(f))); } catch (e) {}
  const img = await new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = 'art/gym-p1.webp'; });
  c.fillStyle = '#04060A'; c.fillRect(0, 0, W, H);
  if (img) { const k = Math.max(W / img.naturalWidth, 1300 / img.naturalHeight); const w = img.naturalWidth * k, hh = img.naturalHeight * k; c.drawImage(img, (W - w) / 2, -40, w, hh); }
  const g = c.createLinearGradient(0, 700, 0, 1400); g.addColorStop(0, 'rgba(4,6,10,0)'); g.addColorStop(1, '#04060A'); c.fillStyle = g; c.fillRect(0, 700, W, 1220);
  c.textAlign = 'center'; c.fillStyle = '#F1F5FA';
  c.font = '900 280px "Bodoni Moda", serif'; c.lineWidth = 5; c.strokeStyle = '#F1F5FA';
  const w1 = t('Week {n}', { n }); c.fillText(w1, W / 2, 1460); c.strokeText(w1, W / 2, 1460);
  c.fillStyle = '#B9A8FF'; c.font = 'italic 800 140px "Bodoni Moda", serif'; c.fillText(t('done.'), W / 2, 1620);
  c.fillStyle = '#AEBCCD'; c.font = '500 40px Jost, sans-serif'; c.fillText(t('{d} of 3 sessions. 140 g of protein a day.', { d: done }), W / 2, 1730);
  c.fillStyle = '#F1F5FA'; c.font = 'italic 800 46px "Bodoni Moda", serif'; c.fillText('The Cut', W / 2, 1840);
  return cv;
}
