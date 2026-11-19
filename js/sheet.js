/* Cards that grow. Tapping a meal or an exercise opens its card into the detail view from where it sat,
   instead of jumping to a new page; closing sends it back. Layers stack, and the back gesture closes the top one. */
import { h, $, qs, reduce, t } from './core.js';

const stack = [];
let popping = false;

function rectOf(el) {
  if (!el || !el.isConnected) return null;
  const r = el.getBoundingClientRect(), p = $('phone').getBoundingClientRect();
  if (!r.width || r.bottom < p.top || r.top > p.bottom) return null;
  return { top: r.top - p.top, left: r.left - p.left, right: p.right - r.right, bottom: p.bottom - r.bottom };
}
const inset = (r, rad) => 'inset(' + r.top.toFixed(1) + 'px ' + r.right.toFixed(1) + 'px ' + r.bottom.toFixed(1) + 'px ' + r.left.toFixed(1) + 'px round ' + rad + 'px)';

/* open({ from, cls, label, bar: [buttons], build(body, layer) , onClose }) */
export function openLayer(o) {
  const phone = $('phone'), host = $('layers');
  const close = h('button.ghost.sm.close', { type: 'button', text: o.closeText || t('Close'), onclick: () => closeTop() });
  const bar = h('div.lbar', null, close, h('div.lbar-r', null, ...(o.bar || [])));
  const body = h('div.lbody');
  const layer = h('div.layer' + (o.cls ? '.' + o.cls : ''), { role: 'dialog', 'aria-modal': 'true', 'aria-label': o.label || '' }, body, bar);
  host.append(layer);
  const entry = { layer, body, from: o.from, onClose: o.onClose, opener: document.activeElement };
  stack.push(entry);
  phone.classList.add('sheet-on');
  if (o.build) o.build(body, layer, entry);
  try { history.pushState({ layer: stack.length }, ''); } catch (e) {}
  const r = rectOf(o.from);
  if (!reduce()) {
    if (r) {
      layer.animate([{ clipPath: inset(r, 4) }, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }], { duration: 460, easing: 'cubic-bezier(.2,.9,.16,1)' });
      body.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 380, delay: 90, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
    } else {
      layer.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
  }
  requestAnimationFrame(() => close.focus({ preventScroll: true }));
  return entry;
}
export function closeTop(fromPop) {
  const e = stack.pop(); if (!e) return;
  const phone = $('phone');
  if (!stack.length) phone.classList.remove('sheet-on');
  const done = () => { e.layer.remove(); if (e.onClose) e.onClose(); if (e.opener && e.opener.isConnected) try { e.opener.focus({ preventScroll: true }); } catch (x) {} };
  const r = rectOf(e.from);
  if (reduce()) done();
  else if (r) {
    e.body.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' });
    e.layer.animate([{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }, { clipPath: inset(r, 4) }], { duration: 340, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' }).onfinish = done;
  } else e.layer.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(12px)' }], { duration: 220, easing: 'ease-in', fill: 'forwards' }).onfinish = done;
  if (!fromPop) { popping = true; try { history.back(); } catch (x) { popping = false; } }
}
export function closeAll() { while (stack.length) closeTop(); }
export const layerCount = () => stack.length;
window.addEventListener('popstate', () => {
  if (popping) { popping = false; return; }
  if (stack.length) closeTop(true);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && stack.length) closeTop(); });
