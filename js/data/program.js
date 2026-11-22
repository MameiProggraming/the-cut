/* The programme, from training-brief.html. This file is the source of truth for the week, the sessions,
   the template day, the supplements and the reference pages. Exercise content lives in exercises.js and the
   meals in meals.js. */

export const START = '2026-11-03';          // first day of the programme; week 1 runs from the Sunday before
export const TARGET = { protein: 140, kcal: 2200, maint: 2550, lo: 66, hi: 69, startKg: 72, rate: [0.4, 0.5], weeks: [8, 10] };
export const CAFFEINE_CUT = '14:00';
export const TENNIS_TIME = '18:30';         // default; changeable in settings

/* Each session owns a tint inside the gym's light. The whole app takes it on that day. */
export const SESSIONS = {
  A: {
    id: 'A', title: 'Squat & Push', day: 1, light: '#8CC4FF', lic: '96,160,255', tint: 'Ice',
    when: 'Monday, morning', note: 'Tennis follows tonight. Keep the leg work controlled.',
    moves: [
      { ex: 'leg-press', sets: 3, reps: '8', hint: 'or goblet squat' },
      { ex: 'incline-db-press', sets: 3, reps: '8–10' },
      { ex: 'lat-pulldown', sets: 3, reps: '10', hint: 'neutral grip' },
      { ex: 'db-shoulder-press', sets: 3, reps: '10' },
      { ex: 'lateral-raise', sets: 3, reps: '15' },
      { ex: 'pallof-press', sets: 3, reps: '12', per: 'side' },
      { ex: 'farmers-carry', sets: 3, reps: '40', unit: 'm' }
    ]
  },
  B: {
    id: 'B', title: 'Hinge & Pull', day: 3, light: '#7EE3D6', lic: '96,224,206', tint: 'Mercury',
    when: 'Wednesday, morning', note: 'Romanian deadlifts are technique first. Stop the set when the back rounds.',
    moves: [
      { ex: 'romanian-deadlift', sets: 3, reps: '8' },
      { ex: 'seated-cable-row', sets: 3, reps: '10' },
      { ex: 'flat-db-press', sets: 3, reps: '8–10' },
      { ex: 'leg-curl', sets: 3, reps: '12' },
      { ex: 'face-pull', sets: 3, reps: '15' },
      { ex: 'cable-woodchop', sets: 3, reps: '12', per: 'side', hint: 'high to low' },
      { ex: 'hanging-leg-raise', sets: 3, reps: '10' }
    ]
  },
  C: {
    id: 'C', title: 'Single Leg & Overhead', day: 5, light: '#B9A8FF', lic: '170,150,255', tint: 'Arc',
    when: 'Friday, no tennis after', note: 'Your hardest session. Nothing follows it, so go after it.',
    moves: [
      { ex: 'bulgarian-split-squat', sets: 3, reps: '8', per: 'leg' },
      { ex: 'pull-up', sets: 3, reps: '8', hint: 'or assisted' },
      { ex: 'overhead-press', sets: 3, reps: '8' },
      { ex: 'single-arm-db-row', sets: 3, reps: '10', per: 'side' },
      { ex: 'db-curl', sets: 3, reps: '12' },
      { ex: 'triceps-rope-pulldown', sets: 3, reps: '12' },
      { ex: 'suitcase-carry', sets: 3, reps: '30', unit: 'm', per: 'side' }
    ]
  }
};

/* Mobility (added at Rashed's request, 20 Nov 2026): two floor sessions of about 15 minutes, no weights,
   for the days without the gym. A move has either reps or a hold in seconds; per: 'side' doubles it.
   Tints are the first build's choice and open to his change: M1 Rose, M2 Orchid. */
export const MOBILITY = {
  M1: {
    id: 'M1', mob: true, title: 'Hips & Legs', light: '#FFA3B8', lic: '255,150,175', tint: 'Rose',
    when: 'Sunday and Thursday', note: 'About fifteen quiet minutes on the floor, no weights. Breathe slowly and stay where you feel a stretch, never pain.',
    moves: [
      { ex: 'hip-90-90', sets: 2, reps: '8' },
      { ex: 'worlds-greatest-stretch', sets: 1, reps: '5', per: 'side' },
      { ex: 'couch-stretch', sets: 1, hold: 45, per: 'side' },
      { ex: 'cossack-squat', sets: 2, reps: '6', per: 'side' },
      { ex: 'deep-squat-hold', sets: 2, hold: 45 },
      { ex: 'ankle-rocks', sets: 1, reps: '10', per: 'side' },
      { ex: 'supine-hamstring-stretch', sets: 1, hold: 45, per: 'side' },
      { ex: 'pigeon-stretch', sets: 1, hold: 45, per: 'side' }
    ]
  },
  M2: {
    id: 'M2', mob: true, title: 'Back & Shoulders', light: '#EFA6E8', lic: '235,150,230', tint: 'Orchid',
    when: 'Tuesday and Saturday', note: 'For the back and the serving shoulder. Slow and controlled: every move should feel easier on the last rep than the first.',
    moves: [
      { ex: 'cat-cow', sets: 1, reps: '10' },
      { ex: 'thread-the-needle', sets: 1, reps: '8', per: 'side' },
      { ex: 'open-book', sets: 1, reps: '8', per: 'side' },
      { ex: 'child-pose-side-reach', sets: 1, hold: 30, per: 'side' },
      { ex: 'sphinx', sets: 1, hold: 60 },
      { ex: 'wall-slide', sets: 2, reps: '10' },
      { ex: 'sleeper-stretch', sets: 1, hold: 30, per: 'side' },
      { ex: 'supine-twist', sets: 1, hold: 45, per: 'side' }
    ]
  }
};

/* 0 = Sunday. Gym is morning, tennis is evening. Mobility is any time on the days without the gym. */
export const WEEK = [
  { gym: null, tennis: true, mob: 'M1' },
  { gym: 'A', tennis: true },
  { gym: null, tennis: true, mob: 'M2' },
  { gym: 'B', tennis: true },
  { gym: null, tennis: true, mob: 'M1' },
  { gym: 'C', tennis: false, hardest: true },
  { gym: null, tennis: false, rest: true, mob: 'M2' }
];

/* The template day. Meals are picked from the bank; these are the defaults for each slot. */
export const PRE_GYM = { id: 'coffee-banana', name: 'Black coffee + 1 banana', cat: 'snack', p: 1, k: 105, c: 27, f: 0, est: true, builtin: true,
  ing: [{ q: 1, u: '', item: 'banana', aisle: 'produce' }, { q: null, u: '', item: 'black coffee', aisle: 'pantry' }],
  steps: ['Drink the coffee and eat the banana before the gym.'], tip: 'Optional. Training fasted is fine too; just get protein in within an hour after.' };

export const SLOTS = [
  { id: 'pre', time: '07:00', label: 'Pre-gym', note: 'Optional, or train fasted', meal: 'coffee-banana', gymOnly: true, optional: true },
  { id: 'breakfast', time: '09:00', label: 'Breakfast', note: 'Straight after the gym', noteRest: 'Breakfast', meal: 'greek-yogurt-power-bowl', cat: 'breakfast' },
  { id: 'lunch', time: '13:00', label: 'Lunch', note: 'Main carb load of the day', meal: 'chicken-shawarma-bowl', cat: 'lunch' },
  { id: 'fuel', time: '17:00', label: 'Pre-tennis', note: '90 min before court', meal: 'cottage-cheese-dates', cat: 'snack', tennisOnly: true },
  { id: 'snack', time: '16:30', label: 'Snack', note: 'The 16:00 decision, made', meal: 'eggs-labneh', cat: 'snack', noTennisOnly: true },
  { id: 'dinner', time: '20:30', label: 'Dinner', note: 'Post-tennis recovery', noteRest: 'Dinner', meal: 'grilled-salmon-freekeh', cat: 'dinner' }
];

export const SUPPLEMENTS = {
  take: [
    { id: 'creatine', name: 'Creatine monohydrate', dose: '5 g daily, any time', text: 'The best evidence of anything on the market. No loading phase. Expect 1–1.5 kg of scale weight in week one: water inside the muscle, not fat.' },
    { id: 'protein', name: 'NXT beef protein isolate', dose: '1–2 servings of 30 g, top-up only', text: '27 g of protein for 110 kcal. Lower in leucine than whey, so take it alongside meals, not as one, and let whole food carry the 140 g.' },
    { id: 'lmnt', name: 'LMNT electrolytes', dose: '1 packet before tennis', text: '1,000 mg of sodium is right for Dubai heat. Start drinking before you walk on court. Add carbs for sessions over 90 minutes: LMNT has none.' },
    { id: 'caffeine', name: 'Caffeine', dose: '150–250 mg before 14:00', text: 'Genuinely performance-enhancing. 14:00 is the hard cut-off, and Coke Zero counts.' }
  ],
  skip: [
    { id: 'bcaa', name: 'BCAAs', text: 'Three of nine essential amino acids. At 140 g of protein they add nothing.' },
    { id: 'glutamine', name: 'Glutamine', text: 'Your body makes it and your diet supplies it. The research was in burn and trauma patients.' },
    { id: 'burners', name: 'Fat burners', text: 'Caffeine plus filler at ten times the price.' },
    { id: 'tboost', name: 'Testosterone boosters', text: 'They don’t raise testosterone in men with normal levels.' }
  ],
  notes: [
    { id: 'coke', title: 'The caffeine leak', text: 'Coke Zero has about 34 mg of caffeine per 355 ml can. Caffeine’s half-life is 5–6 hours, so a can at 20:00 leaves half of it circulating at 02:00. Sleep outranks every supplement here. After 14:00: sparkling water.' },
    { id: 'peptides', title: 'Peptides: on hold', text: 'GHK-Cu and the “Wolverine stack” are held until after 8 weeks of creatine, 140 g of protein and consistent training. Revisit with a doctor and bloodwork.' }
  ]
};

export const PLAN = {
  objective: 'A body-fat outcome, not a muscle one. At 170 cm you already carry enough muscle; visible abs arrive at roughly 10–12 % body fat. This is fat loss with muscle preservation.',
  reality: 'The reference photos are lit, pumped and posed. The real-world version is slightly less dramatic, and still achievable inside eight to ten weeks.',
  numbers: [
    { v: '140', u: 'g', l: 'Protein a day', n: 'The single non-negotiable. It protects muscle in a deficit.' },
    { v: '2,200', u: 'kcal', l: 'A day', n: 'Maintenance is near 2,550 with this training load. A modest deficit only.' },
    { v: '0.4–0.5', u: 'kg', l: 'Loss a week', n: 'Faster than this and you lose the muscle you are keeping.' },
    { v: '8–10', u: 'weeks', l: 'Timeline', n: 'Without crashing energy or court performance.' }
  ],
  calibrate: 'Track for three weeks, then stop. You need to calibrate once, not count forever.',
  measuring: [
    { id: 'garmin', name: 'Garmin Cirqa', text: 'Check Training Readiness every morning before the gym. A low score means dial the session back a set, not skip it.' },
    { id: 'weight', name: 'Weight', text: 'Weigh in every morning, same conditions, and judge only the weekly average. Daily numbers are mostly water and food in transit.' },
    { id: 'photos', name: 'Photos', text: 'Same spot, same light, same time of day, every two weeks. At 0.5 kg a week the mirror lies and the scale under-reports.' }
  ],
  hierarchy: 'Hit 140 g of protein. Sleep seven to eight hours. Show up to all three sessions. Stay in a modest deficit. Then creatine, caffeine and electrolytes. Supplements are maybe five per cent of the result.',
  timing: 'Eat the biggest carb portion at lunch so it fuels the evening court session. After tennis, protein and fluid matter more than speed.',
  tennis: 'Carries and anti-rotation build the trunk bracing that goes straight into the serve and groundstrokes. Single-leg work matches how you move on court. Face pulls, rear delts and overhead pressing protect the serving shoulder.'
};
