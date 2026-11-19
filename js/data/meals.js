// The 16 starter meals from training-brief.html (06 Eating), in the brief's order.
// p and k are the brief's own figures. c and f are estimates (est: true): each meal
// was costed from its listed grams, then carbs and fat were scaled together so that
// 4p + 4c + 9f sits within 3 % of k. See MEAL_NOTES for every assumption.
//
// Ingredient fields: q = amount (null when the brief gives none), u = 'g' | 'ml' | ''
// (a count), item, optional prep, optional for (what it is used for), aisle.
// shop: false marks things nobody buys (tap water, ice) so the shopping list can skip them.

export const AISLES = [
  { id: 'produce', name: 'Fruit and veg' },
  { id: 'meat', name: 'Meat and fish' },
  { id: 'dairy', name: 'Dairy, eggs and chilled' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'pantry', name: 'Pantry' },
  { id: 'spices', name: 'Spices' },
  { id: 'frozen', name: 'Frozen' },
  { id: 'supplements', name: 'Supplements' }
];

export const MEALS = [
  // Breakfast
  {
    id: 'greek-yogurt-power-bowl',
    name: 'Greek yogurt power bowl',
    cat: 'breakfast',
    p: 30, k: 430,
    c: 53, f: 11, est: true,
    ing: [
      { q: 250, u: 'g', item: 'Greek yogurt', prep: '2 %', aisle: 'dairy' },
      { q: 40, u: 'g', item: 'oats', aisle: 'pantry' },
      { q: 100, u: 'g', item: 'berries', aisle: 'produce' },
      { q: 15, u: 'g', item: 'honey', aisle: 'pantry' },
      { q: 10, u: 'g', item: 'flaked almonds', aisle: 'pantry' }
    ],
    steps: [
      'Spoon the yogurt into a bowl.',
      'Stir in the oats.',
      'Top with the berries, honey and flaked almonds.'
    ],
    tip: 'Zero cooking. The fastest 30 g of protein in the house.',
    batch: { q: null, u: '', item: 'oats', text: 'Optional: soak the oats in the yogurt overnight if you want it softer.' },
    mins: null
  },
  {
    id: 'eggs-labneh-toast',
    name: 'Eggs & labneh toast',
    cat: 'breakfast',
    p: 32, k: 480,
    c: 29, f: 26, est: true,
    ing: [
      { q: 3, u: '', item: 'eggs', aisle: 'dairy' },
      { q: 50, u: 'g', item: 'labneh', aisle: 'dairy' },
      { q: 60, u: 'g', item: 'sourdough', aisle: 'bakery' },
      { q: 50, u: 'g', item: 'avocado', aisle: 'produce' },
      { q: null, u: '', item: 'chilli flakes', aisle: 'spices' },
      { q: null, u: '', item: 'olive oil', aisle: 'pantry' }
    ],
    steps: [
      'Toast the sourdough.',
      'Spread the labneh on the toast.',
      'Soft-scramble the eggs.',
      'Top the toast with the eggs and avocado.',
      'Finish with the chilli flakes, a pinch of sumac and the olive oil.'
    ],
    tip: null,
    batch: null,
    mins: null
  },
  {
    id: 'chicken-sausage-shakshuka',
    name: 'Chicken sausage shakshuka',
    cat: 'breakfast',
    p: 38, k: 480,
    c: 19, f: 28, est: true,
    ing: [
      { q: 3, u: '', item: 'eggs', aisle: 'dairy' },
      { q: 100, u: 'g', item: 'chicken sausage', aisle: 'meat' },
      { q: 200, u: 'g', item: 'tomato', prep: 'chopped', aisle: 'produce' },
      { q: 0.5, u: '', item: 'onion', aisle: 'produce' },
      { q: 1, u: '', item: 'pepper', aisle: 'produce' },
      { q: 10, u: 'g', item: 'olive oil', aisle: 'pantry' },
      { q: null, u: '', item: 'cumin', aisle: 'spices' },
      { q: null, u: '', item: 'paprika', aisle: 'spices' }
    ],
    steps: [
      'Brown the sausage in the olive oil.',
      'Soften the onion and pepper in the same pan.',
      'Add the tomato, cumin and paprika, then simmer for 10 minutes.',
      'Crack the eggs in, put the lid on and cook for 5 minutes.'
    ],
    tip: 'One pan.',
    batch: null,
    mins: null
  },
  {
    id: 'protein-oats',
    name: 'Protein oats',
    cat: 'breakfast',
    p: 40, k: 555,
    c: 64, f: 15, est: true,
    ing: [
      { q: 60, u: 'g', item: 'oats', aisle: 'pantry' },
      { q: 250, u: 'ml', item: 'semi-skimmed milk', aisle: 'dairy' },
      { q: 30, u: 'g', item: 'protein powder', aisle: 'supplements' },
      { q: 15, u: 'g', item: 'peanut butter', aisle: 'pantry' },
      { q: 0.5, u: '', item: 'banana', aisle: 'produce' }
    ],
    steps: [
      'Cook the oats in the milk.',
      'Take the pan off the heat, then stir in the protein powder so it doesn\'t go rubbery.',
      'Top with the peanut butter and banana.'
    ],
    tip: 'Needs an unflavoured or vanilla whey: a clear, juice-style protein will curdle the milk. Highest-calorie option, so use it on gym days.',
    batch: null,
    mins: null
  },

  // Lunch
  {
    id: 'chicken-shawarma-bowl',
    name: 'Chicken shawarma bowl',
    cat: 'lunch',
    p: 48, k: 620,
    c: 50, f: 26, est: true,
    ing: [
      { q: 180, u: 'g', item: 'chicken thigh', aisle: 'meat' },
      { q: 150, u: 'g', item: 'rice', prep: 'cooked', aisle: 'pantry' },
      { q: null, u: '', item: 'salad', aisle: 'produce' },
      { q: 30, u: 'g', item: 'garlic sauce', aisle: 'dairy' },
      { q: 50, u: 'g', item: 'yogurt', for: 'marinade', aisle: 'dairy' },
      { q: null, u: '', item: 'garlic', for: 'marinade', aisle: 'produce' },
      { q: null, u: '', item: 'lemon', for: 'marinade', aisle: 'produce' },
      { q: null, u: '', item: 'baharat', for: 'marinade', aisle: 'spices' }
    ],
    steps: [
      'Mix the yogurt, garlic, lemon and baharat.',
      'Coat the chicken and marinate overnight.',
      'Grill the chicken hard for the char.',
      'Cook the rice.',
      'Slice the chicken over the rice and salad.',
      'Finish with the garlic sauce.'
    ],
    tip: 'Make 700 g of chicken on Sunday and this becomes a four-minute lunch all week.',
    batch: { q: 700, u: 'g', item: 'chicken thigh', text: 'Marinate and grill 700 g of chicken thigh for the week\'s shawarma bowls.' },
    mins: null
  },
  {
    id: 'beef-kofta-plate',
    name: 'Beef kofta plate',
    cat: 'lunch',
    p: 48, k: 680,
    c: 54, f: 30, est: true,
    ing: [
      { q: 200, u: 'g', item: 'lean beef mince', prep: '10 %', aisle: 'meat' },
      { q: 60, u: 'g', item: 'flatbread', aisle: 'bakery' },
      { q: null, u: '', item: 'fattoush salad', aisle: 'produce' },
      { q: 50, u: 'g', item: 'hummus', aisle: 'dairy' },
      { q: null, u: '', item: 'parsley', aisle: 'produce' },
      { q: null, u: '', item: 'onion', aisle: 'produce' },
      { q: null, u: '', item: '7-spice', aisle: 'spices' }
    ],
    steps: [
      'Grate the onion.',
      'Mix the mince with the grated onion, parsley and 7-spice.',
      'Shape onto skewers.',
      'Grill the kofta.',
      'Serve with the flatbread, fattoush salad and hummus.'
    ],
    tip: null,
    batch: { q: null, u: '', item: 'lean beef mince', text: 'Freeze raw kofta in portions. They grill straight from frozen.' },
    mins: null
  },
  {
    id: 'tuna-white-bean-salad',
    name: 'Tuna & white bean salad',
    cat: 'lunch',
    p: 45, k: 430,
    c: 36, f: 12, est: true,
    ing: [
      { q: 160, u: 'g', item: 'tuna in water', prep: 'drained', aisle: 'pantry' },
      { q: 150, u: 'g', item: 'cannellini beans', aisle: 'pantry' },
      { q: null, u: '', item: 'red onion', aisle: 'produce' },
      { q: null, u: '', item: 'parsley', aisle: 'produce' },
      { q: 10, u: 'g', item: 'olive oil', aisle: 'pantry' },
      { q: null, u: '', item: 'lemon', aisle: 'produce' }
    ],
    steps: [
      'Drain the tuna and the beans.',
      'Slice the red onion and chop the parsley.',
      'Toss everything with the olive oil and a squeeze of lemon.'
    ],
    tip: 'No cooking at all and the lowest-calorie lunch here. Keep the tins at the office for the days nothing was prepped.',
    batch: null,
    mins: 5
  },
  {
    id: 'smoked-chicken-potato',
    name: 'Smoked chicken & potato',
    cat: 'lunch',
    p: 45, k: 620,
    c: 50, f: 27, est: true,
    ing: [
      { q: 200, u: 'g', item: 'chicken thigh', prep: 'skin off', aisle: 'meat' },
      { q: 200, u: 'g', item: 'potato', aisle: 'produce' },
      { q: null, u: '', item: 'green beans', aisle: 'produce' },
      { q: 10, u: 'g', item: 'olive oil', aisle: 'pantry' },
      { q: null, u: '', item: 'paprika rub', aisle: 'spices' }
    ],
    steps: [
      'Take the skin off the chicken.',
      'Coat the chicken in the paprika rub.',
      'Smoke the chicken.',
      'Toss the potatoes in the olive oil and roast them alongside.',
      'Cook the green beans.'
    ],
    tip: 'Your smoker earns its keep here. Skin off keeps the fat down without losing the smoke.',
    batch: null,
    mins: null
  },

  // Dinner
  {
    id: 'grilled-salmon-freekeh',
    name: 'Grilled salmon + freekeh',
    cat: 'dinner',
    p: 42, k: 610,
    c: 40, f: 31, est: true,
    ing: [
      { q: 180, u: 'g', item: 'salmon', aisle: 'meat' },
      { q: 150, u: 'g', item: 'freekeh', prep: 'cooked', aisle: 'pantry' },
      { q: null, u: '', item: 'courgette', prep: 'roasted', aisle: 'produce' },
      { q: null, u: '', item: 'pepper', prep: 'roasted', aisle: 'produce' },
      { q: null, u: '', item: 'lemon', aisle: 'produce' },
      { q: 8, u: 'g', item: 'olive oil', aisle: 'pantry' }
    ],
    steps: [
      'Cook the freekeh.',
      'Roast the courgette and pepper in the olive oil.',
      'Cook the salmon skin-side down in a hot, dry pan for 4 minutes.',
      'Flip it and cook for 1 minute more.',
      'Serve over the freekeh with the vegetables and lemon.'
    ],
    tip: 'Freekeh brings the smokiness and more fibre than rice.',
    batch: null,
    mins: null
  },
  {
    id: 'lightened-chicken-machboos',
    name: 'Lightened chicken machboos',
    cat: 'dinner',
    p: 55, k: 580,
    c: 57, f: 15, est: true,
    ing: [
      { q: 200, u: 'g', item: 'chicken breast', aisle: 'meat' },
      { q: 150, u: 'g', item: 'basmati', prep: 'cooked', aisle: 'pantry' },
      { q: null, u: '', item: 'loomi', aisle: 'spices' },
      { q: null, u: '', item: 'tomato', aisle: 'produce' },
      { q: null, u: '', item: 'onion', aisle: 'produce' },
      { q: null, u: '', item: 'baharat', aisle: 'spices' },
      { q: 8, u: 'g', item: 'ghee', aisle: 'pantry' }
    ],
    steps: [
      'Cook the basmati.',
      'Soften the onion in the ghee.',
      'Add the tomato, baharat and loomi.',
      'Add the chicken breast and cook it through.',
      'Serve over the rice.'
    ],
    tip: 'Same dish, less fat and a controlled rice portion. Breast instead of a whole bird is what cuts the calories, not skipping the spice.',
    batch: null,
    mins: null
  },
  {
    id: 'harra-prawns-bulgur',
    name: 'Harra prawns + bulgur',
    cat: 'dinner',
    p: 45, k: 450,
    c: 42, f: 11, est: true,
    ing: [
      { q: 200, u: 'g', item: 'prawns', aisle: 'meat' },
      { q: 150, u: 'g', item: 'bulgur', prep: 'cooked', aisle: 'pantry' },
      { q: 150, u: 'g', item: 'tomato', aisle: 'produce' },
      { q: null, u: '', item: 'garlic', aisle: 'produce' },
      { q: null, u: '', item: 'chilli', aisle: 'produce' },
      { q: null, u: '', item: 'coriander', aisle: 'produce' },
      { q: 8, u: 'g', item: 'olive oil', aisle: 'pantry' }
    ],
    steps: [
      'Cook the bulgur.',
      'Fry the garlic and chilli in the olive oil.',
      'Add the tomato and cook it down.',
      'Add the prawns and cook until just done.',
      'Finish with the coriander and serve over the bulgur.'
    ],
    tip: 'Leanest dinner on the list. Use it on days lunch ran heavy.',
    batch: null,
    mins: 12
  },
  {
    id: 'steak-sweet-potato',
    name: 'Steak & sweet potato',
    cat: 'dinner',
    p: 48, k: 580,
    c: 44, f: 24, est: true,
    ing: [
      { q: 180, u: 'g', item: 'sirloin', prep: 'fat trimmed', aisle: 'meat' },
      { q: 150, u: 'g', item: 'sweet potato', aisle: 'produce' },
      { q: null, u: '', item: 'large salad', aisle: 'produce' },
      { q: 10, u: 'g', item: 'olive oil', aisle: 'pantry' }
    ],
    steps: [
      'Trim the fat cap off the sirloin.',
      'Cook the sweet potato.',
      'Cook the steak however you like.',
      'Rest the steak for 5 minutes.',
      'Serve with the sweet potato and the salad, dressed with the olive oil.'
    ],
    tip: 'Trimming the fat cap is where the calories are saved. The rest matters more than how you cooked it.',
    batch: null,
    mins: null
  },

  // Snacks
  {
    id: 'cottage-cheese-dates',
    name: 'Cottage cheese + dates',
    cat: 'snack',
    p: 25, k: 260,
    c: 23, f: 8, est: true,
    ing: [
      { q: 200, u: 'g', item: 'cottage cheese', aisle: 'dairy' },
      { q: 2, u: '', item: 'dates', aisle: 'pantry' },
      { q: null, u: '', item: 'cinnamon', aisle: 'spices' }
    ],
    steps: [
      'Spoon the cottage cheese into a bowl.',
      'Stone the dates and add them.',
      'Finish with a dusting of cinnamon.'
    ],
    tip: 'The pre-tennis default: slow protein plus fast carbs, 90 minutes before you step on court.',
    batch: null,
    mins: null
  },
  {
    id: 'ice-blast-shake',
    name: 'Ice blast shake',
    cat: 'snack',
    p: 27, k: 110,
    c: 0, f: 0, est: true,
    ing: [
      { q: 30, u: 'g', item: 'NXT beef protein isolate', prep: '¾ scoop', aisle: 'supplements' },
      { q: 400, u: 'ml', item: 'water', prep: 'cold', aisle: 'pantry', shop: false },
      { q: null, u: '', item: 'ice', aisle: 'frozen', shop: false }
    ],
    steps: [
      'Measure out 30 g of the protein, about ¾ scoop.',
      'Mix it with the cold water.',
      'Pour it over ice.'
    ],
    tip: 'Clear, juice-style protein: mix with water, never milk, as the citric acid will curdle it. Best taken alongside a meal rather than as one.',
    batch: null,
    mins: null
  },
  {
    id: 'eggs-labneh',
    name: 'Eggs & labneh',
    cat: 'snack',
    p: 17, k: 220,
    c: 3, f: 16, est: true,
    ing: [
      { q: 2, u: '', item: 'eggs', prep: 'boiled', aisle: 'dairy' },
      { q: 50, u: 'g', item: 'labneh', aisle: 'dairy' },
      { q: null, u: '', item: 'za\'atar', aisle: 'spices' },
      { q: null, u: '', item: 'olive oil', aisle: 'pantry' }
    ],
    steps: [
      'Boil the eggs, or take two from the Sunday batch.',
      'Peel them and serve with the labneh.',
      'Finish with za\'atar and a drizzle of olive oil.'
    ],
    tip: 'Cheapest protein in the fridge.',
    batch: { q: 6, u: '', item: 'eggs', text: 'Boil six eggs on Sunday. They survive a week in the fridge.' },
    mins: null
  },
  {
    id: 'smoked-turkey-roll-ups',
    name: 'Smoked turkey roll-ups',
    cat: 'snack',
    p: 18, k: 150,
    c: 8, f: 5, est: true,
    ing: [
      { q: 90, u: 'g', item: 'smoked turkey breast', aisle: 'meat' },
      { q: 30, u: 'g', item: 'light cream cheese', aisle: 'dairy' },
      { q: null, u: '', item: 'cucumber', prep: 'sticks', aisle: 'produce' }
    ],
    steps: [
      'Cut the cucumber into sticks.',
      'Spread the cream cheese over the turkey slices.',
      'Roll each slice around a cucumber stick.'
    ],
    tip: 'Desk food. It keeps at the office and takes the 16:00 decision away from you entirely.',
    batch: null,
    mins: null
  }
];

export const MEAL_NOTES = [
  'Protein and calories are the brief\'s own figures. Carbs and fat are estimates: each meal was costed from its listed grams with standard food-composition values, then carbs and fat were scaled together so that protein, carbs and fat add up to within 3 % of the brief\'s calories. Carbs include fibre.',
  'Meat, fish, potato and sweet potato weights are read as raw, since the brief only marks the rice, freekeh and bulgur as cooked.',
  'Items with no amount were costed as one normal portion: salad 100 g, large salad 200 g, fattoush 150 g lightly dressed (about 95 kcal), green beans 100 g, roasted courgette and pepper 75 g each, cucumber sticks 100 g, red onion 30 g, onion in the kofta 40 g, tomato 120 g and onion 60 g in the machboos, garlic two cloves, lemon the juice of half, parsley and coriander 10 g, one fresh chilli 10 g, one loomi, an unmeasured olive oil drizzle 5 g, spices 1 to 2 g (paprika rub 5 g, za\'atar 3 g), water and ice nothing.',
  'Counts were costed as an egg 50 g, half an onion 55 g, a pepper 120 g, half a banana about 60 g and a date 12 g.',
  'Other readings that move the numbers: salmon is farmed Atlantic, cottage cheese is regular (about 4 % fat), labneh is full-fat, chicken thigh is boneless and skinless at about 135 kcal per 100 g, chicken sausage is about 180 kcal per 100 g, garlic sauce is shop-bought at about 450 kcal per 100 g (a traditional toum is nearer 700), and protein powder is a standard whey at about 120 kcal per 30 g.',
  'Greek yogurt power bowl: the listed grams come to about 485 kcal against the brief\'s 430. Nothing in it is unusual, so the brief looks low.',
  'Eggs & labneh toast: about 590 kcal against the brief\'s 480. The olive oil drizzle and full-fat labneh make up most of the gap.',
  'Chicken sausage shakshuka: about 585 kcal against the brief\'s 480. The 10 g of olive oil and the sausage, which varies a lot by brand, make up most of the gap.',
  'Smoked chicken & potato: about 558 kcal against the brief\'s 620. The brief looks generous here.',
  'Steak & sweet potato: about 505 kcal against the brief\'s 580. The brief looks generous here.',
  'Eggs & labneh: about 294 kcal against the brief\'s 220. The olive oil drizzle and full-fat labneh make up most of the gap.',
  'The ingredient check puts protein more than 5 g away from the brief for three meals: tuna & white bean salad nearer 52 g and protein oats nearer 45 g, so the brief is cautious there, and chicken shawarma bowl nearer 43 g if the 180 g of thigh is weighed raw. The brief\'s figures are kept.',
  'The cooking steps were split from the brief\'s short notes and need your check before you rely on them. The brief gives little or no method for the Greek yogurt power bowl, tuna & white bean salad, lightened chicken machboos, harra prawns + bulgur, cottage cheese + dates, eggs & labneh and smoked turkey roll-ups, so their steps follow the ingredient list only.',
  'Where the brief does not say what the olive oil or ghee is for, the steps put it where the dish implies, for example roasting the veg with the salmon, softening the onion for the machboos and dressing the salad with the steak. Check those too.',
  'Sumac is in the brief\'s method for eggs & labneh toast but not in its ingredient list, so it appears in the steps only. Add it as an ingredient if you want it on the shopping list.'
];
