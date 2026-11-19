/* Movement illustrations: one consistent line-art figure in the scene light, at the start and the end of
   every move. The figure is jointed, so limbs keep their length and the live session can play the move
   between its two frames. Matching the photo-real avatars across every exercise would need an illustrator
   or an image generator; this is the clean line-art version of the same figure. */

const R = Math.PI / 180, FLOOR = 97;
const L = { torso: 30, neck: 12, ua: 17, fa: 15, th: 24, sh: 23, ft: 8 };
const pt = (o, len, ang) => [o[0] + len * Math.sin(ang * R), o[1] + len * Math.cos(ang * R)];

/* Side view. Angles in degrees. Torso t: from straight up, + leans forward. Limbs: from straight down, + forward.
   Legs [thigh, knee bend, foot angle], arms [upper arm, elbow bend, upper-arm length scale for foreshortening]. */
function side(p) {
  const hip = [p.x == null ? 50 : p.x, p.y == null ? 50 : p.y], t = p.t || 0;
  const sh = [hip[0] + L.torso * Math.sin(t * R), hip[1] - L.torso * Math.cos(t * R)];
  const ht = t + (p.hd || 0);
  const head = [sh[0] + L.neck * Math.sin(ht * R), sh[1] - L.neck * Math.cos(ht * R)];
  const leg = (q) => { const knee = pt(hip, L.th * (q[3] || 1), q[0]), sa = q[0] - q[1], ank = pt(knee, L.sh, sa), fa = q[2] == null ? 0 : q[2]; const toe = [ank[0] + L.ft * Math.cos(fa * R), ank[1] - L.ft * Math.sin(fa * R)]; return { knee, ank, toe }; };
  const arm = (q) => { const el = pt(sh, L.ua * (q[2] || 1), q[0]), hand = pt(el, L.fa * (q[3] || 1), q[0] + q[1]); return { el, hand }; };
  const l1 = leg(p.l1 || [3, 0, 0]), l2 = leg(p.l2 || [-3, 0, 0]), a1 = arm(p.a1 || [4, 6]), a2 = arm(p.a2 || [-3, 6]);
  return { hip, sh, head, l1, l2, a1, a2 };
}
/* Front view, for raises and flies. Arms [abduction from down, elbow bend]; torso can tilt and foreshorten. */
function front(p) {
  const cx = p.x == null ? 50 : p.x, hy = p.y == null ? 50 : p.y, tl = (p.torso || 1) * L.torso, lean = p.lean || 0;
  const hipC = [cx, hy], shC = [cx + tl * Math.sin(lean * R), hy - tl * Math.cos(lean * R)];
  const head = [shC[0] + (p.neck || 1) * L.neck * Math.sin(lean * R), shC[1] - (p.neck || 1) * L.neck * Math.cos(lean * R)];
  const sw = 10, hw = 6.5;
  const side1 = (s) => {
    const sh = [shC[0] + s * sw, shC[1]], hp = [hipC[0] + s * hw, hipC[1]];
    const ar = p.one && s < 0 ? [6, 4] : (p.arms || [8, 8]); const aa = ar[0] * s, ae = ar[1] * s, ul = p.one && s < 0 ? 1 : (p.ua || 1);
    const el = [sh[0] + L.ua * ul * Math.sin(aa * R), sh[1] + L.ua * ul * Math.cos(aa * R)];
    const hand = [el[0] + L.fa * Math.sin((aa + ae) * R), el[1] + L.fa * Math.cos((aa + ae) * R)];
    const la = (p.legs || [4, 0])[0] * s, kb = (p.legs || [4, 0])[1], ls = p.ls || 1;
    const knee = [hp[0] + L.th * ls * Math.sin(la * R), hp[1] + L.th * ls * Math.cos(la * R)];
    const ank = [knee[0] + L.sh * (p.ss || 1) * Math.sin((la - kb * s) * R), knee[1] + L.sh * (p.ss || 1) * Math.cos((la - kb * s) * R)];
    return { sh, hp, el, hand, knee, ank, toe: [ank[0] + s * 4, ank[1]] };
  };
  return { front: true, shC, hipC, head, r: side1(1), l: side1(-1) };
}

/* Poses. Each move: view, props, a (start) and b (end). x/y place the hip; ground:false keeps y as given. */
const STAND = { t: 0, l1: [3, 0, 0], l2: [-3, 0, 0], a1: [5, 6], a2: [-4, 6] };
const S = (o) => Object.assign({}, STAND, o);
const SQUAT = { t: 32, l1: [86, 122, 0], l2: [80, 118, 0] };
const WALK = { t: 2, l1: [22, 6, 0], l2: [-18, 14, -18] };
const HINGE = (d, o) => Object.assign({ t: d, l1: [-6, 14, 0], l2: [-10, 14, 0], a1: [d * .62, 0], a2: [d * .58, 0] }, o);
const SEAT = { t: -6, l1: [90, 90, 0], l2: [86, 88, 0], ground: false, y: 69 };
const LIE = { x: 52, y: 62, ground: false, t: -90, hd: 0, l1: [62, 62, 0], l2: [56, 56, 0] };
const INCL = { x: 50, y: 69, ground: false, t: -58, l1: [80, 80, 0], l2: [76, 76, 0] };
const HANG = { ground: false, x: 50, y: 62, t: 0, l1: [6, 4, -40], l2: [2, 4, -40], a1: [178, 0], a2: [176, 0] };

export const POSES = {
  'leg-press': { props: ['lpress'], a: { x: 34, y: 76, ground: false, t: -48, l1: [134, 8, 132], l2: [130, 8, 128], a1: [30, 30], a2: [26, 30] }, b: { x: 34, y: 76, ground: false, t: -48, l1: [168, 98, 160], l2: [164, 96, 156], a1: [30, 30], a2: [26, 30] } },
  'goblet-squat': { props: ['dbv1'], a: S({ a1: [24, 140], a2: [20, 140] }), b: Object.assign({}, SQUAT, { a1: [50, 118], a2: [46, 118] }) },
  'back-squat': { props: ['barback'], a: S({ a1: [-34, 128], a2: [-30, 128] }), b: Object.assign({}, SQUAT, { t: 40, a1: [-4, 132], a2: [-2, 132] }) },
  'incline-db-press': { props: ['incline', 'db1', 'db2'], a: Object.assign({}, INCL, { a1: [182, 0], a2: [178, 0] }), b: Object.assign({}, INCL, { a1: [44, 136, .8], a2: [40, 136, .8] }) },
  'incline-smith-press': { props: ['incline', 'smith', 'bar1'], a: Object.assign({}, INCL, { a1: [182, 0], a2: [178, 0] }), b: Object.assign({}, INCL, { a1: [44, 136, .8], a2: [40, 136, .8] }) },
  'machine-chest-press': { props: ['seatback', 'handle1'], a: Object.assign({}, SEAT, { a1: [-40, 128, .9], a2: [-44, 128, .9] }), b: Object.assign({}, SEAT, { a1: [86, 6], a2: [82, 6] }) },
  'feet-elevated-push-up': { props: ['benchfeet'], a: { ground: false, x: 46, y: 60, t: 101, l1: [-101, 0, -10], l2: [-99, 0, -10], a1: [-1, 0], a2: [-4, 0] }, b: { ground: false, x: 44, y: 75, t: 96, l1: [-98, 0, -10], l2: [-96, 0, -10], a1: [-118, 132], a2: [-122, 134] } },
  'lat-pulldown': { props: ['pulldown', 'cableup1'], a: Object.assign({}, SEAT, { t: -4, a1: [176, 4], a2: [172, 4] }), b: Object.assign({}, SEAT, { t: -16, a1: [8, 158, .7], a2: [4, 158, .7] }) },
  'assisted-pull-up': { props: ['assist', 'pullbar'], a: { ground: false, x: 50, y: 59, t: 0, l1: [70, 152, 180], l2: [66, 150, 180], a1: [178, 0], a2: [176, 0] }, b: { ground: false, x: 50, y: 50, t: 0, l1: [70, 152, 180], l2: [66, 150, 180], a1: [12, 164, .55], a2: [8, 164, .55] } },
  'single-arm-cable-pulldown': { props: ['kneelhigh', 'cableup1'], a: { ground: true, t: 0, l1: [0, 90, -90, 1], l2: [-2, 90, -90, 1], a1: [178, 2], a2: [20, 60] }, b: { ground: true, t: 0, l1: [0, 90, -90, 1], l2: [-2, 90, -90, 1], a1: [14, 156, .65], a2: [20, 60] } },
  'db-shoulder-press': { props: ['uprightseat', 'db1', 'db2'], a: Object.assign({}, SEAT, { t: -4, a1: [96, 80, .8], a2: [92, 80, .8] }), b: Object.assign({}, SEAT, { t: -4, a1: [176, 2], a2: [172, 2] }) },
  'machine-shoulder-press': { props: ['uprightseat', 'handle1'], a: Object.assign({}, SEAT, { t: -4, a1: [100, 76, .8], a2: [96, 76, .8] }), b: Object.assign({}, SEAT, { t: -4, a1: [174, 4], a2: [170, 4] }) },
  'half-kneeling-db-press': { props: ['db1'], a: { t: 0, l1: [88, 88, 0], l2: [-4, 92, -90], a1: [96, 80, .8], a2: [-12, 30] }, b: { t: 0, l1: [88, 88, 0], l2: [-4, 92, -90], a1: [176, 2], a2: [-12, 30] } },
  'lateral-raise': { view: 'front', props: ['fdb'], a: { arms: [10, 6] }, b: { arms: [86, 8] } },
  'cable-lateral-raise': { view: 'front', props: ['fcable'], a: { arms: [-6, 4], one: true }, b: { arms: [84, 6], one: true } },
  'machine-lateral-raise': { view: 'front', props: ['fseat'], a: { arms: [8, 80], sit: true }, b: { arms: [84, 80], sit: true } },
  'pallof-press': { props: ['cablemid1'], a: S({ l1: [8, 10, 0], l2: [-8, 10, 0], a1: [36, 110, .8], a2: [32, 110, .8] }), b: S({ l1: [8, 10, 0], l2: [-8, 10, 0], a1: [88, 2], a2: [84, 2] }) },
  'band-pallof-press': { props: ['bandmid1'], a: S({ l1: [8, 10, 0], l2: [-8, 10, 0], a1: [36, 110, .8], a2: [32, 110, .8] }), b: S({ l1: [8, 10, 0], l2: [-8, 10, 0], a1: [88, 2], a2: [84, 2] }) },
  'plank-shoulder-tap': { props: [], a: { ground: false, x: 50, y: 64, t: 90, l1: [-90, 0, -70], l2: [-88, 0, -70], a1: [0, 0], a2: [-4, 0] }, b: { ground: false, x: 50, y: 64, t: 90, l1: [-90, 0, -70], l2: [-88, 0, -70], a1: [30, 150, .6], a2: [-2, 0] } },
  'farmers-carry': { props: ['db1', 'db2'], a: S({ a1: [2, 0], a2: [-2, 0] }), b: Object.assign({}, WALK, { a1: [4, 0], a2: [-2, 0] }) },
  'kettlebell-farmers-carry': { props: ['kb1', 'kb2'], a: S({ a1: [2, 0], a2: [-2, 0] }), b: Object.assign({}, WALK, { a1: [4, 0], a2: [-2, 0] }) },
  'trap-bar-carry': { props: ['trap'], a: S({ a1: [2, 0], a2: [-2, 0] }), b: Object.assign({}, WALK, { a1: [3, 0], a2: [1, 0] }) },
  'romanian-deadlift': { props: ['bar1'], a: S({ l1: [2, 8, 0], l2: [-2, 8, 0], a1: [6, 0], a2: [4, 0] }), b: HINGE(64, { l1: [-12, 18, 0], l2: [-14, 18, 0], a1: [-62, 0], a2: [-64, 0] }) },
  'db-romanian-deadlift': { props: ['db1', 'db2'], a: S({ l1: [2, 8, 0], l2: [-2, 8, 0], a1: [6, 0], a2: [4, 0] }), b: HINGE(64, { l1: [-12, 18, 0], l2: [-14, 18, 0], a1: [-62, 0], a2: [-64, 0] }) },
  'cable-pull-through': { props: ['cablelow1'], a: S({ l1: [6, 8, 0], l2: [-6, 8, 0], a1: [8, 0], a2: [6, 0] }), b: HINGE(48, { l1: [-10, 20, 0], l2: [-12, 20, 0], a1: [-78, 0], a2: [-80, 0] }) },
  'back-extension': { props: ['hyper'], a: { ground: false, x: 40, y: 62, t: 45, l1: [-45, 0, -45], l2: [-43, 0, -45], a1: [60, 130, .6], a2: [56, 130, .6] }, b: { ground: false, x: 40, y: 62, t: 152, hd: -14, l1: [-45, 0, -45], l2: [-43, 0, -45], a1: [170, 130, .6], a2: [166, 130, .6] } },
  'seated-cable-row': { props: ['rowseat', 'cablerow1'], a: { ground: false, x: 40, y: 80, t: 14, l1: [76, 16, 70], l2: [72, 16, 70], a1: [74, 4], a2: [70, 4] }, b: { ground: false, x: 40, y: 80, t: -4, l1: [76, 16, 70], l2: [72, 16, 70], a1: [-54, 116, .9], a2: [-58, 116, .9] } },
  'flat-db-press': { props: ['flat', 'db1', 'db2'], a: Object.assign({}, LIE, { a1: [180, 0], a2: [176, 0] }), b: Object.assign({}, LIE, { a1: [60, 120, .8], a2: [56, 120, .8] }) },
  'barbell-bench-press': { props: ['flat', 'bar1'], a: Object.assign({}, LIE, { a1: [180, 0], a2: [176, 0] }), b: Object.assign({}, LIE, { a1: [62, 118, .8], a2: [58, 118, .8] }) },
  'push-up': { props: [], a: { ground: false, x: 46, y: 70, t: 104, l1: [-76, 0, -70], l2: [-74, 0, -70], a1: [-2, 0], a2: [-6, 0] }, b: { ground: false, x: 46, y: 84, t: 94, l1: [-86, 0, -76], l2: [-84, 0, -76], a1: [-116, 130], a2: [-120, 132] } },
  'leg-curl': { props: ['curlseat', 'roller1'], a: Object.assign({}, SEAT, { t: -14, l1: [88, 8, 70], l2: [84, 8, 70], a1: [40, 20], a2: [36, 20] }), b: Object.assign({}, SEAT, { t: -14, l1: [88, 118, -20], l2: [84, 116, -20], a1: [40, 20], a2: [36, 20] }) },
  'stability-ball-leg-curl': { props: ['ball1'], a: { ground: false, x: 40, y: 80, t: -104, l1: [76, 0, 60], l2: [74, 0, 60], a1: [-8, 0], a2: [-12, 0] }, b: { ground: false, x: 40, y: 76, t: -114, l1: [50, 110, 30], l2: [48, 108, 30], a1: [-10, 0], a2: [-14, 0] } },
  'slider-leg-curl': { props: ['slider1'], a: { ground: false, x: 40, y: 78, t: -112, l1: [54, 110, 0], l2: [52, 108, 0], a1: [-12, 0], a2: [-16, 0] }, b: { ground: false, x: 40, y: 84, t: -98, l1: [84, 6, 0], l2: [82, 6, 0], a1: [-10, 0], a2: [-14, 0] } },
  'face-pull': { props: ['cablehigh1'], a: S({ l1: [8, 6, 0], l2: [-8, 6, 0], a1: [140, 4], a2: [136, 4] }), b: S({ l1: [8, 6, 0], l2: [-8, 6, 0], a1: [70, 120, .55], a2: [66, 120, .55] }) },
  'band-face-pull': { props: ['bandhigh1'], a: S({ l1: [8, 6, 0], l2: [-8, 6, 0], a1: [140, 4], a2: [136, 4] }), b: S({ l1: [8, 6, 0], l2: [-8, 6, 0], a1: [70, 120, .55], a2: [66, 120, .55] }) },
  'reverse-db-fly': { view: 'front', props: ['fdb'], a: { torso: .42, neck: .9, y: 48, arms: [4, 4], hinge: true }, b: { torso: .42, neck: .9, y: 48, arms: [86, 8], hinge: true } },
  'reverse-pec-deck': { view: 'front', props: ['fseat', 'fhandles'], a: { arms: [80, 0], ua: .45, sit: true }, b: { arms: [88, 4], sit: true } },
  'cable-woodchop': { props: ['cablehigh0'], a: S({ t: -8, l1: [12, 6, 0], l2: [-14, 6, 0], a1: [-150, 0], a2: [-146, 0] }), b: S({ t: 12, l1: [18, 18, 0], l2: [-10, 20, -20], a1: [36, 0], a2: [32, 0] }) },
  'band-woodchop': { props: ['bandhigh0'], a: S({ t: -8, l1: [12, 6, 0], l2: [-14, 6, 0], a1: [-150, 0], a2: [-146, 0] }), b: S({ t: 12, l1: [18, 18, 0], l2: [-10, 20, -20], a1: [36, 0], a2: [32, 0] }) },
  'rotational-ball-slam': { props: ['ballhand'], a: S({ t: -6, l1: [4, 0, 20], l2: [-4, 0, 20], a1: [186, 6], a2: [182, 6] }), b: Object.assign({}, SQUAT, { t: 58, l1: [64, 90, 0], l2: [58, 86, 0], a1: [70, 0], a2: [66, 0] }) },
  'hanging-leg-raise': { props: ['pullbar'], a: Object.assign({}, HANG), b: Object.assign({}, HANG, { t: -6, l1: [92, 0, 90], l2: [88, 0, 90] }) },
  'captains-chair-leg-raise': { props: ['captain'], a: { ground: false, x: 50, y: 62, t: 0, l1: [6, 4, -40], l2: [2, 4, -40], a1: [4, 90], a2: [0, 90] }, b: { ground: false, x: 50, y: 62, t: -4, l1: [92, 0, 90], l2: [88, 0, 90], a1: [4, 90], a2: [0, 90] } },
  'hanging-knee-raise': { props: ['pullbar'], a: Object.assign({}, HANG), b: Object.assign({}, HANG, { t: -8, l1: [118, 128, 0], l2: [114, 126, 0] }) },
  'reverse-crunch': { props: [], a: { ground: false, x: 50, y: 90, t: -90, l1: [180, 90, 0], l2: [176, 90, 0], a1: [70, 0], a2: [66, 0] }, b: { ground: false, x: 52, y: 85, t: -78, l1: [212, 120, 30], l2: [208, 120, 30], a1: [70, 0], a2: [66, 0] } },
  'bulgarian-split-squat': { props: ['benchback', 'db1', 'db2'], a: S({ l1: [10, 6, 0], l2: [-36, 70, -80], a1: [2, 0], a2: [-2, 0] }), b: S({ t: 12, l1: [76, 92, 0], l2: [-10, 104, -80], a1: [8, 0], a2: [4, 0] }) },
  'reverse-lunge': { props: ['db1', 'db2'], a: S({ a1: [2, 0], a2: [-2, 0] }), b: S({ t: 6, l1: [74, 82, 0], l2: [-30, 100, -70], a1: [4, 0], a2: [0, 0] }) },
  'step-up': { props: ['box1', 'db1', 'db2'], a: { t: 6, l1: [80, 80, 0], l2: [-2, 0, 0], a1: [4, 0], a2: [0, 0] }, b: { ground: false, x: 58, y: 28, t: 0, l1: [2, 0, 0], l2: [70, 90, 0], a1: [2, 0], a2: [-2, 0] } },
  'pull-up': { props: ['pullbar'], a: Object.assign({}, HANG), b: Object.assign({}, HANG, { y: 52, a1: [12, 164, .55], a2: [8, 164, .55] }) },
  'band-assisted-pull-up': { props: ['pullbar', 'band'], a: Object.assign({}, HANG, { l1: [40, 110, -80], l2: [4, 6, -40] }), b: Object.assign({}, HANG, { y: 52, l1: [40, 110, -80], l2: [4, 6, -40], a1: [12, 164, .55], a2: [8, 164, .55] }) },
  'overhead-press': { props: ['bar1'], a: S({ a1: [104, 94, .7], a2: [100, 94, .7] }), b: S({ hd: 6, a1: [176, 2], a2: [172, 2] }) },
  'standing-db-press': { props: ['db1', 'db2'], a: S({ a1: [100, 80, .8], a2: [96, 80, .8] }), b: S({ a1: [176, 2], a2: [172, 2] }) },
  'single-arm-db-row': { props: ['rowbench', 'db1'], a: { ground: false, x: 34, y: 58, t: 92, l1: [-2, 6, 0, 1.03], l2: [4, 92, -80], a1: [0, 0], a2: [6, 0] }, b: { ground: false, x: 34, y: 58, t: 92, l1: [-2, 6, 0, 1.03], l2: [4, 92, -80], a1: [-70, 74, .9], a2: [6, 0] } },
  't-bar-row': { props: ['tbar'], a: HINGE(50, { l1: [14, 34, 0], l2: [8, 32, 0], a1: [2, 0], a2: [-2, 0] }), b: HINGE(50, { l1: [14, 34, 0], l2: [8, 32, 0], a1: [-58, 76, .9], a2: [-62, 76, .9] }) },
  'chest-supported-db-row': { props: ['proneincline', 'db1', 'db2'], a: { ground: false, x: 40, y: 64, t: 58, l1: [-22, 10, 0], l2: [-26, 10, 0], a1: [0, 0], a2: [-4, 0] }, b: { ground: false, x: 40, y: 64, t: 58, l1: [-22, 10, 0], l2: [-26, 10, 0], a1: [-70, 80, .9], a2: [-74, 80, .9] } },
  'single-arm-cable-row': { props: ['cablemid1'], a: S({ l1: [16, 10, 0], l2: [-14, 10, 0], a1: [88, 2], a2: [-6, 10] }), b: S({ l1: [16, 10, 0], l2: [-14, 10, 0], a1: [-46, 120, .9], a2: [-6, 10] }) },
  'db-curl': { props: ['db1', 'db2'], a: S({ a1: [2, 4], a2: [-2, 4] }), b: S({ a1: [6, 146], a2: [2, 146] }) },
  'ez-bar-curl': { props: ['bar1'], a: S({ a1: [6, 6], a2: [2, 6] }), b: S({ a1: [8, 144], a2: [4, 144] }) },
  'hammer-curl': { props: ['dbv1', 'dbv2'], a: S({ a1: [2, 4], a2: [-2, 4] }), b: S({ a1: [6, 146], a2: [2, 146] }) },
  'preacher-curl': { props: ['preacher', 'db1'], a: S({ t: 14, a1: [44, 34], a2: [-6, 10] }), b: S({ t: 14, a1: [44, 134], a2: [-6, 10] }) },
  'triceps-rope-pulldown': { props: ['cablehigh1r'], a: S({ t: 6, a1: [6, 96], a2: [2, 96] }), b: S({ t: 6, a1: [6, 2], a2: [2, 2] }) },
  'triceps-flat-pulldown': { props: ['cablehigh1'], a: S({ t: 6, a1: [6, 96], a2: [2, 96] }), b: S({ t: 6, a1: [6, 2], a2: [2, 2] }) },
  'skull-crusher': { props: ['flat', 'db1', 'db2'], a: Object.assign({}, LIE, { a1: [176, 0], a2: [172, 0] }), b: Object.assign({}, LIE, { a1: [196, -118], a2: [192, -118] }) },
  'suitcase-carry': { props: ['db1'], a: S({ a1: [2, 0], a2: [-4, 8] }), b: Object.assign({}, WALK, { a1: [2, 0], a2: [-14, 10] }) },
  'kettlebell-suitcase-carry': { props: ['kb1'], a: S({ a1: [2, 0], a2: [-4, 8] }), b: Object.assign({}, WALK, { a1: [2, 0], a2: [-14, 10] }) },
  'waiters-walk': { props: ['dbup1'], a: S({ a1: [178, 0], a2: [-4, 8] }), b: Object.assign({}, WALK, { a1: [178, 0], a2: [-14, 10] }) }
};

/* Turn a pose into joints, grounded on the floor unless it is held up by the kit */
function solve(m, p) {
  if (m.view === 'front') {
    const q = Object.assign({ x: 50, y: 50 }, p);
    if (q.sit) { q.y = 62; q.ls = .45; }
    const j = front(q);
    if (!q.sit) { const low = Math.max(j.r.ank[1], j.l.ank[1]); const dy = FLOOR - low; shiftF(j, dy); }
    return j;
  }
  const j = side(p);
  if (p.ground !== false) {
    const low = Math.max(j.l1.ank[1], j.l2.ank[1], j.l1.toe[1], j.l2.toe[1], j.l1.knee[1], j.l2.knee[1]);
    shift(j, FLOOR - low);
  }
  return j;
}
function mv(a, dy) { a[1] += dy; }
function shift(j, dy) { [j.hip, j.sh, j.head, j.l1.knee, j.l1.ank, j.l1.toe, j.l2.knee, j.l2.ank, j.l2.toe, j.a1.el, j.a1.hand, j.a2.el, j.a2.hand].forEach(a => mv(a, dy)); }
function shiftF(j, dy) { [j.shC, j.hipC, j.head].forEach(a => mv(a, dy)); ['r', 'l'].forEach(s => Object.values(j[s]).forEach(a => mv(a, dy))); }
function lerpP(a, b, k) {
  const o = {};
  for (const key of new Set(Object.keys(a).concat(Object.keys(b)))) {
    const x = a[key], y = b[key];
    if (Array.isArray(x) && Array.isArray(y)) o[key] = x.map((v, i) => v == null || y[i] == null ? (k < .5 ? v : y[i]) : v + (y[i] - v) * k);
    else if (typeof x === 'number' && typeof y === 'number') o[key] = x + (y - x) * k;
    else o[key] = k < .5 ? (x !== undefined ? x : y) : (y !== undefined ? y : x);
  }
  return o;
}

/* Drawing */
const f = (n) => n.toFixed(1);
const line = (a, b, w, cls) => '<path class="' + (cls || '') + '" d="M' + f(a[0]) + ' ' + f(a[1]) + 'L' + f(b[0]) + ' ' + f(b[1]) + '" stroke-width="' + w + '"/>';
const poly = (pts, w, cls) => '<path class="' + (cls || '') + '" d="M' + pts.map(p => f(p[0]) + ' ' + f(p[1])).join('L') + '" stroke-width="' + w + '"/>';
function dbH(p, rot) { return '<g class="kit w" transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + (rot || 0) + ')"><rect x="-4.6" y="-5" width="9.2" height="10" rx="2.2"/></g>'; }
function dbV(p) { return '<g class="kit w" transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ')"><rect x="-3.4" y="-9" width="6.8" height="5" rx="1.6"/><rect x="-3.4" y="4" width="6.8" height="5" rx="1.6"/><path d="M0 -4V4" stroke-width="2.2"/></g>'; }
function kb(p) { return '<g class="kit w" transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ')"><path d="M-3 -1.5C-3 -6 3 -6 3 -1.5" fill="none" stroke-width="2"/><circle cx="0" cy="5" r="5.4"/></g>'; }
function plate(p, r) { return '<circle class="kit w" cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="' + (r || 6.4) + '"/><circle class="kit hole" cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="1.5"/>'; }
function kit(m, j) {
  let back = '', fr = '';
  const fl = (x1, x2) => '<path class="kit" d="M' + x1 + ' ' + (FLOOR + 1.6) + 'H' + x2 + '" stroke-width="1.4"/>';
  for (const k of m.props || []) {
    if (j.front) {
      if (k === 'fdb') fr += dbH(j.r.hand, 90) + dbH(j.l.hand, 90);
      if (k === 'fcable') fr += line(j.r.hand, [12, FLOOR - 4], 1.2, 'kit cable') + dbH(j.r.hand, 90).replace('w"', 'w small"');
      if (k === 'fseat') back += '<path class="kit pad" d="M34 ' + f(j.hipC[1] + 4) + 'H66" stroke-width="5"/><path class="kit" d="M50 ' + f(j.hipC[1] + 6) + 'V' + FLOOR + 'M40 ' + FLOOR + 'H60" stroke-width="1.6"/>';
      if (k === 'fhandles') fr += dbH(j.r.hand, 0).replace('w"', 'w small"') + dbH(j.l.hand, 0).replace('w"', 'w small"');
      continue;
    }
    const h1 = j.a1.hand, h2 = j.a2.hand;
    switch (k) {
      case 'db1': fr += dbH(h1); break;
      case 'db2': back += dbH(h2).replace('kit w', 'kit w far'); break;
      case 'dbv1': fr += dbV(h1); break;
      case 'dbv2': back += dbV(h2).replace('kit w', 'kit w far'); break;
      case 'dbup1': fr += dbH(h1); break;
      case 'kb1': fr += kb(h1); break;
      case 'kb2': back += kb(h2).replace('kit w', 'kit w far'); break;
      case 'bar1': fr += plate(h1); break;
      case 'barback': fr += plate([j.sh[0] - 3.5, j.sh[1] - 1.5]); break;
      case 'trap': fr += '<path class="kit" d="M' + f(h1[0] - 12) + ' ' + f(h1[1] + 1) + 'H' + f(h1[0] + 12) + '" stroke-width="2.6"/>' + plate([h1[0] - 12, h1[1] + 1], 6) + plate([h1[0] + 12, h1[1] + 1], 6); break;
      case 'ballhand': fr += '<circle class="kit w" cx="' + f(h1[0]) + '" cy="' + f(h1[1] - 1) + '" r="6"/>'; break;
      case 'ball1': back += '<circle class="kit" cx="' + f(j.l1.ank[0] + 2) + '" cy="' + f(FLOOR - 9) + '" r="9.5" stroke-width="1.6" fill="none"/>'; break;
      case 'slider1': back += '<path class="kit" d="M' + f(j.l1.ank[0] - 3) + ' ' + f(FLOOR + 1) + 'h8" stroke-width="2.6"/>'; break;
      case 'pullbar': back += '<path class="kit" d="M' + f(h1[0] - 26) + ' ' + f(Math.min(h1[1], h2[1]) - 1) + 'H' + f(h1[0] + 22) + '" stroke-width="2.4"/>'; break;
      case 'band': fr += '<path class="kit cable" d="M' + f(h1[0]) + ' ' + f(h1[1]) + 'L' + f(j.l1.knee[0]) + ' ' + f(j.l1.knee[1] + 2) + '" stroke-width="1.6"/>'; break;
      case 'flat': back += '<path class="kit pad" d="M' + f(j.head[0] - 2) + ' ' + f(j.hip[1] + 5) + 'H' + f(j.hip[0] + 8) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.head[0] + 6) + ' ' + f(j.hip[1] + 7) + 'V' + (FLOOR + 1) + 'M' + f(j.hip[0]) + ' ' + f(j.hip[1] + 7) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break;
      case 'incline': back += '<path class="kit pad" d="M' + f(j.hip[0] - 4 + 5 * Math.cos(32 * R)) + ' ' + f(j.hip[1] + 5) + 'L' + f(j.sh[0] - 9) + ' ' + f(j.sh[1] - 3) + '" stroke-width="4.4"/><path class="kit pad" d="M' + f(j.hip[0] - 6) + ' ' + f(j.hip[1] + 5) + 'H' + f(j.hip[0] + 10) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.hip[0]) + ' ' + f(j.hip[1] + 7) + 'V' + (FLOOR + 1) + 'M' + f(j.sh[0]) + ' ' + f(j.hip[1]) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break;
      case 'proneincline': back += '<path class="kit pad" d="M' + f(j.hip[0] + 3) + ' ' + f(j.hip[1] + 6) + 'L' + f(j.sh[0] + 4) + ' ' + f(j.sh[1] + 6) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.hip[0] + 6) + ' ' + f(j.hip[1] + 8) + 'V' + (FLOOR + 1) + 'M' + f(j.sh[0] + 2) + ' ' + f(j.sh[1] + 9) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break;
      case 'seatback': case 'uprightseat': case 'curlseat': case 'pulldown': case 'rowseat': case 'assist': case 'captain': {
        const sx = j.hip[0], sy = j.hip[1];
        if (k === 'rowseat') { back += '<path class="kit pad" d="M' + f(sx - 10) + ' ' + f(sy + 5) + 'H' + f(sx + 8) + '" stroke-width="4.4"/><path class="kit" d="M' + f(sx - 14) + ' ' + (FLOOR + 1) + 'H' + f(j.l1.ank[0] + 10) + 'M' + f(j.l1.toe[0] + 3) + ' ' + f(j.l1.ank[1] - 10) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break; }
        if (k === 'assist') { back += '<path class="kit pad" d="M' + f(j.l1.knee[0] - 10) + ' ' + f(j.l1.knee[1] + 5) + 'H' + f(j.l1.knee[0] + 4) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.l1.knee[0] - 3) + ' ' + f(j.l1.knee[1] + 7) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break; }
        if (k === 'captain') { back += '<path class="kit pad" d="M' + f(j.sh[0] - 6) + ' ' + f(j.sh[1] - 6) + 'V' + f(j.hip[1] + 6) + '" stroke-width="4.4"/><path class="kit pad" d="M' + f(j.a1.el[0] - 2) + ' ' + f(j.a1.el[1] + 3) + 'h14" stroke-width="3.6"/><path class="kit" d="M' + f(j.sh[0] - 8) + ' ' + f(j.hip[1] + 6) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break; }
        back += '<path class="kit pad" d="M' + f(sx - 8) + ' ' + f(sy + 5) + 'H' + f(sx + 14) + '" stroke-width="4.4"/>';
        if (k !== 'pulldown') back += '<path class="kit pad" d="M' + f(sx - 7) + ' ' + f(sy + 2) + 'L' + f(j.sh[0] - 7) + ' ' + f(j.sh[1] - 6) + '" stroke-width="4.4"/>';
        back += '<path class="kit" d="M' + f(sx) + ' ' + f(sy + 7) + 'V' + (FLOOR + 1) + 'M' + f(sx - 9) + ' ' + (FLOOR + 1) + 'H' + f(sx + 9) + '" stroke-width="1.6"/>';
        if (k === 'pulldown') back += '<path class="kit pad" d="M' + f(j.l1.knee[0] - 6) + ' ' + f(j.l1.knee[1] - 5) + 'h10" stroke-width="3.6"/>';
        if (k === 'curlseat') back += '<path class="kit pad" d="M' + f(j.l1.knee[0] - 12) + ' ' + f(j.l1.knee[1] - 5.5) + 'h12" stroke-width="3.6"/>';
        break;
      }
      case 'handle1': fr += '<path class="kit" d="M' + f(h1[0]) + ' ' + f(h1[1] - 5) + 'V' + f(h1[1] + 5) + '" stroke-width="2.6"/>'; break;
      case 'roller1': fr += '<circle class="kit w" cx="' + f(j.l1.ank[0] + (j.l1.ank[0] > j.l1.knee[0] ? 0 : -1)) + '" cy="' + f(j.l1.ank[1] - 2) + '" r="3.6"/>'; break;
      case 'lpress': {
        const ft = [(j.l1.ank[0] + j.l1.toe[0]) / 2, (j.l1.ank[1] + j.l1.toe[1]) / 2];
        fr += '<path class="kit" d="M' + f(ft[0] - 7) + ' ' + f(ft[1] - 7) + 'L' + f(ft[0] + 9) + ' ' + f(ft[1] + 9) + '" stroke-width="3"/>';
        back += '<path class="kit pad" d="M' + f(j.hip[0] - 2) + ' ' + f(j.hip[1] + 5) + 'L' + f(j.sh[0] - 6) + ' ' + f(j.sh[1] + 2) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.hip[0]) + ' ' + f(j.hip[1] + 7) + 'V' + (FLOOR + 1) + 'M' + f(j.hip[0] + 6) + ' ' + (FLOOR + 1) + 'L' + f(ft[0] + 18) + ' ' + f(ft[1] + 10) + '" stroke-width="1.4" stroke-dasharray="2 2.4"/>';
        break;
      }
      case 'smith': back += '<path class="kit" d="M' + f(h1[0] + 7) + ' 2V' + (FLOOR + 1) + '" stroke-width="1.4"/>'; break;
      case 'benchfeet': back += '<path class="kit pad" d="M' + f(j.l1.ank[0] - 8) + ' ' + f(j.l1.ank[1] + 5) + 'H' + f(j.l1.ank[0] + 8) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.l1.ank[0]) + ' ' + f(j.l1.ank[1] + 7) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break;
      case 'benchback': back += '<path class="kit pad" d="M' + f(j.l2.toe[0] - 10) + ' ' + f(j.l2.ank[1] + 4) + 'H' + f(j.l2.toe[0] + 6) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.l2.toe[0] - 2) + ' ' + f(j.l2.ank[1] + 6) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break;
      case 'rowbench': back += '<path class="kit pad" d="M' + f(j.l1.knee[0] - 6) + ' ' + f(j.l1.knee[1] + 4) + 'H' + f(j.a2.hand[0] + 6) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.l1.knee[0]) + ' ' + f(j.l1.knee[1] + 6) + 'V' + (FLOOR + 1) + 'M' + f(j.a2.hand[0]) + ' ' + f(j.l1.knee[1] + 6) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break;
      case 'box1': back += '<rect class="kit pad2" x="' + f(j.l1.ank[0] - 8) + '" y="' + f(j.l1.ank[1] + 1.5) + '" width="20" height="' + f(FLOOR + 1 - j.l1.ank[1] - 1.5) + '" stroke-width="1.6"/>'; break;
      case 'hyper': back += '<path class="kit pad" d="M' + f(j.hip[0] - 4) + ' ' + f(j.hip[1] + 5) + 'l-8 8" stroke-width="4.4"/><path class="kit" d="M' + f(j.l1.ank[0] - 2) + ' ' + f(j.l1.ank[1] + 4) + 'L' + f(j.hip[0] - 10) + ' ' + (FLOOR + 1) + 'M' + f(j.hip[0] - 6) + ' ' + f(j.hip[1] + 10) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break;
      case 'preacher': back += '<path class="kit pad" d="M' + f(j.sh[0] + 2) + ' ' + f(j.sh[1] + 4) + 'L' + f(j.a1.el[0] + 4) + ' ' + f(j.a1.el[1] + 4) + '" stroke-width="4.4"/><path class="kit" d="M' + f(j.sh[0] + 4) + ' ' + f(j.sh[1] + 6) + 'V' + (FLOOR + 1) + '" stroke-width="1.6"/>'; break;
      case 'tbar': fr += plate(h1, 6.4); back += '<path class="kit" d="M' + f(h1[0]) + ' ' + f(h1[1]) + 'L' + f(h1[0] - 40) + ' ' + (FLOOR) + '" stroke-width="2"/>'; break;
      case 'kneelhigh': case 'cableup1': back += line(h1, [h1[0] + 2, 0], 1.2, 'kit cable') + '<circle class="kit" cx="' + f(h1[0] + 2) + '" cy="1" r="2.4" stroke-width="1.4" fill="none"/>'; break;
      case 'cablehigh1': case 'cablehigh1r': back += line(h1, [96, 12], 1.2, 'kit cable') + '<circle class="kit" cx="97" cy="11" r="2.4" stroke-width="1.4" fill="none"/>' + (k === 'cablehigh1r' ? line([h1[0] - 1, h1[1]], [h1[0] - 2, h1[1] + 6], 1.6, 'kit') : line([h1[0], h1[1] - 2.5], [h1[0], h1[1] + 2.5], 2.6, 'kit')); break;
      case 'bandhigh1': back += line(h1, [96, 12], 1.6, 'kit band') + '<path class="kit" d="M96 6V18" stroke-width="2"/>'; break;
      case 'cablehigh0': back += line(h1, [4, 8], 1.2, 'kit cable') + '<circle class="kit" cx="3" cy="7" r="2.4" stroke-width="1.4" fill="none"/>'; break;
      case 'bandhigh0': back += line(h1, [4, 8], 1.6, 'kit band') + '<path class="kit" d="M2 2V14" stroke-width="2"/>'; break;
      case 'cablemid1': back += line(h1, [102, h1[1] - 2], 1.2, 'kit cable') + '<circle class="kit" cx="103" cy="' + f(h1[1] - 2) + '" r="2.4" stroke-width="1.4" fill="none"/>'; break;
      case 'bandmid1': back += line(h1, [102, h1[1] - 2], 1.6, 'kit band') + '<path class="kit" d="M103 ' + f(h1[1] - 8) + 'V' + f(h1[1] + 4) + '" stroke-width="2"/>'; break;
      case 'cablelow1': back += line(h1, [2, FLOOR - 6], 1.2, 'kit cable') + '<circle class="kit" cx="1" cy="' + (FLOOR - 6) + '" r="2.4" stroke-width="1.4" fill="none"/>'; break;
      case 'cablerow1': back += line(h1, [104, h1[1] + 4], 1.2, 'kit cable') + line([h1[0], h1[1] - 3], [h1[0], h1[1] + 3], 2.6, 'kit'); break;
    }
  }
  return { back, fr };
}
function body(j) {
  if (j.front) {
    const sB = (s) => line(s.sh, s.el, 5.6, 'lb') + line(s.el, s.hand, 5, 'lb') + line(s.hp, s.knee, 6.4, 'lb') + line(s.knee, s.ank, 5.6, 'lb') + line(s.ank, s.toe, 4, 'lb');
    return '<g class="fig">' + sB(j.l) + sB(j.r) +
      '<path class="tb" d="M' + f(j.l.sh[0]) + ' ' + f(j.l.sh[1]) + 'L' + f(j.r.sh[0]) + ' ' + f(j.r.sh[1]) + 'L' + f(j.r.hp[0]) + ' ' + f(j.r.hp[1]) + 'L' + f(j.l.hp[0]) + ' ' + f(j.l.hp[1]) + 'Z" stroke-width="5" stroke-linejoin="round"/>' +
      '<circle class="hd" cx="' + f(j.head[0]) + '" cy="' + f(j.head[1]) + '" r="6.6"/></g>';
  }
  const far = line(j.hip, j.l2.knee, 7, 'far') + line(j.l2.knee, j.l2.ank, 6.2, 'far') + line(j.l2.ank, j.l2.toe, 4.4, 'far') + line(j.sh, j.a2.el, 6, 'far') + line(j.a2.el, j.a2.hand, 5.4, 'far');
  const near = line(j.hip, j.l1.knee, 7.4, 'lb') + line(j.l1.knee, j.l1.ank, 6.6, 'lb') + line(j.l1.ank, j.l1.toe, 4.6, 'lb');
  const torso = line(j.hip, j.sh, 9.6, 'tb') + line(j.sh, [j.sh[0] + (j.head[0] - j.sh[0]) * .35, j.sh[1] + (j.head[1] - j.sh[1]) * .35], 5, 'tb') + '<circle class="hd" cx="' + f(j.head[0]) + '" cy="' + f(j.head[1]) + '" r="6.6"/>';
  const arm = line(j.sh, j.a1.el, 6.4, 'lb') + line(j.a1.el, j.a1.hand, 5.8, 'lb');
  return { far: '<g class="fig far">' + far + '</g>', near: '<g class="fig">' + near + torso + '</g>', arm: '<g class="fig">' + arm + '</g>' };
}
function frameSvg(m, p, extra) {
  const j = solve(m, p), k = kit(m, j);
  let inner;
  if (j.front) inner = k.back + body(j) + k.fr;
  else { const b = body(j); inner = k.back + b.far + b.near + b.arm + k.fr; }
  return '<svg class="mv' + (extra || '') + '" viewBox="-8 -6 116 108" aria-hidden="true"><path class="floor" d="M-8 ' + (FLOOR + 1.6) + 'H108" stroke-width="1"/>' + inner + '</svg>';
}
export function hasPose(id) { return !!POSES[id]; }
/* Two frames on a strip of film: the start, then the end */
export function pair(id) {
  const m = POSES[id];
  if (!m) return '';
  return '<div class="filmstrip"><div class="fr"><span class="fl">1</span>' + frameSvg(m, m.a) + '</div><div class="fr"><span class="fl">2</span>' + frameSvg(m, m.b) + '</div></div>';
}
export function still(id, which) { const m = POSES[id]; return m ? frameSvg(m, which === 'b' ? m.b : m.a) : ''; }
/* The move, played between its two frames: out, hold, back, hold */
export function play(el, id, period = 2600) {
  const m = POSES[id]; if (!m || !el) return () => {};
  let raf = 0, t0 = performance.now(), last = -1;
  const reduceM = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const ease = (x) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  function frame(now) {
    const ph = ((now - t0) % period) / period;
    let k = ph < .38 ? ease(ph / .38) : ph < .5 ? 1 : ph < .88 ? 1 - ease((ph - .5) / .38) : 0;
    const q = Math.round(k * 60) / 60;
    if (q !== last) { last = q; el.innerHTML = frameSvg(m, lerpP(m.a, m.b, q), ' live'); }
    raf = requestAnimationFrame(frame);
  }
  if (reduceM) { el.innerHTML = pair(id); return () => {}; }
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}
