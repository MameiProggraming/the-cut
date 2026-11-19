/* Installable and offline. A new version shows a small banner instead of silently serving the old copy. */
import { $, t } from './core.js';
export function initPwa() {
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloading) return; reloading = true; location.reload(); });
  navigator.serviceWorker.register('sw.js').then(reg => {
    const show = (w) => { const b = $('update'); if (!b) return; b.textContent = t('New version. Tap to update.'); b.hidden = false; b.onclick = () => { b.disabled = true; w.postMessage('skip'); }; };
    if (reg.waiting && navigator.serviceWorker.controller) show(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const w = reg.installing; if (!w) return;
      w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) show(w); });
    });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
  }).catch(() => {});
}
