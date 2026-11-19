/* The muscle map: a front and a back figure. Today's session is lit; what was trained earlier this week is filled. */
export const WORKS = {
  'leg-press': ['quads', 'glutes'], 'incline-db-press': ['chest', 'delts', 'triceps'], 'lat-pulldown': ['lats', 'biceps', 'reardelts'],
  'db-shoulder-press': ['delts', 'triceps'], 'lateral-raise': ['delts'], 'pallof-press': ['abs', 'obliques'], 'farmers-carry': ['forearms', 'traps', 'abs'],
  'romanian-deadlift': ['hamstrings', 'glutes', 'lowback'], 'seated-cable-row': ['lats', 'traps', 'reardelts', 'biceps'], 'flat-db-press': ['chest', 'delts', 'triceps'],
  'leg-curl': ['hamstrings', 'calves'], 'face-pull': ['reardelts', 'traps'], 'cable-woodchop': ['obliques', 'abs'], 'hanging-leg-raise': ['abs', 'forearms'],
  'bulgarian-split-squat': ['quads', 'glutes'], 'pull-up': ['lats', 'biceps', 'forearms'], 'overhead-press': ['delts', 'triceps', 'traps'],
  'single-arm-db-row': ['lats', 'traps', 'biceps'], 'db-curl': ['biceps', 'forearms'], 'triceps-rope-pulldown': ['triceps'], 'suitcase-carry': ['obliques', 'forearms', 'traps']
};
export function sessionMuscles(s) { const out = new Set(); s.moves.forEach(m => (WORKS[m.ex] || []).forEach(x => out.add(x))); return out; }

const M = (id, d) => '<path class="mus" data-m="' + id + '" d="' + d + '"/>';
const E = (id, cx, cy, rx, ry, rot) => '<ellipse class="mus" data-m="' + id + '" cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '"' + (rot ? ' transform="rotate(' + rot + ' ' + cx + ' ' + cy + ')"' : '') + '/>';
const mirror = (d) => d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => (100 - +x) + ',' + y);
const SIL = 'M50,4 C57,4 60,10 60,17 C60,24 57,29 55,31 L55,33 C60,34 66,35 70,37 C76,39 79,44 80,52 L83,96 C83,99 79,100 78,98 L74,70 L71,90 C70,96 68,100 67,104 L66,140 L64,182 C64,188 56,189 55,183 L52,112 L48,112 L45,183 C44,189 36,188 36,182 L34,140 L33,104 C32,100 30,96 29,90 L26,70 L22,98 C21,100 17,99 17,96 L20,52 C21,44 24,39 30,37 C34,35 40,34 45,33 L45,31 C43,29 40,24 40,17 C40,10 43,4 50,4 Z';
function frontSvg() {
  const pec = 'M49.5,38 C42,36 34,39 33.5,46 C34,54 43,56.5 49.5,53.5 Z';
  const obl = 'M43.5,60 C39,66 38.5,80 42,92 L44,91 L44,60 Z';
  let s = '<path class="sil" d="' + SIL + '"/>';
  s += E('delts', 31.5, 42.5, 6.6, 6.8, -18) + E('delts', 68.5, 42.5, 6.6, 6.8, 18);
  s += M('chest', pec) + M('chest', mirror(pec));
  s += E('biceps', 26.8, 59, 4.4, 9.6, 12) + E('biceps', 73.2, 59, 4.4, 9.6, -12);
  s += E('forearms', 23.4, 81, 3.8, 10.5, 8) + E('forearms', 76.6, 81, 3.8, 10.5, -8);
  for (let r = 0; r < 3; r++) { const y = 58 + r * 9.4; s += '<rect class="mus" data-m="abs" x="44.6" y="' + y + '" width="5" height="8.4" rx="1.6"/><rect class="mus" data-m="abs" x="50.4" y="' + y + '" width="5" height="8.4" rx="1.6"/>'; }
  s += M('obliques', obl) + M('obliques', mirror(obl));
  s += E('quads', 42.2, 124, 7.2, 19.5, 4) + E('quads', 57.8, 124, 7.2, 19.5, -4);
  s += E('calves', 40.6, 162, 4, 14, 2) + E('calves', 59.4, 162, 4, 14, -2);
  return s;
}
function backSvg() {
  const lat = 'M43,46 C37,52 36.5,64 44,78 L49.4,72 L49,48 Z';
  let s = '<path class="sil" d="' + SIL + '"/>';
  s += M('traps', 'M50,30 L61,37.5 L56,41 L50,60 L44,41 L39,37.5 Z');
  s += E('reardelts', 31.5, 43, 6.4, 6.6, -18) + E('reardelts', 68.5, 43, 6.4, 6.6, 18);
  s += M('lats', lat) + M('lats', mirror(lat));
  s += E('triceps', 26.8, 59, 4.4, 9.8, 12) + E('triceps', 73.2, 59, 4.4, 9.8, -12);
  s += E('forearms', 23.4, 81, 3.8, 10.5, 8) + E('forearms', 76.6, 81, 3.8, 10.5, -8);
  s += '<rect class="mus" data-m="lowback" x="44.8" y="76" width="4.7" height="15" rx="2"/><rect class="mus" data-m="lowback" x="50.5" y="76" width="4.7" height="15" rx="2"/>';
  s += E('glutes', 43.2, 101, 7.4, 8.2) + E('glutes', 56.8, 101, 7.4, 8.2);
  s += E('hamstrings', 42.4, 127, 6.8, 16.5, 3) + E('hamstrings', 57.6, 127, 6.8, 16.5, -3);
  s += E('calves', 40.8, 160, 5, 13, 2) + E('calves', 59.2, 160, 5, 13, -2);
  return s;
}
export function muscleMap(lit, week, labels) {
  const paint = (svg) => svg.replace(/class="mus" data-m="(\w+)"/g, (_, m) => 'class="mus' + (lit.has(m) ? ' on' : week.has(m) ? ' wk' : '') + '" data-m="' + m + '"');
  return '<figure><svg viewBox="14 0 72 192" role="img" aria-label="' + labels[0] + '">' + paint(frontSvg()) + '</svg><figcaption class="lab">' + labels[2] + '</figcaption></figure>' +
    '<figure><svg viewBox="14 0 72 192" role="img" aria-label="' + labels[1] + '">' + paint(backSvg()) + '</svg><figcaption class="lab">' + labels[3] + '</figcaption></figure>';
}
