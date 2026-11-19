/* Boot and routing. Four tabs share one screen; overlays are cards that grow from what was tapped. */
import { $, qs, qsa, t, bus, toast, unlockAudio, loadLang, lang } from './core.js';
import { flags, ymd, settings } from './store.js';
import { mountToday, showToday, begin, currentMode, todayImages } from './today.js';
import { mountTrain, showTrain, openExercise } from './train.js';
import { mountEat, showEat, openShop } from './eat.js';
import { mountProgress, showProgress } from './progress.js';
import { openMeal, pickMeal } from './meal.js';
import { exportMeal } from './card.js';
import { startLive } from './live.js';
import { closeAll } from './sheet.js';
import { initPwa } from './pwa.js';
import { initPrint } from './print.js';

const phone = $('phone');
const VIEWS = ['today', 'train', 'eat', 'progress'];
const ctx = { openMeal, pickMeal, openShop, exportMeal, startLive, openExercise, toast, show };

function applyLang() {
  const ar = lang() === 'ar';
  document.documentElement.lang = ar ? 'ar' : 'en';
  document.documentElement.dir = ar ? 'rtl' : 'ltr';
  if (ar && !$('arFonts')) {
    const l = document.createElement('link'); l.id = 'arFonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@400;500;700;800&display=swap';
    document.head.append(l);
  }
  qsa('.tabs [data-tab]').forEach(b => { b.textContent = t({ today: 'Today', train: 'Train', eat: 'Eat', progress: 'Progress' }[b.dataset.tab]); });
  $('update').textContent = t('New version. Tap to update.');
}

function show(v, opts = {}) {
  if (!VIEWS.includes(v)) v = 'today';
  closeAll();
  const was = phone.dataset.view;
  phone.dataset.view = v;
  qsa('.tabs [data-tab]').forEach(b => { if (b.dataset.tab === v) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  phone.classList.toggle('pin', false);
  if (v === 'today') showToday();
  if (v === 'train') showTrain(opts);
  if (v === 'eat') showEat(opts);
  if (v === 'progress') showProgress(opts);
  if (was !== v && !opts.silent) {
    const el = qs('.view[data-view="' + v + '"]');
    if (el && !matchMedia('(prefers-reduced-motion:reduce)').matches) el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' });
  }
  if (location.hash !== '#' + v) try { history.replaceState(history.state, '', '#' + v); } catch (e) {}
}

async function boot() {
  await loadLang();
  applyLang();
  mountToday(qs('.view[data-view=today]'), ctx);
  mountTrain(qs('.view[data-view=train]'), ctx);
  mountEat(qs('.view[data-view=eat]'), ctx);
  mountProgress(qs('.view[data-view=progress]'), ctx);
  qsa('.tabs [data-tab]').forEach(b => b.addEventListener('click', () => show(b.dataset.tab)));
  bus.on('lang', applyLang);
  window.addEventListener('hashchange', () => { const v = location.hash.slice(1); if (VIEWS.includes(v) && v !== phone.dataset.view) show(v); });
  bus.on('go', (x) => show(x.view, x));
  phone.addEventListener('pointerdown', unlockAudio, { once: true, capture: true });

  const start = (location.hash || '#today').slice(1);
  phone.dataset.view = VIEWS.includes(start) ? start : 'today';
  show(phone.dataset.view, { silent: true });

  /* The opening plays in full only on the first open of the day, and only on Today */
  const full = phone.dataset.view === 'today' && flags.get('opened') !== ymd();
  const imgs = qsa('#opening img').concat(todayImages());
  let started = false;
  const go = () => { if (started) return; started = true; if (phone.dataset.view === 'today') begin(full); else phone.classList.remove('wait'); };
  Promise.all(imgs.map(i => i.decode ? i.decode().catch(() => {}) : 0).concat([document.fonts ? document.fonts.ready : 0])).then(go);
  setTimeout(go, 1800);

  initPwa();
  initPrint(() => phone.dataset.view);

  /* A new morning while the app was left open: the day resets */
  let lastDay = ymd();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && ymd() !== lastDay) { lastDay = ymd(); location.reload(); }
  });
}
boot();
