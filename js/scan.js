/* Barcode scan: the phone camera plus Open Food Facts, scaled to the grams eaten, so a packaged food goes into
   the bank once. Safari has no native BarcodeDetector, so a WebAssembly reader is fetched the first time. */
import { h, add, $, qs, t, fmt, toast } from './core.js';
import { openLayer, closeTop } from './sheet.js';

const POLY = 'https://cdn.jsdelivr.net/npm/barcode-detector@3.2.2/dist/es/ponyfill.js/+esm';
async function detector() {
  const fm = ['ean_13', 'ean_8', 'upc_a', 'upc_e'];
  if ('BarcodeDetector' in window) {
    try { const ok = await window.BarcodeDetector.getSupportedFormats(); if (ok.some(f => fm.includes(f))) return new window.BarcodeDetector({ formats: fm }); } catch (e) {}
  }
  const m = await import(POLY);
  return new m.BarcodeDetector({ formats: fm });
}
async function lookup(code) {
  const r = await fetch('https://world.openfoodfacts.org/api/v2/product/' + encodeURIComponent(code) + '.json?fields=product_name,brands,nutriments,serving_size,serving_quantity,quantity');
  if (!r.ok) throw new Error('net');
  const j = await r.json();
  if (j.status !== 1 || !j.product) return null;
  const n = j.product.nutriments || {};
  const kcal = n['energy-kcal_100g'] != null ? n['energy-kcal_100g'] : n['energy_100g'] != null ? n['energy_100g'] / 4.184 : null;
  return { code, name: (j.product.product_name || '').trim(), brand: (j.product.brands || '').split(',')[0].trim(), serving: +j.product.serving_quantity || null,
    p: n.proteins_100g, c: n.carbohydrates_100g, f: n.fat_100g, k: kcal };
}

export function openScan(onMeal) {
  let stream = null, raf = 0, stopped = false;
  const stop = () => { stopped = true; cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(x => x.stop()); stream = null; };
  openLayer({ cls: 'scan', label: t('Scan a packet'), onClose: stop, build: (b) => {
    const video = h('video', { playsinline: true, muted: true, autoplay: true });
    const status = h('p.lab.sst', { role: 'status', text: t('Starting the camera…') });
    const code = h('input.num.scode', { type: 'text', inputmode: 'numeric', placeholder: t('Or type the barcode'), 'aria-label': t('Barcode number'), maxlength: '14' });
    const result = h('div.sres');
    const frame = h('div.sframe', null, video, h('i.sgate'), h('i.sline'));
    add(b, h('h2.lttl', { text: t('Scan a packet') }), frame, status,
      h('div.smanual', null, code, h('button.ghost.sm', { type: 'button', text: t('Look up'), onclick: () => find(code.value.replace(/\D/g, '')) })), result);

    async function find(c) {
      if (!c || c.length < 8) { status.textContent = t('A barcode has 8 to 14 digits.'); return; }
      stop(); status.textContent = t('Looking up {c}…', { c });
      try {
        const p = await lookup(c);
        if (!p || p.p == null || p.k == null) { status.textContent = t('Open Food Facts has no full numbers for {c}. Add it by hand instead.', { c }); result.innerHTML = ''; add(result, h('button.go', { type: 'button', html: '<span>' + t('Add it by hand') + '</span>', onclick: () => onMeal({ name: p && p.name || '', cat: 'snack', ing: [{ q: 100, u: 'g', item: p && p.name || '' }], steps: [''], p: null, c: null, f: null, k: null }) })); return; }
        status.textContent = '';
        show(p);
      } catch (e) { status.textContent = t('No connection. Open Food Facts needs the internet; try again, or add it by hand.'); }
    }
    function show(p) {
      let g = p.serving || 100;
      const per = (v) => v == null ? null : Math.round(v * g / 100);
      const nums = h('div.sbill');
      const draw = () => { nums.innerHTML = ''; nums.append(
        h('div', null, h('span.num', { text: per(p.p) + ' g' }), h('span.lab', { text: t('protein') })),
        h('div', null, h('span.num', { text: fmt(per(p.k)) }), h('span.lab', { text: t('kcal') })),
        h('div', null, h('span.num', { text: (per(p.c) ?? '–') + ' g' }), h('span.lab', { text: t('carbs') })),
        h('div', null, h('span.num', { text: (per(p.f) ?? '–') + ' g' }), h('span.lab', { text: t('fat') }))); };
      const gi = h('input.num.sg', { type: 'text', inputmode: 'decimal', value: String(g), 'aria-label': t('Grams eaten') });
      gi.addEventListener('input', () => { const v = parseFloat(gi.value); if (v > 0) { g = v; draw(); } });
      draw();
      result.innerHTML = '';
      add(result, h('h3.sname', { text: p.name || t('Unnamed product') }), p.brand ? h('p.lab', { text: p.brand }) : null,
        h('label.sgl', null, gi, h('span.lab', { text: t('grams eaten') })), nums,
        h('button.go', { type: 'button', html: '<span>' + t('Make it a meal') + '</span>', onclick: () => onMeal({ name: p.name || t('Packet'), cat: 'snack', source: 'off:' + p.code,
          ing: [{ q: g, u: 'g', item: (p.brand ? p.brand + ' ' : '') + (p.name || ''), aisle: 'pantry' }], steps: [''], p: per(p.p), c: per(p.c), f: per(p.f), k: per(p.k) }) }),
        h('p.lab.sfine', { text: t('Numbers from Open Food Facts, per 100 g, scaled to what you ate.') }));
    }
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } }, audio: false });
        if (stopped) { stop(); return; }
        video.srcObject = stream; await video.play();
        status.textContent = t('Hold the barcode inside the frame.');
        const det = await detector();
        const tick = async () => {
          if (stopped) return;
          try { const r = await det.detect(video); if (r && r.length) { find(r[0].rawValue); return; } } catch (e) {}
          raf = requestAnimationFrame(() => setTimeout(tick, 120));
        };
        tick();
      } catch (e) {
        status.textContent = t('The camera is not available. Type the barcode instead.');
        frame.classList.add('off');
      }
    })();
  } });
}
